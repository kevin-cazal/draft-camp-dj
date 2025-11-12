# Workshop 1: Building Your First Interactive Jukebox

Welcome to your first coding workshop! By the end of this session, you'll have created a fully functional interactive jukebox that displays text, switches backgrounds, and plays sounds. Let's dive in!

---

## Introduction: What We're Building

Imagine walking into a classic diner and seeing a jukebox in the corner. You insert a coin, press a button, and music plays. That's exactly what we're building - but digital!

**Your jukebox will:**
- Display a festive message on the screen
- Let users switch between different background images
- Play different sounds when buttons are clicked

**Real-world connection**: This is similar to how many apps and websites work - buttons that trigger actions, images that change, and sounds that play. Once you understand these concepts, you can apply them to any project!

### Getting Started: Bootstrap Code

Before we begin, you need a starting point. Here's the minimal code to get your project running:

```javascript
function setup() {
    createCanvas(800, 600);
}

function draw() {
    background(0);
}

function mousePressed() {
    console.log("Mouse clicked at:", mouseX, mouseY);
}
```

**What this does:**
- `setup()` creates your canvas (your drawing area) - runs once when the program starts
- `draw()` runs continuously (60 times per second) - this is where you'll draw everything
- `mousePressed()` detects when you click - helpful for testing

**Try it now**: Click anywhere on the canvas and check your browser's console (press F12 → Console tab). You should see coordinates printed!

