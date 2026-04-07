import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  isSameDay,
  isSameMonth,
  isWeekend,
  startOfMonth,
  startOfWeek
} from 'date-fns';
import { formatDateKey } from '@/lib/date-format';
import type { CalendarDay, MockEvent, RangeSummary } from '@/types';

export function createMonthGrid(monthDate: Date, events: MockEvent[], today = new Date()) {
  const intervalStart = startOfWeek(startOfMonth(monthDate), { weekStartsOn: 0 });
  const intervalEnd = endOfWeek(endOfMonth(monthDate), { weekStartsOn: 0 });

  return eachDayOfInterval({ start: intervalStart, end: intervalEnd }).map((date) => {
    const dateKey = formatDateKey(date);

    return {
      date,
      dateKey,
      label: String(date.getDate()),
      inCurrentMonth: isSameMonth(date, monthDate),
      isToday: isSameDay(date, today),
      isWeekend: isWeekend(date),
      events: events.filter((event) => event.dateKey === dateKey)
    } satisfies CalendarDay;
  });
}

export function createStableDate(dateKey: string) {
  return new Date(`${dateKey}T00:00:00`);
}

export function sortRangeDates(startKey: string, endKey: string) {
  return startKey <= endKey ? [startKey, endKey] : [endKey, startKey];
}

export function getRangeDays(startKey: string, endKey: string) {
  const [normalizedStart, normalizedEnd] = sortRangeDates(startKey, endKey);

  return eachDayOfInterval({
    start: createStableDate(normalizedStart),
    end: createStableDate(normalizedEnd)
  }).map((date) => formatDateKey(date));
}

export function countWeekendDays(startKey: string, endKey: string) {
  return getRangeDays(startKey, endKey).reduce((count, dateKey) => {
    return isWeekend(createStableDate(dateKey)) ? count + 1 : count;
  }, 0);
}

export function summarizeRange(start: string | null, end: string | null, todayKey: string): RangeSummary {
  if (!start) {
    return {
      start: null,
      end: null,
      totalDays: 0,
      weekendDays: 0,
      includesToday: false
    };
  }

  if (!end) {
    return {
      start,
      end: null,
      totalDays: 1,
      weekendDays: isWeekend(createStableDate(start)) ? 1 : 0,
      includesToday: start === todayKey
    };
  }

  const [normalizedStart, normalizedEnd] = sortRangeDates(start, end);
  const rangeDays = getRangeDays(normalizedStart, normalizedEnd);

  return {
    start: normalizedStart,
    end: normalizedEnd,
    totalDays: rangeDays.length,
    weekendDays: countWeekendDays(normalizedStart, normalizedEnd),
    includesToday: rangeDays.includes(todayKey)
  };
}
