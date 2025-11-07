// Simple p5.js sketch with responsive buttons for desktop and mobile

let buttons = [];
let currentColor = [100, 150, 255]; // Default blue color

function setup() {
    // Create canvas that fits the window
    createCanvas(windowWidth, windowHeight);
    
    // Create buttons
    buttons = [
        {
            name: "Red",
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            color: [255, 100, 100],
            callback: function() {
                currentColor = this.color;
            }
        },
        {
            name: "Green",
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            color: [100, 255, 100],
            callback: function() {
                currentColor = this.color;
            }
        },
        {
            name: "Blue",
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            color: [100, 100, 255],
            callback: function() {
                currentColor = this.color;
            }
        },
        {
            name: "Random",
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            color: [200, 200, 200],
            callback: function() {
                currentColor = [random(255), random(255), random(255)];
            }
        }
    ];
    
    // Calculate button positions and sizes based on screen
    updateButtonLayout();
}

function windowResized() {
    // Resize canvas when window is resized
    resizeCanvas(windowWidth, windowHeight);
    updateButtonLayout();
}

function updateButtonLayout() {
    // Calculate button layout to fit screen
    let buttonWidth = width * 0.4; // 40% of screen width
    let buttonHeight = 60;
    let spacing = 20;
    let startX = (width - buttonWidth) / 2; // Center horizontally
    let startY = height * 0.3; // Start at 30% from top
    let totalHeight = buttons.length * (buttonHeight + spacing) - spacing;
    let offsetY = (height - startY - totalHeight) / 2; // Center vertically
    
    // Update each button's position and size
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].x = startX;
        buttons[i].y = startY + offsetY + i * (buttonHeight + spacing);
        buttons[i].width = buttonWidth;
        buttons[i].height = buttonHeight;
    }
}

function draw() {
    // Draw background with current color
    background(currentColor[0], currentColor[1], currentColor[2]);
    
    // Draw title
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(min(width, height) * 0.06); // Responsive text size
    text("Color Changer", width / 2, height * 0.15);
    
    // Draw all buttons
    for (let button of buttons) {
        drawButton(button);
    }
}

function drawButton(button) {
    // Check if mouse/touch is over button
    let isOver = isOverButton(button);
    
    // Draw button background (darker when hovered)
    if (isOver) {
        fill(button.color[0] * 0.7, button.color[1] * 0.7, button.color[2] * 0.7);
    } else {
        fill(button.color[0], button.color[1], button.color[2]);
    }
    
    // Draw rounded rectangle
    rect(button.x, button.y, button.width, button.height, 10);
    
    // Draw button text
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(min(button.width, button.height) * 0.25); // Responsive text size
    text(button.name, button.x + button.width / 2, button.y + button.height / 2);
}

function isOverButton(button) {
    // Check if mouse/touch is over button
    return mouseX >= button.x && 
           mouseX <= button.x + button.width && 
           mouseY >= button.y && 
           mouseY <= button.y + button.height;
}

function mousePressed() {
    // Handle mouse clicks
    handleButtonClick();
}

function touchStarted() {
    // Handle touch events (mobile)
    handleButtonClick();
    return false; // Prevent default touch behavior
}

function handleButtonClick() {
    // Check which button was clicked/touched
    for (let button of buttons) {
        if (isOverButton(button)) {
            button.callback();
            break; // Only trigger one button per click
        }
    }
}

