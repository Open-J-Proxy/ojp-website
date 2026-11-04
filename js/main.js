// Open J Proxy Website - Main JavaScript

// Mobile menu toggle functionality
let mobileMenuInitialized = false;

function initMobileMenu() {
    // Prevent re-initialization
    if (mobileMenuInitialized) {
        return;
    }
    
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    const menuOverlay = document.querySelector('.menu-overlay');
    const menuLinks = document.querySelectorAll('nav a');
    
    if (!menuToggle || !nav) {
        return;
    }
    
    // Helper function to toggle body scroll
    function toggleBodyScroll(isMenuOpen) {
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    }
    
    // Helper function to close menu
    function closeMenu() {
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('active');
        if (menuOverlay) {
            menuOverlay.classList.remove('active');
        }
        toggleBodyScroll(false);
    }
    
    // Toggle menu on button click
    menuToggle.addEventListener('click', () => {
        const isOpening = !nav.classList.contains('active');
        menuToggle.classList.toggle('active');
        nav.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', String(isOpening));
        if (menuOverlay) {
            menuOverlay.classList.toggle('active');
        }
        toggleBodyScroll(isOpening);
    });
    
    // Close menu when clicking on overlay
    if (menuOverlay) {
        menuOverlay.addEventListener('click', closeMenu);
    }
    
    // Close menu when clicking on a menu link
    menuLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && nav.classList.contains('active')) closeMenu();
    });
    
    // Mark as initialized
    mobileMenuInitialized = true;
}

function getQuestState() {
    for (const name of ['localStorage', 'sessionStorage']) {
        try {
            const storage = window[name];
            const saved = JSON.parse(storage.getItem('ojp-quest-progress') || 'null');
            if (saved && saved.version === 1) return saved;
        } catch {
            // Try the session-only store if persistent storage is blocked.
        }
    }
    return null;
}

function initQuestEntryPoints() {
    const saved = getQuestState();
    const hasSelectedProgress = Boolean(saved?.selectedWorld && saved.phase && saved.phase !== 'complete');
    const hasSavedWorld = Object.values(saved?.worlds || {}).some(progress => progress && progress.phase !== 'complete');
    const canContinue = hasSelectedProgress || hasSavedWorld;
    document.querySelectorAll('[data-quest-entry]').forEach(link => {
        if (link.closest('nav')) link.textContent = canContinue ? 'Continue a Quest' : 'Start a Quest';
        else if (canContinue) link.innerHTML = 'Continue Your Quest <span aria-hidden="true">→</span>';
        if (canContinue) link.href = 'quest.html?resume=1';
    });

    const invitation = document.querySelector('#quest-invitation');
    if (!invitation) return;
    if (saved?.invitationDismissed) invitation.hidden = true;
    else window.dispatchEvent(new CustomEvent('ojpquest:event', { detail: { name: 'quest_invitation_shown' } }));
    invitation.querySelector('[data-dismiss-quest]')?.addEventListener('click', () => {
        try {
            const state = getQuestState() || { version: 1 };
            state.invitationDismissed = true;
            let saved = false;
            for (const name of ['localStorage', 'sessionStorage']) {
                try {
                    const storage = window[name];
                    storage.setItem('ojp-quest-progress', JSON.stringify(state));
                    saved = true;
                    break;
                } catch {
                    // Fall back to the current tab if local storage is unavailable.
                }
            }
            if (!saved) invitation.hidden = true;
        } catch {
            invitation.hidden = true;
        }
        invitation.hidden = true;
        window.dispatchEvent(new CustomEvent('ojpquest:event', { detail: { name: 'quest_invitation_dismissed' } }));
    });
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#!') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Initialize animations on scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Initialize all features when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initQuestEntryPoints();
    initSmoothScroll();
    initScrollAnimations();
});
