// ============================================================================
// SIMPLIFIED P5.JS CHRISTMAS JUKEBOX - FOR BEGINNERS
// ============================================================================
// This code creates a simple interactive jukebox with animations and sounds.
// Everything is explained step by step for someone learning programming.
// ============================================================================

// ----------------------------------------------------------------------------
// STEP 1: DECLARE VARIABLES (Global Storage)
// ----------------------------------------------------------------------------
// Variables are like boxes that store information. We declare them at the top
// so all functions can use them.

// Array to store the file paths of our 3 background images
let backgroundFiles = [
    'assets/background1.png',
    'assets/background2.png',
    'assets/background3.png'
];

// Keep track of which background image we're currently showing (0, 1, or 2)
let currentBackgroundIndex = 0;

// Object to store the loaded background images (so we don't reload them)
let backgroundImages = {};

// Arrays to store particles (snowflakes, flames, stars) - we use arrays because
// we need many particles, and it's easier to manage them this way
let snowflakes = [];
let flames = [];
let stars = [];

// Variable to store information about the shooting star (or null if none exists)
let shootingStar = null;

// Keep track of when the next shooting star should appear (in milliseconds)
let nextShootingStarTime = 0;

// Keep track of which animation we're showing (0 = Snow, 1 = Fire, 2 = Stars)
let currentAnimation = 0;

// Store the currently playing sound so we can stop it when a new one starts
let currentSound = null;

// ----------------------------------------------------------------------------
// STEP 2: DEFINE ANIMATION DATA
// ----------------------------------------------------------------------------
// We store information about each animation in an array.
// Each item in the array is an object with:
// - name: what to call it
// - draw: the function that draws this animation
// - bg: the background color number to use
let animations = [
    { name: 'Snow', draw: drawSnow, bg: 20 },
    { name: 'Fire', draw: drawFire, bg: 20 },
    { name: 'Stars', draw: drawStars, bg: 0 }
];

// ----------------------------------------------------------------------------
// STEP 3: SOUND FUNCTIONS
// ----------------------------------------------------------------------------

// This function is called when a sound file finishes loading
// It stops any currently playing sound, then plays the new one
function stopOldAndPlay(sound) {
    // Check if there's a sound currently playing
    if (currentSound) {
        // Check if that sound is actually playing right now
        if (currentSound.isPlaying) {
            // Stop the old sound
            currentSound.stop();
        }
    }
    // Play the new sound
    sound.play();
    // Remember this sound as the current one
    currentSound = sound;
}

// This function loads and plays a sound file
// It takes one parameter: path (the file path like 'assets/sound1.wav')
function playSoundFile(path) {
    // loadSound is a p5.js function that loads a sound file
    // When it's done loading, it calls stopOldAndPlay with the loaded sound
    loadSound(path, stopOldAndPlay);
}

// ----------------------------------------------------------------------------
// STEP 4: BUTTON CALLBACK FUNCTIONS (Named Functions for Each Button)
// ----------------------------------------------------------------------------
// These functions are called when buttons are clicked.
// Instead of using anonymous functions (like () => ...), we use named functions
// so it's clearer what each button does.

// Function called when "Play Sound 1" button is clicked
function playSound1() {
    playSoundFile('assets/sound1.wav');
}

// Function called when "Play Sound 2" button is clicked
function playSound2() {
    playSoundFile('assets/sound2.wav');
}

// Function called when "Switch Animation" button is clicked
function handleSwitchAnimation() {
    // Move to the next animation (0 -> 1 -> 2 -> 0 -> ...)
    currentAnimation = currentAnimation + 1;
    // If we've gone past the last animation, go back to the first one
    if (currentAnimation >= animations.length) {
        currentAnimation = 0;
    }
}

