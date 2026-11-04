import { BADGE_DESCRIPTIONS, EBOOK_SIGNUP_URL, OBJECTIVES, WORLDS } from './content.mjs';
import { createBrowserStorage, createQuestStore, hasUnfinishedQuest, MAX_XP, XP_PER_OBJECTIVE } from './engine.mjs';

const root = document.querySelector('#quest-app');
const storage = createBrowserStorage();
const game = createQuestStore(storage);
let hintsShown = 0;
let notice = '';
let xpJustEarned = 0;
let artSequence = 0;

const iconMarkup = {
    fantasy: '<path d="M25 92V50l18-15 18 15v42M50 92V30l20-16 20 16v62M77 92V50l18-15 18 15v42M43 92V66h12v26M64 92V54h12v38M91 92V66h12v26"/><path d="M18 96h92M40 43h7M64 25h12M89 43h7"/>',
    space: '<path d="M64 18c16 14 24 31 24 52L64 88 40 70c0-21 8-38 24-52Z"/><path d="m52 74-8 20 20-9 20 9-8-20M58 54h12M64 48v12"/><circle cx="64" cy="61" r="7"/>',
    heroes: '<path d="m64 16 37 14v27c0 25-16 43-37 55-21-12-37-30-37-55V30l37-14Z"/><path d="m64 36 7 18 19 1-15 12 5 19-16-11-16 11 5-19-15-12 19-1 7-18Z"/>',
    gaming: '<path d="M29 27h70v68H29zM41 39h46v44H41z"/><path d="M52 56h24v27H52zM35 88h10v7H35zM83 88h10v7H83zM49 49h7M73 49h7M49 73h7M73 73h7"/>',
    anime: '<path d="M23 92 48 30l16 30-25 32h-16ZM105 92 80 30 64 60l25 32h16Z"/><path d="M48 30h32M40 92h49M57 63h14"/><circle cx="64" cy="57" r="5"/>',
    mystery: '<circle cx="56" cy="51" r="29"/><path d="m77 73 27 27M44 51h24M56 39v24"/><path d="M43 49h26M56 36v29"/>',
    racing: '<path d="M37 18v91M39 22h57v38H39"/><path d="M39 22h19v19H39zM77 22h19v19H77zM58 41h19v19H58z"/><path d="M48 91h39M56 80l11 11 12-11"/>',
    engineering: '<circle cx="34" cy="34" r="12"/><circle cx="94" cy="34" r="12"/><circle cx="64" cy="91" r="12"/><path d="m44 40 12 39M84 40 71 79M46 34h36"/>'
};

function emit(name, detail = {}) {
    window.dispatchEvent(new CustomEvent('ojpquest:event', { detail: { name, ...detail } }));
}

function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, character => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[character]);
}

function art(world, label = world.name) {
    const [base, accent] = world.palette;
    const gradientId = `quest-art-${world.id}-${++artSequence}`;
    return `<svg class="quest-art" viewBox="0 0 128 128" role="img" aria-label="${escapeHtml(label)} illustration">
        <defs><linearGradient id="${gradientId}" x1="0" x2="1" y1="0" y2="1"><stop stop-color="${base}"/><stop offset="1" stop-color="${accent}"/></linearGradient></defs>
        <rect x="4" y="4" width="120" height="120" rx="32" fill="url(#${gradientId})"/>
        <circle cx="100" cy="27" r="17" fill="#fff" opacity=".12"/>
        <g fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">${iconMarkup[world.id]}</g>
    </svg>`;
}

function progressFor(worldId) {
    return game.getState().worlds[worldId];
}

function worldCards() {
    const state = game.getState();
    return WORLDS.map(world => {
        const unlocked = state.unlockedBadges.includes(world.id);
        const progress = progressFor(world.id);
        return `<button class="world-card theme-${world.id}" type="button" data-action="start-world" data-world="${world.id}">
            <span class="world-card-art">${art(world)}</span>
            <span class="world-card-copy"><span class="world-genre">${escapeHtml(world.genre)}</span>
            <strong>${escapeHtml(world.name)}</strong><span>${escapeHtml(world.description)}</span>
            <span class="world-card-status">${unlocked ? 'Badge earned · replay' : progress ? 'Quest in progress · continue' : 'Three acts · one badge'}</span></span>
            <span class="world-card-arrow" aria-hidden="true">→</span>
        </button>`;
    }).join('');
}

