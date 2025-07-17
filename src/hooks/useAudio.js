import { useEffect, useRef, useState, useCallback } from 'react';

const useAudio = () => {
  const [audioContext, setAudioContext] = useState(null);
  const [analyzer, setAnalyzer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentFrequency, setCurrentFrequency] = useState(440);
  const [waveform, setWaveform] = useState('sine');
  const [volume, setVolume] = useState(0.3);
  
  const oscillatorRef = useRef(null);
  const gainNodeRef = useRef(null);
  const frequencyDataRef = useRef(null);

  // Initialize Audio Context
  useEffect(() => {
    const initAudio = async () => {
      try {
        const context = new (window.AudioContext || window.webkitAudioContext)();
        const analyzerNode = context.createAnalyser();
        
        analyzerNode.fftSize = 2048;
        analyzerNode.connect(context.destination);
        
        setAudioContext(context);
        setAnalyzer(analyzerNode);
        
        // Create frequency data array
        frequencyDataRef.current = new Uint8Array(analyzerNode.frequencyBinCount);
      } catch (error) {
        console.error('Failed to initialize audio context:', error);
      }
    };

    initAudio();
    
    return () => {
      if (audioContext) {
        audioContext.close();
      }
    };
  }, []);

  // Play a tone at specific frequency
  const playTone = useCallback((frequency = currentFrequency, duration = null) => {
    if (!audioContext || !analyzer) return;

    // Stop previous oscillator if playing
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
    }

    // Create oscillator and gain node
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    // Configure oscillator
    oscillator.type = waveform;
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    
    // Configure gain (volume)
    gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
    
    // Connect nodes
    oscillator.connect(gainNode);
    gainNode.connect(analyzer);
    
    // Start playing
    oscillator.start();
    
    // Store references
    oscillatorRef.current = oscillator;
    gainNodeRef.current = gainNode;
    
    setIsPlaying(true);
    setCurrentFrequency(frequency);

    // Stop after duration if specified
    if (duration) {
      setTimeout(() => {
        stopTone();
      }, duration);
    }

    // Handle oscillator end
    oscillator.onended = () => {
      setIsPlaying(false);
    };

  }, [audioContext, analyzer, waveform, volume, currentFrequency]);

  // Stop the current tone
  const stopTone = useCallback(() => {
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current = null;
      gainNodeRef.current = null;
      setIsPlaying(false);
    }
  }, []);

  // Play a chord (multiple frequencies)
  const playChord = useCallback((frequencies, duration = 2000) => {
    if (!audioContext || !analyzer) return;

    const oscillators = frequencies.map(freq => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.type = waveform;
      oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
      gainNode.gain.setValueAtTime(volume / frequencies.length, audioContext.currentTime);
      
      oscillator.connect(gainNode);
      gainNode.connect(analyzer);
      
      oscillator.start();
      
      return oscillator;
    });

    setIsPlaying(true);
    
    // Stop all oscillators after duration
    setTimeout(() => {
      oscillators.forEach(osc => osc.stop());
      setIsPlaying(false);
    }, duration);

  }, [audioContext, analyzer, waveform, volume]);

  // Get frequency data for visualization
  const getFrequencyData = useCallback(() => {
    if (!analyzer || !frequencyDataRef.current) return null;
    
    analyzer.getByteFrequencyData(frequencyDataRef.current);
    return frequencyDataRef.current;
  }, [analyzer]);

  // Note frequency mapping (A4 = 440 Hz)
  const noteFrequencies = {
    'C': 261.63,
    'C#': 277.18,
    'D': 293.66,
    'D#': 311.13,
    'E': 329.63,
    'F': 349.23,
    'F#': 369.99,
    'G': 392.00,
    'G#': 415.30,
    'A': 440.00,
    'A#': 466.16,
    'B': 493.88
  };

  // Calculate note from frequency
  const getNote = useCallback((frequency) => {
    const A4 = 440;
    const semitoneRatio = Math.pow(2, 1/12);
    const noteNames = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
    
    const semitonesFromA4 = Math.round(12 * Math.log2(frequency / A4));
    const noteIndex = ((semitonesFromA4 % 12) + 12) % 12;
    const octave = Math.floor(semitonesFromA4 / 12) + 4;
    
    return `${noteNames[noteIndex]}${octave}`;
  }, []);

  // Mathematical intervals
  const intervals = {
    unison: 1,
    minorSecond: 16/15,
    majorSecond: 9/8,
    minorThird: 6/5,
    majorThird: 5/4,
    perfectFourth: 4/3,
    tritone: Math.sqrt(2),
    perfectFifth: 3/2,
    minorSixth: 8/5,
    majorSixth: 5/3,
    minorSeventh: 16/9,
    majorSeventh: 15/8,
    octave: 2
  };

  // Resume audio context (required for user interaction)
  const resumeAudio = useCallback(() => {
    if (audioContext && audioContext.state === 'suspended') {
      audioContext.resume();
    }
  }, [audioContext]);

  return {
    audioContext,
    analyzer,
    isPlaying,
    currentFrequency,
    waveform,
    volume,
    playTone,
    stopTone,
    playChord,
    getFrequencyData,
    noteFrequencies,
    getNote,
    intervals,
    setWaveform,
    setVolume,
    resumeAudio
  };
};

export default useAudio;