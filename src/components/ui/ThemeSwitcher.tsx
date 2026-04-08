"use client";

import { motion } from 'framer-motion';
import type { ThemeDefinition, ThemeId } from '@/types';
import { joinClasses } from '@/lib/classes';

interface ThemeSwitcherProps {
  themes: ThemeDefinition[];
  activeThemeId: ThemeId;
  onChange: (themeId: ThemeId) => void;
}

export function ThemeSwitcher({ themes, activeThemeId, onChange }: ThemeSwitcherProps) {
  return (
    <div className="flex max-w-full flex-nowrap gap-2 overflow-x-auto rounded-full border border-white/50 bg-white/70 p-1 shadow-sm backdrop-blur-md sm:flex-wrap sm:overflow-visible">
      {themes.map((theme) => {
        const active = theme.id === activeThemeId;

        return (
          <button
            key={theme.id}
            type="button"
            aria-pressed={active}
            aria-label={`Switch to ${theme.name} theme`}
            onClick={() => onChange(theme.id)}
            className={joinClasses(
              'relative flex-shrink-0 overflow-hidden rounded-full px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-all duration-200',
              active ? 'text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            )}
            style={{ backgroundColor: active ? theme.accent : 'transparent' }}
          >
            {active ? (
              <motion.span
                layoutId="active-theme-pill"
                className="absolute inset-0 rounded-full"
                style={{ background: theme.accent }}
                transition={{ type: 'spring', stiffness: 320, damping: 26 }}
              />
            ) : null}
            <span className="relative z-10">{theme.name}</span>
          </button>
        );
      })}
    </div>
  );
}
