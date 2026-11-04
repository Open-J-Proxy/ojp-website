import { getQuestById, getQuestForWorld, getWorldById, OBJECTIVES, QUESTS, WORLDS } from './content.mjs';

export const STORAGE_KEY = 'ojp-quest-progress';
export const SCHEMA_VERSION = 1;
export const XP_PER_OBJECTIVE = 50;
export const MAX_XP = OBJECTIVES.length * XP_PER_OBJECTIVE;

const objectiveIds = new Set(OBJECTIVES.map(objective => objective.id));
const worldIds = new Set(WORLDS.map(world => world.id));
const questIds = new Set(QUESTS.map(quest => quest.id));

export function createInitialState() {
    return {
        version: SCHEMA_VERSION,
        selectedQuestId: null,
        selectedWorld: null,
        currentAct: 0,
        currentChallenge: null,
        phase: 'worlds',
        completedObjectives: [],
        xp: 0,
        unlockedBadges: [],
        completedWorlds: [],
        invitationDismissed: false,
        worlds: {}
    };
}

function uniqueKnownIds(values, allowed) {
    if (!Array.isArray(values)) return [];
    return [...new Set(values.filter(value => typeof value === 'string' && allowed.has(value)))];
}

export function validateState(input) {
    const state = createInitialState();
    if (!input || typeof input !== 'object' || Array.isArray(input) || input.version !== SCHEMA_VERSION) return state;

    state.completedObjectives = uniqueKnownIds(input.completedObjectives, objectiveIds);
    state.xp = state.completedObjectives.length * XP_PER_OBJECTIVE;
    state.invitationDismissed = input.invitationDismissed === true;

    if (input.worlds && typeof input.worlds === 'object' && !Array.isArray(input.worlds)) {
        for (const id of worldIds) {
            const progress = input.worlds[id];
            if (!progress || typeof progress !== 'object') continue;
            const act = Number.isInteger(progress.act) && progress.act >= 0 && progress.act < 3 ? progress.act : 0;
            const phase = ['story', 'challenge', 'reveal', 'complete'].includes(progress.phase) ? progress.phase : 'story';
            const solved = progress.solved === true && (phase === 'challenge' || phase === 'story');
            state.worlds[id] = {
                act,
                phase: phase === 'reveal' || phase === 'complete' ? phase : (phase === 'challenge' ? 'challenge' : 'story'),
                solved,
                attempts: Number.isInteger(progress.attempts) && progress.attempts >= 0 ? Math.min(progress.attempts, 100000) : 0
            };
        }
    }

    state.completedWorlds = uniqueKnownIds(input.completedWorlds, worldIds)
        .filter(id => state.worlds[id]?.phase === 'complete');
    state.unlockedBadges = uniqueKnownIds(input.unlockedBadges, worldIds)
        .filter(id => state.completedWorlds.includes(id));

    if (typeof input.selectedQuestId === 'string' && questIds.has(input.selectedQuestId)) {
        state.selectedQuestId = input.selectedQuestId;
    }
    if (typeof input.selectedWorld === 'string' && worldIds.has(input.selectedWorld)) {
        state.selectedWorld = input.selectedWorld;
        state.selectedQuestId = getWorldById(input.selectedWorld).questId;
        const progress = state.worlds[input.selectedWorld];
        if (progress && ['story', 'challenge', 'reveal', 'complete'].includes(progress.phase)) {
            state.currentAct = progress.act;
            state.phase = progress.phase;
            state.currentChallenge = progress.phase === 'challenge' ? progress.act : null;
        } else {
            state.phase = 'story';
            state.worlds[input.selectedWorld] = { act: 0, phase: 'story', solved: false, attempts: 0 };
        }
    }
    return state;
}

export function createBrowserStorage() {
    let primary = null;
    let fallback = null;
    try {
        primary = window.localStorage;
        primary?.getItem(STORAGE_KEY);
    } catch {
        primary = null;
    }
    try {
        fallback = window.sessionStorage;
        fallback?.getItem(STORAGE_KEY);
    } catch {
        fallback = null;
    }
    let active = primary || fallback;
    return {
        getItem(key) {
            try {
                return active?.getItem(key) ?? null;
            } catch {
                if (!fallback || active === fallback) return null;
                active = fallback;
                return active.getItem(key);
            }
        },
        setItem(key, value) {
            try {
                active?.setItem(key, value);
            } catch {
                if (!fallback || active === fallback) return;
                active = fallback;
                active.setItem(key, value);
            }
        },
        removeItem(key) {
            try {
                active?.removeItem(key);
            } catch {
                if (!fallback || active === fallback) return;
                active = fallback;
                active.removeItem(key);
            }
        }
    };
}

