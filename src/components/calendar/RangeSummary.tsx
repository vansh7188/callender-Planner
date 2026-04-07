"use client";

import { motion } from 'framer-motion';
import { BadgeCheck, CalendarDays, Flame, History, MoonStar } from 'lucide-react';
import type { RangeSummary, ThemeDefinition } from '@/types';

interface RangeSummaryProps {
  summary: RangeSummary;
  theme: ThemeDefinition;
}

function Pill({ icon, label, value, accent }: { icon: React.ReactNode; label: string; value: string; accent?: string }) {
  return (
    <motion.div
      whileHover={{ y: -2, boxShadow: 'var(--shadow-hover)' }}
      transition={{ duration: 0.2 }}
      className="flex items-center gap-2.5 rounded-xl border border-white/40 bg-white/82 px-3.5 py-2.5 shadow-pristine backdrop-blur-sm transition-all hover:shadow-soft"
    >
      <motion.span
        whileHover={{ scale: 1.1 }}
        className="rounded-full bg-slate-900/5 p-2 text-slate-700"
        style={accent ? { backgroundColor: `${accent}15` } : undefined}
      >
        {icon}
      </motion.span>
      <div>
        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">{label}</p>
        <p className="mt-0.5 text-sm font-semibold text-slate-900">{value}</p>
      </div>
    </motion.div>
  );
}

export function RangeSummaryPanel({ summary, theme }: RangeSummaryProps) {
  const isEmpty = summary.totalDays === 0;

  return (
    <section className="rounded-2xl border border-white/50 bg-white/72 p-4 shadow-pristine backdrop-blur-lg sm:p-4.5">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.24 }}
        className="mb-3 flex items-center justify-between gap-3 border-b border-white/50 pb-3"
      >
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Selection</p>
        </div>
        <motion.span
          whileHover={{ scale: 1.05, rotate: 2 }}
          className="rounded-full px-3 py-1 text-[11px] font-bold text-white shadow-soft"
          style={{ backgroundColor: theme.accent }}
        >
          {isEmpty ? '—' : `${summary.totalDays}d`}
        </motion.span>
      </motion.div>

      {/* Stat pills grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.05, delayChildren: 0.1 }}
        className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-4"
      >
        {[
          {
            icon: <CalendarDays className="h-4 w-4" />,
            label: 'Days',
            value: isEmpty ? '0' : String(summary.totalDays)
          },
          {
            icon: <Flame className="h-4 w-4" />,
            label: 'Weekend',
            value: isEmpty ? '0' : String(summary.weekendDays)
          },
          {
            icon: <BadgeCheck className="h-4 w-4" />,
            label: 'Today',
            value: summary.includesToday ? 'Yes' : 'No'
          },
          {
            icon: <History className="h-4 w-4" />,
            label: 'State',
            value: summary.start && summary.end ? 'Complete' : summary.start ? 'Pending' : 'Idle'
          }
        ].map((pill, index) => (
          <motion.div
            key={pill.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Pill {...pill} accent={theme.accent} />
          </motion.div>
        ))}
      </motion.div>

      {/* Helper box */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="mt-3 rounded-xl border border-dashed border-slate-200 bg-slate-50/70 p-3"
      >
        <div className="flex items-start gap-3 text-sm">
          <MoonStar className="h-4 w-4 mt-0.5" style={{ color: theme.accent }} />
          <p className="text-xs font-medium leading-relaxed text-slate-600">
            {isEmpty
              ? 'Pick a start and end date to create a range.'
              : summary.end
                ? `Your ${summary.totalDays}-day range is ready to save as a note.`
                : 'Pick an end date to complete your selection range.'}
          </p>
        </div>
      </motion.div>
    </section>
  );
}
