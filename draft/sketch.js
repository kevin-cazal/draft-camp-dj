let backgroundFiles = [
    'assets/background1.png',
    'assets/background2.png',
    'assets/background3.png'
];

let currentBackgroundIndex = 0;
let backgroundImages = {};
let snowflakes = [];
let flames = [];
let stars = [];
let shootingStar = null;
let nextShootingStarTime = 0;
let currentAnimation = 0;
let currentSound = null;

let animations = [  
    { name: 'Snow', draw: drawSnow, bg: 20 },
    { name: 'Fire', draw: drawFire, bg: 20 },
    { name: 'Stars', draw: drawStars, bg: 0 }
];

function stopOldAndPlay(sound) {
    if (currentSound) {
      if (currentSound.isPlaying) {
        currentSound.stop();
      }
     }  
    sound.play();
    currentSound = sound;
}

function playSoundFile(path) {
    loadSound(path, stopOldAndPlay);
}


let buttons = [
    { name: 'Play Sound 1', x: 100, y: 100, width: 150, height: 40, callback: () => playSoundFile('assets/sound1.wav') },
    { name: 'Play Sound 2', x: 100, y: 160, width: 150, height: 40, callback: () => playSoundFile('assets/sound2.wav') },
    { name: 'Switch Animation', x: 100, y: 280, width: 150, height: 40, callback: switchAnimation },
    { name: 'Switch Background', x: 100, y: 340, width: 150, height: 40, callback: switchBackground }
];

function initFire(numFlames = 30, baseY = null, baseX = null, fireWidth = 200) {
    flames = [];
    const fireY = baseY || height - 50;
    const fireX = baseX || width/2;
    
    for (let i = 0; i < numFlames; i++) {
        flames.push({
            x: fireX + random(-fireWidth/2, fireWidth/2),
            y: fireY,
            size: random(10, 25),
            speed: random(0.5, 2),
            flicker: random(0.5, 2),
            life: random(0, 1),
            maxLife: random(0.8, 1)
        });
    }
}

function drawFire() {
    for (let flame of flames) {
        flame.y -= flame.speed;
        flame.x += random(-2, 2) * flame.flicker;
        flame.life -= 0.02;
        flame.size *= 0.98;
        
        if (flame.life <= 0 || flame.size < 1) {
            flame.y = height - 50;
            flame.x = width/2 + random(-100, 100);
            flame.size = random(10, 25);
            flame.life = random(0.8, 1);
            flame.speed = random(0.5, 2);
        }
        
        const alpha = map(flame.life, 0, 1, 0, 255);
        const fireColor = map(flame.life, 0, 1, 0, 1);
        
        fill(255 * fireColor, 150 * fireColor, 0, alpha);
        noStroke();
        ellipse(flame.x, flame.y, flame.size);
        
        fill(255 * fireColor * 0.8, 100 * fireColor, 0, alpha * 0.7);
        ellipse(flame.x, flame.y, flame.size * 0.7);
    }
}

function initSnow(numFlakes = 50) {
    snowflakes = [];
    for (let i = 0; i < numFlakes; i++) {
        snowflakes.push({
            x: random(width),
            y: random(-height, 0),
            size: random(2, 5),
            speed: random(1, 3),
            sway: random(-1, 1)
        });
    }
}

function drawSnow() {
    fill(255);
    noStroke();
    for (let flake of snowflakes) {
        ellipse(flake.x, flake.y, flake.size);
        flake.y += flake.speed;
        flake.x += flake.sway * 0.5;
        if (flake.y > height) {
            flake.y = random(-50, 0);
            flake.x = random(width);
        }
        if (flake.x < 0 || flake.x > width) {
            flake.sway *= -1;
        }
    }
}

function initStars(numStars = 100) {
    stars = [];
    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: random(width),
            y: random(height),
            size: random(1, 3),
            brightness: random(150, 255),
            twinkle: random(0, TWO_PI)
        });
    }
}

