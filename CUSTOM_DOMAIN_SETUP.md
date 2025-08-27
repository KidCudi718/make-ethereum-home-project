# Custom Domain Setup Guide - makeethereumhome.com

## 🌐 Connecting Your Custom Domain to Cloudflare Pages

Your website is currently deployed at: **https://ethereum-story.pages.dev**  
Target custom domain: **makeethereumhome.com**

## 📋 Step-by-Step Setup Process

### Step 1: Access Cloudflare Dashboard
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Log in with your account (david.choukroun2@gmail.com)
3. Navigate to **"Pages"** in the left sidebar

### Step 2: Open Your Pages Project
1. Find and click on **"ethereum-story"** project
2. This should show your current deployment: https://ethereum-story.pages.dev

### Step 3: Add Custom Domain
1. In your project dashboard, look for **"Custom domains"** tab or section
2. Click **"Set up a custom domain"** or **"Add a custom domain"**
3. Enter: `makeethereumhome.com`
4. Click **"Continue"** or **"Add domain"**

### Step 4: Configure DNS Settings
Cloudflare will provide you with DNS configuration options:

#### Option A: If makeethereumhome.com is already on Cloudflare
- Cloudflare will automatically create a CNAME record
- The domain should be active within a few minutes

#### Option B: If the domain is with another provider
You'll need to add a CNAME record at your DNS provider:
```
Type: CNAME
Name: @ (or root/apex)
Value: ethereum-story.pages.dev
```

Or for www subdomain:
```
Type: CNAME  
Name: www
Value: ethereum-story.pages.dev
```

### Step 5: Verify SSL Certificate
1. Cloudflare will automatically provision an SSL certificate
2. Wait for the status to show "Active" (usually 5-15 minutes)
3. Test both HTTP and HTTPS versions

## 🔧 Alternative Setup Methods

### If you prefer WWW subdomain:
Instead of the root domain, you can use:
- **www.makeethereumhome.com** 

### If you want both:
Set up both root and www to point to your Pages project:
- Root domain: `makeethereumhome.com`  
- WWW subdomain: `www.makeethereumhome.com`

## ✅ Verification Steps

After setup, verify your domain is working:

1. **Test the domain**: Visit `https://makeethereumhome.com`
2. **Check SSL**: Ensure HTTPS works without warnings
3. **Test redirects**: Verify www/non-www redirects work as expected
4. **Mobile test**: Check the site works on mobile devices

## 🔄 Expected Timeline

- **DNS Propagation**: 5-15 minutes (if using Cloudflare DNS)
- **SSL Certificate**: 5-15 minutes after DNS is active
- **Global Propagation**: Up to 48 hours (usually much faster)

## 🚨 Troubleshooting

### Common Issues:
1. **DNS not propagating**: Wait up to 48 hours for global propagation
2. **SSL certificate pending**: Check that DNS is correctly configured
3. **404 errors**: Ensure the CNAME points to `ethereum-story.pages.dev`

### DNS Verification Tools:
- Check DNS propagation: https://dnschecker.org/
- Verify CNAME record: `nslookup makeethereumhome.com`

## 📞 Support Resources

If you encounter issues:
1. **Cloudflare Support**: Available in your dashboard
2. **Community Forum**: https://community.cloudflare.com/
3. **DNS Help**: Check with your domain registrar if DNS changes aren't working

## 🎯 Final Result

Once setup is complete, your website will be available at:
- **Primary**: https://makeethereumhome.com
- **Backup**: https://ethereum-story.pages.dev (always works)

The content will be identical on both URLs, served from Cloudflare's global network for optimal performance worldwide.

---

## 📝 Quick Checklist

- [ ] Access Cloudflare Dashboard
- [ ] Navigate to Pages → ethereum-story project  
- [ ] Add custom domain: makeethereumhome.com
- [ ] Configure DNS (CNAME to ethereum-story.pages.dev)
- [ ] Wait for SSL certificate activation
- [ ] Test domain functionality
- [ ] Verify HTTPS works properly

**Estimated Setup Time**: 15-30 minutes  
**Full Propagation**: Up to 48 hours