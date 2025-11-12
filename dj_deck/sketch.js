// DJ Mixing Deck - Simple DJ Interface
// 2 play buttons, 2 sounds, mixing capability, volume slider
// Using p5.js 1.11.1

let sound1, sound2;
let sound1Playing = false;
let sound2Playing = false;
let soundsLoaded = false;

// Play buttons
let playButton1 = {
    x: 150,
    y: 200,
    width: 120,
    height: 60,
    label: "Track 1"
};

let playButton2 = {
    x: 450,
    y: 200,
    width: 120,
    height: 60,
    label: "Track 2"
};

// Volume sliders
let volumeSlider1, volumeSlider2;
let volumeValue1 = 0.5; // Default volume for track 1 (0.0 to 1.0)
let volumeValue2 = 0.5; // Default volume for track 2 (0.0 to 1.0)

function preload() {
    // Load sounds in preload() - works with p5.js 1.x
    // IMPORTANT: In p5js.org web editor, enable p5.sound in Settings → Libraries
    try {
        if (typeof loadSound === 'undefined') {
            console.error('p5.sound library is not loaded! Please enable it in Settings → Libraries');
            return;
        }
        sound1 = loadSound('assets/sound1.wav');
        sound2 = loadSound('assets/sound2.wav');
    } catch (error) {
        console.error('Error loading sounds. Make sure p5.sound is enabled:', error);
    }
}

function setup() {
    createCanvas(800, 600);
    
    // Create volume sliders for each track
    volumeSlider1 = createSlider(0, 100, 50); // min, max, default
    volumeSlider1.position(100, 350);
    
    volumeSlider2 = createSlider(0, 100, 50);
    volumeSlider2.position(550, 350);
    
    // Set initial volume and check if sounds are loaded
    if (sound1 && sound2) {
        sound1.setVolume(volumeValue1);
        sound2.setVolume(volumeValue2);
        soundsLoaded = true;
    }
}

function draw() {
    background(255);
    
    // Title
    fill(0);
    textAlign(CENTER);
    text("DJ Mixing Deck", width/2, 50);
    
    // Draw plain buttons
    drawPlayButton(playButton1);
    drawPlayButton(playButton2);
    
    // Volume labels above sliders
    fill(0);
    textAlign(CENTER);
    text("Volume", 175, 330);
    text("Volume", 625, 330);
    
    // Update volume from sliders
    volumeValue1 = volumeSlider1.value() / 100;
    volumeValue2 = volumeSlider2.value() / 100;
    
    // Set volume for sounds
    if (sound1 && sound1.isPlaying()) {
        sound1.setVolume(volumeValue1);
    }
    if (sound2 && sound2.isPlaying()) {
        sound2.setVolume(volumeValue2);
    }
}

function drawPlayButton(button) {
    // Plain button
    fill(200);
    noStroke();
    rect(button.x, button.y, button.width, button.height);
    
    // Button text
    fill(0);
    textAlign(CENTER, CENTER);
    text(button.label, button.x + button.width/2, button.y + button.height/2);
}

function mousePressed() {
    // Check if clicking on button 1
    if (mouseX >= playButton1.x && mouseX <= playButton1.x + playButton1.width &&
        mouseY >= playButton1.y && mouseY <= playButton1.y + playButton1.height) {
        toggleSound1();
    }
    
    // Check if clicking on button 2
    if (mouseX >= playButton2.x && mouseX <= playButton2.x + playButton2.width &&
        mouseY >= playButton2.y && mouseY <= playButton2.y + playButton2.height) {
        toggleSound2();
    }
}

function toggleSound1() {
    if (!sound1 || !soundsLoaded) return;
    
    if (sound1.isPlaying()) {
        sound1.pause();
        sound1Playing = false;
    } else {
        sound1.setVolume(volumeValue1);
        sound1.setLoop(true);
        sound1.play();
        sound1Playing = true;
    }
}

function toggleSound2() {
    if (!sound2 || !soundsLoaded) return;
    
    if (sound2.isPlaying()) {
        sound2.pause();
        sound2Playing = false;
    } else {
        sound2.setVolume(volumeValue2);
        sound2.setLoop(true);
        sound2.play();
        sound2Playing = true;
    }
}

