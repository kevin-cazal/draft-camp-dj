# Workshop: DJ Mixing Deck - Customization

## Welcome!

Congratulations on completing the DJ Mixing Deck Starter! Now you're going to add customization features that let users upload their own sounds and background images. This makes your DJ deck truly personal and unique!

---

## What You'll Build

By the end of this workshop, you'll have:
- ✅ A DJ deck that accepts uploaded background images
- ✅ File upload buttons for each track
- ✅ The ability to replace sounds with your own audio files
- ✅ A fully customizable DJ mixing experience
- ✅ **Mobile-friendly design** that works on phones and tablets
- ✅ **Touch support** for mobile devices
- ✅ **Responsive layout** that adapts to any screen size

---

## Step 1: Understanding File Uploads

### What Are File Uploads?

File uploads let users select files from their computer and use them in your program. Think of it like choosing a photo to upload to social media - you click a button, select a file, and it becomes part of the application.

**Real-world example**: When you upload a profile picture:
1. You click "Choose File"
2. A file browser opens
3. You select an image file
4. The image appears in the application

### How File Uploads Work in p5.js

In p5.js, you use `createFileInput()` to make a file upload button. When a user selects a file, p5.js gives you information about that file, and you can use it in your program.

**The Process**:
1. Create a file input button
2. User clicks and selects a file
3. Your program receives the file information
4. You load and use the file (image or sound)

**Visual Concept**: [SCHEMA PLACEHOLDER: Diagram showing file upload flow - button → file selection → file loading → use in program]