**Documentation**: Learn more about [`setup()`](https://p5js.org/reference/#/p5/setup) and [`draw()`](https://p5js.org/reference/#/p5/draw) in the p5.js documentation.

---

## Understanding the Big Picture

Before we start coding, let's understand how everything fits together:

### The Three Pillars of Your Jukebox

1. **Variables**: These are like labeled boxes where you store information
   - Store text you want to display
   - Store which background image is currently showing
   - Store which sound is currently playing

2. **Functions**: These are reusable blocks of code that do specific tasks
   - Draw text on the screen
   - Draw buttons
   - Handle button clicks
   - Play sounds

3. **Events**: These are things that happen when the user interacts
   - Mouse clicks
   - Button presses
   - These trigger functions to run

**Visual Concept**: [SCHEMA PLACEHOLDER: Diagram showing Variables → Functions → Events, with examples]

Think of it like a restaurant:
- **Variables** = ingredients in the kitchen (what you have available)
- **Functions** = recipes (what you can make)
- **Events** = customer orders (what triggers you to make something)

---

## Step 1: Display Text on Screen

### Understanding Text Display

Text is one of the most fundamental ways to communicate. When you see text on a website, in an app, or on a screen, it's being drawn using code - just like you'll do!


**Visual Concept**: [SCHEMA PLACEHOLDER: Diagram showing text positioning on canvas, with x/y coordinates labeled]

### The Logic Behind Text Display

To display text, you need to:

1. **Store the text** somewhere (like writing it on a sticky note)
2. **Set up the text style** (size, color, alignment - like choosing a font)
3. **Draw it on the screen** (like painting the text on a canvas)

**Think about it**: When you write on a whiteboard, you:
1. Decide what to write (store the text)
2. Choose your marker color (set the style)
3. Write it on the board (draw it)

### Step 1A: Storing Your Text

**The Concept**: You need a variable to hold your message. Think of it like a sticky note with your text written on it.

**Why use a variable?** Instead of writing "Merry Christmas!" in 10 different places in your code, you write it once in a variable. If you want to change it later, you only change it in one place!

**Your Task**: Create a variable to store your text message. Start by setting it to `null` (empty) - you'll fill it in during setup.

**Syntax Hint**: In JavaScript, you create variables with `let variableName = value;`

**Documentation**: Learn about [JavaScript variables](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#declarations).

### Step 1B: Setting Up Your Canvas

**The Concept**: The `setup()` function is like preparing your workspace before you start working.


**What happens in setup?**
- Create the canvas (your drawing area)
- Load images and sounds (we'll add these later)
- Set initial values for variables

**Your Task**: In your `setup()` function:
1. Create a canvas (already done in bootstrap code)
2. Set your text variable to your message (like "Merry Christmas!")

**Documentation**: [`createCanvas()`](https://p5js.org/reference/#/p5/createCanvas) creates your drawing area.

### Step 1C: Drawing Text on Screen

**The Concept**: The `draw()` function runs continuously (about 60 times per second). Each time it runs, it draws one "frame" of your animation.

**How it works**: Think of a flipbook - each page is one frame. You draw something on each page. When you flip through quickly, it looks like movement. The `draw()` function creates each "page" of your flipbook.

**Visual Concept**: [SCHEMA PLACEHOLDER: Animation showing flipbook concept with frames, then showing how draw() creates each frame]

**The Logic**: To draw text, you need to:
1. Set the text color (like choosing a paint color)
2. Set the text size (how big it should be)
3. Set text alignment (left, center, or right)
4. Actually draw the text at a specific position

**Positioning Logic**: In p5.js, coordinates work like this:
- (0, 0) is the top-left corner
- X increases as you move RIGHT
- Y increases as you move DOWN
- To center text: use `width/2` for x and `height/2` for y

**Visual Concept**: [SCHEMA PLACEHOLDER: Canvas with coordinate system labeled, showing where (0,0) is, and how x/y increase]

**Your Task**: Create a function called `drawText()` that:
1. Takes a text string as input
2. Sets the color, size, and alignment
3. Draws the text at the center of the canvas

**Then**: Call this function from your `draw()` function, passing your text variable.

**Documentation**: 
- [`fill()`](https://p5js.org/reference/#/p5/fill) sets the color
- [`textSize()`](https://p5js.org/reference/#/p5/textSize) sets the size
- [`textAlign()`](https://p5js.org/reference/#/p5/textAlign) sets alignment
- [`text()`](https://p5js.org/reference/#/p5/text) draws the text

**Test it!** You should now see your message displayed in the center of the screen!

---

## Step 2: Adding Background Images

### Understanding Background Images

A background is like the backdrop on a theater stage - it sets the scene and atmosphere. Just like on your phone where you can change your wallpaper, users will be able to switch between different backgrounds!

### How Images Work in Code

**The Concept**: Images need to be loaded before you can use them. This is like downloading a picture on your phone - it takes a moment, then it's ready to use.

**Why this matters**: If you try to draw an image before it's loaded, you'll get an error or see nothing. It's like trying to play a DVD before it's finished loading in the player.

**Real-world example**: Ordering food delivery:
1. You place the order (start loading image)
2. You can do other things while waiting (program continues)
3. When food arrives (image loads), you can use it (display it)

### Step 2A: Storing Background Images

**The Logic**: You need to:
1. Create variables to store each background image (like having picture frames on a shelf)
2. Create a variable to track which background is currently active (like which frame is hanging on the wall)

**Think about it**: You might have three picture frames on a shelf (`background1`, `background2`, `background3`), but only one is hanging on the wall (`currentBackground`). You can switch which one is on the wall without removing the others from the shelf.

**Your Task**: Create variables for:
- Three individual background images (`background1`, `background2`, `background3`)
- One variable for the currently active background (`currentBackground`)

Start them all as `null` (empty) - you'll load them in setup.

### Step 2B: Loading Images

**The Concept**: In `setup()`, you need to load each image file from your computer/server. Think of it like opening image files and putting them into your variables.

**Where do images go?** Put your image files in an `assets` folder in your project. Common formats: PNG, JPG, GIF.

**Your Task**: In your `setup()` function, load three background images using `loadImage()`. The file path should be something like `'assets/background1.png'`.

**Then**: Set `currentBackground` to the first background image so it starts with that one.

**Documentation**: [`loadImage()`](https://p5js.org/reference/#/p5/loadImage) loads image files.

### Step 2C: Drawing the Background

**The Logic**: You need a function that draws the background image. The image should fill the entire canvas (like wallpaper covering a whole wall).

**Positioning Logic**: 
- Draw the image at position (0, 0) - the top-left corner
- Make it the full width and height of the canvas
- This makes it cover everything

**Your Task**: Create a function called `drawBackground()` that:
1. Takes a background image as input
2. Draws it covering the entire canvas

**Then**: In your `draw()` function, call `drawBackground()` BEFORE drawing text (order matters! Background first, then text on top).

**Visual Concept**: [SCHEMA PLACEHOLDER: Layer diagram showing background drawn first, then text on top]

**Documentation**: [`image()`](https://p5js.org/reference/#/p5/image) draws images.

**Test it!** You should see your background image displayed!

---

## Step 3: Creating Interactive Buttons

### Understanding Buttons

Buttons are interactive rectangles that respond to clicks. Think of buttons like light switches - you click them, and something happens.


### What Makes a Button Work?

A button needs four things:
1. **Position**: Where on the screen it appears (x and y coordinates)
2. **Size**: How big it is (width and height)
3. **Label**: Text that tells the user what it does
4. **Action**: What happens when you click it (a function to call)

**Real-world example**: A doorbell:
- Position: On your door (specific location)
- Size: The button plate
- Label: Maybe "Ring" written on it
- Action: Rings the bell when pressed

**Visual Concept**: [SCHEMA PLACEHOLDER: Diagram of a button showing x, y, width, height, and click area]

### Step 3A: Storing Button Information

**The Concept**: Each button is an object - a collection of related information. Think of it like a contact card that has a name, phone number, address, etc. Our button objects will have name, position, size, and action.

**Your Task**: Create button objects for:
- Two sound buttons (to play different sounds)
- Three background buttons (to switch backgrounds)

Each button should have:
- `name`: The text label (like "Sound 1" or "Background 1")
- `x`: Horizontal position
- `y`: Vertical position  
- `width`: How wide the button is
- `height`: How tall the button is
- `callback`: The function to call when clicked (you'll create these next)

**Positioning Logic**: Stack buttons vertically by giving them the same x position but different y positions. Space them about 50 pixels apart.

**Visual Concept**: [SCHEMA PLACEHOLDER: Layout diagram showing buttons stacked vertically with spacing]

### Step 3B: Drawing Buttons

**The Logic**: You need a function that draws any button. It should:
1. Draw a rectangle (the button shape)
2. Draw text in the center of the rectangle (the label)
3. Use colors that make it look like a button

**Your Task**: Create a function called `drawButton()` that:
1. Takes a button object as input
2. Draws a colored rectangle at the button's position
3. Draws the button's name text centered in the rectangle

**Then**: In your `draw()` function, call `drawButton()` for each button (after drawing background and text).

**Documentation**: 
- [`rect()`](https://p5js.org/reference/#/p5/rect) draws rectangles
- Remember to use `textAlign(CENTER, CENTER)` to center text in the button

**Test it!** You should see all your buttons displayed on the screen!

### Step 3C: Making Buttons Clickable

**The Concept**: You need to detect when the mouse is clicked and check if it's over a button. If it is, trigger that button's action.

**How it works**: 
1. User clicks the mouse
2. `mousePressed()` function runs (p5.js calls this automatically)
3. Check if the click coordinates are inside any button's rectangle
4. If yes, call that button's callback function

**Checking if Mouse is Over Button**: 
- Get mouse position (`mouseX` and `mouseY` are provided by p5.js)
- Check if mouseX is between button's left and right edges
- Check if mouseY is between button's top and bottom edges
- If both are true, the mouse is over the button!

**Visual Concept**: [SCHEMA PLACEHOLDER: Diagram showing mouse click detection with coordinates, showing how to check if point is inside rectangle]

**Your Task**: 
1. Create a function `isMouseOverButton()` that takes a button and returns `true` if the mouse is over it, `false` otherwise
2. In `mousePressed()`, check each button to see if it was clicked
3. If a button was clicked, call its callback function

**Documentation**: 
- [`mouseX`](https://p5js.org/reference/#/p5/mouseX) and [`mouseY`](https://p5js.org/reference/#/p5/mouseY) give mouse position
- [`mousePressed()`](https://p5js.org/reference/#/p5/mousePressed) is called when mouse is clicked

**Test it!** Click your buttons - they should respond (though they won't do anything yet because we haven't added the actions)!

---

## Step 4: Adding Sound Playback

### Understanding Sound in Code

Adding sound makes your jukebox truly interactive! In p5.js, sounds work similarly to images - you load them, store them, and play them when needed.

**Important**: Sound playback requires user interaction first (like a button click). Browsers require this to prevent websites from automatically playing annoying sounds.

**Real-world analogy**: Like a music player:
- You have a collection of songs (sound files)
- You select a song (click button)
- You press play (call a function)
- Music plays!

### Step 4A: Storing Sounds

**The Logic**: Similar to background images:
1. Create variables to store each sound file
2. Create a variable to track the currently playing sound (so you can stop it before playing a new one)

**Why track current sound?** This helps you stop the current sound before playing a new one. Otherwise, multiple sounds might play simultaneously (like having multiple radios on at once).

**Your Task**: Create variables for:
- Two sound files (`sound1`, `sound2`)
- One variable for the currently playing sound (`currentSound`)

Start them as `null`.

### Step 4B: Loading Sounds

**The Concept**: In `setup()`, load your sound files. Put them in the `assets` folder. Common formats: WAV, MP3, OGG.

**Your Task**: In `setup()`, load your sound files using `loadSound()`. The file path should be something like `'assets/sound1.wav'`.

**Then**: Set `currentSound` to the first sound initially.

**Documentation**: [`loadSound()`](https://p5js.org/reference/#/p5.sound/p5.SoundFile) loads sound files. Note: You need to include the p5.sound library!

### Step 4C: Creating Button Actions

**The Logic**: When a sound button is clicked, you need to:
1. Stop any currently playing sound (if one is playing)
2. Set the new sound as the current sound
3. Start playing it

**Real-world analogy**: Like a jukebox:
- You select a song (click button)
- The previous song stops (stop current sound)
- Your selected song starts playing (play new sound)

**Your Task**: Create handler functions for each sound button:
- `handleButton1Click()`: Stop current sound, set to sound1, play it
- `handleButton2Click()`: Stop current sound, set to sound2, play it

**Helper Function**: Create `stopCurrentSound()` that:
- Checks if `currentSound` exists (not null)
- If it does, calls `.stop()` on it

**Then**: Update your button objects to use these handler functions as their callbacks.

**Documentation**: 
- [`.stop()`](https://p5js.org/reference/#/p5.sound/p5.SoundFile/stop) stops sound playback
- [`.play()`](https://p5js.org/reference/#/p5.sound/p5.SoundFile/play) starts sound playback

**For background buttons**: Create similar handler functions that change `currentBackground` to different background images.

**Test it!** Click your buttons - sounds should play and backgrounds should change!

---

## Putting It All Together

### The Complete Flow

Here's how everything works together:

1. **Setup Phase** (`setup()` - runs once):
   - Creates canvas
   - Loads images and sounds
   - Initializes variables

2. **Draw Phase** (`draw()` - runs 60 times per second):
   - Draws background
   - Draws text
   - Draws buttons
   - Repeats continuously

3. **Interaction Phase** (`mousePressed()` - runs when clicked):
   - Detects mouse clicks
   - Checks which button was clicked
   - Calls appropriate callback
   - Callback changes state (sound/background)
   - Next draw cycle shows the changes

**Visual Concept**: [SCHEMA PLACEHOLDER: Flow diagram showing setup → draw loop → mouse interaction → state change → updated draw]

### Final Checklist

Before you finish, make sure:
- ✅ Text displays on screen
- ✅ Background images load and display
- ✅ Buttons are visible and positioned correctly
- ✅ Clicking sound buttons plays sounds
- ✅ Clicking background buttons changes backgrounds
- ✅ Only one sound plays at a time (previous stops when new starts)

### Congratulations!

You've built a fully functional interactive jukebox! You now understand:
- How to store and display information (variables)
- How to create reusable code (functions)
- How to respond to user interactions (events)
- How to work with images and sounds
- How to create interactive buttons

**What's Next?** 
- Try adding more sounds and backgrounds
- Change button colors and positions
- Modify the text message
- Experiment with different canvas sizes

**Ready for more?** In the next workshop, you'll learn how to make your code cleaner, more organized, and easier to extend. You'll also learn how to add your own custom content more easily!

---

## Resources and Help

**p5.js Documentation**: [p5js.org/reference](https://p5js.org/reference/)

**Key Functions You Used**:
- [`setup()`](https://p5js.org/reference/#/p5/setup) and [`draw()`](https://p5js.org/reference/#/p5/draw)
- [`createCanvas()`](https://p5js.org/reference/#/p5/createCanvas)
- [`text()`](https://p5js.org/reference/#/p5/text) and text styling functions
- [`image()`](https://p5js.org/reference/#/p5/image) and [`loadImage()`](https://p5js.org/reference/#/p5/loadImage)
- [`loadSound()`](https://p5js.org/reference/#/p5.sound/p5.SoundFile) and sound methods
- [`mousePressed()`](https://p5js.org/reference/#/p5/mousePressed), [`mouseX`](https://p5js.org/reference/#/p5/mouseX), [`mouseY`](https://p5js.org/reference/#/p5/mouseY)

**Common Issues**:
- **Sounds don't play?** Make sure you included the p5.sound library and that user interaction occurred first
- **Images don't show?** Check file paths are correct and files are in the `assets` folder
- **Buttons don't respond?** Verify your click detection logic and that callbacks are properly connected

Keep experimenting and having fun! 🎄🎵

