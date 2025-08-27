import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

// Enable CORS
app.use('/api/*', cors())

// Serve static files
app.use('/static/*', serveStatic({ root: './public' }))

// Routes
app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>The Complete Ethereum Story: A Beginner's Journey</title>
        <meta name="description" content="A beginner-friendly guide to understanding Ethereum through a cohesive 10-section narrative journey.">
        <link href="/static/style.css" rel="stylesheet">
    </head>
    <body>
        <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);">
            <div style="text-align: center; max-width: 800px; padding: 2rem;">
                <h1 style="font-size: 3rem; color: #627EEA; margin-bottom: 1rem; font-weight: 700;">The Complete Ethereum Story</h1>
                <p style="font-size: 1.5rem; color: #64748b; margin-bottom: 2rem;">A Beginner's Journey</p>
                <p style="font-size: 1.125rem; color: #475569; margin-bottom: 3rem; line-height: 1.6;">
                    A cohesive narrative broken into 10 learning sections, designed to take curious readers 
                    from understanding the problems with today's internet all the way to grasping Ethereum's 
                    potential and limitations.
                </p>
                <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                    <a href="/chapters" style="background: #627EEA; color: white; padding: 1rem 2rem; border-radius: 0.5rem; text-decoration: none; font-weight: 600; transition: background 0.2s;">Start Learning</a>
                    <a href="/about" style="background: transparent; color: #627EEA; padding: 1rem 2rem; border: 2px solid #627EEA; border-radius: 0.5rem; text-decoration: none; font-weight: 600; transition: all 0.2s;">About This Guide</a>
                </div>
            </div>
        </div>
    </body>
    </html>
  `)
})

app.get('/chapters', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>The Complete Ethereum Story - Chapters</title>
        <meta name="description" content="Read the complete 10-section narrative journey through Ethereum's story.">
        <link href="/static/style.css" rel="stylesheet">
    </head>
    <body>
        <div style="max-width: 800px; margin: 0 auto; padding: 2rem; line-height: 1.7;">
            <header style="text-align: center; margin-bottom: 3rem;">
                <h1 style="color: #627EEA; margin-bottom: 1rem;">The Complete Ethereum Story</h1>
                <p style="color: #64748b;">A 10-part journey for curious beginners</p>
                <nav style="margin-top: 2rem;">
                    <a href="/" style="color: #627EEA; text-decoration: none; margin-right: 1rem;">← Home</a>
                    <a href="/about" style="color: #627EEA; text-decoration: none;">About</a>
                </nav>
            </header>
            
            <article style="margin-bottom: 3rem;">
                <h2 style="color: #1e293b; margin-bottom: 1rem;">Section 1: The Problem with Today's Internet</h2>
                <p>Imagine you're using your favorite social media app, online banking, or shopping website. Behind the scenes, every single one of these services is controlled by a company that has complete power over your data, your money, and the rules of how things work. Facebook can ban you, banks can freeze your account, and online stores can change their terms whenever they want.</p>
                <p>But what if there was a different way? What if we could build internet services that nobody owns or controls – not even the people who created them? This is the problem that led to the creation of Ethereum. Before we understand what Ethereum is, we need to understand why we needed something like it in the first place. The current internet is built on trust in big companies, but what if we could build systems that work automatically, without needing to trust anyone?</p>
            </article>
            
            <article style="margin-bottom: 3rem;">
                <h2 style="color: #1e293b; margin-bottom: 1rem;">Section 2: Enter the World of Digital Money</h2>
                <p>To understand Ethereum's story, we first need to understand cryptocurrency – digital money that exists only on computers. Think about it this way: when you send a text message, you're sending information instantly across the world without needing a phone company to physically carry your message. Cryptocurrency works similarly – it's a way to send value instantly across the world without needing a bank to physically move money.</p>
                <p>The magic happens through mathematics and cryptography (hence "crypto"-currency). Instead of trusting a bank to keep track of who has what money, cryptocurrency uses complex math problems that computers solve to verify transactions. This means no single institution controls the money – it's managed by thousands of computers working together. Bitcoin was the first successful cryptocurrency, proving that digital money could work without banks. But this was just the beginning of our story.</p>
            </article>
            
            <div style="text-align: center; margin-top: 3rem; padding: 2rem; background: #f8fafc; border-radius: 0.5rem;">
                <p style="color: #64748b; margin-bottom: 1rem;">This is a preview deployment. The complete 10-section story and interactive features are ready for full deployment.</p>
                <p style="color: #627EEA; font-weight: 600;">✅ Successfully deployed to Cloudflare Pages</p>
            </div>
        </div>
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
        <title>About - The Complete Ethereum Story</title>
        <meta name="description" content="Learn about this educational project and important disclaimers.">
    </head>
    <body>
        <div style="max-width: 800px; margin: 0 auto; padding: 2rem; line-height: 1.7;">
            <header style="text-align: center; margin-bottom: 3rem;">
                <h1 style="color: #627EEA;">About & Disclaimer</h1>
                <nav style="margin-top: 1rem;">
                    <a href="/" style="color: #627EEA; text-decoration: none; margin-right: 1rem;">← Home</a>
                    <a href="/chapters" style="color: #627EEA; text-decoration: none;">Read Story</a>
                </nav>
            </header>
            
            <section style="margin-bottom: 2rem;">
                <h2>About This Project</h2>
                <p>"The Complete Ethereum Story" was created to provide a comprehensive, beginner-friendly educational guide to Ethereum through a cohesive narrative journey. This content is designed for intelligent beginners with zero prior knowledge of cryptocurrency or blockchain technology.</p>
            </section>
            
            <section style="background: #fff3cd; padding: 1.5rem; border-radius: 0.5rem; border-left: 4px solid #ffb020;">
                <h2 style="color: #856404;">⚠️ Important Disclaimer</h2>
                <p><strong>This content is for educational purposes only and should not be considered financial, investment, legal, or tax advice.</strong></p>
                <ul>
                    <li>Cryptocurrency markets are extremely volatile and unpredictable</li>
                    <li>You can lose 100% of any money invested in cryptocurrency</li>
                    <li>Always consult qualified financial advisors before making investment decisions</li>
                    <li>Only invest money you can afford to lose completely</li>
                </ul>
            </section>
            
            <section style="margin-top: 2rem;">
                <h2>Technical Information</h2>
                <p>This website is built with Hono framework and deployed on Cloudflare Pages for fast, reliable access worldwide. It's designed to be accessible, performant, and readable across all devices.</p>
            </section>
        </div>
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