import * as React from 'react';
import { Calendar, type DateRange, addDays, startOfDay } from '@/components/ui/calendar';

export default function CalendarDemo() {
  const [day, setDay] = React.useState<Date | undefined>(new Date());
  const [range, setRange] = React.useState<DateRange>();
  const today = startOfDay(new Date());
  return (
    <div className="flex flex-wrap items-start justify-center gap-6">
      <div className="rounded-xl border bg-card p-3">
        <Calendar selected={day} onSelect={setDay} />
      </div>
      <div className="rounded-xl border bg-card p-3">
        <Calendar mode="range" selected={range} onSelect={setRange} weekStartsOn={1} disabled={(d) => d < addDays(today, -1)} />
      </div>
    </div>
  );
}
