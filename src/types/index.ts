export type ThemeId = 'mountain-blue' | 'sunset-amber' | 'forest-green';

export interface ThemeDefinition {
  id: ThemeId;
  name: string;
  subtitle: string;
  accent: string;
  accentSoft: string;
  accentStrong: string;
  accentGlow: string;
  surfaceTint: string;
  heroImage: string;
  heroGradient: string;
  heroCaption: string;
}

export interface MockEvent {
  id: string;
  dateKey: string;
  title: string;
  detail: string;
  tone: 'info' | 'warning' | 'success';
  marker: string;
}

export interface CalendarDay {
  date: Date;
  dateKey: string;
  label: string;
  inCurrentMonth: boolean;
  isToday: boolean;
  isWeekend: boolean;
  events: MockEvent[];
}

export interface CalendarRange {
  start: string | null;
  end: string | null;
}

export interface RangeSummary {
  start: string | null;
  end: string | null;
  totalDays: number;
  weekendDays: number;
  includesToday: boolean;
}

export interface NoteEntry {
  id: string;
  title: string;
  body: string;
  kind: 'monthly' | 'range';
  monthKey?: string;
  rangeKey?: string;
  rangeStart?: string;
  rangeEnd?: string;
  pinned?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NoteDraft {
  title: string;
  body: string;
  kind: 'monthly' | 'range';
  monthKey: string;
  rangeKey: string;
  rangeStart: string;
  rangeEnd: string;
}
