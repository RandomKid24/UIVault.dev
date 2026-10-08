import { Badge } from '@/components/ui/badge';
import { VersionLog, type VersionRelease } from '@/components/ui/version-log';

const releases: VersionRelease[] = [
  {
    version: '2.1.0', date: '2026-10-08', title: 'Boards and reports',
    entries: [
      { kind: 'added', text: 'Kanban board with keyboard moves.', extra: <div className="flex gap-1.5"><Badge variant="outline">kanban</Badge><Badge variant="outline">sortable-list</Badge></div> },
      { kind: 'added', text: 'Reports table block with a details drawer.' },
      { kind: 'changed', text: 'Data table rows can be clicked and have an actions menu.' },
      { kind: 'fixed', text: 'Combobox kept the old highlight after filtering.' },
    ],
  },
  {
    version: '2.0.0', date: '2026-09-21', title: 'New icon set',
    entries: [
      { kind: 'added', text: '94 hand-drawn icons with an optional draw animation.' },
      { kind: 'changed', text: 'Every component now uses the built-in icons.' },
      { kind: 'removed', text: 'The lucide-react dependency.' },
    ],
  },
  {
    version: '1.4.0', date: '2026-09-02', title: 'Time components',
    entries: [
      { kind: 'added', text: 'Time picker, analog clock and world clock.' },
      { kind: 'fixed', text: 'Calendar skipped a day when the month changed.' },
    ],
  },
];

export default function VersionLogDemo() {
  return <VersionLog className="w-full max-w-2xl" releases={releases} openCount={2} />;
}
