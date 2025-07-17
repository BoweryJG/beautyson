import React, { useState, useEffect } from 'react';
import './PianoKeyboard.css';
import useAudio from '../../hooks/useAudio';
import NotationViewer from '../NotationViewer/NotationViewer';

const PianoKeyboard = ({ onFrequencyChange }) => {
  const { playTone, stopTone, noteFrequencies, getNote, isPlaying, resumeAudio } = useAudio();
  const [pressedKeys, setPressedKeys] = useState(new Set());
  const [currentNote, setCurrentNote] = useState('A4');
  const [selectedKey, setSelectedKey] = useState('C');
  const [playedNotes, setPlayedNotes] = useState([]);

  // Piano keys layout (2 octaves starting from C4)
  const keys = [
    { note: 'C', frequency: 261.63, type: 'white', keyCode: 'KeyA' },
    { note: 'C#', frequency: 277.18, type: 'black', keyCode: 'KeyW' },
    { note: 'D', frequency: 293.66, type: 'white', keyCode: 'KeyS' },
    { note: 'D#', frequency: 311.13, type: 'black', keyCode: 'KeyE' },
    { note: 'E', frequency: 329.63, type: 'white', keyCode: 'KeyD' },
    { note: 'F', frequency: 349.23, type: 'white', keyCode: 'KeyF' },
    { note: 'F#', frequency: 369.99, type: 'black', keyCode: 'KeyT' },
    { note: 'G', frequency: 392.00, type: 'white', keyCode: 'KeyG' },
    { note: 'G#', frequency: 415.30, type: 'black', keyCode: 'KeyY' },
    { note: 'A', frequency: 440.00, type: 'white', keyCode: 'KeyH' },
    { note: 'A#', frequency: 466.16, type: 'black', keyCode: 'KeyU' },
    { note: 'B', frequency: 493.88, type: 'white', keyCode: 'KeyJ' },
    // Second octave
    { note: 'C', frequency: 523.25, type: 'white', keyCode: 'KeyK' },
    { note: 'C#', frequency: 554.37, type: 'black', keyCode: 'KeyO' },
    { note: 'D', frequency: 587.33, type: 'white', keyCode: 'KeyL' },
    { note: 'D#', frequency: 622.25, type: 'black', keyCode: 'KeyP' },
    { note: 'E', frequency: 659.25, type: 'white', keyCode: 'Semicolon' },
  ];

  // Handle key press
  const handleKeyPress = (key) => {
    if (pressedKeys.has(key.note)) return;
    
    resumeAudio();
    setPressedKeys(prev => new Set([...prev, key.note]));
    playTone(key.frequency);
    setCurrentNote(getNote(key.frequency));
    
    // Add to played notes for notation display
    setPlayedNotes(prev => {
      const newNotes = [...prev, key.note];
      return newNotes.slice(-8); // Keep last 8 notes
    });
    
    if (onFrequencyChange) {
      onFrequencyChange(key.frequency);
    }
  };

  // Handle key release
  const handleKeyRelease = (key) => {
    setPressedKeys(prev => {
      const newSet = new Set(prev);
      newSet.delete(key.note);
      return newSet;
    });
    
    if (pressedKeys.size <= 1) {
      stopTone();
    }
  };

  // Keyboard event handlers
  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = keys.find(k => k.keyCode === event.code);
      if (key && !event.repeat) {
        handleKeyPress(key);
      }
    };

    const handleKeyUp = (event) => {
      const key = keys.find(k => k.keyCode === event.code);
      if (key) {
        handleKeyRelease(key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [keys, pressedKeys]);

  // Calculate mathematical relationships
  const getIntervalInfo = (frequency) => {
    const baseFreq = 440; // A4
    const ratio = frequency / baseFreq;
    const semitones = Math.round(12 * Math.log2(ratio));
    
    const intervalNames = {
      0: 'Unison',
      1: 'Minor 2nd',
      2: 'Major 2nd',
      3: 'Minor 3rd',
      4: 'Major 3rd',
      5: 'Perfect 4th',
      6: 'Tritone',
      7: 'Perfect 5th',
      8: 'Minor 6th',
      9: 'Major 6th',
      10: 'Minor 7th',
      11: 'Major 7th',
      12: 'Octave'
    };

    return {
      ratio: ratio.toFixed(3),
      semitones: Math.abs(semitones),
      intervalName: intervalNames[Math.abs(semitones) % 12] || 'Complex'
    };
  };

  return (
    <div className="piano-keyboard">
      <div className="keyboard-info">
        <div className="current-note">
          <span className="note-label">Current Note:</span>
          <span className="note-value">{currentNote}</span>
        </div>
        <div className="frequency-info">
          <span className="freq-label">Frequency:</span>
          <span className="freq-value">{pressedKeys.size > 0 ? 
            keys.find(k => pressedKeys.has(k.note))?.frequency.toFixed(2) : '---'} Hz</span>
        </div>
      </div>

      <div className="keyboard-container">
        <div className="keyboard">
          {keys.map((key, index) => (
            <button
              key={`${key.note}-${index}`}
              className={`key ${key.type} ${pressedKeys.has(key.note) ? 'pressed' : ''}`}
              onMouseDown={() => handleKeyPress(key)}
              onMouseUp={() => handleKeyRelease(key)}
              onMouseLeave={() => handleKeyRelease(key)}
              onTouchStart={(e) => {
                e.preventDefault();
                handleKeyPress(key);
              }}
              onTouchEnd={(e) => {
                e.preventDefault();
                handleKeyRelease(key);
              }}
            >
              <span className="key-label">{key.note}</span>
              <span className="key-binding">{key.keyCode.replace('Key', '')}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="keyboard-controls">
        <div className="control-group">
          <label>Instructions:</label>
          <p>Click keys or use keyboard shortcuts (A-P keys)</p>
        </div>
        <div className="control-group">
          <label>Key Signature:</label>
          <select 
            value={selectedKey} 
            onChange={(e) => setSelectedKey(e.target.value)}
            className="key-select"
          >
            <option value="C">C Major</option>
            <option value="G">G Major</option>
            <option value="D">D Major</option>
            <option value="A">A Major</option>
            <option value="E">E Major</option>
            <option value="F">F Major</option>
            <option value="Bb">Bb Major</option>
            <option value="Eb">Eb Major</option>
          </select>
        </div>
      </div>

      {pressedKeys.size > 0 && (
        <div className="interval-analysis">
          <h4>🔢 Mathematical Analysis</h4>
          {Array.from(pressedKeys).map(noteName => {
            const key = keys.find(k => k.note === noteName);
            if (!key) return null;
            
            const intervalInfo = getIntervalInfo(key.frequency);
            return (
              <div key={noteName} className="interval-info">
                <span className="interval-note">{noteName}</span>
                <span className="interval-ratio">Ratio: {intervalInfo.ratio}:1</span>
                <span className="interval-name">{intervalInfo.intervalName}</span>
              </div>
            );
          })}
        </div>
      )}

      <NotationViewer 
        notes={playedNotes}
        currentNote={currentNote}
        selectedKey={selectedKey}
      />
    </div>
  );
};

export default PianoKeyboard;