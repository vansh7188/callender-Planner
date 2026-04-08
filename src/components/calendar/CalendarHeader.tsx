"use client";

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { joinClasses } from '@/lib/classes';
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher';
import type { ThemeDefinition, ThemeId } from '@/types';

interface CalendarHeaderProps {
  title: string;
  subtitle: string;
  themes: ThemeDefinition[];
  activeThemeId: ThemeId;
  onThemeChange: (themeId: ThemeId) => void;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  accent: string;
}

export function CalendarHeader({
  title,
  subtitle,
  themes,
  activeThemeId,
  onThemeChange,
  onPreviousMonth,
  onNextMonth,
  accent
}: CalendarHeaderProps) {
  return (
    <header className="rounded-2xl border border-white/50 bg-white/75 p-4 shadow-soft backdrop-blur-lg sm:p-6 sm:p-7">
      {/* Main title section */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28 }}
        className="mb-5 flex flex-col gap-4 border-b border-white/50 pb-5 lg:flex-row lg:items-end lg:justify-between"
      >
        <div className="flex-1">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.05 }}
            className="mb-3 inline-flex items-center gap-2.5 rounded-full border border-white/50 bg-white/80 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-600 shadow-pristine"
          >
            <Sparkles className="h-4 w-4" style={{ color: accent }} />
            Wall Calendar Planner
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-display text-3xl font-bold text-slate-900 sm:text-5xl"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="mt-2 max-w-2xl text-sm font-medium text-slate-600 sm:text-base leading-relaxed"
          >
            {subtitle}
          </motion.p>
        </div>

        {/* Navigation buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.08 }}
          className="flex items-center gap-2 self-start sm:self-auto"
        >
          <motion.button
            type="button"
            onClick={onPreviousMonth}
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.94 }}
            aria-label="Go to previous month"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-white/80 text-slate-700 shadow-pristine transition-all hover:border-white/60 hover:bg-white hover:shadow-soft backdrop-blur-sm"
          >
            <ChevronLeft className="h-5 w-5" />
          </motion.button>
          <motion.button
            type="button"
            onClick={onNextMonth}
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.94 }}
            aria-label="Go to next month"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-white/80 text-slate-700 shadow-pristine transition-all hover:border-white/60 hover:bg-white hover:shadow-soft backdrop-blur-sm"
          >
            <ChevronRight className="h-5 w-5" />
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Bottom section: Theme switcher and info */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between"
      >
        <ThemeSwitcher themes={themes} activeThemeId={activeThemeId} onChange={onThemeChange} />

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="rounded-full border border-white/40 bg-white/60 px-4 py-2 text-[11px] font-semibold text-slate-600 shadow-pristine backdrop-blur-sm sm:text-xs"
        >
          Keyboard ready · Range selection
        </motion.div>
      </motion.div>
    </header>
  );
}
