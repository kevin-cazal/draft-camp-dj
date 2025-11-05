// Step 1: refactor all buttons into an array of objects
// Step 2: refactor named callback functions into anonymous functions
let buttons = [
    // Left column: Sounds
    {
        name: "Sound 1",
        x: 20,
        y: 20,
        width: 100,
        height: 35,
        callback: function() {
            stopCurrentSound();
            currentSound = sounds[0];
            currentSound.play();
        }
    },
    {
        name: "Sound 2",
        x: 20,
        y: 65,
        width: 100,
        height: 35,
        callback: function() {
            stopCurrentSound();
            currentSound = sounds[1];
            currentSound.play();
        }
    },
    {
        name: "My Sound",
        x: 20,
        y: 110,
        width: 100,
        height: 35,
        callback: function() {
            stopCurrentSound();
            currentSound = sounds[2];
            currentSound.play();
        }
    },
    // Left column: Backgrounds
    {
        name: "Background 1",
        x: 20,
        y: 170,
        width: 100,
        height: 35,
        callback: function() {
            currentBackground = backgrounds[0];
        }
    },
    {
        name: "Background 2",
        x: 20,
        y: 215,
        width: 100,
        height: 35,
        callback: function() {
            currentBackground = backgrounds[1];
        }
    },
    {
        name: "Background 3",
        x: 20,
        y: 260,
        width: 100,
        height: 35,
        callback: function() {
            currentBackground = backgrounds[2];
        }
    },
    {
        name: "My Background",
        x: 20,
        y: 305,
        width: 100,
        height: 35,
        callback: function() {
            currentBackground = backgrounds[3];
        }
    },
    { // Step 1 (D1): Add a button to disable the background
        name: "Disable BG",
        x: 20,
        y: 350,
        width: 100,
        height: 35,
        callback: function() {
            currentBackground = null;
        }
    },
    // Right column: Animations
    {
        name: "Snow",
        x: 680,
        y: 20,
        width: 100,
        height: 35,
        callback: function() {
            currentAnimation = animations[0];
        }
    },
    { // Step 3 (D1): Add a button to enable the fire animation
        name: "Fire",
        x: 680,
        y: 65,
        width: 100,
        height: 35,
        callback: function() {
            currentAnimation = animations[1];
        }
    },
    { // Step 4 (D1): Add a button to enable the stars animation
        name: "Stars",
        x: 680,
        y: 110,
        width: 100,
        height: 35,
        callback: function() {
            currentAnimation = animations[2];
        }
    },
    {  // Step 1 (D2): Add a button to disable animation
        name: "Disable Anim",
        x: 680,
        y: 155,
        width: 100,
        height: 35,
        callback: function() {
            currentAnimation = null;
        }
    },
    // Bottom right: Hide button
    {
        name: "Hide Buttons",
        x: 680,
        y: 545,
        width: 100,
        height: 35,
        callback: function() {
            buttonsVisible = false;
        }
    }
];

// Step 1 (A1): Define an array of animation functions (for the moment only one animation)
let animations = [
    { setupFunction: setupSnow, drawFunction: drawSnow },
    // Step 2 (B): Update the animations array to include the alternative animation
    /*
    - { setupFunction: setupSnow, drawFunction: drawSnow },
    + { setupFunction: setupSnowAlt, drawFunction: drawSnowAlt }
    */

    // Step 3 (A1): Update the animations array to include the fire animation
   { setupFunction: setupFire, drawFunction: drawFire },

   // Step 4 (A1): Update the animations array to include the stars animation
   { setupFunction: setupStars, drawFunction: drawStars },
];


let currentSound = null;
let currentBackground = null;
let currentAnimation = null;
// Step 1 (A2): Add variables for the snow animation
let snowflakes = [];
// Step 3 (A2): Add variables for the fire animation
let flames = [];
// Step 4 (A2): Add variables for the stars animation
let stars = [];
// Step 5 (A1): Add variables for the shooting star feature
let shootingStar = null;
let nextShootingStarTime = 0;
let sounds = [];
let backgrounds = [];
let currentText = null;
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

function drawAnimation(animation) {
    animation.drawFunction();
}

function drawText(string) {
    fill(255, 128, 128);
    textAlign(CENTER, CENTER);
    textSize(32);
    text(string, width/2, height/2);
}

// Step 1 (B): Define a setup function for the snow animation (called by the setup function)
function setupSnow() {
    snowflakes = [];
    for (let i = 0; i < 50; i++) {
        snowflakes.push({
            x: random(width),
            y: random(-height, 0),
            size: random(2, 5),
            speed: random(1, 3)
        });
    }
}

