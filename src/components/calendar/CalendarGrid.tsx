"use client";

import { motion } from 'framer-motion';
import { DayCell } from '@/components/calendar/DayCell';
import type { CalendarDay, ThemeDefinition } from '@/types';

interface CalendarGridProps {
  monthLabel: string;
  days: CalendarDay[];
  theme: ThemeDefinition;
  focusedDateKey: string;
  rangeStart: string | null;
  rangeEnd: string | null;
  onSelectDate: (dateKey: string) => void;
  onFocusDate: (dateKey: string) => void;
  onNavigateFocus: (event: React.KeyboardEvent<HTMLButtonElement>, dateKey: string) => void;
}

const weekdayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function CalendarGrid({
  monthLabel,
  days,
  theme,
  focusedDateKey,
  rangeStart,
  rangeEnd,
  onSelectDate,
  onFocusDate,
  onNavigateFocus
}: CalendarGridProps) {
  return (
    <section className="rounded-2xl border border-white/55 bg-white/80 p-5 shadow-soft backdrop-blur-lg sm:p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.24 }}
        className="mb-4 flex items-center justify-between border-b border-white/50 pb-3"
      >
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Month</p>
          <p className="mt-1 text-base font-semibold text-slate-700 sm:text-lg">{monthLabel}</p>
        </div>
        <motion.span
          whileHover={{ scale: 1.05, rotate: 2 }}
          className="rounded-full px-3 py-1 text-[11px] font-bold text-white shadow-sm"
          style={{ backgroundColor: theme.accent }}
        >
          6 wk
        </motion.span>
      </motion.div>

      {/* Weekday headers */}
      <div className="mb-2.5 grid grid-cols-7 gap-2 px-0.5 text-center text-[11px] font-bold uppercase tracking-wider text-slate-500 sm:gap-2.5">
        {weekdayLabels.map((weekday) => (
          <div key={weekday} className="py-1.5 font-semibold">
            {weekday}
          </div>
        ))}
      </div>

      {/* Calendar days grid */}
      <motion.div
        key={monthLabel}
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -16 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
        className="grid grid-cols-7 gap-1.5 sm:gap-2"
      >
        {days.map((day) => {
          const isSelectedStart = Boolean(rangeStart && day.dateKey === rangeStart);
          const isSelectedEnd = Boolean(rangeEnd && day.dateKey === rangeEnd);
          const isInRange = Boolean(rangeStart && rangeEnd && day.dateKey >= rangeStart && day.dateKey <= rangeEnd);

          return (
            <DayCell
              key={day.dateKey}
              day={day}
              theme={theme}
              isSelectedStart={isSelectedStart}
              isSelectedEnd={isSelectedEnd}
              isInRange={isInRange}
              isFocused={focusedDateKey === day.dateKey}
              onClick={onSelectDate}
              onFocus={onFocusDate}
              onKeyDown={onNavigateFocus}
            />
          );
        })}
      </motion.div>
    </section>
  );
}
