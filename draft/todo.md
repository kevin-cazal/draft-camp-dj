# Workshop Materials TODO

This document tracks remaining tasks to complete the workshop materials.

---

## 1. p5.js Web Editor Usage Guide

### Status: ⬜ TODO

Create a comprehensive guide for using the p5.js Web Editor as the development environment for the workshops.

**Content to Include**:
- [ ] Introduction to p5.js Web Editor
  - [ ] What it is and why use it
  - [ ] Benefits for beginners (no setup required)
  - [ ] Link to editor: https://editor.p5js.org/

- [ ] Getting Started
  - [ ] Creating a new sketch
  - [ ] Understanding the interface
  - [ ] File structure in the editor
  - [ ] Saving and loading sketches

- [ ] Working with Assets
  - [ ] How to upload images to the editor
  - [ ] How to upload sounds to the editor
  - [ ] File naming conventions
  - [ ] Supported file formats
  - [ ] Organizing assets in the editor

- [ ] Using p5.sound Library
  - [ ] How to add the p5.sound library
  - [ ] Where to find it in the editor
  - [ ] Verifying it's loaded correctly

- [ ] Running and Testing
  - [ ] How to run the sketch
  - [ ] Understanding the console
  - [ ] Debugging tips in the editor
  - [ ] Common errors and solutions

- [ ] Sharing and Exporting
  - [ ] How to share sketches
  - [ ] Getting shareable links
  - [ ] Downloading code
  - [ ] Exporting as HTML


**File Location**: Create `p5js_web_editor_guide.md` in the root directory

**Target Audience**: High school students and workshop instructors

**Style**: Step-by-step with screenshots, clear explanations, beginner-friendly

---

## 2. Replace Placeholders with Proper Illustrations

### Status: ⬜ TODO

All workshop files contain `[SCHEMA PLACEHOLDER: ...]` markers that need to be replaced with actual illustrations, diagrams, or images.

### Workshop 1 Placeholders

**File**: `part1_basic_jukebox/workshop.md`

- [ ] **Placeholder 1**: "Diagram showing Variables → Functions → Events, with examples"
  - **Type**: Flow diagram
  - **Content**: Visual representation of how variables, functions, and events work together
  - **Location**: Introduction section

- [ ] **Placeholder 2**: "Diagram showing text positioning on canvas, with x/y coordinates labeled"
  - **Type**: Coordinate system diagram
  - **Content**: Canvas with (0,0) labeled, x/y axes, example text position
  - **Location**: Step 1: Display Text

- [ ] **Placeholder 3**: "Animation showing flipbook concept with frames, then showing how draw() creates each frame"
  - **Type**: Animated diagram or series of frames
  - **Content**: Flipbook animation concept, then p5.js draw() loop visualization
  - **Location**: Step 1: Drawing Text

- [ ] **Placeholder 4**: "Canvas with coordinate system labeled, showing where (0,0) is, and how x/y increase"
  - **Type**: Coordinate system diagram
  - **Content**: Detailed canvas coordinate system with labels
  - **Location**: Step 1: Drawing Text

- [ ] **Placeholder 5**: "Layer diagram showing background drawn first, then text on top"
  - **Type**: Layer diagram
  - **Content**: Visual showing drawing order (background layer, text layer)
  - **Location**: Step 2: Drawing Background

- [ ] **Placeholder 6**: "Diagram of a button showing x, y, width, height, and click area"
  - **Type**: Button anatomy diagram
  - **Content**: Button rectangle with all properties labeled
  - **Location**: Step 3: Creating Interactive Buttons

- [ ] **Placeholder 7**: "Layout diagram showing buttons stacked vertically with spacing"
  - **Type**: Layout diagram
  - **Content**: Multiple buttons positioned vertically with spacing indicated
  - **Location**: Step 3: Storing Button Information

- [ ] **Placeholder 8**: "Diagram showing mouse click detection with coordinates, showing how to check if point is inside rectangle"
  - **Type**: Click detection diagram
  - **Content**: Mouse click point, button rectangle, visual showing inside/outside check
  - **Location**: Step 3: Making Buttons Clickable

- [ ] **Placeholder 9**: "Flow diagram showing setup → draw loop → mouse interaction → state change → updated draw"
  - **Type**: Flow diagram
  - **Content**: Complete program flow visualization
  - **Location**: Putting It All Together

### Workshop 2 Placeholders

**File**: `part2_refactoring_customization/workshop.md`

- [ ] **Placeholder 1**: "Diagram showing before/after code structure - before: many separate boxes, after: one organized container"
  - **Type**: Before/after comparison diagram
  - **Content**: Visual comparison of individual variables vs. array structure
  - **Location**: Introduction

