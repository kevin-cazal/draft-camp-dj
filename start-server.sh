#!/bin/bash
# Simple HTTP server for p5.js project
# Run this script to start a local server

echo "Starting local server at http://localhost:8000"
echo "Open http://localhost:8000 in your browser"
echo "Press Ctrl+C to stop the server"
echo ""

# Try Python 3 first, then Python 2
if command -v python3 &> /dev/null; then
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    python -m SimpleHTTPServer 8000
else
    echo "Python not found. Please install Python or use a different server."
    echo "Alternatively, you can use: npx http-server"
    exit 1
fi

