# Step-by-Step Guide: Creating a DJ Mixing Deck with p5.js

This guide walks you through creating a DJ mixing deck from scratch using p5.js. Each step builds upon the previous one, so follow the steps in order!

---

## Introduction: Understanding the Project

### What We're Building

A DJ mixing deck is a tool that lets you play multiple sounds simultaneously and control them independently. Our digital mixing deck will be an interactive web application that lets users:
- Play two different sounds at the same time
- Control each sound's volume independently
- Start and stop each sound with buttons
- Mix sounds together like a real DJ

**Real-world analogy**: Think of a professional DJ setup with two turntables. Each turntable can play a different record, and the DJ can control the volume of each one independently. Our digital version works similarly - two tracks, each with its own controls!

### Key Concepts

**Functions**: Functions are reusable blocks of code that perform a specific task. Think of them like recipes - you write the recipe once, then you can follow it (call the function) whenever you need it. In p5.js, `setup()` runs once when the program starts, and `draw()` runs continuously (60 times per second).

**Variables**: Variables are containers that store information. You give them a name (like `myName`) and assign a value to them (like `"Alice"`). Variables can store different types of data: text (strings), numbers, true/false values (booleans), and more.

**Objects**: Objects are collections of related data grouped together. Think of a contact card - it has a name, phone number, address, etc. In our mixing deck, each track is an object that contains everything related to that track: its sound, volume, play state, button, and slider.

**Properties**: Properties are pieces of information stored in an object. Like a person's height, weight, and name are properties of a person object. Our track objects have properties like `sound`, `volume`, and `isPlaying`.

**Object-Oriented Thinking**: Instead of having separate variables scattered around, we organize related data into objects. This makes code easier to understand and maintain.

### Explaining Concepts to Beginners

When teaching this workshop to absolute beginners, you may need to explain:

**Functions**: "A function is like a recipe. You write the steps once, then you can use that recipe (call the function) whenever you need it. `setup()` is a special recipe that runs once when your program starts. `draw()` is a recipe that runs over and over again."

**Variables**: "A variable is like a labeled box. You put a label on it (the variable name) and put something inside (the value). Later, you can change what's inside, but the label stays the same."

**Objects**: "An object is like a filing cabinet with multiple drawers. Each drawer has a label (property name) and contains something (property value). All the drawers belong to one filing cabinet (object)."

**Properties**: "A property is one drawer in the filing cabinet. It has a label (the property name) and contains something (the property value)."

---

## Step 1: Creating Track Objects

### Understanding Objects

An object is a way to group related information together. Instead of having separate variables like `sound1`, `volume1`, `isPlaying1`, `button1`, we put everything related to track 1 in one object called `track1`.

**Why use objects?**
- Keeps related data organized
- Makes code easier to understand
- Makes code easier to maintain
- Professional developers use this approach

### Step 1 (A): Creating Your First Track Object

We need to create an object that stores everything about track 1. Here's what a track needs:

```javascript
let track1 = {
    sound: null,
    volume: 0.5,
    isPlaying: false,
    slider: null,
    button: null,
    sliderPosition: {
        x: 150,
        y: 350
    },
    buttonPosition: {
        x: 150,
        y: 200
    },
    buttonLabel: "Track 1"
};
```

**Understanding the code**:
- `let track1 = { ... }` creates an object called `track1`
- `sound: null` - we'll load the sound file here later
- `volume: 0.5` - volume level (0.5 = 50%, which is half volume)
- `isPlaying: false` - whether the track is currently playing
- `slider: null` - we'll create the slider later
- `button: null` - we'll create the button later
- `sliderPosition: { x: 150, y: 350 }` - where the slider will be positioned
- `buttonPosition: { x: 150, y: 200 }` - where the button will be positioned
- `buttonLabel: "Track 1"` - text to display on button

**Why separate position objects?** It keeps the position organized in the track object, making it easy to change later. It's like having labeled drawers in a filing cabinet - each drawer (position) has a clear purpose.

### Step 1 (B): Creating Your Second Track Object

Now create a second track object with the same structure:

```javascript
let track2 = {
    sound: null,
    volume: 0.5,
    isPlaying: false,
    slider: null,
    button: null,
    sliderPosition: {
        x: 450,
        y: 350
    },
    buttonPosition: {
        x: 450,
        y: 200
    },
    buttonLabel: "Track 2"
};
```

**Positioning Logic**: 
- Track 1 button at x: 150
- Track 2 button at x: 450
- Same y position (200) so they're on the same row
- This places them side by side

**Visual Concept**: [SCHEMA PLACEHOLDER: Layout diagram showing two buttons side by side]

