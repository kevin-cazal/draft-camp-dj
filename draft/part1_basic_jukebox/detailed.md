# Step-by-Step Guide: Creating a Basic Jukebox with p5.js

This guide walks you through creating a basic interactive jukebox from scratch using p5.js. Each step builds upon the previous one, so follow the steps in order!

---

## Introduction: Understanding the Project

### What We're Building

A jukebox is a machine that plays music. Our digital jukebox will be an interactive web application that lets users:
- Display festive text on the screen
- Switch between different background images
- Play different sounds by clicking buttons

**Real-world analogy**: Think of a classic diner jukebox where you could select different songs by pressing buttons. Our digital version works similarly - click a button, hear a sound, see a different background!

### Key Concepts

**Variables**: Think of variables as labeled boxes where you store information. You can put something in the box, check what's inside, or change what's in the box. In programming, variables store values like text, numbers, or references to objects (like images or sounds).

**Functions**: Functions are reusable blocks of code that perform specific tasks. Imagine a recipe - you follow the same steps each time to make the same dish. Functions work the same way - you call them by name, and they perform their defined actions.

**Callbacks**: A callback is a function that gets called when something happens. Think of it like a phone number you give to a restaurant - when your order is ready, they call you back. In programming, callbacks execute when events occur (like a button click).

**Objects**: Objects are collections of related data. Think of a person's contact card - it has a name, phone number, address, etc. An object in programming groups related properties together (like a button with position, size, and label).

---

## Step 1: Display Text

### Understanding Text Display

Text is one of the most fundamental ways to communicate information. In p5.js, displaying text is like writing on a digital canvas - you decide what to write, where to write it, and how it should look.

### Step 1 (A): Add Variables

Variables are essential for storing information that you want to use later. We'll create a variable to store the text we want to display.

**Why use variables?** Instead of hardcoding "Merry Christmas!" everywhere in your code, you store it in a variable. This makes it easy to change later - update it in one place, and it changes everywhere.


Here's how to declare a variable in JavaScript:

```javascript
// Declare a variable to store text
let currentText = null;
```

**Understanding the code**:
- `let` tells JavaScript you're creating a new variable
- `currentText` is the name (label) of your variable - choose a descriptive name!
- `= null` sets an initial value (null means "nothing" or "empty" for now)

**Why null?** We'll set the actual text value later in the `setup()` function. Starting with `null` is like reserving a parking space - the space exists, but it's empty until you park your car.

### Step 1 (B): Initialize Text in Setup

