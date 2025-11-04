#!/usr/bin/env python3
"""
Generate sound files for the p5.js jukebox
Requires: pip install numpy scipy
"""

import numpy as np
from scipy.io import wavfile
import os

def generate_tone(frequency, duration=1.0, sample_rate=44100, wave_type='sine'):
    """Generate a tone with specified frequency and duration"""
    t = np.linspace(0, duration, int(sample_rate * duration))
    
    if wave_type == 'sine':
        wave = np.sin(2 * np.pi * frequency * t)
    elif wave_type == 'square':
        wave = np.sign(np.sin(2 * np.pi * frequency * t))
    elif wave_type == 'triangle':
        wave = 2 * np.abs(2 * ((t * frequency) % 1) - 1) - 1
    else:  # sawtooth
        wave = 2 * ((t * frequency) % 1) - 1
    
    # Apply envelope to avoid clicks
    envelope = np.exp(-t * 2)
    wave = wave * envelope
    
    # Normalize to 16-bit range
    wave = np.clip(wave * 0.3, -1, 1)
    wave_16bit = (wave * 32767).astype(np.int16)
    
    return wave_16bit

def generate_chord(notes, duration=1.0):
    """Generate a chord from multiple frequencies"""
    sample_rate = 44100
    t = np.linspace(0, duration, int(sample_rate * duration))
    wave = np.zeros(len(t))
    
    for freq in notes:
        wave += np.sin(2 * np.pi * freq * t) / len(notes)
    
    envelope = np.exp(-t * 2)
    wave = wave * envelope
    wave = np.clip(wave * 0.3, -1, 1)
    wave_16bit = (wave * 32767).astype(np.int16)
    
    return wave_16bit

# MIDI note frequencies (C4 = 60)
def midi_to_freq(note):
    return 440 * (2 ** ((note - 69) / 12))

if __name__ == '__main__':
    os.makedirs('assets', exist_ok=True)
    sample_rate = 44100
    
    print("Generating 30-second sound files...")
    
    # Sound 1: Jingle Bells melody (looping for 30 seconds)
    # E4, E4, E4, E4, E4, E4, E4, G4, C4, D4, E4
    melody_notes = [
        midi_to_freq(64),  # E4
        midi_to_freq(64),  # E4
        midi_to_freq(64),  # E4
        midi_to_freq(67),  # G4
        midi_to_freq(60),  # C4
        midi_to_freq(62),  # D4
        midi_to_freq(64)   # E4
    ]
    
    note_duration = 0.3
    pattern = np.concatenate([generate_tone(note, note_duration, sample_rate) for note in melody_notes])
    pattern_duration = len(pattern) / sample_rate
    loops_needed = int(30 / pattern_duration) + 1
    sound1 = np.tile(pattern, loops_needed)[:int(30 * sample_rate)]
    wavfile.write('assets/sound1.wav', sample_rate, sound1)
    print(f"Generated assets/sound1.wav ({len(sound1)/sample_rate:.1f} seconds)")
    
    # Sound 2: Christmas chord progression (looping for 30 seconds)
    chord1 = [midi_to_freq(60), midi_to_freq(64), midi_to_freq(67)]  # C major
    chord2 = [midi_to_freq(62), midi_to_freq(65), midi_to_freq(69)]  # D major
    chord3 = [midi_to_freq(59), midi_to_freq(62), midi_to_freq(67)]  # G major
    
    chord_pattern = np.concatenate([
        generate_chord(chord1, 1.0),
        generate_chord(chord2, 1.0),
        generate_chord(chord3, 1.0),
        generate_chord(chord1, 1.0)
    ])
    pattern_duration = len(chord_pattern) / sample_rate
    loops_needed = int(30 / pattern_duration) + 1
    sound2 = np.tile(chord_pattern, loops_needed)[:int(30 * sample_rate)]
    wavfile.write('assets/sound2.wav', sample_rate, sound2)
    print(f"Generated assets/sound2.wav ({len(sound2)/sample_rate:.1f} seconds)")
    
    # Sound 3: Bell-like tones (30 seconds with variation)
    bell_freqs = [midi_to_freq(72), midi_to_freq(76), midi_to_freq(79)]  # C5, E5, G5
    bell_pattern = []
    for i in range(10):  # 10 bell rings, each 3 seconds
        bell = generate_chord(bell_freqs, 3.0)
        bell_pattern.append(bell)
        # Add silence between bells
        silence = np.zeros(int(sample_rate * 0.2))
        bell_pattern.append(silence)
    
    sound3 = np.concatenate(bell_pattern)
    # Pad or trim to exactly 30 seconds
    target_length = int(30 * sample_rate)
    if len(sound3) < target_length:
        silence = np.zeros(target_length - len(sound3))
        sound3 = np.concatenate([sound3, silence])
    else:
        sound3 = sound3[:target_length]
    
    wavfile.write('assets/sound3.wav', sample_rate, sound3)
    print(f"Generated assets/sound3.wav ({len(sound3)/sample_rate:.1f} seconds)")
    
    print("Done!")
    print("\nNote: WAV files generated. To convert to MP3, use ffmpeg:")
    print("ffmpeg -i assets/sound1.wav assets/sound1.mp3")

