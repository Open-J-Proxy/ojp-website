// Open J Proxy Website - Main JavaScript

// Mobile menu toggle functionality
function initMobileMenu() {
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
    initSmoothScroll();
    initScrollAnimations();
});

// Handle window resize
window.addEventListener('resize', () => {
    initMobileMenu();
});
