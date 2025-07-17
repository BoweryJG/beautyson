import React, { useState } from 'react';
import './InventionLab.css';

const InventionLab = () => {
  const [selectedInstrument, setSelectedInstrument] = useState('viola-organista');

  const instruments = {
    'viola-organista': {
      name: 'Viola Organista',
      description: 'Leonardo\'s bowed keyboard instrument combining elements of harpsichord and violin',
      invention: 'A revolutionary design that uses a wheel mechanism to bow strings, creating sustained tones like a violin but played like a keyboard.',
      howItWorks: 'The keys trigger a mechanism that presses strings against a rotating wheel covered in horsehair, similar to a violin bow.',
      musicalApplication: 'Perfect for sustained melodies and rich harmonies, bridging the gap between keyboard and string instruments.',
      sketch: '🎹🎻'
    },
    'mechanical-drum': {
      name: 'Mechanical Drum',
      description: 'An automated percussion instrument designed by Leonardo',
      invention: 'A cylinder with pegs that strike drums in predetermined patterns, creating the first programmable rhythm machine.',
      howItWorks: 'A rotating cylinder with adjustable pegs triggers different drums, allowing for complex rhythmic patterns.',
      musicalApplication: 'Provides steady rhythmic foundation for compositions, especially useful for dance forms.',
      sketch: '🥁⚙️'
    },
    'glissando-flute': {
      name: 'Glissando Flute',
      description: 'Leonardo\'s design for a flute with sliding pitch mechanism',
      invention: 'A modified flute allowing for continuous pitch variation, predating the modern slide whistle.',
      howItWorks: 'A sliding mechanism changes the effective length of the flute, creating smooth glissando effects.',
      musicalApplication: 'Perfect for expressive melodies and ornamental passages in classical compositions.',
      sketch: '🌬️🎶'
    },
    'harmonical-bells': {
      name: 'Harmonical Bells',
      description: 'A set of tuned bells arranged for harmonic playing',
      invention: 'Precisely tuned bells arranged in harmonic series, allowing for complex chord progressions.',
      howItWorks: 'Multiple bells tuned to specific pitches, struck with hammers to create harmonies.',
      musicalApplication: 'Ideal for creating ethereal harmonies and supporting melodic lines.',
      sketch: '🔔✨'
    }
  };

  const playInstrument = (instrumentId) => {
    console.log(`Playing ${instrumentId}`);
  };

  const buildInstrument = (instrumentId) => {
    console.log(`Building ${instrumentId}`);
  };

  return (
    <div className="section">
      <div className="section-header">
        <h2 className="section-title">⚙️ The Invention Lab</h2>
        <p className="section-description">
          Explore Leonardo da Vinci's revolutionary musical instruments and their connection to sound
        </p>
      </div>

      <div className="invention-content">
        <div className="instrument-selector">
          <h3>Choose Your Invention:</h3>
          <div className="instrument-grid">
            {Object.entries(instruments).map(([key, instrument]) => (
              <button
                key={key}
                className={`instrument-card ${selectedInstrument === key ? 'active' : ''}`}
                onClick={() => setSelectedInstrument(key)}
              >
                <div className="instrument-sketch">{instrument.sketch}</div>
                <div className="instrument-name">{instrument.name}</div>
                <div className="instrument-description">{instrument.description}</div>
              </button>
            ))}
          </div>
        </div>

        {selectedInstrument && (
          <div className="instrument-details">
            <div className="detail-header">
              <h3>{instruments[selectedInstrument].name}</h3>
              <div className="detail-actions">
                <button 
                  className="action-button play-button"
                  onClick={() => playInstrument(selectedInstrument)}
                >
                  🎵 Play Virtual Instrument
                </button>
                <button 
                  className="action-button build-button"
                  onClick={() => buildInstrument(selectedInstrument)}
                >
                  🔧 Build Your Own
                </button>
              </div>
            </div>

            <div className="detail-content">
              <div className="detail-section">
                <h4>Leonardo's Vision</h4>
                <p>{instruments[selectedInstrument].invention}</p>
              </div>

              <div className="detail-section">
                <h4>How It Works</h4>
                <p>{instruments[selectedInstrument].howItWorks}</p>
              </div>

              <div className="detail-section">
                <h4>Musical Applications</h4>
                <p>{instruments[selectedInstrument].musicalApplication}</p>
              </div>
            </div>
          </div>
        )}

        <div className="workshop-area">
          <h3>Da Vinci's Workshop</h3>
          <div className="workshop-content">
            <div className="workshop-panel">
              <h4>🔬 Scientific Principles</h4>
              <p>
                Leonardo understood that music and mathematics are deeply connected. His instruments 
                demonstrate principles of:
              </p>
              <ul>
                <li>Harmonic ratios and frequency relationships</li>
                <li>Mechanical advantage and leverage</li>
                <li>Resonance and acoustic properties</li>
                <li>Precision engineering for musical tuning</li>
              </ul>
            </div>

            <div className="workshop-panel">
              <h4>🎨 Art Meets Science</h4>
              <p>
                Just as Leonardo's art informed his inventions, his musical instruments bridge 
                the gap between artistic expression and scientific innovation:
              </p>
              <ul>
                <li>Beautiful form following functional design</li>
                <li>Aesthetic considerations in instrument construction</li>
                <li>Human ergonomics and playability</li>
                <li>Visual harmony reflecting musical harmony</li>
              </ul>
            </div>

            <div className="workshop-panel">
              <h4>🎼 Musical Innovation</h4>
              <p>
                Leonardo's instruments opened new possibilities for composers and performers:
              </p>
              <ul>
                <li>Extended techniques and new timbres</li>
                <li>Mechanical precision enabling complex rhythms</li>
                <li>Sustained tones bridging vocal and instrumental music</li>
                <li>Automated accompaniment for solo performers</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventionLab;