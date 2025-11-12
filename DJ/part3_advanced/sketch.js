// DJ Mixing Deck - Advanced DJ Interface with Customization

// Background image
let bgImage = null;

// Track if touch was used to prevent double-triggering with mouse events
let touchUsed = false;
let touchTimeout = null;

// Crossfader (0 = only track 1, 100 = only track 2, 50 = both)
let crossfader = null;
let crossfaderValue = 50;

// Amplitude analyzers for BPM visualization
let amp1 = null;
let amp2 = null;

// Background file input
let bgFileInput = null;

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
    timeSlider: null,
    timeSliderPosition: {
        x: 0,
        y: 0
    },
    button: null,
    buttonPosition: {
        x: 0,
        y: 0
    },
    buttonLabel: "Track 1",
    fileInput: null,
    isDraggingTime: false,
    pulseSize: 80
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
    timeSlider: null,
    timeSliderPosition: {
        x: 0,
        y: 0
    },
    button: null,
    buttonPosition: {
        x: 0,
        y: 0
    },
    buttonLabel: "Track 2",
    fileInput: null,
    isDraggingTime: false,
    pulseSize: 80
};

function preload() {
    // Load the sound files
    track1.sound = loadSound('assets/sound1.mp3');
    track2.sound = loadSound('assets/sound2.mp3');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    
    amp1 = new p5.Amplitude();
    amp2 = new p5.Amplitude();
    
    updatePositions();
    
    setupFileInputs();
    setupTrackButton(track1);
    setupTrackButton(track2);
    setupTrackSliders(track1);
    setupTrackSliders(track2);
    setupCrossfader();
    
    track1.sound.setVolume(track1.volume);
    track2.sound.setVolume(track2.volume);
    
    amp1.setInput(track1.sound);
    amp2.setInput(track2.sound);
}

function setupFileInputs() {
    track1.fileInput = createFileInput(function(file) {
        handleSoundUpload(file, track1);
    });
    track1.fileInput.position(width * 0.15 - 60, height * 0.15);
    track1.fileInput.attribute('accept', 'audio/*');
    
    bgFileInput = createFileInput(handleBackgroundImage);
    bgFileInput.position(width/2 - 60, height * 0.15);
    bgFileInput.attribute('accept', 'image/*');
    
    track2.fileInput = createFileInput(function(file) {
        handleSoundUpload(file, track2);
    });
    track2.fileInput.position(width * 0.85 - 60, height * 0.15);
    track2.fileInput.attribute('accept', 'audio/*');
}

function setupTrackButton(track) {
    track.button = createButton("play/pause");
    track.button.position(track.buttonPosition.x, track.buttonPosition.y);
    track.button.mousePressed(function() {
        toggleTrack(track);
    });
    track.button.touchStarted(function(e) {
        toggleTrack(track);
    });
}

function setupTrackSliders(track) {
    track.slider = createSlider(0, 100, 50);
    track.slider.position(track.sliderPosition.x, track.sliderPosition.y);
    
    track.timeSlider = createSlider(0, 100, 0);
    track.timeSlider.position(track.timeSliderPosition.x, track.timeSliderPosition.y);
    track.timeSlider.style('width', '150px');
    track.timeSlider.input(function() {
        let soundDuration = track.sound.duration();
        let targetTime = (track.timeSlider.value() / 100) * soundDuration;
        track.sound.jump(targetTime);
    });
}

function setupCrossfader() {
    crossfader = createSlider(0, 100, 50);
    crossfader.position(width/2 - 100, height * 0.75);
    crossfader.style('width', '200px');
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    updatePositions();
    
    updateTrackPositions(track1);
    updateTrackPositions(track2);
    
    crossfader.position(width/2 - 100, height * 0.75);
    
    track1.fileInput.position(width * 0.15 - 60, height * 0.15);
    bgFileInput.position(width/2 - 60, height * 0.15);
    track2.fileInput.position(width * 0.85 - 60, height * 0.15);
}

function updateTrackPositions(track) {
    track.button.position(track.buttonPosition.x, track.buttonPosition.y);
    track.slider.position(track.sliderPosition.x, track.sliderPosition.y);
    track.timeSlider.position(track.timeSliderPosition.x, track.timeSliderPosition.y);
}

