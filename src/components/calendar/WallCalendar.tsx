"use client";

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { addMonths, startOfMonth } from 'date-fns';
import { CalendarHeader } from '@/components/calendar/CalendarHeader';
import { HeroPanel } from '@/components/calendar/HeroPanel';
import { CalendarGrid } from '@/components/calendar/CalendarGrid';
import { RangeSummaryPanel } from '@/components/calendar/RangeSummary';
import { NotesPanel } from '@/components/notes/NotesPanel';
import { QuickActions } from '@/components/ui/QuickActions';
import { Card } from '@/components/layout/Card';
import { formatDateKey, formatMonthKey, formatMonthLabel, formatRangeKey } from '@/lib/date-format';
import { createMonthGrid } from '@/lib/calendar';
import { getMockEvents } from '@/lib/mock-events';
import { useCalendarRange } from '@/hooks/useCalendarRange';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import type { NoteDraft, NoteEntry, ThemeDefinition, ThemeId } from '@/types';
import { displayDateFromKey } from '@/lib/date-format';

const themes: ThemeDefinition[] = [
  {
    id: 'mountain-blue',
    name: 'Mountain Blue',
    subtitle: 'Cool alpine air with crisp, quiet focus.',
    accent: '#3c6df0',
    accentSoft: '#93b5ff',
    accentStrong: '#2450d4',
    accentGlow: '#bfd0ff',
    surfaceTint: 'rgba(60, 109, 240, 0.12)',
    heroImage: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=80',
    heroGradient: 'bg-gradient-to-br from-slate-900/10 via-blue-900/40 to-cyan-700/35',
    heroCaption: 'An elevated monthly view with glacier-cool clarity.'
  },
  {
    id: 'sunset-amber',
    name: 'Sunset Amber',
    subtitle: 'Warm light, tactile glow, and a softer editorial tone.',
    accent: '#d97328',
    accentSoft: '#f3be89',
    accentStrong: '#b85113',
    accentGlow: '#ffd4a7',
    surfaceTint: 'rgba(217, 115, 40, 0.14)',
    heroImage: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1400&q=80',
    heroGradient: 'bg-gradient-to-br from-orange-950/10 via-amber-800/40 to-rose-700/35',
    heroCaption: 'A warm schedule sheet with magazine-like sunset energy.'
  },
  {
    id: 'forest-green',
    name: 'Forest Green',
    subtitle: 'Grounded and lush with a calmer planning cadence.',
    accent: '#2a7a4a',
    accentSoft: '#93c8a3',
    accentStrong: '#145736',
    accentGlow: '#c7ead0',
    surfaceTint: 'rgba(42, 122, 74, 0.12)',
    heroImage: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1400&q=80',
    heroGradient: 'bg-gradient-to-br from-emerald-950/10 via-green-900/42 to-lime-800/30',
    heroCaption: 'A pine-toned sheet for a planning ritual that feels rooted.'
  }
];

const initialMonthlyNotes: NoteEntry[] = [
  {
    id: 'demo-month-note-1',
    title: 'Portfolio review week',
    body: 'Focus the first half of the month on refinement, transitions, and finishing details.',
    kind: 'monthly',
    monthKey: '2026-04',
    pinned: true,
    createdAt: '2026-04-01T09:00:00.000Z',
    updatedAt: '2026-04-01T09:00:00.000Z'
  },
  {
    id: 'demo-month-note-2',
    title: 'Plan one slow weekend',
    body: 'Leave one weekend largely open to keep the wall-calendar feel human and calm.',
    kind: 'monthly',
    monthKey: '2026-04',
    createdAt: '2026-04-02T10:00:00.000Z',
    updatedAt: '2026-04-03T10:00:00.000Z'
  },
  {
    id: 'demo-range-note-1',
    title: 'Launch prep sprint',
    body: 'Use this block for final design QA, content pass, and stakeholder review.',
    kind: 'range',
    rangeKey: '2026-04-14|2026-04-18',
    rangeStart: '2026-04-14',
    rangeEnd: '2026-04-18',
    createdAt: '2026-04-10T08:30:00.000Z',
    updatedAt: '2026-04-10T08:30:00.000Z'
  }
];

const STORAGE_KEYS = {
  theme: 'wall-calendar-planner:theme',
  notes: 'wall-calendar-planner:notes'
} as const;

const today = new Date();

function createDraft(monthKey: string, kind: 'monthly' | 'range' = 'monthly'): NoteDraft {
  return {
    title: '',
    body: '',
    kind,
    monthKey,
    rangeKey: '',
    rangeStart: '',
    rangeEnd: ''
  };
}

