export function Header() {
  return (
    <header class="header">
      <div class="container">
        <div class="header__content">
          <a href="/" class="header__brand">
            <div class="header__logo">E</div>
            The Complete Ethereum Story
          </a>
          
          <nav class="header__nav" role="navigation" aria-label="Main navigation">
            <ul class="nav-menu">
              <li class="nav-menu__item">
                <a href="/" class="nav-menu__link">Home</a>
              </li>
              <li class="nav-menu__item">
                <a href="/chapters" class="nav-menu__link">Chapters</a>
              </li>
              <li class="nav-menu__item">
                <a href="/glossary" class="nav-menu__link">Glossary</a>
              </li>
              <li class="nav-menu__item">
                <a href="/resources" class="nav-menu__link">Resources</a>
              </li>
              <li class="nav-menu__item">
                <a href="/about" class="nav-menu__link">About</a>
              </li>
            </ul>
          </nav>
          
          <div class="header__controls">
            <button 
              id="theme-toggle"
              class="theme-toggle" 
              type="button"
              aria-label="Toggle theme"
              title="Switch between light, dark, and auto themes"
            >
              🌙
            </button>
            
            <button 
              id="mobile-menu-toggle"
              class="mobile-menu-toggle" 
              type="button"
              aria-label="Open navigation menu"
              aria-expanded="false"
              aria-controls="main-navigation"
            >
              ☰
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}