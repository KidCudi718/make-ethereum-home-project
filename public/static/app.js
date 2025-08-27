/**
 * The Complete Ethereum Story - Interactive JavaScript
 * Comprehensive client-side functionality for enhanced user experience
 */

// =============================================================================
// Core Application State & Configuration
// =============================================================================
const EthereumStory = {
  // Application state
  state: {
    currentTheme: localStorage.getItem('theme') || 'auto',
    mobileMenuOpen: false,
    tocVisible: true,
    scrollProgress: 0,
    activeSection: '',
    searchQuery: '',
    glossaryTerms: []
  },

  // Configuration
  config: {
    scrollOffset: 100, // Offset for scroll-to-section
    progressUpdateThrottle: 16, // ~60fps for scroll progress
    searchDebounce: 300, // Debounce search input
    animationDuration: 300, // Standard animation duration
    breakpoints: {
      mobile: 768,
      tablet: 1024,
      desktop: 1200
    }
  },

  // Initialize application
  init() {
    this.setupEventListeners();
    this.initializeTheme();
    this.initializeScrollProgress();
    this.initializeTOC();
    this.initializeGlossarySearch();
    this.initializeMobileMenu();
    this.initializeAccessibility();
    console.log('🚀 Ethereum Story app initialized');
  }
};

// =============================================================================
// Theme Management System
// =============================================================================
EthereumStory.theme = {
  // Set theme and update UI
  setTheme(theme) {
    EthereumStory.state.currentTheme = theme;
    localStorage.setItem('theme', theme);
    
    const effectiveTheme = this.getEffectiveTheme(theme);
    document.documentElement.setAttribute('data-theme', effectiveTheme);
    
    // Update theme toggle button
    this.updateThemeToggleButton(theme);
    
    // Dispatch custom event for theme change
    document.dispatchEvent(new CustomEvent('themeChanged', { 
      detail: { theme: effectiveTheme } 
    }));
    
    console.log(`🎨 Theme set to: ${theme} (effective: ${effectiveTheme})`);
  },

  // Get effective theme (resolve 'auto' to actual theme)
  getEffectiveTheme(theme = EthereumStory.state.currentTheme) {
    if (theme === 'auto') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return theme;
  },

  // Update theme toggle button appearance
  updateThemeToggleButton(theme) {
    const button = document.getElementById('theme-toggle');
    if (!button) return;

    const icons = {
      light: '☀️',
      dark: '🌙',
      auto: '🔄'
    };

    const labels = {
      light: 'Switch to dark theme',
      dark: 'Switch to auto theme', 
      auto: 'Switch to light theme'
    };

    button.innerHTML = icons[theme] || icons.auto;
    button.setAttribute('aria-label', labels[theme] || labels.auto);
    button.title = labels[theme] || labels.auto;
  },

  // Toggle to next theme in cycle
  toggleTheme() {
    const themes = ['light', 'dark', 'auto'];
    const currentIndex = themes.indexOf(EthereumStory.state.currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    this.setTheme(themes[nextIndex]);
  },

  // Initialize theme system
  initialize() {
    // Set initial theme
    this.setTheme(EthereumStory.state.currentTheme);

    // Listen for system theme changes when in auto mode
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addListener(() => {
      if (EthereumStory.state.currentTheme === 'auto') {
        this.setTheme('auto'); // Refresh auto theme
      }
    });

    // Theme toggle button event
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => this.toggleTheme());
    }
  }
};

