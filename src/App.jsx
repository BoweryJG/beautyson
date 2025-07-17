import React, { useState } from 'react';
import './App.css';
import Workshop from './components/Workshop/Workshop';
import Observatory from './components/Observatory/Observatory';
import InventionLab from './components/InventionLab/InventionLab';
import Gallery from './components/Gallery/Gallery';
import Library from './components/Library/Library';
import MusicVisualizer from './components/MusicVisualizer/MusicVisualizer';
import PianoKeyboard from './components/PianoKeyboard/PianoKeyboard';
import ChordPlayer from './components/ChordPlayer/ChordPlayer';
import LocalCommunity from './components/LocalCommunity/LocalCommunity';
import NeuralJam from './components/NeuralJam/NeuralJam';
import useAudio from './hooks/useAudio';

function App() {
  const [activeSection, setActiveSection] = useState('workshop');
  const { isPlaying, currentFrequency, getFrequencyData } = useAudio();

  const sections = [
    { id: 'workshop', name: 'The Workshop', icon: '🎼' },
    { id: 'observatory', name: 'The Observatory', icon: '🔭' },
    { id: 'invention-lab', name: 'The Invention Lab', icon: '⚙️' },
    { id: 'gallery', name: 'The Gallery', icon: '🎨' },
    { id: 'library', name: 'The Library', icon: '📚' },
    { id: 'neural-jam', name: 'Neural Jam', icon: '🧠' },
    { id: 'community', name: 'Local Community', icon: '🌴' }
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'workshop':
        return <Workshop />;
      case 'observatory':
        return <Observatory />;
      case 'invention-lab':
        return <InventionLab />;
      case 'gallery':
        return <Gallery />;
      case 'library':
        return <Library />;
      case 'neural-jam':
        return <NeuralJam />;
      case 'community':
        return <LocalCommunity />;
      default:
        return <Workshop />;
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">Beau's Renaissance Portal</h1>
          <p className="app-subtitle">Where Music Meets Innovation</p>
        </div>
        <div className="da-vinci-sketch">
          <svg width="60" height="60" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="30" fill="none" stroke="var(--electric-blue)" strokeWidth="2"/>
            <circle cx="50" cy="50" r="20" fill="none" stroke="var(--neon-green)" strokeWidth="1"/>
            <line x1="20" y1="50" x2="80" y2="50" stroke="var(--purple-primary)" strokeWidth="1"/>
            <line x1="50" y1="20" x2="50" y2="80" stroke="var(--orange-accent)" strokeWidth="1"/>
          </svg>
        </div>
      </header>

      <nav className="main-nav">
        {sections.map(section => (
          <button
            key={section.id}
            className={`nav-button ${activeSection === section.id ? 'active' : ''}`}
            onClick={() => setActiveSection(section.id)}
          >
            <span className="nav-icon">{section.icon}</span>
            <span className="nav-text">{section.name}</span>
          </button>
        ))}
      </nav>

      <main className="main-content">
        <MusicVisualizer 
          isPlaying={isPlaying}
          frequency={currentFrequency}
          waveform="sine"
          getFrequencyData={getFrequencyData}
        />
        <PianoKeyboard />
        <ChordPlayer />
        {renderActiveSection()}
      </main>

      <footer className="app-footer">
        <p>Crafted with passion for Beau Tyson's musical journey</p>
      </footer>
    </div>
  );
}

export default App
