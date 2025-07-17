import React, { useState } from 'react';
import './ChordPlayer.css';
import useAudio from '../../hooks/useAudio';

const ChordPlayer = () => {
  const { playChord, noteFrequencies } = useAudio();
  const [selectedKey, setSelectedKey] = useState('C');
  const [isPlaying, setIsPlaying] = useState(false);

  // Common chord progressions
  const progressions = {
    'I-V-vi-IV': {
      name: 'Pop Progression',
      description: 'Used in countless pop songs',
      chords: ['I', 'V', 'vi', 'IV']
    },
    'ii-V-I': {
      name: 'Jazz Progression',
      description: 'The most important progression in jazz',
      chords: ['ii', 'V', 'I']
    },
    'I-vi-IV-V': {
      name: 'Circle of Fifths',
      description: 'Classic doo-wop progression',
      chords: ['I', 'vi', 'IV', 'V']
    },
    'vi-IV-I-V': {
      name: 'Relative Minor',
      description: 'Emotional minor key progression',
      chords: ['vi', 'IV', 'I', 'V']
    }
  };

  // Scale degrees to note mappings
  const scaleNotes = {
    'C': ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
    'G': ['G', 'A', 'B', 'C', 'D', 'E', 'F#'],
    'D': ['D', 'E', 'F#', 'G', 'A', 'B', 'C#'],
    'A': ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#'],
    'E': ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#'],
    'F': ['F', 'G', 'A', 'Bb', 'C', 'D', 'E'],
    'Bb': ['Bb', 'C', 'D', 'Eb', 'F', 'G', 'A'],
    'Eb': ['Eb', 'F', 'G', 'Ab', 'Bb', 'C', 'D']
  };

  // Get frequencies for a chord
  const getChordFrequencies = (romanNumeral, key) => {
    const scale = scaleNotes[key];
    const chordMappings = {
      'I': [0, 2, 4],    // 1st, 3rd, 5th
      'ii': [1, 3, 5],   // 2nd, 4th, 6th
      'iii': [2, 4, 6],  // 3rd, 5th, 7th
      'IV': [3, 5, 0],   // 4th, 6th, 1st
      'V': [4, 6, 1],    // 5th, 7th, 2nd
      'vi': [5, 0, 2],   // 6th, 1st, 3rd
      'vii°': [6, 1, 3]  // 7th, 2nd, 4th
    };

    const intervals = chordMappings[romanNumeral];
    if (!intervals) return [];

    return intervals.map(interval => {
      const note = scale[interval];
      return noteFrequencies[note] || noteFrequencies[note.replace('#', 'sharp')] || 440;
    });
  };

  // Play a single chord
  const playChordByRoman = (romanNumeral) => {
    const frequencies = getChordFrequencies(romanNumeral, selectedKey);
    playChord(frequencies, 1500);
  };

  // Play entire progression
  const playProgression = async (progressionKey) => {
    const progression = progressions[progressionKey];
    setIsPlaying(true);
    
    for (let i = 0; i < progression.chords.length; i++) {
      const chord = progression.chords[i];
      const frequencies = getChordFrequencies(chord, selectedKey);
      
      playChord(frequencies, 1200);
      await new Promise(resolve => setTimeout(resolve, 1500));
    }
    
    setIsPlaying(false);
  };

  // Mathematical analysis
  const getChordAnalysis = (romanNumeral) => {
    const frequencies = getChordFrequencies(romanNumeral, selectedKey);
    const root = frequencies[0];
    
    return {
      intervals: frequencies.map(freq => (freq / root).toFixed(3)),
      notes: frequencies.map(freq => {
        const note = Object.keys(noteFrequencies).find(
          key => Math.abs(noteFrequencies[key] - freq) < 5
        );
        return note || 'Unknown';
      })
    };
  };

  return (
    <div className="chord-player">
      <div className="chord-player-header">
        <h3>🎵 Chord Progression Player</h3>
        <div className="key-selector">
          <label>Key:</label>
          <select 
            value={selectedKey} 
            onChange={(e) => setSelectedKey(e.target.value)}
            className="key-select"
          >
            {Object.keys(scaleNotes).map(key => (
              <option key={key} value={key}>{key} Major</option>
            ))}
          </select>
        </div>
      </div>

      <div className="progressions-grid">
        {Object.entries(progressions).map(([key, progression]) => (
          <div key={key} className="progression-card">
            <div className="progression-info">
              <h4>{progression.name}</h4>
              <p>{progression.description}</p>
              <div className="chord-sequence">
                {progression.chords.map((chord, index) => (
                  <span key={index} className="chord-symbol">
                    {chord}
                    {index < progression.chords.length - 1 && ' - '}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="progression-controls">
              <button 
                className="play-progression-btn"
                onClick={() => playProgression(key)}
                disabled={isPlaying}
              >
                {isPlaying ? '⏸️' : '▶️'} Play Progression
              </button>
              
              <div className="individual-chords">
                {progression.chords.map((chord, index) => (
                  <button
                    key={index}
                    className="chord-btn"
                    onClick={() => playChordByRoman(chord)}
                    disabled={isPlaying}
                  >
                    {chord}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="chord-analysis">
        <h4>🔢 Mathematical Harmony</h4>
        <div className="analysis-grid">
          {['I', 'ii', 'iii', 'IV', 'V', 'vi'].map(chord => {
            const analysis = getChordAnalysis(chord);
            return (
              <div key={chord} className="chord-analysis-card">
                <div className="chord-label">{chord}</div>
                <div className="chord-notes">
                  {analysis.notes.join(' - ')}
                </div>
                <div className="chord-ratios">
                  {analysis.intervals.join(' : ')}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="theory-explanation">
        <h4>🎓 Music Theory</h4>
        <div className="theory-content">
          <div className="theory-item">
            <strong>Roman Numeral Analysis:</strong>
            <p>Upper case = Major chords, Lower case = minor chords</p>
          </div>
          <div className="theory-item">
            <strong>Mathematical Ratios:</strong>
            <p>Major triad = 4:5:6 frequency ratio</p>
          </div>
          <div className="theory-item">
            <strong>Circle of Fifths:</strong>
            <p>Each chord is related by perfect fifth intervals</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChordPlayer;