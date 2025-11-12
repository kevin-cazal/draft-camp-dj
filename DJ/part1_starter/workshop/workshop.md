# Workshop: Building a DJ Mixing Deck

Welcome to the DJ Mixing Deck workshop! By the end of this session, you'll have created a fully functional mixing deck where you can play two sounds simultaneously, control their volumes independently, and mix them together - just like a real DJ!

---

## Introduction: What We're Building

Imagine you're a DJ at a party. You have two turntables (or decks) in front of you. Each deck can play a different song, and you can control the volume of each one independently. You can start and stop each track, and mix them together to create a unique sound. That's exactly what we're building - but digital!

**Your mixing deck will:**
- Have two tracks that can play sounds
- Each track has its own play/pause button
- Each track has its own volume slider
- Both tracks can play at the same time (mixing!)
- Sounds play in a loop

**Real-world connection**: This is similar to how professional DJ software works - multiple tracks, independent controls, and the ability to mix sounds together. Once you understand these concepts, you can apply them to create more complex audio applications!

### Getting Started: Bootstrap Code

Before we begin, you need a starting point. Here's the minimal code to get your project running:

```javascript
function setup() {
    createCanvas(800, 600);
}

function draw() {
    background(255);
}
```

**Understanding setup() and draw()**: These are two special functions in p5.js that work together:

- **`setup()`** - This function runs **once** at the very beginning when your program starts. It's like setting up your workspace before you start working. Here, it creates your canvas (your drawing area). Use `setup()` for things that only need to happen once: creating the canvas, loading initial settings, creating buttons and sliders.

- **`draw()`** - This function runs **endlessly** (60 times per second, continuously). It's like a loop that never stops. Every frame, p5.js calls `draw()` to update and display everything on screen. Use `draw()` for things that need to happen repeatedly: drawing shapes, updating positions, checking for changes, reading slider values.

**Think of it like this**: 
- `setup()` = "Get everything ready" (happens once)
- `draw()` = "Keep updating and showing things" (happens forever)

**What this code does:**
- `setup()` creates your canvas (your drawing area) - runs once when the program starts
- `draw()` sets the background color to white - runs continuously, refreshing the screen 60 times per second

**Understanding Functions**: The code above uses **functions** - these are like recipes that contain instructions. `setup()` and `draw()` are special functions that p5.js calls automatically. We'll create our own functions later in this project!

