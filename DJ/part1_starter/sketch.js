// DJ Mixing Deck - Simple DJ Interface

// Track 1 - all properties together
let track1 = {
    sound: null,
    volume: 0.5,
    isPlaying: false,
    slider: null,
    sliderPosition: {
        x: 150,
        y: 350
    },
    button: null,
    buttonPosition: {
        x: 150,
        y: 200
    },
    buttonLabel: "Track 1"
};

// Track 2 - all properties together
let track2 = {
    sound: null,
    volume: 0.5,
    isPlaying: false,
    slider: null,
    sliderPosition: {
        x: 450,
        y: 350
    },
    button: null,
    buttonPosition: {
        x: 450,
        y: 200
    },
    buttonLabel: "Track 2"
};

function preload() {
    // Load the sound files
    track1.sound = loadSound('assets/sound1.mp3');
    track2.sound = loadSound('assets/sound2.mp3');
}

function setup() {
    createCanvas(800, 600);
    
    // Create play button for track 1
    track1.button = createButton(track1.buttonLabel + " ▶");
    track1.button.position(track1.buttonPosition.x, track1.buttonPosition.y);
    track1.button.mousePressed(function() {
        toggleTrack(track1);
    });
    
    // Create play button for track 2
    track2.button = createButton(track2.buttonLabel + " ▶");
    track2.button.position(track2.buttonPosition.x, track2.buttonPosition.y);
    track2.button.mousePressed(function() {
        toggleTrack(track2);
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

function draw() {
    background(255);
    
    // Draw title
    fill(0);
    textAlign(CENTER);
    text("DJ Mixing Deck", width/2, 50);
    
    // Draw volume labels
    fill(0);
    textAlign(CENTER);
    text("Volume", 210, 330);
    text("Volume", 510, 330);
    
    // Update volume from sliders
    track1.volume = track1.slider.value() / 100;
    track2.volume = track2.slider.value() / 100;
    
    // Apply volume to playing sounds
    if (track1.sound.isPlaying()) {
        track1.sound.setVolume(track1.volume);
    }
    if (track2.sound.isPlaying()) {
        track2.sound.setVolume(track2.volume);
    }
  
}

function toggleTrack(track) {
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
