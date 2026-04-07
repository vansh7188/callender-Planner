import { format } from 'date-fns';

export function formatDateKey(date: Date) {
  return format(date, 'yyyy-MM-dd');
}

export function formatMonthKey(date: Date) {
  return format(date, 'yyyy-MM');
}

export function formatMonthLabel(date: Date) {
  return format(date, 'MMMM yyyy');
}

export function formatShortDate(date: Date) {
  return format(date, 'MMM d, yyyy');
}

export function formatRangeKey(start: string, end: string) {
  return `${start}|${end}`;
}

export function displayDateFromKey(dateKey: string) {
  return format(new Date(`${dateKey}T00:00:00`), 'EEE, MMM d');
}