// =============================================================================
// Mobile Navigation Menu
// =============================================================================
EthereumStory.mobileMenu = {
  // Toggle mobile menu
  toggle() {
    EthereumStory.state.mobileMenuOpen = !EthereumStory.state.mobileMenuOpen;
    this.update();
  },

  // Close mobile menu
  close() {
    EthereumStory.state.mobileMenuOpen = false;
    this.update();
  },

  // Update mobile menu UI
  update() {
    const nav = document.querySelector('.header__nav');
    const toggle = document.getElementById('mobile-menu-toggle');
    
    if (!nav || !toggle) return;

    if (EthereumStory.state.mobileMenuOpen) {
      nav.classList.add('header__nav--mobile-open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.innerHTML = '✕';
      toggle.setAttribute('aria-label', 'Close navigation menu');
      
      // Trap focus in mobile menu
      this.trapFocus(nav);
    } else {
      nav.classList.remove('header__nav--mobile-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.innerHTML = '☰';
      toggle.setAttribute('aria-label', 'Open navigation menu');
      
      // Remove focus trap
      this.removeFocusTrap();
    }
  },

  // Trap focus within mobile menu
  trapFocus(container) {
    const focusableElements = container.querySelectorAll(
      'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length === 0) return;
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    // Focus first element
    firstElement.focus();
    
    // Handle tab navigation
    this.focusTrapHandler = (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
      
      if (e.key === 'Escape') {
        this.close();
      }
    };
    
    document.addEventListener('keydown', this.focusTrapHandler);
  },

  // Remove focus trap
  removeFocusTrap() {
    if (this.focusTrapHandler) {
      document.removeEventListener('keydown', this.focusTrapHandler);
      this.focusTrapHandler = null;
    }
  },

  // Initialize mobile menu
  initialize() {
    const toggle = document.getElementById('mobile-menu-toggle');
    if (!toggle) return;

    // Toggle button click
    toggle.addEventListener('click', () => this.toggle());

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && EthereumStory.state.mobileMenuOpen) {
        this.close();
      }
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      const nav = document.querySelector('.header__nav');
      if (EthereumStory.state.mobileMenuOpen && 
          !nav?.contains(e.target) && 
          !toggle.contains(e.target)) {
        this.close();
      }
    });

    // Close on window resize to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > EthereumStory.config.breakpoints.mobile) {
        this.close();
      }
    });

    // Initialize ARIA attributes
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', 'main-navigation');
    toggle.setAttribute('aria-label', 'Open navigation menu');
  }
};

// =============================================================================
// Scroll Progress Indicator
// =============================================================================
EthereumStory.scrollProgress = {
  // Update progress bar
  update() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min(scrollTop / docHeight, 1) * 100;
    
    EthereumStory.state.scrollProgress = progress;
    
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }
    
    // Update reading time estimate
    this.updateReadingTime(progress);
  },

  // Update reading time estimate
  updateReadingTime(progress) {
    const readingTimeElement = document.getElementById('reading-time');
    if (!readingTimeElement) return;
    
    // Estimate based on average reading speed (200 words per minute)
    const totalWords = this.getTotalWordCount();
    const wordsRead = Math.floor(totalWords * (progress / 100));
    const wordsRemaining = totalWords - wordsRead;
    const minutesRemaining = Math.ceil(wordsRemaining / 200);
    
    if (progress < 5) {
      readingTimeElement.textContent = `${Math.ceil(totalWords / 200)} min read`;
    } else if (progress > 95) {
      readingTimeElement.textContent = 'Reading complete';
    } else {
      readingTimeElement.textContent = `${minutesRemaining} min remaining`;
    }
  },

  // Get total word count (cached for performance)
  getTotalWordCount() {
    if (this.cachedWordCount) return this.cachedWordCount;
    
    const content = document.querySelector('.chapter-content');
    if (!content) return 0;
    
    const text = content.textContent || content.innerText || '';
    this.cachedWordCount = text.trim().split(/\s+/).length;
    return this.cachedWordCount;
  },

  // Initialize scroll progress
  initialize() {
    // Create progress bar if it doesn't exist
    let progressBar = document.querySelector('.progress-bar');
    if (!progressBar) {
      progressBar = document.createElement('div');
      progressBar.className = 'progress-bar';
      progressBar.setAttribute('role', 'progressbar');
      progressBar.setAttribute('aria-label', 'Reading progress');
      document.body.appendChild(progressBar);
    }

    // Throttled scroll handler
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.update();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial update
    this.update();

    // Listen to scroll events
    window.addEventListener('scroll', handleScroll, { passive: true });
  }
};