**Documentation**: [`createFileInput()`](https://p5js.org/reference/#/p5/createFileInput) creates a file upload button.

---

## Step 2: Adding Background Image Upload

### Understanding Image Uploads

You want users to be able to upload their own background image. This replaces the white background with their chosen image.

**The Logic**:
1. Create a file input button for images
2. Position it on the screen
3. When a file is selected, check if it's an image
4. Load the image and store it in a variable
5. Display it as the background in `draw()`

### Step 2A: Creating a Variable for the Background Image

**The Concept**: You need a place to store the uploaded image.

**What you need to do**: At the top of your code (before the track objects), create a variable to store the background image. Think about what value it should start with - we don't have an image yet, so what should the initial value be?

**Why `null`?** It means "no image yet" - we'll set it when a user uploads an image. This is a common pattern in programming - using `null` to represent "nothing yet" or "not set yet".

### Step 2B: Creating the File Input Button

**The Logic**: In `setup()`, create a file input button for images.

**What you need to do**: In `setup()`, after creating the canvas, create a file input button. Think about:
1. What function should run when a file is selected? (This is the handler function)
2. Where should the button be positioned on screen?
3. How can you restrict file selection to only images?

**The process**: When you create a file input, you tell it what function to call when a file is selected. This function will receive information about the selected file, which you can then use to load the image.

**Understanding the code**:
- `createFileInput()` creates the button
- The function name `handleBackgroundImage` is what runs when a file is selected
- `position()` places it on screen
- `attribute('accept', 'image/*')` restricts file selection to images only

**Visual Concept**: [SCHEMA PLACEHOLDER: Diagram showing file input button positioned on screen]

**Documentation**: 
- [`createFileInput()`](https://p5js.org/reference/#/p5/createFileInput)
- [`.position()`](https://p5js.org/reference/#/p5.Element/position)
- [`.attribute()`](https://p5js.org/reference/#/p5.Element/attribute)

### Step 2C: Creating the Handler Function

**The Logic**: When a user selects an image file, you need a function to handle it.

**What you need to do**: Create a function that handles when a user selects an image file. Think about:
1. What information will this function receive about the selected file?
2. How can you check if the file is actually an image (not some other type)?
3. If it is an image, how do you load it and store it in your variable?

**The process**: This function will be called automatically by p5.js when a file is selected. It receives a file object that contains information about the selected file, including the file data that you can use to load the image.

**Understanding the code**:
- `file.type` tells you what kind of file it is
- `file.data` contains the file data that p5.js can use
- `loadImage()` loads an image from the file data

**Documentation**: [`loadImage()`](https://p5js.org/reference/#/p5/loadImage) loads image files.

**Test it!** Try uploading an image - you should see the file input button, but the image won't display yet (we'll add that next).

### Step 2D: Displaying the Background Image

**The Logic**: In `draw()`, check if an image is loaded, and if so, display it as the background.

**What you need to do**: In your `draw()` function, at the very beginning, you need to decide what to draw as the background. Think about:
1. How can you check if an image has been uploaded?
2. If an image exists, how do you draw it to fill the entire canvas?
3. If no image exists yet, what should the background be?

**The process**: This is a conditional check - if we have an image, use it; otherwise, use the default white background. This happens every frame in `draw()`, so the background will update immediately when an image is uploaded.

**Understanding the code**:
- `if (bgImage)` checks if an image was uploaded
- `image()` draws the image to fill the entire canvas
- `width` and `height` make it fill the canvas size

**Visual Concept**: [SCHEMA PLACEHOLDER: Diagram showing conditional background - image if loaded, white if not]

**Documentation**: [`image()`](https://p5js.org/reference/#/p5/image) draws images.

**Test it!** Upload an image - it should now appear as the background!

---

## Step 3: Adding Sound Upload for Track 1

### Understanding Sound Uploads

Now you want users to upload their own sounds for each track. This is similar to image uploads, but for audio files.

**The Logic**:
1. Add a file input property to the track object
2. Create a file input button in `setup()`
3. When a file is selected, handle it
4. Load the sound and replace the existing one

### Step 3A: Adding File Input Property to Track Objects

**The Concept**: Each track needs to store its file input button.

**What you need to do**: In both `track1` and `track2` objects, add a property to store the file input button. Think about what value it should start with - we haven't created the button yet, so what should the initial value be?

**Why?** This stores the file input button, just like how we store the slider and button. Keeping all the UI elements for a track together in the track object makes the code more organized.

### Step 3B: Creating the File Input Button for Track 1

**The Logic**: In `setup()`, create a file input button for track 1's sound.

**What you need to do**: In `setup()`, after creating the background image file input, create a file input button for track 1. Think about:
1. What function should run when a file is selected? (You'll need to pass both the file and which track it's for)
2. Where should this button be positioned? (Below the background upload button)
3. How can you restrict file selection to only audio files?

**The process**: This is similar to the background image upload, but this time you need to tell the handler function which track the sound is for. You can do this by passing the track object to the handler function.

**Understanding the code**:
- `createFileInput()` with a function that calls `handleSoundUpload()`
- We pass both the file and the track object to the handler
- `position()` places it below the background upload button
- `accept` restricts to audio files only

**Visual Concept**: [SCHEMA PLACEHOLDER: Diagram showing file input buttons stacked vertically]

**Test it!** You should see a second file input button, but it won't work yet (we'll add the handler next).

### Step 3C: Creating the Sound Upload Handler

**The Logic**: When a user selects an audio file, you need to load it and replace the existing sound.

**What you need to do**: Create a function that handles when a user selects an audio file. Think about:
1. What information does this function need? (The file, and which track it's for)
2. How can you check if the file is actually an audio file?
3. If there's already a sound playing, what should happen to it?
4. How do you load the new sound and make it ready to play?

**The process**: This function needs to handle replacing an existing sound. If a sound is currently playing, you should stop it first. Then load the new sound and set it up with the correct volume so it's ready to play.

**Understanding the code**:
- `file.type === 'audio'` checks if it's an audio file
- `track.sound.stop()` stops the current sound if playing
- `loadSound(file.data)` loads the new sound from the file
- We set the volume so it's ready to play

**Important**: If the sound is playing when a new one is uploaded, you should:
- Stop it: `track.sound.stop()`
- Reset the button: `track.button.html(track.buttonLabel + " ▶")`
- Set `track.isPlaying = false`

**Documentation**: [`loadSound()`](https://p5js.org/reference/#/p5.sound/p5.SoundFile) loads sound files.

**Test it!** Upload an audio file for track 1 - it should replace the default sound!

---

## Step 4: Adding Sound Upload for Track 2

### Repeating the Process

**The Logic**: Track 2 needs the same functionality as Track 1.

**What you need to do**: In `setup()`, after creating track 1's file input, create a similar file input for track 2. Think about:
1. How can you reuse the same handler function for track 2?
2. Where should this button be positioned? (Below track 1's upload button)
3. What's different from track 1's setup? (Just the track object and position)

**Why the same handler?** The `handleSoundUpload()` function works for any track because we pass the track object as a parameter. This is code reuse - we write the logic once and use it for both tracks!

**Visual Concept**: [SCHEMA PLACEHOLDER: Diagram showing both track file inputs positioned vertically]

**Test it!** Upload audio files for both tracks - they should both work!

---

## Step 5: Improving User Experience

### Adding Labels

**The Logic**: Users need to know what each file input button does.

**What you need to do**: In your `draw()` function, add text labels above each file input button. Think about:
1. What text should each label say?
2. Where should each label be positioned? (Just above its corresponding button)
3. How should the text be aligned?

**The process**: Labels help users understand what each button does. Position them just above each file input button so it's clear which label goes with which button.

**Understanding the code**:
- Use `textAlign(LEFT)` to align text to the left
- Position labels just above each file input button
- Use `fill(0)` for black text

**Visual Concept**: [SCHEMA PLACEHOLDER: Diagram showing labels positioned above file inputs]

**Test it!** The labels should make it clear what each button does!

### Handling Edge Cases

**The Logic**: Your code should handle situations where things might go wrong.

**What you need to do**: Make sure your code handles cases where things might not be set up yet. Think about:
1. What happens if a user clicks play before uploading a sound?
2. What happens if you try to check if a sound is playing, but the sound doesn't exist yet?

**The process**: Before using something (like a sound), check if it exists first. This prevents errors and makes your program more robust. This is called "defensive programming" - checking for potential problems before they cause crashes.

**Test it!** Try clicking play buttons before uploading sounds - the program should handle it gracefully!

---

## Step 6: Putting It All Together

### Final Testing

**What you need to do**: Test all the features to make sure everything works together:
1. ✅ Upload a background image - does it display?
2. ✅ Upload a sound for Track 1 - does it replace the default?
3. ✅ Upload a sound for Track 2 - does it replace the default?
4. ✅ Play both tracks - do they work with uploaded sounds?
5. ✅ Adjust volumes - do the sliders still work?
6. ✅ Mix the tracks - can you play both at once?

**The process**: Testing is important to make sure all the pieces work together. Try different combinations - upload different files, play tracks, adjust volumes. Make sure nothing breaks!

### Customization Ideas

Now that you have file uploads working, try:
- Upload different background images
- Upload your favorite songs
- Mix different genres of music
- Create themed DJ decks (e.g., all electronic music with a neon background)

---

## Step 7: Making It Mobile-Friendly

### Understanding Mobile Support

Your DJ deck should work on mobile devices! This means:
- **Touch support**: Buttons and sliders work with touch, not just mouse clicks
- **Responsive design**: The layout adapts to different screen sizes
- **Full screen**: Uses the entire screen on mobile devices

### Step 7A: Making the Canvas Responsive

**The Logic**: Instead of a fixed canvas size, use the full window size so it works on any device.

**What you need to do**: In `setup()`, change how you create the canvas. Instead of a fixed size, use variables that give you the size of the browser window. Think about:
1. What p5.js variables give you the window dimensions?
2. How does this make your sketch work on different screen sizes?

**The process**: Using `windowWidth` and `windowHeight` makes your canvas fill the entire browser window, regardless of the device size. This is the first step to making your sketch responsive.

**Understanding the code**:
- `windowWidth` and `windowHeight` are p5.js variables that give you the browser window size
- This makes your canvas fill the entire screen on any device

**Documentation**: [`windowWidth`](https://p5js.org/reference/#/p5/windowWidth) and [`windowHeight`](https://p5js.org/reference/#/p5/windowHeight) give you the window dimensions.

### Step 7B: Making Positions Responsive

**The Logic**: Instead of hardcoded positions, calculate them based on screen size.

**What you need to do**: Create a function that calculates positions based on the screen size. Think about:
1. How can you use percentages instead of fixed pixel values?
2. How do you calculate positions relative to the center of the screen?
3. What positions need to be updated? (Buttons, sliders, etc.)

**The process**: Instead of saying "put this at x=150", you say "put this at 30% from the left edge". This way, the layout adapts to any screen size. Calculate positions using percentages of `width` and `height`.

**Example logic**:
- Center X: `width / 2`
- Button Y: `height * 0.3` (30% down the screen)
- Slider Y: `height * 0.6` (60% down the screen)
- Track 1: `centerX - width * 0.2` (left of center)
- Track 2: `centerX + width * 0.2` (right of center)

**Visual Concept**: [SCHEMA PLACEHOLDER: Diagram showing responsive positioning based on screen size]

**Test it!** Resize your browser window - the buttons and sliders should move to stay in the right positions!

### Step 7C: Adding Touch Support

**The Logic**: Mobile devices use touch, not mouse clicks. You need to support both.

**What you need to do**: When creating buttons, add support for touch events in addition to mouse clicks. Think about:
1. What method handles touch events on buttons?
2. Should it do the same thing as mouse clicks?

**The process**: Mobile devices use touch events instead of mouse events. By adding both `.mousePressed()` and `.touchStarted()`, your buttons will work on both desktop (mouse) and mobile (touch) devices.

**Understanding the code**:
- `.touchStarted()` is like `.mousePressed()` but for touch screens
- This makes buttons work on mobile devices

**Documentation**: [`.touchStarted()`](https://p5js.org/reference/#/p5.Element/touchStarted) handles touch events.

**Test it!** On a mobile device, you should be able to tap the buttons to play/pause!

### Step 7D: Handling Window Resize

**The Logic**: When the window size changes (like rotating a phone), you need to update positions.

**What you need to do**: Create a function that automatically runs when the window is resized. Think about:
1. What needs to happen when the window size changes?
2. How do you resize the canvas?
3. What positions need to be recalculated?

**The process**: When a user rotates their phone or resizes the browser window, everything needs to reposition itself. The `windowResized()` function runs automatically when this happens, so you can update the canvas size and recalculate all positions.

**Understanding the code**:
- `windowResized()` runs automatically when the window size changes
- This keeps everything positioned correctly after rotation or resize

**Documentation**: [`windowResized()`](https://p5js.org/reference/#/p5/windowResized) handles window resize events.

**Test it!** Rotate your phone or resize the browser - everything should stay in the right place!

---

## Step 8: Sharing Your DJ Deck

### Sharing on p5.js Web Editor

**The Logic**: Once your DJ deck is working, you can share it with others!

**What you need to do**: In the p5.js web editor, find the share feature and create a link to your sketch. Think about:
1. Where is the share button in the editor?
2. How do you get a link that others can use?
3. Who would you like to share this with?

**The process**: Sharing your sketch creates a link that anyone can open in their browser. They'll see your DJ deck and can use it themselves!

**Why share?** 
- Friends can use your DJ deck
- They can upload their own sounds and images
- You can get feedback and see how others use it

### Testing on Mobile

**What you need to do**: Open your shared sketch on a mobile device and test everything. Think about:
1. Do all the buttons work with touch?
2. Can you interact with all the controls?
3. Does the layout look good on a small screen?
4. What happens when you rotate the device?

**The process**: Testing on mobile is important because touch interactions are different from mouse clicks, and screen sizes are different. Make sure everything works well on a real device!

**Why test on mobile?**
- Mobile devices are how most people access the web
- Touch interactions are different from mouse clicks
- Screen sizes vary, so you need to make sure it works everywhere

### Sharing with Friends

**What you need to do**: Share your sketch with others and see how they use it. Think about:
1. Who would enjoy using your DJ deck?
2. What would you like them to try?
3. How can you get feedback to improve it?

**The process**: Sharing your creation lets others experience what you built. They might use it in ways you didn't expect, or give you ideas for improvements. It's also fun to see how others customize it with their own sounds and images!

**Why share?**
- See how others customize your creation
- Get ideas for improvements
- Build a community around your project
- Have fun mixing music together!

---

## Congratulations! 🎉

You've successfully added customization features to your DJ deck! Users can now:
- Upload their own background images
- Upload their own sounds for each track
- Create a truly personalized DJ mixing experience

**What You Learned**:
- How file uploads work in web applications
- How to create file input buttons in p5.js
- How to handle image and audio file uploads
- How to replace existing assets with user-uploaded files
- How to improve user experience with labels and error handling
- How to make your sketch mobile-friendly with responsive design
- How to add touch support for mobile devices
- How to share your creation with others

**Next Steps**:
- Experiment with different file types
- Add more customization options
- **Share your p5.js sketch link with friends!**
- **Test it on mobile devices**
- **Encourage friends to create their own custom DJ decks!**

---

## Troubleshooting

**Problem**: Image doesn't display after upload
- **Solution**: Check that you're using `image()` in `draw()` and checking if `bgImage` exists

**Problem**: Sound doesn't play after upload
- **Solution**: Make sure you're calling `loadSound(file.data)` and setting the volume

**Problem**: File input buttons are in the wrong place
- **Solution**: Adjust the `position()` values to move them where you want

**Problem**: Wrong file types can be selected
- **Solution**: Check that you're using `.attribute('accept', 'image/*')` or `'audio/*'`

**Problem**: Buttons don't work on mobile
- **Solution**: Make sure you added `.touchStarted()` handlers to your buttons

**Problem**: Layout looks wrong on mobile
- **Solution**: Check that you're using `windowWidth` and `windowHeight`, and that `updatePositions()` calculates positions based on screen size

**Problem**: Elements don't move when screen rotates
- **Solution**: Make sure you have a `windowResized()` function that updates positions

**Remember**: If something doesn't work, check the browser console for error messages!

