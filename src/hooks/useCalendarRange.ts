"use client";

import { useMemo, useState } from 'react';
import { formatDateKey } from '@/lib/date-format';
import { summarizeRange } from '@/lib/calendar';
import type { CalendarRange, RangeSummary } from '@/types';

export function useCalendarRange(today = new Date()) {
  const todayKey = formatDateKey(today);
  const [range, setRange] = useState<CalendarRange>({ start: null, end: null });
  const [focusedDateKey, setFocusedDateKey] = useState(todayKey);

  const summary = useMemo<RangeSummary>(() => {
    return summarizeRange(range.start, range.end, todayKey);
  }, [range.end, range.start, todayKey]);

  const selectDate = (dateKey: string) => {
    setFocusedDateKey(dateKey);

    setRange((currentRange) => {
      if (!currentRange.start || (currentRange.start && currentRange.end)) {
        return { start: dateKey, end: null };
      }

      if (currentRange.start === dateKey) {
        return { start: dateKey, end: null };
      }

      if (dateKey < currentRange.start) {
        return { start: dateKey, end: currentRange.start };
      }

      return { start: currentRange.start, end: dateKey };
    });
  };

  const clearSelection = () => {
    setRange({ start: null, end: null });
  };

  return {
    range,
    summary,
    focusedDateKey,
    setFocusedDateKey,
    selectDate,
    clearSelection,
    todayKey
  };
}
