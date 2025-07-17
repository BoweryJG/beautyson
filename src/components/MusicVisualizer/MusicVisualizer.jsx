import React, { useEffect, useRef, useState } from 'react';
import './MusicVisualizer.css';

const MusicVisualizer = ({ isPlaying = false, frequency = 440, waveform = 'sine', getFrequencyData = null }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const [nature, setNature] = useState([]);

  const naturePatterns = {
    fibonacci: {
      name: 'Fibonacci Spiral',
      description: 'Found in nautilus shells, galaxies, and flower petals',
      image: '🌀',
      frequencies: [261.63, 329.63, 392.00, 523.25] // C, E, G, C
    },
    golden: {
      name: 'Golden Ratio',
      description: 'The divine proportion in art and nature',
      image: '🌻',
      frequencies: [440, 277.18, 698.46] // A, C#, F
    },
    crystal: {
      name: 'Crystal Lattice',
      description: 'Geometric patterns in crystals and minerals',
      image: '💎',
      frequencies: [220, 440, 880, 1760] // Perfect octaves
    },
    wave: {
      name: 'Wave Interference',
      description: 'Ocean waves, sound waves, light waves',
      image: '🌊',
      frequencies: [110, 165, 220, 275] // Harmonic series
    },
    tree: {
      name: 'Tree Branching',
      description: 'Fractal patterns in tree branches and rivers',
      image: '🌳',
      frequencies: [196, 246.94, 329.63, 415.30] // Natural intervals
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    let time = 0;

    const drawVisualization = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Set up gradient background
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 200);
      gradient.addColorStop(0, 'rgba(139, 92, 246, 0.1)');
      gradient.addColorStop(1, 'rgba(0, 217, 255, 0.1)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw mathematical patterns based on frequency
      const radius = 100;
      const points = 60;
      
      for (let i = 0; i < points; i++) {
        const angle = (i / points) * Math.PI * 2;
        const wave = Math.sin(angle * 8 + time * 0.05) * 20;
        const x = centerX + Math.cos(angle) * (radius + wave);
        const y = centerY + Math.sin(angle) * (radius + wave);
        
        // Color based on frequency
        const hue = (frequency / 1000) * 360;
        ctx.fillStyle = `hsl(${hue}, 70%, 60%)`;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw frequency spectrum (real-time if available)
      const barWidth = canvas.width / 32;
      const frequencyData = getFrequencyData ? getFrequencyData() : null;
      
      for (let i = 0; i < 32; i++) {
        let height;
        if (frequencyData && isPlaying) {
          // Use real frequency data
          const dataIndex = Math.floor((i / 32) * frequencyData.length);
          height = (frequencyData[dataIndex] / 255) * 100 + 20;
        } else {
          // Use animated simulation
          height = Math.sin(i * 0.5 + time * 0.1) * 50 + 60;
        }
        
        const x = i * barWidth;
        const y = canvas.height - height;
        
        const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
        gradient.addColorStop(0, 'rgba(57, 255, 20, 0.8)');
        gradient.addColorStop(1, 'rgba(255, 107, 53, 0.8)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, barWidth - 2, height);
      }

      // Draw harmonic circles
      for (let i = 1; i <= 5; i++) {
        const harmonicRadius = 30 * i;
        const alpha = 0.3 / i;
        
        ctx.strokeStyle = `rgba(0, 217, 255, ${alpha})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, harmonicRadius, 0, Math.PI * 2);
        ctx.stroke();
      }

      time += 1;
      animationRef.current = requestAnimationFrame(drawVisualization);
    };

    drawVisualization();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [frequency, waveform, isPlaying]);

  useEffect(() => {
    // Find nature patterns that match the current frequency
    const matchingPatterns = Object.entries(naturePatterns).filter(([, pattern]) => {
      return pattern.frequencies.some(freq => Math.abs(freq - frequency) < 50);
    });

    setNature(matchingPatterns);
  }, [frequency, naturePatterns]);

  return (
    <div className="music-visualizer">
      <div className="visualizer-container">
        <canvas
          ref={canvasRef}
          width={400}
          height={300}
          className="visualizer-canvas"
        />
        <div className="visualizer-info">
          <div className="frequency-display">
            <span className="frequency-value">{frequency.toFixed(2)} Hz</span>
            <span className="waveform-type">{waveform}</span>
          </div>
        </div>
      </div>

      {nature.length > 0 && (
        <div className="nature-connections">
          <h3>🌿 Nature's Mathematical Harmony</h3>
          <div className="nature-patterns">
            {nature.map(([key, pattern]) => (
              <div key={key} className="nature-pattern">
                <div className="pattern-icon">{pattern.image}</div>
                <div className="pattern-content">
                  <h4>{pattern.name}</h4>
                  <p>{pattern.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="inspiration-prompt">
            <p>💡 <strong>Musical Inspiration:</strong> Try creating melodies that follow these natural patterns!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicVisualizer;