"use client";

import { format } from 'date-fns';
import { CalendarDays, PencilLine, Pin, Trash2 } from 'lucide-react';
import type { NoteEntry, ThemeDefinition } from '@/types';
import { displayDateFromKey } from '@/lib/date-format';
import { joinClasses } from '@/lib/classes';

interface NoteCardProps {
  note: NoteEntry;
  theme: ThemeDefinition;
  onEdit: (note: NoteEntry) => void;
  onDelete: (noteId: string) => void;
}

export function NoteCard({ note, theme, onEdit, onDelete }: NoteCardProps) {
  return (
    <article className="group rounded-2xl border border-white/40 bg-white/80 p-5 shadow-pristine transition-all duration-200 hover:shadow-soft-md hover:border-white/60 hover:-translate-y-0.5 backdrop-blur-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          {/* Badge and pinned indicator */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span
              className="inline-block rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm"
              style={{ backgroundColor: theme.accent }}
            >
              {note.kind === 'monthly' ? 'Monthly' : 'Range'}
            </span>
            {note.pinned && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-800 shadow-sm">
                <Pin className="h-3 w-3" />
                Pinned
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="mt-4 text-base font-bold text-slate-900 leading-snug">{note.title}</h3>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1.5 opacity-100 transition group-hover:opacity-100 sm:opacity-60">
          <button
            type="button"
            onClick={() => onEdit(note)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/60 bg-white text-slate-600 shadow-pristine transition-all duration-200 hover:scale-110 active:scale-95 hover:text-slate-700 hover:bg-slate-50"
            aria-label={`Edit note ${note.title}`}
          >
            <PencilLine className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => onDelete(note.id)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-rose-100/80 bg-rose-50 text-rose-600 shadow-pristine transition-all duration-200 hover:scale-110 active:scale-95 hover:border-rose-200 hover:bg-rose-100 hover:text-rose-700"
            aria-label={`Delete note ${note.title}`}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Body text */}
      <p className="mt-3.5 whitespace-pre-line text-sm leading-6 text-slate-600">
        {note.body || 'No details added yet.'}
      </p>

      {/* Metadata */}
      <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-slate-500">
        {note.kind === 'monthly' ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 font-medium text-slate-700 transition-colors hover:bg-slate-200">
            <CalendarDays className="h-3.5 w-3.5" />
            {note.monthKey}
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 font-medium text-slate-700 transition-colors hover:bg-slate-200">
            <CalendarDays className="h-3.5 w-3.5" />
            {note.rangeStart ? displayDateFromKey(note.rangeStart) : 'Range'}
            {note.rangeEnd ? ` → ${displayDateFromKey(note.rangeEnd)}` : ''}
          </span>
        )}
        <span className={joinClasses('rounded-full px-3 py-1.5 font-medium', note.kind === 'range' ? 'bg-slate-100 text-slate-700' : 'bg-white text-slate-600')}>
          Updated {format(new Date(note.updatedAt), 'MMM d')}
        </span>
      </div>
    </article>
  );
}