function drawStars() {
    // Draw static stars
    for (let star of stars) {
        star.twinkle += 0.08;
        const twinkle = sin(star.twinkle) * 70 + star.brightness;
        fill(constrain(twinkle, 100, 255));
        noStroke();
        ellipse(star.x, star.y, star.size);
    }
    
    // Handle shooting star timing (3-6 seconds)
    if (millis() >= nextShootingStarTime) {
        if (!shootingStar) {
            // Create new shooting star
            const startX = random(width);
            const startY = random(0, height * 0.3);
            shootingStar = {
                x: startX,
                y: startY,
                trail: [],
                speed: random(5, 10),
                angle: random(PI/6, PI/3),
                life: 255
            };
        }
        // Schedule next shooting star (3-6 seconds)
        nextShootingStarTime = millis() + random(3000, 6000);
    }
    
    // Draw and update shooting star
    if (shootingStar) {
        shootingStar.trail.push({x: shootingStar.x, y: shootingStar.y, alpha: shootingStar.life});
        
        shootingStar.x += cos(shootingStar.angle) * shootingStar.speed;
        shootingStar.y += sin(shootingStar.angle) * shootingStar.speed;
        shootingStar.life -= 8;
        
        // Draw trail
        for (let i = shootingStar.trail.length - 1; i >= 0; i--) {
            const point = shootingStar.trail[i];
            stroke(255, 255, 255, point.alpha);
            strokeWeight(2);
            if (i > 0) {
                line(point.x, point.y, shootingStar.trail[i-1].x, shootingStar.trail[i-1].y);
            }
            point.alpha -= 10;
            if (point.alpha <= 0) {
                shootingStar.trail.splice(i, 1);
            }
        }
        
        // Remove shooting star when off screen or faded
        if (shootingStar.x > width || shootingStar.y > height || shootingStar.life <= 0) {
            shootingStar = null;
        }
    }
}

function switchAnimation() {
    currentAnimation = (currentAnimation + 1) % animations.length;
}

function switchBackground() {
    currentBackgroundIndex = (currentBackgroundIndex + 1) % backgroundFiles.length;
    // Load the new background if not already loaded
    if (!backgroundImages[currentBackgroundIndex]) {
        loadImage(backgroundFiles[currentBackgroundIndex], img => {
            backgroundImages[currentBackgroundIndex] = img;
        }, () => {
            console.warn(`Failed to load background: ${backgroundFiles[currentBackgroundIndex]}`);
        });
    }
}


function drawButton(btn) {
    // Reset text fill and font and stroke
    fill(100, 150, 255);
    rect(btn.x, btn.y, btn.width, btn.height, 5);
    fill(255);
    textAlign(CENTER, CENTER);
    text(btn.name, btn.x + btn.width/2, btn.y + btn.height/2);
}

function isMouseOver(btn) {
    return mouseX >= btn.x && mouseX <= btn.x + btn.width &&
           mouseY >= btn.y && mouseY <= btn.y + btn.height;
}

function drawText(txt, x, y, color = [255, 255, 255], fontSize = 8, fontFamily = 'Arial', align = LEFT) {
    fill(color[0], color[1], color[2]);
    textSize(fontSize);
    textFont(fontFamily);
    textAlign(align);
    text(txt, x, y);
}

function setup() {
    createCanvas(800, 600);
    initSnow(50);
    initFire(30);
    initStars(100);
    nextShootingStarTime = millis() + random(3000, 6000);
      
    // Load all background images
    loadImage(backgroundFiles[0], img => {
        backgroundImages[0] = img;
    });
    loadImage(backgroundFiles[1], img => {
        backgroundImages[1] = img;
    });
    loadImage(backgroundFiles[2], img => {
        backgroundImages[2] = img;
    });
}

function draw() {
    // Draw background image if available, otherwise use animation background color
    if (backgroundImages[currentBackgroundIndex]) {
        image(backgroundImages[currentBackgroundIndex], 0, 0, width, height);
    } else {
        background(animations[currentAnimation].bg || 0);
    }
    
    animations[currentAnimation].draw();
    drawButton(buttons[0]);
    drawButton(buttons[1]);
    drawButton(buttons[2]);
    drawButton(buttons[3]);
    drawText('Merry Christmas!', 400, 300, [255, 0, 0], 32, 'Arial', CENTER);
}

function mousePressed() {
    if (isMouseOver(buttons[0])) buttons[0].callback();
    if (isMouseOver(buttons[1])) buttons[1].callback();
    if (isMouseOver(buttons[2])) buttons[2].callback();
    if (isMouseOver(buttons[3])) buttons[3].callback();
}

