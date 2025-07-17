import React, { useState, useEffect, useRef } from 'react';
import * as Tone from 'tone';
import './NeuralJam.css';

const NeuralJam = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPattern, setCurrentPattern] = useState(null);
  const [generationMode, setGenerationMode] = useState('melody');
  const [isGenerating, setIsGenerating] = useState(false);
  const [hackMode, setHackMode] = useState(false);
  const [creativity, setCreativity] = useState(0.7);
  const [complexity, setComplexity] = useState(0.5);
  const [tempo, setTempo] = useState(120);

  const synthRef = useRef(null);
  const sequenceRef = useRef(null);

  const modes = [
    { id: 'melody', name: 'Melody Maker', icon: '🎵', description: 'AI generates beautiful melodies' },
    { id: 'chord', name: 'Chord Wizard', icon: '🎹', description: 'Creates epic chord progressions' },
    { id: 'rhythm', name: 'Beat Machine', icon: '🥁', description: 'Drops sick rhythmic patterns' },
    { id: 'ambient', name: 'Vibe Generator', icon: '🌊', description: 'Atmospheric soundscapes' },
    { id: 'chaos', name: 'Chaos Engine', icon: '🌀', description: 'Unpredictable musical mayhem' }
  ];

  useEffect(() => {
    initializeAudio();
    return () => {
      if (synthRef.current) {
        synthRef.current.dispose();
      }
      if (sequenceRef.current) {
        sequenceRef.current.dispose();
      }
    };
  }, []);

  const initializeAudio = () => {
    // Create a polyphonic synth for richer sounds
    synthRef.current = new Tone.PolySynth(Tone.Synth, {
      oscillator: {
        type: "triangle"
      },
      envelope: {
        attack: 0.02,
        decay: 0.1,
        sustain: 0.3,
        release: 1,
      }
    }).toDestination();

    // Add some effects
    const reverb = new Tone.Reverb(2).toDestination();
    const delay = new Tone.PingPongDelay("8n", 0.2).toDestination();
    
    synthRef.current.connect(reverb);
    synthRef.current.connect(delay);
  };

  const scales = {
    major: [0, 2, 4, 5, 7, 9, 11],
    minor: [0, 2, 3, 5, 7, 8, 10],
    dorian: [0, 2, 3, 5, 7, 9, 10],
    mixolydian: [0, 2, 4, 5, 7, 9, 10],
    pentatonic: [0, 2, 4, 7, 9]
  };

  const generatePattern = async () => {
    setIsGenerating(true);
    
    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    let pattern;
    
    switch (generationMode) {
      case 'melody':
        pattern = generateMelody();
        break;
      case 'chord':
        pattern = generateChords();
        break;
      case 'rhythm':
        pattern = generateRhythm();
        break;
      case 'ambient':
        pattern = generateAmbient();
        break;
      case 'chaos':
        pattern = generateChaos();
        break;
      default:
        pattern = generateMelody();
    }
    
    setCurrentPattern(pattern);
    setIsGenerating(false);
  };

  const generateMelody = () => {
    const scale = scales.major;
    const baseNote = 60; // Middle C
    const notes = [];
    const length = Math.floor(8 + complexity * 24); // 8-32 notes
    
    let currentNote = Math.floor(Math.random() * scale.length);
    
    for (let i = 0; i < length; i++) {
      // AI-like note selection with creativity parameter
      if (Math.random() < creativity) {
        // Creative jump
        currentNote = Math.floor(Math.random() * scale.length);
      } else {
        // Step-wise motion
        const direction = Math.random() > 0.5 ? 1 : -1;
        currentNote = Math.max(0, Math.min(scale.length - 1, currentNote + direction));
      }
      
      notes.push({
        note: Tone.Frequency(baseNote + scale[currentNote], "midi").toNote(),
        time: i * 0.25,
        duration: "8n"
      });
    }
    
    return {
      type: 'melody',
      notes: notes,
      totalTime: length * 0.25
    };
  };

  const generateChords = () => {
    const chordProgressions = [
      [0, 5, 6, 4], // vi-IV-I-V (very popular)
      [0, 4, 5, 0], // I-V-vi-I
      [6, 4, 0, 5], // vi-IV-I-V
      [0, 6, 4, 5]  // I-vi-IV-V
    ];
    
    const progression = chordProgressions[Math.floor(Math.random() * chordProgressions.length)];
    const baseNote = 48; // Lower octave for chords
    const chords = [];
    
    progression.forEach((degree, i) => {
      const chordNotes = [
        Tone.Frequency(baseNote + degree, "midi").toNote(),
        Tone.Frequency(baseNote + degree + 4, "midi").toNote(),
        Tone.Frequency(baseNote + degree + 7, "midi").toNote()
      ];
      
      chords.push({
        chord: chordNotes,
        time: i * 2,
        duration: "2n"
      });
    });
    
    return {
      type: 'chord',
      chords: chords,
      totalTime: progression.length * 2
    };
  };

  const generateRhythm = () => {
    const pattern = [];
    const beats = 16;
    
    for (let i = 0; i < beats; i++) {
      const intensity = Math.sin(i * Math.PI / 4) * creativity + complexity;
      
      if (Math.random() < intensity) {
        pattern.push({
          note: "C2", // Bass drum sound
          time: i * 0.25,
          duration: "16n"
        });
      }
      
      // Add hi-hats on off-beats
      if (i % 2 === 1 && Math.random() < 0.7) {
        pattern.push({
          note: "C6", // High pitched for hi-hat
          time: i * 0.25,
          duration: "32n"
        });
      }
    }
    
    return {
      type: 'rhythm',
      notes: pattern,
      totalTime: beats * 0.25
    };
  };

  const generateAmbient = () => {
    const notes = [];
    const durations = ["2n", "4n", "8n"];
    const scale = scales.minor;
    const baseNote = 48;
    
    // Create overlapping ambient tones
    for (let i = 0; i < 8; i++) {
      const noteIndex = Math.floor(Math.random() * scale.length);
      const octaveShift = Math.floor(Math.random() * 3) * 12;
      
      notes.push({
        note: Tone.Frequency(baseNote + scale[noteIndex] + octaveShift, "midi").toNote(),
        time: i * 0.5 + Math.random() * 0.25,
        duration: durations[Math.floor(Math.random() * durations.length)]
      });
    }
    
    return {
      type: 'ambient',
      notes: notes,
      totalTime: 8
    };
  };

  const generateChaos = () => {
    const notes = [];
    const length = Math.floor(16 + Math.random() * 32);
    
    for (let i = 0; i < length; i++) {
      const note = 24 + Math.floor(Math.random() * 72); // Wide range
      const timing = i * 0.125 + (Math.random() - 0.5) * 0.1; // Slight timing chaos
      
      notes.push({
        note: Tone.Frequency(note, "midi").toNote(),
        time: timing,
        duration: Math.random() > 0.5 ? "16n" : "8n"
      });
    }
    
    return {
      type: 'chaos',
      notes: notes,
      totalTime: length * 0.125
    };
  };

  const playPattern = async () => {
    if (!currentPattern || !synthRef.current) return;
    
    await Tone.start();
    Tone.Transport.bpm.value = tempo;
    
    setIsPlaying(true);
    
    if (sequenceRef.current) {
      sequenceRef.current.dispose();
    }
    
    if (currentPattern.type === 'chord') {
      // Handle chord progressions
      sequenceRef.current = new Tone.Sequence((time, chord) => {
        synthRef.current.triggerAttackRelease(chord.chord, chord.duration, time);
      }, currentPattern.chords.map(c => c), "2n");
    } else {
      // Handle note patterns
      sequenceRef.current = new Tone.Sequence((time, note) => {
        if (note) {
          synthRef.current.triggerAttackRelease(note.note, note.duration, time);
        }
      }, currentPattern.notes.map(n => n), "8n");
    }
    
    sequenceRef.current.start(0);
    Tone.Transport.start();
    
    // Stop after pattern completes
    setTimeout(() => {
      stopPlayback();
    }, (currentPattern.totalTime + 1) * 1000);
  };

  const stopPlayback = () => {
    if (sequenceRef.current) {
      sequenceRef.current.stop();
    }
    Tone.Transport.stop();
    setIsPlaying(false);
  };

  const exportPattern = () => {
    if (!currentPattern) return;
    
    const exportData = {
      pattern: currentPattern,
      settings: {
        creativity,
        complexity,
        tempo,
        mode: generationMode
      },
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { 
      type: 'application/json' 
    });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `neural-jam-${generationMode}-${Date.now()}.json`;
    a.click();
    
    URL.revokeObjectURL(url);
  };

  return (
    <div className="neural-jam">
      <div className="jam-header">
        <h2>🧠 Beau's Neural Jam Session</h2>
        <p>AI-powered music generation that runs entirely in your browser - no limits, pure creativity!</p>
        <button 
          className={`hack-mode-btn ${hackMode ? 'active' : ''}`}
          onClick={() => setHackMode(!hackMode)}
        >
          {hackMode ? '🔓 HACK MODE ON' : '🔒 Enable Hack Mode'}
        </button>
      </div>

      <div className="mode-selector">
        {modes.map(mode => (
          <div 
            key={mode.id}
            className={`mode-card ${generationMode === mode.id ? 'active' : ''}`}
            onClick={() => setGenerationMode(mode.id)}
          >
            <div className="mode-icon">{mode.icon}</div>
            <h3>{mode.name}</h3>
            <p>{mode.description}</p>
          </div>
        ))}
      </div>

      {hackMode && (
        <div className="hack-panel">
          <h3>🔧 Hack the AI</h3>
          <div className="hack-controls">
            <div className="control-group">
              <label>Creativity: {Math.round(creativity * 100)}%</label>
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.1" 
                value={creativity}
                onChange={(e) => setCreativity(parseFloat(e.target.value))}
              />
              <small>Higher = more wild and unpredictable</small>
            </div>
            <div className="control-group">
              <label>Complexity: {Math.round(complexity * 100)}%</label>
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.1" 
                value={complexity}
                onChange={(e) => setComplexity(parseFloat(e.target.value))}
              />
              <small>Higher = more notes and longer patterns</small>
            </div>
            <div className="control-group">
              <label>Tempo: {tempo} BPM</label>
              <input 
                type="range" 
                min="60" 
                max="180" 
                step="5" 
                value={tempo}
                onChange={(e) => setTempo(parseInt(e.target.value))}
              />
              <small>Speed of the music</small>
            </div>
          </div>
        </div>
      )}

      <div className="generation-controls">
        <button 
          className="generate-btn"
          onClick={generatePattern}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <span className="spinner"></span>
              AI is cooking...
            </>
          ) : (
            <>
              🚀 Generate Music
            </>
          )}
        </button>
      </div>

      {currentPattern && (
        <div className="playback-section">
          <h3>🎵 Generated Pattern</h3>
          <div className="pattern-info">
            <span>Type: {currentPattern.type}</span>
            <span>Duration: {Math.round(currentPattern.totalTime * 10) / 10}s</span>
            <span>Notes: {currentPattern.notes?.length || currentPattern.chords?.length || 0}</span>
          </div>
          <div className="playback-controls">
            <button 
              className="play-btn"
              onClick={isPlaying ? stopPlayback : playPattern}
            >
              {isPlaying ? '⏹️ Stop' : '▶️ Play'}
            </button>
            <button 
              className="export-btn"
              onClick={exportPattern}
            >
              📁 Export Pattern
            </button>
          </div>
        </div>
      )}

      <div className="neural-info">
        <h3>🧠 About Neural Jam</h3>
        <div className="info-grid">
          <div className="info-card">
            <h4>🆓 Completely Free</h4>
            <p>No API keys, no limits - pure browser-based AI music generation!</p>
          </div>
          <div className="info-card">
            <h4>🎯 Real-Time Generation</h4>
            <p>Advanced algorithms create music instantly based on your preferences!</p>
          </div>
          <div className="info-card">
            <h4>🔧 Hackable</h4>
            <p>Tweak creativity, complexity, and other AI parameters in real-time!</p>
          </div>
          <div className="info-card">
            <h4>🎓 Educational</h4>
            <p>Learn about music theory, AI, and algorithmic composition!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeuralJam;