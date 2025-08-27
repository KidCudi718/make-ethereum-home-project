import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

export function HomePage() {
  return (
    <>
      <Header />
      
      <main id="main-content">
        {/* Hero Section */}
        <section class="section section--hero">
          <div class="container">
            <h1 class="hero__title">
              The Complete Ethereum Story
            </h1>
            <p class="hero__subtitle">
              A 10-part journey for curious beginners into the world of Ethereum and blockchain technology
            </p>
            <div class="hero__actions">
              <a href="/chapters" class="btn btn--primary btn--lg">
                Start Learning
              </a>
              <a href="#what-youll-learn" class="btn btn--secondary btn--lg">
                What You'll Learn
              </a>
            </div>
          </div>
        </section>

        {/* What You'll Learn Section */}
        <section id="what-youll-learn" class="section">
          <div class="container">
            <h2 class="text-center" style="margin-bottom: var(--space-16);">What You'll Learn</h2>
            <div class="grid grid--3">
              <div class="card">
                <div class="card__icon">🌐</div>
                <h3 class="card__title">The Internet's Problems</h3>
                <p class="card__description">
                  Understand why today's internet is centralized and controlled by big companies, and why we need alternatives.
                </p>
              </div>
              
              <div class="card">
                <div class="card__icon">💰</div>
                <h3 class="card__title">Digital Money Basics</h3>
                <p class="card__description">
                  Learn how digital money works without banks and why mathematics can replace trust in financial systems.
                </p>
              </div>
              
              <div class="card">
                <div class="card__icon">⛓️</div>
                <h3 class="card__title">Blockchain Technology</h3>
                <p class="card__description">
                  Discover how blockchain creates tamper-proof records and why it's revolutionary for digital systems.
                </p>
              </div>
              
              <div class="card">
                <div class="card__icon">🤖</div>
                <h3 class="card__title">Smart Contracts</h3>
                <p class="card__description">
                  Explore programmable agreements that execute automatically, enabling entirely new business models.
                </p>
              </div>
              
              <div class="card">
                <div class="card__icon">🏦</div>
                <h3 class="card__title">DeFi, NFTs & DAOs</h3>
                <p class="card__description">
                  Understand the explosion of decentralized finance, digital art ownership, and autonomous organizations.
                </p>
              </div>
              
              <div class="card">
                <div class="card__icon">🚀</div>
                <h3 class="card__title">The Future Ahead</h3>
                <p class="card__description">
                  Learn about current challenges, ongoing developments, and what Ethereum means for the future.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Access Section */}
        <section class="section" style="background-color: var(--bg-secondary);">
          <div class="container">
            <h2 class="text-center" style="margin-bottom: var(--space-16);">Quick Access</h2>
            <div class="grid grid--2">
              <a href="/chapters" class="card" style="text-decoration: none; color: inherit;">
                <div class="card__icon">📖</div>
                <h3 class="card__title">Read the Story</h3>
                <p class="card__description">
                  Begin the complete 10-section journey through Ethereum's development and impact.
                </p>
              </a>
              
              <a href="/glossary" class="card" style="text-decoration: none; color: inherit;">
                <div class="card__icon">📚</div>
                <h3 class="card__title">Browse Glossary</h3>
                <p class="card__description">
                  Look up definitions for blockchain, cryptocurrency, and Ethereum terms in simple language.
                </p>
              </a>
              
              <a href="/resources" class="card" style="text-decoration: none; color: inherit;">
                <div class="card__icon">🔗</div>
                <h3 class="card__title">Explore Resources</h3>
                <p class="card__description">
                  Find official guides, tools, and next steps for diving deeper into Ethereum.
                </p>
              </a>
              
              <a href="/about" class="card" style="text-decoration: none; color: inherit;">
                <div class="card__icon">ℹ️</div>
                <h3 class="card__title">About This Guide</h3>
                <p class="card__description">
                  Learn about this project, how to use it, and important disclaimers about crypto risks.
                </p>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}