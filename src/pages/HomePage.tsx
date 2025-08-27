import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

export function HomePage() {
  return (
    <>
      <Header />
      
      <main id="main">
        {/* Hero Section */}
        <section class="hero">
          <div class="container">
            <h1 class="hero__title">
              The Complete Ethereum Story: A Beginner's Journey
            </h1>
            <p class="hero__subtitle">
              A cohesive narrative broken into 10 learning sections
            </p>
            <div class="hero__actions">
              <a href="/chapters#section-1" class="btn btn--primary">
                Start Learning
              </a>
              <a href="#what-youll-learn" class="btn btn--secondary">
                What You'll Learn
              </a>
            </div>
          </div>
        </section>

        {/* What You'll Learn Section */}
        <section id="what-youll-learn" style="padding: 5rem 0;">
          <div class="container">
            <div class="content">
              <h2 class="text-center" style="margin-bottom: 3rem;">What You'll Learn</h2>
              <div class="cards-grid">
                <div class="card">
                  <h3 class="card__title">🌐 The Internet's Problems</h3>
                  <p class="card__description">
                    Understand why today's internet is centralized and controlled by big companies, and why we need alternatives.
                  </p>
                </div>
                
                <div class="card">
                  <h3 class="card__title">💰 Digital Money Basics</h3>
                  <p class="card__description">
                    Learn how digital money works without banks and why mathematics can replace trust in financial systems.
                  </p>
                </div>
                
                <div class="card">
                  <h3 class="card__title">⛓️ Blockchain Technology</h3>
                  <p class="card__description">
                    Discover how blockchain creates tamper-proof records and why it's revolutionary for digital systems.
                  </p>
                </div>
                
                <div class="card">
                  <h3 class="card__title">🤖 Smart Contracts</h3>
                  <p class="card__description">
                    Explore programmable agreements that execute automatically, enabling entirely new business models.
                  </p>
                </div>
                
                <div class="card">
                  <h3 class="card__title">🏦 DeFi, NFTs & DAOs</h3>
                  <p class="card__description">
                    Understand the explosion of decentralized finance, digital art ownership, and autonomous organizations.
                  </p>
                </div>
                
                <div class="card">
                  <h3 class="card__title">🚀 The Future Ahead</h3>
                  <p class="card__description">
                    Learn about current challenges, ongoing developments, and what Ethereum means for the future.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Access Section */}
        <section style="padding: 4rem 0; background-color: var(--color-bg-subtle);">
          <div class="container">
            <div class="content">
              <h2 class="text-center" style="margin-bottom: 3rem;">Quick Access</h2>
              <div class="cards-grid">
                <a href="/chapters" class="card" style="text-decoration: none; color: inherit;">
                  <h3 class="card__title">📖 Read the Story</h3>
                  <p class="card__description">
                    Begin the complete 10-section journey through Ethereum's development and impact.
                  </p>
                </a>
                
                <a href="/glossary" class="card" style="text-decoration: none; color: inherit;">
                  <h3 class="card__title">📚 Browse Glossary</h3>
                  <p class="card__description">
                    Look up definitions for blockchain, cryptocurrency, and Ethereum terms in simple language.
                  </p>
                </a>
                
                <a href="/resources" class="card" style="text-decoration: none; color: inherit;">
                  <h3 class="card__title">🔗 Explore Resources</h3>
                  <p class="card__description">
                    Find official guides, tools, and next steps for diving deeper into Ethereum.
                  </p>
                </a>
                
                <a href="/about" class="card" style="text-decoration: none; color: inherit;">
                  <h3 class="card__title">ℹ️ About This Guide</h3>
                  <p class="card__description">
                    Learn about this project, how to use it, and important disclaimers about crypto risks.
                  </p>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}