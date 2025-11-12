let button1 = {
    name: "Sound 1",
    x: 100,
    y: 100,
    width: 150,
    height: 40,
    callback: handleButton1Click
};

let button2 = {
    name: "Sound 2",
    x: 200,
    y: 100,
    width: 150,
    height: 40,
    callback: handleButton2Click
};

let button3 = {
    name: "Background 1",
    x: 300,
    y: 100,
    width: 150,
    height: 40,
    callback: handleButton3Click
};

let button4 = {
    name: "Background 2",
    x: 400,
    y: 100,
    width: 150,
    height: 40,
    callback: handleButton4Click
};

let button5 = {
    name: "Background 3",
    x: 500,
    y: 100,
    width: 150,
    height: 40,
    callback: handleButton5Click
};

let currentSound = null;
let currentBackground = null;
let sound1 = null;
let sound2 = null;
let background1 = null;
let background2 = null;
let background3 = null;
let currentText = null;

function stopCurrentSound() {
    if (currentSound) {
        currentSound.stop();
    }
}

function handleButton1Click() {
    stopCurrentSound();
    currentSound = sound1;
    currentSound.play();
}

function handleButton2Click() {
    stopCurrentSound();
    currentSound = sound2;
    currentSound.play();
}

function handleButton3Click() {
    currentBackground = background1;
}

function handleButton4Click() {
    currentBackground = background2;
}

function handleButton5Click() {
    currentBackground = background3;
}

function drawButton(button) {
    fill(100, 150, 255);
    rect(button.x, button.y, button.width, button.height, 5);
    fill(255);
    textAlign(CENTER, CENTER);
    text(button.name, button.x + button.width/2, button.y + button.height/2);
}

function drawBackground(background) {
    image(background, 0, 0, width, height);
}

function drawText(text) {
    fill(255);
    textAlign(CENTER, CENTER);
    text(text, width/2, height/2);
}

function setup() {
    createCanvas(800, 600);
    sound1 = loadSound('assets/sound1.wav');
    sound2 = loadSound('assets/sound2.wav');
    currentSound = sound1;
    background1 = loadImage('assets/background1.png');
    background2 = loadImage('assets/background2.png');
    background3 = loadImage('assets/background3.png');
    currentBackground = background1;
    currentText = "Merry Christmas!";
}

function draw() {
    drawBackground(currentBackground);
    drawButton(button1);
    drawButton(button2);
    drawButton(button3);
    drawButton(button4);
    drawButton(button5);
    drawText(currentText);
}

function isMouseOverButton(button) {
    return mouseX >= button.x && mouseX <= button.x + button.width && mouseY >= button.y && mouseY <= button.y + button.height;
}

function mousePressed() {
    if (isMouseOverButton(button1)) {
        button1.callback();
    }
    if (isMouseOverButton(button2)) {
        button2.callback();
    }
}