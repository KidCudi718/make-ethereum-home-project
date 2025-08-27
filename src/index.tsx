import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'
import { renderer } from './renderer'
import { HomePage } from './pages/HomePage'
import { ChaptersPage } from './pages/ChaptersPage'
import { GlossaryPage } from './pages/GlossaryPage'
import { PremiumPage } from './pages/PremiumPage'

const app = new Hono()

// Enable CORS
app.use('/api/*', cors())

// Serve static files
app.use('/static/*', serveStatic({ root: './public' }))

// Use renderer middleware
app.use(renderer)

// Routes
app.get('/', (c) => {
  return c.render(<HomePage />, {
    title: 'The Complete Ethereum Story: A Beginner\'s Journey',
    description: 'A beginner-friendly guide to understanding Ethereum through a cohesive 10-section narrative journey. Learn blockchain, smart contracts, DeFi, NFTs, and more.',
    canonical: '/'
  })
})

app.get('/chapters', (c) => {
  return c.render(<ChaptersPage />, {
    title: 'The Complete Ethereum Story - Chapters | Beginner\'s Guide to Ethereum',
    description: 'Read the complete 10-section narrative journey through Ethereum\'s story, from the problems with today\'s internet to the future of decentralized technology.',
    canonical: '/chapters',
    isArticle: true
  })
})

app.get('/glossary', (c) => {
  return c.render(<GlossaryPage />, {
    title: 'Ethereum Glossary - Terms & Definitions | The Complete Ethereum Story',
    description: 'Essential Ethereum and blockchain terms explained in simple, beginner-friendly language. From blockchain basics to DeFi, NFTs, and smart contracts.',
    canonical: '/glossary'
  })
})

app.get('/premium', (c) => {
  return c.render(<PremiumPage />, {
    title: 'Premium Content - Exclusive for allthingscrypto.eth Holders',
    description: 'Exclusive advanced content, market analysis, and community access for verified allthingscrypto.eth ENS subdomain holders.',
    canonical: '/premium'
  })
})

// API Routes for Web3 & Token Gating
app.post('/api/check-ens-ownership', async (c) => {
  try {
    const { account } = await c.req.json()
    
    if (!account || !account.match(/^0x[a-fA-F0-9]{40}$/)) {
      return c.json({ error: 'Invalid account address' }, 400)
    }
    
    console.log('🔍 Checking ENS ownership for:', account)
    
    // Check for allthingscrypto.eth subdomains using multiple methods
    const ownedSubdomains = await checkAllThingsCryptoENS(account)
    
    return c.json({
      account,
      subdomains: ownedSubdomains,
      hasAccess: ownedSubdomains.length > 0,
      accessLevel: getAccessLevel(ownedSubdomains[0]),
      ensName: ownedSubdomains[0] || null,
      timestamp: new Date().toISOString(),
      message: ownedSubdomains.length > 0 ? 
        `Welcome back, ${ownedSubdomains[0]}! 🎉` : 
        'No allthingscrypto.eth subdomain found for this wallet.'
    })
    
  } catch (error) {
    console.error('ENS check error:', error)
    return c.json({ error: 'Failed to check ENS ownership' }, 500)
  }
})

app.get('/api/premium/status', async (c) => {
  // This would normally verify JWT or session
  return c.json({ 
    premiumEnabled: true,
    requiredDomain: 'allthingscrypto.eth',
    totalHolders: 200
  })
})

// Helper functions for ENS checking
async function checkAllThingsCryptoENS(account: string) {
  try {
    // Method 1: Check via ENS reverse resolver (real API)
    const reverseResult = await checkENSReverse(account)
    if (reverseResult && reverseResult.endsWith('.allthingscrypto.eth')) {
      return [reverseResult]
    }
    
    // Method 2: Check via ENS subgraph (for comprehensive checking)
    const subgraphResult = await checkENSSubgraph(account)
    if (subgraphResult.length > 0) {
      return subgraphResult
    }
    
    // Method 3: Demo accounts for testing (remove in production)
    const demoResult = simulateENSCheck(account)
    if (demoResult.length > 0) {
      return demoResult
    }
    
    return []
    
  } catch (error) {
    console.error('ENS check failed:', error)
    return []
  }
}

async function checkENSReverse(account: string) {
  try {
    // Method 1: ENS Ideas API
    const response1 = await fetch(`https://api.ensideas.com/ens/resolve/${account}`)
    if (response1.ok) {
      const data = await response1.json()
      if (data.name && data.name.endsWith('.allthingscrypto.eth')) {
        console.log('✅ Found ENS via reverse lookup:', data.name)
        return data.name
      }
    }
    
    // Method 2: ENS Metadata API
    const response2 = await fetch(`https://metadata.ens.domains/mainnet/${account}`)
    if (response2.ok) {
      const data = await response2.json()
      if (data.name && data.name.endsWith('.allthingscrypto.eth')) {
        console.log('✅ Found ENS via metadata API:', data.name)
        return data.name
      }
    }
    
    return null
  } catch (error) {
    console.log('Reverse ENS lookup failed:', error)
    return null
  }
}

// Check ENS subgraph for comprehensive subdomain verification
async function checkENSSubgraph(account: string) {
  try {
    // Using The Graph protocol ENS subgraph
    const query = `{
      domains(where: {owner: "${account.toLowerCase()}", name_contains: ".allthingscrypto.eth"}) {
        name
        owner {
          id
        }
      }
    }`
    
    const response = await fetch('https://api.thegraph.com/subgraphs/name/ensdomains/ens', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query })
    })
    
    if (response.ok) {
      const data = await response.json()
      if (data.data && data.data.domains) {
        const domains = data.data.domains
          .filter((domain: any) => domain.name.endsWith('.allthingscrypto.eth'))
          .map((domain: any) => domain.name)
        
        if (domains.length > 0) {
          console.log('✅ Found ENS subdomains via subgraph:', domains)
          return domains
        }
      }
    }
    
    return []
  } catch (error) {
    console.log('ENS subgraph check failed:', error)
    return []
  }
}

function simulateENSCheck(account: string) {
  // Demo accounts for testing - replace with real data in production
  const testAccounts: { [key: string]: string[] } = {
    '0x742d35cc6636Bb6eE6c4b7C0D1D95D8b7E8C9E8F': ['founder.allthingscrypto.eth'],
    '0x8ba1f109551bD432803012645Hac136c31167c01': ['premium.allthingscrypto.eth'],
    '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045': ['diamond.allthingscrypto.eth'],
    '0x1234567890123456789012345678901234567890': ['vitalik.allthingscrypto.eth'],
    '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd': ['satoshi.allthingscrypto.eth'],
    '0x0000000000000000000000000000000000000001': ['demo.allthingscrypto.eth'],
    // Add more test accounts representing your 200+ holders
  }
  
  const found = testAccounts[account.toLowerCase()] || []
  if (found.length > 0) {
    console.log('✅ Found demo ENS account:', found)
  }
  return found
}

// Get access level based on ENS subdomain
function getAccessLevel(ensName: string | null) {
  if (!ensName) return 'none'
  
  if (ensName.includes('founder.') || ensName.includes('genesis.')) {
    return 'founder'
  } else if (ensName.includes('premium.') || ensName.includes('pro.')) {
    return 'premium'  
  } else if (ensName.includes('diamond.') || ensName.includes('platinum.')) {
    return 'diamond'
  } else if (ensName.includes('vitalik.') || ensName.includes('satoshi.')) {
    return 'legendary'
  } else {
    return 'standard'
  }
}