// Step 1 (C): Define a draw function for the snow animation (called by the draw function)
function drawSnow() {
    fill(255);
    noStroke();
    for (let flake of snowflakes) {
        ellipse(flake.x, flake.y, flake.size);
        flake.y += flake.speed;
        if (flake.y > height) {
            flake.y = random(-50, 0);
            flake.x = random(width);
        }
    }
}

// Step 2 (A): Make an alternative animation functions (setupSnowAlt and drawSnowAlt) to add swaying effect to the snowflakes.
function setupSnowAlt() {
    snowflakes = [];
    for (let i = 0; i < 50; i++) {
        snowflakes.push({
            x: random(width),
            y: random(-height, 0),
            size: random(2, 5),
            speed: random(1, 3),
            sway: random(-1, 1)
        });
    }
}
function drawSnowAlt() {
    fill(255);
    noStroke();
    for (let flake of snowflakes) {
        ellipse(flake.x, flake.y, flake.size);
        flake.y += flake.speed;
        flake.x += flake.sway * 0.5;
        if (flake.y > height) {
            flake.y = random(-50, 0);
            flake.x = random(width);
        }
        if (flake.x < 0 || flake.x > width) {
            flake.sway *= -1;
        }
    }
}

// Step 3 (B): Define a setup function for the fire animation (called by the setup function)
function setupFire() {
    flames = [];
    for (let i = 0; i < 30; i++) {
        flames.push({
            x: random(width),
            y: random(height),
            size: random(10, 25),
            speed: random(0.5, 2),
            flicker: random(0.5, 2),
            life: random(0, 1)
        });
    }
}

// Step 3 (C): Define a draw function for the fire animation (called by the draw function)
function drawFire() {
    for (let i = 0; i < flames.length; i++) {
        let flame = flames[i];
        
        // Move the flame up
        flame.y = flame.y - flame.speed;
        
        // Move the flame side to side (flickering effect)
        flame.x = flame.x + random(-2, 2) * flame.flicker;
        
        // Make the flame get smaller over time
        flame.life = flame.life - 0.001;
        flame.size = flame.size * 0.98;
        
        // If the flame has died or gotten too small, reset it
        if (flame.life <= 0 || flame.size < 1) {
            flame.y = height - 50;
            flame.x = width/2 + random(-100, 100);
            flame.size = random(10, 25);
            flame.life = random(0.8, 1);
            flame.speed = random(0.5, 2);
        }
        
        // Calculate the color based on how "alive" the flame is
        // map() converts a number from one range to another
        // For example: map(0.5, 0, 1, 0, 255) = 127.5
        let alpha = map(flame.life, 0, 1, 0, 255);
        let fireColor = map(flame.life, 0, 1, 0, 1);
        
        // Draw the outer flame (brighter)
        fill(255 * fireColor, 150 * fireColor, 0, alpha);
        noStroke();
        ellipse(flame.x, flame.y, flame.size);
        
        // Draw the inner flame (darker)
        fill(255 * fireColor * 0.8, 100 * fireColor, 0, alpha * 0.7);
        ellipse(flame.x, flame.y, flame.size * 0.7);
    }
}

// Step 4 (B): Define a setup function for the stars animation (called by the setup function)
function setupStars() {
       // Start with an empty array
       stars = [];
    
       // Create 100 stars
       for (let i = 0; i < 100; i++) {
           // Each star is an object with:
           // - x: horizontal position
           // - y: vertical position
           // - size: how big it is
           // - brightness: how bright it is (base brightness)
           // - twinkle: a number that changes over time to make it twinkle
           stars.push({
               x: random(width),                  // Random horizontal position
               y: random(height),                 // Random vertical position
               size: random(1, 3),                 // Random size
               brightness: random(150, 255),       // Random base brightness
               twinkle: random(0, TWO_PI)          // Random starting twinkle value
           });
       }
       // Step 5 (B): Initialize the shooting star timing
       shootingStar = null;
       nextShootingStarTime = millis() + random(500, 2500);
}

// Step 5 (D1): Create a new shooting star object
function createShootingStar() {
    return {
        x: random(width),                    // Random starting x position
        y: random(0, height * 0.3),         // Start in top third of screen
        trail: [],                           // Array to store the trail points
        speed: random(5, 10),                // Random speed
        angle: random(PI/6, PI/3),           // Random angle (downward)
        life: 255                            // Starting life (for fade effect)
    };
}