- [ ] **Placeholder 2**: "Diagram showing transformation from separate boxes to one array container"
  - **Type**: Transformation diagram
  - **Content**: Visual showing buttons being organized into an array
  - **Location**: Step 1: Organizing Buttons

- [ ] **Placeholder 3**: "Animation showing loop iterating through array items"
  - **Type**: Animated diagram
  - **Content**: Loop visualization showing iteration through array
  - **Location**: Step 1: Updating Draw Function

- [ ] **Placeholder 4**: "Diagram showing how adding to array automatically works with existing loops"
  - **Type**: Extension diagram
  - **Content**: Visual showing new items being added and automatically handled
  - **Location**: Step 4: Customization

- [ ] **Placeholder 5**: "Diagram showing this pattern applied to different scenarios"
  - **Type**: Pattern application diagram
  - **Content**: Array/loop pattern shown in multiple contexts
  - **Location**: The Big Picture

### Workshop 3 Placeholders

**File**: `part3_particle_effects/workshop.md`

- [ ] **Placeholder 1**: "Diagram showing individual particles vs. the collective effect they create"
  - **Type**: Particle system diagram
  - **Content**: Individual particles and the visual effect they create together
  - **Location**: Introduction

- [ ] **Placeholder 2**: "Flow diagram showing Initialization → Update Loop → Draw Loop, with examples of what happens in each phase"
  - **Type**: System flow diagram
  - **Content**: Three-phase particle system with examples
  - **Location**: Understanding Particle Systems

- [ ] **Placeholder 3**: "Flipbook animation showing how individual frames create movement illusion"
  - **Type**: Animation diagram
  - **Content**: Flipbook frames creating animation illusion
  - **Location**: Animation Loop

- [ ] **Placeholder 4**: "Diagram showing array of particle objects, with loop iterating through them"
  - **Type**: Array iteration diagram
  - **Content**: Array of particle objects with loop visualization
  - **Location**: Understanding Arrays of Objects

- [ ] **Placeholder 5**: "Diagram showing snowflake path - starting above, falling down with sway, resetting at bottom"
  - **Type**: Path diagram
  - **Content**: Snowflake falling path with reset visualization
  - **Location**: Step 1: Snow Animation

- [ ] **Placeholder 6**: "Animation showing snowflake falling, hitting bottom, resetting to top"
  - **Type**: Animation diagram
  - **Content**: Snowflake reset cycle animation
  - **Location**: Step 1: Draw Function

- [ ] **Placeholder 7**: "Diagram showing snowflake with sway path - zigzagging downward"
  - **Type**: Path diagram
  - **Content**: Snowflake with horizontal sway movement
  - **Location**: Step 1: Swaying Effect

- [ ] **Placeholder 8**: "Diagram showing flame rising, flickering, fading, then respawning"
  - **Type**: Lifecycle diagram
  - **Content**: Fire particle lifecycle visualization
  - **Location**: Step 2: Fire Animation

- [ ] **Placeholder 9**: "Diagram showing flame with outer and inner circles, color gradient based on life"
  - **Type**: Fire structure diagram
  - **Content**: Fire particle with layers and color visualization
  - **Location**: Step 2: Fire Draw

- [ ] **Placeholder 10**: "Graph showing sine wave, with values oscillating between -1 and 1"
  - **Type**: Mathematical graph
  - **Content**: Sine wave graph for twinkling explanation
  - **Location**: Step 3: Understanding Sine Function

- [ ] **Placeholder 11**: "Diagram showing star brightness oscillating over time"
  - **Type**: Time-based diagram
  - **Content**: Star brightness over time graph
  - **Location**: Step 3: Stars Draw

- [ ] **Placeholder 12**: "Diagram showing shooting star with trail, showing how trail points fade over time"
  - **Type**: Trail system diagram
  - **Content**: Shooting star with fading trail visualization
  - **Location**: Step 4: Shooting Stars

- [ ] **Placeholder 13**: "Diagram showing angle, with cos and sin components labeled"
  - **Type**: Trigonometry diagram
  - **Content**: Angle with trigonometric components visualized
  - **Location**: Step 4: Angles and Movement

- [ ] **Placeholder 14**: "Diagram showing trail array, with points being added and removed, opacity fading"
  - **Type**: Data structure diagram
  - **Content**: Trail array visualization with fade
  - **Location**: Step 4: Trail System

### Illustration Requirements

**Format Options**:
- [ ] Vector graphics (SVG recommended for scalability)
- [ ] High-resolution PNG images
- [ ] Animated GIFs for motion concepts
- [ ] Interactive HTML/CSS/JS diagrams (if hosting allows)

