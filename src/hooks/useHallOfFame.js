import { useState, useCallback } from 'react';

const STORAGE_KEY = 'ccq_hall_of_fame';

const loadNames = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export function useHallOfFame() {
  const [entries, setEntries] = useState(loadNames);

  const addEntry = useCallback((name) => {
    const trimmed = name.trim();
    if (!trimmed) return false;

    setEntries((prev) => {
      const updated = [...prev, { name: trimmed, addedAt: new Date().toISOString() }];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
    return true;
  }, []);

  const removeEntry = useCallback((index) => {
    setEntries((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  return { entries, addEntry, removeEntry };
}
