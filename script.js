// Dharm Yuva Sangathan - Youth Empowerment Platform
// Main JavaScript File

class DharmYuvaSangathan {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupScrollAnimations();
        this.setupFormHandling();
        this.setupMobileNavigation();
        this.setupSmoothScrolling();
        this.setupStatsAnimation();
    }

    setupEventListeners() {
        // Navigation toggle
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
            });

            // Close menu when clicking on a link
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                });
            });
        }

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });

        // Window scroll effects
        window.addEventListener('scroll', () => {
            this.handleScrollEffects();
        });

        // Window resize
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    setupScrollAnimations() {
        // Create intersection observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animateElements = document.querySelectorAll(`
            .mission-item,
            .highlight-item,
            .activity-card,
            .event-item,
            .testimonial-card,
            .membership-card
        `);

        animateElements.forEach(el => {
            observer.observe(el);
        });
    }

    setupFormHandling() {
        const contactForm = document.getElementById('contactForm');
        
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleContactForm(contactForm);
            });
        }
    }

    handleContactForm(form) {
        const formData = new FormData(form);
        const data = {};
        
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            this.showNotification('Thank you for your message! We will contact you soon.', 'success');
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
                <span>${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        // Add styles if not already present
        if (!document.querySelector('#notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'notification-styles';
            styles.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: var(--bg-card);
                    border: 1px solid var(--bg-tertiary);
                    border-radius: var(--radius-lg);
                    padding: 1rem;
                    box-shadow: var(--shadow-lg);
                    z-index: 10000;
                    max-width: 400px;
                    animation: slideInRight 0.3s ease;
                }
                .notification-success {
                    border-left: 4px solid var(--primary-color);
                }
                .notification-content {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                }
                .notification-content i:first-child {
                    color: var(--primary-color);
                }
                .notification-close {
                    background: none;
                    border: none;
                    color: var(--text-muted);
                    cursor: pointer;
                    margin-left: auto;
                }
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `;
            document.head.appendChild(styles);
        }

        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }

    setupMobileNavigation() {
        // Add mobile navigation styles if not present
        if (!document.querySelector('#mobile-nav-styles')) {
            const styles = document.createElement('style');
            styles.id = 'mobile-nav-styles';
            styles.textContent = `
                @media (max-width: 768px) {
                    .nav-menu {
                        position: fixed;
                        top: 0;
                        right: -100%;
                        width: 280px;
                        height: 100vh;
                        background: var(--bg-card);
                        flex-direction: column;
                        justify-content: flex-start;
                        align-items: flex-start;
                        padding: 80px 2rem 2rem;
                        transition: right 0.3s ease;
                        box-shadow: var(--shadow-lg);
                        z-index: 999;
                    }
                    .nav-menu.active {
                        right: 0;
                    }
                    .nav-link {
                        width: 100%;
                        padding: 1rem 0;
                        border-bottom: 1px solid var(--bg-tertiary);
                    }
                    .nav-toggle {
                        display: flex;
                        flex-direction: column;
                        cursor: pointer;
                        z-index: 1000;
                    }
                    .nav-toggle .bar {
                        width: 25px;
                        height: 3px;
                        background: var(--text-primary);
                        margin: 3px 0;
                        transition: 0.3s;
                    }
                    .nav-toggle.active .bar:nth-child(1) {
                        transform: rotate(-45deg) translate(-5px, 6px);
                    }
                    .nav-toggle.active .bar:nth-child(2) {
                        opacity: 0;
                    }
                    .nav-toggle.active .bar:nth-child(3) {
                        transform: rotate(45deg) translate(-5px, -6px);
                    }
                }
            `;
            document.head.appendChild(styles);
        }
    }

    setupSmoothScrolling() {
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    setupStatsAnimation() {
        const stats = document.querySelectorAll('.stat-number');
        
        const animateStats = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const finalNumber = target.textContent;
                    const number = parseInt(finalNumber.replace(/\D/g, ''));
                    const suffix = finalNumber.replace(/[0-9,]/g, '');
                    
                    this.animateNumber(target, 0, number, 2000, suffix);
                    observer.unobserve(target);
                }
            });
        };

        const statsObserver = new IntersectionObserver(animateStats, {
            threshold: 0.7
        });

        stats.forEach(stat => {
            statsObserver.observe(stat);
        });
    }

    animateNumber(element, start, end, duration, suffix = '') {
        const startTime = performance.now();
        
        const updateNumber = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (end - start) * easeOutCubic);
            
            element.textContent = this.formatNumber(current) + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            }
        };
        
        requestAnimationFrame(updateNumber);
    }

    formatNumber(num) {
        if (num >= 1000) {
            return (num / 1000).toFixed(0) + 'K';
        }
        return num.toLocaleString();
    }

    handleScrollEffects() {
        const header = document.querySelector('.header');
        const scrolled = window.pageYOffset;
        
        if (header) {
            if (scrolled > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        // Parallax effect for hero section
        const hero = document.querySelector('.hero');
        if (hero && scrolled < window.innerHeight) {
            const parallaxSpeed = 0.5;
            hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    }

    handleResize() {
        // Handle any resize-specific logic
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }

    // Utility function to add floating animation styles
    addFloatingAnimations() {
        if (!document.querySelector('#floating-animations')) {
            const styles = document.createElement('style');
            styles.id = 'floating-animations';
            styles.textContent = `
                .animate-in {
                    animation: fadeInUp 0.6s ease forwards;
                }
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .header.scrolled {
                    background: rgba(10, 10, 10, 0.95);
                    backdrop-filter: blur(10px);
                    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
                }
            `;
            document.head.appendChild(styles);
        }
    }

    // Method to handle membership applications
    handleMembershipApplication(type) {
        const membershipData = {
            'student': {
                title: 'Student Member Application',
                description: 'Thank you for your interest in becoming a Student Member!'
            },
            'volunteer': {
                title: 'Active Volunteer Application',
                description: 'We appreciate your willingness to volunteer with us!'
            },
            'supporter': {
                title: 'Supporter Application',
                description: 'Thank you for supporting our mission!'
            }
        };

        const data = membershipData[type] || membershipData['student'];
        this.showNotification(`${data.description} Please fill out the contact form below.`, 'success');
        
        // Scroll to contact form
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new DharmYuvaSangathan();
    app.addFloatingAnimations();
    
    // Make app globally accessible for inline event handlers
    window.dharmYuvaSangathan = app;
    
    // Add click handlers for membership cards
    document.querySelectorAll('.membership-card .btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const card = btn.closest('.membership-card');
            const membershipType = card.querySelector('h3').textContent.toLowerCase().replace(' ', '-');
            app.handleMembershipApplication(membershipType);
        });
    });
    
    // Add loading animation removal
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
});

// Add global styles for loading state
const globalStyles = document.createElement('style');
globalStyles.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    body.loaded {
        opacity: 1;
    }
    .header {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(globalStyles);