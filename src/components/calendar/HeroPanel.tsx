"use client";

import { motion } from 'framer-motion';
import { CalendarRange, Star } from 'lucide-react';
import { formatMonthLabel } from '@/lib/date-format';
import type { RangeSummary, ThemeDefinition } from '@/types';
import { joinClasses } from '@/lib/classes';

interface HeroPanelProps {
  theme: ThemeDefinition;
  monthDate: Date;
  selectionSummary: RangeSummary;
  monthNoteCount: number;
  rangeNoteCount: number;
  selectedRangeLabel: string;
}

export function HeroPanel({
  theme,
  monthDate,
  selectionSummary,
  monthNoteCount,
  rangeNoteCount,
  selectedRangeLabel
}: HeroPanelProps) {
  const monthLabel = formatMonthLabel(monthDate);

  return (
    <section className="relative overflow-hidden rounded-2xl border border-white/55 bg-white/70 shadow-soft backdrop-blur-md">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${theme.heroImage})` }}
        aria-hidden="true"
      />
      {/* Enhanced gradient for better text contrast */}
      <div className={joinClasses('absolute inset-0', theme.heroGradient)} aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.35),transparent_50%)]" aria-hidden="true" />

      {/* Premium frame decoration */}
      <div className="absolute left-3 right-3 top-3 flex justify-between opacity-65 sm:left-5 sm:right-5 sm:top-4">
        <span className="h-3.5 w-3.5 rounded-full border border-white/50 bg-white/60 shadow-pristine" />
        <span className="h-3.5 w-3.5 rounded-full border border-white/50 bg-white/60 shadow-pristine" />
        <span className="h-3.5 w-3.5 rounded-full border border-white/50 bg-white/60 shadow-pristine" />
      </div>

      <div className="relative flex min-h-[11rem] flex-col justify-between p-4 text-white sm:min-h-[13.25rem] sm:p-6">
        {/* Theme badge */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.24, delay: 0.05 }}
          className="inline-flex w-fit"
        >
          <span className="rounded-full border border-white/25 bg-white/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/90 shadow-sm backdrop-blur-md">
            {theme.name}
          </span>
        </motion.div>

        {/* Title section */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, delay: 0.1 }}
          className="max-w-lg"
        >
          <h2 className="text-display text-[1.85rem] font-bold leading-tight sm:text-[2.7rem]">{monthLabel}</h2>
          <p className="mt-2 text-[11px] font-medium leading-relaxed text-white/80 sm:text-sm">{theme.heroCaption}</p>
        </motion.div>

        {/* Stat cards with glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, delay: 0.15 }}
          className="mt-2 grid gap-2 sm:grid-cols-3"
        >
          <StatCard label="Selected days" value={selectionSummary.totalDays || 0} accent={theme.accentSoft} />
          <StatCard label="Month notes" value={monthNoteCount} accent={theme.accentStrong} />
          <StatCard label="Range notes" value={rangeNoteCount} accent={theme.accentGlow} />
        </motion.div>

        {/* Selected range card */}
        <motion.div
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.32, ease: 'easeOut', delay: 0.2 }}
          className="mt-3 rounded-xl border border-white/20 bg-white/10 p-3 shadow-ring backdrop-blur-xl"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-white/70">Selected range</p>
              <p className="mt-1 text-sm font-medium leading-relaxed text-white/95">{selectedRangeLabel}</p>
            </div>
            <CalendarRange className="h-5 w-5 text-white/90 mt-0.5" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function StatCard({ label, value, accent }: { label: string; value: number; accent: string }) {
  return (
    <motion.div
      whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(15, 23, 42, 0.15)' }}
      transition={{ duration: 0.2 }}
      className="rounded-xl border border-white/15 bg-white/10 p-3 shadow-sm backdrop-blur-xl transition-all"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-white/70 sm:text-[11px]">{label}</span>
        <Star className="h-3.5 w-3.5" style={{ color: accent }} />
      </div>
      <p className="mt-1.5 text-lg font-bold text-white sm:text-xl">{value}</p>
    </motion.div>
  );
}
