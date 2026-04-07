"use client";

import { motion } from 'framer-motion';
import { CalendarCheck2, CalendarX2, Trash2, WandSparkles } from 'lucide-react';
import { joinClasses } from '@/lib/classes';

interface QuickActionsProps {
  onClearSelection: () => void;
  onJumpToToday: () => void;
  onComposeRangeNote: () => void;
  onClearAllNotes: () => void;
  compact?: boolean;
}

function ActionButton({
  icon,
  label,
  onClick,
  destructive = false
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  destructive?: boolean;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -2, boxShadow: 'var(--shadow-hover)' }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.2 }}
      className={joinClasses(
        'group inline-flex items-center gap-2.5 rounded-full px-4 py-2.5 text-sm font-semibold shadow-pristine transition-all duration-200',
        destructive
          ? 'border border-rose-200 bg-rose-50/90 text-rose-700 hover:bg-rose-100 hover:border-rose-300 backdrop-blur-sm'
          : 'border border-white/40 bg-white/85 text-slate-700 hover:bg-white hover:border-white/60 backdrop-blur-sm'
      )}
    >
      <motion.span
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ duration: 0.2 }}
        className={joinClasses('transition-colors duration-200', destructive && 'text-rose-600')}
      >
        {icon}
      </motion.span>
      <span>{label}</span>
    </motion.button>
  );
}

export function QuickActions({
  onClearSelection,
  onJumpToToday,
  onComposeRangeNote,
  onClearAllNotes,
  compact = false
}: QuickActionsProps) {
  const wrapper = compact
    ? 'fixed inset-x-0 bottom-0 z-50 border-t border-white/50 bg-white/92 px-4 py-3.5 backdrop-blur-xl md:hidden'
    : 'grid gap-2.5 sm:grid-cols-2';

  return (
    <div className={wrapper}>
      <motion.div
        initial={compact ? { opacity: 0, y: 16 } : undefined}
        animate={compact ? { opacity: 1, y: 0 } : undefined}
        transition={compact ? { duration: 0.3, ease: 'easeOut' } : undefined}
        className={joinClasses('flex flex-wrap gap-2', compact && 'mx-auto max-w-2xl justify-between', !compact && 'contents')}
      >
        <ActionButton icon={<CalendarX2 className="h-4 w-4" />} label="Clear" onClick={onClearSelection} />
        <ActionButton icon={<CalendarCheck2 className="h-4 w-4" />} label="Jump to today" onClick={onJumpToToday} />
        <ActionButton icon={<WandSparkles className="h-4 w-4" />} label="Save range note" onClick={onComposeRangeNote} />
        <ActionButton icon={<Trash2 className="h-4 w-4" />} label="Clear all" onClick={onClearAllNotes} destructive />
      </motion.div>
    </div>
  );
}
