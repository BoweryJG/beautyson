import React, { useState } from 'react';
import './AIComposer.css';

const AIComposer = () => {
  const [composition, setComposition] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('classical');
  const [selectedMood, setSelectedMood] = useState('happy');

  const styles = [
    { id: 'classical', name: 'Classical', icon: '🎼' },
    { id: 'jazz', name: 'Jazz', icon: '🎷' },
    { id: 'electronic', name: 'Electronic', icon: '🎛️' },
    { id: 'cinematic', name: 'Cinematic', icon: '🎬' },
    { id: 'ambient', name: 'Ambient', icon: '🌙' },
    { id: 'rock', name: 'Rock', icon: '🎸' }
  ];

  const moods = [
    { id: 'happy', name: 'Happy', color: '#FFD700' },
    { id: 'calm', name: 'Calm', color: '#87CEEB' },
    { id: 'energetic', name: 'Energetic', color: '#FF6347' },
    { id: 'mysterious', name: 'Mysterious', color: '#9370DB' },
    { id: 'dramatic', name: 'Dramatic', color: '#DC143C' },
    { id: 'peaceful', name: 'Peaceful', color: '#98FB98' }
  ];

  // Mock AIVA API call - replace with actual AIVA API integration
  const generateComposition = async () => {
    setIsGenerating(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock composition data
    const mockComposition = {
      id: Date.now(),
      title: `${selectedMood.charAt(0).toUpperCase() + selectedMood.slice(1)} ${selectedStyle.charAt(0).toUpperCase() + selectedStyle.slice(1)} Piece`,
      style: selectedStyle,
      mood: selectedMood,
      duration: '2:45',
      bpm: Math.floor(Math.random() * 60) + 80,
      key: ['C Major', 'G Major', 'D Minor', 'A Minor', 'F Major'][Math.floor(Math.random() * 5)],
      instruments: getInstrumentsForStyle(selectedStyle),
      audioUrl: null, // Would be returned by AIVA API
      midiUrl: null,  // Would be returned by AIVA API
      sheetMusicUrl: null, // Would be returned by AIVA API
      prompt: prompt || `A ${selectedMood} ${selectedStyle} composition`,
      generatedAt: new Date().toISOString()
    };
    
    setComposition(mockComposition);
    setIsGenerating(false);
  };

  const getInstrumentsForStyle = (style) => {
    const instrumentSets = {
      classical: ['Piano', 'Violin', 'Cello', 'Flute'],
      jazz: ['Piano', 'Saxophone', 'Double Bass', 'Drums'],
      electronic: ['Synthesizer', 'Drum Machine', 'Bass Synth'],
      cinematic: ['Orchestra', 'Strings', 'Brass', 'Timpani'],
      ambient: ['Synthesizer', 'Pad', 'Reverb Guitar'],
      rock: ['Electric Guitar', 'Bass Guitar', 'Drums', 'Vocals']
    };
    return instrumentSets[style] || ['Piano'];
  };

  const downloadComposition = (type) => {
    // Mock download - would use actual URLs from AIVA API
    alert(`Downloading ${type} for "${composition.title}"\n\nNote: This is a demo. Actual AIVA integration would provide real files.`);
  };

  return (
    <div className="ai-composer">
      <div className="composer-header">
        <h2>🤖 AI Music Composer</h2>
        <p>Powered by AIVA - Create original music compositions with artificial intelligence</p>
      </div>

      <div className="composition-generator">
        <div className="generator-controls">
          <div className="control-group">
            <label>Style</label>
            <div className="style-selector">
              {styles.map(style => (
                <button
                  key={style.id}
                  className={`style-btn ${selectedStyle === style.id ? 'active' : ''}`}
                  onClick={() => setSelectedStyle(style.id)}
                >
                  <span className="style-icon">{style.icon}</span>
                  <span>{style.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="control-group">
            <label>Mood</label>
            <div className="mood-selector">
              {moods.map(mood => (
                <button
                  key={mood.id}
                  className={`mood-btn ${selectedMood === mood.id ? 'active' : ''}`}
                  onClick={() => setSelectedMood(mood.id)}
                  style={{ '--mood-color': mood.color }}
                >
                  {mood.name}
                </button>
              ))}
            </div>
          </div>

          <div className="control-group">
            <label>Custom Prompt (Optional)</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your musical vision... (e.g., 'A gentle lullaby for bedtime' or 'Epic adventure theme song')"
              rows={3}
            />
          </div>

          <button 
            className="generate-btn"
            onClick={generateComposition}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <span className="spinner"></span>
                Generating Music...
              </>
            ) : (
              <>
                <span>✨</span>
                Generate Composition
              </>
            )}
          </button>
        </div>

        {composition && (
          <div className="composition-result">
            <div className="composition-header">
              <h3>{composition.title}</h3>
              <div className="composition-meta">
                <span className="meta-item">🎵 {composition.key}</span>
                <span className="meta-item">⏱️ {composition.duration}</span>
                <span className="meta-item">🥁 {composition.bpm} BPM</span>
              </div>
            </div>

            <div className="composition-details">
              <div className="instruments-list">
                <h4>Instruments:</h4>
                <div className="instruments">
                  {composition.instruments.map(instrument => (
                    <span key={instrument} className="instrument-tag">
                      {instrument}
                    </span>
                  ))}
                </div>
              </div>

              {composition.prompt && (
                <div className="prompt-used">
                  <h4>Prompt:</h4>
                  <p>"{composition.prompt}"</p>
                </div>
              )}
            </div>

            <div className="composition-actions">
              <div className="playback-controls">
                <button className="play-btn" disabled>
                  ▶️ Play Preview
                  <small>(Connect AIVA API)</small>
                </button>
              </div>

              <div className="download-options">
                <h4>Download:</h4>
                <button 
                  className="download-btn" 
                  onClick={() => downloadComposition('MIDI')}
                >
                  📁 MIDI File
                </button>
                <button 
                  className="download-btn" 
                  onClick={() => downloadComposition('Audio')}
                >
                  🎵 Audio (WAV)
                </button>
                <button 
                  className="download-btn" 
                  onClick={() => downloadComposition('Sheet Music')}
                >
                  📄 Sheet Music (PDF)
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="aiva-info">
        <h3>About AIVA</h3>
        <p>
          AIVA (Artificial Intelligence Virtual Artist) is an AI composer capable of creating 
          original music in various styles. Perfect for young musicians to explore composition, 
          get inspiration, or create backing tracks for practice.
        </p>
        <div className="integration-status">
          <div className="status-item">
            <span className="status-dot pending"></span>
            <span>API Integration: Setup Required</span>
          </div>
          <div className="status-item">
            <span className="status-dot active"></span>
            <span>Demo Mode: Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIComposer;