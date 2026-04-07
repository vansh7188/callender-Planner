"use client";

import { useEffect, useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const storedValue = window.localStorage.getItem(key);
      if (storedValue !== null) {
        setValue(JSON.parse(storedValue) as T);
      }
    } catch {
      setValue(initialValue);
    } finally {
      setHydrated(true);
    }
  }, [initialValue, key]);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Ignore storage failures and keep the in-memory state usable.
    }
  }, [hydrated, key, value]);

  return [value, setValue, hydrated] as const;
}