// Function called when "Switch Background" button is clicked
function handleSwitchBackground() {
    // Move to the next background image (0 -> 1 -> 2 -> 0 -> ...)
    currentBackgroundIndex = currentBackgroundIndex + 1;
    // If we've gone past the last background, go back to the first one
    if (currentBackgroundIndex >= backgroundFiles.length) {
        currentBackgroundIndex = 0;
    }
    // Load the new background image if we haven't loaded it yet
    if (!backgroundImages[currentBackgroundIndex]) {
        loadImage(backgroundFiles[currentBackgroundIndex], storeBackground0);
    }
}

// Function called when background image 0 finishes loading
function storeBackground0(img) {
    backgroundImages[0] = img;
}

// Function called when background image 1 finishes loading
function storeBackground1(img) {
    backgroundImages[1] = img;
}

// Function called when background image 2 finishes loading
function storeBackground2(img) {
    backgroundImages[2] = img;
}

// ----------------------------------------------------------------------------
// STEP 5: BUTTON DATA (Array of Objects)
// ----------------------------------------------------------------------------
// We store all button information in an array.
// Each button is an object with:
// - name: the text shown on the button
// - x: horizontal position (left edge)
// - y: vertical position (top edge)
// - width: how wide the button is
// - height: how tall the button is
// - callback: the function to call when clicked
let buttons = [
    { name: 'Play Sound 1', x: 100, y: 100, width: 150, height: 40, callback: playSound1 },
    { name: 'Play Sound 2', x: 100, y: 160, width: 150, height: 40, callback: playSound2 },
    { name: 'Switch Animation', x: 100, y: 280, width: 150, height: 40, callback: handleSwitchAnimation },
    { name: 'Switch Background', x: 100, y: 340, width: 150, height: 40, callback: handleSwitchBackground }
];

// ----------------------------------------------------------------------------
// STEP 6: FIRE ANIMATION FUNCTIONS
// ----------------------------------------------------------------------------

// This function creates all the flame particles
// We use a loop here because we need 30 flames, and typing each one manually
// would be very tedious and error-prone
function initFire() {
    // Start with an empty array
    flames = [];
    
    // Create 30 flames
    // We use a loop because creating 30 flames manually would take forever
    for (let i = 0; i < 30; i++) {
        // Each flame is an object that stores:
        // - x: horizontal position
        // - y: vertical position
        // - size: how big the flame is
        // - speed: how fast it moves up
        // - flicker: how much it moves side to side
        // - life: how "alive" it is (affects color and visibility)
        flames.push({
            x: width/2 + random(-100, 100),  // Start near center, random position
            y: height - 50,                   // Start at bottom of screen
            size: random(10, 25),              // Random size between 10 and 25
            speed: random(0.5, 2),             // Random speed
            flicker: random(0.5, 2),           // Random flicker amount
            life: random(0, 1)                 // Random starting life
        });
    }
}

