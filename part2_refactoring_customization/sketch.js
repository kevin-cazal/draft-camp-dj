// Step 1: refactor all buttons into an array of objects
// Step 2: refactor named callback functions into anonymous functions
let buttons = [
    {
        name: "Sound 1",
        x: 50,
        y: 50,
        width: 80,
        height: 40,
        callback: function() {
            stopCurrentSound();
            currentSound = sounds[0];
            currentSound.play();
        }
    },
    {
        name: "Sound 2",
        x: 50,
        y: 100,
        width: 80,
        height: 40,
        callback: function() {
            stopCurrentSound();
            currentSound = sounds[1];
            currentSound.play();
        }
    },
    {
        name: "Background 1",
        x: 50,
        y: 150,
        width: 80,
        height: 40,
        callback: function() {
            currentBackground = backgrounds[0];
        }
    },
    {
        name: "Background 2",
        x: 50,
        y: 200,
        width: 80,
        height: 40,
        callback: function() {
            currentBackground = backgrounds[1];
        }
    },
    {
        name: "Background 3",
        x: 50,
        y: 250,
        width: 80,
        height: 40,
        callback: function() {
            currentBackground = backgrounds[2];
        }
    },
    {
        name: "My Sound",
        x: 50,
        y: 300,
        width: 80,
        height: 40,
        callback: function() {
            currentSound = sounds[2];
            currentSound.play();
        }
    },
    {
        name: "My Background",
        x: 50,
        y: 350,
        width: 80,
        height: 40,
        callback: function() {
            currentBackground = backgrounds[3];
        }
    },
    { // Step 5 (B): Add a button to hide all buttons
        name: "Hide Buttons",
        x: 50,
        y: 400,
        width: 80,
        height: 40,
        callback: function() {
            buttonsVisible = false;
        }
    }
];

let currentSound = null;
let currentBackground = null;
// Step 3: refactor sounds and backgrounds into arrays
let sounds = [];
let backgrounds = [];
let currentText = null;
// Step 5 (A): Add a global variable to track button visibility
let buttonsVisible = true;

function stopCurrentSound() {
    if (currentSound) {
        currentSound.stop();
    }
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
    currentText = "Merry Christmas!";
    // Step 4 (A): Add at least one sound and one background of your own to the arrays.
    // Step 4 (B): Add the corresponding button to the buttons array.
    /* END of part 2:
    - The code is cleaner.
    - The code is more extensible.
    Up next:
    - Easy route: Add even more sounds and backgrounds or change the existing ones to create your own custom jukebox.
    - Hard route: Part 3: Add particle effects to the jukebox for even more stunning effects.
    */
    sounds = [
        loadSound('assets/sound1.wav'),
        loadSound('assets/sound2.wav'),
        loadSound('assets/my_sound.wav')
    ];
    backgrounds = [
        loadImage('assets/background1.png'),
        loadImage('assets/background2.png'),
        loadImage('assets/background3.png'),
        loadImage('assets/my_background.png')
    ];
    currentSound = sounds[0];
    currentBackground = backgrounds[0];
    
}

function draw() {
    drawBackground(currentBackground);
    drawText(currentText);
    // Step 5 (C): Only draw buttons if they are visible
    if (buttonsVisible) {
        for (let button of buttons) {
            drawButton(button);
        }
    }
}

function isMouseOverButton(button) {
    return mouseX >= button.x && mouseX <= button.x + button.width && mouseY >= button.y && mouseY <= button.y + button.height;
}

function mousePressed() {
    // Step 5 (D): Handle button clicks only when visible, or show buttons when hidden
    if (buttonsVisible) {
        for (let button of buttons) {
            if (isMouseOverButton(button)) {
                button.callback();
            }
        }
    } else {
        buttonsVisible = true;
    }
}