// =============================================================================
// Table of Contents & Navigation
// =============================================================================
EthereumStory.tableOfContents = {
  // Build TOC from page headings
  build() {
    const tocContainer = document.querySelector('.toc__list');
    if (!tocContainer) return;

    const headings = document.querySelectorAll('.chapter-section__title, h2, h3');
    if (headings.length === 0) return;

    tocContainer.innerHTML = '';

    headings.forEach((heading, index) => {
      // Ensure heading has an ID
      if (!heading.id) {
        heading.id = this.generateId(heading.textContent, index);
      }

      // Create TOC item
      const li = document.createElement('li');
      li.className = 'toc__item';

      const link = document.createElement('a');
      link.href = `#${heading.id}`;
      link.className = 'toc__link';
      link.textContent = heading.textContent.trim();
      link.setAttribute('data-section', heading.id);

      // Add click handler for smooth scrolling
      link.addEventListener('click', (e) => this.handleTocClick(e, heading.id));

      li.appendChild(link);
      tocContainer.appendChild(li);
    });

    console.log(`📑 Built TOC with ${headings.length} sections`);
  },

  // Generate ID from text
  generateId(text, index) {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') || `section-${index}`;
  },

  // Handle TOC link clicks
  handleTocClick(e, sectionId) {
    e.preventDefault();
    
    const target = document.getElementById(sectionId);
    if (!target) return;

    // Close mobile menu if open
    if (EthereumStory.state.mobileMenuOpen) {
      EthereumStory.mobileMenu.close();
    }

    // Smooth scroll to section
    this.scrollToSection(target);

    // Update active state
    this.setActiveSection(sectionId);

    // Update URL
    history.pushState(null, '', `#${sectionId}`);
  },

  // Smooth scroll to section
  scrollToSection(target) {
    const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
    const offset = target.offsetTop - headerHeight - EthereumStory.config.scrollOffset;

    window.scrollTo({
      top: offset,
      behavior: 'smooth'
    });
  },

  // Set active section in TOC
  setActiveSection(sectionId) {
    EthereumStory.state.activeSection = sectionId;

    // Update TOC links
    document.querySelectorAll('.toc__link').forEach(link => {
      link.classList.remove('toc__link--active');
      if (link.getAttribute('data-section') === sectionId) {
        link.classList.add('toc__link--active');
      }
    });
  },

  // Update active section based on scroll position
  updateActiveSection() {
    const sections = document.querySelectorAll('.chapter-section, [id^="section-"]');
    if (sections.length === 0) return;

    const scrollPos = window.pageYOffset + EthereumStory.config.scrollOffset + 100;
    let currentSection = '';

    sections.forEach(section => {
      if (section.offsetTop <= scrollPos) {
        currentSection = section.id;
      }
    });

    if (currentSection && currentSection !== EthereumStory.state.activeSection) {
      this.setActiveSection(currentSection);
    }
  },

  // Handle initial hash navigation
  handleInitialHash() {
    const hash = window.location.hash.substring(1);
    if (hash) {
      // Delay to ensure page is fully loaded
      setTimeout(() => {
        const target = document.getElementById(hash);
        if (target) {
          this.scrollToSection(target);
          this.setActiveSection(hash);
        }
      }, 100);
    }
  },

  // Initialize TOC
  initialize() {
    this.build();
    this.handleInitialHash();

    // Update active section on scroll
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.updateActiveSection();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    // Handle browser back/forward
    window.addEventListener('popstate', () => {
      this.handleInitialHash();
    });
  }
};