function updatePositions() {
    // Calculate responsive positions based on screen size
    // Layout: 3 columns - Track 1 | Center (beat visuals) | Track 2
    let leftX = width * 0.15;      // Left column (Track 1)
    let centerX = width / 2;       // Center (beat visuals)
    let rightX = width * 0.85;     // Right column (Track 2)
    
    let topY = height * 0.15;      // Top row (file inputs)
    let buttonY = height * 0.3;   // Play/pause buttons
    let volumeSliderY = height * 0.45;  // Volume sliders
    let timeSliderY = height * 0.55;    // Duration sliders
    let crossfaderY = height * 0.75;    // Crossfader position
    
    // Track 1 on left side
    track1.buttonPosition.x = leftX;
    track1.buttonPosition.y = buttonY;
    track1.sliderPosition.x = leftX;
    track1.sliderPosition.y = volumeSliderY;
    track1.timeSliderPosition.x = leftX;
    track1.timeSliderPosition.y = timeSliderY;
    
    // Track 2 on right side
    track2.buttonPosition.x = rightX;
    track2.buttonPosition.y = buttonY;
    track2.sliderPosition.x = rightX;
    track2.sliderPosition.y = volumeSliderY;
    track2.timeSliderPosition.x = rightX;
    track2.timeSliderPosition.y = timeSliderY;
    
    // Update crossfader position (centered at bottom)
    // Note: This check is necessary because updatePositions() is called before crossfader is created
    if (crossfader) {
        crossfader.position(centerX - 100, crossfaderY);
    }
    
    // Update file input positions (top row: track1 | background | track2)
    // Note: These checks are necessary because updatePositions() is called before file inputs are created
    if (track1.fileInput) {
        track1.fileInput.position(leftX - 60, topY);
    }
    if (track2.fileInput) {
        track2.fileInput.position(rightX - 60, topY);
    }
}

function formatTime(seconds) {
    // Convert seconds to MM:SS format
    let minutes = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);
    // Use string padding with math: padStart ensures 2 digits
    let minutesStr = String(minutes).padStart(2, '0');
    let secsStr = String(secs).padStart(2, '0');
    return minutesStr + ":" + secsStr;
}

function draw() {
    drawBackground();
    drawLabels();
    drawTimeDisplay(track1);
    drawTimeDisplay(track2);
    
    updateVolumes();
    applyCrossfader();
    
    updateTimeSliders();
    drawBPMVisualization();
}

function drawBackground() {
    if (bgImage) {
        image(bgImage, 0, 0, width, height);
    } else {
        background(255);
    }
}

function drawLabels() {
    fill(0);
    textAlign(CENTER);
    textSize(12);
    
    text("choose track 1", width * 0.15, height * 0.12);
    text("change background", width/2, height * 0.12);
    text("choose track 2", width * 0.85, height * 0.12);
    
    text("track 1", track1.buttonPosition.x, track1.buttonPosition.y + 30);
    text("track 2", track2.buttonPosition.x, track2.buttonPosition.y + 30);
    
    text("volume", track1.sliderPosition.x, track1.sliderPosition.y - 15);
    text("volume", track2.sliderPosition.x, track2.sliderPosition.y - 15);
    
    text("duration", track1.timeSliderPosition.x, track1.timeSliderPosition.y - 15);
    text("duration", track2.timeSliderPosition.x, track2.timeSliderPosition.y - 15);
    
    text("crossfader", width/2, height * 0.72);
}

function drawTimeDisplay(track) {
    let elapsed = track.sound.currentTime();
    let total = track.sound.duration();
    let timeText = formatTime(elapsed) + " / " + formatTime(total);
    
    fill(0);
    textAlign(CENTER);
    textSize(12);
    text(timeText, track.timeSliderPosition.x, track.timeSliderPosition.y + 35);
}

function updateVolumes() {
    track1.volume = track1.slider.value() / 100;
    track2.volume = track2.slider.value() / 100;
}

function applyCrossfader() {
    crossfaderValue = crossfader.value();
    let angle = (crossfaderValue / 100) * (PI / 2);
    
    let track1CrossfadeVolume = track1.volume * cos(angle);
    let track2CrossfadeVolume = track2.volume * sin(angle);
    
    track1.sound.setVolume(track1CrossfadeVolume);
    track2.sound.setVolume(track2CrossfadeVolume);
}

function updateTimeSliders() {
    updateTimeSlider(track1);
    updateTimeSlider(track2);
}

function updateTimeSlider(track) {
    let currentTime = track.sound.currentTime();
    let soundDuration = track.sound.duration();
    let progress = (currentTime / soundDuration) * 100;
    track.timeSlider.value(progress);
}

function drawBPMVisualization() {
    track1.pulseSize = getPulseSize(track1, amp1);
    track2.pulseSize = getPulseSize(track2, amp2);
    
    let centerX = width / 2;
    let beatVisualY = height * 0.3;
    
    drawBeatCircle(centerX - 60, beatVisualY, track1.pulseSize, [255, 0, 0], "beat visual 1");
    drawBeatCircle(centerX + 60, beatVisualY, track2.pulseSize, [0, 0, 255], "beat visual 2");
}

function getPulseSize(track, amp) {
    let level = (track.sound && amp) ? amp.getLevel() : 0;
    return Math.max(80, 80 + (level * 400));
}

function drawBeatCircle(x, y, size, color, label) {
    noFill();
    stroke(color[0], color[1], color[2], 150);
    strokeWeight(3);
    circle(x, y, size);
    
    fill(0);
    textAlign(CENTER);
    textSize(12);
    text(label, x, y + size/2 + 15);
}

// Removed getAmplitudeFromPeaks() - now using p5.Amplitude.getLevel() instead
// This is the proper p5.js API for getting amplitude levels

function toggleTrack(track) {
    if (track.sound.isPlaying()) {
        pauseTrack(track);
    } else {
        playTrack(track);
    }
}

function pauseTrack(track) {
    track.sound.pause();
    track.isPlaying = false;
    track.button.html("play/pause");
}

function playTrack(track) {
    track.sound.setVolume(track.volume);
    track.sound.setLoop(true);
    track.sound.play();
    track.isPlaying = true;
    track.button.html("play/pause");
    
    connectAmplitudeAnalyzer(track);
}

function connectAmplitudeAnalyzer(track) {
    if (track === track1) {
        amp1.setInput(track.sound);
    } else {
        amp2.setInput(track.sound);
    }
}

function mousePressed() {
    // Check if user is clicking on time sliders
    // if (track1.timeSlider && mouseX >= track1.timeSliderPosition.x &&
    //     mouseX <= track1.timeSliderPosition.x + 150 &&
    //     mouseY >= track1.timeSliderPosition.y && 
    //     mouseY <= track1.timeSliderPosition.y + 20) {
        track1.isDraggingTime = true;
    // }
    
    // if (track2.timeSlider && mouseX >= track2.timeSliderPosition.x &&
    //     mouseX <= track2.timeSliderPosition.x + 150 &&
    //     mouseY >= track2.timeSliderPosition.y && 
    //     mouseY <= track2.timeSliderPosition.y + 20) {
        track2.isDraggingTime = true;
    // }
}

function mouseReleased() {
    // Stop dragging time sliders
    track1.isDraggingTime = false;
    track2.isDraggingTime = false;
}

function mouseDragged() {
    // Keep dragging flag active while dragging
    // if (track1.timeSlider && mouseX >= track1.timeSliderPosition.x &&
    //     mouseX <= track1.timeSliderPosition.x + 150 &&
    //     mouseY >= track1.timeSliderPosition.y && 
    //     mouseY <= track1.timeSliderPosition.y + 20) {
        track1.isDraggingTime = true;
    // }
    
    // if (track2.timeSlider && mouseX >= track2.timeSliderPosition.x &&
    //     mouseX <= track2.timeSliderPosition.x + 150 &&
    //     mouseY >= track2.timeSliderPosition.y && 
    //     mouseY <= track2.timeSliderPosition.y + 20) {
        track2.isDraggingTime = true;
    // }
}

function handleBackgroundImage(file) {
    // if (file.type === 'image') {
        bgImage = loadImage(file.data);
    // }
}

function handleSoundUpload(file, track) {
    stopTrack(track);
    
    track.sound = loadSound(file.data);
    track.sound.setVolume(track.volume);
    
    track.timeSlider.value(0);
    
    setTimeout(function() {
        connectAmplitudeAnalyzer(track);
    }, 100);
}

function stopTrack(track) {
    track.sound.stop();
    track.isPlaying = false;
    track.button.html("play/pause");
}
