"use client";

import { motion } from 'framer-motion';
import { format } from 'date-fns';
import type { CalendarDay, ThemeDefinition } from '@/types';
import { joinClasses } from '@/lib/classes';

interface DayCellProps {
  day: CalendarDay;
  theme: ThemeDefinition;
  isSelectedStart: boolean;
  isSelectedEnd: boolean;
  isInRange: boolean;
  isFocused: boolean;
  onClick: (dateKey: string) => void;
  onFocus: (dateKey: string) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>, dateKey: string) => void;
}

export function DayCell({
  day,
  theme,
  isSelectedStart,
  isSelectedEnd,
  isInRange,
  isFocused,
  onClick,
  onFocus,
  onKeyDown
}: DayCellProps) {
  const eventSummary = day.events.map((event) => event.title).join(', ');
  const ariaLabel = `${day.label}, ${format(day.date, 'MMMM d, yyyy')}${day.isToday ? ', today' : ''}${day.events.length ? `. Events: ${eventSummary}` : ''}`;

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      aria-pressed={isSelectedStart || isSelectedEnd || isInRange}
      onClick={() => onClick(day.dateKey)}
      onFocus={() => onFocus(day.dateKey)}
      onKeyDown={(event) => onKeyDown(event, day.dateKey)}
      className={joinClasses(
        'group relative flex min-h-[5.7rem] flex-col items-start justify-between rounded-2xl border p-3.5 text-left outline-none transition-all duration-300 ease-out hover:shadow-soft active:scale-[0.985] sm:min-h-[6.2rem] sm:p-4',
        day.inCurrentMonth
          ? 'bg-white/85 shadow-pristine hover:-translate-y-0.5'
          : 'bg-white/45 text-slate-400 shadow-none',
        isInRange && 'border-transparent',
        isInRange && !isSelectedStart && !isSelectedEnd && 'rounded-lg sm:rounded-xl',
        isSelectedStart && 'rounded-[1.25rem] text-white shadow-soft-md',
        isSelectedEnd && 'rounded-[1.25rem] text-white shadow-soft-md'
      )}
      style={{
        borderColor: isInRange ? theme.accentSoft : 'rgba(226,232,240,0.7)',
        background: isSelectedStart || isSelectedEnd
          ? `linear-gradient(135deg, ${theme.accent}, ${theme.accentStrong})`
          : isInRange
            ? `linear-gradient(90deg, ${theme.accentSoft}2e, ${theme.accentSoft}20)`
            : undefined,
        boxShadow: isFocused ? `0 0 0 2.5px ${theme.accentSoft}44, 0 12px 32px rgba(15,23,42,0.12)` : undefined
      }}
    >
      {/* Pill-shaped start/end badge */}
      {(isSelectedStart || isSelectedEnd) && (
        <motion.span
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="absolute right-2.5 top-2.5 rounded-full bg-white/20 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white shadow-sm backdrop-blur-md"
        >
          {isSelectedStart ? '●' : '●'}
        </motion.span>
      )}

      {/* Weekday label */}
      <span className={joinClasses(
        'text-xs font-semibold uppercase tracking-wider',
        day.inCurrentMonth ? 'text-slate-500' : 'text-slate-300',
        (isSelectedStart || isSelectedEnd) && 'text-white/90'
      )}>
        {format(day.date, 'EEE')}
      </span>

      {/* Date and status */}
      <div className="w-full">
        <span className={joinClasses('text-xl font-bold', day.inCurrentMonth ? 'text-slate-900' : 'text-slate-400', (isSelectedStart || isSelectedEnd) && 'text-white')}>
          {day.label}
        </span>

        {/* Status badges */}
        {(day.isToday || day.isWeekend) && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {day.isToday && (
              <span className={joinClasses(
                'inline-flex rounded-full text-[9px] font-bold uppercase tracking-wider px-2 py-1',
                isSelectedStart || isSelectedEnd ? 'bg-white/18 text-white' : 'bg-slate-900 text-white'
              )}>Today</span>
            )}
            {day.isWeekend && !day.isToday && (
              <span className="inline-flex rounded-full bg-slate-100 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-slate-500">
                Weekend
              </span>
            )}
          </div>
        )}
      </div>

      {/* Event tags */}
      {day.events.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5 w-full">
          {day.events.slice(0, 2).map((event) => (
            <span
              key={event.id}
              className={joinClasses(
                'inline-flex items-center gap-1 rounded-full px-2 py-1 text-[9px] font-semibold uppercase tracking-wider transition-transform duration-200 group-hover:-translate-y-0.5',
                isSelectedStart || isSelectedEnd ? 'bg-white/16 text-white' : 'bg-slate-100 text-slate-600'
              )}
              title={`${event.title} · ${event.detail}`}
            >
              <span className="h-1 w-1 rounded-full" style={{ backgroundColor: theme.accent }} />
              {event.marker}
            </span>
          ))}
          {day.events.length > 2 && (
            <span className={joinClasses(
              'text-[9px] font-semibold uppercase tracking-wider',
              isSelectedStart || isSelectedEnd ? 'text-white/75' : 'text-slate-500'
            )}>
              +{day.events.length - 2}
            </span>
          )}
        </div>
      )}
    </button>
  );
}