// Simplified Resources and About pages
app.get('/resources', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Ethereum Learning Resources | The Complete Ethereum Story</title>
        <meta name="description" content="Curated collection of official Ethereum resources, guides, and tools to continue your journey into blockchain and decentralized technology.">
        <link href="/static/style.css" rel="stylesheet">
    </head>
    <body>
        <header class="header">
            <div class="container">
                <div class="header__content">
                    <a href="/" class="header__logo">The Complete Ethereum Story</a>
                    <nav class="header__nav">
                        <a href="/">Home</a>
                        <a href="/chapters">Chapters</a>
                        <a href="/glossary">Glossary</a>
                        <a href="/resources">Resources</a>
                        <a href="/about">About</a>
                    </nav>
                </div>
            </div>
        </header>
        
        <main id="main">
            <div class="container" style="padding-top: 3rem; padding-bottom: 5rem;">
                <div class="content">
                    <header style="text-align: center; margin-bottom: 4rem;">
                        <h1>Ethereum Learning Resources</h1>
                        <p style="font-size: var(--font-size-lg); color: var(--color-text-muted);">
                            Curated collection of official resources and next steps for your Ethereum journey
                        </p>
                    </header>

                    <section style="margin-bottom: 4rem;">
                        <h2>Official Resources</h2>
                        <div class="cards-grid">
                            <div class="card">
                                <h3 class="card__title">🏠 Ethereum.org</h3>
                                <p class="card__description">
                                    The official Ethereum website with comprehensive beginner guides, developer documentation, and community resources.
                                </p>
                                <a href="https://ethereum.org/en/learn/" target="_blank" rel="noopener" style="color: var(--color-primary); font-weight: 500;">
                                    Visit Ethereum.org →
                                </a>
                            </div>
                            
                            <div class="card">
                                <h3 class="card__title">🦊 MetaMask Wallet</h3>
                                <p class="card__description">
                                    The most popular Ethereum wallet for beginners. Secure browser extension and mobile app for managing Ether and interacting with dApps.
                                </p>
                                <a href="https://metamask.io/" target="_blank" rel="noopener" style="color: var(--color-primary); font-weight: 500;">
                                    Download MetaMask →
                                </a>
                            </div>
                            
                            <div class="card">
                                <h3 class="card__title">📖 Ethereum Whitepaper</h3>
                                <p class="card__description">
                                    Vitalik Buterin's original 2013 paper explaining Ethereum's vision. Historical document that started the smart contract revolution.
                                </p>
                                <a href="https://ethereum.org/en/whitepaper/" target="_blank" rel="noopener" style="color: var(--color-primary); font-weight: 500;">
                                    Read Whitepaper →
                                </a>
                            </div>
                        </div>
                    </section>

                    <section style="text-align: center; padding: 4rem 0; background-color: var(--color-bg-subtle); border-radius: var(--border-radius-lg);">
                        <h2>Ready to Continue Learning?</h2>
                        <p style="margin-bottom: 2rem; color: var(--color-text-muted);">
                            Return to the main story or explore other sections of this guide.
                        </p>
                        <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                            <a href="/chapters" class="btn btn--primary">Re-read the Story</a>
                            <a href="/glossary" class="btn btn--secondary">Browse Glossary</a>
                            <a href="/" class="btn btn--secondary">Back to Home</a>
                        </div>
                    </section>
                </div>
            </div>
        </main>
        
        <script src="/static/app.js" defer></script>
    </body>
    </html>
  `)
})

app.get('/about', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>About & Disclaimer | The Complete Ethereum Story</title>
        <meta name="description" content="Learn about this educational project and important disclaimers about cryptocurrency risks and educational content.">
        <link href="/static/style.css" rel="stylesheet">
    </head>
    <body>
        <header class="header">
            <div class="container">
                <div class="header__content">
                    <a href="/" class="header__logo">The Complete Ethereum Story</a>
                    <nav class="header__nav">
                        <a href="/">Home</a>
                        <a href="/chapters">Chapters</a>
                        <a href="/glossary">Glossary</a>
                        <a href="/resources">Resources</a>
                        <a href="/about">About</a>
                    </nav>
                </div>
            </div>
        </header>
        
        <main id="main">
            <div class="container" style="padding-top: 3rem; padding-bottom: 5rem;">
                <div class="content">
                    <header style="text-align: center; margin-bottom: 4rem;">
                        <h1>About & Disclaimer</h1>
                        <p style="font-size: var(--font-size-lg); color: var(--color-text-muted);">
                            Learn about this educational project and important legal disclaimers
                        </p>
                    </header>

                    <section style="margin-bottom: 4rem;">
                        <h2>About This Project</h2>
                        <div class="card">
                            <p>
                                "The Complete Ethereum Story" was created to address a common problem: most cryptocurrency and blockchain 
                                educational content is either too technical for beginners or fragmented across dozens of articles, videos, 
                                and blog posts. We wanted to create a single, cohesive narrative that takes curious readers on a logical 
                                journey from understanding the problems with today's internet all the way to grasping Ethereum's potential 
                                and limitations.
                            </p>
                            
                            <p>
                                This guide is designed for intelligent beginners - people who are curious about blockchain technology 
                                but have zero prior knowledge of cryptocurrency, smart contracts, or decentralized systems. Rather than 
                                diving into technical details or investment advice, we focus on helping you understand the "why" behind 
                                Ethereum through storytelling and clear analogies.
                            </p>
                        </div>
                    </section>

                    <section id="disclaimer" style="margin-bottom: 4rem;">
                        <h2>⚠️ Important Disclaimer</h2>
                        <div class="card" style="background-color: #FFF3CD; border-color: var(--color-warning);">
                            <p style="font-weight: 600; margin-bottom: 1rem;">
                                This content is for educational purposes only and should not be considered financial, investment, legal, or tax advice.
                            </p>
                            
                            <p><strong>Educational Content Only:</strong></p>
                            <ul style="margin: 0.5rem 0 1rem 1.5rem;">
                                <li>All information is provided for learning and informational purposes</li>
                                <li>Content explains concepts and history, not investment strategies</li>
                                <li>No recommendations are made about buying, selling, or holding any cryptocurrency</li>
                            </ul>
                            
                            <p><strong>Cryptocurrency Risks:</strong></p>
                            <ul style="margin: 0.5rem 0 1rem 1.5rem;">
                                <li>Cryptocurrency markets are extremely volatile and unpredictable</li>
                                <li>You can lose 100% of any money invested in cryptocurrency</li>
                                <li>Past performance does not indicate future results</li>
                                <li>Regulatory changes could impact value and legality</li>
                            </ul>
                            
                            <p><strong>Do Your Own Research:</strong></p>
                            <ul style="margin: 0.5rem 0 1rem 1.5rem;">
                                <li>Consult qualified financial advisors before making investment decisions</li>
                                <li>Research multiple sources and verify information independently</li>
                                <li>Only invest money you can afford to lose completely</li>
                                <li>Understand the technology and risks before participating</li>
                            </ul>
                        </div>
                    </section>

                    <section id="contact" style="margin-bottom: 4rem;">
                        <h2>Contact & Feedback</h2>
                        <div class="card">
                            <p>
                                We welcome feedback about this educational content. If you find errors, have suggestions for 
                                improvement, or want to report accessibility issues, please reach out.
                            </p>
                            
                            <p>
                                <strong>Email:</strong> <a href="mailto:hello@makeethereumhome.com">hello@makeethereumhome.com</a>
                            </p>
                            
                            <p>
                                <strong>Response Time:</strong> We aim to respond to educational feedback within one week, though 
                                we cannot provide personalized investment advice or technical support for cryptocurrency transactions.
                            </p>
                        </div>
                    </section>

                    <section style="text-align: center; padding: 4rem 0; background-color: var(--color-bg-subtle); border-radius: var(--border-radius-lg);">
                        <h2>Ready to Start Learning?</h2>
                        <p style="margin-bottom: 2rem; color: var(--color-text-muted);">
                            Now that you understand what this guide is about, begin your journey through the complete Ethereum story.
                        </p>
                        <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                            <a href="/chapters" class="btn btn--primary">Start Reading</a>
                            <a href="/glossary" class="btn btn--secondary">Browse Terms</a>
                            <a href="/" class="btn btn--secondary">Back to Home</a>
                        </div>
                    </section>
                </div>
            </div>
        </main>
        
        <script src="/static/app.js" defer></script>
    </body>
    </html>
  `)
})

// SEO files
app.get('/sitemap.xml', (c) => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://makeethereumhome.com/</loc><changefreq>monthly</changefreq><priority>1.0</priority></url>
  <url><loc>https://makeethereumhome.com/chapters</loc><changefreq>monthly</changefreq><priority>0.9</priority></url>
  <url><loc>https://makeethereumhome.com/glossary</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://makeethereumhome.com/resources</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://makeethereumhome.com/about</loc><changefreq>yearly</changefreq><priority>0.5</priority></url>
</urlset>`

  c.header('Content-Type', 'application/xml')
  return c.text(sitemap)
})

app.get('/robots.txt', (c) => {
  const robots = `User-agent: *
Allow: /

Sitemap: https://makeethereumhome.com/sitemap.xml`

  c.header('Content-Type', 'text/plain')
  return c.text(robots)
})

export default app