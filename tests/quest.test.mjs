import test from 'node:test';
import assert from 'node:assert/strict';
import { BADGE_DESCRIPTIONS, OBJECTIVES, WORLDS } from '../js/quest/content.mjs';
import { createInitialState, createQuestStore, hasUnfinishedQuest, MAX_XP, STORAGE_KEY, validateState } from '../js/quest/engine.mjs';

class MemoryStorage {
    values = new Map();
    getItem(key) { return this.values.get(key) ?? null; }
    setItem(key, value) { this.values.set(key, value); }
    removeItem(key) { this.values.delete(key); }
}

function finishAllChallenges(game, worldId) {
    game.startWorld(worldId);
    for (let act = 0; act < 3; act += 1) {
        game.continueStory();
        const answer = game.answer(WORLDS.find(world => world.id === worldId).acts[act].challenge.answer);
        assert.equal(answer.correct, true);
        game.advance();
    }
    assert.equal(game.getState().phase, 'reveal');
    game.completeWorld();
}

test('all eight worlds have three complete acts and one uniquely correct answer per challenge', () => {
    assert.equal(WORLDS.length, 8);
    for (const world of WORLDS) {
        assert.equal(world.acts.length, 3, world.id);
        assert.ok(world.badge);
        assert.ok(BADGE_DESCRIPTIONS[world.id]);
        for (const act of world.acts) {
            assert.ok(act.title && act.story.split(/\s+/).length >= 65, `${world.id}: story is complete`);
            assert.doesNotMatch(`${act.title} ${act.story}`, /\b(?:TODO|lorem ipsum|placeholder|coming soon)\b/i);
            assert.equal(act.challenge.options.length, 3);
            assert.equal(act.challenge.options.filter((_, index) => index === act.challenge.answer).length, 1);
            assert.ok(act.challenge.explanation.length > 50);
            assert.ok(act.challenge.hints.length >= 2);
        }
    }
    assert.deepEqual(OBJECTIVES.map(item => item.id), ['shared-pooling', 'just-in-time', 'isolation-ha']);
});

test('only correct answers award objective XP, and retries cannot farm it', () => {
    const game = createQuestStore(new MemoryStorage());
    game.startWorld('fantasy');
    game.continueStory();
    assert.equal(game.answer(99).xpEarned, 0);
    const first = game.answer(WORLDS[0].acts[0].challenge.answer);
    assert.equal(first.xpEarned, 50);
    assert.equal(game.answer(WORLDS[0].acts[0].challenge.answer).xpEarned, 0);
    game.advance();
    game.continueStory();
    assert.equal(game.answer(WORLDS[0].acts[1].challenge.answer).xpEarned, 50);
    game.advance();
    game.continueStory();
    assert.equal(game.answer(WORLDS[0].acts[2].challenge.answer).xpEarned, 50);
    assert.equal(game.getState().xp, MAX_XP);
});

test('switching worlds shares the three learning objectives and awards separate badges', () => {
    const game = createQuestStore(new MemoryStorage());
    finishAllChallenges(game, 'fantasy');
    assert.deepEqual(game.getState().unlockedBadges, ['fantasy']);
    finishAllChallenges(game, 'space');
    assert.equal(game.getState().xp, MAX_XP);
    assert.deepEqual(game.getState().completedObjectives, OBJECTIVES.map(objective => objective.id));
    assert.deepEqual(game.getState().unlockedBadges, ['fantasy', 'space']);
    assert.deepEqual(game.getState().completedWorlds, ['fantasy', 'space']);
});

test('world completion requires all learning objectives; replay and reset work', () => {
    const game = createQuestStore(new MemoryStorage());
    game.startWorld('gaming');
    game.continueStory();
    game.answer(WORLDS.find(world => world.id === 'gaming').acts[0].challenge.answer);
    game.advance();
    game.continueStory();
    game.answer(WORLDS.find(world => world.id === 'gaming').acts[1].challenge.answer);
    game.advance();
    game.continueStory();
    game.completeWorld();
    assert.equal(game.getState().phase, 'challenge');
    assert.deepEqual(game.getState().unlockedBadges, []);
    game.answer(WORLDS.find(world => world.id === 'gaming').acts[2].challenge.answer);
    game.completeWorld();
    assert.equal(game.getState().phase, 'challenge');
    game.advance();
    assert.equal(game.getState().phase, 'reveal');
    assert.deepEqual(game.getState().unlockedBadges, []);
    game.completeWorld();
    assert.equal(game.getState().phase, 'complete');
    game.startWorld('gaming');
    assert.equal(game.getState().phase, 'story');
    finishAllChallenges(game, 'mystery');
    assert.equal(game.getState().xp, MAX_XP);
    game.reset();
    assert.deepEqual(game.getState(), createInitialState());
});

test('progress survives reloads, invalid state is sanitized, and unsupported versions reset safely', () => {
    const storage = new MemoryStorage();
    const game = createQuestStore(storage);
    game.dismissInvitation();
    game.startWorld('racing');
    game.continueStory();
    game.answer(WORLDS.find(world => world.id === 'racing').acts[0].challenge.answer);
    const restored = createQuestStore(storage).getState();
    assert.equal(restored.selectedWorld, 'racing');
    assert.equal(restored.phase, 'challenge');
    assert.equal(restored.xp, 50);
    assert.equal(restored.invitationDismissed, true);
    assert.equal(hasUnfinishedQuest(restored), true);
    const resumed = createQuestStore(storage);
    resumed.goToWorlds();
    resumed.continueQuest();
    assert.equal(resumed.getState().selectedWorld, 'racing');
    assert.equal(resumed.getState().phase, 'challenge');

    assert.deepEqual(validateState({ version: 999, xp: 999999 }), createInitialState());
    const sanitized = validateState({
        version: 1, xp: 999999, selectedWorld: '<script>', completedObjectives: ['shared-pooling', 'unknown', 'shared-pooling'],
        unlockedBadges: ['fantasy'], completedWorlds: ['fantasy'], worlds: { fantasy: { act: 9, phase: 'garbage' } }
    });
    assert.equal(sanitized.xp, 50);
    assert.deepEqual(sanitized.completedObjectives, ['shared-pooling']);
    assert.deepEqual(sanitized.unlockedBadges, []);
    assert.equal(sanitized.selectedWorld, null);
});

test('corrupted and unavailable storage do not prevent current-session gameplay', () => {
    const corrupted = new MemoryStorage();
    corrupted.setItem(STORAGE_KEY, '{not json');
    assert.equal(createQuestStore(corrupted).getState().phase, 'worlds');
    const unavailable = {
        getItem() { throw new Error('blocked'); },
        setItem() { throw new Error('blocked'); },
        removeItem() { throw new Error('blocked'); }
    };
    const game = createQuestStore(unavailable);
    game.startWorld('engineering');
    game.continueStory();
    const result = game.answer(WORLDS.find(world => world.id === 'engineering').acts[0].challenge.answer);
    assert.equal(result.xpEarned, 50);
    assert.equal(game.getState().xp, 50);
});

test('invitation dismissal persists and reset clears it', () => {
    const storage = new MemoryStorage();
    const game = createQuestStore(storage);
    game.dismissInvitation();
    assert.equal(createQuestStore(storage).getState().invitationDismissed, true);
    game.reset();
    assert.equal(createQuestStore(storage).getState().invitationDismissed, false);
});
