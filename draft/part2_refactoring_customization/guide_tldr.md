# Part 2: Refactoring and Customization - Implementation Guide

## Overview
This guide outlines the step-by-step plan for refactoring the jukebox code to make it cleaner, more maintainable, and easier to extend. You'll also add custom sounds and backgrounds, plus a button visibility toggle.

---

## Step 1: Refactor Buttons into an Array

### Step 1 (A): Create Buttons Array
- Replace individual button variables (`button1`, `button2`, etc.) with a single `buttons` array
- Move all button objects into the array
- Keep all button properties (name, x, y, width, height, callback)

### Step 1 (B): Update Draw Function
- Replace individual `drawButton()` calls with a loop
- Use `for (let button of buttons)` to iterate through all buttons

### Step 1 (C): Update Mouse Click Handler
- Replace individual button checks in `mousePressed()` with a loop
- Loop through the `buttons` array to check each button

---

## Step 2: Refactor Callbacks to Anonymous Functions

### Step 2 (A): Remove Named Handler Functions
- Remove standalone handler functions like `handleButton1Click()`, `handleButton2Click()`, etc.

### Step 2 (B): Use Anonymous Functions in Buttons
- Replace callback references with inline anonymous functions
- Use `function() { ... }` syntax directly in button objects
- Move the handler logic inside each button's callback property

---

## Step 3: Refactor Sounds and Backgrounds into Arrays

### Step 3 (A): Create Arrays
- Replace individual sound variables (`sound1`, `sound2`) with a `sounds` array
- Replace individual background variables (`background1`, `background2`, `background3`) with a `backgrounds` array
- Initialize arrays as empty: `let sounds = [];` and `let backgrounds = [];`

### Step 3 (B): Load Assets into Arrays
- In `setup()`, populate the arrays using `loadSound()` and `loadImage()`
- Use array syntax: `sounds = [loadSound('...'), loadSound('...'), ...]`
- Do the same for backgrounds

### Step 3 (C): Update Button Callbacks
- Update sound button callbacks to use array indices: `sounds[0]`, `sounds[1]`, etc.
- Update background button callbacks to use array indices: `backgrounds[0]`, `backgrounds[1]`, etc.
- Update `currentSound` and `currentBackground` initialization to use array indices

---

## Step 4: Add Custom Sounds and Backgrounds

### Step 4 (A): Add Custom Assets to Arrays
- Add at least one custom sound file to the `sounds` array
- Add at least one custom background image to the `backgrounds` array
- Ensure files exist in the `assets` folder

### Step 4 (B): Add Custom Buttons
- Add a button to play your custom sound
- Add a button to set your custom background
- Position them appropriately in the buttons array

---

## Step 5: Add Button Visibility Toggle

### Step 5 (A): Add Visibility Variable
- Create a global variable `buttonsVisible` initialized to `true`
- This tracks whether buttons should be displayed

### Step 5 (B): Add Hide Buttons Button
- Add a new button to the `buttons` array
- Set its callback to `buttonsVisible = false`
- Position it appropriately (e.g., at the bottom of the button list)

### Step 5 (C): Update Draw Function
- Wrap the button drawing loop in an `if (buttonsVisible)` condition
- Only draw buttons when `buttonsVisible` is `true`

### Step 5 (D): Update Mouse Click Handler
- When buttons are visible, handle clicks normally
- When buttons are hidden (`buttonsVisible` is `false`), clicking anywhere should show buttons again
- Set `buttonsVisible = true` when clicking while buttons are hidden

---

## Implementation Order

1. **First**: Complete Step 1 (Refactor buttons into array)
2. **Second**: Complete Step 2 (Use anonymous functions)
3. **Third**: Complete Step 3 (Refactor sounds and backgrounds into arrays)
4. **Fourth**: Complete Step 4 (Add custom assets)
5. **Fifth**: Complete Step 5 (Add button visibility toggle)

Each step builds upon the previous one, so follow them in order.

