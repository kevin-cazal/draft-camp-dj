# Step-by-Step Guide: Advanced DJ Features

This guide walks you through adding advanced features to your DJ mixing deck: time sliders, crossfader, and BPM visualization.

**Prerequisites**: This workshop assumes you have completed Part 2: Customization, which includes file uploads, mobile support, and basic helper functions.

---

## Introduction: Understanding Advanced Features

### What We're Adding

We're going to add professional DJ features:
- **Time sliders**: Jump to any position in a track
- **Time display**: Show elapsed and total time in MM:SS format
- **Crossfader**: Smoothly transition between tracks using trigonometry
- **BPM visualization**: Pulsating circles that react to the beat


### Key Concepts

**Time Control**: Being able to jump to any position in a track is essential for DJs. It lets them cue up tracks, skip intros, and find specific sections.

**Crossfading**: Smoothly transitioning between tracks is what makes a good DJ mix. The crossfader lets you blend tracks together.

**Audio Analysis**: Reading the amplitude (loudness) of audio lets us visualize the beat and rhythm of music.

**Code Organization**: Breaking code into small functions makes it easier to understand, test, and maintain.

---

## Step 1: Adding Time Sliders

### What Are Time Sliders?

Time sliders let you jump to any position in a track. They're like the progress bar in a video player - you can click anywhere to jump to that point.

**The Logic**:
1. Add properties to track objects for the time slider
2. Create the slider in `setupTrackSliders()`
3. Update the slider position as the track plays
4. When the slider is moved, jump to that position

### Step 1 (A): Adding Time Slider Properties

In both `track1` and `track2` objects, add these properties:

```javascript
let track1 = {
    // ... existing properties ...
    timeSlider: null,
    timeSliderPosition: {
        x: 0,
        y: 0
    },
    isDraggingTime: false
};
```

**Understanding the code**:
- `timeSlider: null` - stores the slider element (created later)
- `timeSliderPosition` - stores the x and y position
- `isDraggingTime: false` - tracks if user is dragging the slider

**Why these properties?** Just like `slider` and `sliderPosition` for volume, we need to store the time slider and its position.

### Step 1 (B): Creating Time Sliders

Update your `setupTrackSliders()` function to also create a time slider:

```javascript
function setupTrackSliders(track) {
    // Volume slider (existing code)
    track.slider = createSlider(0, 100, 50);
    track.slider.position(track.sliderPosition.x, track.sliderPosition.y);
    
    // NEW: Time slider
    track.timeSlider = createSlider(0, 100, 0);
    track.timeSlider.position(track.timeSliderPosition.x, track.timeSliderPosition.y);
    track.timeSlider.style('width', '150px');
    track.timeSlider.input(function() {
        let soundDuration = track.sound.duration();
        let targetTime = (track.timeSlider.value() / 100) * soundDuration;
        track.sound.jump(targetTime);
    });
}
```

**Understanding the code**:
- `createSlider(0, 100, 0)` - creates a slider from 0% to 100%, starting at 0%
  - 0% = beginning of track
  - 100% = end of track
- `.position()` - places the slider at the calculated position
- `.style('width', '150px')` - makes the slider 150 pixels wide
- `.input(function() { ... })` - runs when the slider is moved
  - `track.sound.duration()` - gets the total length of the sound in seconds
  - `track.timeSlider.value()` - gets the slider value (0-100)
  - We calculate `targetTime` by converting percentage to seconds
  - `track.sound.jump(targetTime)` - jumps to that time in the sound

