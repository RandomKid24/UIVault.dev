import * as React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from './icons';
import { addDays, isSameDay, startOfDay } from './calendar';
import { Button } from './button';
import { cn } from '@/lib/utils';

export type EventTone = 'primary' | 'success' | 'warning' | 'destructive' | 'muted';
export interface CalendarEvent {
  id: string;
  title: string;
  /** First day. Multi-day events show on every day up to `end`. */
  start: Date;
  end?: Date;
  tone?: EventTone;
}

const tones: Record<EventTone, string> = {
  primary: 'bg-primary/12 text-primary',
  success: 'bg-success/15 text-success',
  warning: 'bg-warning/20 text-warning',
  destructive: 'bg-destructive/12 text-destructive',
  muted: 'bg-secondary text-secondary-foreground',
};

/** Full month view with events on their days, "+n more" overflow, and month navigation. Month names and weekdays follow `locale`, and arrow icons flip in right-to-left pages. */
export function EventCalendar({
  events,
  onEventClick,
  onDayClick,
  month: monthProp,
  onMonthChange,
  weekStartsOn = 0,
  locale = 'en-US',
  maxPerDay = 3,
  className,
}: {
  events: CalendarEvent[];
  onEventClick?: (e: CalendarEvent) => void;
  onDayClick?: (d: Date) => void;
  /** Controlled month. Leave out to let the calendar manage it. */
  month?: Date;
  onMonthChange?: (m: Date) => void;
  weekStartsOn?: 0 | 1;
  locale?: string;
  maxPerDay?: number;
  className?: string;
}) {
  const [inner, setInner] = React.useState(() => new Date());
  const month = monthProp ?? inner;
  const first = new Date(month.getFullYear(), month.getMonth(), 1);
  const go = (to: Date) => { setInner(to); onMonthChange?.(to); };
  const today = startOfDay(new Date());

  const gridStart = addDays(first, -((first.getDay() - weekStartsOn + 7) % 7));
  const weeks = Math.ceil(((first.getDay() - weekStartsOn + 7) % 7 + new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()) / 7);
  const days = Array.from({ length: weeks * 7 }, (_, i) => addDays(gridStart, i));

  const title = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(first);
  const weekday = new Intl.DateTimeFormat(locale, { weekday: 'short' });
  const num = new Intl.NumberFormat(locale);

  const eventsOn = (d: Date) => events.filter((e) => startOfDay(e.start) <= d && d <= startOfDay(e.end ?? e.start)).sort((a, b) => a.start.getTime() - b.start.getTime());

  return (
    <div className={cn('overflow-hidden rounded-xl border bg-card', className)}>
      <div className="flex items-center justify-between gap-2 border-b px-4 py-3">
        <h3 className="text-sm font-semibold" aria-live="polite">{title}</h3>
        <div className="flex items-center gap-1">
          <Button size="sm" variant="outline" onClick={() => go(new Date())}>Today</Button>
          <Button size="icon-sm" variant="ghost" aria-label="Previous month" onClick={() => go(new Date(month.getFullYear(), month.getMonth() - 1, 1))}><ChevronLeftIcon className="rtl:rotate-180" /></Button>
          <Button size="icon-sm" variant="ghost" aria-label="Next month" onClick={() => go(new Date(month.getFullYear(), month.getMonth() + 1, 1))}><ChevronRightIcon className="rtl:rotate-180" /></Button>
        </div>
      </div>
      <div className="grid grid-cols-7 border-b text-center text-[11px] font-medium text-muted-foreground">
        {days.slice(0, 7).map((d) => <span key={d.getDay()} className="py-2">{weekday.format(d)}</span>)}
      </div>
      <div className="grid grid-cols-7">
        {days.map((d, i) => {
          const list = eventsOn(d);
          const outside = d.getMonth() !== month.getMonth();
          return (
            <div
              key={d.toISOString()}
              onClick={() => onDayClick?.(d)}
              className={cn('min-h-24 min-w-0 border-b border-e p-1.5 [&:nth-child(7n)]:border-e-0', i >= days.length - 7 && 'border-b-0', onDayClick && 'cursor-pointer hover:bg-secondary/40', outside && 'bg-muted/30')}
            >
              <span className={cn('mb-1 grid size-6 place-items-center rounded-full text-xs tabular-nums', outside && 'text-muted-foreground/50', isSameDay(d, today) && 'bg-primary font-semibold text-primary-foreground')}>{num.format(d.getDate())}</span>
              <div className="grid gap-0.5">
                {list.slice(0, maxPerDay).map((e) => (
                  <button
                    key={e.id}
                    type="button"
                    onClick={(ev) => { ev.stopPropagation(); onEventClick?.(e); }}
                    className={cn('truncate rounded px-1.5 py-0.5 text-start text-[11px] font-medium outline-none focus-visible:ring-2 focus-visible:ring-ring/50', tones[e.tone ?? 'primary'])}
                  >
                    {e.title}
                  </button>
                ))}
                {list.length > maxPerDay && <span className="px-1.5 text-[11px] text-muted-foreground"><bdi>+{num.format(list.length - maxPerDay)}</bdi> more</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