function badgeCard(world, unlocked) {
    return `<div class="badge-card ${unlocked ? 'is-unlocked' : 'is-locked'} theme-${world.id}" role="group" aria-label="${escapeHtml(BADGE_DESCRIPTIONS[world.id])} ${unlocked ? 'Unlocked' : 'Undiscovered'}">
        <span class="badge-art">${art(world, `${world.badge} badge`)}</span>
        <strong>${escapeHtml(world.badge)}</strong>
        <span>${unlocked ? 'Unlocked' : 'Undiscovered'}</span>
    </div>`;
}

function chrome(content, state, world = null) {
    const isInWorld = Boolean(world);
    const act = state.currentAct;
    const progressPercent = isInWorld ? (state.phase === 'reveal' || state.phase === 'complete' ? 100 : Math.round(((act + (state.phase === 'challenge' && progressFor(world.id)?.solved ? 1 : 0)) / 3) * 100)) : 0;
    return `<div class="quest-frame">
        <div class="quest-topline"><a href="#" class="quest-leave" data-action="leave"><span aria-hidden="true">←</span> Leave</a><span>OJP QUEST <span aria-hidden="true">·</span> 3–5 MIN <span aria-hidden="true">·</span> FREE</span>
            ${isInWorld ? `<span class="quest-xp" aria-label="${state.xp} experience points">${state.xp} XP</span>` : `<span class="quest-xp">${state.xp} XP</span>`}</div>
        ${isInWorld ? `<div class="quest-progress" role="progressbar" aria-label="Quest progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${progressPercent}" aria-valuetext="${state.phase === 'reveal' || state.phase === 'complete' ? 'Quest complete' : `Act ${act + 1} of 3`}"><div class="quest-progress-label"><span>${escapeHtml(world.name)}</span><span>${state.phase === 'reveal' || state.phase === 'complete' ? 'Complete' : `Act ${act + 1} of 3`}</span></div><div class="progress-track"><span style="width:${progressPercent}%"></span></div></div>` : ''}
        ${content}
        <footer class="quest-footer"><span>Progress stays on this device only.</span><button type="button" class="text-button" data-action="reset-open">Reset quest progress</button></footer>
    </div>`;
}

function worldScreen() {
    const state = game.getState();
    const badges = state.unlockedBadges.length;
    return chrome(`<section class="quest-intro" aria-labelledby="quest-title">
        <div class="intro-copy"><p class="eyebrow">EIGHT WORLDS. ONE CHALLENGE. A NEW WAY TO CONNECT.</p>
        <h1 id="quest-title" tabindex="-1">Every great discovery begins with a quest.</h1>
        <p>Database technology has evolved. Some old connection challenges remain. Choose a world, uncover the problem, and discover a different approach—no Java knowledge needed.</p>
        <div class="intro-facts"><span>◷ 3–5 minutes</span><span>Free</span><span>No account</span></div>
        <p class="collection-count">${badges} of 8 world badges discovered · ${state.xp} / ${MAX_XP} learning XP</p></div>
        <div class="intro-art" aria-hidden="true"><div class="orbit orbit-one"></div><div class="orbit orbit-two"></div><div class="intro-core">OJP<br>QUEST</div></div>
    </section>
    <section class="world-picker" aria-labelledby="world-picker-title">
        <div class="section-heading"><div><p class="eyebrow">PICK YOUR ADVENTURE</p><h2 id="world-picker-title" tabindex="-1">Which world will you save?</h2></div><p>Same connection crisis. Eight very different ways through it.</p></div>
        <div class="world-grid">${worldCards()}</div>
    </section>
    <section class="collection-panel" aria-labelledby="collection-title"><div class="section-heading"><div><p class="eyebrow">YOUR COLLECTION</p><h2 id="collection-title">Badges on the horizon</h2></div></div>
        <div class="badge-collection">${WORLDS.map(world => badgeCard(world, state.unlockedBadges.includes(world.id))).join('')}</div>
    </section>`, state);
}

function storyScreen(world, state) {
    const act = world.acts[state.currentAct];
    return chrome(`<section class="story-panel" aria-labelledby="scene-title">
        <div class="scene-art theme-${world.id}">${art(world, `${world.name} scene`)}</div>
        <div class="scene-copy"><p class="eyebrow">${escapeHtml(world.voice)} <span>·</span> ACT ${state.currentAct + 1}</p>
        <h1 id="scene-title" tabindex="-1">${escapeHtml(act.title)}</h1>
        <p class="story-text">${escapeHtml(act.story)}</p>
        <div class="scene-actions"><button type="button" class="button button-primary" data-action="enter-challenge">Face the challenge <span aria-hidden="true">→</span></button>
        <button type="button" class="button button-quiet" data-action="exit-world">Exit to world selection</button></div>
        <p class="small-note">${state.completedObjectives.includes(OBJECTIVES[state.currentAct].id) ? 'You have already mastered this learning objective; replaying it earns no extra XP.' : `Master this challenge to earn ${XP_PER_OBJECTIVE} XP.`}</p></div>
    </section>`, state, world);
}

function challengeScreen(world, state) {
    const act = world.acts[state.currentAct];
    const challenge = act.challenge;
    const progress = progressFor(world.id);
    const solved = progress?.solved === true;
    const attempted = (progress?.attempts || 0) > 0;
    const result = notice ? `<p class="challenge-notice" role="status">${escapeHtml(notice)}</p>` : '';
    const feedback = solved
        ? `<div class="answer-feedback is-correct" role="status"><strong>Challenge mastered${xpJustEarned ? ` · +${xpJustEarned} XP` : ''}.</strong><p>${escapeHtml(challenge.explanation)}</p></div>`
        : attempted ? `<div class="answer-feedback is-incorrect" role="status"><strong>Not quite—try another approach.</strong><p>${escapeHtml(challenge.wrong)}</p>${hintsShown ? `<p class="hint-copy">Hint: ${escapeHtml(challenge.hints[Math.min(hintsShown - 1, challenge.hints.length - 1)])}</p>` : ''}</div>` : '';
    return chrome(`<section class="challenge-panel" aria-labelledby="challenge-title">
        <div class="challenge-context"><p class="eyebrow">ACT ${state.currentAct + 1} · ${escapeHtml(OBJECTIVES[state.currentAct].title)}</p><h1 id="challenge-title" tabindex="-1">${escapeHtml(act.title)}</h1>
        <p>${escapeHtml(challenge.prompt)}</p></div>
        <div class="answer-list" role="group" aria-label="Choose your answer">${challenge.options.map((option, index) => `<button class="answer-option" type="button" data-action="answer" data-answer="${index}" ${solved ? 'disabled' : ''}><span class="answer-letter" aria-hidden="true">${String.fromCharCode(65 + index)}</span><span>${escapeHtml(option)}</span></button>`).join('')}</div>
        ${feedback}${result}
        <div class="challenge-actions">${solved ? `<button type="button" class="button button-primary" data-action="advance">${state.currentAct === 2 ? 'See what saved this world' : 'Continue the story'} <span aria-hidden="true">→</span></button>` : `<button type="button" class="button button-secondary" data-action="hint">Give me a hint</button>`}
        <button type="button" class="button button-quiet" data-action="previous">← Previous scene</button><button type="button" class="button button-quiet" data-action="exit-world">Exit quest</button></div>
    </section>`, state, world);
}

