export function Header() {
  return (
    <header class="header">
      <div class="container">
        <div class="header__content">
          <a href="/" class="header__logo">
            The Complete Ethereum Story
          </a>
          
          <nav class="header__nav" role="navigation" aria-label="Main navigation">
            <a href="/">Home</a>
            <a href="/chapters">Chapters</a>
            <a href="/glossary">Glossary</a>
            <a href="/resources">Resources</a>
            <a href="/about">About</a>
          </nav>
          
          <div class="header__actions">
            <button 
              class="theme-toggle" 
              type="button"
              aria-label="Switch theme"
              title="Toggle dark/light mode"
            >
              <span aria-hidden="true">🌙</span>
            </button>
            
            <button 
              class="mobile-menu-button" 
              type="button"
              aria-label="Open navigation menu"
              aria-expanded="false"
            >
              <span aria-hidden="true">☰</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div class="mobile-menu" role="navigation" aria-label="Mobile navigation">
        <div class="mobile-menu__header">
          <span class="header__logo">The Complete Ethereum Story</span>
          <button class="mobile-menu__close theme-toggle" type="button" aria-label="Close navigation menu">
            <span aria-hidden="true">✕</span>
          </button>
        </div>
        <nav class="mobile-menu__nav">
          <a href="/">Home</a>
          <a href="/chapters">Chapters</a>
          <a href="/glossary">Glossary</a>
          <a href="/resources">Resources</a>
          <a href="/about">About</a>
        </nav>
      </div>
    </header>
  )
}