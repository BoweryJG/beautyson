import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Renderer, Stave, StaveNote, Voice, Formatter } from 'vexflow';
import './NotationViewer.css';

const NotationViewer = ({ notes = [], currentNote = null, selectedKey = 'C' }) => {
  const svgRef = useRef(null);
  const [_renderer, setRenderer] = useState(null);
  const [dimensions, setDimensions] = useState({ width: 500, height: 200 });
  const renderTimeoutRef = useRef(null);

  // Map of note names to VexFlow note representation
  const noteMap = {
    'C': 'c/4',
    'C#': 'c#/4',
    'D': 'd/4',
    'D#': 'd#/4',
    'E': 'e/4',
    'F': 'f/4',
    'F#': 'f#/4',
    'G': 'g/4',
    'G#': 'g#/4',
    'A': 'a/4',
    'A#': 'a#/4',
    'B': 'b/4'
  };

  // Key signatures
  const keySignatures = {
    'C': [],
    'G': ['f#'],
    'D': ['f#', 'c#'],
    'A': ['f#', 'c#', 'g#'],
    'E': ['f#', 'c#', 'g#', 'd#'],
    'F': ['bb'],
    'Bb': ['bb', 'eb'],
    'Eb': ['bb', 'eb', 'ab']
  };

  // Create a simple scale for the selected key (8 notes max)
  const createScale = (key) => {
    const scaleNotes = {
      'C': ['c/4', 'd/4', 'e/4', 'f/4', 'g/4', 'a/4', 'b/4', 'c/5'],
      'G': ['g/4', 'a/4', 'b/4', 'c/5', 'd/5', 'e/5', 'f#/5', 'g/5'],
      'D': ['d/4', 'e/4', 'f#/4', 'g/4', 'a/4', 'b/4', 'c#/5', 'd/5'],
      'A': ['a/4', 'b/4', 'c#/5', 'd/5', 'e/5', 'f#/5', 'g#/5', 'a/5'],
      'E': ['e/4', 'f#/4', 'g#/4', 'a/4', 'b/4', 'c#/5', 'd#/5', 'e/5'],
      'F': ['f/4', 'g/4', 'a/4', 'bb/4', 'c/5', 'd/5', 'e/5', 'f/5'],
      'Bb': ['bb/4', 'c/5', 'd/5', 'eb/5', 'f/5', 'g/5', 'a/5', 'bb/5'],
      'Eb': ['eb/4', 'f/4', 'g/4', 'ab/4', 'bb/4', 'c/5', 'd/5', 'eb/5']
    };
    
    return scaleNotes[key] || scaleNotes['C'];
  };

  const updateDimensions = () => {
    if (svgRef.current) {
      const containerWidth = svgRef.current.parentElement.clientWidth;
      setDimensions({
        width: Math.min(containerWidth - 40, 800),
        height: 200
      });
    }
  };

  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const renderNotation = useCallback(() => {
    if (!svgRef.current) return;

    // Clear previous content
    svgRef.current.innerHTML = '';

    // Create renderer
    const vfRenderer = new Renderer(svgRef.current, Renderer.Backends.SVG);
    vfRenderer.resize(dimensions.width, dimensions.height);
    setRenderer(vfRenderer);

    const context = vfRenderer.getContext();
    context.setFillStyle('var(--text-primary)');
    context.setStrokeStyle('var(--text-primary)');

    // Create stave
    const stave = new Stave(20, 40, dimensions.width - 40);
    
    // Add clef and key signature
    stave.addClef('treble');
    const keySignature = keySignatures[selectedKey] || [];
    if (keySignature.length > 0) {
      stave.addKeySignature(selectedKey);
    }
    
    stave.setContext(context).draw();

    // Create notes to display
    let notesToDisplay = [];
    
    // Ensure notes is an array and filter out invalid entries
    const validNotes = Array.isArray(notes) ? notes.filter(note => 
      note && typeof note === 'string' && noteMap[note]
    ) : [];
    
    if (validNotes.length > 0) {
      // Display provided notes
      notesToDisplay = validNotes.map(note => {
        const vfNote = noteMap[note] || 'c/4';
        const staveNote = new StaveNote({ keys: [vfNote], duration: 'q' });
        
        // Highlight current note
        if (note === currentNote) {
          staveNote.setStyle({ fillStyle: 'var(--neon-green)', strokeStyle: 'var(--neon-green)' });
        }
        
        return staveNote;
      });
    } else {
      // Display scale for the selected key (limit to 8 notes)
      const scale = createScale(selectedKey);
      const limitedScale = scale.slice(0, 8);
      notesToDisplay = limitedScale.map(note => {
        const staveNote = new StaveNote({ keys: [note], duration: 'q' });
        
        // Highlight current note
        const noteName = note.split('/')[0].toUpperCase().replace('#', '#');
        if (noteName === currentNote) {
          staveNote.setStyle({ fillStyle: 'var(--electric-blue)', strokeStyle: 'var(--electric-blue)' });
        }
        
        return staveNote;
      });
    }

    if (notesToDisplay.length > 0) {
      try {
        // Limit notes to prevent VexFlow "Too many ticks" error
        // Use a conservative limit of 6 notes to ensure stability
        const maxNotes = Math.min(notesToDisplay.length, 6);
        const limitedNotes = notesToDisplay.slice(0, maxNotes);
        
        // Calculate total beats based on note durations
        // Since all notes are quarter notes ('q'), each note = 1 beat
        const totalBeats = limitedNotes.length;
        
        // Ensure we have valid notes and reasonable beat count
        if (totalBeats > 0 && totalBeats <= 6) {
          // Create voice and add notes
          const voice = new Voice({ num_beats: totalBeats, beat_value: 4 });
          voice.addTickables(limitedNotes);

          // Format and draw
          const formatter = new Formatter();
          formatter.joinVoices([voice]);
          formatter.format([voice], dimensions.width - 80);
          
          voice.draw(context, stave);
        }
      } catch (error) {
        console.warn('VexFlow rendering error:', error);
        // Draw a simple message on the stave if rendering fails
        context.fillText('Unable to render notation', dimensions.width / 2 - 80, 120);
      }
    }
  }, [notes, currentNote, selectedKey, dimensions]);

  useEffect(() => {
    // Clear any pending renders
    if (renderTimeoutRef.current) {
      clearTimeout(renderTimeoutRef.current);
    }
    
    // Debounce the rendering to prevent rapid re-renders
    renderTimeoutRef.current = setTimeout(() => {
      renderNotation();
    }, 50);

    return () => {
      if (renderTimeoutRef.current) {
        clearTimeout(renderTimeoutRef.current);
      }
    };
  }, [renderNotation]);

  return (
    <div className="notation-viewer">
      <div className="notation-header">
        <h3>🎼 Musical Notation</h3>
        <div className="key-display">
          <span>Key: {selectedKey} Major</span>
        </div>
      </div>
      
      <div className="notation-container">
        <svg ref={svgRef} className="notation-svg" />
      </div>
      
      <div className="notation-info">
        <div className="info-section">
          <h4>🎯 Current Note</h4>
          <p>{currentNote || 'Play a note to see it highlighted'}</p>
        </div>
        
        <div className="info-section">
          <h4>🎹 Scale Pattern</h4>
          <p>Whole-Whole-Half-Whole-Whole-Whole-Half</p>
        </div>
        
        <div className="info-section">
          <h4>🔢 Mathematical Intervals</h4>
          <p>Each scale degree has a specific frequency ratio</p>
        </div>
      </div>
    </div>
  );
};

export default NotationViewer;