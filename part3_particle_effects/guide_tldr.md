# Part 3: Particle Effects - Implementation Guide

## Overview
This guide outlines the step-by-step plan for adding animated particle effects to your jukebox. You'll create snow, fire, and stars animations that can be toggled on and off.

---

## Step 1: Add Snow Animation

### Step 1 (A1): Create Animations Array
- Create an `animations` array to store animation objects
- Each animation object has `setupFunction` and `drawFunction` properties
- Add the snow animation to the array

### Step 1 (A2): Add Snow Variables
- Create a `snowflakes` array to store individual snowflake objects
- Create a `currentAnimation` variable to track the active animation

### Step 1 (B): Create Setup Function for Snow
- Create `setupSnow()` function
- Initialize the `snowflakes` array
- Create 50 snowflake objects with random positions, sizes, and speeds
- Each snowflake has: `x`, `y`, `size`, `speed`

### Step 1 (C): Create Draw Function for Snow
- Create `drawSnow()` function
- Loop through all snowflakes
- Draw each snowflake as a white circle
- Move each snowflake downward
- Reset snowflakes that go off-screen (move back to top with new random x)

### Step 1 (D1): Add Animation Buttons
- Add "Snow" button to switch to snow animation
- Add "Disable Animation" button to turn off animations
- Add "Disable Background" button to hide background images

### Step 1 (D2): Update Draw Function
- Create `drawAnimation()` function that calls the current animation's draw function
- In `draw()`, check if `currentAnimation` exists before drawing
- Handle `currentBackground` being null (draw solid color background instead)

### Step 1 (E1): Handle Null Background
- In `draw()`, check if `currentBackground` exists
- If it exists, draw the background image
- If it doesn't exist, draw a solid color background

### Step 1 (E2): Initialize Animations in Setup
- Loop through the `animations` array in `setup()`
- Call each animation's `setupFunction()` to initialize them
- Set `currentAnimation` to the first animation (snow)

---

## Step 2: Add Swaying Effect to Snow

### Step 2 (A): Create Alternative Snow Functions
- Create `setupSnowAlt()` function (similar to `setupSnow()`)
- Add `sway` property to each snowflake (random value between -1 and 1)

### Step 2 (B): Create Draw Function with Swaying
- Create `drawSnowAlt()` function
- Move snowflakes horizontally using the `sway` value
- Reverse `sway` direction when snowflake hits screen edges
- Update the `animations` array to use the alternative snow functions

---

## Step 3: Add Fire Animation

### Step 3 (A1): Add Fire to Animations Array
- Add fire animation object to the `animations` array
- Include `setupFire` and `drawFire` functions

### Step 3 (A2): Add Fire Variables
- Create a `flames` array to store flame particles

### Step 3 (B): Create Setup Function for Fire
- Create `setupFire()` function
- Initialize the `flames` array
- Create 30 flame objects with random properties
- Each flame has: `x`, `y`, `size`, `speed`, `flicker`, `life`

### Step 3 (C): Create Draw Function for Fire
- Create `drawFire()` function
- Loop through all flames
- Move flames upward (negative y movement)
- Add random horizontal movement for flickering effect
- Decrease flame `life` and `size` over time
- Reset flames that die or get too small
- Draw flames with colors based on their `life` value (use `map()` function)
- Draw both outer and inner flame circles for depth

### Step 3 (D1): Add Fire Button
- Add "Fire" button to switch to fire animation
- Set callback to `currentAnimation = animations[1]`

---

## Step 4: Add Stars Animation

### Step 4 (A1): Add Stars to Animations Array
- Add stars animation object to the `animations` array
- Include `setupStars` and `drawStars` functions

### Step 4 (A2): Add Stars Variables
- Create a `stars` array to store star objects

### Step 4 (B): Create Setup Function for Stars
- Create `setupStars()` function
- Initialize the `stars` array
- Create 100 star objects with random positions and sizes
- Each star has: `x`, `y`, `size`, `brightness`, `twinkle`

### Step 4 (C): Create Draw Function for Stars
- Create `drawStars()` function
- Loop through all stars
- Update each star's `twinkle` value
- Calculate brightness using `sin()` function for twinkling effect
- Use `constrain()` to keep brightness within valid range
- Draw each star as a circle with the calculated brightness

### Step 4 (D1): Add Stars Button
- Add "Stars" button to switch to stars animation
- Set callback to `currentAnimation = animations[2]`

---

## Step 5: Add Shooting Star Feature

### Step 5 (A1): Add Shooting Star Variables
- Create `shootingStar` variable (null initially)
- Create `nextShootingStarTime` variable to track when next shooting star should appear

### Step 5 (B): Initialize Shooting Star Timing
- In `setupStars()`, initialize `shootingStar` to null
- Set `nextShootingStarTime` to a random time 3-6 seconds in the future

### Step 5 (C): Add Shooting Star Logic to Draw
- In `drawStars()`, call functions to handle shooting star creation and updates

### Step 5 (D1): Create Shooting Star Object
- Create `createShootingStar()` function
- Return an object with: `x`, `y`, `trail`, `speed`, `angle`, `life`

### Step 5 (D2): Check for Shooting Star Creation
- Create `handleShootingStarCreation()` function
- Check if current time (`millis()`) has reached `nextShootingStarTime`
- If no shooting star exists, create one
- Schedule next shooting star 3-6 seconds in the future

### Step 5 (D3): Update Shooting Star Position
- Create `updateShootingStar()` function
- Add current position to trail array
- Move shooting star using `cos()` and `sin()` based on angle
- Decrease `life` value for fade effect

### Step 5 (D4): Draw Shooting Star Trail
- Create `drawShootingStarTrail()` function
- Loop through trail array backwards
- Draw lines between trail points with decreasing opacity
- Remove faded trail points

### Step 5 (D5): Check if Shooting Star Should Be Removed
- Create `shouldRemoveShootingStar()` function
- Return true if shooting star is off-screen or life <= 0

### Step 5 (D6): Update and Draw Shooting Star
- Create `updateAndDrawShootingStar()` function
- Call update and draw functions
- Remove shooting star if it should be removed

---

## Implementation Order

1. **First**: Complete Step 1 (Basic snow animation)
2. **Second**: Complete Step 2 (Add swaying effect to snow)
3. **Third**: Complete Step 3 (Fire animation)
4. **Fourth**: Complete Step 4 (Stars animation)
5. **Fifth**: Complete Step 5 (Shooting star feature)

Each step builds upon the previous one, so follow them in order.

