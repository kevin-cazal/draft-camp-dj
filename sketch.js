let soundFiles = [
    'assets/sound1.mp3',
    'assets/sound2.mp3',
    'assets/sound3.mp3'
];

let buttons = [
    { name: 'Play Sound 1', x: 100, y: 100, width: 150, height: 40, callback: () => loadSound('assets/sound1.mp3', sound => sound.play()) },
    { name: 'Play Sound 2', x: 100, y: 160, width: 150, height: 40, callback: () => loadSound('assets/sound2.mp3', sound => sound.play()) },
    { name: 'Play Sound 3', x: 100, y: 220, width: 150, height: 40, callback: () => loadSound('assets/sound3.mp3', sound => sound.play()) }
];

function drawButton(btn) {
    fill(100, 150, 255);
    rect(btn.x, btn.y, btn.width, btn.height, 5);
    fill(255);
    textAlign(CENTER, CENTER);
    text(btn.name, btn.x + btn.width/2, btn.y + btn.height/2);
}

function isMouseOver(btn) {
    return mouseX >= btn.x && mouseX <= btn.x + btn.width &&
           mouseY >= btn.y && mouseY <= btn.y + btn.height;
}

function setup() {
    createCanvas(800, 600);
}

function draw() {
    background(220);
    drawButton(buttons[0]);
    drawButton(buttons[1]);
    drawButton(buttons[2]);
}

function mousePressed() {
    if (isMouseOver(buttons[0])) buttons[0].callback();
    if (isMouseOver(buttons[1])) buttons[1].callback();
    if (isMouseOver(buttons[2])) buttons[2].callback();
}

