# Quick Reference: DJ Mixing Deck - Customization

A quick guide for adding file upload functionality to your DJ deck.

---

## Step 1: Understanding File Uploads

- File uploads let users select files from their computer
- Use `createFileInput()` to create upload buttons
- Files can be images or audio

---

## Step 2: Background Image Upload

### Step 2 (A): Create Variable
- Add `let bgImage = null;` at top of code

### Step 2 (B): Create File Input
- In `setup()`: `let bgFileInput = createFileInput(handleBackgroundImage);`
- Position: `bgFileInput.position(10, 10);`
- Restrict: `bgFileInput.attribute('accept', 'image/*');`

### Step 2 (C): Create Handler
- Function: `handleBackgroundImage(file)`
- Check: `if (file.type === 'image')`
- Load: `bgImage = loadImage(file.data);`

### Step 2 (D): Display Image
- In `draw()`: `if (bgImage) { image(bgImage, 0, 0, width, height); } else { background(255); }`

---

## Step 3: Sound Upload for Track 1

### Step 3 (A): Add Property
- In track objects: `fileInput: null`

### Step 3 (B): Create File Input
- In `setup()`: `track1.fileInput = createFileInput(function(file) { handleSoundUpload(file, track1); });`
- Position: `track1.fileInput.position(10, 50);`
- Restrict: `track1.fileInput.attribute('accept', 'audio/*');`

### Step 3 (C): Create Handler
- Function: `handleSoundUpload(file, track)`
- Check: `if (file.type === 'audio')`
- Stop old: `if (track.sound && track.sound.isPlaying()) { track.sound.stop(); ... }`
- Load new: `track.sound = loadSound(file.data);`
- Set volume: `track.sound.setVolume(track.volume);`

---

## Step 4: Sound Upload for Track 2

- Same as Step 3, but for `track2`
- Position: `track2.fileInput.position(10, 90);`
- Uses same `handleSoundUpload()` function

---

## Step 5: Improve User Experience

### Add Labels
- In `draw()`: `text("Upload Background:", 10, 35);`
- `text("Upload Track 1:", 10, 75);`
- `text("Upload Track 2:", 10, 115);`

### Handle Edge Cases
- In `toggleTrack()`: Check `if (!track.sound) { return; }`
- In `draw()`: Check `if (track1.sound && track1.sound.isPlaying())`

---

## Key Functions

- `createFileInput(callback)` - creates file upload button
- `loadImage(file.data)` - loads image from file
- `loadSound(file.data)` - loads sound from file
- `file.type` - checks file type ('image' or 'audio')
- `file.data` - contains file data to load

---

## Step 7: Mobile-Friendly

### Step 7 (A): Responsive Canvas
- Use `createCanvas(windowWidth, windowHeight)` instead of fixed size

### Step 7 (B): Responsive Positions
- Create `updatePositions()` function
- Use percentages: `width * 0.3` instead of fixed pixels
- Calculate based on screen size

### Step 7 (C): Touch Support
- Add `.touchStarted()` handlers to buttons
- Same as `.mousePressed()` but for touch

### Step 7 (D): Window Resize
- Create `windowResized()` function
- Resize canvas and update positions

---

## Step 8: Sharing

### Share on p5.js
- Click "Share" button in editor
- Copy the link
- Send to friends

### Test on Mobile
- Open link on phone/tablet
- Test all features
- Test screen rotation

### Share with Friends
- Send link to friend
- Ask them to customize it
- Share it back!

---

## Testing Checklist

- ✅ Upload background image - does it display?
- ✅ Upload Track 1 sound - does it work?
- ✅ Upload Track 2 sound - does it work?
- ✅ Play both tracks - do they mix?
- ✅ Click play before upload - handled gracefully?
- ✅ Works on mobile - buttons respond to touch?
- ✅ Responsive - adapts to screen size?
- ✅ Screen rotation - everything stays positioned?

---

## Troubleshooting

- **Image doesn't display**: Check `draw()` has `if (bgImage) { image(...) }`
- **Sound doesn't play**: Check `loadSound(file.data)` and volume setting
- **Wrong position**: Adjust `position()` values
- **Wrong file types**: Check `attribute('accept', ...)`
- **Crashes**: Add checks for `if (track.sound)` before using