**Documentation**: Learn more about [`setup()`](https://p5js.org/reference/#/p5/setup) and [`draw()`](https://p5js.org/reference/#/p5/draw) in the p5.js documentation.

---

## Understanding the Big Picture

Before we start coding, let's understand how everything fits together:

### The Key Concept: Objects

In this project, we're going to use **objects** to organize our code. 

**What is an object?** An object is like a filing cabinet with multiple drawers. Each drawer (called a "property") has a label and stores something specific. All the drawers belong to one filing cabinet (the object).

All of this information belongs together because it's all about ONE track. That's why we put it all in ONE object!

**Visual Concept**: [SCHEMA PLACEHOLDER: Diagram showing a Track object with all its properties: sound, volume, isPlaying, button, slider]

Think of it like a recipe card:
- **Object** = the recipe card
- **Properties** = the ingredients and instructions on the card
- Each track is a separate recipe card with its own ingredients

---

## Step 1: Creating Track Objects

### Understanding Objects

An object is a way to group related information together. Instead of having separate variables scattered around, we put everything related to one track in one place.

**Why use objects?** 
- It keeps related data organized
- It makes code easier to understand
- It makes code easier to maintain
- It's how professional developers organize code


### Step 1A: Creating Your First Track Object

**Understanding Variables and Objects**: Before we create the object, let's understand what we're doing:
- A **variable** is like a labeled box that stores information. We'll create a variable called `track1` to store our track information.
- An **object** is a collection of related information grouped together. Instead of having separate variables like `track1Sound`, `track1Volume`, etc., we put everything about track 1 in one object.
- A **property** is one piece of information stored in an object. Each property has a name (like `volume`) and a value (like `0.5`).

**The Concept**: Each track needs to store:
- The sound file it will play
- The current volume (0.0 to 1.0)
- Whether it's currently playing (true/false)
- A slider to control volume (we'll create this later)
- A button to play/pause (we'll create this later)

**What you need to do**: Create an object called `track1` that contains all these properties. Here's the code:

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
- `sound: null` - we'll load the sound file here later
- `volume: 0.5` - 50% volume (half volume)
- `isPlaying: false` - not playing yet
- `slider: null` - we'll create the slider later
- `button: null` - we'll create the button later
- `sliderPosition` and `buttonPosition` - where these will appear on screen
- `buttonLabel` - text to display on the button

**Why these properties?** Each property stores one piece of information about the track. By putting them all in one object, we can easily access everything related to track 1.

**Visual Concept**: [SCHEMA PLACEHOLDER: Diagram showing the structure of track1 object with nested button object]

**Documentation**: Learn about [JavaScript objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects).

### Step 1B: Creating Your Second Track Object

**The Logic**: You need two tracks for mixing, so you need two track objects. They'll have the same structure, but different values.

**What you need to do**: Create a second object called `track2` with the same structure as `track1`, but with different values:

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

**Understanding the code**:
- Same structure as `track1`, but:
- `buttonPosition.x` is 450 (instead of 150) - places it to the right
- `sliderPosition.x` is 450 (instead of 150) - places slider to the right
- `buttonLabel` is "Track 2" (instead of "Track 1")

**Positioning Logic**: To place buttons side by side, give them different x positions but the same y position. Think of it like placing two items on the same shelf - they're at the same height (y), but different horizontal positions (x).

**Visual Concept**: [SCHEMA PLACEHOLDER: Layout diagram showing two track buttons side by side]

**Test it!** You won't see anything yet, but your objects are created. Check the console for any errors.

---

## Step 2: Loading Sounds

### Understanding Sound Loading

Sounds need to be loaded before you can play them. In p5.js, we use the `preload()` function to load sounds before the program starts.

**Understanding the preload() function**: `preload()` is a special function in p5.js that runs automatically before `setup()`. It's designed to load files (like images and sounds) so they're ready when your program starts. Think of it like preparing ingredients before cooking - you gather everything you need first, then you can use them.

**Why preload()?** 
- It ensures sounds are ready before we try to use them
- It runs before `setup()`, so everything is loaded when the program starts
- It prevents errors from trying to play sounds that aren't loaded yet


### Step 2A: Loading Sounds into Track Objects

**The Concept**: In `preload()`, you need to load each sound file and assign it to the track's `sound` property. This connects the sound file to the track object.

**Where do sounds go?** Put your sound files in an `assets` folder in your project. Common formats: WAV, MP3, OGG.

**What you need to do**: In `preload()`, load two sound files and assign them to the track objects:

```javascript
function preload() {
    track1.sound = loadSound('assets/sound1.wav');
    track2.sound = loadSound('assets/sound2.wav');
}
```

**Understanding the code**:
- `preload()` runs automatically before `setup()`
- `loadSound('assets/sound1.wav')` loads the sound file
- `track1.sound = ...` stores it in the track object
- Replace `'assets/sound1.wav'` and `'assets/sound2.wav'` with your actual sound file names

**The process**: Think of it like this - you're telling p5.js "go get this sound file and store it in the track object so we can use it later."

**Documentation**: [`loadSound()`](https://p5js.org/reference/#/p5.sound/p5.SoundFile) loads sound files. Note: You need to include the p5.sound library!

**Test it!** The sounds should load without errors. Check the console if something goes wrong.

### Step 2B: Setting Initial Volume

**The Logic**: When sounds are loaded, you should set their initial volume so they're ready to play at the correct level.

**Why in `setup()`?** Remember, `setup()` runs once at the beginning. This is perfect for setting initial values that only need to happen once - like setting the starting volume. We don't need to set the volume 60 times per second, just once when the program starts!

**What you need to do**: In `setup()`, after creating the canvas, set the volume for both tracks:

```javascript
function setup() {
    createCanvas(800, 600);
    
    // Set initial volume
    track1.sound.setVolume(track1.volume);
    track2.sound.setVolume(track2.volume);
}
```

**Understanding the code**:
- `track1.sound.setVolume(track1.volume)` sets the volume
- `track1.volume` is 0.5 (50%), so the sound starts at half volume
- We do this so sounds are ready to play at the correct level

**Why?** This ensures the sounds start at the correct volume level when they're first played.

**The process**: For each track, take the volume value from the track object and apply it to the sound. This connects the volume setting to the actual sound playback.

**Documentation**: [`.setVolume()`](https://p5js.org/reference/#/p5.sound/p5.SoundFile/setVolume) sets the volume of a sound.

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

### Step 3A: Creating Buttons with createButton()

**Why in `setup()`?** Buttons are created once and stay on screen. Since `setup()` runs once at the beginning, it's the perfect place to create all your buttons. You don't want to create new buttons 60 times per second in `draw()` - that would create thousands of buttons!

**The Logic**: In p5.js, you can create buttons using `createButton()`. This creates an HTML button element that automatically handles clicks - you don't need to manually check if the mouse clicked on the button!

**What you need to do**: In `setup()`, after creating the canvas, create buttons for each track:

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
- `createButton(track1.buttonLabel)` creates a button with the label text
- `track1.button = ...` stores the button in the track object
- `position(x, y)` places the button on screen
- We use the position coordinates from the track object

**Why use createButton()?** 
- It's simpler than drawing buttons manually
- It automatically handles click detection
- It creates a real HTML button that users can interact with

**The connection**: When you connect a button to a function, you're saying "when this button is clicked, run this function." The function will receive information about which track to control.

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

### Step 4A: Creating Sliders

**Why in `setup()`?** Just like buttons, sliders are created once and stay on screen. Since `setup()` runs once at the beginning, it's the perfect place to create all your sliders. We'll read their values in `draw()` (which runs continuously), but we only create them once in `setup()`.

**The Concept**: In p5.js, you create sliders using `createSlider()`. Each track needs its own slider.

**What you need to do**: In `setup()`, after creating the buttons, create sliders for each track:

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
- `createSlider(0, 100, 50)` creates a slider from 0 to 100, starting at 50
- `0` = minimum value (0% volume)
- `100` = maximum value (100% volume)
- `50` = starting value (50% volume)
- `position(x, y)` places the slider on screen

**Why these values?** 
- 0 to 100 represents 0% to 100% volume (easy for users to understand)
- Starting at 50 means the slider begins at 50% volume (half volume)
- We'll convert this to 0.0-1.0 later when applying it to the sound

**Why use sliderPosition?** It keeps the position organized in the track object, making it easy to change later. It's like having the address written down - you can find it easily!

**Visual Concept**: [SCHEMA PLACEHOLDER: Layout diagram showing buttons and sliders positioned for each track]

**Documentation**: [`createSlider()`](https://p5js.org/reference/#/p5/createSlider) creates a slider element.

**Test it!** You should see two sliders on the screen that you can drag!

### Step 4B: Adding Volume Labels

**Why in `draw()`?** Labels are drawn on the canvas, and anything drawn on the canvas needs to be in `draw()` because `draw()` runs continuously to refresh the screen. If you draw text in `setup()`, it would only appear once and might get covered by the background. In `draw()`, the labels are redrawn every frame, so they always stay visible.

**The Logic**: Users need to know what the sliders control. Adding labels makes the interface clearer.

**What you need to do**: In your `draw()` function, draw text labels above each slider:

```javascript
function draw() {
    background(255);
    
    // Draw volume labels
    fill(0);
    textAlign(CENTER);
    text("Volume", 175, 330);
    text("Volume", 625, 330);
}
```

**Understanding the code**:
- `fill(0)` sets text color to black
- `textAlign(CENTER)` centers the text
- `text("Volume", x, y)` draws the text at position (x, y)
- Position labels just above each slider

**The process**: Think about where each slider is positioned, then place the label slightly above it. You'll use the same x coordinate as the slider, but a slightly smaller y coordinate (higher up on the screen).

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

### Step 5A: Creating the Toggle Function

**The Logic**: You need a function that toggles a track's play state. This function should work for any track, so it takes a track object as input.

**What you need to do**: Create a function that toggles the track:

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
- `track.sound.isPlaying()` - checks if the sound is currently playing
- If playing: `pause()` stops it, set `isPlaying = false`
- If not playing: set volume, set loop, `play()` starts it, set `isPlaying = true`

**Why check the state first?** Because we need to know what to do - if it's playing, we pause it; if it's not playing, we play it. This is the "toggle" logic - switching between two states.

**The order matters**: Make sure to set the volume and loop settings before playing, so the sound starts with the correct settings.

**Documentation**: 
- [`.isPlaying()`](https://p5js.org/reference/#/p5.sound/p5.SoundFile/isPlaying) checks if sound is playing
- [`.pause()`](https://p5js.org/reference/#/p5.sound/p5.SoundFile/pause) pauses sound
- [`.play()`](https://p5js.org/reference/#/p5.sound/p5.SoundFile/play) plays sound
- [`.setLoop()`](https://p5js.org/reference/#/p5.sound/p5.SoundFile/setLoop) makes sound loop

### Step 5B: Connecting Buttons to Toggle Function

**The Logic**: When you create buttons with `createButton()`, you connect them to functions using `.mousePressed()`. This automatically handles click detection for you.

**What you need to do**: When creating buttons in `setup()`, connect each button to the toggle function:

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
    
    // ... rest of setup code ...
}
```

**Understanding the code**:
- `.mousePressed(function() { ... })` connects a function to button clicks
- When the button is clicked, it calls `toggleTrack(track1)` or `toggleTrack(track2)`
- The function receives the track object, so it knows which track to control

**Why this works?** The `.mousePressed()` method automatically detects when the button is clicked and calls your function. No need to check mouse coordinates manually! It's like the button "knows" when it's been clicked.

**The connection**: Think of it like this - the button is connected to the toggle function, and when clicked, it passes the track object to the function. This way, the function knows which track to control.

**Visual Concept**: [SCHEMA PLACEHOLDER: Diagram showing button connection with mousePressed callback]

**Documentation**: [`.mousePressed()`](https://p5js.org/reference/#/p5.Element/mousePressed) connects a function to button clicks.

**Test it!** Click the buttons - sounds should play and pause!

---

## Step 6: Volume Control

### Understanding Real-Time Updates

Volume needs to update continuously as the user moves the slider. This happens in the `draw()` function, which runs many times per second.

**Why use `draw()` for this?** Remember, `draw()` runs endlessly (60 times per second). This makes it perfect for checking things that change continuously, like slider positions. Every frame, we check the slider value and update the volume. This creates smooth, real-time control - as you move the slider, the volume changes immediately!

**The Logic**: 
1. Read the slider's current value (in `draw()` - runs continuously)
2. Convert it to a volume (0.0 to 1.0)
3. Apply it to the sound if it's playing

### Step 6A: Reading Slider Values

**The Concept**: Sliders return values from 0 to 100, but sounds need values from 0.0 to 1.0. You need to convert between these two scales.

**What you need to do**: In your `draw()` function, read each track's slider value and convert it to a volume:

```javascript
function draw() {
    background(255);
    
    // Draw volume labels
    fill(0);
    textAlign(CENTER);
    text("Volume", 175, 330);
    text("Volume", 625, 330);
    
    // Update volume from sliders
    track1.volume = track1.slider.value() / 100;
    track2.volume = track2.slider.value() / 100;
}
```

**Understanding the code**:
- `track1.slider.value()` gets the slider value (0-100)
- Dividing by 100 converts it to 0.0-1.0 (so 50 becomes 0.5)
- `track1.volume = ...` stores the updated volume

**Why divide by 100?** 
- Sliders use 0-100 (percentage) - this is intuitive for users (50 = 50%)
- Sounds use 0.0-1.0 (decimal) - this is what the sound library expects
- Dividing by 100 converts between them: 50 ÷ 100 = 0.5

**The process**: For each track, read the slider value, divide by 100, and store it in the track's volume property. This happens every frame, so the volume updates in real-time as the user moves the slider.

### Step 6B: Applying Volume to Playing Sounds

**The Logic**: Only update volume for sounds that are currently playing. There's no point updating the volume of a sound that isn't playing.

**What you need to do**: In your `draw()` function, after updating the volume values from the sliders, apply volume to playing sounds:

```javascript
function draw() {
    background(255);
    
    // Draw volume labels
    fill(0);
    textAlign(CENTER);
    text("Volume", 175, 330);
    text("Volume", 625, 330);
    
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
- `track1.sound.isPlaying()` checks if the sound is currently playing
- If playing, `setVolume(track1.volume)` applies the new volume
- This happens every frame, so volume changes smoothly as you move the slider

**Why check if playing?** 
- If a sound isn't playing, there's no need to update its volume
- It's more efficient to only update when necessary
- When the sound starts playing later, it will use the current volume setting

**The process**: For each track, check if the sound is playing. If yes, take the volume value you just calculated and apply it to the sound. This makes the volume change smoothly as you move the slider.

**Test it!** Move the sliders while sounds are playing - the volume should change in real-time!

---

## Putting It All Together

### The Complete Flow

Your mixing deck should now work like this:

1. **Setup**: Load sounds, create buttons and sliders, set initial volume
2. **Draw Loop** (runs continuously): 
   - Draw any visual elements (labels, etc.)
   - Read slider values and convert to volume
   - Apply volume to playing sounds
3. **Click Detection**: When a button is clicked, toggle that track's play state

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
