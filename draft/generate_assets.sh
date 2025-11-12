#!/bin/bash
# Generate all assets for the p5.js jukebox

echo "Generating assets..."

# Check if Python is available
if command -v python3 &> /dev/null; then
    echo "Generating backgrounds..."
    python3 generate_backgrounds.py
    
    echo "Generating sounds..."
    python3 generate_sounds.py
    
    # Convert WAV to MP3 if ffmpeg is available
    if command -v ffmpeg &> /dev/null; then
        echo "Converting sounds to MP3..."
        for i in 1 2 3; do
            if [ -f "assets/sound$i.wav" ]; then
                ffmpeg -i "assets/sound$i.wav" -y "assets/sound$i.mp3" 2>/dev/null
                echo "Converted sound$i.wav to sound$i.mp3"
            fi
        done
    else
        echo "ffmpeg not found. Sound files are WAV format."
        echo "Install ffmpeg to convert to MP3: sudo apt install ffmpeg"
    fi
    
    echo "Done!"
else
    echo "Error: Python 3 is required to generate assets"
    echo "Install dependencies: pip install Pillow numpy scipy"
    exit 1
fi

