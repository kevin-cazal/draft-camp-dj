// DJ Mixing Deck - Simple DJ Interface with Customization

// Background image
let bgImage = null;

// Track if touch was used to prevent double-triggering with mouse events
let touchUsed = false;
let touchTimeout = null;

// Track 1 - all properties together
let track1 = {
    sound: null,
    volume: 0.5,
    isPlaying: false,
    slider: null,
    sliderPosition: {
        x: 0,
        y: 0
    },
    button: null,
    buttonPosition: {
        x: 0,
        y: 0
    },
    buttonLabel: "Track 1",
    fileInput: null
};

// Track 2 - all properties together
let track2 = {
    sound: null,
    volume: 0.5,
    isPlaying: false,
    slider: null,
    sliderPosition: {
        x: 0,
        y: 0
    },
    button: null,
    buttonPosition: {
        x: 0,
        y: 0
    },
    buttonLabel: "Track 2",
    fileInput: null
};

function preload() {
    // Load the sound files
    track1.sound = loadSound('assets/sound1.mp3');
    track2.sound = loadSound('assets/sound2.mp3');
}

function setup() {
    // Use full screen size for mobile responsiveness
    createCanvas(windowWidth, windowHeight);
    
    // Calculate responsive positions
    updatePositions();
    
    // Create file input for background image
    let bgFileInput = createFileInput(handleBackgroundImage);
    bgFileInput.position(10, 10);
    bgFileInput.attribute('accept', 'image/*');
    
    // Create file input for track 1 sound
    track1.fileInput = createFileInput(function(file) {
        handleSoundUpload(file, track1);
    });
    track1.fileInput.position(10, 50);
    track1.fileInput.attribute('accept', 'audio/*');
    
    // Create file input for track 2 sound
    track2.fileInput = createFileInput(function(file) {
        handleSoundUpload(file, track2);
    });
    track2.fileInput.position(10, 90);
    track2.fileInput.attribute('accept', 'audio/*');
    
    // Create play button for track 1
    track1.button = createButton(track1.buttonLabel + " ▶");
    track1.button.position(track1.buttonPosition.x, track1.buttonPosition.y);
    track1.button.mousePressed(function() {
        // Only trigger if touch wasn't used recently (prevents double-triggering on mobile)
        if (!touchUsed) {
            toggleTrack(track1);
        }
    });
    // Use touchStarted with proper event prevention
    track1.button.touchStarted(function(e) {
        // Prevent mouse event from firing
        touchUsed = true;
        toggleTrack(track1);
        // Clear flag after a delay to allow next interaction
        if (touchTimeout) clearTimeout(touchTimeout);
        touchTimeout = setTimeout(function() {
            touchUsed = false;
        }, 400);
        // Prevent default to stop mouse event
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        return false;
    });
    
    // Create play button for track 2
    track2.button = createButton(track2.buttonLabel + " ▶");
    track2.button.position(track2.buttonPosition.x, track2.buttonPosition.y);
    track2.button.mousePressed(function() {
        // Only trigger if touch wasn't used recently (prevents double-triggering on mobile)
        if (!touchUsed) {
            toggleTrack(track2);
        }
    });
    // Use touchStarted with proper event prevention
    track2.button.touchStarted(function(e) {
        // Prevent mouse event from firing
        touchUsed = true;
        toggleTrack(track2);
        // Clear flag after a delay to allow next interaction
        if (touchTimeout) clearTimeout(touchTimeout);
        touchTimeout = setTimeout(function() {
            touchUsed = false;
        }, 400);
        // Prevent default to stop mouse event
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        return false;
    });
    
    // Create volume slider for track 1
    track1.slider = createSlider(0, 100, 50);
    track1.slider.position(track1.sliderPosition.x, track1.sliderPosition.y);
    
    // Create volume slider for track 2
    track2.slider = createSlider(0, 100, 50);
    track2.slider.position(track2.sliderPosition.x, track2.sliderPosition.y);
    
    // Set initial volume
    track1.sound.setVolume(track1.volume);
    track2.sound.setVolume(track2.volume);
}

function windowResized() {
    // Resize canvas when window size changes
    resizeCanvas(windowWidth, windowHeight);
    updatePositions();
    
    // Update button and slider positions
    track1.button.position(track1.buttonPosition.x, track1.buttonPosition.y);
    track2.button.position(track2.buttonPosition.x, track2.buttonPosition.y);
    track1.slider.position(track1.sliderPosition.x, track1.sliderPosition.y);
    track2.slider.position(track2.sliderPosition.x, track2.sliderPosition.y);
}

function updatePositions() {
    // Calculate responsive positions based on screen size
    let centerX = width / 2;
    let buttonY = height * 0.3;
    let sliderY = height * 0.6;
    
    // Track 1 on left side
    track1.buttonPosition.x = centerX - width * 0.2;
    track1.buttonPosition.y = buttonY;
    track1.sliderPosition.x = centerX - width * 0.2;
    track1.sliderPosition.y = sliderY;
    
    // Track 2 on right side
    track2.buttonPosition.x = centerX + width * 0.2;
    track2.buttonPosition.y = buttonY;
    track2.sliderPosition.x = centerX + width * 0.2;
    track2.sliderPosition.y = sliderY;
}

function draw() {
    // Draw background image if loaded, otherwise white background
    if (bgImage) {
        image(bgImage, 0, 0, width, height);
    } else {
        background(255);
    }
    
    // Draw title
    fill(0);
    textAlign(CENTER);
    textSize(min(width, height) * 0.04);
    text("DJ Mixing Deck", width/2, height * 0.1);
    
    // Draw upload labels
    fill(0);
    textAlign(LEFT);
    textSize(min(width, height) * 0.025);
    text("Upload Background:", 10, 35);
    text("Upload Track 1:", 10, 75);
    text("Upload Track 2:", 10, 115);
    
    // Draw volume labels
    fill(0);
    textAlign(CENTER);
    textSize(min(width, height) * 0.025);
    text("Volume", track1.sliderPosition.x, track1.sliderPosition.y - 20);
    text("Volume", track2.sliderPosition.x, track2.sliderPosition.y - 20);
    
    // Update volume from sliders
    track1.volume = track1.slider.value() / 100;
    track2.volume = track2.slider.value() / 100;
    
    // Apply volume to playing sounds
    if (track1.sound && track1.sound.isPlaying()) {
        track1.sound.setVolume(track1.volume);
    }
    if (track2.sound && track2.sound.isPlaying()) {
        track2.sound.setVolume(track2.volume);
    }
}

function toggleTrack(track) {
    // Check if sound is loaded
    if (!track.sound) {
        return;
    }
    
    // If playing, pause it
    if (track.sound.isPlaying()) {
        track.sound.pause();
        track.isPlaying = false;
        track.button.html(track.buttonLabel + " ▶");
    } 
    // If not playing, play it
    else {
        track.sound.setVolume(track.volume);
        track.sound.setLoop(true);
        track.sound.play();
        track.isPlaying = true;
        track.button.html(track.buttonLabel + " ⏸");
    }
}

function handleBackgroundImage(file) {
    if (file.type === 'image') {
        bgImage = loadImage(file.data);
    }
}

function handleSoundUpload(file, track) {
    if (file.type === 'audio') {
        // Stop current sound if playing
        if (track.sound && track.sound.isPlaying()) {
            track.sound.stop();
            track.isPlaying = false;
            track.button.html(track.buttonLabel + " ▶");
        }
        
        // Load new sound
        track.sound = loadSound(file.data);
        track.sound.setVolume(track.volume);
    }
}
