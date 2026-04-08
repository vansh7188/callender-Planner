"use client";

import { motion } from 'framer-motion';
import { CalendarRange, ClipboardList, Sparkles } from 'lucide-react';
import type { NoteDraft, NoteEntry, RangeSummary, ThemeDefinition } from '@/types';
import { NoteCard } from '@/components/notes/NoteCard';
import { joinClasses } from '@/lib/classes';

interface NotesPanelProps {
  notes: NoteEntry[];
  theme: ThemeDefinition;
  monthKey: string;
  selectedRangeKey: string;
  rangeSummary: RangeSummary;
  selectedRangeLabel: string;
  draft: NoteDraft;
  editingNoteId: string | null;
  onDraftChange: (patch: Partial<NoteDraft>) => void;
  onToggleDraftKind: (kind: 'monthly' | 'range') => void;
  onSaveNote: () => void;
  onBeginEdit: (note: NoteEntry) => void;
  onDeleteNote: (noteId: string) => void;
  onClearAllNotes: () => void;
  onComposeRangeNote: () => void;
  canSaveRange: boolean;
}

export function NotesPanel({
  notes,
  theme,
  monthKey,
  selectedRangeKey,
  rangeSummary,
  selectedRangeLabel,
  draft,
  editingNoteId,
  onDraftChange,
  onToggleDraftKind,
  onSaveNote,
  onBeginEdit,
  onDeleteNote,
  onClearAllNotes,
  onComposeRangeNote,
  canSaveRange
}: NotesPanelProps) {
  const monthlyNotes = notes.filter((note) => note.kind === 'monthly' && note.monthKey === monthKey).sort((a, b) => Number(b.pinned) - Number(a.pinned) || b.updatedAt.localeCompare(a.updatedAt));
  const rangeNotes = notes.filter((note) => note.kind === 'range').sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  const rangeNote = notes.find((note) => note.kind === 'range' && note.rangeKey === selectedRangeKey);

  return (
    <section className="grid gap-4 p-4 sm:gap-5 sm:p-6">
      <motion.article
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.24 }}
        className="rounded-2xl border border-white/45 bg-white/82 p-4 shadow-pristine transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft sm:p-5"
      >
        <div className="mb-4 flex flex-col gap-3 border-b border-white/55 pb-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Memory board</p>
            <p className="mt-1 text-sm font-semibold text-slate-800">Current month focus</p>
          </div>
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600">{monthlyNotes.length}</span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-200/65 bg-white/90 p-4">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Primary</p>
            <p className="mt-2 text-sm font-semibold text-slate-900">{monthlyNotes[0]?.title ?? 'No monthly memo yet'}</p>
            <p className="mt-1.5 text-xs leading-5 text-slate-500">{monthlyNotes[0]?.body ?? 'Use the composer to add your first monthly memo.'}</p>
          </div>

          <div className="rounded-xl border border-slate-200/65 bg-white/90 p-4">
            <div className="flex items-start justify-between gap-2">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Range status</p>
              <CalendarRange className="h-4 w-4 text-slate-400" />
            </div>
            <p className="mt-2 text-sm font-semibold text-slate-900">{rangeSummary.totalDays ? `${rangeSummary.totalDays} days selected` : 'No active range'}</p>
            <p className="mt-1.5 text-xs leading-5 text-slate-500">{selectedRangeLabel}</p>
            {rangeNote && <p className="mt-2 text-[11px] font-semibold text-slate-600">Memo: {rangeNote.title}</p>}
          </div>
        </div>
      </motion.article>

      <motion.form
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.24, delay: 0.05 }}
        onSubmit={(event) => {
          event.preventDefault();
          onSaveNote();
        }}
        className="rounded-2xl border border-white/45 bg-white/82 p-4 shadow-pristine transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft sm:p-5"
      >
        <div className="mb-4 flex flex-col gap-3 border-b border-white/55 pb-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Notes composer</p>
            <p className="mt-1 text-sm font-semibold text-slate-800">Write and save</p>
          </div>

          <div className="inline-flex w-full rounded-full border border-white/60 bg-slate-50/85 p-1 text-xs font-semibold shadow-pristine sm:w-auto">
            {['monthly', 'range'].map((kind) => (
              <button
                key={kind}
                type="button"
                onClick={() => onToggleDraftKind(kind as 'monthly' | 'range')}
                className={joinClasses(
                  'rounded-full px-3 py-1.5 transition-all duration-200',
                  draft.kind === kind ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:bg-white'
                )}
              >
                {kind === 'monthly' ? 'Monthly' : 'Range'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-3">
          <label className="grid gap-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Title</span>
            <input
              value={draft.title}
              onChange={(event) => onDraftChange({ title: event.target.value })}
              className="h-11 rounded-xl border border-slate-200/70 bg-white px-3.5 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-300 focus:ring-2 focus:ring-slate-200/50"
              placeholder={draft.kind === 'monthly' ? 'Month priorities' : 'Range recap'}
            />
          </label>

          <label className="grid gap-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Details</span>
            <textarea
              value={draft.body}
              onChange={(event) => onDraftChange({ body: event.target.value })}
              rows={4}
              className="rounded-xl border border-slate-200/70 bg-white px-3.5 py-3 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-300 focus:ring-2 focus:ring-slate-200/50 resize-none"
              placeholder="Key points, reminders, or outcomes"
            />
          </label>
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-xs text-slate-500">
            {draft.kind === 'monthly' ? (
              <span>Saved under <span className="font-semibold text-slate-700">{draft.monthKey}</span></span>
            ) : (
              <span>{canSaveRange ? `Linked to ${selectedRangeLabel}` : 'Select a date range first'}</span>
            )}
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            {draft.kind === 'range' && (
              <button
                type="button"
                onClick={onComposeRangeNote}
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 sm:w-auto sm:py-1.5"
              >
                <CalendarRange className="h-3.5 w-3.5" />
                Use selection
              </button>
            )}

            <motion.button
              type="submit"
              disabled={draft.kind === 'range' && !canSaveRange}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full px-4.5 py-2.5 text-sm font-bold text-white shadow-soft transition-all hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
              style={{ backgroundColor: theme.accent }}
            >
              <Sparkles className="h-4 w-4" />
              {editingNoteId ? 'Update' : 'Save'}
            </motion.button>
          </div>
        </div>
      </motion.form>

      <motion.article
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.24, delay: 0.1 }}
        className="rounded-2xl border border-white/45 bg-white/82 p-5 shadow-pristine transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft"
      >
        <div className="mb-4 flex flex-col gap-3 border-b border-white/55 pb-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">All notes</p>
            <p className="mt-1 text-sm font-semibold text-slate-800">Monthly + range</p>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600">{notes.length}</span>
            <button
              type="button"
              onClick={onClearAllNotes}
              className="inline-flex items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50/90 px-3 py-1.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-100"
            >
              <ClipboardList className="h-3.5 w-3.5" />
              Clear
            </button>
          </div>
        </div>

        <div className="space-y-2.5">
          {notes.length ? (
            notes.map((note, index) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.025 }}
              >
                <NoteCard note={note} theme={theme} onEdit={onBeginEdit} onDelete={onDeleteNote} />
              </motion.div>
            ))
          ) : (
            <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/60 p-6 text-center">
              <p className="text-sm font-semibold text-slate-700">No notes yet</p>
              <p className="mt-1.5 text-xs leading-5 text-slate-500">Use the composer above to create your first note.</p>
            </div>
          )}
        </div>
      </motion.article>
    </section>
  );
}