export function createQuestStore(storage = null) {
    let state = createInitialState();
    try {
        if (storage) {
            const raw = storage.getItem(STORAGE_KEY);
            if (raw) state = validateState(JSON.parse(raw));
        }
    } catch {
        state = createInitialState();
    }

    function persist() {
        try {
            storage?.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch {
            // In-memory progress remains available when browser storage is blocked or full.
        }
        return state;
    }

    function activeProgress() {
        return state.selectedWorld ? state.worlds[state.selectedWorld] : null;
    }

    function updateProgress(phase, act = state.currentAct, solved = false) {
        const id = state.selectedWorld;
        if (!id) return;
        const prior = state.worlds[id] || { attempts: 0 };
        state.worlds[id] = { act, phase, solved, attempts: act === prior.act ? prior.attempts : 0 };
        state.currentAct = act;
        state.phase = phase;
        state.currentChallenge = phase === 'challenge' ? act : null;
    }

    return {
        getState: () => state,
        startWorld(id) {
            const world = getWorldById(id);
            if (!world || (state.selectedQuestId && state.selectedQuestId !== world.questId)) return state;
            const previous = state.worlds[id];
            state.selectedQuestId = world.questId;
            state.selectedWorld = id;
            if (!previous || previous.phase === 'complete') {
                state.worlds[id] = { act: 0, phase: 'story', solved: false, attempts: 0 };
            }
            const progress = state.worlds[id];
            state.currentAct = progress.act;
            state.phase = progress.phase;
            state.currentChallenge = progress.phase === 'challenge' ? progress.act : null;
            return persist();
        },
        startQuest(id) {
            if (!questIds.has(id)) return state;
            state.selectedQuestId = id;
            state.selectedWorld = null;
            state.phase = 'worlds';
            state.currentChallenge = null;
            return persist();
        },
        continueQuest() {
            if (!state.selectedWorld || state.worlds[state.selectedWorld]?.phase === 'complete') {
                const quest = getQuestById(state.selectedQuestId);
                state.selectedWorld = quest?.worlds.find(world => {
                    const progress = state.worlds[world.id];
                    return progress && progress.phase !== 'complete';
                })?.id || state.selectedWorld;
            }
            if (!state.selectedWorld) return state;
            const progress = activeProgress();
            if (!progress) return this.startWorld(state.selectedWorld);
            state.currentAct = progress.act;
            state.phase = progress.phase;
            state.currentChallenge = progress.phase === 'challenge' ? progress.act : null;
            return persist();
        },
        goToWorlds(questId = state.selectedQuestId) {
            if (questId && !questIds.has(questId)) return state;
            state.selectedQuestId = questId || null;
            state.selectedWorld = null;
            state.phase = 'worlds';
            state.currentChallenge = null;
            return persist();
        },
        goToQuests() {
            state.selectedQuestId = null;
            state.selectedWorld = null;
            state.phase = 'worlds';
            state.currentChallenge = null;
            return persist();
        },
        continueStory() {
            if (state.phase !== 'story' || !state.selectedWorld) return state;
            updateProgress('challenge', state.currentAct, activeProgress()?.solved === true);
            return persist();
        },
        answer(index) {
            if (state.phase !== 'challenge' || !state.selectedWorld) return { correct: false, xpEarned: 0 };
            const world = getWorldById(state.selectedWorld);
            const challenge = world?.acts[state.currentAct]?.challenge;
            const progress = activeProgress();
            if (!challenge || !progress) return { correct: false, xpEarned: 0 };
            if (progress.solved) return { correct: true, alreadySolved: true, xpEarned: 0 };
            progress.attempts += 1;
            if (index !== challenge.answer) {
                persist();
                return { correct: false, xpEarned: 0, attempts: progress.attempts };
            }
            const objectiveId = getQuestForWorld(state.selectedWorld)?.objectives[state.currentAct].id;
            if (!objectiveId) return { correct: false, xpEarned: 0 };
            const alreadyMastered = state.completedObjectives.includes(objectiveId);
            if (!alreadyMastered) state.completedObjectives.push(objectiveId);
            state.xp = state.completedObjectives.length * XP_PER_OBJECTIVE;
            progress.solved = true;
            persist();
            return {
                correct: true,
                alreadySolved: false,
                xpEarned: alreadyMastered ? 0 : XP_PER_OBJECTIVE,
                attempts: progress.attempts
            };
        },
        previousScene() {
            if (!state.selectedWorld) return state;
            if (state.phase === 'challenge') {
                updateProgress('story', state.currentAct, activeProgress()?.solved === true);
            } else if (state.phase === 'reveal') {
                updateProgress('challenge', 2, true);
            }
            return persist();
        },
        advance() {
            const progress = activeProgress();
            if (!progress || state.phase !== 'challenge' || !progress.solved) return state;
            if (state.currentAct < 2) {
                updateProgress('story', state.currentAct + 1, false);
            } else {
                updateProgress('reveal', 2, false);
            }
            return persist();
        },
        completeWorld() {
            if (!state.selectedWorld || state.phase !== 'reveal') return state;
            const objectives = getQuestForWorld(state.selectedWorld)?.objectives || [];
            if (!objectives.length || !objectives.every(objective => state.completedObjectives.includes(objective.id))) return state;
            updateProgress('complete', 2, false);
            if (!state.completedWorlds.includes(state.selectedWorld)) state.completedWorlds.push(state.selectedWorld);
            if (!state.unlockedBadges.includes(state.selectedWorld)) state.unlockedBadges.push(state.selectedWorld);
            return persist();
        },
        dismissInvitation() {
            state.invitationDismissed = true;
            return persist();
        },
        reset() {
            state = createInitialState();
            try {
                storage?.removeItem(STORAGE_KEY);
            } catch {
                // Reset still takes effect for the current page session.
            }
            return state;
        }
    };
}

export function hasUnfinishedQuest(state) {
    if (!state?.selectedWorld) return false;
    return state.phase !== 'complete';
}
