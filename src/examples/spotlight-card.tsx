import { BarChart3, ShieldCheck, Zap } from 'lucide-react';
import { SpotlightCard } from '@/components/ui/spotlight-card';

const items = [
  { icon: Zap, t: 'Fast', d: 'Approvals in one click.' },
  { icon: ShieldCheck, t: 'Secure', d: 'Role-based access everywhere.' },
  { icon: BarChart3, t: 'Insightful', d: 'Reports without a spreadsheet.' },
];

export default function SpotlightCardDemo() {
  return (
    <div className="grid w-full gap-4 sm:grid-cols-3">
      {items.map(({ icon: I, t, d }) => (
        <SpotlightCard key={t}>
          <I className="size-5 text-primary" />
          <h3 className="mt-3 text-sm font-semibold">{t}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{d}</p>
        </SpotlightCard>
      ))}
    </div>
  );
}
