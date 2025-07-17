import React, { useState } from 'react';
import './Gallery.css';

const Gallery = () => {
  const [compositions, setCompositions] = useState([
    {
      id: 1,
      title: 'Sonata in C Major',
      date: '2024-01-15',
      form: 'Sonata Form',
      description: 'A classical sonata exploring the relationship between melody and harmony',
      status: 'completed',
      notes: 'Inspired by Mozart\'s elegance and clarity'
    },
    {
      id: 2,
      title: 'Variations on a Theme',
      date: '2024-01-20',
      form: 'Theme and Variations',
      description: 'An exploration of how simple melodies can be transformed',
      status: 'in-progress',
      notes: 'Working on the mathematical relationships between variations'
    }
  ]);

  const [selectedComposition, setSelectedComposition] = useState(null);
  const [achievements, setAchievements] = useState([
    {
      id: 1,
      title: 'First Composition',
      description: 'Completed your first musical composition',
      date: '2024-01-15',
      icon: '🎼'
    },
    {
      id: 2,
      title: 'Form Explorer',
      description: 'Explored different classical musical forms',
      date: '2024-01-20',
      icon: '🔍'
    },
    {
      id: 3,
      title: 'Mozart Student',
      description: 'Analyzed multiple Mozart compositions',
      date: '2024-01-22',
      icon: '🎹'
    }
  ]);

  const [journalEntries, setJournalEntries] = useState([
    {
      id: 1,
      date: '2024-01-15',
      title: 'Discovery: Golden Ratio in Music',
      content: 'Today I discovered how the golden ratio appears in Mozart\'s sonatas. The proportions between sections often follow this mathematical relationship, creating natural balance and beauty.'
    },
    {
      id: 2,
      date: '2024-01-18',
      title: 'Beethoven\'s Motivic Development',
      content: 'I\'m fascinated by how Beethoven can take a simple four-note motif and transform it into an entire symphony. The Symphony No. 5 shows this perfectly - everything grows from those first four notes.'
    }
  ]);

  const [newJournalEntry, setNewJournalEntry] = useState({ title: '', content: '' });

  const addJournalEntry = () => {
    if (newJournalEntry.title && newJournalEntry.content) {
      const entry = {
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        title: newJournalEntry.title,
        content: newJournalEntry.content
      };
      setJournalEntries([entry, ...journalEntries]);
      setNewJournalEntry({ title: '', content: '' });
    }
  };

  return (
    <div className="section">
      <div className="section-header">
        <h2 className="section-title">🎨 The Gallery</h2>
        <p className="section-description">
          Showcase your musical creations and track your journey through the Renaissance of sound
        </p>
      </div>

      <div className="gallery-content">
        <div className="compositions-section">
          <h3>Your Compositions</h3>
          <div className="compositions-grid">
            {compositions.map(composition => (
              <div
                key={composition.id}
                className={`composition-card ${composition.status}`}
                onClick={() => setSelectedComposition(composition)}
              >
                <div className="composition-header">
                  <h4>{composition.title}</h4>
                  <span className={`status-badge ${composition.status}`}>
                    {composition.status === 'completed' ? '✓' : '⏳'}
                  </span>
                </div>
                <div className="composition-details">
                  <p className="composition-form">{composition.form}</p>
                  <p className="composition-date">{composition.date}</p>
                  <p className="composition-description">{composition.description}</p>
                </div>
              </div>
            ))}
            
            <div className="composition-card new-composition">
              <div className="new-composition-content">
                <div className="new-composition-icon">➕</div>
                <h4>Start New Composition</h4>
                <p>Begin your next musical masterpiece</p>
              </div>
            </div>
          </div>
        </div>

        <div className="achievements-section">
          <h3>Your Achievements</h3>
          <div className="achievements-grid">
            {achievements.map(achievement => (
              <div key={achievement.id} className="achievement-card">
                <div className="achievement-icon">{achievement.icon}</div>
                <div className="achievement-content">
                  <h4>{achievement.title}</h4>
                  <p>{achievement.description}</p>
                  <span className="achievement-date">{achievement.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="journal-section">
          <h3>Musical Journal</h3>
          
          <div className="journal-entry-form">
            <h4>New Discovery</h4>
            <input
              type="text"
              placeholder="What did you discover today?"
              value={newJournalEntry.title}
              onChange={(e) => setNewJournalEntry({...newJournalEntry, title: e.target.value})}
              className="journal-title-input"
            />
            <textarea
              placeholder="Share your musical thoughts and insights..."
              value={newJournalEntry.content}
              onChange={(e) => setNewJournalEntry({...newJournalEntry, content: e.target.value})}
              className="journal-content-input"
              rows={4}
            />
            <button onClick={addJournalEntry} className="add-entry-button">
              Add Entry
            </button>
          </div>

          <div className="journal-entries">
            {journalEntries.map(entry => (
              <div key={entry.id} className="journal-entry">
                <div className="entry-header">
                  <h4>{entry.title}</h4>
                  <span className="entry-date">{entry.date}</span>
                </div>
                <p className="entry-content">{entry.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedComposition && (
        <div className="composition-modal" onClick={() => setSelectedComposition(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{selectedComposition.title}</h3>
              <button className="close-button" onClick={() => setSelectedComposition(null)}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <p><strong>Form:</strong> {selectedComposition.form}</p>
              <p><strong>Date:</strong> {selectedComposition.date}</p>
              <p><strong>Description:</strong> {selectedComposition.description}</p>
              <p><strong>Notes:</strong> {selectedComposition.notes}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;