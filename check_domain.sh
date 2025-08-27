#!/bin/bash
# Domain Status Checker for makeethereumhome.com

echo "🔍 Checking makeethereumhome.com domain status..."
echo "=============================================="

# Check DNS resolution
echo "📡 DNS Resolution:"
nslookup makeethereumhome.com 2>/dev/null || echo "❌ DNS not resolving yet"
echo ""

# Check if CNAME exists
echo "🔗 CNAME Record:"
dig makeethereumhome.com CNAME +short 2>/dev/null || echo "❌ No CNAME record found"
echo ""

# Test HTTP response
echo "🌐 Website Test:"
if curl -s -o /dev/null -w "%{http_code}" https://makeethereumhome.com 2>/dev/null | grep -q "200"; then
    echo "✅ Website is responding (200 OK)"
else
    echo "❌ Website not yet accessible"
fi
echo ""

# Check SSL certificate
echo "🔒 SSL Certificate:"
if timeout 5 openssl s_client -connect makeethereumhome.com:443 -servername makeethereumhome.com </dev/null 2>/dev/null | grep -q "Verify return code: 0"; then
    echo "✅ SSL certificate is valid"
else
    echo "❌ SSL certificate not yet available"
fi
echo ""

echo "📋 Quick Setup Reminder:"
echo "If any checks fail, add this CNAME record:"
echo "  Type: CNAME"
echo "  Name: @ (or makeethereumhome.com)" 
echo "  Target: ethereum-story.pages.dev"
echo ""
echo "⏱️  Allow 15-30 minutes after CNAME setup for full propagation"