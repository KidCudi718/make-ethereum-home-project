import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

export function PremiumPage() {
  return (
    <>
      <Header />
      
      <main id="main-content" class="section">
        <div class="container">
          {/* Premium Status Check */}
          <div class="premium-status text-center" style="margin-bottom: var(--space-16);">
            {/* This will be populated by JavaScript based on wallet connection */}
          </div>

          {/* Premium Content - Initially Locked */}
          <div class="premium-content premium-locked">
            
            {/* Lock Screen */}
            <div class="premium-lock-screen">
              <div class="container text-center" style="padding: var(--space-24) 0;">
                <div class="card" style="max-width: 600px; margin: 0 auto;">
                  <div class="card__icon" style="font-size: 3rem; margin-bottom: var(--space-6);">🔒</div>
                  <h2>Premium Content</h2>
                  <p style="margin-bottom: var(--space-8); color: var(--text-secondary); font-size: var(--text-lg);">
                    This exclusive content is available only to holders of <strong>allthingscrypto.eth</strong> ENS subdomains.
                  </p>
                  
                  <div class="premium-benefits" style="margin-bottom: var(--space-8);">
                    <h3 style="margin-bottom: var(--space-4);">What You'll Get Access To:</h3>
                    <div class="grid grid--2" style="text-align: left;">
                      <div class="card">
                        <div class="card__icon">🎯</div>
                        <h4 class="card__title">Advanced Strategies</h4>
                        <p class="card__description">
                          Deep-dive analysis of DeFi protocols, yield farming strategies, and advanced trading techniques.
                        </p>
                      </div>
                      
                      <div class="card">
                        <div class="card__icon">📊</div>
                        <h4 class="card__title">Market Analysis</h4>
                        <p class="card__description">
                          Weekly market reports, on-chain analysis, and exclusive insights from industry experts.
                        </p>
                      </div>
                      
                      <div class="card">
                        <div class="card__icon">🤝</div>
                        <h4 class="card__title">Community Access</h4>
                        <p class="card__description">
                          Private Discord channels, AMAs with founders, and networking with fellow ENS holders.
                        </p>
                      </div>
                      
                      <div class="card">
                        <div class="card__icon">⚡</div>
                        <h4 class="card__title">Early Access</h4>
                        <p class="card__description">
                          Be first to access new content, tools, and opportunities before they're public.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <button id="connect-wallet-btn" class="btn btn--primary btn--lg" onclick="EthereumStory.web3.connectWallet()">
                    Connect Wallet to Access
                  </button>
                  
                  <p style="margin-top: var(--space-4); font-size: var(--text-sm); color: var(--text-muted);">
                    Don't have an allthingscrypto.eth subdomain? <a href="#get-subdomain">Learn how to get one →</a>
                  </p>
                </div>
              </div>
            </div>

            {/* Actual Premium Content - Hidden Until Unlocked */}
            <div class="premium-unlocked-content" style="display: none;">
              
              {/* Welcome Section */}
              <section style="margin-bottom: var(--space-16);">
                <div class="text-center">
                  <h1 class="ethereum-gradient">Welcome to Premium, Crypto Elite! 💎</h1>
                  <p style="font-size: var(--text-xl); color: var(--text-secondary); margin-bottom: var(--space-8);">
                    Exclusive content for <span class="user-ens-name">allthingscrypto.eth</span> holders
                  </p>
                </div>
              </section>

              {/* Premium Sections */}
              <section style="margin-bottom: var(--space-16);">
                <h2>🎯 Advanced DeFi Strategies</h2>
                <div class="grid grid--2">
                  <div class="card">
                    <h3 class="card__title">Yield Farming Masterclass</h3>
                    <p class="card__description">
                      Learn advanced yield farming strategies that the top 1% use. Includes risk assessment, 
                      impermanent loss calculations, and optimal position sizing.
                    </p>
                    <a href="#yield-farming" class="btn btn--outline">Access Content →</a>
                  </div>
                  
                  <div class="card">
                    <h3 class="card__title">Liquidity Provision Secrets</h3>
                    <p class="card__description">
                      Deep dive into providing liquidity on Uniswap V3, Curve, and other AMMs. 
                      Mathematical models and backtesting strategies.
                    </p>
                    <a href="#liquidity" class="btn btn--outline">Access Content →</a>
                  </div>
                </div>
              </section>

              <section style="margin-bottom: var(--space-16);">
                <h2>📊 Exclusive Market Analysis</h2>
                <div class="card">
                  <h3 class="card__title">This Week's Premium Report</h3>
                  <p style="margin-bottom: var(--space-4);">
                    <strong>Market Outlook:</strong> Ethereum's transition to full sharding implementation shows 
                    promising signs. Our on-chain analysis indicates a 67% correlation between L2 adoption 
                    rates and ETH price movements over the next quarter.
                  </p>
                  
                  <div class="premium-metrics" style="margin: var(--space-6) 0;">
                    <div class="grid grid--3">
                      <div style="text-align: center; padding: var(--space-4); background: rgba(108, 99, 255, 0.1); border-radius: var(--border-radius);">
                        <div style="font-size: var(--text-2xl); font-weight: 700; color: var(--ethereum-highlight);">$2,847</div>
                        <div style="font-size: var(--text-sm); color: var(--text-secondary);">ETH Target Price</div>
                      </div>
                      <div style="text-align: center; padding: var(--space-4); background: rgba(195, 153, 107, 0.1); border-radius: var(--border-radius);">
                        <div style="font-size: var(--text-2xl); font-weight: 700; color: var(--ethereum-accent);">+23.4%</div>
                        <div style="font-size: var(--text-sm); color: var(--text-secondary);">Predicted Growth</div>
                      </div>
                      <div style="text-align: center; padding: var(--space-4); background: rgba(0, 211, 149, 0.1); border-radius: var(--border-radius);">
                        <div style="font-size: var(--text-2xl); font-weight: 700; color: var(--success);">92%</div>
                        <div style="font-size: var(--text-sm); color: var(--text-secondary);">Model Accuracy</div>
                      </div>
                    </div>
                  </div>
                  
                  <p style="color: var(--text-secondary); font-size: var(--text-sm);">
                    <em>Updated daily • Available only to allthingscrypto.eth holders</em>
                  </p>
                </div>
              </section>

              <section style="margin-bottom: var(--space-16);">
                <h2>🤝 Community Hub</h2>
                <div class="grid grid--2">
                  <div class="card">
                    <h3 class="card__title">Private Discord Access</h3>
                    <p class="card__description">
                      Join our exclusive Discord server with 200+ verified ENS holders. 
                      Daily alpha, trading signals, and direct access to industry insiders.
                    </p>
                    <button class="btn btn--primary">Join Discord →</button>
                  </div>
                  
                  <div class="card">
                    <h3 class="card__title">Monthly AMA Sessions</h3>
                    <p class="card__description">
                      Live Q&A sessions with DeFi protocol founders, VCs, and successful traders. 
                      Next session: Vitalik Buterin on Ethereum's roadmap.
                    </p>
                    <button class="btn btn--primary">Register for AMA →</button>
                  </div>
                </div>
              </section>

              <section id="get-subdomain" style="margin-bottom: var(--space-16); padding: var(--space-12); background: var(--bg-secondary); border-radius: var(--border-radius-lg);">
                <div class="text-center">
                  <h2>Invite More Members</h2>
                  <p style="margin-bottom: var(--space-6); color: var(--text-secondary);">
                    Know someone who should join our exclusive community? 
                    As an existing holder, you can recommend them for an allthingscrypto.eth subdomain.
                  </p>
                  <button class="btn btn--outline">Refer a Friend →</button>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}