# DJ Mixing Deck Workshop - Assistant Guide

This guide is for **workshop assistants** organizing and running the DJ Mixing Deck workshop. It explains how to structure and deliver the workshop to participants.

## Workshop Structure

The workshop is organized into 3 progressive parts, each building on the previous one:

```
DJ/
├── part1_starter/          # Part 1: Basic DJ Mixing Deck
│   ├── sketch.js           # Reference code (ASSISTANTS ONLY)
│   ├── index.html          # HTML file
│   ├── assets/             # Sound files (GIVE TO PARTICIPANTS)
│   └── workshop/           # Workshop documentation
│       ├── workshop.md     # Main workshop guide (GIVE TO PARTICIPANTS)
│       ├── detailed.md     # Detailed step-by-step guide (ASSISTANTS ONLY)
│       ├── tldr.md         # Quick reference (ASSISTANTS ONLY)
│       └── README.md       # Workshop metadata (ASSISTANTS ONLY)
│
├── part2_customization/    # Part 2: Adding Customization
│   ├── sketch.js           # Reference code (ASSISTANTS ONLY)
│   ├── index.html          # HTML file
│   ├── assets/             # Sound files (GIVE TO PARTICIPANTS)
│   └── workshop/           # Workshop documentation
│       ├── workshop.md     # Main workshop guide (GIVE TO PARTICIPANTS)
│       ├── detailed.md     # Detailed step-by-step guide (ASSISTANTS ONLY)
│       ├── tldr.md         # Quick reference (ASSISTANTS ONLY)
│       └── README.md       # Workshop metadata (ASSISTANTS ONLY)
│
└── part3_advanced/         # Part 3: Advanced Features
    ├── sketch.js           # Reference code (ASSISTANTS ONLY)
    ├── index.html          # HTML file
    ├── assets/             # Sound files (GIVE TO PARTICIPANTS)
    └── workshop/           # Workshop documentation
        ├── workshop.md     # Main workshop guide (GIVE TO PARTICIPANTS)
        ├── detailed.md     # Detailed step-by-step guide (ASSISTANTS ONLY)
        ├── guide_tldr.md   # Quick reference (ASSISTANTS ONLY - rename to tldr.md)
        └── workshop_metadata.md  # Metadata (ASSISTANTS ONLY - rename to README.md)
```

## Files Distribution

### Files for Participants
- ✅ **`workshop.md`** - Main workshop guide with step-by-step instructions
- ✅ **`assets/`** - Sound files needed for the project

### Files for Assistants Only
- 🔒 **`sketch.js`** - Complete reference code (participants should not see this)
- 🔒 **`detailed.md`** - Detailed explanations for assistants
- 🔒 **`guide_tldr.md`** - Quick reference (should be renamed to `tldr.md`)
- 🔒 **`workshop_metadata.md`** - Workshop metadata (should be renamed to `README.md`)

**Important**: Participants should work through the workshop without seeing the reference code or assistant-only documentation. This encourages learning through doing.

## Setup Instructions

### Prerequisites
- **p5.js Web Editor**: All work should be done in the p5.js web editor
- **p5.sound Library**: Version 1.11.11 (must be included)
- **Assets**: Sound files from the `assets/` folder

### Pre-Workshop Setup (Part 1)

**Before the workshop starts**, assistants should:

1. **Create a p5.js template**:
   - Open [p5.js web editor](https://editor.p5js.org/)
   - Include the p5.sound library (version 1.11.11)
   - Upload the default sound files from `part1_starter/assets/` to the p5.js editor
   - Add only the bootstrap code (see below)
   - Save and share the link with participants

2. **Bootstrap code template**:
   ```javascript
   function preload() {
       // Sounds will be loaded here
   }

   function setup() {
       createCanvas(800, 600);
   }

   function draw() {
       background(255);
   }
   ```

3. **Share the template link**:
   - Share the p5.js editor link with participants
   - Participants can fork/copy this template to start
   - This ensures everyone has the assets uploaded and ready to use

**Why this approach?**
- Participants don't need to manually upload assets at the start
- Everyone starts with the same setup
- Focuses attention on learning the code, not file management
- Assets are already in the p5.js editor, ready to reference

### During the Workshop

1. **Part 1: Starter**
   - Participants follow `workshop.md`
   - They build the basic DJ mixing deck from scratch
   - Assistants use `detailed.md` for explanations and troubleshooting

2. **Part 2: Customization**
   - Participants continue building on their Part 1 code
   - They add file upload features and mobile support
   - Assistants use `detailed.md` and `tldr.md` for quick reference

3. **Testing Phase** (Between Part 2 and Part 3)
   - **Important break**: Have participants test their DJ app!
   - Open their DJ app in the p5.js editor
   - Connect to a speaker or headphones
   - Load their own music files
   - **Start mixing!** Let them experiment and have fun
   - This reinforces what they've learned and motivates them for Part 3

4. **Part 3: Advanced**
   - Participants add advanced features (time sliders, crossfader, BPM visualization)
   - They learn code organization and refactoring
   - Assistants use `detailed.md` for in-depth explanations

## Parts Overview

### Part 1: Starter
**Basic DJ Mixing Deck**
- Two play/pause buttons
- Two volume sliders
- Basic mixing functionality
- Simple, clean interface
- **Learning focus**: Objects, sound loading, buttons, sliders, event handling

### Part 2: Customization
**Adding Customization Features**
- File upload for background images
- File upload for track sounds
- Mobile-friendly design
- Touch support
- Responsive layout
- **Learning focus**: File handling, responsive design, mobile development

### Part 3: Advanced
**Advanced DJ Features**
- Time sliders (seek/jump in tracks)
- Time display (MM:SS format)
- Crossfader for smooth transitions
- BPM visualization (pulsating circles)
- All customization features from Part 2
- Refactored code with helper functions
- **Learning focus**: Advanced audio control, trigonometry, code organization

## Assistant Resources

Each part includes assistant-only resources:

- **`sketch.js`** - Complete working reference code
  - Use this to understand the final result
  - Help troubleshoot participant issues
  - Never share this with participants!

- **`detailed.md`** - Detailed step-by-step guide
  - In-depth explanations of concepts
  - Additional context and examples
  - Troubleshooting tips

- **`tldr.md`** - Quick reference
  - Bullet points for quick lookup
  - Key code snippets
  - Fast reference during workshop

- **`README.md`** - Workshop metadata
  - Learning objectives
  - Prerequisites
  - Assessment criteria
  - Workshop structure details

## Best Practices

1. **Don't share reference code**: Participants learn more by building from scratch
2. **Use the template**: Pre-upload assets to save time and avoid confusion
3. **Encourage experimentation**: The testing phase between Part 2 and 3 is crucial
4. **Be patient**: Some concepts (like objects) may be new to participants
5. **Use detailed.md**: It has extra explanations for common questions
6. **Test the template**: Make sure your p5.js template works before sharing

## Troubleshooting

- **Sounds not loading?** Check that assets are uploaded in p5.js editor
- **Library not found?** Verify p5.sound version 1.11.11 is included
- **Code not working?** Refer to `sketch.js` (assistants only) to see the solution
- **Participants stuck?** Use `detailed.md` for additional explanations

---

**Remember**: The goal is for participants to learn by building, not by copying. Keep the reference code and assistant materials separate from participant materials!
