import * as React from 'react';
import { RelativeTime } from '@/components/ui/relative-time';

export default function RelativeTimeDemo() {
  const now = React.useMemo(() => Date.now(), []);
  const items = [
    ['Leave approved', now - 25000],
    ['Payslip generated', now - 14 * 60000],
    ['Review submitted', now - 5 * 3600000],
    ['Joined the team', now - 3 * 86400000],
    ['Offer expires', now + 2 * 86400000],
  ] as const;
  return (
    <ul className="w-72 divide-y rounded-xl border bg-card text-sm">
      {items.map(([t, d]) => (
        <li key={t} className="flex justify-between px-4 py-2.5"><span>{t}</span><RelativeTime date={d} className="text-muted-foreground" /></li>
      ))}
    </ul>
  );
}