**Documentation**: 
- [`sound.duration()`](https://p5js.org/reference/#/p5.SoundFile/duration) gets the total duration
- [`sound.jump()`](https://p5js.org/reference/#/p5.SoundFile/jump) jumps to a specific time
- [`sound.currentTime()`](https://p5js.org/reference/#/p5.SoundFile/currentTime) gets current playback time

**Visual Concept**: [SCHEMA PLACEHOLDER: Diagram showing time slider with 0% at start, 100% at end, and jumping to middle]

**Test it!** You should see a new slider below the volume slider. Try dragging it - the track should jump to that position!

### Step 1 (C): Updating Time Slider Positions

Update your `updatePositions()` function to calculate time slider positions:

```javascript
function updatePositions() {
    // ... existing code for leftX, centerX, rightX, etc. ...
    
    let timeSliderY = height * 0.55;    // Duration sliders
    
    // Track 1 on left side
    track1.timeSliderPosition.x = leftX;
    track1.timeSliderPosition.y = timeSliderY;
    
    // Track 2 on right side
    track2.timeSliderPosition.x = rightX;
    track2.timeSliderPosition.y = timeSliderY;
    
    // ... rest of function ...
}
```

**Understanding the code**:
- `timeSliderY = height * 0.55` - positions sliders at 55% down the screen
- This places them below the volume sliders (which are at 45%)
- Uses the same `leftX` and `rightX` as other track elements

**Test it!** Resize the window - the time sliders should stay in the right position!

### Step 1 (D): Updating Time Sliders During Playback

Create functions to update the time sliders as tracks play:

```javascript
function updateTimeSliders() {
    updateTimeSlider(track1);
    updateTimeSlider(track2);
}

function updateTimeSlider(track) {
    let currentTime = track.sound.currentTime();
    let soundDuration = track.sound.duration();
    let progress = (currentTime / soundDuration) * 100;
    track.timeSlider.value(progress);
}
```

Then call `updateTimeSliders()` in your `draw()` function:

```javascript
function draw() {
    // ... existing code ...
    updateTimeSliders();
    // ... rest of draw ...
}
```

**Understanding the code**:
- `updateTimeSliders()` - updates both tracks' time sliders
- `updateTimeSlider(track)` - updates one track's slider
  - `track.sound.currentTime()` - gets how far into the track we are (in seconds)
  - `track.sound.duration()` - gets the total length (in seconds)
  - `progress = (currentTime / soundDuration) * 100` - calculates percentage (0-100)
  - `track.timeSlider.value(progress)` - updates the slider to show current position

**Why update in draw()?** Because `draw()` runs continuously, the slider will update smoothly as the track plays.

**Visual Concept**: [SCHEMA PLACEHOLDER: Diagram showing slider updating as track plays - 0% → 25% → 50% → 75% → 100%]

**Test it!** Play a track and watch the time slider move from left to right as it plays!

---

## Step 2: Displaying Time in MM:SS Format

### Understanding Time Formatting

Instead of showing raw seconds (like "125.5"), we want to display time in a readable format like "02:05" (2 minutes and 5 seconds).

**The Logic**:
1. Convert total seconds to minutes and seconds
2. Format each to always have 2 digits
3. Display as "MM:SS"

### Step 2 (A): Creating a Time Formatting Function

Create a function to format seconds into MM:SS:

```javascript
function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);
    let minutesStr = String(minutes).padStart(2, '0');
    let secsStr = String(secs).padStart(2, '0');
    return minutesStr + ":" + secsStr;
}
```

**Understanding the code**:
- `Math.floor(seconds / 60)` - gets minutes (whole number, no decimals)
  - Example: 125 seconds ÷ 60 = 2.08 → `Math.floor()` = 2 minutes
- `Math.floor(seconds % 60)` - gets remaining seconds
  - `%` is the modulo operator (remainder after division)
  - Example: 125 % 60 = 5 seconds (125 = 2×60 + 5)
- `String(minutes).padStart(2, '0')` - ensures 2 digits
  - `padStart(2, '0')` adds zeros to the left if needed
  - Example: "2" becomes "02", "12" stays "12"
- Returns format like "02:05"

**Documentation**: 
- [`Math.floor()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor) rounds down
- [`%` operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder) gets remainder
- [`String.padStart()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart) pads strings

**Visual Concept**: [SCHEMA PLACEHOLDER: Diagram showing conversion: 125 seconds → 2 minutes, 5 seconds → "02:05"]

**Test it!** Try calling `formatTime(125)` - it should return "02:05"!

### Step 2 (B): Displaying Time

Create a function to display time for each track:

```javascript
function drawTimeDisplay(track) {
    let elapsed = track.sound.currentTime();
    let total = track.sound.duration();
    let timeText = formatTime(elapsed) + " / " + formatTime(total);
    
    fill(0);
    textAlign(CENTER);
    textSize(12);
    text(timeText, track.timeSliderPosition.x, track.timeSliderPosition.y + 35);
}
```

Then call it in your `draw()` function:

```javascript
function draw() {
    // ... existing code ...
    drawTimeDisplay(track1);
    drawTimeDisplay(track2);
    // ... rest of draw ...
}
```

**Understanding the code**:
- `track.sound.currentTime()` - gets elapsed time (how far we are)
- `track.sound.duration()` - gets total time (full length)
- `formatTime()` - converts both to MM:SS format
- `timeText = formatTime(elapsed) + " / " + formatTime(total)` - creates "02:05 / 03:42"
- Displays below the time slider (y + 35 pixels)

**Visual Concept**: [SCHEMA PLACEHOLDER: Diagram showing time display: "00:15 / 03:42" below time slider]

**Test it!** You should see time displayed as "00:15 / 03:42" (elapsed / total) below each time slider!

---

## Step 3: Adding a Crossfader

### Understanding Crossfaders

A crossfader smoothly transitions between two tracks. It's a fundamental tool for DJs.

**How it works**:
- At 0%: Only track 1 is heard (track 2 is silent)
- At 100%: Only track 2 is heard (track 1 is silent)
- At 50%: Both tracks play at their volume levels

**Real-world example**: DJs use crossfaders to smoothly transition from one song to another during a mix. They'll fade out track 1 while fading in track 2.

### Step 3 (A): Adding Crossfader Variables

At the top of your code (with other global variables), add:

```javascript
let crossfader = null;
let crossfaderValue = 50;
```

**Understanding the code**:
- `crossfader = null` - stores the slider element (created later)
- `crossfaderValue = 50` - default value (50% = both tracks heard)

### Step 3 (B): Creating the Crossfader Slider

Create a function to set up the crossfader:

```javascript
function setupCrossfader() {
    crossfader = createSlider(0, 100, 50);
    crossfader.position(width/2 - 100, height * 0.75);
    crossfader.style('width', '200px');
}
```

Then call it in your `setup()` function:

```javascript
function setup() {
    // ... existing code ...
    setupCrossfader();
    // ... rest of setup ...
}
```

**Understanding the code**:
- `createSlider(0, 100, 50)` - slider from 0 to 100, starting at 50
- `.position(width/2 - 100, height * 0.75)` - centered horizontally, 75% down screen
- `.style('width', '200px')` - makes it 200 pixels wide

**Visual Concept**: [SCHEMA PLACEHOLDER: Diagram showing crossfader slider at bottom center of screen]

**Test it!** You should see a slider at the bottom center of the screen!

### Step 3 (C): Implementing Crossfader Logic with Trigonometry

**The Logic**: We'll use `sin()` and `cos()` functions for smooth crossfade curves. This creates natural-sounding transitions.

Create a function to apply the crossfader:

```javascript
function applyCrossfader() {
    crossfaderValue = crossfader.value();
    let angle = (crossfaderValue / 100) * (PI / 2);
    
    let track1CrossfadeVolume = track1.volume * cos(angle);
    let track2CrossfadeVolume = track2.volume * sin(angle);
    
    track1.sound.setVolume(track1CrossfadeVolume);
    track2.sound.setVolume(track2CrossfadeVolume);
}
```

Then call it in your `draw()` function:

```javascript
function draw() {
    // ... existing code ...
    applyCrossfader();
    // ... rest of draw ...
}
```

**Understanding the code**:
- `crossfaderValue = crossfader.value()` - gets slider value (0-100)
- `angle = (crossfaderValue / 100) * (PI / 2)` - maps 0-100 to 0 to π/2 (0° to 90°)
  - At 0%: angle = 0°
  - At 50%: angle = 45°
  - At 100%: angle = 90°
- `cos(angle)` - gives track1 volume curve
  - At 0°: cos(0) = 1.0 (full volume)
  - At 90°: cos(90) = 0.0 (silent)
- `sin(angle)` - gives track2 volume curve
  - At 0°: sin(0) = 0.0 (silent)
  - At 90°: sin(90) = 1.0 (full volume)
- Multiply by `track.volume` to respect individual volume settings

**Why trigonometry?** 
- Linear crossfading (just dividing volume) sounds abrupt
- Trigonometric curves create smooth, natural-sounding transitions
- Professional DJ software uses similar curves

**Visual Concept**: [SCHEMA PLACEHOLDER: Diagram showing crossfade curves - track1 fades from 1.0 to 0.0, track2 fades from 0.0 to 1.0]

**Documentation**: 
- [`cos()`](https://p5js.org/reference/#/p5/cos) and [`sin()`](https://p5js.org/reference/#/p5/sin) for smooth curves
- `PI` is a p5.js constant (3.14159...)

**Test it!** Move the crossfader:
- At 0%: Only track 1 should be heard
- At 100%: Only track 2 should be heard
- At 50%: Both tracks should be heard
- The transition should be smooth, not abrupt!

---

## Step 4: Adding BPM Visualization

### Understanding BPM Visualization

BPM (Beats Per Minute) visualization shows the rhythm of the music through pulsating circles. The circles get bigger when the beat is stronger.

**The Logic**:
1. Use `p5.Amplitude` to analyze the audio
2. Get the amplitude level (how loud the sound is at this moment)
3. Make circles pulse based on amplitude
4. Display circles in the center of the screen

**Important**: The amplitude is read from the raw audio, so it shows BPM even if volume or crossfader is at 0%!

### Step 4 (A): Setting Up Amplitude Analyzers

In your `setup()` function, create amplitude analyzers:

```javascript
function setup() {
    createCanvas(windowWidth, windowHeight);
    
    // Create amplitude analyzers for BPM visualization
    amp1 = new p5.Amplitude();
    amp2 = new p5.Amplitude();
    
    // ... rest of setup ...
    
    // Connect amplitude analyzers to sounds
    amp1.setInput(track1.sound);
    amp2.setInput(track2.sound);
}
```

**Understanding the code**:
- `new p5.Amplitude()` - creates an amplitude analyzer
- `amp.setInput(sound)` - connects the analyzer to a sound
- The analyzer reads the raw audio signal (before volume processing)

**Documentation**: [`p5.Amplitude`](https://p5js.org/reference/#/p5.Amplitude) analyzes audio amplitude.

### Step 4 (B): Adding Pulse Size Properties

In both track objects, add:

```javascript
let track1 = {
    // ... existing properties ...
    pulseSize: 80
};
```

**Understanding the code**:
- `pulseSize: 80` - stores the current size of the pulsating circle
- Starts at 80 (minimum size)
- Will increase based on amplitude

### Step 4 (C): Creating BPM Visualization Functions

Create functions to draw the BPM visualization:

```javascript
function drawBPMVisualization() {
    track1.pulseSize = getPulseSize(track1, amp1);
    track2.pulseSize = getPulseSize(track2, amp2);
    
    let centerX = width / 2;
    let beatVisualY = height * 0.3;
    
    drawBeatCircle(centerX - 60, beatVisualY, track1.pulseSize, [255, 0, 0], "beat visual 1");
    drawBeatCircle(centerX + 60, beatVisualY, track2.pulseSize, [0, 0, 255], "beat visual 2");
}

function getPulseSize(track, amp) {
    let level = (track.sound && amp) ? amp.getLevel() : 0;
    return Math.max(80, 80 + (level * 400));
}

function drawBeatCircle(x, y, size, color, label) {
    noFill();
    stroke(color[0], color[1], color[2], 150);
    strokeWeight(3);
    circle(x, y, size);
    
    fill(0);
    textAlign(CENTER);
    textSize(12);
    text(label, x, y + size/2 + 15);
}
```

Then call `drawBPMVisualization()` in your `draw()` function:

```javascript
function draw() {
    // ... existing code ...
    drawBPMVisualization();
    // ... rest of draw ...
}
```

**Understanding the code**:
- `drawBPMVisualization()` - main function that draws both circles
  - Gets pulse size for each track
  - Calculates center positions
  - Draws circles side by side
- `getPulseSize(track, amp)` - calculates circle size from amplitude
  - `amp.getLevel()` - gets current amplitude (0.0 to 1.0)
  - `Math.max(80, 80 + (level * 400))` - ensures minimum size of 80
    - When level = 0: size = 80 (minimum)
    - When level = 1: size = 480 (maximum)
    - Scales smoothly between these values
- `drawBeatCircle(x, y, size, color, label)` - draws one circle
  - `noFill()` - circle is just an outline
  - `stroke()` - sets circle color (red for track1, blue for track2)
  - `circle(x, y, size)` - draws the circle
  - Draws label below the circle

**Why read raw audio?** 
- We want to see the beat even if volume is at 0%
- We want to see the beat even if crossfader is at 0%
- This shows the actual rhythm of the music, not the output volume

**Visual Concept**: [SCHEMA PLACEHOLDER: Diagram showing circles pulsing - small at quiet moments, large at beats]

**Documentation**: [`amp.getLevel()`](https://p5js.org/reference/#/p5.Amplitude/getLevel) gets current amplitude.

**Test it!** Play tracks and watch the circles pulse with the beat! Try setting volume to 0% - the circles should still pulse!

---

## Step 5: Updating Labels and Layout

### Step 5 (A): Adding Duration Labels

In your `drawLabels()` function, add labels for the time sliders:

```javascript
function drawLabels() {
    // ... existing labels ...
    
    text("duration", track1.timeSliderPosition.x, track1.timeSliderPosition.y - 15);
    text("duration", track2.timeSliderPosition.x, track2.timeSliderPosition.y - 15);
    
    text("crossfader", width/2, height * 0.72);
}
```

### Step 5 (B): Updating Layout

Make sure your layout matches this design:

```
+-------------------------------------------------------+
| choose track 1  | change background  | choose track 2 |
+-----------------+--------------------+----------------+
|  play/pause     | beat   | beat      | play/pause     |
|  track 1        | visual | visual    | track 2        |
|                 |   1    |   2       |                |
| volume slider1  |        |           | volume slider 2|
|                 |        |           |                |
| duration slider1|        |           |duration slider2|
|                 |        |           |                |
+-------------------------------------------------------+
|                                                       |
|                  crossfader slider                    |
+-------------------------------------------------------+
```

Your `updatePositions()` function should calculate positions for this layout.

---

## Step 6: Refactoring Code Organization

### Understanding Code Organization

The code has been refactored into small, focused functions. This makes it:
- **Easier to understand**: Each function does one thing
- **Easier to test**: You can test functions individually
- **Easier to maintain**: Changes are isolated to specific functions
- **Less repetitive**: Reusable functions avoid code duplication

### Key Helper Functions

**Setup functions** (called in `setup()`):
- `setupFileInputs()` - Creates all file inputs
- `setupTrackButton(track)` - Creates button for a track
- `setupTrackSliders(track)` - Creates volume and time sliders
- `setupCrossfader()` - Creates crossfader slider

**Draw functions** (called in `draw()`):
- `drawBackground()` - Draws background image or white
- `drawLabels()` - Draws all text labels
- `drawTimeDisplay(track)` - Displays time for a track
- `drawBPMVisualization()` - Draws pulsating circles

**Update functions** (called in `draw()`):
- `updateVolumes()` - Updates volumes from sliders
- `updateTimeSliders()` - Updates time slider positions
- `applyCrossfader()` - Applies crossfader logic

**Track control functions**:
- `pauseTrack(track)` - Pauses a track
- `playTrack(track)` - Plays a track
- `stopTrack(track)` - Stops a track
- `connectAmplitudeAnalyzer(track)` - Connects analyzer

**Utility functions**:
- `formatTime(seconds)` - Formats seconds to MM:SS
- `getPulseSize(track, amp)` - Calculates pulse size
- `drawBeatCircle(x, y, size, color, label)` - Draws one circle
- `updateTrackPositions(track)` - Updates UI positions

**Why refactor?** 
- Small functions are easier to understand
- You can find specific features quickly
- Changes don't affect other parts
- Code is more maintainable

---

## Step 7: Final Testing

### Testing Checklist

Test all the new features:

1. ✅ **Time Sliders**
   - Do they show the current position as the track plays?
   - Can you drag them to jump to different positions?
   - Does the track actually jump when you move the slider?

2. ✅ **Time Display**
   - Is time shown in MM:SS format?
   - Does it show "elapsed / total" correctly?
   - Does it update as the track plays?

3. ✅ **Crossfader**
   - At 0%, is only track 1 heard?
   - At 100%, is only track 2 heard?
   - At 50%, are both tracks heard?
   - Is the transition smooth (not abrupt)?

4. ✅ **BPM Visualization**
   - Do circles pulse with the beat?
   - Do they work even when volume is at 0%?
   - Do they work even when crossfader is at 0%?
   - Do they react to different tracks differently?

5. ✅ **Code Organization**
   - Is the code organized into small functions?
   - Is it easy to find specific features?
   - Can you understand what each function does?

### Customization Ideas

Now that you have advanced features, try:
- Experiment with different crossfader curves
- Try different BPM visualization styles (colors, shapes, sizes)
- Add more advanced features (EQ, effects, etc.)
- Create your own professional DJ setup!

---

## Troubleshooting

### Problem: Time slider doesn't update

**Possible causes**:
- `updateTimeSliders()` not called in `draw()`
- Slider not created properly

**Solutions**:
- Make sure `updateTimeSliders()` is called in `draw()`
- Check that `updateTimeSlider(track)` calculates progress correctly
- Check browser console for errors

### Problem: Can't jump to position in track

**Possible causes**:
- `.input()` handler not set up correctly
- `sound.jump()` not working

**Solutions**:
- Check that `track.timeSlider.input(function() { ... })` is set up
- Make sure `track.sound.jump(targetTime)` is called
- Verify `targetTime` is calculated correctly (percentage × duration)

### Problem: Crossfader doesn't work smoothly

**Possible causes**:
- Not using trigonometry
- Volume calculation incorrect

**Solutions**:
- Make sure you're using `cos()` and `sin()` with angle calculation
- Check that angle is mapped correctly: `(crossfaderValue / 100) * (PI / 2)`
- Verify volumes are multiplied by track volume

### Problem: BPM visualization doesn't show

**Possible causes**:
- Amplitude analyzers not created
- Analyzers not connected to sounds
- `drawBPMVisualization()` not called

**Solutions**:
- Check that `amp1 = new p5.Amplitude()` and `amp2 = new p5.Amplitude()` are in `setup()`
- Verify `amp1.setInput(track1.sound)` and `amp2.setInput(track2.sound)` are called
- Make sure `drawBPMVisualization()` is called in `draw()`

### Problem: Circles don't pulse

**Possible causes**:
- Amplitude not being read correctly
- Pulse size calculation incorrect

**Solutions**:
- Check that `amp.getLevel()` is being called
- Verify `getPulseSize()` uses `Math.max(80, 80 + (level * 400))`
- Make sure amplitude analyzers are connected to playing sounds

**Remember**: Always check the browser console (F12) for error messages. They'll tell you exactly what went wrong!

---

## Congratulations! 🎉

You've successfully added advanced DJ features! Your deck now has:
- Time sliders for seeking through tracks
- Time display in MM:SS format
- Crossfader for smooth transitions
- BPM visualization with pulsating circles
- Well-organized, refactored code

**What You Learned**:
- How to create time sliders and jump to positions in audio
- How to format and display time in MM:SS format
- How to use trigonometry for smooth crossfading
- How to analyze audio amplitude for visualization
- How to organize code into small, reusable functions

**Next Steps**:
- Experiment with different crossfader curves
- Try different BPM visualization styles
- Add more advanced features (EQ, effects, etc.)
- Share your professional DJ deck with others!
