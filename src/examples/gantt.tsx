import { Gantt, type GanttTask } from '@/components/ui/gantt';

const d = (offset: number) => { const t = new Date(); t.setDate(t.getDate() + offset); return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(t.getDate()).padStart(2, '0')}`; };

const tasks: GanttTask[] = [
  { id: '1', name: 'Discovery', owner: 'Isha Nair', start: d(-10), end: d(-4), progress: 100, tone: 'success' },
  { id: '2', name: 'Design system', owner: 'Diya Rao', start: d(-6), end: d(3), progress: 70, tone: 'info' },
  { id: '3', name: 'Backend APIs', owner: 'Rohan Das', start: d(-3), end: d(9), progress: 40 },
  { id: '4', name: 'Frontend build', owner: 'Aarav Mehta', start: d(1), end: d(14), progress: 10 },
  { id: '5', name: 'QA and fixes', owner: 'Vikram Joshi', start: d(10), end: d(18), progress: 0, tone: 'warning' },
  { id: '6', name: 'Launch', owner: 'Meera Iyer', start: d(19), end: d(21), progress: 0, tone: 'danger' },
];

export default function GanttDemo() {
  return <Gantt tasks={tasks} />;
}
