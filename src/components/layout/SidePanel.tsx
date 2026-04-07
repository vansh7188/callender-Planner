import { Card } from '@/components/layout/Card';

interface SidePanelProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export function SidePanel({ title, subtitle, children }: SidePanelProps) {
  return (
    <section>
      <div className="mb-3">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">{title}</p>
        {subtitle ? <h2 className="text-display text-2xl font-semibold text-slate-900">{subtitle}</h2> : null}
      </div>
      <Card>{children}</Card>
    </section>
  );
}
