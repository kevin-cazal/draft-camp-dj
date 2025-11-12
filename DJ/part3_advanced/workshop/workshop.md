# Workshop: DJ Mixing Deck - Advanced Features

## Welcome!

Congratulations on completing the Customization workshop! Now you're going to add advanced DJ features that make your deck truly professional: time sliders for seeking through tracks, a crossfader for smooth transitions, and BPM visualization to see the beat!

---

## Prerequisites

**Before starting this workshop, make sure you have completed Part 2: Customization**, which includes:
- ✅ File uploads for background images and sounds
- ✅ Mobile-friendly responsive design
- ✅ Touch support
- ✅ Helper functions for organized code

---

## What You'll Build

By the end of this workshop, you'll add:
- ✅ **Time sliders** - Jump to any position in a track
- ✅ **Time display** - See elapsed time and total duration (MM:SS format)
- ✅ **Crossfader** - Smoothly transition between tracks using trigonometry
- ✅ **BPM visualization** - Pulsating circles that react to the beat
- ✅ **Refactored code** - Learn to organize code into small, reusable functions

---

## Step 1: Adding Time Sliders

### Understanding Time Sliders

Time sliders let DJs jump to any position in a track. Think of it like a video player's progress bar - you can click anywhere to jump to that point in the song.

**The Logic**:
1. Add a time slider property to each track object
2. Create the slider in `setupTrackSliders()`
3. Update the slider position as the track plays
4. When the slider is moved, jump to that position in the track

### Step 1A: Adding Time Slider Properties