The [`setup()`](https://p5js.org/reference/#/p5/setup) function runs once when your program starts - it's like the opening scene of a play where you set up the stage.

**What happens in setup?** This is where you prepare everything:
- Create the canvas (your drawing area)
- Load images and sounds
- Set initial values for variables
- Initialize any starting states


Now let's set our text variable in `setup()`:

```javascript
function setup() {
    createCanvas(800, 600);  // Create a canvas 800 pixels wide, 600 tall
    currentText = "Merry Christmas!";  // Set our text variable
}
```

**Understanding the code**:
- [`createCanvas(800, 600)`](https://p5js.org/reference/#/p5/createCanvas) creates your drawing area (like creating a piece of paper to draw on)
- `currentText = "Merry Christmas!"` stores our message in the variable
- Now `currentText` contains the text we want to display

**Why in setup()?** We initialize values in `setup()` so they're ready when the program starts running. It's like setting your alarm clock before going to bed - you prepare it once, and it's ready when you need it.

### Step 1: Draw Text

The [`draw()`](https://p5js.org/reference/#/p5/draw) function runs continuously (about 60 times per second). Each time it runs, it draws a new frame, creating animation and interactivity.

**How drawing works**: Think of a flipbook - each page is one frame. You draw something slightly different on each page. When you flip through quickly, it looks like movement. The `draw()` function creates each "page" of your flipbook.

Now we need a function to actually draw the text. Let's create `drawText()`:

```javascript
function drawText(string) {
    fill(255, 128, 128);           // Set text color (reddish-pink)
    textAlign(CENTER, CENTER);     // Center the text
    textSize(32);                  // Set text size to 32 pixels
    text(string, width/2, height/2);  // Draw text at canvas center
}
```

**Understanding the code**:
- [`fill(255, 128, 128)`](https://p5js.org/reference/#/p5/fill) sets the color. In p5.js, colors use RGB (Red, Green, Blue) values from 0-255
  - `255, 128, 128` = mostly red, some green and blue = pinkish-red
- [`textAlign(CENTER, CENTER)`](https://p5js.org/reference/#/p5/textAlign) centers the text both horizontally and vertically
- [`textSize(32)`](https://p5js.org/reference/#/p5/textSize) makes the text 32 pixels tall
- [`text(string, width/2, height/2)`](https://p5js.org/reference/#/p5/text) draws the text
  - `string` is what we want to display (our text)
  - `width/2` is the center horizontally (halfway across the canvas)
  - `height/2` is the center vertically (halfway down the canvas)

**Coordinate system**: In p5.js (like most computer graphics), the origin (0,0) is at the top-left corner:
- X increases as you move RIGHT
- Y increases as you move DOWN
- So `width/2, height/2` is the center of the canvas

Now call this function in `draw()`:

```javascript
function draw() {
    background(0);              // Clear screen with black
    drawText(currentText);      // Draw our text
}
```

**Understanding the code**:
- [`background(0)`](https://p5js.org/reference/#/p5/background) clears the screen (0 = black, 255 = white)
- `drawText(currentText)` calls our function, passing the text we stored in the variable

**Test it!** You should now see "Merry Christmas!" displayed in the center of your canvas.

---

## Step 2: Add Background Images

### Understanding Background Images

A background is like the backdrop on a theater stage - it sets the scene and atmosphere. We'll learn to load and display images as backgrounds.


### How Images Work in p5.js

Images need to be loaded before you can use them. Once loaded you can display them on the canvas.

**Why this matters**: If you try to draw an image before it's loaded, you'll get an error or see nothing. It's like trying to play a DVD before it's finished loading in the player.


### Step 2 (A): Add Background Variables

We need variables to store our background images. We'll have:
- Individual background variables for each image (`background1`, `background2`, `background3`)
- A variable for the currently active background (`currentBackground`)

```javascript
let currentBackground = null;
let background1 = null;
let background2 = null;
let background3 = null;
```

**Why multiple variables?** Think of it like having multiple picture frames:
- `background1`, `background2`, `background3` are the frames on the shelf (loaded images)
- `currentBackground` is the frame currently hanging on the wall (active image)
- You can switch which frame is on the wall without removing the others from the shelf

### Step 2 (B): Load Backgrounds in Setup

Now we'll load the images in `setup()`. The [`loadImage()`](https://p5js.org/reference/#/p5/loadImage) function loads an image file:

```javascript
function setup() {
    createCanvas(800, 600);
    currentText = "Merry Christmas!";
    
    // Load background images
    background1 = loadImage('assets/background1.png');
    background2 = loadImage('assets/background2.png');
    background3 = loadImage('assets/background3.png');
    
    // Set the starting background
    currentBackground = background1;
}
```

**Understanding the code**:
- [`loadImage('assets/background1.png')`](https://p5js.org/reference/#/p5/loadImage) loads the image file from the specified path
- `background1 = ...` stores the loaded image in our variable
- `currentBackground = background1` sets which background to display initially

**File paths**: The path `'assets/background1.png'` means:
- Look in the `assets` folder
- Find the file named `background1.png`
- Make sure your image files are in this location!

### Creating the Draw Background Function

We need a function to actually draw the background image:

```javascript
function drawBackground(background) {
    image(background, 0, 0, width, height);
}
```

**Understanding the code**:
- [`image()`](https://p5js.org/reference/#/p5/image) is p5.js's function for drawing images
- `background` is which image to draw (passed as a parameter)
- `0, 0` is where to start drawing (top-left corner)
- `width, height` is how big to draw it (fills the entire canvas)

**Why cover the whole canvas?** By drawing at (0,0) with full canvas size, the image becomes the background covering everything. It's like wallpapering a wall - you cover the entire surface.

Now update `draw()`:

```javascript
function draw() {
    drawBackground(currentBackground);  // Draw background first
    drawText(currentText);              // Then draw text on top
}
```

**Order matters!** We draw the background first, then the text. This is like painting:
- First paint the wall (background)
- Then paint text or decorations on top

If you draw text first, the background will cover it!

### Step 2 (C1): Add Background Buttons

Now we'll create buttons that let users switch backgrounds. Buttons are interactive rectangles that respond to clicks.

**What makes a button?** A button needs:
1. **Position**: Where it appears (x, y coordinates)
2. **Size**: How big it is (width, height)
3. **Label**: Text showing what it does
4. **Action**: What happens when clicked (callback function)

**Real-world analogy**: A light switch:
- Position: On the wall next to the door
- Size: The switch plate
- Label: The words "ON" and "OFF" (or a visual indicator)
- Action: Turns the light on/off when you flip it

Let's create our background buttons. First, we need a function to draw buttons:

```javascript
function drawButton(button) {
    fill(100, 150, 255);  // Blue color for button
    rect(button.x, button.y, button.width, button.height, 5);  // Draw rectangle with rounded corners
    fill(255);  // White text
    textSize(12);
    textAlign(CENTER, CENTER);
    text(button.name, button.x + button.width/2, button.y + button.height/2);  // Center text in button
}
```

**Understanding the code**:
- [`fill(100, 150, 255)`](https://p5js.org/reference/#/p5/fill) sets blue color (medium blue)
- [`rect(...)`](https://p5js.org/reference/#/p5/rect) draws a rectangle:
  - `button.x, button.y` is the top-left corner
  - `button.width, button.height` is the size
  - `5` adds rounded corners (corner radius)
- Then we draw white text centered in the rectangle

Now create the button objects:

```javascript
let button3 = {
    name: "Background 1",
    x: 50,
    y: 150,
    width: 80,
    height: 40,
    callback: handleButton3Click
};

let button4 = {
    name: "Background 2",
    x: 50,
    y: 200,
    width: 80,
    height: 40,
    callback: handleButton4Click
};

let button5 = {
    name: "Background 3",
    x: 50,
    y: 250,
    width: 80,
    height: 40,
    callback: handleButton5Click
};
```

**Understanding the structure**:
- Each button is an object with properties
- `name`: What text appears on the button
- `x, y`: Position (50 pixels from left, different y positions)
- `width, height`: Size of the button
- `callback`: Function to call when clicked (we'll create these next)

**Why different y values?** We stack buttons vertically:
- Button 3 at y = 150
- Button 4 at y = 200 (50 pixels down)
- Button 5 at y = 250 (another 50 pixels down)

This creates a vertical list of buttons.

### Step 2 (C2): Add Background Button Handlers

Now we create the functions that run when buttons are clicked. These are called "handler" functions:

```javascript
function handleButton3Click() {
    currentBackground = background1;
}

function handleButton4Click() {
    currentBackground = background2;
}

function handleButton5Click() {
    currentBackground = background3;
}
```

**Understanding the code**:
- Each function changes `currentBackground` to a different image
- When you click "Background 1" button, it sets the active background to `background1`
- Simple but effective!

**How it works together**:
1. User clicks button
2. [`mousePressed()`](https://p5js.org/reference/#/p5/mousePressed) detects the click
3. It checks which button was clicked
4. It calls that button's `callback` function
5. The callback changes `currentBackground`
6. Next frame, `draw()` uses the new background


### Step 2: Draw Background and Buttons

Update your `draw()` function to draw everything:

```javascript
function draw() {
    drawBackground(currentBackground);  // Step 2: Draw background
    drawText(currentText);              // Step 1: Draw text
    drawButton(button3);                // Step 2: Draw buttons
    drawButton(button4);
    drawButton(button5);
}
```

**Test it!** Click the background buttons - you should see the background change!

---

## Step 3: Add Sounds and Button Interactions

### Understanding Sound in p5.js

Adding sound makes your jukebox interactive! In p5.js, sounds work similarly to images:
- Load the sound file
- Store it in a variable
- Play it when needed

**Important**: Sound playback requires user interaction first (like a button click). Browsers require this to prevent websites from automatically playing sounds.

**Real-world analogy**: Like a music player:
- You have a collection of songs (sound files)
- You select a song (click button)
- You press play (call [`.play()`](https://p5js.org/reference/#/p5.sound/p5.SoundFile/play))
- Music plays!

### Step 3 (A): Add Sound Variables

First, let's create variables to store our sounds:

```javascript
let currentSound = null;
let sound1 = null;
let sound2 = null;
```

**Why track currentSound?** This helps us stop the current sound before playing a new one. Otherwise, multiple sounds might play simultaneously (like having multiple radios on at once).

### Step 3 (B): Load Sounds in Setup

Load sound files in `setup()` using [`loadSound()`](https://p5js.org/reference/#/p5.sound/p5.SoundFile) (from p5.sound library):

```javascript
function setup() {
    createCanvas(800, 600);
    currentText = "Merry Christmas!";
    
    // Load backgrounds (from Step 2)
    background1 = loadImage('assets/background1.png');
    background2 = loadImage('assets/background2.png');
    background3 = loadImage('assets/background3.png');
    currentBackground = background1;
    
    // Load sounds
    sound1 = loadSound('assets/sound1.wav');
    sound2 = loadSound('assets/sound2.wav');
    
    // Set initial sound
    currentSound = sound1;
}
```

**Understanding the code**:
- [`loadSound('assets/sound1.wav')`](https://p5js.org/reference/#/p5.sound/p5.SoundFile) loads a sound file
- Store it in `sound1` variable
- Set `currentSound` to start with the first sound

**Sound file formats**: p5.js supports WAV, MP3, OGG. Make sure your files are in the `assets` folder! See the [p5.sound documentation](https://p5js.org/reference/#/libraries/p5.sound) for more information.

### Step 3 (C1): Add Sound Buttons

Create buttons for playing sounds:

```javascript
let button1 = {
    name: "Sound 1",
    x: 50,
    y: 50,
    width: 80,
    height: 40,
    callback: handleButton1Click
};

let button2 = {
    name: "Sound 2",
    x: 50,
    y: 100,
    width: 80,
    height: 40,
    callback: handleButton2Click
};
```

**Button positioning**: These buttons are at the top (y: 50 and 100), above the background buttons. This groups related buttons together visually.

### Step 3 (C2): Add Sound Button Handlers

Now create functions to handle sound button clicks. We need a helper function first:

```javascript
function stopCurrentSound() {
    if (currentSound) {
        currentSound.stop();
    }
}
```

**Understanding the code**:
- Check if `currentSound` exists (not null)
- If it does, call [`.stop()`](https://p5js.org/reference/#/p5.sound/p5.SoundFile/stop) to stop playback
- This prevents overlapping sounds

**Why stop first?** Imagine clicking between radio stations - you want one to stop before the next starts. Same principle here!

Now create the button handlers:

```javascript
function handleButton1Click() {
    stopCurrentSound();      // Stop any currently playing sound
    currentSound = sound1;   // Set to sound 1
    currentSound.play();     // Play it! (uses .play() method)
}

function handleButton2Click() {
    stopCurrentSound();      // Stop any currently playing sound
    currentSound = sound2;   // Set to sound 2
    currentSound.play();     // Play it! (uses .play() method)
}
```

**Understanding the flow**:
1. Stop whatever is playing (if anything)
2. Switch to the selected sound
3. Start playing it

**Real-world analogy**: Like a jukebox:
- You select a song (click button)
- The previous song stops (stopCurrentSound)
- Your selected song starts playing (play)

### Step 3 (C3): Add Button Interaction Logic

Now we need to detect when buttons are clicked and respond appropriately. This requires two functions:

#### Checking if Mouse is Over Button

```javascript
function isMouseOverButton(button) {
    return mouseX >= button.x && 
           mouseX <= button.x + button.width &&
           mouseY >= button.y && 
           mouseY <= button.y + button.height;
}
```

**Understanding the code**:
- [`mouseX`](https://p5js.org/reference/#/p5/mouseX) and [`mouseY`](https://p5js.org/reference/#/p5/mouseY) are p5.js variables that track mouse position
- Check if mouse is within button's rectangle:
  - X is between left edge (`button.x`) and right edge (`button.x + button.width`)
  - Y is between top edge (`button.y`) and bottom edge (`button.y + button.height`)
- Returns `true` if mouse is over button, `false` otherwise

**How it works**: Like checking if a point is inside a box:
- Draw an imaginary box around the button
- Check if the mouse point is inside that box
- If yes, the button was clicked!

#### Handling Mouse Clicks

```javascript
function mousePressed() {
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
```

**Understanding the code**:
- [`mousePressed()`](https://p5js.org/reference/#/p5/mousePressed) is automatically called by p5.js when the mouse is clicked
- Check each button to see if the click was over it
- If yes, call that button's `callback` function

**Why check all buttons?** We don't know which button was clicked, so we check each one. Only one (or none) will match.


### Step 3: Draw All Buttons

Update `draw()` to display all buttons:

```javascript
function draw() {
    drawBackground(currentBackground);
    drawText(currentText);
    // Draw all buttons
    drawButton(button1);
    drawButton(button2);
    drawButton(button3);
    drawButton(button4);
    drawButton(button5);
}
```

**Test everything!** 
- Click sound buttons - you should hear sounds!
- Click background buttons - backgrounds should change!
- Everything should work together!

---

## Summary and Next Steps

### What You've Built

Congratulations! You've created a functional jukebox with:
- **Text display**: Shows "Merry Christmas!" 
- **Background switching**: Three different backgrounds
- **Sound playback**: Two different sounds
- **Interactive buttons**: Five clickable buttons

### Key Concepts Learned

1. **Variables**: Store and track state (current text, background, sound)
2. **Functions**: Reusable code blocks (drawButton, drawText, handlers)
3. **Objects**: Group related data (button properties)
4. **Callbacks**: Functions that respond to events (button clicks)
5. **Event handling**: Detecting and responding to user input (mouse clicks)

### Understanding the Flow

Here's how everything works together:

1. **Setup phase** (`setup()`):
   - Creates canvas
   - Loads images and sounds
   - Initializes variables

2. **Draw phase** (`draw()` - runs continuously):
   - Draws background
   - Draws text
   - Draws buttons
   - Repeats 60 times per second

3. **Interaction phase** (`mousePressed()`):
   - Detects mouse clicks
   - Checks which button was clicked
   - Calls appropriate callback
   - Callback changes state (sound/background)
   - Next draw cycle shows the changes

### Experimentation Ideas

Try modifying your jukebox (part 2):
- **Add more sounds**: Create `sound3`, `sound4`, etc.
- **Add more backgrounds**: Load additional images
- **Change colors**: Modify button and text colors
- **Move buttons**: Change x, y positions
- **Resize elements**: Adjust button sizes, text size
- **Change text**: Modify the message displayed

### Common Pitfalls and Solutions

**Sound doesn't play?**
- Check file path is correct
- Ensure file format is supported (WAV, MP3, OGG)
- Verify user interaction occurred (browsers require this)

**Images don't show?**
- Verify file path in [`loadImage()`](https://p5js.org/reference/#/p5/loadImage)
- Check file is in `assets` folder
- Ensure image loaded before drawing

**Buttons don't respond?**
- Check button coordinates are correct
- Verify `mousePressed()` checks all buttons
- Ensure callbacks are properly defined

**Text/buttons covered?**
- Check draw order - draw background first!
- Verify z-order (things drawn later appear on top)

### Building on This Foundation

This jukebox is a foundation. You could add:
- More interactive elements
- Animation effects
- Particle systems
- More complex user interactions
- Different themes or styles

### Final Thoughts

Remember: Programming is about breaking big problems into small steps. Each part of this project was just a small step building on previous steps. Every expert was once a beginner - keep practicing, keep experimenting, and you'll keep improving!

Happy coding, and Merry Christmas! 🎄🎵
