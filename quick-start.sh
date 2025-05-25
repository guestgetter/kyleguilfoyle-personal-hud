#!/bin/bash

# Personal HUD Quick Start Script
# Run this from anywhere to start the server

echo "🎮 Personal OS HUD - Quick Start"
echo "================================"

# Get the script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

# Navigate to the project directory
cd "$SCRIPT_DIR"

echo "📁 Current directory: $(pwd)"

# Kill any existing processes
echo "🔄 Cleaning up existing processes..."
pkill -f "next dev" 2>/dev/null || true

# Clean build cache
echo "🧹 Cleaning build cache..."
rm -rf .next node_modules/.cache 2>/dev/null || true

# Start the server
echo "🚀 Starting development server..."
echo "📍 Server will be available at: http://localhost:3000/open"
echo ""

npm run dev 