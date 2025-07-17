import React, { useState } from 'react';
import './Observatory.css';

const Observatory = () => {
  const [selectedComposer, setSelectedComposer] = useState('mozart');
  const [selectedPiece, setSelectedPiece] = useState('k545');

  const composers = {
    mozart: {
      name: 'Wolfgang Amadeus Mozart',
      years: '1756-1791',
      pieces: {
        k545: 'Piano Sonata No. 16 in C Major, K. 545',
        k331: 'Piano Sonata No. 11 in A Major, K. 331',
        k550: 'Symphony No. 40 in G Minor, K. 550',
        k280: 'Piano Sonata No. 2 in F Major, K. 280'
      }
    },
    beethoven: {
      name: 'Ludwig van Beethoven',
      years: '1770-1827',
      pieces: {
        op27no2: 'Piano Sonata No. 14 "Moonlight", Op. 27 No. 2',
        op67: 'Symphony No. 5 in C Minor, Op. 67',
        op53: 'Piano Sonata No. 21 "Waldstein", Op. 53',
        op57: 'Piano Sonata No. 23 "Appassionata", Op. 57'
      }
    }
  };

  const analysisData = {
    mozart: {
      k545: {
        key: 'C Major',
        form: 'Sonata Form',
        timeSignature: '4/4',
        tempo: 'Allegro',
        analysis: 'This sonata epitomizes Classical elegance and clarity. The first movement follows perfect sonata form with a clear exposition, development, and recapitulation. Notice the balanced phrases and Mozart\'s gift for melodic invention.',
        harmonicProgression: 'I - V - vi - IV - I - V - I',
        technicalFeatures: ['Alberti bass', 'Balanced phrases', 'Clear cadences', 'Melodic sequences'],
        mathematicalElements: ['Golden ratio proportions', 'Symmetrical phrase structure', 'Fibonacci sequence in development']
      },
      k331: {
        key: 'A Major',
        form: 'Theme and Variations',
        timeSignature: '6/8',
        tempo: 'Andante grazioso',
        analysis: 'Begins unusually with a theme and variations instead of sonata form. The theme is memorable and Mozart shows his mastery of variation technique.',
        harmonicProgression: 'I - V - I - vi - ii - V - I',
        technicalFeatures: ['Ornamental variations', 'Textural changes', 'Rhythmic modifications'],
        mathematicalElements: ['Proportional relationships', 'Harmonic series applications', 'Metric modulation']
      }
    },
    beethoven: {
      op27no2: {
        key: 'C# Minor',
        form: 'Sonata quasi una fantasia',
        timeSignature: '4/4',
        tempo: 'Adagio sostenuto',
        analysis: 'The famous "Moonlight" sonata breaks Classical conventions. The first movement is contemplative and atmospheric, built on a simple but profound harmonic foundation.',
        harmonicProgression: 'i - V - i - iv - V - i',
        technicalFeatures: ['Continuous triplet accompaniment', 'Sustained melody', 'Pedal effects'],
        mathematicalElements: ['Harmonic rhythm patterns', 'Proportional development', 'Logarithmic dynamics']
      },
      op67: {
        key: 'C Minor',
        form: 'Sonata Form',
        timeSignature: '2/4',
        tempo: 'Allegro con brio',
        analysis: 'The iconic "fate knocking at the door" motif drives this entire symphony. Beethoven shows how a simple four-note pattern can generate an entire masterwork.',
        harmonicProgression: 'i - V - i - VI - iv - V - i',
        technicalFeatures: ['Motivic development', 'Cyclic form', 'Orchestral color'],
        mathematicalElements: ['Motivic transformation', 'Proportional structure', 'Exponential development']
      }
    }
  };

  const getCurrentAnalysis = () => {
    return analysisData[selectedComposer]?.[selectedPiece] || {};
  };

  const analysis = getCurrentAnalysis();

  return (
    <div className="section">
      <div className="section-header">
        <h2 className="section-title">🔭 The Observatory</h2>
        <p className="section-description">
          Explore the mathematical beauty and structural genius of Mozart and Beethoven
        </p>
      </div>

      <div className="observatory-content">
        <div className="composer-selector">
          <h3>Choose Your Master:</h3>
          <div className="composer-buttons">
            {Object.entries(composers).map(([key, composer]) => (
              <button
                key={key}
                className={`composer-button ${selectedComposer === key ? 'active' : ''}`}
                onClick={() => setSelectedComposer(key)}
              >
                <div className="composer-name">{composer.name}</div>
                <div className="composer-years">{composer.years}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="piece-selector">
          <h3>Select a Masterpiece:</h3>
          <div className="piece-buttons">
            {Object.entries(composers[selectedComposer].pieces).map(([key, piece]) => (
              <button
                key={key}
                className={`piece-button ${selectedPiece === key ? 'active' : ''}`}
                onClick={() => setSelectedPiece(key)}
              >
                {piece}
              </button>
            ))}
          </div>
        </div>

        <div className="analysis-panel">
          <h3>Musical Analysis</h3>
          {analysis.analysis && (
            <div className="analysis-content">
              <div className="analysis-overview">
                <h4>Overview</h4>
                <p>{analysis.analysis}</p>
              </div>

              <div className="analysis-details">
                <div className="detail-card">
                  <h4>Key Signature</h4>
                  <p>{analysis.key}</p>
                </div>
                <div className="detail-card">
                  <h4>Form</h4>
                  <p>{analysis.form}</p>
                </div>
                <div className="detail-card">
                  <h4>Time Signature</h4>
                  <p>{analysis.timeSignature}</p>
                </div>
                <div className="detail-card">
                  <h4>Tempo</h4>
                  <p>{analysis.tempo}</p>
                </div>
              </div>

              <div className="harmonic-analysis">
                <h4>Harmonic Progression</h4>
                <div className="progression-display">
                  {analysis.harmonicProgression}
                </div>
              </div>

              <div className="technical-features">
                <h4>Technical Features</h4>
                <ul>
                  {analysis.technicalFeatures?.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div className="mathematical-elements">
                <h4>Mathematical Elements</h4>
                <ul>
                  {analysis.mathematicalElements?.map((element, index) => (
                    <li key={index}>{element}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Observatory;