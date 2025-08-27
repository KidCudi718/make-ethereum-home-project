import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

export function GlossaryPage() {
  const glossaryTerms = [
    { term: "Blockchain", definition: "A shared, tamper-proof digital notebook that thousands of computers around the world keep identical copies of, ensuring no single entity can change or control the records." },
    { term: "Cryptocurrency", definition: "Digital money that works without banks, using mathematics and computer networks to verify transactions and transfer value instantly across the world." },
    { term: "DAO (Decentralized Autonomous Organization)", definition: "A company where decisions are made by token holder voting rather than executives, and rules are enforced by computer code rather than human management." },
    { term: "DeFi (Decentralized Finance)", definition: "Financial services like lending, borrowing, and trading built using smart contracts, allowing people to access banking services without traditional banks." },
    { term: "Ethereum", definition: "A programmable blockchain platform that works like a 'world computer,' allowing developers to build decentralized applications that inherit blockchain's security and transparency." },
    { term: "Ether (ETH)", definition: "Ethereum's native cryptocurrency that serves as 'fuel' for the network, required to pay transaction fees and interact with applications built on Ethereum." },
    { term: "Gas / Gas Fees", definition: "The fee paid in Ether to use the Ethereum network, compensating the thousands of computers that process transactions and maintain the blockchain." },
    { term: "Layer 2", definition: "Additional blockchain layers built on top of Ethereum that process transactions faster and cheaper while inheriting Ethereum's security guarantees." },
    { term: "NFT (Non-Fungible Token)", definition: "A digital certificate of ownership for unique items like digital art, allowing creators to prove authenticity and buyers to verify they own an original digital creation." },
    { term: "Private Key", definition: "Like the master key to your cryptocurrency wallet - a secret code that proves you own your digital assets and allows you to spend or transfer them." },
    { term: "Proof of Stake", definition: "An energy-efficient method for securing blockchain networks where validators are chosen to create new blocks based on how much cryptocurrency they stake (lock up) as collateral." },
    { term: "Proof of Work", definition: "An energy-intensive method for securing blockchain networks where computers compete to solve complex math problems, with the winner getting to create the next block." },
    { term: "Public Key", definition: "Like your wallet's address - a code you can safely share with others so they can send you cryptocurrency, while keeping your private key secret." },
    { term: "Smart Contract", definition: "A computer program that automatically executes agreements when conditions are met, like a vending machine that gives you a product when you insert correct payment." },
    { term: "Wallet", definition: "Software that stores your cryptocurrency keys and lets you send, receive, and manage your digital assets. Can be custodial (company controls keys) or non-custodial (you control keys)." }
  ].sort((a, b) => a.term.localeCompare(b.term))

  return (
    <>
      <Header />
      
      <main id="main-content" class="section">
        <div class="container">
            <header style="text-align: center; margin-bottom: var(--space-16);">
              <h1>Ethereum Glossary</h1>
              <p style="font-size: var(--text-xl); color: var(--text-secondary); max-width: 600px; margin: 0 auto;">
                Essential blockchain and Ethereum terms explained in simple language
              </p>
            </header>

            <div class="glossary-search">
              <input 
                id="glossary-search"
                class="search-input"
                type="text" 
                placeholder="Search terms and definitions..." 
                aria-label="Search glossary terms"
              />
            </div>

            <div class="glossary-grid">
              {glossaryTerms.map((item, index) => (
                <div key={index} class="glossary-term">
                  <h3 class="glossary-term__title">{item.term}</h3>
                  <p class="glossary-term__definition">{item.definition}</p>
                </div>
              ))}
            </div>

            <section class="text-center" style="padding: var(--space-16) 0; background-color: var(--bg-secondary); border-radius: var(--border-radius-lg); margin-top: var(--space-16);">
              <h2>Need More Context?</h2>
              <p style="margin-bottom: var(--space-8); color: var(--text-secondary); max-width: 500px; margin-left: auto; margin-right: auto;">
                These terms make more sense when you understand the complete story behind them.
              </p>
              <div class="hero__actions">
                <a href="/chapters" class="btn btn--primary">Read the Full Story</a>
                <a href="/resources" class="btn btn--secondary">Official Resources</a>
                <a href="/" class="btn btn--outline">Back to Home</a>
              </div>
            </section>
        </div>
      </main>

      <Footer />
    </>
  )
}