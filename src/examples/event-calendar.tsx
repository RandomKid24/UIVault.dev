import * as React from 'react';
import { EventCalendar, type CalendarEvent } from '@/components/ui/event-calendar';
import { toast } from '@/components/ui/toast';

const d = (day: number) => { const t = new Date(); return new Date(t.getFullYear(), t.getMonth(), day); };
const events: CalendarEvent[] = [
  { id: '1', title: 'Sprint planning', start: d(3), tone: 'primary' },
  { id: '2', title: 'Diwali break', start: d(9), end: d(12), tone: 'warning' },
  { id: '3', title: 'Payroll run', start: d(15), tone: 'success' },
  { id: '4', title: 'Design review', start: d(15), tone: 'primary' },
  { id: '5', title: 'Offsite', start: d(15), end: d(16), tone: 'muted' },
  { id: '6', title: '1:1 with Meera', start: d(15), tone: 'primary' },
  { id: '7', title: 'Audit deadline', start: d(24), tone: 'destructive' },
];

export default function EventCalendarDemo() {
  return <EventCalendar className="w-full" events={events} weekStartsOn={1} onEventClick={(e) => toast.info(e.title)} />;
}
