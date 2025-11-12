# DJ Mixing Deck - Implementation Guide

## Overview
This guide outlines the step-by-step plan for building a DJ mixing deck with two tracks, play/pause buttons, and volume sliders.

---

## Step 1: Create Track Objects

### Step 1 (A): Create track1 Object
- Create `track1` object with properties:
  - `sound`: null
  - `volume`: 0.5
  - `isPlaying`: false
  - `slider`: null
  - `button`: object with x, y, width, height, label

### Step 1 (B): Create track2 Object
- Create `track2` object with same structure
- Position button at different x coordinate

---

## Step 2: Load Sounds

### Step 2 (A): Load Sounds in preload()
- Load `'assets/sound1.wav'` into `track1.sound`
- Load `'assets/sound2.wav'` into `track2.sound`

### Step 2 (B): Set Initial Volume in setup()
- Set `track1.sound.setVolume(track1.volume)`
- Set `track2.sound.setVolume(track2.volume)`

---

## Step 3: Create Buttons

### Step 3 (A): Create Buttons in setup()
- Create `track1.button = createButton(track1.buttonLabel)`
- Position it: `track1.button.position(track1.buttonPosition.x, track1.buttonPosition.y)`
- Connect it: `track1.button.mousePressed(function() { toggleTrack(track1); })`
- Do the same for track2

---

## Step 4: Create Volume Sliders

### Step 4 (A): Create Sliders in setup()
- Create `track1.slider = createSlider(0, 100, 50)`
- Position it: `track1.slider.position(100, 350)`
- Do the same for track2 at position (550, 350)

### Step 4 (B): Draw Volume Labels in draw()
- Draw "Volume" text above each slider

---

## Step 5: Play/Pause Functionality

### Step 5 (A): Create toggleTrack() Function
- Takes track object as parameter
- If playing: pause and set `isPlaying = false`
- If not playing: set volume, set loop, play, set `isPlaying = true`

### Step 5 (B): Connect Buttons in setup()
- When creating buttons, use `.mousePressed()` to connect them
- `track1.button.mousePressed(function() { toggleTrack(track1); })`
- Do the same for track2

---

## Step 6: Volume Control

### Step 6 (A): Read Slider Values in draw()
- Update `track1.volume = track1.slider.value() / 100`
- Update `track2.volume = track2.slider.value() / 100`

### Step 6 (B): Apply Volume to Playing Sounds in draw()
- If `track1.sound.isPlaying()`, set `track1.sound.setVolume(track1.volume)`
- Do the same for track2

---

## Implementation Order

1. **First**: Complete Step 1 (Create track objects)
2. **Second**: Complete Step 2 (Load sounds)
3. **Third**: Complete Step 3 (Create buttons)
4. **Fourth**: Complete Step 4 (Create sliders)
5. **Fifth**: Complete Step 5 (Play/pause functionality)
6. **Sixth**: Complete Step 6 (Volume control)

Each step builds upon the previous one, so follow them in order.

