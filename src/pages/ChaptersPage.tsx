import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { ScrollProgress } from '../components/ScrollProgress'

export function ChaptersPage() {
  return (
    <>
      <ScrollProgress />
      <Header />
      
      <main id="main">
        <div class="container" style="padding-top: 3rem; padding-bottom: 5rem;">
          <div class="content">
            <header style="text-align: center; margin-bottom: 4rem;">
              <h1>The Complete Ethereum Story</h1>
              <p style="font-size: var(--font-size-lg); color: var(--color-text-muted); margin-bottom: 0;">
                A 10-part journey for curious beginners
              </p>
              <p style="font-size: var(--font-size-sm); color: var(--color-text-muted); margin-top: 1rem;">
                Estimated reading time: ~25 minutes
              </p>
            </header>
          </div>

          <div class="chapters-layout">
            <div class="chapters-content">
              
              {/* Section 1 */}
              <section id="section-1" class="chapter">
                <header class="chapter__header">
                  <div class="chapter__eyebrow">Section 1</div>
                  <h2 class="chapter__title">The Problem with Today's Internet</h2>
                  <div class="chapter__icon">🌐</div>
                </header>
                
                <div class="chapter__content">
                  <p>Imagine you're using your favorite social media app, online banking, or shopping website. Behind the scenes, every single one of these services is controlled by a company that has complete power over your data, your money, and the rules of how things work. Facebook can ban you, banks can freeze your account, and online stores can change their terms whenever they want.</p>

                  <p>But what if there was a different way? What if we could build internet services that nobody owns or controls – not even the people who created them? This is the problem that led to the creation of Ethereum. Before we understand what Ethereum is, we need to understand why we needed something like it in the first place. The current internet is built on trust in big companies, but what if we could build systems that work automatically, without needing to trust anyone?</p>
                </div>

                <nav class="chapter__nav">
                  <div></div>
                  <a href="#section-2" class="chapter__nav-button">
                    Next: Digital Money <span aria-hidden="true">→</span>
                  </a>
                </nav>
              </section>

              {/* Section 2 */}
              <section id="section-2" class="chapter">
                <header class="chapter__header">
                  <div class="chapter__eyebrow">Section 2</div>
                  <h2 class="chapter__title">Enter the World of Digital Money</h2>
                  <div class="chapter__icon">💰</div>
                </header>
                
                <div class="chapter__content">
                  <p>To understand Ethereum's story, we first need to understand cryptocurrency – digital money that exists only on computers. Think about it this way: when you send a text message, you're sending information instantly across the world without needing a phone company to physically carry your message. Cryptocurrency works similarly – it's a way to send value instantly across the world without needing a bank to physically move money.</p>

                  <p>The magic happens through mathematics and cryptography (hence "crypto"-currency). Instead of trusting a bank to keep track of who has what money, cryptocurrency uses complex math problems that computers solve to verify transactions. This means no single institution controls the money – it's managed by thousands of computers working together. Bitcoin was the first successful cryptocurrency, proving that digital money could work without banks. But this was just the beginning of our story.</p>
                </div>

                <nav class="chapter__nav">
                  <a href="#section-1" class="chapter__nav-button">
                    <span aria-hidden="true">←</span> Previous: Internet Problems
                  </a>
                  <a href="#section-3" class="chapter__nav-button">
                    Next: Blockchain Revolution <span aria-hidden="true">→</span>
                  </a>
                </nav>
              </section>

              {/* Section 3 */}
              <section id="section-3" class="chapter">
                <header class="chapter__header">
                  <div class="chapter__eyebrow">Section 3</div>
                  <h2 class="chapter__title">The Blockchain Revolution</h2>
                  <div class="chapter__icon">⛓️</div>
                </header>
                
                <div class="chapter__content">
                  <p>Now here's where the story gets really interesting. The technology that makes cryptocurrency possible is called blockchain, and it's like a magical notebook that solves one of the biggest problems in digital systems: how do you make sure everyone agrees on what happened?</p>

                  <p>Imagine thousands of people around the world all keeping identical notebooks. Every time someone wants to write a new page (make a transaction), they have to announce it to everyone. All the notebook keepers check if this new page makes sense – does the person actually have the money they're trying to spend? If the majority agree it's valid, everyone adds the identical page to their notebook.</p>

                  <p>Here's the beautiful part: once a page is added, it can never be erased or changed because you'd have to somehow convince thousands of people to change their notebooks at exactly the same time. This creates a permanent, tamper-proof record of everything that's ever happened. This blockchain technology became the foundation for something much bigger than just digital money.</p>
                </div>

                <nav class="chapter__nav">
                  <a href="#section-2" class="chapter__nav-button">
                    <span aria-hidden="true">←</span> Previous: Digital Money
                  </a>
                  <a href="#section-4" class="chapter__nav-button">
                    Next: Bitcoin's Limits <span aria-hidden="true">→</span>
                  </a>
                </nav>
              </section>

              {/* Section 4 */}
              <section id="section-4" class="chapter">
                <header class="chapter__header">
                  <div class="chapter__eyebrow">Section 4</div>
                  <h2 class="chapter__title">Bitcoin's Success and Limitations</h2>
                  <div class="chapter__icon">₿</div>
                </header>
                
                <div class="chapter__content">
                  <p>Bitcoin was the first successful use of blockchain technology, and it proved something revolutionary: you could create a form of money that worked without any government or bank controlling it. Bitcoin became "digital gold" – a way to store and transfer value that no single entity could manipulate.</p>

                  <p>But Bitcoin was designed to do one thing really well: be money. Think of Bitcoin like a very sophisticated calculator – it's excellent at what it does, but it's limited in scope. You could send Bitcoin from person to person, and you could store it as an investment, but you couldn't build complex applications on top of it. You couldn't create automatic contracts, you couldn't build new types of financial services, and you couldn't create the kinds of applications that make the internet useful.</p>

                  <p>This limitation sparked a question: what if we could take the security and decentralization of blockchain technology and create a platform where people could build any kind of application they wanted? This question led to the next chapter in our story.</p>
                </div>

                <nav class="chapter__nav">
                  <a href="#section-3" class="chapter__nav-button">
                    <span aria-hidden="true">←</span> Previous: Blockchain Revolution
                  </a>
                  <a href="#section-5" class="chapter__nav-button">
                    Next: Ethereum's Big Idea <span aria-hidden="true">→</span>
                  </a>
                </nav>
              </section>

              {/* Section 5 */}
              <section id="section-5" class="chapter">
                <header class="chapter__header">
                  <div class="chapter__eyebrow">Section 5</div>
                  <h2 class="chapter__title">Ethereum's Big Idea</h2>
                  <div class="chapter__icon">💎</div>
                </header>
                
                <div class="chapter__content">
                  <p>In 2015, a young programmer named Vitalik Buterin and his team launched Ethereum with a revolutionary idea: what if blockchain could be more than just a ledger for digital money? What if it could be a "world computer" – a platform where anyone could build and run applications that inherit all the security and decentralization benefits of blockchain?</p>

                  <p>Think of the difference this way: if Bitcoin is like a calculator that's really good at math, Ethereum is like a smartphone that can run any app you can imagine. Ethereum kept the best parts of Bitcoin – the security, the decentralization, the transparency – but added the ability to run programs.</p>

                  <p>These programs, called "smart contracts," could automatically handle complex agreements without needing lawyers, banks, or any other intermediaries. Suddenly, blockchain wasn't just about money anymore – it was about reimagining how we could build any kind of digital service. Ethereum became the "app store" for decentralized applications, where developers could build services that nobody owns or controls.</p>
                </div>

                <nav class="chapter__nav">
                  <a href="#section-4" class="chapter__nav-button">
                    <span aria-hidden="true">←</span> Previous: Bitcoin's Limits
                  </a>
                  <a href="#section-6" class="chapter__nav-button">
                    Next: Smart Contracts <span aria-hidden="true">→</span>
                  </a>
                </nav>
              </section>

              {/* Section 6 */}
              <section id="section-6" class="chapter">
                <header class="chapter__header">
                  <div class="chapter__eyebrow">Section 6</div>
                  <h2 class="chapter__title">Smart Contracts - The Game Changer</h2>
                  <div class="chapter__icon">🤖</div>
                </header>
                
                <div class="chapter__content">
                  <p>Here's where our story takes a fascinating turn with smart contracts – perhaps the most important innovation Ethereum brought to the world. A smart contract is like a vending machine for agreements. Just as a vending machine automatically gives you a snack when you insert the right coins, a smart contract automatically executes an agreement when certain conditions are met.</p>

                  <p>Let's say you want to bet your friend $20 that it will rain tomorrow. Normally, you'd need to trust each other to pay up, or maybe ask someone else to hold the money. With a smart contract, you both send $20 to the contract, and it automatically checks a weather website tomorrow. If it rains, you get all $40. If it doesn't, your friend gets it. No trust needed, no arguments possible – the code executes exactly as programmed.</p>

                  <p>Now imagine applying this concept to insurance (automatic payouts when flights are delayed), real estate (automatic transfer of property when payments are made), or supply chains (automatic payments when goods are delivered). Smart contracts began enabling entirely new business models that were impossible before Ethereum existed.</p>
                </div>

                <nav class="chapter__nav">
                  <a href="#section-5" class="chapter__nav-button">
                    <span aria-hidden="true">←</span> Previous: Ethereum's Big Idea
                  </a>
                  <a href="#section-7" class="chapter__nav-button">
                    Next: Ecosystem Explosion <span aria-hidden="true">→</span>
                  </a>
                </nav>
              </section>

              {/* Section 7 */}
              <section id="section-7" class="chapter">
                <header class="chapter__header">
                  <div class="chapter__eyebrow">Section 7</div>
                  <h2 class="chapter__title">The Ethereum Ecosystem Explodes</h2>
                  <div class="chapter__icon">🚀</div>
                </header>
                
                <div class="chapter__content">
                  <p>Once Ethereum provided the foundation, an entire ecosystem of applications began to flourish. Developers realized they could build financial services without banks, social networks without corporations, and marketplaces without intermediaries.</p>

                  <p><strong>Decentralized Finance (DeFi)</strong> emerged as people built lending platforms, exchanges, and insurance services using smart contracts. Suddenly, you could lend money and earn interest, or borrow money, without ever talking to a bank or filling out paperwork.</p>

                  <p><strong>Non-Fungible Tokens (NFTs)</strong> allowed artists to create verifiable digital art and collectibles. For the first time in history, you could prove you owned an original digital creation.</p>

                  <p><strong>Decentralized Autonomous Organizations (DAOs)</strong> let people create companies where decisions are made by voting rather than by executives, and where the rules are enforced by code rather than by human management.</p>

                  <p>Gaming, supply chain management, digital identity, and countless other industries began experimenting with Ethereum-based solutions. The platform that started as an idea to make blockchain programmable had become the foundation for an entirely new digital economy.</p>
                </div>

                <nav class="chapter__nav">
                  <a href="#section-6" class="chapter__nav-button">
                    <span aria-hidden="true">←</span> Previous: Smart Contracts
                  </a>
                  <a href="#section-8" class="chapter__nav-button">
                    Next: Ether Fuel <span aria-hidden="true">→</span>
                  </a>
                </nav>
              </section>

              {/* Section 8 */}
              <section id="section-8" class="chapter">
                <header class="chapter__header">
                  <div class="chapter__eyebrow">Section 8</div>
                  <h2 class="chapter__title">Ether - The Fuel of the System</h2>
                  <div class="chapter__icon">⛽</div>
                </header>
                
                <div class="chapter__content">
                  <p>Throughout this story, we haven't talked much about Ethereum's cryptocurrency, called Ether (ETH). While Ethereum the platform enables all these amazing applications, Ether serves as the "fuel" that makes everything work.</p>

                  <p>Think of Ether like gasoline for a car, or electricity for your house. Every time someone uses an Ethereum application – whether they're making a trade, creating an NFT, or interacting with a smart contract – they need to pay a small fee in Ether. These fees, called "gas," compensate the thousands of computers around the world that maintain the Ethereum network.</p>

                  <p>But Ether is more than just fuel – it's also an investment asset. As more applications are built on Ethereum and more people use the platform, demand for Ether increases. Currently trading at thousands of dollars per coin with a market cap of over $500 billion, Ether has become the second-largest cryptocurrency after Bitcoin. This creates an interesting dynamic: Ethereum's success as a platform drives demand for its currency, and the value of the currency incentivizes more development on the platform.</p>
                </div>

                <nav class="chapter__nav">
                  <a href="#section-7" class="chapter__nav-button">
                    <span aria-hidden="true">←</span> Previous: Ecosystem Explosion
                  </a>
                  <a href="#section-9" class="chapter__nav-button">
                    Next: Challenges <span aria-hidden="true">→</span>
                  </a>
                </nav>
              </section>

              {/* Section 9 */}
              <section id="section-9" class="chapter">
                <header class="chapter__header">
                  <div class="chapter__eyebrow">Section 9</div>
                  <h2 class="chapter__title">The Challenges and Growing Pains</h2>
                  <div class="chapter__icon">⚠️</div>
                </header>
                
                <div class="chapter__content">
                  <p>No revolutionary technology comes without challenges, and Ethereum's success has created its own set of problems. As more people began using Ethereum applications, the network became congested. Transaction fees skyrocketed, sometimes costing $50 or more for simple operations. The network could only process about 15 transactions per second – far too slow for mainstream adoption.</p>

                  <p>Competition emerged from newer blockchains like Solana and Cardano, which promised faster transactions and lower fees. Some developers began building on these alternative platforms instead of Ethereum. There were also concerns about energy consumption, as Ethereum initially used the same energy-intensive system as Bitcoin.</p>

                  <p>The Ethereum community responded with ambitious upgrades. They transitioned from an energy-intensive "proof of work" system to a more efficient "proof of stake" system, reducing energy consumption by over 99%. They're also building "Layer 2" solutions – additional layers on top of Ethereum that can process transactions faster and cheaper while maintaining the security of the main network.</p>

                  <p>These challenges represent growing pains rather than fundamental flaws. They show that Ethereum is being used so much that it's pushing the boundaries of what's possible, driving innovation in blockchain scalability.</p>
                </div>

                <nav class="chapter__nav">
                  <a href="#section-8" class="chapter__nav-button">
                    <span aria-hidden="true">←</span> Previous: Ether Fuel
                  </a>
                  <a href="#section-10" class="chapter__nav-button">
                    Next: The Future <span aria-hidden="true">→</span>
                  </a>
                </nav>
              </section>

              {/* Section 10 */}
              <section id="section-10" class="chapter">
                <header class="chapter__header">
                  <div class="chapter__eyebrow">Section 10</div>
                  <h2 class="chapter__title">The Future and What It Means for You</h2>
                  <div class="chapter__icon">🔮</div>
                </header>
                
                <div class="chapter__content">
                  <p>As our story reaches the present day, Ethereum stands at a fascinating crossroads. It has proven that decentralized applications are not just possible but valuable, with billions of dollars flowing through Ethereum-based applications daily. Major corporations, governments, and institutions are now building on Ethereum or creating similar platforms.</p>

                  <p>The implications extend far beyond just technology. Ethereum represents a philosophical shift toward systems where users maintain control over their data and money, where applications can't be shut down by any single entity, and where innovation happens through open collaboration rather than corporate gatekeeping.</p>

                  <p>For beginners considering whether to learn more about or invest in Ethereum, the key is understanding that you're not just buying a cryptocurrency – you're potentially participating in a new model for how digital systems could work. However, this also means accepting significant risks: extreme price volatility, technological complexity, regulatory uncertainty, and the possibility that newer technologies could eventually replace Ethereum.</p>

                  <p>The story of Ethereum is still being written. Whether it becomes the foundation of a new decentralized internet or remains a niche technology used by enthusiasts depends on how well it can solve its current challenges while maintaining its core principles of openness and decentralization. What's certain is that Ethereum has already fundamentally changed how we think about what's possible with computer networks, and its influence will be felt for decades to come.</p>
                </div>

                <nav class="chapter__nav">
                  <a href="#section-9" class="chapter__nav-button">
                    <span aria-hidden="true">←</span> Previous: Challenges
                  </a>
                  <div></div>
                </nav>
                
                <div style="margin-top: 3rem; text-align: center;">
                  <a href="#main" class="back-to-top">
                    <span aria-hidden="true">↑</span> Back to top
                  </a>
                </div>
              </section>

              {/* End-of-Page CTA */}
              <section style="text-align: center; padding: 4rem 0; background-color: var(--color-bg-subtle); border-radius: var(--border-radius-lg); margin-top: 4rem;">
                <h2>Continue Your Journey</h2>
                <p style="margin-bottom: 2rem; color: var(--color-text-muted);">
                  Now that you understand the complete Ethereum story, explore these resources to deepen your knowledge.
                </p>
                <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                  <a href="/glossary" class="btn btn--primary">Learn the Terms</a>
                  <a href="/resources" class="btn btn--secondary">Explore More</a>
                  <a href="/about" class="btn btn--secondary">About This Site</a>
                </div>
              </section>
              
            </div>

            {/* Table of Contents - Desktop Sidebar */}
            <aside class="toc-container">
              <div class="toc">
                <h3 class="toc__title">Chapters</h3>
                <nav class="toc__list" role="navigation" aria-label="Table of contents">
                  <div class="toc__item">
                    <a href="#section-1" class="toc__link">1. The Problem with Today's Internet</a>
                  </div>
                  <div class="toc__item">
                    <a href="#section-2" class="toc__link">2. Enter the World of Digital Money</a>
                  </div>
                  <div class="toc__item">
                    <a href="#section-3" class="toc__link">3. The Blockchain Revolution</a>
                  </div>
                  <div class="toc__item">
                    <a href="#section-4" class="toc__link">4. Bitcoin's Success and Limitations</a>
                  </div>
                  <div class="toc__item">
                    <a href="#section-5" class="toc__link">5. Ethereum's Big Idea</a>
                  </div>
                  <div class="toc__item">
                    <a href="#section-6" class="toc__link">6. Smart Contracts — The Game Changer</a>
                  </div>
                  <div class="toc__item">
                    <a href="#section-7" class="toc__link">7. The Ethereum Ecosystem Explodes</a>
                  </div>
                  <div class="toc__item">
                    <a href="#section-8" class="toc__link">8. Ether — The Fuel of the System</a>
                  </div>
                  <div class="toc__item">
                    <a href="#section-9" class="toc__link">9. The Challenges and Growing Pains</a>
                  </div>
                  <div class="toc__item">
                    <a href="#section-10" class="toc__link">10. The Future and What It Means for You</a>
                  </div>
                </nav>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}