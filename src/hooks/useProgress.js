import { useState, useCallback } from 'react';

const STORAGE_KEY = 'ccq_progress';

const loadProgress = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : { completed: [1], current: 1 };
  } catch {
    return { completed: [1], current: 1 };
  }
};

export function useProgress() {
  const [progress, setProgress] = useState(loadProgress);

  const completeChapter = useCallback((chapterId) => {
    setProgress((prev) => {
      const completed = prev.completed.includes(chapterId)
        ? prev.completed
        : [...prev.completed, chapterId];
      const next = Math.min(chapterId + 1, 7);
      const updated = {
        completed,
        current: Math.max(prev.current, next),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const isUnlocked = useCallback(
    (chapterId) => {
      return chapterId === 1 || progress.completed.includes(chapterId - 1);
    },
    [progress.completed]
  );

  const isCompleted = useCallback(
    (chapterId) => progress.completed.includes(chapterId),
    [progress.completed]
  );

  const resetProgress = useCallback(() => {
    const reset = { completed: [1], current: 1 };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reset));
    setProgress(reset);
  }, []);

  return {
    progress,
    completeChapter,
    isUnlocked,
    isCompleted,
    resetProgress,
    completedCount: progress.completed.length,
    totalCount: 7,
  };
}
