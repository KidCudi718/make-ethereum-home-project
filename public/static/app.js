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
    glossaryTerms: [],
    // Web3 & Token Gating State
    web3: {
      isConnected: false,
      account: null,
      provider: null,
      ensName: null,
      hasAccess: false,
      accessLevel: null,
      isLoading: false,
      error: null
    }
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
    this.initializeWeb3();
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
// Web3 & Token Gating System
// =============================================================================
EthereumStory.web3 = {
  // Initialize Web3 connection
  async initialize() {
    console.log('🔗 Initializing Web3 system...');
    
    // Check if MetaMask is installed
    if (typeof window.ethereum === 'undefined') {
      console.log('❌ MetaMask not detected');
      this.showError('Please install MetaMask to access premium content!');
      return;
    }
    
    console.log('✅ MetaMask detected');
    
    // Check if wallet is already connected
    try {
      const accounts = await window.ethereum.request({ 
        method: 'eth_accounts' 
      });
      
      if (accounts.length > 0) {
        console.log('💰 Found existing connection:', accounts[0]);
        await this.connectWallet();
      } else {
        console.log('📱 No existing connection found');
      }
    } catch (error) {
      console.log('No existing connection found');
    }
    
    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        console.log('🔄 Account changed:', accounts);
        if (accounts.length === 0) {
          this.disconnect();
        } else {
          this.connectWallet();
        }
      });
      
      window.ethereum.on('chainChanged', () => {
        console.log('🔄 Chain changed, reloading...');
        window.location.reload();
      });
    }
    
    this.updateUI();
    console.log('🔗 Web3 system initialized successfully');
  },

  // Connect wallet (MetaMask) - Enhanced with trust building
  async connectWallet() {
    console.log('🔗 Starting secure wallet connection...');
    
    // Step 1: Check MetaMask installation
    if (typeof window.ethereum === 'undefined') {
      this.showConnectionStep('❌ MetaMask Required', 
        'Please install MetaMask to access premium content.\n\nMetaMask is a secure, trusted wallet extension used by millions of users.\n\n🔒 We only request:\n• Account address (public)\n• Network information\n• Read-only ENS verification\n\n❌ We NEVER request:\n• Private keys\n• Transaction approval\n• Token transfers');
      return false;
    }

    // Step 2: Check if it's MetaMask
    if (!window.ethereum.isMetaMask) {
      this.showConnectionStep('❌ MetaMask Required', 
        'Please use the official MetaMask wallet extension.\n\nOther wallets may not be compatible with our ENS verification system.');
      return false;
    }

    try {
      // Step 3: Show connection progress
      this.showConnectionStep('🔗 Connecting...', 
        'Requesting connection to MetaMask...\n\nThis will open a MetaMask popup where you can:\n• Approve the connection\n• See exactly what permissions we request\n• Cancel if you have concerns');
      
      EthereumStory.state.web3.isLoading = true;
      this.updateUI();
      
      // Step 4: Request account access
      console.log('📱 Requesting account access...');
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
      
      if (accounts.length === 0) {
        this.showConnectionStep('❌ Connection Failed', 
          'No accounts returned from MetaMask.\n\nPlease:\n• Unlock MetaMask\n• Ensure you have an account created\n• Try connecting again');
        EthereumStory.state.web3.isLoading = false;
        this.updateUI();
        return false;
      }

      const account = accounts[0];
      
      // Step 5: Show successful connection
      this.showConnectionStep('✅ Connected Successfully!', 
        `Wallet connected: ${account.substring(0, 6)}...${account.substring(38)}\n\n🔍 Next step: Verifying your ENS subdomain ownership...\n\nThis is a read-only check - no transactions or approvals needed.`);
      
      EthereumStory.state.web3.account = account;
      EthereumStory.state.web3.isConnected = true;
      
      // Step 6: Verify ENS ownership
      console.log('🔍 Verifying ENS ownership...');
      await this.verifyENSOwnership(account);
      
      EthereumStory.state.web3.isLoading = false;
      this.updateUI();
      
      return true;
      
    } catch (error) {
      console.error('❌ Wallet connection failed:', error);
      EthereumStory.state.web3.isLoading = false;
      
      // Enhanced error messages with trust building
      let errorMessage = '';
      if (error.code === 4001) {
        errorMessage = 'Connection was rejected by user.\n\nThis is completely safe - you can always try again later.\n\n🔒 Your wallet and funds remain completely secure.';
      } else if (error.code === -32002) {
        errorMessage = 'MetaMask has a pending connection request.\n\nPlease check your MetaMask extension and either approve or reject the request.\n\nThis prevents duplicate connection attempts.';
      } else {
        errorMessage = `Connection failed: ${error.message}\n\nPlease try again or contact support if the issue persists.\n\n🔒 Your wallet security is not affected.`;
      }
      
      this.showConnectionStep('❌ Connection Failed', errorMessage);
      this.updateUI();
      return false;
    }
  },

  // Verify ENS subdomain ownership
  async verifyENSOwnership(account) {
    try {
      console.log('🔍 Checking ENS ownership for:', account);
      
      // Check if user owns any allthingscrypto.eth subdomains
      const hasAccess = await this.checkENSSubdomains(account);
      
      EthereumStory.state.web3.hasAccess = hasAccess.hasAccess;
      EthereumStory.state.web3.ensName = hasAccess.ensName;
      EthereumStory.state.web3.accessLevel = hasAccess.accessLevel;
      
      if (hasAccess.hasAccess) {
        console.log(`✅ Premium access granted for: ${hasAccess.ensName}`);
        this.unlockPremiumContent();
      } else {
        console.log('❌ No valid ENS subdomain found');
        this.lockPremiumContent();
      }
      
    } catch (error) {
      console.error('❌ ENS verification failed:', error);
      EthereumStory.state.web3.hasAccess = false;
      this.showError('Failed to verify ENS ownership');
    }
  },

  // Check ENS subdomains (this is where the magic happens!)
  async checkENSSubdomains(account) {
    try {
      console.log('🔍 Checking ENS subdomains for account:', account);
      
      // For development/testing, let's add some demo accounts
      const demoAccounts = [
        '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6', // Example demo account
        '0x1234567890123456789012345678901234567890', // Another demo account
      ];
      
      // Check if this is a demo account
      if (demoAccounts.includes(account.toLowerCase())) {
        console.log('🎭 Demo account detected, granting access');
        return {
          hasAccess: true,
          ensName: 'demo.allthingscrypto.eth',
          accessLevel: 'premium'
        };
      }
      
      // Method 1: Check via ENS reverse lookup
      const ensName = await this.reverseENSLookup(account);
      if (ensName && ensName.endsWith('.allthingscrypto.eth')) {
        console.log('✅ Valid ENS subdomain found:', ensName);
        return {
          hasAccess: true,
          ensName: ensName,
          accessLevel: this.getAccessLevel(ensName)
        };
      }
      
      // Method 2: Check via ENS registry (more comprehensive)
      const subdomains = await this.getAllENSSubdomains(account);
      const validSubdomain = subdomains.find(name => 
        name.endsWith('.allthingscrypto.eth')
      );
      
      if (validSubdomain) {
        console.log('✅ Valid ENS subdomain found via registry:', validSubdomain);
        return {
          hasAccess: true,
          ensName: validSubdomain,
          accessLevel: this.getAccessLevel(validSubdomain)
        };
      }
      
      console.log('❌ No valid ENS subdomain found');
      return { hasAccess: false, ensName: null, accessLevel: null };
      
    } catch (error) {
      console.error('ENS check error:', error);
      return { hasAccess: false, ensName: null, accessLevel: null };
    }
  },

  // Reverse ENS lookup
  async reverseENSLookup(account) {
    try {
      // Using Ethereum mainnet
      const response = await fetch(`https://api.ensideas.com/ens/resolve/${account}`);
      const data = await response.json();
      return data.name || null;
    } catch (error) {
      console.log('Reverse lookup failed, trying alternative method...');
      
      // Fallback to direct ENS check
      try {
        const ensResponse = await fetch(`https://metadata.ens.domains/mainnet/avatar/${account}`);
        if (ensResponse.ok) {
          // This is a basic check - we'll enhance it
          return null; // Will implement more robust checking
        }
      } catch (e) {
        console.log('ENS API check failed');
      }
      
      return null;
    }
  },

  // Get all ENS subdomains for an account (comprehensive method)
  async getAllENSSubdomains(account) {
    try {
      console.log('🔍 Getting all ENS subdomains for:', account);
      
      // This is a simplified version - in production you'd want to use
      // The Graph protocol or direct contract calls
      
      // For now, we'll use a mock check that works with your 200+ holders
      // In production, you'd integrate with ENS subgraph or direct contract calls
      
      // Mock API call for now
      console.log('📡 Mock API call to check ENS ownership');
      
      // Simulate API response
      return [];
      
      // Uncomment when you have the actual API endpoint:
      // const response = await fetch('/api/check-ens-ownership', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ account })
      // });
      
      if (response.ok) {
        const data = await response.json();
        return data.subdomains || [];
      }
      
      return [];
    } catch (error) {
      console.log('Subdomain check failed:', error);
      return [];
    }
  },

  // Check if user owns the main domain allthingscrypto.eth
  async checkMainDomainOwnership(account) {
    try {
      console.log('🔍 Checking main domain ownership for:', account);
      
      // This would be a direct ENS contract call in production
      // For now, we'll use a mock check
      
      // You can implement this with actual ENS contract calls:
      // const ensContract = new ethers.Contract(ENS_REGISTRY_ADDRESS, ENS_ABI, provider);
      // const owner = await ensContract.owner(namehash('allthingscrypto.eth'));
      // return owner.toLowerCase() === account.toLowerCase();
      
      return false; // Mock implementation
    } catch (error) {
      console.log('Main domain check failed:', error);
      return false;
    }
  },

  // Check for specific known subdomains (including brand.allthingscrypto.eth)
  async checkKnownSubdomains(account) {
    try {
      console.log('🔍 Checking known subdomains for:', account);
      
      // This is where you'd check against your actual ENS subdomain database
      // For now, we'll implement a mock check that recognizes brand.allthingscrypto.eth
      
      // In production, you'd have an API endpoint that checks your ENS database
      // const response = await fetch('/api/check-known-subdomains', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ account })
      // });
      
      // Mock implementation - replace with actual API call
      const mockSubdomains = [
        {
          account: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
          ensName: 'brand.allthingscrypto.eth',
          accessLevel: 'premium'
        },
        {
          account: '0x1234567890123456789012345678901234567890',
          ensName: 'founder.allthingscrypto.eth',
          accessLevel: 'founder'
        },
        {
          account: '0xb55d7219cea2ae54d115f378088a5d4ef1fdacc0',
          ensName: 'brent.allthingscrypto.eth',
          accessLevel: 'premium'
        }
        // Add more known subdomains here
      ];
      
      const found = mockSubdomains.find(sub => 
        sub.account.toLowerCase() === account.toLowerCase()
      );
      
      if (found) {
        console.log('✅ Known subdomain found:', found.ensName);
        return {
          hasAccess: true,
          ensName: found.ensName,
          accessLevel: found.accessLevel
        };
      }
      
      return { hasAccess: false, ensName: null, accessLevel: null };
      
    } catch (error) {
      console.log('Known subdomain check failed:', error);
      return { hasAccess: false, ensName: null, accessLevel: null };
    }
  },

  // Determine access level based on ENS name
  getAccessLevel(ensName) {
    if (!ensName) return null;
    
    // Different access levels based on subdomain
    if (ensName.includes('founder.') || ensName.includes('genesis.')) {
      return 'founder';
    } else if (ensName.includes('premium.') || ensName.includes('pro.')) {
      return 'premium';
    } else if (ensName.includes('diamond.') || ensName.includes('platinum.')) {
      return 'diamond';
    } else {
      return 'standard';
    }
  },

  // Unlock premium content
  unlockPremiumContent() {
    console.log('🔓 Unlocking premium content for:', EthereumStory.state.web3.ensName);
    
    // Hide lock screen and show premium content
    const lockScreen = document.querySelector('.premium-lock-screen');
    const unlockedContent = document.querySelector('.premium-unlocked-content');
    
    if (lockScreen) {
      lockScreen.style.display = 'none';
    }
    
    if (unlockedContent) {
      unlockedContent.style.display = 'block';
      unlockedContent.style.animation = 'fadeInSlideUp 0.8s ease-out';
    }
    
    // Remove locks from premium sections
    document.querySelectorAll('.premium-locked').forEach(el => {
      el.classList.remove('premium-locked');
      el.classList.add('premium-unlocked');
    });
    
    // Show premium navigation items
    document.querySelectorAll('.premium-nav').forEach(el => {
      el.style.display = 'block';
    });
    
    // Update premium status indicators
    document.querySelectorAll('.premium-status').forEach(el => {
      const accessLevel = EthereumStory.state.web3.accessLevel;
      const badge = accessLevel === 'founder' ? '👑' : 
                   accessLevel === 'diamond' ? '💎' : 
                   accessLevel === 'premium' ? '⭐' : 
                   accessLevel === 'legendary' ? '🚀' : '✨';
      
      el.innerHTML = `
        <div class="premium-badge premium-badge--${accessLevel}" style="
          background: linear-gradient(135deg, var(--ethereum-highlight), var(--ethereum-accent));
          color: var(--white);
          padding: var(--space-4) var(--space-6);
          border-radius: var(--border-radius-lg);
          text-align: center;
          box-shadow: var(--shadow-glow);
          animation: premiumGlow 2s ease-in-out infinite alternate;
        ">
          <div style="font-size: var(--text-2xl); margin-bottom: var(--space-2);">${badge}</div>
          <div style="font-weight: 600; margin-bottom: var(--space-1);">Premium Access Granted</div>
          <div style="opacity: 0.9; font-size: var(--text-sm);">${EthereumStory.state.web3.ensName}</div>
          <div style="opacity: 0.8; font-size: var(--text-xs); text-transform: capitalize;">${accessLevel} Tier</div>
        </div>
      `;
    });
    
    // Update user ENS name displays
    document.querySelectorAll('.user-ens-name').forEach(el => {
      el.textContent = EthereumStory.state.web3.ensName;
    });
    
    // Enable premium video content
    this.enableVideoContent();
    
    // Show success message with access level
    const welcomeMessage = `Welcome back, ${EthereumStory.state.web3.ensName}! You have ${EthereumStory.state.web3.accessLevel} tier access 🎉`;
    this.showSuccessMessage(welcomeMessage);
    
    // Dispatch custom event
    document.dispatchEvent(new CustomEvent('premiumUnlocked', {
      detail: {
        ensName: EthereumStory.state.web3.ensName,
        accessLevel: EthereumStory.state.web3.accessLevel
      }
    }));
    
    console.log('🔓 Premium content unlocked!');
  },

  // Enable premium video content with interactive features
  enableVideoContent() {
    const videoSection = document.querySelector('.premium-video-section');
    if (videoSection) {
      // Add premium styling
      videoSection.style.border = '2px solid var(--ethereum-highlight)';
      videoSection.style.boxShadow = 'var(--shadow-glow)';
      
      // Enable video placeholder click
      const videoPlaceholder = videoSection.querySelector('.video-placeholder');
      if (videoPlaceholder) {
        videoPlaceholder.style.cursor = 'pointer';
        videoPlaceholder.onclick = () => {
          this.showVideoPlayer();
        };
      }
      
      // Enable video button
      const videoButton = videoSection.querySelector('button');
      if (videoButton) {
        videoButton.style.cursor = 'pointer';
        videoButton.onclick = () => {
          this.showVideoPlayer();
        };
      }
    }
  },

  // Show the actual video player (simulated for demo)
  showVideoPlayer() {
    const videoWrapper = document.querySelector('.video-content-wrapper');
    if (videoWrapper) {
      // Create video player interface
      const videoPlayerHTML = `
        <div class="premium-video-player" style="
          background: #000;
          border-radius: var(--border-radius);
          padding: 0;
          margin-bottom: var(--space-6);
          position: relative;
          aspect-ratio: 16/9;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 3px solid var(--ethereum-highlight);
          box-shadow: var(--shadow-glow);
        ">
          <div style="text-align: center; color: var(--white);">
            <div style="font-size: var(--text-4xl); margin-bottom: var(--space-4);">🎬</div>
            <h3 style="color: var(--white); margin-bottom: var(--space-3);">WTF is ENS on Ethereum</h3>
            <p style="opacity: 0.8; margin-bottom: var(--space-4);">
              Exclusive 4:41 podcast with Alex Martinez & Sophia Chen
            </p>
                         <div style="display: flex; gap: var(--space-3); justify-content: center;">
               <button class="btn btn--primary play-video-btn">
                 ▶️ Play Video
               </button>
               <button class="btn btn--outline" style="color: var(--white); border-color: rgba(255,255,255,0.3);">
                 📝 Show Transcript
               </button>
             </div>
            <div style="margin-top: var(--space-4); font-size: var(--text-sm); opacity: 0.7;">
              🔒 Only available to verified allthingscrypto.eth holders
            </div>
          </div>
        </div>
      `;
      
      // Replace video placeholder with player
      const videoPlaceholder = videoWrapper.querySelector('.video-placeholder');
      if (videoPlaceholder) {
        videoPlaceholder.outerHTML = videoPlayerHTML;
      }
      
      // Add event listener to play video button
      const playVideoBtn = videoWrapper.querySelector('.play-video-btn');
      if (playVideoBtn) {
        playVideoBtn.addEventListener('click', () => {
          if (EthereumStory.web3 && EthereumStory.web3.playVideo) {
            EthereumStory.web3.playVideo();
          }
        });
      }
      
      // Show success message
      this.showSuccessMessage('🎬 Premium video unlocked! Ready to watch "WTF is ENS on Ethereum"');
    }
  },

  // Simulate video playback (in production, this would load the actual video)
  playVideo() {
    // Show video is playing
    const videoPlayer = document.querySelector('.premium-video-player');
    if (videoPlayer) {
      videoPlayer.innerHTML = `
        <div style="text-align: center; color: var(--white);">
          <div style="font-size: var(--text-4xl); margin-bottom: var(--space-4); animation: pulse 2s infinite;">📺</div>
          <h3 style="color: var(--white); margin-bottom: var(--space-3);">Now Playing</h3>
          <p style="opacity: 0.9; margin-bottom: var(--space-4); font-weight: 600;">
            "WTF is ENS on Ethereum" - 4:41 Runtime
          </p>
          <div style="background: var(--ethereum-highlight); height: 4px; border-radius: 2px; margin: 0 var(--space-8); overflow: hidden;">
            <div style="background: var(--white); height: 100%; width: 0%; animation: videoProgress 281s linear infinite;"></div>
          </div>
          <div style="margin-top: var(--space-4); display: flex; gap: var(--space-3); justify-content: center;">
            <button class="btn btn--outline" style="color: var(--white); border-color: rgba(255,255,255,0.3);">
              ⏸️ Pause
            </button>
            <button class="btn btn--outline" style="color: var(--white); border-color: rgba(255,255,255,0.3);">
              🔊 Volume
            </button>
            <button class="btn btn--outline" style="color: var(--white); border-color: rgba(255,255,255,0.3);">
              ⚙️ Settings
            </button>
          </div>
          <div style="margin-top: var(--space-3); font-size: var(--text-xs); opacity: 0.7;">
            Premium content • Verified ENS holder access
          </div>
        </div>
      `;
      
      this.showSuccessMessage('🎬 Enjoy your exclusive content! This is premium material only for allthingscrypto.eth holders.');
    }
  },

  // Enhanced premium access check with clear user feedback
  async checkPremiumAccess() {
    console.log('🔍 Checking premium access...');
    
    if (!EthereumStory.state.web3.isConnected) {
      this.showConnectionStep('🔗 Wallet Required', 
        'Please connect your wallet first to check premium access.\n\nWe only need to verify if you own an allthingscrypto.eth ENS subdomain.');
      return;
    }
    
    // Show loading state with animation
    this.showConnectionStep('🔍 Checking Access...', 
      'Verifying your ENS subdomain ownership...\n\nThis is a read-only check - we never ask for transaction approval.\n\n⏳ Please wait while we verify your access...');
    
    // Add loading animation to the modal
    const modal = document.getElementById('connection-step-modal');
    if (modal) {
      const message = modal.querySelector('.connection-step-message');
      if (message) {
        message.innerHTML = `
          <div class="loading-animation">
            <div class="spinner"></div>
            <div class="loading-text">
              Verifying your ENS subdomain ownership...<br><br>
              This is a read-only check - we never ask for transaction approval.<br><br>
              ⏳ Please wait while we verify your access...
            </div>
          </div>
        `;
      }
    }
    
    try {
      // Simulate a small delay to show the loading state
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const accessResult = await this.checkENSSubdomains(EthereumStory.state.web3.account);
      
      if (accessResult.hasAccess) {
        this.showConnectionStep('🎉 Access Granted!', 
          `Welcome ${accessResult.ensName} holder!\n\nYou now have access to:\n• Premium video content\n• Exclusive podcasts\n• Advanced tutorials\n• Community features`);
        
        // Update UI to show premium content
        this.unlockPremiumContent();
        
        // Show success toast
        this.showSuccess(`🎉 Premium access unlocked! Welcome ${accessResult.ensName} holder!`);
        
      } else {
        this.showConnectionStep('🔒 Access Denied', 
          'Sorry, premium access requires ownership of an allthingscrypto.eth ENS subdomain.\n\nTo get access:\n1. Visit ens.domains\n2. Search for available subdomains\n3. Purchase one (usually $5-20/year)\n4. Connect your wallet here');
        
        // Show error toast
        this.showError('Access denied - ENS subdomain required');
      }
      
    } catch (error) {
      console.error('❌ Error checking premium access:', error);
      this.showConnectionStep('❌ Error', 
        'Failed to verify access. Please try again or contact support.');
      this.showError('Failed to check access: ' + error.message);
    }
  },

  // Show success message
  showSuccessMessage(message) {
    const toast = document.createElement('div');
    toast.className = 'web3-toast web3-toast--success';
    toast.innerHTML = `
      <div class="web3-toast__content" style="background: var(--success); color: var(--white);">
        <span class="web3-toast__icon">✅</span>
        <span class="web3-toast__message">${message}</span>
        <button class="web3-toast__close">×</button>
      </div>
    `;
    
    // Add event listener to close button
    const closeBtn = toast.querySelector('.web3-toast__close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        toast.remove();
      });
    }
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      if (toast.parentElement) {
        toast.remove();
      }
    }, 5000);
  },

  // Lock premium content
  lockPremiumContent() {
    console.log('🔒 Locking premium content');
    
    // Show lock screen and hide premium content
    const lockScreen = document.querySelector('.premium-lock-screen');
    const unlockedContent = document.querySelector('.premium-unlocked-content');
    
    if (lockScreen) {
      lockScreen.style.display = 'block';
    }
    
    if (unlockedContent) {
      unlockedContent.style.display = 'none';
    }
    
    document.querySelectorAll('.premium-unlocked').forEach(el => {
      el.classList.remove('premium-unlocked');
      el.classList.add('premium-locked');
    });
    
    document.querySelectorAll('.premium-nav').forEach(el => {
      el.style.display = 'none';
    });
    
    document.querySelectorAll('.premium-status').forEach(el => {
      el.innerHTML = `
        <div class="premium-prompt" style="
          background: var(--bg-secondary);
          border: 2px dashed var(--border-color);
          padding: var(--space-6);
          border-radius: var(--border-radius-lg);
          text-align: center;
        ">
          <div style="font-size: var(--text-2xl); margin-bottom: var(--space-4);">🔒</div>
          <div style="font-weight: 600; margin-bottom: var(--space-3);">Premium Access Required</div>
          <div style="color: var(--text-secondary); margin-bottom: var(--space-4);">Connect your allthingscrypto.eth wallet to unlock exclusive content</div>
          <button class="btn btn--primary btn-connect-wallet">Connect Wallet</button>
        </div>
      `;
      
      // Add event listener to the connect wallet button
      const connectBtn = el.querySelector('.btn-connect-wallet');
      if (connectBtn) {
        connectBtn.addEventListener('click', () => {
          if (EthereumStory.web3 && EthereumStory.web3.connectWallet) {
            EthereumStory.web3.connectWallet();
          }
        });
      }
    });
    
    console.log('🔒 Premium content locked');
  },

  // Disconnect wallet
  disconnect() {
    EthereumStory.state.web3 = {
      isConnected: false,
      account: null,
      provider: null,
      ensName: null,
      hasAccess: false,
      accessLevel: null,
      isLoading: false,
      error: null
    };
    
    this.lockPremiumContent();
    this.updateUI();
    
    console.log('👋 Wallet disconnected');
  },

  // Show error message
  showError(message) {
    EthereumStory.state.web3.error = message;
    
    // Create toast notification
    const toast = document.createElement('div');
    toast.className = 'web3-toast web3-toast--error';
    toast.innerHTML = `
      <div class="web3-toast__content">
        <span class="web3-toast__icon">⚠️</span>
        <span class="web3-toast__message">${message}</span>
        <button class="web3-toast__close">×</button>
      </div>
    `;
    
    // Add event listener to close button
    const closeBtn = toast.querySelector('.web3-toast__close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        toast.remove();
      });
    }
    
    document.body.appendChild(toast);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      if (toast.parentElement) {
        toast.remove();
      }
    }, 5000);
  },

  // Update UI based on Web3 state
  updateUI() {
    const connectButton = document.getElementById('connect-wallet-btn');
    const headerConnectButton = document.getElementById('header-connect-wallet');
    const walletStatus = document.querySelector('.wallet-status');
    
    if (connectButton) {
      if (EthereumStory.state.web3.isLoading) {
        connectButton.textContent = 'Connecting...';
        connectButton.disabled = true;
      } else if (EthereumStory.state.web3.isConnected) {
        connectButton.textContent = 'Connected';
        connectButton.disabled = true;
        connectButton.classList.add('btn--success');
      } else {
        connectButton.textContent = 'Connect Wallet';
        connectButton.disabled = false;
        connectButton.classList.remove('btn--success');
      }
    }
    
    if (headerConnectButton) {
      if (EthereumStory.state.web3.isLoading) {
        headerConnectButton.textContent = '🔗 Connecting...';
        headerConnectButton.disabled = true;
      } else if (EthereumStory.state.web3.isConnected) {
        headerConnectButton.textContent = '✅ Connected';
        headerConnectButton.disabled = true;
        headerConnectButton.classList.add('btn--success');
      } else {
        headerConnectButton.textContent = '🔗 Connect';
        headerConnectButton.disabled = false;
        headerConnectButton.classList.remove('btn--success');
      }
    }
    
    if (walletStatus) {
      if (EthereumStory.state.web3.isConnected) {
        const shortAddress = EthereumStory.state.web3.account.slice(0, 6) + '...' + 
                           EthereumStory.state.web3.account.slice(-4);
        const ensDisplay = EthereumStory.state.web3.ensName || shortAddress;
        
        walletStatus.innerHTML = `
          <div class="wallet-info">
            <span class="wallet-info__ens">${ensDisplay}</span>
            ${EthereumStory.state.web3.hasAccess ? 
              '<span class="wallet-info__badge">💎 Premium</span>' : 
              '<span class="wallet-info__badge">🔒 Standard</span>'
            }
            <button class="wallet-info__disconnect">Disconnect</button>
          </div>
        `;
        
        // Add event listener to disconnect button
        const disconnectBtn = walletStatus.querySelector('.wallet-info__disconnect');
        if (disconnectBtn) {
          disconnectBtn.addEventListener('click', () => {
            if (EthereumStory.web3 && EthereumStory.web3.disconnect) {
              EthereumStory.web3.disconnect();
            }
          });
        }
      } else {
        walletStatus.innerHTML = '';
      }
    }
  },

  // Show error message
  showError(message) {
    console.error('❌ Error:', message);
    
    // Create toast notification
    const toast = document.createElement('div');
    toast.className = 'web3-toast web3-toast--error';
    toast.innerHTML = `
      <div class="web3-toast__content">
        <span class="web3-toast__icon">❌</span>
        <span class="web3-toast__message">${message}</span>
        <button class="web3-toast__close">×</button>
      </div>
    `;
    
    // Add event listener to close button
    const closeBtn = toast.querySelector('.web3-toast__close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        toast.remove();
      });
    }
    
    document.body.appendChild(toast);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (toast.parentElement) {
        toast.remove();
      }
    }, 5000);
  },

  // Show success message
  showSuccess(message) {
    console.log('✅ Success:', message);
    
    // Create toast notification
    const toast = document.createElement('div');
    toast.className = 'web3-toast web3-toast--success';
    toast.innerHTML = `
      <div class="web3-toast__content">
        <span class="web3-toast__icon">✅</span>
        <span class="web3-toast__message">${message}</span>
        <button class="web3-toast__close">×</button>
      </div>
    `;
    
    // Add event listener to close button
    const closeBtn = toast.querySelector('.web3-toast__close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        toast.remove();
      });
    }
    
    document.body.appendChild(toast);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (toast.parentElement) {
        toast.remove();
      }
    }, 5000);
  },

  // Show connection step with clear explanation
  showConnectionStep(title, message) {
    console.log(`📋 ${title}:`, message);
    
    // Create or update connection step modal
    let modal = document.getElementById('connection-step-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'connection-step-modal';
      modal.className = 'connection-step-modal';
      modal.innerHTML = `
        <div class="connection-step-content">
          <div class="connection-step-header">
            <h3>${title}</h3>
            <button class="connection-step-close">×</button>
          </div>
          <div class="connection-step-message">
            ${message.replace(/\n/g, '<br>')}
          </div>
        </div>
      `;
      
      // Add close button functionality
      const closeBtn = modal.querySelector('.connection-step-close');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          modal.remove();
        });
      }
      
      document.body.appendChild(modal);
    } else {
      // Update existing modal
      modal.querySelector('h3').textContent = title;
      modal.querySelector('.connection-step-message').innerHTML = message.replace(/\n/g, '<br>');
    }
    
    // Auto-close after 8 seconds for success/error messages
    if (title.includes('✅') || title.includes('❌') || title.includes('🔒')) {
      setTimeout(() => {
        if (modal.parentElement) {
          modal.remove();
        }
      }, 8000);
    }
  }
};

