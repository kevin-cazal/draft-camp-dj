# p5.js Christmas Jukebox

A p5.js application with sound capabilities.

## Running the Application

**Important:** p5.sound requires a local web server (not `file://` protocol) due to browser security restrictions.

### Option 1: Python Server (Recommended)

```bash
# Make the script executable
chmod +x start-server.sh

# Run the server
./start-server.sh

# Or manually:
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

### Option 2: Node.js Server

```bash
# Using npx (no installation needed)
npx http-server -p 8000

# Or install globally first:
npm install -g http-server
http-server -p 8000
```

### Option 3: VS Code Live Server

If you're using VS Code, install the "Live Server" extension, then right-click `index.html` and select "Open with Live Server".

## Troubleshooting

If you see errors like "Not allowed to load local resource: blob:null/...", it means you're opening the HTML file directly (file:// protocol). You **must** use a web server for p5.sound to work.

## Project Structure

- `index.html` - Main HTML file
- `sketch.js` - p5.js sketch code
- `style.css` - Styling

