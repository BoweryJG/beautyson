import React, { useState, useEffect } from 'react';
import './IntervalTrainer.css';
import useAudio from '../../hooks/useAudio';

const IntervalTrainer = () => {
  const { playTone, playChord, noteFrequencies } = useAudio();
  const [currentInterval, setCurrentInterval] = useState(null);
  const [userGuess, setUserGuess] = useState('');
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [feedback, setFeedback] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [difficulty, setDifficulty] = useState('beginner');

  // Musical intervals with their mathematical ratios
  const intervals = {
    beginner: [
      { name: 'Unison', semitones: 0, ratio: '1:1', frequency: 1.0, description: 'Same note' },
      { name: 'Octave', semitones: 12, ratio: '2:1', frequency: 2.0, description: 'Double frequency' },
      { name: 'Perfect Fifth', semitones: 7, ratio: '3:2', frequency: 1.5, description: 'Most consonant interval' },
      { name: 'Perfect Fourth', semitones: 5, ratio: '4:3', frequency: 1.333, description: 'Complementary to fifth' }
    ],
    intermediate: [
      { name: 'Major Third', semitones: 4, ratio: '5:4', frequency: 1.25, description: 'Happy sound' },
      { name: 'Minor Third', semitones: 3, ratio: '6:5', frequency: 1.2, description: 'Sad sound' },
      { name: 'Major Second', semitones: 2, ratio: '9:8', frequency: 1.125, description: 'Whole step' },
      { name: 'Minor Second', semitones: 1, ratio: '16:15', frequency: 1.067, description: 'Half step' }
    ],
    advanced: [
      { name: 'Major Sixth', semitones: 9, ratio: '5:3', frequency: 1.667, description: 'Inverted minor third' },
      { name: 'Minor Sixth', semitones: 8, ratio: '8:5', frequency: 1.6, description: 'Inverted major third' },
      { name: 'Major Seventh', semitones: 11, ratio: '15:8', frequency: 1.875, description: 'Tense, wants resolution' },
      { name: 'Tritone', semitones: 6, ratio: '√2:1', frequency: 1.414, description: 'Devil\'s interval' }
    ]
  };

  const baseFrequency = 440; // A4

  // Generate a random interval for the current difficulty
  const generateNewInterval = () => {
    const availableIntervals = intervals[difficulty];
    const randomInterval = availableIntervals[Math.floor(Math.random() * availableIntervals.length)];
    setCurrentInterval(randomInterval);
    setUserGuess('');
    setFeedback('');
  };

  // Play the interval
  const playInterval = async () => {
    if (!currentInterval) return;
    
    setIsPlaying(true);
    
    // Play root note
    playTone(baseFrequency, 800);
    
    // Wait then play interval
    setTimeout(() => {
      const intervalFreq = baseFrequency * currentInterval.frequency;
      playTone(intervalFreq, 800);
    }, 1000);
    
    // Play both notes together (harmonic)
    setTimeout(() => {
      playChord([baseFrequency, baseFrequency * currentInterval.frequency], 1000);
    }, 2000);
    
    setTimeout(() => setIsPlaying(false), 3500);
  };

  // Check user's answer
  const checkAnswer = () => {
    if (!currentInterval || !userGuess) return;
    
    const isCorrect = userGuess === currentInterval.name;
    
    if (isCorrect) {
      setScore(prev => ({ correct: prev.correct + 1, total: prev.total + 1 }));
      setFeedback('🎉 Correct! Great ear for music!');
    } else {
      setScore(prev => ({ correct: prev.correct, total: prev.total + 1 }));
      setFeedback(`❌ That was a ${currentInterval.name}. Try again!`);
    }
    
    // Auto-generate new interval after 2 seconds
    setTimeout(() => {
      generateNewInterval();
    }, 2000);
  };

  // Mathematical explanation for the current interval
  const getMathematicalExplanation = () => {
    if (!currentInterval) return null;
    
    const { name, ratio, frequency, semitones, description } = currentInterval;
    
    return (
      <div className="math-explanation">
        <h4>🔢 Mathematical Analysis: {name}</h4>
        <div className="math-details">
          <div className="math-item">
            <strong>Frequency Ratio:</strong> {ratio}
            <p>The upper note vibrates {frequency}× faster than the lower note</p>
          </div>
          <div className="math-item">
            <strong>Semitones:</strong> {semitones}
            <p>Distance of {semitones} half-steps on the piano</p>
          </div>
          <div className="math-item">
            <strong>Description:</strong> {description}
          </div>
          <div className="math-item">
            <strong>In Nature:</strong>
            <p>{getNatureConnection(name)}</p>
          </div>
        </div>
      </div>
    );
  };

  // Connect intervals to natural phenomena
  const getNatureConnection = (intervalName) => {
    const connections = {
      'Unison': 'Like identical crystals in a perfect lattice',
      'Octave': 'Like the 2:1 ratio in cell division and binary patterns',
      'Perfect Fifth': 'Found in the golden ratio and spiral galaxies',
      'Perfect Fourth': 'Like the 4:3 ratio in architectural proportions',
      'Major Third': 'Resonates with the 5:4 ratio in flower petal arrangements',
      'Minor Third': 'Appears in the 6:5 ratio of honeycomb structures',
      'Major Second': 'Like the 9:8 ratio in wave interference patterns',
      'Minor Second': 'Creates tension like tectonic plate movements',
      'Major Sixth': 'Mirrors the 5:3 ratio in pine cone spirals',
      'Minor Sixth': 'Found in the 8:5 ratio of nautilus shell chambers',
      'Major Seventh': 'Creates tension like approaching storm fronts',
      'Tritone': 'Like the √2 ratio in square root spirals'
    };
    
    return connections[intervalName] || 'A unique mathematical relationship in nature';
  };

  useEffect(() => {
    generateNewInterval();
  }, [difficulty]);

  const accuracyPercentage = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;

  return (
    <div className="interval-trainer">
      <div className="trainer-header">
        <h3>🎵 Interval Trainer</h3>
        <div className="difficulty-selector">
          <label>Difficulty:</label>
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </div>

      <div className="score-display">
        <div className="score-item">
          <span className="score-label">Score:</span>
          <span className="score-value">{score.correct}/{score.total}</span>
        </div>
        <div className="score-item">
          <span className="score-label">Accuracy:</span>
          <span className="score-value">{accuracyPercentage}%</span>
        </div>
      </div>

      <div className="training-area">
        <div className="play-section">
          <button 
            className="play-interval-btn"
            onClick={playInterval}
            disabled={isPlaying || !currentInterval}
          >
            {isPlaying ? '🎵 Playing...' : '▶️ Play Interval'}
          </button>
          <p className="play-instructions">
            Listen to the two notes and identify the interval
          </p>
        </div>

        <div className="guess-section">
          <h4>What interval do you hear?</h4>
          <div className="interval-options">
            {intervals[difficulty].map((interval) => (
              <button
                key={interval.name}
                className={`interval-option ${userGuess === interval.name ? 'selected' : ''}`}
                onClick={() => setUserGuess(interval.name)}
                disabled={!currentInterval}
              >
                {interval.name}
              </button>
            ))}
          </div>
          
          <button 
            className="submit-btn"
            onClick={checkAnswer}
            disabled={!userGuess || !currentInterval}
          >
            Submit Answer
          </button>
        </div>

        {feedback && (
          <div className={`feedback ${feedback.includes('Correct') ? 'correct' : 'incorrect'}`}>
            {feedback}
          </div>
        )}
      </div>

      {currentInterval && getMathematicalExplanation()}

      <div className="learning-tips">
        <h4>🎓 Learning Tips</h4>
        <div className="tips-grid">
          <div className="tip-item">
            <strong>Listen for Consonance:</strong>
            <p>Octaves and fifths sound stable and pleasant</p>
          </div>
          <div className="tip-item">
            <strong>Feel the Tension:</strong>
            <p>Seconds and sevenths create tension that wants resolution</p>
          </div>
          <div className="tip-item">
            <strong>Mathematical Patterns:</strong>
            <p>Simple ratios (2:1, 3:2) sound more consonant than complex ones</p>
          </div>
          <div className="tip-item">
            <strong>Practice Regularly:</strong>
            <p>Your ear will naturally develop pattern recognition</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntervalTrainer;