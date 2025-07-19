#!/bin/bash

# Chinese Radical Analysis API Start Script
# This script sets up and starts the Python FastAPI server

set -e  # Exit on any error

echo "🚀 Starting Chinese Radical Analysis API..."

# Check if we're in the correct directory
if [ ! -f "main.py" ]; then
    echo "❌ Error: main.py not found. Make sure you're in the api directory."
    exit 1
fi

# Check if Python 3 is available
if ! command -v python3 &> /dev/null; then
    echo "❌ Error: Python 3 is not installed or not in PATH"
    exit 1
fi

# Check if pip is available
if ! command -v pip3 &> /dev/null; then
    echo "❌ Error: pip3 is not installed or not in PATH"
    exit 1
fi

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "📥 Installing dependencies..."
pip install -r requirements.txt

# Check if data files exist
if [ ! -f "data/radicals.json" ]; then
    echo "❌ Error: data/radicals.json not found. Please ensure the data files are present."
    exit 1
fi

if [ ! -f "data/character_radicals.json" ]; then
    echo "❌ Error: data/character_radicals.json not found. Please ensure the data files are present."
    exit 1
fi

# Start the server
echo "✅ Starting API server on http://localhost:8000"
echo "📚 API documentation available at http://localhost:8000/docs"
echo "🛑 Press Ctrl+C to stop the server"
echo ""

uvicorn main:app --host 0.0.0.0 --port 8000 --reload