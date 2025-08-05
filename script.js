// DYS Library JavaScript - Advanced Interactive Features

class DYSLibrary {
    constructor() {
        this.currentPage = 1;
        this.itemsPerPage = 12;
        this.searchTerm = '';
        this.activeFilters = {
            category: '',
            type: '',
            date: ''
        };
        
        // Sample document data - in a real application, this would come from a backend
        this.documents = [
            {
                id: 1,
                title: "The Philosophical Foundations of Sanatan Dharma",
                category: "dharma",
                type: "pdf",
                date: "2024-12-01",
                author: "Dr. Rajesh Sharma",
                pages: 45,
                downloads: 1200,
                description: "A comprehensive analysis of the core philosophical principles that form the foundation of Sanatan Dharma...",
                tags: ["philosophy", "dharma", "vedanta", "spirituality"],
                featured: true
            },
            {
                id: 2,
                title: "Cultural Erosion Patterns in Modern Society",
                category: "culture",
                type: "report",
                date: "2024-11-15",
                author: "Team SRD Research",
                pages: 72,
                downloads: 890,
                description: "Documenting systematic approaches to cultural dismantling and their long-term civilizational impacts...",
                tags: ["culture", "society", "preservation", "analysis"],
                featured: true
            },
            {
                id: 3,
                title: "Ideological Frameworks: A Comparative Study",
                category: "comparative",
                type: "essay",
                date: "2024-11-10",
                author: "Prof. Meera Gupta",
                pages: 68,
                downloads: 1500,
                description: "An evidence-based examination of various ideological systems and their documented effects...",
                tags: ["ideology", "comparative", "analysis", "systems"],
                featured: true
            },
            {
                id: 4,
                title: "Ancient Wisdom vs Modern Materialism",
                category: "dharma",
                type: "thread",
                date: "2024-12-05",
                author: "Digital Dharma Team",
                pages: 25,
                downloads: 650,
                description: "A detailed thread exploring the conflicts between traditional wisdom and modern materialistic approaches...",
                tags: ["wisdom", "materialism", "tradition", "modern"],
                featured: false
            },
            {
                id: 5,
                title: "Historical Evidence of Cultural Transformation",
                category: "history",
                type: "pdf",
                date: "2024-10-20",
                author: "Historical Research Group",
                pages: 120,
                downloads: 2100,
                description: "Deep historical analysis of cultural changes and their documented patterns across civilizations...",
                tags: ["history", "culture", "transformation", "civilization"],
                featured: false
            },
            {
                id: 6,
                title: "Modern Challenges to Traditional Values",
                category: "modern",
                type: "report",
                date: "2024-12-08",
                author: "Contemporary Studies Team",
                pages: 55,
                downloads: 780,
                description: "Contemporary threats to traditional wisdom and value systems in the digital age...",
                tags: ["modern", "challenges", "values", "digital"],
                featured: false
            }
        ];

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderFeaturedDocuments();
        this.setupSmoothScrolling();
        this.setupMobileNavigation();
        this.setupSearchFunctionality();
        this.setupNewsletterForm();
        this.addScrollEffects();
    }

    setupEventListeners() {
        // Navigation
        document.addEventListener('DOMContentLoaded', () => {
            this.setupNavigation();
        });

        // Search functionality
        const searchBtn = document.getElementById('search-btn');
        const searchInput = document.getElementById('search-input');
        
        if (searchBtn) {
            searchBtn.addEventListener('click', () => this.performSearch());
        }
        
        if (searchInput) {
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.performSearch();
                }
            });
        }

        // Filter functionality
        const categoryFilter = document.getElementById('category-filter');
        const typeFilter = document.getElementById('type-filter');
        const dateFilter = document.getElementById('date-filter');

        [categoryFilter, typeFilter, dateFilter].forEach(filter => {
            if (filter) {
                filter.addEventListener('change', () => this.applyFilters());
            }
        });

        // Window events
        window.addEventListener('scroll', () => this.handleScroll());
        window.addEventListener('resize', () => this.handleResize());
    }

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }

                // Update active navigation
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });

        // Update navigation on scroll
        const sections = document.querySelectorAll('section[id]');
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    setupMobileNavigation() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
            });

            // Close mobile menu when clicking on a link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                });
            });
        }
    }

    setupSearchFunctionality() {
        const searchInput = document.getElementById('search-input');
        
        if (searchInput) {
            // Auto-complete suggestions
            searchInput.addEventListener('input', (e) => {
                this.showSearchSuggestions(e.target.value);
            });
        }
    }

    performSearch() {
        const searchInput = document.getElementById('search-input');
        const searchResults = document.getElementById('search-results');
        
        if (!searchInput || !searchResults) return;

        this.searchTerm = searchInput.value.toLowerCase().trim();
        
        if (this.searchTerm === '') {
            searchResults.innerHTML = '<p class="no-results">Please enter a search term</p>';
            return;
        }

        const filteredDocs = this.documents.filter(doc => {
            const matchesSearch = 
                doc.title.toLowerCase().includes(this.searchTerm) ||
                doc.description.toLowerCase().includes(this.searchTerm) ||
                doc.author.toLowerCase().includes(this.searchTerm) ||
                doc.tags.some(tag => tag.toLowerCase().includes(this.searchTerm));
            
            const matchesFilters = this.checkDocumentFilters(doc);
            
            return matchesSearch && matchesFilters;
        });

        this.renderSearchResults(filteredDocs);
    }

    applyFilters() {
        const categoryFilter = document.getElementById('category-filter');
        const typeFilter = document.getElementById('type-filter');
        const dateFilter = document.getElementById('date-filter');

        this.activeFilters = {
            category: categoryFilter ? categoryFilter.value : '',
            type: typeFilter ? typeFilter.value : '',
            date: dateFilter ? dateFilter.value : ''
        };

        this.performSearch();
    }

    checkDocumentFilters(doc) {
        if (this.activeFilters.category && doc.category !== this.activeFilters.category) {
            return false;
        }
        
        if (this.activeFilters.type && doc.type !== this.activeFilters.type) {
            return false;
        }
        
        if (this.activeFilters.date) {
            const docDate = new Date(doc.date);
            const now = new Date();
            const diffTime = Math.abs(now - docDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            switch (this.activeFilters.date) {
                case 'week':
                    if (diffDays > 7) return false;
                    break;
                case 'month':
                    if (diffDays > 30) return false;
                    break;
                case 'year':
                    if (diffDays > 365) return false;
                    break;
            }
        }
        
        return true;
    }

    renderSearchResults(documents) {
        const searchResults = document.getElementById('search-results');
        
        if (!searchResults) return;

        if (documents.length === 0) {
            searchResults.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>No results found</h3>
                    <p>Try adjusting your search terms or filters</p>
                </div>
            `;
            return;
        }

        const resultsHTML = documents.map(doc => `
            <div class="search-result-item">
                <div class="result-header">
                    <span class="result-category">${this.getCategoryName(doc.category)}</span>
                    <span class="result-type">${doc.type.toUpperCase()}</span>
                </div>
                <h3 class="result-title">${doc.title}</h3>
                <p class="result-description">${doc.description}</p>
                <div class="result-meta">
                    <span><i class="fas fa-user"></i> ${doc.author}</span>
                    <span><i class="fas fa-calendar"></i> ${this.formatDate(doc.date)}</span>
                    <span><i class="fas fa-file-pdf"></i> ${doc.pages} pages</span>
                    <span><i class="fas fa-download"></i> ${doc.downloads} downloads</span>
                </div>
                <div class="result-tags">
                    ${doc.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <div class="result-actions">
                    <button class="btn btn-primary" onclick="window.open('#', '_blank')">
                        <i class="fas fa-eye"></i> View Document
                    </button>
                    <button class="btn btn-outline" onclick="this.downloadDocument(${doc.id})">
                        <i class="fas fa-download"></i> Download
                    </button>
                </div>
            </div>
        `).join('');

        searchResults.innerHTML = `
            <div class="search-results-header">
                <h3>Search Results (${documents.length} found)</h3>
                <div class="results-sort">
                    <select onchange="this.sortResults(this.value)">
                        <option value="relevance">Sort by Relevance</option>
                        <option value="date">Sort by Date</option>
                        <option value="downloads">Sort by Popularity</option>
                        <option value="title">Sort by Title</option>
                    </select>
                </div>
            </div>
            <div class="search-results-grid">
                ${resultsHTML}
            </div>
        `;
    }

    renderFeaturedDocuments() {
        const featuredDocs = this.documents.filter(doc => doc.featured);
        const researchGrid = document.querySelector('.research-grid');
        
        if (!researchGrid) return;

        const featuredHTML = featuredDocs.map(doc => `
            <article class="research-item">
                <div class="research-header">
                    <span class="research-category">${this.getCategoryName(doc.category)}</span>
                    <span class="research-date">${this.formatDate(doc.date)}</span>
                </div>
                <h3>${doc.title}</h3>
                <p>${doc.description}</p>
                <div class="research-meta">
                    <span><i class="fas fa-file-pdf"></i> ${doc.type.toUpperCase()} • ${doc.pages} pages</span>
                    <span><i class="fas fa-download"></i> ${doc.downloads} downloads</span>
                </div>
                <a href="#" class="research-link" onclick="this.viewDocument(${doc.id})">Read Study</a>
            </article>
        `).join('');

        researchGrid.innerHTML = featuredHTML;
    }

    showSearchSuggestions(query) {
        if (query.length < 2) return;

        const suggestions = this.documents
            .filter(doc => 
                doc.title.toLowerCase().includes(query.toLowerCase()) ||
                doc.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
            )
            .slice(0, 5)
            .map(doc => doc.title);

        // In a real application, you would show these suggestions in a dropdown
        console.log('Search suggestions:', suggestions);
    }

    setupNewsletterForm() {
        const newsletterForm = document.querySelector('.newsletter-form');
        
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = newsletterForm.querySelector('input[type="email"]').value;
                
                if (this.validateEmail(email)) {
                    this.subscribeToNewsletter(email);
                } else {
                    this.showNotification('Please enter a valid email address', 'error');
                }
            });
        }
    }

    subscribeToNewsletter(email) {
        // Simulate newsletter subscription
        setTimeout(() => {
            this.showNotification('Thank you for subscribing to our newsletter!', 'success');
            document.querySelector('.newsletter-form input[type="email"]').value = '';
        }, 1000);
    }

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    setupSmoothScrolling() {
        // Enhanced smooth scrolling for all anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    handleScroll() {
        const header = document.querySelector('.header');
        
        if (header) {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        // Animate elements on scroll
        this.animateOnScroll();
    }

    animateOnScroll() {
        const elements = document.querySelectorAll('.collection-card, .research-item, .stat-card');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate-in');
            }
        });
    }

    addScrollEffects() {
        // Add CSS for scroll animations
        const style = document.createElement('style');
        style.textContent = `
            .collection-card, .research-item, .stat-card {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s ease;
            }
            
            .collection-card.animate-in, .research-item.animate-in, .stat-card.animate-in {
                opacity: 1;
                transform: translateY(0);
            }
            
            .header.scrolled {
                background: rgba(10, 10, 10, 0.98);
                box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
            }
        `;
        document.head.appendChild(style);
    }

    handleResize() {
        // Handle responsive adjustments
        if (window.innerWidth > 768) {
            const navMenu = document.getElementById('nav-menu');
            const navToggle = document.getElementById('nav-toggle');
            
            if (navMenu) navMenu.classList.remove('active');
            if (navToggle) navToggle.classList.remove('active');
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;

        document.body.appendChild(notification);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);

        // Add notification styles
        if (!document.querySelector('#notification-styles')) {
            const notificationStyles = document.createElement('style');
            notificationStyles.id = 'notification-styles';
            notificationStyles.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: var(--bg-card);
                    border: 1px solid var(--bg-tertiary);
                    border-radius: var(--radius-md);
                    padding: var(--spacing-md);
                    box-shadow: var(--shadow-lg);
                    z-index: 10000;
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-md);
                    min-width: 300px;
                    animation: slideIn 0.3s ease;
                }
                
                .notification-success {
                    border-left: 4px solid var(--success-color);
                }
                
                .notification-error {
                    border-left: 4px solid #ff4d4f;
                }
                
                .notification-info {
                    border-left: 4px solid var(--primary-color);
                }
                
                .notification-content {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-sm);
                    flex: 1;
                }
                
                .notification-close {
                    background: none;
                    border: none;
                    color: var(--text-muted);
                    cursor: pointer;
                    padding: var(--spacing-xs);
                }
                
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
            `;
            document.head.appendChild(notificationStyles);
        }
    }

    // Utility methods
    getCategoryName(category) {
        const categoryNames = {
            'dharma': 'Dharmic Studies',
            'culture': 'Cultural Analysis',
            'comparative': 'Comparative Studies',
            'history': 'Historical Research',
            'modern': 'Modern Challenges',
            'evidence': 'Evidence Archive'
        };
        return categoryNames[category] || category;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    }

    viewDocument(id) {
        // In a real application, this would open the document
        console.log(`Viewing document with ID: ${id}`);
        this.showNotification('Document viewer would open here', 'info');
    }

    downloadDocument(id) {
        // In a real application, this would trigger a download
        console.log(`Downloading document with ID: ${id}`);
        this.showNotification('Download started successfully', 'success');
    }

    sortResults(sortBy) {
        // Implementation for sorting search results
        console.log(`Sorting results by: ${sortBy}`);
    }
}

// Initialize the library when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.dysLibrary = new DYSLibrary();
});

// Additional utility functions
function toggleTheme() {
    document.body.classList.toggle('light-theme');
    localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
}

function shareDocument(id, title) {
    if (navigator.share) {
        navigator.share({
            title: title,
            text: 'Check out this document from DYS Library',
            url: window.location.href
        });
    } else {
        // Fallback for browsers that don't support Web Share API
        navigator.clipboard.writeText(window.location.href);
        dysLibrary.showNotification('Link copied to clipboard', 'success');
    }
}

// Load saved theme preference
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    }
});

// Analytics and tracking (placeholder)
function trackEvent(eventName, eventData) {
    console.log(`Analytics Event: ${eventName}`, eventData);
    // In a real application, this would send data to analytics service
}

// Service Worker registration for offline functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DYSLibrary;
}