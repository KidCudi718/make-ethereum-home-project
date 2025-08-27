export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer class="footer">
      <div class="container">
        <div class="footer__content">
          <div>
            <h3>The Complete Ethereum Story</h3>
            <p class="footer__description">
              A beginner-friendly guide to Ethereum's past, present, and future.
            </p>
            <p class="footer__description">
              Questions? <a href="mailto:hello@makeethereumhome.com">hello@makeethereumhome.com</a>
            </p>
          </div>
          
          <div>
            <h4>Navigation</h4>
            <nav class="footer__nav" aria-label="Footer navigation">
              <a href="/">Home</a>
              <a href="/chapters">Chapters</a>
              <a href="/glossary">Glossary</a>
              <a href="/resources">Resources</a>
              <a href="/about">About</a>
            </nav>
          </div>
          
          <div>
            <h4>Legal</h4>
            <nav class="footer__nav">
              <a href="/about#disclaimer">Disclaimer</a>
              <a href="/about#contact">Contact</a>
            </nav>
          </div>
        </div>
        
        <div class="footer__copyright">
          <p>© {currentYear} The Complete Ethereum Story. Not financial advice. Educational content only.</p>
        </div>
      </div>
    </footer>
  )
}