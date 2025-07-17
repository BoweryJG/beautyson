import React from 'react';
import useLocalStorage from './useLocalStorage';

// Hook for managing user progress and achievements
const useProgress = () => {
  const [progress, setProgress] = useLocalStorage('beautyson-progress', {
    intervalTrainer: {
      scores: [],
      currentLevel: 'beginner',
      totalCorrect: 0,
      totalAttempts: 0,
      achievements: [],
      streaks: {
        current: 0,
        best: 0
      }
    },
    compositions: [],
    lastSession: null,
    totalPlayTime: 0,
    preferences: {
      selectedKey: 'C',
      difficulty: 'beginner',
      autoSave: true
    }
  });

  // Update interval trainer progress
  const updateIntervalProgress = (score) => {
    setProgress(prev => {
      const newProgress = { ...prev };
      const trainer = newProgress.intervalTrainer;
      
      // Add new score
      trainer.scores.push({
        score,
        timestamp: Date.now(),
        level: trainer.currentLevel
      });
      
      // Update totals
      trainer.totalCorrect += score.correct;
      trainer.totalAttempts += score.total;
      
      // Update streaks
      if (score.correct === score.total) {
        trainer.streaks.current += 1;
        trainer.streaks.best = Math.max(trainer.streaks.best, trainer.streaks.current);
      } else {
        trainer.streaks.current = 0;
      }
      
      // Check for achievements
      const newAchievements = checkAchievements(trainer);
      trainer.achievements = [...new Set([...trainer.achievements, ...newAchievements])];
      
      // Level progression
      const accuracy = trainer.totalCorrect / trainer.totalAttempts;
      if (accuracy >= 0.8 && trainer.totalAttempts >= 20) {
        if (trainer.currentLevel === 'beginner') trainer.currentLevel = 'intermediate';
        else if (trainer.currentLevel === 'intermediate') trainer.currentLevel = 'advanced';
      }
      
      return newProgress;
    });
  };

  // Save composition
  const saveComposition = (composition) => {
    setProgress(prev => ({
      ...prev,
      compositions: [
        ...prev.compositions,
        {
          id: Date.now(),
          content: composition.content,
          title: composition.title || 'Untitled Composition',
          form: composition.form || 'free',
          timestamp: Date.now(),
          lastModified: Date.now()
        }
      ]
    }));
  };

  // Update existing composition
  const updateComposition = (id, updates) => {
    setProgress(prev => ({
      ...prev,
      compositions: prev.compositions.map(comp =>
        comp.id === id 
          ? { ...comp, ...updates, lastModified: Date.now() }
          : comp
      )
    }));
  };

  // Delete composition
  const deleteComposition = (id) => {
    setProgress(prev => ({
      ...prev,
      compositions: prev.compositions.filter(comp => comp.id !== id)
    }));
  };

  // Update preferences
  const updatePreferences = (newPreferences) => {
    setProgress(prev => ({
      ...prev,
      preferences: { ...prev.preferences, ...newPreferences }
    }));
  };

  // Update session info
  const updateSession = () => {
    setProgress(prev => ({
      ...prev,
      lastSession: Date.now()
    }));
  };

  // Check for achievements
  const checkAchievements = (trainer) => {
    const achievements = [];
    const accuracy = trainer.totalCorrect / trainer.totalAttempts;
    
    if (trainer.totalAttempts >= 10 && accuracy >= 0.9) {
      achievements.push('Perfect Pitch Apprentice');
    }
    
    if (trainer.totalAttempts >= 50 && accuracy >= 0.85) {
      achievements.push('Interval Master');
    }
    
    if (trainer.streaks.best >= 10) {
      achievements.push('Streak Champion');
    }
    
    if (trainer.totalCorrect >= 100) {
      achievements.push('Century Club');
    }
    
    if (trainer.currentLevel === 'advanced') {
      achievements.push('Musical Mathematician');
    }
    
    return achievements;
  };

  // Get statistics
  const getStats = () => {
    const trainer = progress.intervalTrainer;
    const accuracy = trainer.totalAttempts > 0 
      ? Math.round((trainer.totalCorrect / trainer.totalAttempts) * 100)
      : 0;
    
    return {
      totalSessions: trainer.scores.length,
      overallAccuracy: accuracy,
      currentLevel: trainer.currentLevel,
      achievements: trainer.achievements,
      bestStreak: trainer.streaks.best,
      currentStreak: trainer.streaks.current,
      totalCompositions: progress.compositions.length,
      lastSession: progress.lastSession
    };
  };

  // Export progress data
  const exportProgress = () => {
    const dataStr = JSON.stringify(progress, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `beautyson-progress-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  // Clear all progress
  const clearProgress = () => {
    setProgress({
      intervalTrainer: {
        scores: [],
        currentLevel: 'beginner',
        totalCorrect: 0,
        totalAttempts: 0,
        achievements: [],
        streaks: { current: 0, best: 0 }
      },
      compositions: [],
      lastSession: null,
      totalPlayTime: 0,
      preferences: {
        selectedKey: 'C',
        difficulty: 'beginner',
        autoSave: true
      }
    });
  };

  return {
    progress,
    updateIntervalProgress,
    saveComposition,
    updateComposition,
    deleteComposition,
    updatePreferences,
    updateSession,
    getStats,
    exportProgress,
    clearProgress
  };
};

export default useProgress;