// =============================================================================
// Glossary Search Functionality
// =============================================================================
EthereumStory.glossarySearch = {
  // Initialize glossary search
  initialize() {
    const searchInput = document.getElementById('glossary-search');
    const glossaryContainer = document.querySelector('.glossary-grid');
    
    if (!searchInput || !glossaryContainer) return;

    // Store original terms for filtering
    this.originalTerms = Array.from(glossaryContainer.children);
    EthereumStory.state.glossaryTerms = this.originalTerms.map(term => ({
      element: term,
      title: term.querySelector('.glossary-term__title')?.textContent.toLowerCase() || '',
      definition: term.querySelector('.glossary-term__definition')?.textContent.toLowerCase() || ''
    }));

    // Debounced search handler
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        this.performSearch(e.target.value);
      }, EthereumStory.config.searchDebounce);
    });

    // Clear search on escape
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        searchInput.value = '';
        this.performSearch('');
        searchInput.blur();
      }
    });

    // Search button functionality
    const searchButton = document.getElementById('glossary-search-button');
    if (searchButton) {
      searchButton.addEventListener('click', () => {
        this.performSearch(searchInput.value);
      });
    }

    console.log(`🔍 Glossary search initialized with ${EthereumStory.state.glossaryTerms.length} terms`);
  },

  // Perform search and filter terms
  performSearch(query) {
    EthereumStory.state.searchQuery = query.toLowerCase().trim();
    const container = document.querySelector('.glossary-grid');
    
    if (!container) return;

    // Show results count
    this.updateResultsCount();

    // Filter and display terms
    if (!EthereumStory.state.searchQuery) {
      // Show all terms
      EthereumStory.state.glossaryTerms.forEach(term => {
        term.element.style.display = '';
        this.removeHighlight(term.element);
      });
    } else {
      // Filter terms
      let visibleCount = 0;
      
      EthereumStory.state.glossaryTerms.forEach(term => {
        const titleMatch = term.title.includes(EthereumStory.state.searchQuery);
        const definitionMatch = term.definition.includes(EthereumStory.state.searchQuery);
        
        if (titleMatch || definitionMatch) {
          term.element.style.display = '';
          this.highlightMatches(term.element, EthereumStory.state.searchQuery);
          visibleCount++;
        } else {
          term.element.style.display = 'none';
          this.removeHighlight(term.element);
        }
      });

      // Show no results message
      this.toggleNoResultsMessage(visibleCount === 0);
    }
  },

  // Highlight search matches
  highlightMatches(element, query) {
    if (!query) return;

    const title = element.querySelector('.glossary-term__title');
    const definition = element.querySelector('.glossary-term__definition');

    if (title) {
      title.innerHTML = this.highlightText(title.textContent, query);
    }

    if (definition) {
      definition.innerHTML = this.highlightText(definition.textContent, query);
    }
  },

  // Remove highlighting
  removeHighlight(element) {
    const title = element.querySelector('.glossary-term__title');
    const definition = element.querySelector('.glossary-term__definition');

    if (title) {
      title.innerHTML = title.textContent;
    }

    if (definition) {
      definition.innerHTML = definition.textContent;
    }
  },

  // Highlight text matches
  highlightText(text, query) {
    if (!query) return text;
    
    const regex = new RegExp(`(${this.escapeRegex(query)})`, 'gi');
    return text.replace(regex, '<mark class="search-highlight">$1</mark>');
  },

  // Escape regex special characters
  escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  },

  // Update results count
  updateResultsCount() {
    let countElement = document.getElementById('search-results-count');
    
    if (!countElement) {
      countElement = document.createElement('div');
      countElement.id = 'search-results-count';
      countElement.className = 'search-results-count';
      
      const searchInput = document.getElementById('glossary-search');
      if (searchInput?.parentNode) {
        searchInput.parentNode.insertBefore(countElement, searchInput.nextSibling);
      }
    }

    const visibleTerms = EthereumStory.state.glossaryTerms.filter(term => 
      term.element.style.display !== 'none'
    ).length;

    const totalTerms = EthereumStory.state.glossaryTerms.length;

    if (EthereumStory.state.searchQuery) {
      countElement.textContent = `${visibleTerms} of ${totalTerms} terms`;
      countElement.style.display = 'block';
    } else {
      countElement.style.display = 'none';
    }
  },

  // Toggle no results message
  toggleNoResultsMessage(show) {
    let messageElement = document.getElementById('no-results-message');
    
    if (show && !messageElement) {
      messageElement = document.createElement('div');
      messageElement.id = 'no-results-message';
      messageElement.className = 'no-results-message';
      messageElement.innerHTML = `
        <div class="text-center" style="padding: var(--space-8);">
          <p>No terms found matching "<strong>${EthereumStory.state.searchQuery}</strong>"</p>
          <p><small>Try searching for related terms or check your spelling.</small></p>
        </div>
      `;
      
      const container = document.querySelector('.glossary-grid');
      if (container?.parentNode) {
        container.parentNode.insertBefore(messageElement, container.nextSibling);
      }
    } else if (!show && messageElement) {
      messageElement.remove();
    }
  }
};