**Test it!** You won't see anything yet, but your objects are created. Check the console for any errors.

---

## Step 2: Loading Sounds

### Understanding Sound Loading

Sounds need to be loaded before you can play them. In p5.js, we use the `preload()` function to load sounds before the program starts.

**Why preload()?**
- It runs before `setup()`, ensuring sounds are ready
- It prevents errors from trying to play sounds that aren't loaded
- It's the standard way to load assets in p5.js


### Step 2 (A): Loading Sounds in preload()

The `preload()` function runs automatically before `setup()`. This is where we load our sound files:

```javascript
function preload() {
    track1.sound = loadSound('assets/sound1.wav');
    track2.sound = loadSound('assets/sound2.wav');
}
```

**Understanding the code**:
- [`loadSound('assets/sound1.wav')`](https://p5js.org/reference/#/p5.sound/p5.SoundFile) loads the sound file
- `track1.sound = ...` stores the loaded sound in the track1 object
- The path `'assets/sound1.wav'` means the file is in the `assets` folder

**File organization**: Put your sound files in an `assets` folder in your project. Common formats: WAV, MP3, OGG.

**Documentation**: [`loadSound()`](https://p5js.org/reference/#/p5.sound/p5.SoundFile) loads sound files. Note: You need to include the p5.sound library!

### Step 2 (B): Setting Initial Volume in setup()

After creating the canvas, set the initial volume for both tracks:

```javascript
function setup() {
    createCanvas(800, 600);
    
    // Set initial volume
    track1.sound.setVolume(track1.volume);
    track2.sound.setVolume(track2.volume);
}
```

**Understanding the code**:
- [`setVolume()`](https://p5js.org/reference/#/p5.sound/p5.SoundFile/setVolume) sets the volume of a sound
- `track1.volume` is 0.5 (50%), so the sound starts at half volume
- We do this so sounds are ready to play at the correct volume

**Test it!** The sounds should load without errors. Check the console if something goes wrong.

---

## Step 3: Creating Buttons

### Understanding Buttons

Buttons are interactive elements that respond to clicks. In p5.js, you can create buttons using `createButton()`, which automatically handles click detection for you.

**What makes a button work?**
- Position: where it appears on screen
- Label: text that tells the user what it does
- Click handler: what happens when you click it

**Real-world example**: A light switch:
- Position: on the wall (specific location)
- Label: maybe "Kitchen Light" or "Living Room Light" written on it
- Action: turns lights on/off when pressed

### Step 3 (A): Creating Buttons with createButton()

In p5.js, you can create buttons using `createButton()`. This creates an HTML button element that automatically handles clicks. Add this to your `setup()` function:

```javascript
function setup() {
    createCanvas(800, 600);
    
    // Create play button for track 1
    track1.button = createButton(track1.buttonLabel);
    track1.button.position(track1.buttonPosition.x, track1.buttonPosition.y);
    
    // Create play button for track 2
    track2.button = createButton(track2.buttonLabel);
    track2.button.position(track2.buttonPosition.x, track2.buttonPosition.y);
    
    // Set initial volume
    track1.sound.setVolume(track1.volume);
    track2.sound.setVolume(track2.volume);
}
```

**Understanding the code**:
- [`createButton(track1.buttonLabel)`](https://p5js.org/reference/#/p5/createButton) creates a button with the label text
- `track1.button = ...` stores the button in the track1 object
- [`position(x, y)`](https://p5js.org/reference/#/p5.Element/position) places the button on screen
- `track1.buttonPosition.x` and `track1.buttonPosition.y` use the position from the track object

**Why use createButton()?** 
- It's simpler than drawing buttons manually
- It automatically handles click detection
- It creates a real HTML button that users can interact with

**Visual Concept**: [SCHEMA PLACEHOLDER: Diagram showing button creation and positioning]

**Documentation**: [`createButton()`](https://p5js.org/reference/#/p5/createButton) creates a button element.

**Test it!** You should see two buttons displayed on the screen!

---

## Step 4: Creating Volume Sliders

### Understanding Sliders

Sliders are controls that let users adjust a value by dragging. Each track needs its own slider to control its volume.

**What makes a slider work?**
- A range of values (minimum and maximum)
- A current value (where the slider is positioned)
- A position on screen (where it appears)

**Real-world example**: A volume knob on a stereo:
- Range: from silent (0) to maximum (100%)
- Current value: where the knob is turned
- Position: on the stereo control panel

### Step 4 (A): Creating Sliders in setup()

In p5.js, you create sliders using `createSlider()`. Add this to your `setup()` function after creating the buttons:

```javascript
function setup() {
    createCanvas(800, 600);
    
    // Create play button for track 1
    track1.button = createButton(track1.buttonLabel);
    track1.button.position(track1.buttonPosition.x, track1.buttonPosition.y);
    
    // Create play button for track 2
    track2.button = createButton(track2.buttonLabel);
    track2.button.position(track2.buttonPosition.x, track2.buttonPosition.y);
    
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
```

**Understanding the code**:
- [`createSlider(0, 100, 50)`](https://p5js.org/reference/#/p5/createSlider) creates a slider
  - `0` = minimum value
  - `100` = maximum value
  - `50` = starting value (50%)
- `track1.slider = ...` stores the slider in the track1 object
- [`position(100, 350)`](https://p5js.org/reference/#/p5.Element/position) places the slider on screen
- Position track2's slider at (550, 350) to place it below track2's button

**Visual Concept**: [SCHEMA PLACEHOLDER: Layout diagram showing buttons and sliders positioned for each track]

**Documentation**: [`createSlider()`](https://p5js.org/reference/#/p5/createSlider) creates a slider element.

**Test it!** You should see two sliders on the screen that you can drag!

### Step 4 (B): Adding Volume Labels

Users need to know what the sliders control. Add labels in your `draw()` function:

```javascript
function draw() {
    background(255);
    
    // Draw title
    fill(0);
    textAlign(CENTER);
    text("DJ Mixing Deck", width/2, 50);
    
    // Draw buttons
    drawButton(track1.button);
    drawButton(track2.button);
    
    // Draw volume labels
    fill(0);
    textAlign(CENTER);
    text("Volume", 175, 330);
    text("Volume", 625, 330);
}
```

**Understanding the code**:
- `text("Volume", 175, 330)` draws "Volume" above track1's slider
- `text("Volume", 625, 330)` draws "Volume" above track2's slider
- Position them centered above their respective sliders

**Test it!** You should see "Volume" labels above each slider!

---

## Step 5: Play/Pause Functionality

### Understanding Toggle Logic

A toggle switches between two states. For play/pause:
- If playing → pause it
- If not playing → play it

**Real-world analogy**: A light switch:
- If light is on → turn it off
- If light is off → turn it on

### Step 5 (A): Creating the toggleTrack() Function

Create a function that toggles a track's play state:

```javascript
function toggleTrack(track) {
    // If playing, pause it
    if (track.sound.isPlaying()) {
        track.sound.pause();
        track.isPlaying = false;
    } 
    // If not playing, play it
    else {
        track.sound.setVolume(track.volume);
        track.sound.setLoop(true);
        track.sound.play();
        track.isPlaying = true;
    }
}
```

**Understanding the code**:
- `function toggleTrack(track)` - takes a track object as input
- [`track.sound.isPlaying()`](https://p5js.org/reference/#/p5.sound/p5.SoundFile/isPlaying) checks if sound is playing
- If playing:
  - [`pause()`](https://p5js.org/reference/#/p5.sound/p5.SoundFile/pause) stops playback
  - `track.isPlaying = false` updates our state
- If not playing:
  - [`setVolume(track.volume)`](https://p5js.org/reference/#/p5.sound/p5.SoundFile/setVolume) sets volume
  - [`setLoop(true)`](https://p5js.org/reference/#/p5.sound/p5.SoundFile/setLoop) makes it loop
  - [`play()`](https://p5js.org/reference/#/p5.sound/p5.SoundFile/play) starts playback
  - `track.isPlaying = true` updates our state

**Documentation**: 
- [`.isPlaying()`](https://p5js.org/reference/#/p5.sound/p5.SoundFile/isPlaying) checks if sound is playing
- [`.pause()`](https://p5js.org/reference/#/p5.sound/p5.SoundFile/pause) pauses sound
- [`.play()`](https://p5js.org/reference/#/p5.sound/p5.SoundFile/play) plays sound
- [`.setLoop()`](https://p5js.org/reference/#/p5.sound/p5.SoundFile/setLoop) makes sound loop

### Step 5 (B): Connecting Buttons to Toggle Function

When you create buttons with `createButton()`, you connect them to functions using `.mousePressed()`. This automatically handles click detection for you. Update your `setup()` function:

```javascript
function setup() {
    createCanvas(800, 600);
    
    // Create play button for track 1
    track1.button = createButton(track1.buttonLabel);
    track1.button.position(track1.buttonPosition.x, track1.buttonPosition.y);
    track1.button.mousePressed(function() {
        toggleTrack(track1);
    });
    
    // Create play button for track 2
    track2.button = createButton(track2.buttonLabel);
    track2.button.position(track2.buttonPosition.x, track2.buttonPosition.y);
    track2.button.mousePressed(function() {
        toggleTrack(track2);
    });
    
    // ... (rest of setup code)
}
```

**Understanding the code**:
- [`createButton()`](https://p5js.org/reference/#/p5/createButton) creates the button
- [`position()`](https://p5js.org/reference/#/p5.Element/position) places it on screen
- [`.mousePressed(function() { ... })`](https://p5js.org/reference/#/p5.Element/mousePressed) connects a function to button clicks
- When the button is clicked, it automatically calls `toggleTrack(track1)` or `toggleTrack(track2)`

**Why this works?** The `.mousePressed()` method automatically detects when the button is clicked and calls your function. No need to check mouse coordinates manually!

**Visual Concept**: [SCHEMA PLACEHOLDER: Diagram showing button connection with mousePressed callback]

**Documentation**: [`.mousePressed()`](https://p5js.org/reference/#/p5.Element/mousePressed) connects a function to button clicks.

**Test it!** Click the buttons - sounds should play and pause!

---

## Step 6: Volume Control

### Understanding Real-Time Updates

Volume needs to update continuously as the user moves the slider. This happens in the `draw()` function, which runs many times per second.

**The Logic**: 
1. Read the slider's current value
2. Convert it to a volume (0.0 to 1.0)
3. Apply it to the sound if it's playing

### Step 6 (A): Reading Slider Values

Sliders return values from 0 to 100, but sounds need values from 0.0 to 1.0. Update your `draw()` function:

```javascript
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
}
```

**Understanding the code**:
- [`track1.slider.value()`](https://p5js.org/reference/#/p5.Element/value) gets the slider's current value (0-100)
- Dividing by 100 converts it to 0.0-1.0 (so 50 becomes 0.5)
- `track1.volume = ...` stores the updated volume
- This runs every frame, so volume updates in real-time

**Why divide by 100?** Sliders use 0-100 (percentage), but sounds use 0.0-1.0 (decimal). Dividing converts between them.

### Step 6 (B): Applying Volume to Playing Sounds

Now apply the volume to sounds that are currently playing:

```javascript
function draw() {
    background(255);
    
    // ... (all the drawing code from before) ...
    
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
```

**Understanding the code**:
- Check if each track's sound is playing
- If playing, update its volume using `setVolume()`
- This happens every frame, so volume changes smoothly as you move the slider

**Why check if playing?** No need to update volume if the sound isn't playing.

**Test it!** Move the sliders while sounds are playing - the volume should change in real-time!

---

## Putting It All Together

### The Complete Flow

Your mixing deck should now work like this:

1. **preload()**: Load sound files into track objects
2. **setup()**: 
   - Create canvas
   - Create sliders
   - Set initial volume
3. **draw()** (runs continuously):
   - Draw title
   - Draw buttons
   - Draw volume labels
   - Update volume from sliders
   - Apply volume to playing sounds
4. **mousePressed()**: When button clicked, toggle that track

**Visual Concept**: [SCHEMA PLACEHOLDER: Flow diagram showing the complete program flow]

### Testing Your Mixing Deck

Test each feature:
- ✅ Click track1 button → sound1 plays
- ✅ Click track1 button again → sound1 pauses
- ✅ Click track2 button → sound2 plays
- ✅ Both tracks can play at the same time (mixing!)
- ✅ Move track1 slider → track1 volume changes
- ✅ Move track2 slider → track2 volume changes
- ✅ Sounds loop continuously

### Troubleshooting

**No sound?**
- Check that p5.sound library is included
- Check that sound files are in the `assets` folder
- Check browser console for errors

**Buttons don't work?**
- Check that click detection logic is correct
- Check button positions match your click detection
- Add `console.log()` to see if `mousePressed()` is being called

**Volume doesn't change?**
- Check that you're reading slider values in `draw()`
- Check that you're applying volume to playing sounds
- Check that volume conversion (divide by 100) is correct

---

## Customization Ideas

Now that your mixing deck works, try customizing it:

- **Change button positions and sizes**
- **Change slider positions**
- **Add a title or labels**
- **Change colors**
- **Add more tracks**
- **Add visual feedback when tracks are playing**

**Remember**: Experimentation is how you learn! Try things, see what happens, and learn from it.

---

## Congratulations!

You've built a functional DJ mixing deck! You've learned:
- How to organize code using objects
- How to load and play multiple sounds
- How to create interactive buttons
- How to create and use sliders
- How to control volume in real-time
- How to mix sounds together

These concepts will help you build even more complex interactive applications!

