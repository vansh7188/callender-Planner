import { Card } from '@/components/layout/Card';

interface CalendarPanelProps {
  children: React.ReactNode;
}

export function CalendarPanel({ children }: CalendarPanelProps) {
  return (
    <section>
      <div className="mb-3 flex items-end justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Calendar</p>
          <h2 className="text-display text-2xl font-semibold text-slate-900">Monthly planner</h2>
        </div>
      </div>
      <Card className="p-3 sm:p-4">{children}</Card>
    </section>
  );
}
