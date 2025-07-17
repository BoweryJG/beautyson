import React, { useState } from 'react';
import './Workshop.css';

const Workshop = () => {
  const [selectedForm, setSelectedForm] = useState('sonata');
  const [composition, setComposition] = useState('');

  const musicalForms = [
    { id: 'sonata', name: 'Sonata Form', description: 'Classical three-part structure used by Mozart and Beethoven' },
    { id: 'rondo', name: 'Rondo Form', description: 'Recurring theme with contrasting episodes' },
    { id: 'theme-variations', name: 'Theme & Variations', description: 'Explore musical transformations' },
    { id: 'minuet', name: 'Minuet & Trio', description: 'Elegant dance form in triple meter' }
  ];

  const handleFormSelect = (formId) => {
    setSelectedForm(formId);
  };

  const generateTemplate = () => {
    const templates = {
      sonata: 'Exposition:\nTheme A (Tonic)\nBridge\nTheme B (Dominant)\nClosing\n\nDevelopment:\nThematic transformation\nModulation\nFragmentation\n\nRecapitulation:\nTheme A (Tonic)\nBridge\nTheme B (Tonic)\nCoda',
      rondo: 'A Section (Main Theme)\nB Section (Contrasting)\nA Section (Return)\nC Section (New Material)\nA Section (Final Return)',
      'theme-variations': 'Original Theme:\n[Your melody here]\n\nVariation 1: Melodic ornamentation\nVariation 2: Rhythmic transformation\nVariation 3: Harmonic development\nVariation 4: Textural changes\nVariation 5: Final elaboration',
      minuet: 'Minuet:\nA Section (8 bars) - repeat\nB Section (8 bars) - repeat\n\nTrio:\nA Section (8 bars) - repeat\nB Section (8 bars) - repeat\n\nMinuet da Capo'
    };
    
    setComposition(templates[selectedForm] || '');
  };

  return (
    <div className="section">
      <div className="section-header">
        <h2 className="section-title">🎼 The Workshop</h2>
        <p className="section-description">
          Craft your musical masterpieces using classical forms perfected by Mozart and Beethoven
        </p>
      </div>

      <div className="workshop-content">
        <div className="form-selector">
          <h3>Choose Your Musical Form:</h3>
          <div className="form-buttons">
            {musicalForms.map(form => (
              <button
                key={form.id}
                className={`form-button ${selectedForm === form.id ? 'active' : ''}`}
                onClick={() => handleFormSelect(form.id)}
              >
                <div className="form-name">{form.name}</div>
                <div className="form-description">{form.description}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="composition-area">
          <div className="composition-header">
            <h3>Your Composition Studio</h3>
            <button className="template-button" onClick={generateTemplate}>
              Generate Template
            </button>
          </div>
          
          <textarea
            className="composition-textarea"
            value={composition}
            onChange={(e) => setComposition(e.target.value)}
            placeholder="Begin your musical journey... Click 'Generate Template' to start with a classical form, or create your own original work."
            rows={20}
          />
        </div>

        <div className="composition-tools">
          <h3>Da Vinci's Tools</h3>
          <div className="tools-grid">
            <div className="tool-card">
              <h4>🎵 Melody Builder</h4>
              <p>Construct melodic lines using interval patterns</p>
            </div>
            <div className="tool-card">
              <h4>🎹 Harmony Guide</h4>
              <p>Explore chord progressions and voice leading</p>
            </div>
            <div className="tool-card">
              <h4>⚡ Rhythm Patterns</h4>
              <p>Classical rhythmic structures and variations</p>
            </div>
            <div className="tool-card">
              <h4>🔄 Modulation Helper</h4>
              <p>Navigate between keys like the masters</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workshop;