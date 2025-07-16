#!/bin/bash

# Decibel Learning App - Netlify Deployment Script
echo "🔊 Building Decibel Learning App for Netlify..."

# Build the static site
echo "📦 Building static site..."
vite build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📁 Static files are in: dist/public"
    echo ""
    echo "🚀 Ready for Netlify deployment!"
    echo ""
    echo "Next steps:"
    echo "1. Go to netlify.com and sign up/log in"
    echo "2. Click 'Sites' → 'Deploy manually'"
    echo "3. Drag and drop the 'dist/public' folder"
    echo "4. Your decibel learning app will be live!"
    echo ""
    echo "Or use Netlify CLI:"
    echo "  netlify deploy --dir=dist/public"
    echo "  netlify deploy --dir=dist/public --prod"
else
    echo "❌ Build failed. Please check the errors above."
fi