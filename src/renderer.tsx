import { jsxRenderer } from 'hono/jsx-renderer'

interface RendererProps {
  title?: string
  description?: string
  canonical?: string
  ogImage?: string
  isArticle?: boolean
}

export const renderer = jsxRenderer(({ children, title, description, canonical, ogImage, isArticle }: RendererProps) => {
  const defaultTitle = 'The Complete Ethereum Story: A Beginner\'s Journey'
  const defaultDescription = 'A beginner-friendly guide to understanding Ethereum through a cohesive 10-section narrative journey. Learn blockchain, smart contracts, DeFi, NFTs, and more.'
  const baseUrl = 'https://makeethereumhome.com'
  
  const pageTitle = title || defaultTitle
  const pageDescription = description || defaultDescription
  const canonicalUrl = canonical ? `${baseUrl}${canonical}` : `${baseUrl}/`
  const ogImageUrl = ogImage || `${baseUrl}/static/og-image.png`
  
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Basic SEO */}
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content={isArticle ? 'article' : 'website'} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="The Complete Ethereum Story" />
        
        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={ogImageUrl} />
        
        {/* Additional SEO meta tags */}
        <meta name="author" content="The Complete Ethereum Story Editorial Team" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="theme-color" content="#627EEA" />
        
        {/* JSON-LD Structured Data */}
        {isArticle ? (
          <script type="application/ld+json" dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": pageTitle,
              "description": pageDescription,
              "image": [ogImageUrl],
              "author": {
                "@type": "Organization",
                "name": "The Complete Ethereum Story Editorial Team"
              },
              "publisher": {
                "@type": "Organization",
                "name": "The Complete Ethereum Story",
                "logo": {
                  "@type": "ImageObject",
                  "url": `${baseUrl}/static/favicon.svg`
                }
              },
              "datePublished": "2025-01-01",
              "dateModified": "2025-01-01",
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": canonicalUrl
              },
              "articleSection": "Education",
              "keywords": ["Ethereum", "blockchain", "cryptocurrency", "smart contracts", "DeFi", "NFT", "beginner guide"],
              "educationalLevel": "Beginner",
              "learningResourceType": "Article",
              "audience": {
                "@type": "EducationalAudience",
                "educationalRole": "general public"
              }
            })
          }} />
        ) : (
          <script type="application/ld+json" dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "The Complete Ethereum Story",
              "description": pageDescription,
              "url": baseUrl,
              "publisher": {
                "@type": "Organization",
                "name": "The Complete Ethereum Story"
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": `${baseUrl}/glossary?q={search_term_string}`
                },
                "query-input": "required name=search_term_string"
              }
            })
          }} />
        )}
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* Inter font with display=swap for better performance */}
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        
        {/* Favicons and app icons */}
        <link rel="icon" type="image/svg+xml" href="/static/favicon.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png" />
        <link rel="manifest" href="/static/site.webmanifest" />
        
        {/* CSS */}
        <link href="/static/style.css" rel="stylesheet" />
        
        {/* Theme detection script (inline for no flash) */}
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              const theme = localStorage.getItem('theme') || 
                (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
              document.documentElement.setAttribute('data-theme', theme);
            })();
          `
        }} />
      </head>
      <body>
        <a href="#main" class="skip-link">Skip to main content</a>
        {children}
        <script src="/static/app.js" defer></script>
      </body>
    </html>
  )
})