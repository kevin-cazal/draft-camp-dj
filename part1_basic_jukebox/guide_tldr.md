# Part 1: Basic Jukebox - Implementation Guide

## Overview
This guide outlines the step-by-step plan for building a basic interactive jukebox with text display, background images, and sound playback.

---

## Step 1: Display Text

### Step 1 (A): Add Variables
- Add variables to store the current text
- Create `currentText` variable

### Step 1 (B): Initialize Text in Setup
- Add a text variable to display the current text
- Set `currentText = "Merry Christmas!"` in the `setup()` function

### Step 1: Draw Text
- In the `draw()` function, call `drawText(currentText)`

---

## Step 2: Add Background Images

### Step 2 (A): Add Background Variables
- Add variables for the current background and individual backgrounds
- Create `currentBackground`, `background1`, `background2`, and `background3` variables

### Step 2 (B): Load Backgrounds in Setup
- Load the background images in the `setup()` function
- Set the initial background to `background1`

### Step 2 (C1): Add Background Buttons
- Add buttons to set different backgrounds
  - Button 3: Set the first background
  - Button 4: Set the second background
  - Button 5: Set the third background

### Step 2 (C2): Add Background Button Handlers
- Add functions to handle background button clicks
  - `handleButton3Click()`: Set the first background
  - `handleButton4Click()`: Set the second background
  - `handleButton5Click()`: Set the third background

### Step 2: Draw Background
- In the `draw()` function, call `drawBackground(currentBackground)`

---

## Step 3: Add Sounds and Button Interactions

### Step 3 (A): Add Sound Variables
- Add variables for the current sound and individual sounds
- Create `currentSound`, `sound1`, and `sound2` variables

### Step 3 (B): Load Sounds in Setup
- Load the sounds in the `setup()` function
- Set the initial sound to `sound1`

### Step 3 (C1): Add Sound Buttons
- Add buttons to play different sounds
  - Button 1: Play the first sound
  - Button 2: Play the second sound

### Step 3 (C2): Add Sound Button Handlers
- Add functions to handle sound button clicks
  - `handleButton1Click()`: Play the first sound
  - `handleButton2Click()`: Play the second sound
- Implement `stopCurrentSound()` function to stop any currently playing sound

### Step 3 (C3): Add Button Interaction Logic
- Add a function to check if the mouse is over a button (`isMouseOverButton()`)
- Add a function to handle button clicks in `mousePressed()`
- Connect button callbacks to their respective handler functions

### Step 3: Draw Buttons
- In the `draw()` function, draw all buttons (button1 through button5)

---

## Implementation Order

1. **First**: Complete Step 1 (Text display)
2. **Second**: Complete Step 2 (Background images)
3. **Third**: Complete Step 3 (Sounds and button interactions)

Each step builds upon the previous one, so follow them in order.