// This function draws and updates all the flames
function drawFire() {
    // Loop through each flame and update/draw it
    // We use a loop because we have 30 flames to process
    for (let i = 0; i < flames.length; i++) {
        let flame = flames[i];
        
        // Move the flame up
        flame.y = flame.y - flame.speed;
        
        // Move the flame side to side (flickering effect)
        flame.x = flame.x + random(-2, 2) * flame.flicker;
        
        // Make the flame get smaller over time
        flame.life = flame.life - 0.02;
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

// ----------------------------------------------------------------------------
// STEP 7: SNOW ANIMATION FUNCTIONS
// ----------------------------------------------------------------------------

// This function creates all the snowflake particles
// We use a loop because we need 50 snowflakes
function initSnow() {
    // Start with an empty array
    snowflakes = [];
    
    // Create 50 snowflakes
    for (let i = 0; i < 50; i++) {
        // Each snowflake is an object with:
        // - x: horizontal position
        // - y: vertical position
        // - size: how big it is
        // - speed: how fast it falls
        // - sway: how much it moves left/right
        snowflakes.push({
            x: random(width),                  // Random horizontal position
            y: random(-height, 0),            // Start above the screen
            size: random(2, 5),                // Random size
            speed: random(1, 3),               // Random falling speed
            sway: random(-1, 1)                // Random side-to-side movement
        });
    }
}

// This function draws and updates all the snowflakes
function drawSnow() {
    // Set the color to white
    fill(255);
    noStroke();
    
    // Loop through each snowflake and update/draw it
    for (let i = 0; i < snowflakes.length; i++) {
        let flake = snowflakes[i];
        
        // Draw the snowflake as a circle
        ellipse(flake.x, flake.y, flake.size);
        
        // Move the snowflake down
        flake.y = flake.y + flake.speed;
        
        // Move the snowflake side to side (swaying effect)
        flake.x = flake.x + flake.sway * 0.5;
        
        // If the snowflake has fallen off the bottom, reset it to the top
        if (flake.y > height) {
            flake.y = random(-50, 0);
            flake.x = random(width);
        }
        
        // If the snowflake has gone off the sides, reverse its sway direction
        if (flake.x < 0 || flake.x > width) {
            flake.sway = flake.sway * -1;
        }
    }
}

// ----------------------------------------------------------------------------
// STEP 8: STAR ANIMATION FUNCTIONS
// ----------------------------------------------------------------------------

// This function creates all the star particles
// We use a loop because we need 100 stars
function initStars() {
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
}

// This function draws and updates all the stars and shooting stars
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
    
    // Check if it's time to create a new shooting star
    // millis() returns how many milliseconds have passed since the program started
    if (millis() >= nextShootingStarTime) {
        // If there's no shooting star currently, create one
        if (!shootingStar) {
            // Create a new shooting star object
            shootingStar = {
                x: random(width),                    // Random starting x position
                y: random(0, height * 0.3),         // Start in top third of screen
                trail: [],                           // Array to store the trail points
                speed: random(5, 10),                // Random speed
                angle: random(PI/6, PI/3),           // Random angle (downward)
                life: 255                            // Starting life (for fade effect)
            };
        }
        // Schedule the next shooting star (3-6 seconds from now)
        nextShootingStarTime = millis() + random(3000, 6000);
    }
    
    // If there's a shooting star, draw and update it
    if (shootingStar) {
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
        
        // If the shooting star has gone off screen or faded completely, remove it
        if (shootingStar.x > width || shootingStar.y > height || shootingStar.life <= 0) {
            shootingStar = null;
        }
    }
}

// ----------------------------------------------------------------------------
// STEP 9: BUTTON FUNCTIONS
// ----------------------------------------------------------------------------

// This function draws a button on the screen
// It takes one parameter: btn (a button object from the buttons array)
function drawButton(btn) {
    // Set the button color to light blue
    fill(100, 150, 255);
    // Draw a rounded rectangle for the button
    rect(btn.x, btn.y, btn.width, btn.height, 5);
    
    // Set the text color to white
    fill(255);
    // Center the text in the button
    textAlign(CENTER, CENTER);
    // Draw the button's name text
    text(btn.name, btn.x + btn.width/2, btn.y + btn.height/2);
}

// This function checks if the mouse is over a button
// It takes one parameter: btn (a button object)
// Returns true if mouse is over the button, false otherwise
function isMouseOver(btn) {
    // Check if mouse X is between the left and right edges of the button
    let mouseInX = mouseX >= btn.x && mouseX <= btn.x + btn.width;
    // Check if mouse Y is between the top and bottom edges of the button
    let mouseInY = mouseY >= btn.y && mouseY <= btn.y + btn.height;
    // Return true only if both are true (mouse is inside the button)
    return mouseInX && mouseInY;
}

// ----------------------------------------------------------------------------
// STEP 10: TEXT DRAWING FUNCTION
// ----------------------------------------------------------------------------

// This function draws text on the screen
// Parameters:
// - txt: the text to draw
// - x: horizontal position
// - y: vertical position
// - color: an array of 3 numbers [red, green, blue] (0-255 each)
// - fontSize: how big the text is
// - fontFamily: which font to use
// - align: how to align the text (LEFT, CENTER, or RIGHT)
function drawText(txt, x, y, color, fontSize, fontFamily, align) {
    // Set the text color using the color array
    fill(color[0], color[1], color[2]);
    // Set the text size
    textSize(fontSize);
    // Set the font family
    textFont(fontFamily);
    // Set the text alignment
    textAlign(align);
    // Draw the text
    text(txt, x, y);
}

// ----------------------------------------------------------------------------
// STEP 11: SETUP FUNCTION (Runs Once at Start)
// ----------------------------------------------------------------------------
// This function runs once when the program starts.
// It sets up everything we need before the animation begins.

function setup() {
    // Create a canvas (drawing area) that is 800 pixels wide and 600 pixels tall
    createCanvas(800, 600);
    
    // Initialize all the animations
    initSnow();
    initFire();
    initStars();
    
    // Schedule the first shooting star to appear after 3-6 seconds
    nextShootingStarTime = millis() + random(3000, 6000);
    
    // Load all three background images
    // We call loadImage three times because we have three images
    // We use named functions (storeBackground0, storeBackground1, storeBackground2)
    // instead of anonymous functions so it's clearer what each one does
    loadImage(backgroundFiles[0], storeBackground0);
    loadImage(backgroundFiles[1], storeBackground1);
    loadImage(backgroundFiles[2], storeBackground2);
}

// ----------------------------------------------------------------------------
// STEP 12: DRAW FUNCTION (Runs Continuously)
// ----------------------------------------------------------------------------
// This function runs over and over again, many times per second.
// It's like a flipbook - each time it runs, it draws one frame of animation.

function draw() {
    // First, draw the background
    // Check if we have a background image loaded for the current index
    if (backgroundImages[currentBackgroundIndex]) {
        // If we do, draw the image covering the whole canvas
        image(backgroundImages[currentBackgroundIndex], 0, 0, width, height);
    } else {
        // If not, just use a solid color background
        // animations[currentAnimation].bg gets the background color for current animation
        background(animations[currentAnimation].bg);
    }
    
    // Draw the current animation (snow, fire, or stars)
    // animations[currentAnimation].draw gets the draw function for current animation
    animations[currentAnimation].draw();
    
    // Draw all the buttons
    // We call drawButton four times because we have four buttons
    // We don't use a loop here because we only have 4 buttons (not many)
    drawButton(buttons[0]);
    drawButton(buttons[1]);
    drawButton(buttons[2]);
    drawButton(buttons[3]);
    
    // Draw the "Merry Christmas!" text in the center
    // We pass an array [255, 0, 0] for red color
    drawText('Merry Christmas!', 400, 300, [255, 0, 0], 32, 'Arial', CENTER);
}

// ----------------------------------------------------------------------------
// STEP 13: MOUSE CLICK HANDLER
// ----------------------------------------------------------------------------
// This function runs automatically whenever the user clicks the mouse.
// It checks which button was clicked and calls that button's callback function.

function mousePressed() {
    // Check each button to see if the mouse was clicked on it
    // We check all four buttons separately (not using a loop for clarity)
    if (isMouseOver(buttons[0])) {
        buttons[0].callback();
    }
    if (isMouseOver(buttons[1])) {
        buttons[1].callback();
    }
    if (isMouseOver(buttons[2])) {
        buttons[2].callback();
    }
    if (isMouseOver(buttons[3])) {
        buttons[3].callback();
    }
}

// ============================================================================
// END OF CODE
// ============================================================================
// This is a simplified version of the jukebox code.
// Key simplifications:
// - No loops for small iterations (buttons, backgrounds) - code is repeated
// - Loops are only used for particle generation (where needed)
// - All callbacks are named functions (no anonymous functions)
// - Detailed comments explain each step
// ============================================================================