**Style Guidelines**:
- [ ] Consistent color scheme across all illustrations
- [ ] Clear labels and annotations
- [ ] Beginner-friendly (not too technical)
- [ ] Accessible (good contrast, readable fonts)
- [ ] Professional but approachable

**Tools to Consider**:
- [ ] Draw.io / diagrams.net for flow diagrams
- [ ] Inkscape or Adobe Illustrator for vector graphics
- [ ] Python matplotlib for mathematical graphs
- [ ] p5.js sketches for interactive diagrams
- [ ] Canva or similar for simple diagrams

**File Organization**:
- [ ] Create `assets/illustrations/` directory
- [ ] Organize by workshop (part1/, part2/, part3/)
- [ ] Use descriptive filenames
- [ ] Include alt text descriptions for accessibility

---

## 3. Delivery Method

### Status: ⬜ TODO

Define and document how the workshops will be delivered to students.

### Delivery Options to Consider

- [ ] **In-Person Workshop**
  - [ ] Classroom setup requirements
  - [ ] Equipment needed (computers, projectors)
  - [ ] Instructor materials
  - [ ] Student handouts
  - [ ] Timing and schedule


### Documentation Needed

- [ ] **Instructor Guide**
  - [ ] How to prepare for the workshop
  - [ ] Setup instructions
  - [ ] Teaching tips and strategies
  - [ ] Common questions and answers
  - [ ] Troubleshooting guide
  - [ ] Differentiation strategies

- [ ] **Student Preparation Guide**
  - [ ] What to bring/prepare
  - [ ] Prerequisites check
  - [ ] Account setup (if needed)
  - [ ] Pre-workshop materials

- [ ] **Technical Setup Guide**
  - [ ] p5.js Web Editor setup
  - [ ] Browser requirements
  - [ ] Internet connectivity needs
  - [ ] Asset preparation
  - [ ] Testing checklist

- [ ] **Workshop Schedule Template**
  - [ ] Timing breakdown
  - [ ] Break schedules
  - [ ] Activity transitions
  - [ ] Buffer time for questions

**File Location**: Create `delivery_method.md` in the root directory

---

## 4. Something to Bring Home

### Status: ⬜ TODO

Create materials that students can take home to continue learning and reference later.

### Physical Materials


- [ ] **Workshop Summary Handout**
  - [ ] What was learned
  - [ ] Key concepts
  - [ ] Next steps
  - [ ] Resources and links
  - [ ] Format: 1-2 page PDF

- [ ] **Certificate of Completion** (Optional)
  - [ ] Template design
  - [ ] Customizable fields
  - [ ] Digital and printable versions

### Digital Materials

- [ ] **Portfolio Suggestions**
  - [ ] How to showcase work
  - [ ] Sharing options
  - [ ] Documentation tips


---

## Additional Tasks

### Documentation

- [ ] **README.md Update**
  - [ ] Overview of all workshops
  - [ ] Prerequisites
  - [ ] How to use the materials
  - [ ] Links to all resources

- [ ] **Instructor FAQ**
  - [ ] Common questions from instructors
  - [ ] Best practices
  - [ ] Adaptation tips

- [ ] **Student FAQ**
  - [ ] Common student questions
  - [ ] Troubleshooting
  - [ ] Getting help

### Quality Assurance

- [ ] **Testing**
  - [ ] Test all code examples
  - [ ] Verify all links work
  - [ ] Check for typos and errors
  - [ ] Test with actual students (pilot)

- [ ] **Accessibility Review**
  - [ ] Alt text for all images
  - [ ] Color contrast checks
  - [ ] Screen reader compatibility
  - [ ] Language clarity

- [ ] **Feedback Collection**
  - [ ] Feedback forms
  - [ ] Improvement tracking
  - [ ] Version control

---

## Priority Order

### High Priority (Must Complete before beta)
1. ⬜ p5.js Web Editor Usage Guide
2. ⬜ Replace critical placeholders (coordinate systems, flow diagrams)
3. ⬜ Delivery method documentation
4. ⬜ Consistency check

- ⬜ French version

### Medium Priority (Must Complete before camp)
5. ⬜ Remaining placeholders
6. ⬜ Complete take-home package
7. ⬜ Instructor guides
8. ⬜ Testing and QA
9. ⬜ Proper base assets (nice background images and sound)
- ⬜ French version

---



## Notes

- **Illustrations**: Consider creating a style guide first to ensure consistency
- **Delivery Method**: May need to adapt based on available resources and context
- **Take-Home Materials**: Start simple, can expand based on feedback
- **Testing**: Essential to test with actual students before finalizing

---

## Progress Tracking

**Last Updated**: [Date]

**Overall Progress**: 0% Complete