function revealScreen(world, state) {
    return chrome(`<section class="reveal-panel" aria-labelledby="reveal-title">
        <p class="eyebrow">THE STORY MEETS THE REAL WORLD</p><div class="reveal-heading">${art(world, `${world.badge} emblem`)}<div><h1 id="reveal-title" tabindex="-1">Your Quest Is Complete</h1><p>${escapeHtml(world.victory)}</p></div></div>
        <div class="reveal-copy"><p>The challenge you solved exists in real software systems. You’ve just discovered three important ideas:</p>
        <ol><li><strong>Share resources intelligently.</strong> Independent application pools can reserve database connections that other applications need.</li>
        <li><strong>Acquire resources when needed.</strong> Idle application-side connections don’t always need to hold physical database connections.</li>
        <li><strong>Protect shared capacity.</strong> Slow operations shouldn’t be allowed to monopolize connections needed by other workloads.</li></ol>
        <p><strong>These are real architectural challenges that Open J Proxy helps address.</strong> Open J Proxy is a free, Apache 2.0 open-source project that uses a JDBC Type 3 driver and server-managed database connection pools. It also provides capabilities such as client-side high availability, observability, and support for multiple database technologies.</p>
        <p>It doesn’t make database capacity infinite or eliminate every failure. It gives applications better ways to coordinate and control how they use that capacity.</p></div>
        <div class="reveal-links"><a href="documentation.html" data-track="documentation_opened">Explore the documentation ↗</a><a href="${EBOOK_SIGNUP_URL}" target="_blank" rel="noopener noreferrer" data-track="ebook_accessed">Request the OJP eBook (optional) ↗</a><a href="https://github.com/Open-J-Proxy/ojp" target="_blank" rel="noopener noreferrer" data-track="github_opened">Explore the OJP source ↗</a></div>
        <div class="scene-actions"><button type="button" class="button button-primary" data-action="complete-world">Continue to your achievement badge <span aria-hidden="true">→</span></button><button type="button" class="button button-quiet" data-action="previous">← Previous scene</button></div>
    </section>`, state, world);
}

function completionScreen(world, state) {
    const otherBadges = WORLDS.filter(item => item.id !== world.id);
    return chrome(`<section class="completion-panel" aria-labelledby="complete-title">
        <div class="completion-celebration"><div class="earned-badge theme-${world.id}">${art(world, `${world.badge} achievement badge`)}</div>
        <p class="eyebrow">ACHIEVEMENT UNLOCKED</p><h1 id="complete-title" tabindex="-1">${escapeHtml(world.badge)}</h1><p class="completion-quest">The Connection Crisis — Completed · ${escapeHtml(world.name)}</p><p class="victory-copy">${escapeHtml(world.victory)}</p>
        <div class="completion-stats"><span><strong>${state.xp}</strong> / ${MAX_XP} XP</span><span><strong>${state.unlockedBadges.length}</strong> / 8 badges</span></div></div>
        <div class="achievement-actions"><button type="button" class="button button-primary" data-action="share-badge">Share achievement</button><button type="button" class="button button-secondary" data-action="download-badge">Download badge card</button><button type="button" class="button button-quiet" data-action="replay-world" data-world="${world.id}">Replay this world</button><p class="share-status" role="status" aria-live="polite">${escapeHtml(notice)}</p></div>
        <section class="vault-panel" aria-labelledby="vault-title"><div class="vault-cover" aria-hidden="true"><span>OJP</span><strong>THE<br>CONNECTION<br>PLAYBOOK</strong><small>OPEN J PROXY · ADOPTION GUIDE</small></div>
            <div class="vault-copy"><p class="eyebrow">YOUR NEXT CHAPTER</p><h2 id="vault-title">You've unlocked the Knowledge Vault.</h2><p>You've mastered the Connection Crisis. Keep exploring the real architecture behind the adventure with the Open J Proxy adoption eBook.</p>
            <p class="vault-disclosure">The current eBook is delivered through the site's optional email-list signup; there is no public PDF download in this repository. Quest completion never requires an email or subscription.</p>
            <a class="button button-primary" href="${EBOOK_SIGNUP_URL}" target="_blank" rel="noopener noreferrer" data-track="ebook_accessed">Optional: request the eBook by email ↗</a>
            <div class="vault-links"><a href="documentation.html" data-track="documentation_opened">OJP documentation</a><a href="https://github.com/Open-J-Proxy/ojp" target="_blank" rel="noopener noreferrer" data-track="github_opened">GitHub repository</a></div></div>
        </section>
        <section class="collection-panel completion-collection" aria-labelledby="more-badges-title"><h2 id="more-badges-title">More worlds are waiting</h2><div class="badge-collection">${otherBadges.map(item => badgeCard(item, state.unlockedBadges.includes(item.id))).join('')}</div><button type="button" class="button button-secondary" data-action="exit-world">Explore another world</button></section>
        <p class="cosmetic-note">Badges and XP are saved on this device as a personal achievement; they are not verified credentials.</p>
    </section>`, state, world);
}

