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
import MusicEducation from './components/MusicEducation/MusicEducation';
import ProfessionalConnect from './components/ProfessionalConnect/ProfessionalConnect';
import useAudio from './hooks/useAudio';

function App() {
  const [activeSection, setActiveSection] = useState('workshop');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isPlaying, currentFrequency, getFrequencyData } = useAudio();

  const sections = [
    { id: 'workshop', name: 'The Workshop', icon: '🎼' },
    { id: 'observatory', name: 'The Observatory', icon: '🔭' },
    { id: 'invention-lab', name: 'The Invention Lab', icon: '⚙️' },
    { id: 'gallery', name: 'The Gallery', icon: '🎨' },
    { id: 'library', name: 'The Library', icon: '📚' },
    { id: 'neural-jam', name: 'Neural Jam', icon: '🧠' },
    { id: 'music-education', name: 'Music Education', icon: '🎓' },
    { id: 'professional-connect', name: 'Professional Connect', icon: '🚀' },
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
      case 'music-education':
        return <MusicEducation />;
      case 'professional-connect':
        return <ProfessionalConnect />;
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
          <h1 className="app-title">Beau's Lab</h1>
          <p className="app-subtitle">Where Music Meets Innovation</p>
        </div>
        <div className="header-actions">
          <button 
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
            <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
            <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
          </button>
          <div className="da-vinci-sketch">
            <svg width="60" height="60" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="30" fill="none" stroke="var(--electric-blue)" strokeWidth="2"/>
              <g fill="none" stroke="var(--neon-green)" strokeWidth="2">
                <path d="M35 45 C33 41, 33 37, 37 35 C41 33, 45 35, 50 41 C50 45, 45 47, 43 50 C41 52, 37 52, 35 45 Z"/>
                <path d="M65 45 C67 41, 67 37, 63 35 C59 33, 55 35, 50 41 C50 45, 55 47, 57 50 C59 52, 63 52, 65 45 Z"/>
              </g>
              <g fill="none" stroke="var(--purple-primary)" strokeWidth="1">
                <path d="M25 50 C30 45, 30 55, 35 50"/>
                <path d="M65 50 C70 45, 70 55, 75 50"/>
              </g>
              <circle cx="50" cy="42" r="2" fill="var(--orange-accent)"/>
            </svg>
          </div>
        </div>
      </header>

      <nav className={`main-nav ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
        {sections.map(section => (
          <button
            key={section.id}
            className={`nav-button ${activeSection === section.id ? 'active' : ''}`}
            onClick={() => {
              setActiveSection(section.id);
              setIsMobileMenuOpen(false);
            }}
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
        <p>Crafted with passion for Beau Tyson's musical journey - Sonic Genius Lab</p>
      </footer>
    </div>
  );
}

export default App
