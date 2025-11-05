let button1 = { // Step 3 (C1): Add a button to play the first sound
    name: "Sound 1",
    x: 50,
    y: 50,
    width: 80,
    height: 40,
    callback: handleButton1Click
};

let button2 = { // Step 3 (C1): Add a button to play the second sound
    name: "Sound 2",
    x: 50,
    y: 100,
    width: 80,
    height: 40,
    callback: handleButton2Click
};

let button3 = { // Step 2 (C1): Add a button to set the first background
    name: "Background 1",
    x: 50,
    y: 150,
    width: 80,
    height: 40,
    callback: handleButton3Click
};

let button4 = { // Step 2 (C1): Add a button to set the second background
    name: "Background 2",
    x: 50,
    y: 200,
    width: 80,
    height: 40,
    callback: handleButton4Click
};

let button5 = { // Step 2 (C1): Add a button to set the third background
    name: "Background 3",
    x: 50,
    y: 250,
    width: 80,
    height: 40,
    callback: handleButton5Click
};

// Step 1 (A): Add variables to store the current text, sound, and background
let currentText = null;

// Step 2 (A): 
let currentBackground = null;
let background1 = null;
let background2 = null;
let background3 = null;

// Step 3 (A)
let currentSound = null;
let sound1 = null;
let sound2 = null;


function stopCurrentSound() {
    if (currentSound) {
        currentSound.stop();
    }
}

function handleButton1Click() { // Step 3 (C2): Add a function to play the first sound
    stopCurrentSound();
    currentSound = sound1;
    currentSound.play();
}

function handleButton2Click() { // Step 3 (C2): Add a function to play the second sound
    stopCurrentSound();
    currentSound = sound2;
    currentSound.play();
}

function handleButton3Click() { // Step 2 (C2): Add a function to set the first background
    currentBackground = background1;
}

function handleButton4Click() { // Step 2 (C2): Add a function to set the second background
    currentBackground = background2;
}

function handleButton5Click() { // Step 2 (C2): Add a function to set the third background
    currentBackground = background3;
}

function drawButton(button) {
    fill(100, 150, 255);
    rect(button.x, button.y, button.width, button.height, 5);
    fill(255);
    textSize(12);
    textAlign(CENTER, CENTER);
    text(button.name, button.x + button.width/2, button.y + button.height/2);
}

function drawBackground(background) {
    image(background, 0, 0, width, height);
}

function drawText(string) {
    fill(255, 128, 128);
    textAlign(CENTER, CENTER);
    textSize(32);
    text(string, width/2, height/2);
}

function setup() {
    createCanvas(800, 600);
    // Step 1 (B): Add a text variable to display the current text
    currentText = "Merry Christmas!";

    // Step 2 (B): Load the backgrounds
    background1 = loadImage('assets/background1.png');
    background2 = loadImage('assets/background2.png');
    background3 = loadImage('assets/background3.png');
    currentBackground = background1;

    // Step 3 (B): Load the sounds and set the current sound
    sound1 = loadSound('assets/sound1.wav');
    sound2 = loadSound('assets/sound2.wav');
    currentSound = sound1;

}

function draw() {
    drawText(currentText); // Step 1
    drawBackground(currentBackground); // Step 2
    drawButton(button1); // Step 3
    drawButton(button2); // Step 3
    drawButton(button3); // Step 3
    drawButton(button4); // Step 3
    drawButton(button5); // Step 3
    
}

function isMouseOverButton(button) { // Step 3 (C3): Add a function to check if the mouse is over a button
    return mouseX >= button.x && mouseX <= button.x + button.width && mouseY >= button.y && mouseY <= button.y + button.height;
}

function mousePressed() {
    // Step 3 (C3): Add a function to handle button clicks
    if (isMouseOverButton(button1)) {
        button1.callback();
    }
    if (isMouseOverButton(button2)) {
        button2.callback();
    }
    if (isMouseOverButton(button3)) {
        button3.callback();
    }
    if (isMouseOverButton(button4)) {
        button4.callback();
    }
    if (isMouseOverButton(button5)) {
        button5.callback();
    }
}