// =============================================================================
// Accessibility Enhancements
// =============================================================================
EthereumStory.accessibility = {
  // Initialize accessibility features
  initialize() {
    this.setupKeyboardNavigation();
    this.setupSkipLinks();
    this.setupFocusManagement();
    this.setupScreenReaderAnnouncements();
    this.setupReducedMotion();
  },

  // Setup keyboard navigation
  setupKeyboardNavigation() {
    // Global keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      // Alt + T: Toggle theme
      if (e.altKey && e.key.toLowerCase() === 't') {
        e.preventDefault();
        EthereumStory.theme.toggleTheme();
        this.announceToScreenReader('Theme toggled');
      }

      // Alt + M: Toggle mobile menu
      if (e.altKey && e.key.toLowerCase() === 'm') {
        e.preventDefault();
        EthereumStory.mobileMenu.toggle();
      }

      // Alt + S: Focus search (if on glossary page)
      if (e.altKey && e.key.toLowerCase() === 's') {
        const searchInput = document.getElementById('glossary-search');
        if (searchInput) {
          e.preventDefault();
          searchInput.focus();
          this.announceToScreenReader('Search focused');
        }
      }
    });

    // Enhanced tab navigation for complex components
    this.setupTabTrapping();
  },

  // Setup skip links for screen readers
  setupSkipLinks() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link sr-only';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
      position: absolute;
      top: -40px;
      left: 6px;
      background: var(--ethereum-primary);
      color: white;
      padding: 8px;
      text-decoration: none;
      border-radius: 4px;
      z-index: 1000;
    `;

    // Show on focus
    skipLink.addEventListener('focus', () => {
      skipLink.style.top = '6px';
    });

    skipLink.addEventListener('blur', () => {
      skipLink.style.top = '-40px';
    });

    document.body.insertBefore(skipLink, document.body.firstChild);
  },

  // Setup focus management
  setupFocusManagement() {
    // Add focus indicators for custom elements
    const focusableElements = document.querySelectorAll(
      '.card, .glossary-term, .toc__link'
    );

    focusableElements.forEach(element => {
      if (!element.hasAttribute('tabindex')) {
        element.setAttribute('tabindex', '0');
      }
    });

    // Enhanced focus visibility
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('user-is-tabbing');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('user-is-tabbing');
    });
  },

  // Setup tab trapping for modal-like components
  setupTabTrapping() {
    // This is handled in the mobile menu component
    // Could be extended for other modal components
  },

  // Setup screen reader announcements
  setupScreenReaderAnnouncements() {
    // Create live region for announcements
    const liveRegion = document.createElement('div');
    liveRegion.id = 'live-region';
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    document.body.appendChild(liveRegion);

    this.liveRegion = liveRegion;

    // Announce significant state changes
    document.addEventListener('themeChanged', (e) => {
      this.announceToScreenReader(`Theme changed to ${e.detail.theme} mode`);
    });
  },

  // Announce messages to screen readers
  announceToScreenReader(message) {
    if (this.liveRegion) {
      this.liveRegion.textContent = message;
      // Clear after announcement
      setTimeout(() => {
        this.liveRegion.textContent = '';
      }, 1000);
    }
  },

  // Setup reduced motion support
  setupReducedMotion() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      document.documentElement.style.setProperty('--transition-fast', '0ms');
      document.documentElement.style.setProperty('--transition-normal', '0ms');
      document.documentElement.style.setProperty('--transition-slow', '0ms');
    }
  }
};

// =============================================================================
// Performance Optimizations
// =============================================================================
EthereumStory.performance = {
  // Initialize performance optimizations
  initialize() {
    this.setupIntersectionObserver();
    this.setupImageLazyLoading();
    this.setupCodeHighlighting();
  },

  // Setup intersection observer for animations
  setupIntersectionObserver() {
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '50px'
    });

    // Observe cards and sections
    const observeElements = document.querySelectorAll(
      '.card, .chapter-section, .glossary-term'
    );
    
    observeElements.forEach(el => observer.observe(el));
  },

  // Setup image lazy loading
  setupImageLazyLoading() {
    if (!('IntersectionObserver' in window)) return;

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  },

  // Setup code highlighting (if needed)
  setupCodeHighlighting() {
    // Placeholder for syntax highlighting
    // Could integrate with Prism.js or similar
    const codeBlocks = document.querySelectorAll('pre code');
    codeBlocks.forEach(block => {
      block.classList.add('language-ethereum');
    });
  }
};

// =============================================================================
// Event Listeners Setup
// =============================================================================
EthereumStory.setupEventListeners = function() {
  // Page load event
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => this.onDOMReady());
  } else {
    this.onDOMReady();
  }

  // Window events
  window.addEventListener('load', () => this.onWindowLoad());
  window.addEventListener('resize', () => this.onWindowResize());
  window.addEventListener('beforeunload', () => this.onBeforeUnload());
};

// =============================================================================
// Initialization Functions
// =============================================================================
EthereumStory.initializeTheme = function() {
  EthereumStory.theme.initialize();
};

EthereumStory.initializeScrollProgress = function() {
  EthereumStory.scrollProgress.initialize();
};

EthereumStory.initializeTOC = function() {
  EthereumStory.tableOfContents.initialize();
};

EthereumStory.initializeGlossarySearch = function() {
  EthereumStory.glossarySearch.initialize();
};

EthereumStory.initializeMobileMenu = function() {
  EthereumStory.mobileMenu.initialize();
};

EthereumStory.initializeAccessibility = function() {
  EthereumStory.accessibility.initialize();
};

EthereumStory.initializePerformance = function() {
  EthereumStory.performance.initialize();
};

// =============================================================================
// Event Handlers
// =============================================================================
EthereumStory.onDOMReady = function() {
  console.log('📄 DOM ready, initializing components...');
  
  // Initialize performance optimizations first
  this.initializePerformance();
  
  // Add no-js fallback class removal
  document.documentElement.classList.remove('no-js');
  document.documentElement.classList.add('js');
};

EthereumStory.onWindowLoad = function() {
  console.log('🎉 Window loaded, all resources ready');
  
  // Final performance optimizations
  this.optimizeAfterLoad();
};

EthereumStory.onWindowResize = function() {
  // Debounce resize handling
  clearTimeout(this.resizeTimeout);
  this.resizeTimeout = setTimeout(() => {
    console.log('📱 Window resized, updating layout...');
    
    // Update mobile menu if needed
    if (window.innerWidth > EthereumStory.config.breakpoints.mobile) {
      EthereumStory.mobileMenu.close();
    }
    
    // Recalculate scroll progress
    EthereumStory.scrollProgress.update();
  }, 250);
};

EthereumStory.onBeforeUnload = function() {
  // Save any necessary state
  console.log('👋 Page unloading, saving state...');
};

EthereumStory.optimizeAfterLoad = function() {
  // Remove loading states
  document.body.classList.remove('loading');
  
  // Initialize scroll-based animations
  this.initializeScrollAnimations();
};

EthereumStory.initializeScrollAnimations = function() {
  // Setup scroll-based animations if reduced motion is not preferred
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Parallax effects, etc. could go here
  }
};

// =============================================================================
// Utility Functions
// =============================================================================
EthereumStory.utils = {
  // Debounce function calls
  debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        timeout = null;
        if (!immediate) func(...args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func(...args);
    };
  },

  // Throttle function calls
  throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  // Check if element is in viewport
  isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },

  // Get computed style value
  getStyleValue(element, property) {
    return window.getComputedStyle(element).getPropertyValue(property);
  },

  // Format numbers with commas
  formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
};

// =============================================================================
// Initialize Application
// =============================================================================
// Auto-initialize when script loads
EthereumStory.init();

// Expose to global scope for debugging
window.EthereumStory = EthereumStory;

// Add CSS for search highlighting
const searchHighlightStyles = document.createElement('style');
searchHighlightStyles.textContent = `
  .search-highlight {
    background-color: var(--ethereum-accent);
    color: var(--gray-900);
    padding: 1px 2px;
    border-radius: 2px;
    font-weight: 600;
  }
  
  .search-results-count {
    font-size: var(--text-sm);
    color: var(--text-secondary);
    margin: var(--space-2) 0;
    text-align: center;
  }
  
  .no-results-message {
    background-color: var(--bg-secondary);
    border: var(--border-width) solid var(--border-color);
    border-radius: var(--border-radius-lg);
    padding: var(--space-6);
    text-align: center;
    color: var(--text-secondary);
  }
  
  .user-is-tabbing *:focus {
    outline: 2px solid var(--ethereum-primary);
    outline-offset: 2px;
  }
`;

document.head.appendChild(searchHighlightStyles);

console.log('✅ Ethereum Story interactive features loaded successfully!');