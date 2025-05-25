#!/bin/bash

echo "🚀 Starting Personal OS HUD Server..."

# Kill any existing Next.js processes
echo "🔄 Cleaning up existing processes..."
pkill -f "next dev" 2>/dev/null || true

# Clean build cache
echo "🧹 Cleaning build cache..."
rm -rf .next
rm -rf node_modules/.cache
rm -rf .turbo

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Not in a Next.js project directory"
    echo "📁 Current directory: $(pwd)"
    echo "💡 Please run this script from the personal-hud directory"
    exit 1
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Start the server
echo "▲ Starting Next.js development server..."
echo "📍 Server will be available at:"
echo "   • http://localhost:3000/open"
echo "   • Or the next available port if 3000 is busy"
echo ""
echo "🛑 Press Ctrl+C to stop the server"
echo ""

npm run dev 