// Step 5 (D2): Check if it's time to create a new shooting star
function handleShootingStarCreation() {
    // Check if it's time to create a new shooting star
    // millis() returns how many milliseconds have passed since the program started
    if (millis() >= nextShootingStarTime) {
        // If there's no shooting star currently, create one
        if (!shootingStar) {
            shootingStar = createShootingStar();
        }
        // Schedule the next shooting star (3-6 seconds from now)
        nextShootingStarTime = millis() + random(3000, 6000);
    }
}

// Step 5 (D3): Update the shooting star position and life
function updateShootingStar() {
    // Add current position to the trail
    shootingStar.trail.push({
        x: shootingStar.x,
        y: shootingStar.y,
        alpha: shootingStar.life
    });
    
    // Move the shooting star based on its angle and speed
    // cos() and sin() convert an angle to x and y movement
    shootingStar.x = shootingStar.x + cos(shootingStar.angle) * shootingStar.speed;
    shootingStar.y = shootingStar.y + sin(shootingStar.angle) * shootingStar.speed;
    
    // Make it fade out over time
    shootingStar.life = shootingStar.life - 8;
}

// Step 5 (D4): Draw the trail behind the shooting star
function drawShootingStarTrail() {
    // Draw the trail (the line behind the shooting star)
    // We loop backwards through the trail array
    for (let i = shootingStar.trail.length - 1; i >= 0; i--) {
        let point = shootingStar.trail[i];
        
        // Set the line color with transparency
        stroke(255, 255, 255, point.alpha);
        strokeWeight(2);
        
        // Draw a line from this point to the previous point
        if (i > 0) {
            let prevPoint = shootingStar.trail[i - 1];
            line(point.x, point.y, prevPoint.x, prevPoint.y);
        }
        
        // Fade out the trail point
        point.alpha = point.alpha - 10;
        
        // Remove trail points that have completely faded
        if (point.alpha <= 0) {
            shootingStar.trail.splice(i, 1);
        }
    }
}

// Step 5 (D5): Check if the shooting star should be removed
function shouldRemoveShootingStar() {
    // If the shooting star has gone off screen or faded completely, remove it
    return shootingStar.x > width || shootingStar.y > height || shootingStar.life <= 0;
}

// Step 5 (D6): Update and draw the shooting star
function updateAndDrawShootingStar() {
    if (shootingStar) {
        updateShootingStar();
        drawShootingStarTrail();
        
        if (shouldRemoveShootingStar()) {
            shootingStar = null;
        }
    }
}

// Step 4 (C): Define a draw function for the stars animation (called by the draw function)
function drawStars() {
    // Loop through each star and update/draw it
    for (let i = 0; i < stars.length; i++) {
        let star = stars[i];
        
        // Increase the twinkle value to make it change over time
        star.twinkle = star.twinkle + 0.08;
        
        // Calculate the current brightness using sin() function
        // sin() creates a wave pattern that goes up and down
        // This makes the star get brighter and dimmer
        let twinkle = sin(star.twinkle) * 70 + star.brightness;
        
        // Make sure brightness stays between 100 and 255
        let brightness = constrain(twinkle, 100, 255);
        
        // Set the color to the calculated brightness
        fill(brightness);
        noStroke();
        
        // Draw the star as a circle
        ellipse(star.x, star.y, star.size);
    }
    
    // Step 5 (C): Add shooting star logic
    handleShootingStarCreation();
    updateAndDrawShootingStar();
}

function setup() {
    createCanvas(800, 600);
    currentText = "Merry Christmas!";
    sounds = [
        loadSound('assets/sound1.wav'),
        loadSound('assets/sound2.wav'),
        loadSound('assets/my_sound.mp3')
    ];
    backgrounds = [
        loadImage('assets/background1.png'),
        loadImage('assets/background2.png'),
        loadImage('assets/background3.png'),
        loadImage('assets/my_background.png')
    ];
    for (let animation of animations) {
        animation.setupFunction(); // Call the setup function for each animation
    }
    currentSound = sounds[0];
    currentBackground = backgrounds[0];
    currentAnimation = animations[0];
}

function draw() {
    // Step 1 (E1): Draw the current background if it exists, otherwise draw a solid color background
    if (currentBackground) {
        drawBackground(currentBackground);
    } else {
        background(20);
    }
    // Step 1 (E2): Draw the current animation if it exists, otherwise draw a transparent background
    if (currentAnimation) {
        drawAnimation(currentAnimation);
    } else {
        // Transparent background
        background(0, 0);
    }
    drawText(currentText);
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