**What you need to do**: In both `track1` and `track2` objects, add properties for the time slider. Think about:
1. What do you need to store? (The slider element, its position, and whether it's being dragged)
2. What should the initial values be? (We haven't created the slider yet, so what should we use?)

**Why?** These store the slider element, its position, and whether the user is dragging it. Just like the volume slider, we need to keep track of all the information about the time slider.

### Step 1B: Creating Time Sliders

**What you need to do**: Update your `setupTrackSliders()` function to also create a time slider. Think about:
1. What range should the slider have? (0-100 to represent 0%-100% through the track)
2. What should happen when the slider is moved? (Jump to that position in the track)
3. How do you calculate which time in the track corresponds to the slider value?

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
- `createSlider(0, 100, 0)` creates a slider from 0% to 100%, starting at 0%
- `.input()` runs when the slider is moved
- `track.sound.duration()` gets the total length of the sound
- `track.sound.jump(targetTime)` jumps to a specific time in the sound

**Documentation**: 
- [`sound.duration()`](https://p5js.org/reference/#/p5.SoundFile/duration) gets the total duration
- [`sound.jump()`](https://p5js.org/reference/#/p5.SoundFile/jump) jumps to a specific time
- [`sound.currentTime()`](https://p5js.org/reference/#/p5.SoundFile/currentTime) gets the current playback time

### Step 1C: Updating Time Slider Positions

**Your Task**: Update your `updatePositions()` function to calculate time slider positions:

```javascript
function updatePositions() {
    // ... existing code ...
    let timeSliderY = height * 0.55;    // Duration sliders
    
    // Track 1
    track1.timeSliderPosition.x = leftX;
    track1.timeSliderPosition.y = timeSliderY;
    
    // Track 2
    track2.timeSliderPosition.x = rightX;
    track2.timeSliderPosition.y = timeSliderY;
}
```

### Step 1D: Updating Time Sliders During Playback

**What you need to do**: Create a function to update time sliders as tracks play. Think about:
1. How do you know how far through the track you are? (Current time vs total duration)
2. How do you convert that to a slider value? (Percentage: 0-100)
3. When should this update happen? (Continuously, in the draw loop)

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

Then call `updateTimeSliders()` in your `draw()` function.

**Understanding the code**:
- `currentTime()` gets how far into the track we are
- We calculate progress as a percentage (0-100)
- Update the slider value to show current position

**Test it!** Play a track and watch the time slider move. Try dragging it to jump to different positions!

---

## Step 2: Displaying Time in MM:SS Format

### Understanding Time Formatting

Instead of showing raw seconds, we'll display time as "MM:SS" (minutes:seconds), like "02:35" for 2 minutes and 35 seconds.

### Step 2A: Creating a Time Formatting Function

**What you need to do**: Create a function to format seconds into MM:SS format. Think about:
1. How do you convert total seconds into minutes and seconds?
2. How do you ensure each number always has 2 digits? (e.g., "05" instead of "5")
3. How do you combine minutes and seconds with a colon?

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
- `Math.floor(seconds / 60)` gets minutes (whole number)
- `Math.floor(seconds % 60)` gets remaining seconds
- `String().padStart(2, '0')` ensures 2 digits (e.g., "05" instead of "5")
- Returns format like "02:35"

**Documentation**: [`String.padStart()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart) pads strings.

### Step 2B: Displaying Time

**Your Task**: Create a function to display time for each track:

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

Then call `drawTimeDisplay(track1)` and `drawTimeDisplay(track2)` in your `draw()` function.

**Test it!** You should see time displayed as "00:15 / 03:42" (elapsed / total)!

---

## Step 3: Adding a Crossfader

### Understanding Crossfaders

A crossfader smoothly transitions between two tracks. At 0%, only track 1 is heard. At 100%, only track 2 is heard. At 50%, both tracks play at their volume levels.

**Real-world example**: DJs use crossfaders to smoothly transition from one song to another during a mix.

### Step 3A: Adding Crossfader Variables

**What you need to do**: At the top of your code, add variables for the crossfader. Think about:
1. What do you need to store? (The slider element, and its current value)
2. What should the initial value be? (50% means both tracks are heard equally)

### Step 3B: Creating the Crossfader Slider

**Your Task**: Create a function to set up the crossfader:

```javascript
function setupCrossfader() {
    crossfader = createSlider(0, 100, 50);
    crossfader.position(width/2 - 100, height * 0.75);
    crossfader.style('width', '200px');
}
```

Then call `setupCrossfader()` in your `setup()` function.

### Step 3C: Implementing Crossfader Logic with Trigonometry

**The Logic**: We'll use `sin()` and `cos()` functions for smooth crossfade curves.

**What you need to do**: Create a function to apply the crossfader. Think about:
1. How do you convert the slider value (0-100) to an angle? (Map to 0 to π/2)
2. How does `cos()` behave? (1.0 at 0°, 0.0 at 90° - perfect for track 1 fading out)
3. How does `sin()` behave? (0.0 at 0°, 1.0 at 90° - perfect for track 2 fading in)
4. How do you combine this with each track's individual volume setting?

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

Then call `applyCrossfader()` in your `draw()` function.

**Understanding the code**:
- Map crossfader value (0-100) to angle (0 to π/2)
- `cos(angle)` gives track1 volume: 1.0 at 0°, 0.0 at 90°
- `sin(angle)` gives track2 volume: 0.0 at 0°, 1.0 at 90°
- Multiply by track volume to respect individual volume settings

**Why trigonometry?** It creates smooth, natural-sounding transitions instead of abrupt changes!

**Documentation**: 
- [`cos()`](https://p5js.org/reference/#/p5/cos) and [`sin()`](https://p5js.org/reference/#/p5/sin) for smooth curves

**Test it!** Move the crossfader - track 1 should fade out as track 2 fades in!

---

## Step 4: Adding BPM Visualization

### Understanding BPM Visualization

BPM (Beats Per Minute) visualization shows the rhythm of the music through pulsating circles. The circles get bigger when the beat is stronger.

**The Logic**:
1. Use `p5.Amplitude` to analyze the audio
2. Get the amplitude level (how loud the sound is)
3. Make circles pulse based on amplitude
4. Display circles in the center of the screen

### Step 4A: Setting Up Amplitude Analyzers

**What you need to do**: In your `setup()` function, create amplitude analyzers. Think about:
1. What does an amplitude analyzer do? (Measures how loud the audio is)
2. How many analyzers do you need? (One for each track)
3. How do you connect them to the sounds? (So they can analyze the audio)

```javascript
amp1 = new p5.Amplitude();
amp2 = new p5.Amplitude();
```

Then connect them to the sounds:
```javascript
amp1.setInput(track1.sound);
amp2.setInput(track2.sound);
```

**Documentation**: [`p5.Amplitude`](https://p5js.org/reference/#/p5.Amplitude) analyzes audio amplitude.

### Step 4B: Adding Pulse Size Properties

**What you need to do**: In both track objects, add a property to store the pulse size. Think about:
1. What does this property represent? (The current size of the pulsating circle)
2. What should the initial value be? (A base size that will grow when the beat is strong)

### Step 4C: Creating BPM Visualization Functions

**What you need to do**: Create functions to draw the BPM visualization. Think about:
1. How do you get the amplitude level? (From the amplitude analyzer)
2. How do you convert amplitude to circle size? (Larger amplitude = larger circle)
3. Where should the circles be displayed? (Center of the screen, side by side)
4. How do you draw a circle that pulses? (Update the size based on amplitude each frame)

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

Then call `drawBPMVisualization()` in your `draw()` function.

**Understanding the code**:
- `amp.getLevel()` gets the current amplitude (0.0 to 1.0)
- `Math.max(80, 80 + (level * 400))` ensures minimum size of 80, scales up with amplitude
- Circles pulse in sync with the beat!

**Important**: The amplitude is read from the raw audio, so it shows BPM even if volume or crossfader is at 0%!

**Test it!** Play tracks and watch the circles pulse with the beat!

---

## Step 5: Updating Labels and Layout

### Step 5A: Adding Duration Labels

**Your Task**: In your `drawLabels()` function, add labels for the time sliders:

```javascript
text("duration", track1.timeSliderPosition.x, track1.timeSliderPosition.y - 15);
text("duration", track2.timeSliderPosition.x, track2.timeSliderPosition.y - 15);
```

### Step 5B: Adding Crossfader Label

**Your Task**: Add a label for the crossfader:

```javascript
text("crossfader", width/2, height * 0.72);
```

### Step 5C: Updating Layout

**Your Task**: Make sure your `updatePositions()` function calculates positions for the new layout:

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

---

## Step 6: Refactoring Code Organization

### Understanding Code Organization

The code has been refactored into small, focused functions. This makes it:
- Easier to understand
- Easier to test
- Easier to maintain
- Less repetitive

### Key Helper Functions

**Setup functions**:
- `setupFileInputs()` - Creates all file inputs
- `setupTrackButton(track)` - Creates button for a track
- `setupTrackSliders(track)` - Creates sliders for a track
- `setupCrossfader()` - Creates crossfader

**Draw functions**:
- `drawBackground()` - Draws background
- `drawLabels()` - Draws all labels
- `drawTimeDisplay(track)` - Displays time for a track
- `drawBPMVisualization()` - Draws pulsating circles

**Update functions**:
- `updateVolumes()` - Updates volumes from sliders
- `updateTimeSliders()` - Updates time slider positions
- `applyCrossfader()` - Applies crossfader logic

**Track control functions**:
- `pauseTrack(track)` - Pauses a track
- `playTrack(track)` - Plays a track
- `stopTrack(track)` - Stops a track
- `connectAmplitudeAnalyzer(track)` - Connects analyzer

**Why refactor?** Small functions are easier to understand, test, and modify!

---

## Step 7: Final Testing

### Testing Checklist

Test all the new features:

1. ✅ **Time Sliders**
   - Do they show the current position?
   - Can you drag them to jump in the track?
   - Does the time display update correctly?

2. ✅ **Time Display**
   - Is time shown in MM:SS format?
   - Does it show "elapsed / total" correctly?

3. ✅ **Crossfader**
   - At 0%, is only track 1 heard?
   - At 100%, is only track 2 heard?
   - At 50%, are both tracks heard?
   - Is the transition smooth?

4. ✅ **BPM Visualization**
   - Do circles pulse with the beat?
   - Do they work even when volume is at 0%?
   - Do they work even when crossfader is at 0%?

5. ✅ **Code Organization**
   - Is the code organized into small functions?
   - Is it easy to understand?
   - Can you find specific features quickly?

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
- How to format and display time
- How to use trigonometry for smooth crossfading
- How to analyze audio amplitude for visualization
- How to organize code into small, reusable functions

**Next Steps**:
- Experiment with different crossfader curves
- Try different BPM visualization styles
- Add more advanced features (EQ, effects, etc.)
- Share your professional DJ deck!

---

## Troubleshooting

**Problem**: Time slider doesn't update
- **Solution**: Make sure `updateTimeSliders()` is called in `draw()`

**Problem**: Can't jump to position in track
- **Solution**: Check that `track.sound.jump(targetTime)` is called in the slider's `.input()` handler

**Problem**: Crossfader doesn't work smoothly
- **Solution**: Make sure you're using `cos()` and `sin()` with the angle calculation

**Problem**: BPM visualization doesn't show
- **Solution**: Check that `amp1.setInput(track1.sound)` and `amp2.setInput(track2.sound)` are called

**Problem**: Circles don't pulse
- **Solution**: Make sure `drawBPMVisualization()` is called in `draw()` and amplitude analyzers are connected

**Remember**: Always check the browser console (F12) for error messages!
