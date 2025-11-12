#!/usr/bin/env python3
"""
Generate background images for the p5.js jukebox
Requires: pip install Pillow
"""

from PIL import Image, ImageDraw
import random
import os

def generate_background1(width=800, height=600):
    """Dark blue background with small stars"""
    img = Image.new('RGB', (width, height), (20, 30, 50))
    draw = ImageDraw.Draw(img)
    
    for i in range(100):
        x = random.randint(0, width)
        y = random.randint(0, height)
        size = random.randint(2, 4)
        alpha = random.randint(50, 150)
        color = (255, 255, 200)
        draw.ellipse([x-size, y-size, x+size, y+size], fill=color)
    
    return img

def generate_background2(width=800, height=600):
    """Deep blue background with larger glowing orbs"""
    img = Image.new('RGB', (width, height), (10, 20, 40))
    draw = ImageDraw.Draw(img)
    
    for i in range(50):
        x = random.randint(0, width)
        y = random.randint(0, height)
        size = random.randint(10, 30)
        color = (100, 150, 255)
        draw.ellipse([x-size, y-size, x+size, y+size], fill=color)
    
    return img

def generate_background3(width=800, height=600):
    """Warm orange/brown background with sparkles"""
    img = Image.new('RGB', (width, height), (30, 15, 5))
    draw = ImageDraw.Draw(img)
    
    for i in range(200):
        x = random.randint(0, width)
        y = random.randint(0, height)
        size = random.randint(1, 3)
        color = (255, 200, 100)
        draw.ellipse([x-size, y-size, x+size, y+size], fill=color)
    
    return img

if __name__ == '__main__':
    os.makedirs('assets', exist_ok=True)
    
    print("Generating background images...")
    generate_background1().save('assets/background1.png')
    print("Generated assets/background1.png")
    
    generate_background2().save('assets/background2.png')
    print("Generated assets/background2.png")
    
    generate_background3().save('assets/background3.png')
    print("Generated assets/background3.png")
    
    print("Done!")

