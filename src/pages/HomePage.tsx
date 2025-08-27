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

            {/* Dave's Web3 Education Revolution Audio - Front & Center */}
            <div class="hero-audio-section">
              <div class="audio-feature-card">
                <div class="audio-header">
                  <div>🎙️</div>
                  <h2>The Address Kit: Dave's Web3 Education Revolution</h2>
                  <p>🔥 <strong>EXCLUSIVE:</strong> Listen to Dave's revolutionary approach to Web3 education and blockchain learning</p>
                </div>

                <div class="custom-audio-player">
                  <audio 
                    id="daves-audio" 
                    controls 
                    preload="metadata"
                  >
                    <source src="/static/daves-web3-education-revolution.mp3" type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                  
                  <div class="audio-controls">
                    <button class="btn btn--secondary" onclick="document.getElementById('daves-audio').play()">
                      <span>▶️ Play Now</span>
                    </button>
                    <button class="btn btn--outline" onclick="document.getElementById('daves-audio').currentTime = 0">
                      <span>🔄 Restart</span>
                    </button>
                    <button class="btn btn--outline" onclick="navigator.share ? navigator.share({title: 'Dave\\'s Web3 Education Revolution', url: window.location.href}) : alert('Share: ' + window.location.href)">
                      <span>📤 Share</span>
                    </button>
                  </div>
                </div>

                <div class="audio-features">
                  <div>
                    <div style="color: var(--ethereum-electric);">🎯 Revolutionary Approach</div>
                    <div>Dave's unique Web3 education methodology</div>
                  </div>
                  <div>
                    <div style="color: var(--ethereum-gold);">🚀 Future Vision</div>
                    <div>The future of blockchain education</div>
                  </div>
                  <div>
                    <div style="color: var(--ethereum-neon);">💡 Breakthrough Ideas</div>
                    <div>Innovative learning strategies</div>
                  </div>
                </div>

                <p>🎧 Premium audio content • High-quality education • Revolutionary insights</p>
              </div>
            </div>

            <div class="hero__actions">
              <a href="/chapters" class="btn btn--primary btn--lg">
                Start Learning
              </a>
              <a href="#what-youll-learn" class="btn btn--secondary btn--lg">
                What You'll Learn
              </a>
              <button id="hero-connect-wallet" class="btn btn--outline btn--lg">
                🔗 Connect & Check Access
              </button>
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

        {/* Premium Teaser Section */}
        <section class="section premium-teaser" style="background: linear-gradient(135deg, var(--ethereum-highlight), var(--ethereum-accent)); color: var(--white); text-align: center;">
          <div class="container">
            <h2 style="color: var(--white); margin-bottom: var(--space-6);">🔥 Exclusive Premium Content Available</h2>
            <p style="font-size: var(--text-xl); margin-bottom: var(--space-8); opacity: 0.95; max-width: 700px; margin-left: auto; margin-right: auto;">
              Join 200+ holders of <strong>allthingscrypto.eth</strong> subdomains and unlock advanced strategies, 
              market analysis, and exclusive community access.
            </p>
            <div style="display: flex; gap: var(--space-4); justify-content: center; flex-wrap: wrap; margin-bottom: var(--space-8);">
              <div style="background: rgba(255, 255, 255, 0.1); padding: var(--space-4); border-radius: var(--border-radius); backdrop-filter: blur(10px);">
                <div style="font-size: var(--text-2xl); font-weight: 700; margin-bottom: var(--space-2);">Advanced DeFi</div>
                <div style="font-size: var(--text-sm); opacity: 0.8;">Yield farming secrets</div>
              </div>
              <div style="background: rgba(255, 255, 255, 0.1); padding: var(--space-4); border-radius: var(--border-radius); backdrop-filter: blur(10px);">
                <div style="font-size: var(--text-2xl); font-weight: 700; margin-bottom: var(--space-2);">Market Intel</div>
                <div style="font-size: var(--text-sm); opacity: 0.8;">Weekly analysis</div>
              </div>
              <div style="background: rgba(255, 255, 255, 0.1); padding: var(--space-4); border-radius: var(--border-radius); backdrop-filter: blur(10px);">
                <div style="font-size: var(--text-2xl); font-weight: 700; margin-bottom: var(--space-2);">Elite Community</div>
                <div style="font-size: var(--text-sm); opacity: 0.8;">Private Discord</div>
              </div>
            </div>
            <div style="display: flex; gap: var(--space-4); justify-content: center; flex-wrap: wrap;">
              <a href="/premium" class="btn btn--secondary btn--lg" style="background: var(--white); color: var(--ethereum-highlight); border-color: var(--white);">
                View Premium Content →
              </a>
              <button id="premium-connect-wallet" class="btn btn--outline btn--lg" style="border-color: rgba(255, 255, 255, 0.5); color: var(--white);">
                Connect Wallet
              </button>
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