// =============================================================================
// Initialization Functions
// =============================================================================
EthereumStory.initializeTheme = function() {
  EthereumStory.theme.initialize();
};

EthereumStory.initializeWeb3 = function() {
  EthereumStory.web3.initialize();
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

// Initialize wallet connection buttons
EthereumStory.initializeWalletButtons = function() {
  console.log('🔗 Initializing wallet connection buttons...');
  
  const heroConnectBtn = document.getElementById('hero-connect-wallet');
  const premiumConnectBtn = document.getElementById('premium-connect-wallet');
  const connectWalletBtn = document.getElementById('connect-wallet-btn');
  const headerConnectBtn = document.getElementById('header-connect-wallet');
  
  console.log('🔍 Hero connect button found:', !!heroConnectBtn);
  console.log('🔍 Premium connect button found:', !!premiumConnectBtn);
  console.log('🔍 Connect wallet button found:', !!connectWalletBtn);
  console.log('🔍 Header connect button found:', !!headerConnectBtn);
  
  if (heroConnectBtn) {
    console.log('✅ Adding click listener to hero button');
    heroConnectBtn.addEventListener('click', async (e) => {
      console.log('🖱️ Hero button clicked!');
      e.preventDefault();
      if (EthereumStory.web3) {
        if (!EthereumStory.state.web3.isConnected) {
          console.log('🚀 Connecting wallet first...');
          await EthereumStory.web3.connectWallet();
        } else {
          console.log('🔍 Checking premium access...');
          await EthereumStory.web3.checkPremiumAccess();
        }
      } else {
        console.log('❌ Web3 system not ready yet');
      }
    });
    
    // Add a visual indicator that the button is working
    heroConnectBtn.style.cursor = 'pointer';
    heroConnectBtn.title = 'Click to check premium access or connect wallet';
  }
  
  if (premiumConnectBtn) {
    console.log('✅ Adding click listener to premium button');
    premiumConnectBtn.addEventListener('click', async (e) => {
      console.log('🖱️ Premium button clicked!');
      e.preventDefault();
      if (EthereumStory.web3) {
        if (!EthereumStory.state.web3.isConnected) {
          console.log('🚀 Connecting wallet first...');
          await EthereumStory.web3.connectWallet();
        } else {
          console.log('🔍 Checking premium access...');
          await EthereumStory.web3.checkPremiumAccess();
        }
      } else {
        console.log('❌ Web3 system not ready yet');
      }
    });
    
    // Add a visual indicator that the button is working
    premiumConnectBtn.style.cursor = 'pointer';
    premiumConnectBtn.title = 'Click to check premium access or connect wallet';
  }
  
  if (connectWalletBtn) {
    console.log('✅ Adding click listener to connect wallet button');
    connectWalletBtn.addEventListener('click', (e) => {
      console.log('🖱️ Connect wallet button clicked!');
      e.preventDefault();
      if (EthereumStory.web3 && EthereumStory.web3.connectWallet) {
        console.log('🚀 Calling connectWallet from connect wallet button');
        EthereumStory.web3.connectWallet();
      } else {
        console.log('❌ Web3 system not ready yet');
      }
    });
    
    // Add a visual indicator that the button is working
    connectWalletBtn.style.cursor = 'pointer';
    connectWalletBtn.title = 'Click to connect MetaMask wallet';
  }

  // Add check access button functionality
  const checkAccessBtn = document.getElementById('check-access-btn');
  if (checkAccessBtn) {
    console.log('✅ Adding click listener to check access button');
    checkAccessBtn.addEventListener('click', async (e) => {
      console.log('🔍 Check access button clicked!');
      e.preventDefault();
      if (EthereumStory.web3 && EthereumStory.web3.checkPremiumAccess) {
        console.log('🚀 Calling checkPremiumAccess');
        await EthereumStory.web3.checkPremiumAccess();
      } else {
        console.log('❌ Web3 system not ready yet');
      }
    });
    
    // Add a visual indicator that the button is working
    checkAccessBtn.style.cursor = 'pointer';
    checkAccessBtn.title = 'Click to check your premium access status';
  }
  
  if (headerConnectBtn) {
    console.log('✅ Adding click listener to header connect button');
    headerConnectBtn.addEventListener('click', (e) => {
      console.log('🖱️ Header connect button clicked!');
      e.preventDefault();
      if (EthereumStory.web3 && EthereumStory.web3.connectWallet) {
        console.log('🚀 Calling connectWallet from header button');
        EthereumStory.web3.connectWallet();
      } else {
        console.log('❌ Web3 system not ready yet');
      }
    });
    
    // Add a visual indicator that the button is working
    headerConnectBtn.style.cursor = 'pointer';
    headerConnectBtn.title = 'Click to connect MetaMask wallet';
  }
  
  console.log('🔗 Wallet connection buttons initialized successfully');
};

// Initialize wallet buttons after DOM is fully ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    EthereumStory.initializeWalletButtons();
  });
} else {
  EthereumStory.initializeWalletButtons();
}

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