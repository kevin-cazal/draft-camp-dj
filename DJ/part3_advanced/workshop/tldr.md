# Quick Reference: DJ Mixing Deck - Advanced Features

A quick guide for adding advanced features to your DJ deck.

**Prerequisites**: Complete Part 2: Customization first!

---

## Step 1: Time Sliders

### Step 1 (A): Add Properties
- In track objects: `timeSlider: null`, `timeSliderPosition: { x: 0, y: 0 }`, `isDraggingTime: false`

### Step 1 (B): Create Time Sliders
- In `setupTrackSliders()`: Create time slider with `.input()` handler
- Handler: `track.sound.jump(targetTime)` to jump to position

### Step 1 (C): Update Positions
- In `updatePositions()`: Calculate `timeSliderY = height * 0.55`
- Set `track.timeSliderPosition.x` and `.y`

### Step 1 (D): Update During Playback
- Create `updateTimeSliders()` and `updateTimeSlider(track)`
- Call in `draw()` to update slider as track plays

---

## Step 2: Time Display (MM:SS)

### Step 2 (A): Format Function
- `formatTime(seconds)` - converts to "MM:SS" using `Math.floor()` and `padStart()`

### Step 2 (B): Display Time
- `drawTimeDisplay(track)` - shows "elapsed / total" format
- Call in `draw()` for each track

---

## Step 3: Crossfader

### Step 3 (A): Add Variables
- `let crossfader = null;`
- `let crossfaderValue = 50;`

### Step 3 (B): Create Slider
- `setupCrossfader()` - creates slider at bottom center
- Call in `setup()`

### Step 3 (C): Apply Logic
- `applyCrossfader()` - uses `cos()` and `sin()` for smooth transition
- Map crossfader (0-100) to angle (0 to π/2)
- `track1Volume = track1.volume * cos(angle)`
- `track2Volume = track2.volume * sin(angle)`
- Call in `draw()`

---

## Step 4: BPM Visualization

### Step 4 (A): Setup Analyzers
- In `setup()`: `amp1 = new p5.Amplitude()`, `amp2 = new p5.Amplitude()`
- Connect: `amp1.setInput(track1.sound)`, `amp2.setInput(track2.sound)`

### Step 4 (B): Add Property
- In track objects: `pulseSize: 80`

### Step 4 (C): Draw Visualization
- `drawBPMVisualization()` - main function
- `getPulseSize(track, amp)` - calculates size from amplitude
- `drawBeatCircle(x, y, size, color, label)` - draws one circle
- Call `drawBPMVisualization()` in `draw()`

---

## Step 5: Update Labels

- Add "duration" labels above time sliders
- Add "crossfader" label above crossfader slider
- Update layout to match 3-column design

---

## Step 6: Code Organization

### Helper Functions
- **Setup**: `setupFileInputs()`, `setupTrackButton()`, `setupTrackSliders()`, `setupCrossfader()`
- **Draw**: `drawBackground()`, `drawLabels()`, `drawTimeDisplay()`, `drawBPMVisualization()`
- **Update**: `updateVolumes()`, `updateTimeSliders()`, `applyCrossfader()`
- **Control**: `pauseTrack()`, `playTrack()`, `stopTrack()`, `connectAmplitudeAnalyzer()`

---

## Key Functions

- `sound.duration()` - gets total track length
- `sound.currentTime()` - gets current playback time
- `sound.jump(time)` - jumps to specific time
- `p5.Amplitude.getLevel()` - gets audio amplitude (0.0 to 1.0)
- `cos(angle)` / `sin(angle)` - for smooth crossfade curves
- `String.padStart(2, '0')` - pads numbers to 2 digits

---

## Testing Checklist

- ✅ Time sliders update and allow jumping
- ✅ Time displays in MM:SS format
- ✅ Crossfader smoothly transitions between tracks
- ✅ BPM visualization pulses with beat
- ✅ Code organized into small functions

---

## Troubleshooting

- **Time slider not updating**: Check `updateTimeSliders()` called in `draw()`
- **Can't jump**: Check `.input()` handler calls `sound.jump()`
- **Crossfader not smooth**: Use `cos()` and `sin()` with angle
- **No BPM visualization**: Check amplitude analyzers connected