export function WallCalendar() {
  const [activeThemeId, setActiveThemeId] = useLocalStorage<ThemeId>(STORAGE_KEYS.theme, 'mountain-blue');
  const [notes, setNotes] = useLocalStorage<NoteEntry[]>(STORAGE_KEYS.notes, initialMonthlyNotes);
  const [monthDate, setMonthDate] = useState(() => startOfMonth(today));
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [draft, setDraft] = useState<NoteDraft>(() => createDraft(formatMonthKey(today)));

  const { range, summary, focusedDateKey, setFocusedDateKey, selectDate, clearSelection, todayKey } = useCalendarRange(today);
  const theme = themes.find((entry) => entry.id === activeThemeId) ?? themes[0];

  const monthKey = formatMonthKey(monthDate);
  const monthLabel = formatMonthLabel(monthDate);
  const events = useMemo(() => getMockEvents(), []);
  const monthDays = useMemo(() => createMonthGrid(monthDate, events, today), [events, monthDate]);
  const currentMonthNotes = notes.filter((note) => note.kind === 'monthly' && note.monthKey === monthKey);
  const currentRangeNote = notes.find((note) => note.kind === 'range' && note.rangeKey === formatRangeKey(range.start ?? '', range.end ?? ''));
  const selectedRangeLabel = range.start
    ? range.end
      ? `${displayDateFromKey(range.start)} → ${displayDateFromKey(range.end)}`
      : `${displayDateFromKey(range.start)} (pick an end date)`
    : 'No range selected yet';

  useEffect(() => {
    if (editingNoteId) {
      return;
    }

    setDraft((currentDraft) => {
      if (currentDraft.kind === 'monthly') {
        return { ...currentDraft, monthKey };
      }

      if (range.start && range.end) {
        return {
          ...currentDraft,
          kind: 'range',
          rangeKey: formatRangeKey(range.start, range.end),
          rangeStart: range.start,
          rangeEnd: range.end
        };
      }

      return currentDraft;
    });
  }, [editingNoteId, monthKey, range.end, range.start]);

  useEffect(() => {
    if (!range.start) {
      return;
    }

    if (!focusedDateKey) {
      setFocusedDateKey(range.start);
    }
  }, [focusedDateKey, range.start, setFocusedDateKey]);

  const handleMonthShift = (direction: 1 | -1) => {
    setMonthDate((current) => addMonths(current, direction));
    setFocusedDateKey(formatDateKey(addMonths(monthDate, direction)));
  };

  const handleJumpToToday = () => {
    setMonthDate(startOfMonth(today));
    setFocusedDateKey(todayKey);
  };

  const handleSelectDate = (dateKey: string) => {
    selectDate(dateKey);
  };

  const handleNavigateFocus = (event: React.KeyboardEvent<HTMLButtonElement>, dateKey: string) => {
    const currentIndex = monthDays.findIndex((day) => day.dateKey === dateKey);
    if (currentIndex < 0) {
      return;
    }

    const moveBy = (offset: number) => {
      const nextDay = monthDays[currentIndex + offset];
      if (nextDay) {
        event.preventDefault();
        setFocusedDateKey(nextDay.dateKey);
      }
    };

    switch (event.key) {
      case 'ArrowRight':
        moveBy(1);
        break;
      case 'ArrowLeft':
        moveBy(-1);
        break;
      case 'ArrowDown':
        moveBy(7);
        break;
      case 'ArrowUp':
        moveBy(-7);
        break;
      case 'Home':
        event.preventDefault();
        setFocusedDateKey(monthDays[0]?.dateKey ?? dateKey);
        break;
      case 'End':
        event.preventDefault();
        setFocusedDateKey(monthDays[monthDays.length - 1]?.dateKey ?? dateKey);
        break;
      case 'Enter':
      case ' ': {
        event.preventDefault();
        handleSelectDate(dateKey);
        break;
      }
      default:
        break;
    }
  };

  const handleComposeRangeNote = () => {
    if (!range.start || !range.end) {
      return;
    }

    setEditingNoteId(null);
    setDraft({
      title: currentRangeNote?.title ?? 'Range memo',
      body: currentRangeNote?.body ?? '',
      kind: 'range',
      monthKey,
      rangeKey: formatRangeKey(range.start, range.end),
      rangeStart: range.start,
      rangeEnd: range.end
    });
  };

  const handleToggleDraftKind = (kind: 'monthly' | 'range') => {
    setEditingNoteId(null);

    if (kind === 'monthly') {
      setDraft(createDraft(monthKey, 'monthly'));
      return;
    }

    if (range.start && range.end) {
      setDraft({
        title: currentRangeNote?.title ?? 'Range memo',
        body: currentRangeNote?.body ?? '',
        kind: 'range',
        monthKey,
        rangeKey: formatRangeKey(range.start, range.end),
        rangeStart: range.start,
        rangeEnd: range.end
      });
      return;
    }

    setDraft((currentDraft) => ({ ...currentDraft, kind: 'range' }));
  };

  const handleSaveNote = () => {
    const now = new Date().toISOString();

    if (!draft.title.trim() && !draft.body.trim()) {
      return;
    }

    if (draft.kind === 'range' && (!range.start || !range.end)) {
      return;
    }

    setNotes((currentNotes) => {
      const baseNotes = currentNotes.filter((note) => note.id !== editingNoteId);
      const nextNote: NoteEntry = {
        id: editingNoteId ?? `note-${Date.now()}`,
        title: draft.title.trim() || (draft.kind === 'monthly' ? 'Monthly memo' : 'Range memo'),
        body: draft.body.trim(),
        kind: draft.kind,
        monthKey: draft.kind === 'monthly' ? draft.monthKey : undefined,
        rangeKey: draft.kind === 'range' && range.start && range.end ? formatRangeKey(range.start, range.end) : undefined,
        rangeStart: draft.kind === 'range' && range.start ? range.start : undefined,
        rangeEnd: draft.kind === 'range' && range.end ? range.end : undefined,
        pinned: draft.kind === 'monthly' ? currentNotes.some((note) => note.pinned && note.monthKey === draft.monthKey) : undefined,
        createdAt: editingNoteId ? currentNotes.find((note) => note.id === editingNoteId)?.createdAt ?? now : now,
        updatedAt: now
      };

      return [nextNote, ...baseNotes].sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));
    });

    setDraft(createDraft(monthKey, 'monthly'));
    setEditingNoteId(null);
  };

  const handleBeginEdit = (note: NoteEntry) => {
    setEditingNoteId(note.id);
    setDraft({
      title: note.title,
      body: note.body,
      kind: note.kind,
      monthKey: note.monthKey ?? monthKey,
      rangeKey: note.rangeKey ?? '',
      rangeStart: note.rangeStart ?? '',
      rangeEnd: note.rangeEnd ?? ''
    });

    if (note.kind === 'range' && note.rangeStart) {
      setMonthDate(startOfMonth(new Date(`${note.rangeStart}T00:00:00`)));
      setFocusedDateKey(note.rangeStart);
    }
  };

  const handleDeleteNote = (noteId: string) => {
    setNotes((currentNotes) => currentNotes.filter((note) => note.id !== noteId));

    if (editingNoteId === noteId) {
      setEditingNoteId(null);
      setDraft(createDraft(monthKey, 'monthly'));
    }
  };

  const handleClearAllNotes = () => {
    if (window.confirm('Clear all saved notes from this browser?')) {
      setNotes([]);
    }
  };

  const canSaveRange = Boolean(range.start && range.end);

  return (
    <section className="relative flex flex-col gap-5 rounded-[1.75rem] border border-white/55 bg-white/45 p-4 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur-md sm:gap-6 sm:p-5 lg:p-6">
      {/* Decorative elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="absolute left-1/2 top-0 hidden -translate-x-1/2 -translate-y-1/2 gap-6 lg:flex"
      >
        <span className="h-8 w-8 rounded-full border border-white/50 bg-white/80 shadow-pristine" />
        <span className="h-8 w-8 rounded-full border border-white/50 bg-white/80 shadow-pristine" />
      </motion.div>

      {/* Header */}
      <CalendarHeader
        title={monthLabel}
        subtitle={theme.subtitle}
        themes={themes}
        activeThemeId={activeThemeId}
        onThemeChange={setActiveThemeId}
        onPreviousMonth={() => handleMonthShift(-1)}
        onNextMonth={() => handleMonthShift(1)}
        accent={theme.accent}
      />

      {/* Main content grid */}
      <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)] lg:gap-6">
        {/* Left column: Calendar section */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.32, delay: 0.1 }}
          className="flex flex-col gap-4 sm:gap-5"
        >
          {/* Hero panel */}
          <HeroPanel
            theme={theme}
            monthDate={monthDate}
            selectionSummary={summary}
            monthNoteCount={currentMonthNotes.length}
            rangeNoteCount={notes.filter((note) => note.kind === 'range').length}
            selectedRangeLabel={selectedRangeLabel}
          />

          <div className="grid gap-3">
            {/* Calendar grid */}
            <CalendarGrid
              monthLabel={monthLabel}
              days={monthDays}
              theme={theme}
              focusedDateKey={focusedDateKey}
              rangeStart={range.start}
              rangeEnd={range.end}
              onSelectDate={handleSelectDate}
              onFocusDate={setFocusedDateKey}
              onNavigateFocus={handleNavigateFocus}
            />

            {/* Range summary sits directly with calendar for tighter flow */}
            <RangeSummaryPanel summary={summary} theme={theme} />
          </div>
        </motion.div>

        {/* Right column: Memory board and notes */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.32, delay: 0.15 }}
          className="flex flex-col gap-5"
        >
          {/* Memory board card */}
          <Card animated className="p-5 sm:p-6" hover>
            <div className="mb-4 border-b border-white/50 pb-4">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Highlights</p>
              <h3 className="mt-2 text-lg font-bold text-slate-900">Memory board</h3>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <MemoryCard
                label="This month"
                title={currentMonthNotes[0]?.title ?? 'Add a monthly note'}
                body={currentMonthNotes[0]?.body ?? 'Create a monthly note from the editor.'}
                theme={theme}
              />
              <MemoryCard
                label="Selected range"
                title={summary.totalDays ? `${summary.totalDays}d` : 'No range'}
                body={summary.totalDays ? selectedRangeLabel : 'Select a date range above.'}
                theme={theme}
              />
            </div>

            {/* Recent note tags */}
            {notes.length > 0 && (
              <div className="mt-5 border-t border-white/50 pt-4">
                <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">Recent notes</p>
                <div className="flex flex-wrap gap-2">
                  {notes.slice(0, 3).map((note) => (
                    <motion.span
                      key={note.id}
                      whileHover={{ scale: 1.05 }}
                      className="rounded-full border border-slate-200/60 bg-white/80 px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-pristine transition-all hover:shadow-soft"
                    >
                      {note.title}
                    </motion.span>
                  ))}
                </div>
              </div>
            )}
          </Card>

          {/* Quick actions card */}
          <Card animated className="p-5 sm:p-6">
            <p className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-400">Actions</p>
            <QuickActions
              onClearSelection={clearSelection}
              onJumpToToday={handleJumpToToday}
              onComposeRangeNote={handleComposeRangeNote}
              onClearAllNotes={handleClearAllNotes}
            />
          </Card>

          {/* Notes panel */}
          <Card animated={false} className="p-0">
            <NotesPanel
              notes={notes}
              theme={theme}
              monthKey={monthKey}
              selectedRangeKey={formatRangeKey(range.start ?? '', range.end ?? '')}
              rangeSummary={summary}
              selectedRangeLabel={selectedRangeLabel}
              draft={draft}
              editingNoteId={editingNoteId}
              onDraftChange={(patch) => setDraft((current) => ({ ...current, ...patch }))}
              onToggleDraftKind={handleToggleDraftKind}
              onSaveNote={handleSaveNote}
              onBeginEdit={handleBeginEdit}
              onDeleteNote={handleDeleteNote}
              onClearAllNotes={handleClearAllNotes}
              onComposeRangeNote={handleComposeRangeNote}
              canSaveRange={canSaveRange}
            />
          </Card>
        </motion.div>
      </div>

      {/* Mobile quick actions bar */}
      <QuickActions
        compact
        onClearSelection={clearSelection}
        onJumpToToday={handleJumpToToday}
        onComposeRangeNote={handleComposeRangeNote}
        onClearAllNotes={handleClearAllNotes}
      />
    </section>
  );
}

function MemoryCard({ label, title, body, theme }: { label: string; title: string; body: string; theme: ThemeDefinition }) {
  return (
    <motion.article
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="rounded-xl border border-slate-200/60 bg-white/90 p-4 shadow-pristine transition-all hover:shadow-soft backdrop-blur-sm"
    >
      <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{label}</p>
      <h3 className="mt-2.5 text-sm font-bold text-slate-900">{title}</h3>
      <p className="mt-2.5 text-xs leading-6 text-slate-600">{body}</p>
      <div className="mt-3.5 h-1 rounded-full bg-slate-100">
        <motion.span
          initial={{ width: '0%' }}
          animate={{ width: '65%' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="block h-full rounded-full"
          style={{ backgroundColor: theme.accent }}
        />
      </div>
    </motion.article>
  );
}