function activeWorld() {
    return WORLDS.find(world => world.id === game.getState().selectedWorld);
}

function render(focus = true) {
    if (!root) return;
    const state = game.getState();
    const world = activeWorld();
    if (!world) root.innerHTML = worldScreen();
    else if (state.phase === 'story') root.innerHTML = storyScreen(world, state);
    else if (state.phase === 'challenge') root.innerHTML = challengeScreen(world, state);
    else if (state.phase === 'reveal') root.innerHTML = revealScreen(world, state);
    else root.innerHTML = completionScreen(world, state);
    if (focus) {
        window.scrollTo(0, 0);
        root.querySelector('[tabindex="-1"]')?.focus({ preventScroll: true });
    }
    document.title = world ? `${world.name} — OJP Quest` : 'OJP Quest — Open J Proxy';
}

function markEvent(name, detail = {}) {
    emit(name, detail);
}

function badgeSvg(world) {
    const [base, accent] = world.palette;
    return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
        <defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${base}"/><stop offset="1" stop-color="${accent}"/></linearGradient></defs>
        <rect width="1200" height="630" rx="36" fill="#101d32"/><circle cx="944" cy="314" r="240" fill="url(#bg)" opacity=".94"/>
        <g transform="translate(824 194) scale(2.4)" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round">${iconMarkup[world.id]}</g>
        <text x="84" y="105" fill="#91d8ff" font-family="Arial,sans-serif" font-size="26" font-weight="700" letter-spacing="5">OPEN J PROXY · OJP QUEST</text>
        <text x="84" y="235" fill="#fff" font-family="Arial,sans-serif" font-size="24">ACHIEVEMENT UNLOCKED</text>
        <text x="84" y="310" fill="#fff" font-family="Arial,sans-serif" font-size="54" font-weight="700">${escapeHtml(world.badge)}</text>
        <text x="84" y="370" fill="#dbe9f5" font-family="Arial,sans-serif" font-size="26">The Connection Crisis — Completed</text>
        <text x="84" y="415" fill="#dbe9f5" font-family="Arial,sans-serif" font-size="22">${escapeHtml(world.name)}</text>
        <text x="84" y="520" fill="#91d8ff" font-family="Arial,sans-serif" font-size="24">openjproxy.com</text>
    </svg>`;
}

function downloadBadge(world) {
    const blob = new Blob([badgeSvg(world)], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `ojp-quest-${world.id}-achievement.svg`;
    anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    notice = 'Your original SVG achievement card has been downloaded.';
    markEvent('badge_shared', { world: world.id, method: 'download' });
    render(false);
}

root?.addEventListener('click', async event => {
    const trackedLink = event.target.closest('[data-track]');
    if (trackedLink) markEvent(trackedLink.dataset.track);
    const control = event.target.closest('[data-action]');
    if (!control) return;
    const { action, world: worldId } = control.dataset;
    const state = game.getState();
    const currentWorld = activeWorld();
    notice = '';
    switch (action) {
        case 'leave':
            event.preventDefault();
            window.history.back();
            return;
        case 'start-world':
            game.startWorld(worldId);
            hintsShown = 0;
            xpJustEarned = 0;
            markEvent('quest_started', { world: worldId });
            markEvent('world_selected', { world: worldId });
            break;
        case 'enter-challenge':
            game.continueStory();
            break;
        case 'answer': {
            const result = game.answer(Number(control.dataset.answer));
            xpJustEarned = result.xpEarned || 0;
            markEvent('challenge_attempted', { world: state.selectedWorld, act: state.currentAct + 1 });
            if (result.correct && !result.alreadySolved) {
                markEvent('challenge_mastered', { world: state.selectedWorld, act: state.currentAct + 1 });
                hintsShown = 0;
            }
            break;
        }
        case 'hint': {
            const challenge = currentWorld?.acts[state.currentAct]?.challenge;
            if (challenge) {
                hintsShown = Math.min(hintsShown + 1, challenge.hints.length);
                notice = challenge.hints[Math.min(hintsShown - 1, challenge.hints.length - 1)];
            }
            break;
        }
        case 'previous':
            game.previousScene();
            hintsShown = 0;
            xpJustEarned = 0;
            break;
        case 'advance': {
            const completedAct = state.currentAct;
            game.advance();
            xpJustEarned = 0;
            markEvent('act_completed', { world: state.selectedWorld, act: completedAct + 1 });
            if (completedAct === 2) markEvent('quest_reveal_opened', { world: state.selectedWorld });
            break;
        }
        case 'complete-world': {
            const alreadyUnlocked = state.unlockedBadges.includes(state.selectedWorld);
            game.completeWorld();
            markEvent('quest_completed', { world: state.selectedWorld });
            if (!alreadyUnlocked) markEvent('badge_unlocked', { world: state.selectedWorld });
            break;
        }
        case 'exit-world':
            game.goToWorlds();
            break;
        case 'replay-world':
            game.startWorld(worldId);
            markEvent('quest_started', { world: worldId, replay: true });
            break;
        case 'share-badge': {
            const achievementWorld = currentWorld;
            if (!achievementWorld) break;
            const text = `I completed ${achievementWorld.name} in OJP Quest and earned the ${achievementWorld.badge} badge!`;
            let shareMethod = 'unavailable';
            try {
                if (navigator.share) {
                    const file = new File([badgeSvg(achievementWorld)], `ojp-quest-${achievementWorld.id}-achievement.svg`, { type: 'image/svg+xml' });
                    const shareData = navigator.canShare?.({ files: [file] })
                        ? { title: 'OJP Quest achievement', text, files: [file] }
                        : { title: 'OJP Quest achievement', text, url: 'https://openjproxy.com' };
                    await navigator.share(shareData);
                    notice = 'Achievement shared.';
                    shareMethod = 'share';
                } else if (navigator.clipboard?.writeText) {
                    await navigator.clipboard.writeText(`${text} https://openjproxy.com`);
                    notice = 'Achievement details copied. Download the badge card to share its artwork.';
                    shareMethod = 'copy';
                } else {
                    notice = 'Use Download badge card to save your achievement artwork.';
                }
                if (shareMethod !== 'unavailable') markEvent('badge_shared', { world: achievementWorld.id, method: shareMethod });
            } catch (error) {
                notice = error?.name === 'AbortError' ? 'Sharing cancelled.' : 'Sharing is unavailable here. You can download the badge card instead.';
            }
            break;
        }
        case 'download-badge':
            if (currentWorld) downloadBadge(currentWorld);
            return;
        case 'reset-open':
            document.querySelector('#reset-dialog')?.showModal();
            return;
        case 'reset-cancel':
            document.querySelector('#reset-dialog')?.close();
            return;
        case 'reset-confirm':
            game.reset();
            hintsShown = 0;
            xpJustEarned = 0;
            document.querySelector('#reset-dialog')?.close();
            break;
        default:
            return;
    }
    render(action !== 'hint');
});

const resetDialog = document.querySelector('#reset-dialog');
resetDialog?.addEventListener('click', event => {
    const control = event.target.closest('[data-action]');
    if (control?.dataset.action === 'reset-cancel') resetDialog.close();
    if (control?.dataset.action === 'reset-confirm') {
        game.reset();
        hintsShown = 0;
        xpJustEarned = 0;
        resetDialog.close();
        render();
    }
});
resetDialog?.addEventListener('close', () => {
    root?.querySelector('[data-action="reset-open"]')?.focus();
});

if ((game.getState().selectedWorld && hasUnfinishedQuest(game.getState())) || new URLSearchParams(location.search).has('resume')) game.continueQuest();
render();
if (game.getState().selectedWorld && game.getState().phase === 'complete') {
    markEvent('quest_completed_viewed', { world: game.getState().selectedWorld });
}
