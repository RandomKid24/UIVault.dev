import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DataTable, type Column } from '@/components/ui/data-table';

interface Person { id: string; name: string; team: string; salary: number; status: 'Active' | 'On leave' | 'Notice' }

const people: Person[] = [
  { id: '1', name: 'Aarav Mehta', team: 'Engineering', salary: 1850000, status: 'Active' },
  { id: '2', name: 'Diya Rao', team: 'Design', salary: 1420000, status: 'On leave' },
  { id: '3', name: 'Rohan Das', team: 'Sales', salary: 960000, status: 'Active' },
  { id: '4', name: 'Isha Nair', team: 'People Ops', salary: 1100000, status: 'Active' },
  { id: '5', name: 'Kabir Shah', team: 'Engineering', salary: 2250000, status: 'Notice' },
  { id: '6', name: 'Meera Iyer', team: 'Finance', salary: 1380000, status: 'Active' },
  { id: '7', name: 'Vikram Joshi', team: 'Sales', salary: 880000, status: 'Active' },
];

const tone = { Active: 'success', 'On leave': 'warning', Notice: 'danger' } as const;

const columns: Column<Person>[] = [
  { key: 'name', header: 'Name', sortable: true, value: (p) => p.name, render: (p) => <span className="flex items-center gap-2"><Avatar name={p.name} size="sm" />{p.name}</span> },
  { key: 'team', header: 'Team', sortable: true, value: (p) => p.team },
  { key: 'salary', header: 'Salary', sortable: true, align: 'right', value: (p) => p.salary, render: (p) => `₹${(p.salary / 100000).toFixed(1)}L` },
  { key: 'status', header: 'Status', value: (p) => p.status, render: (p) => <Badge variant={tone[p.status]} dot>{p.status}</Badge> },
];

export default function DataTableDemo() {
  return (
    <DataTable
      className="w-full"
      rows={people}
      columns={columns}
      rowKey={(p) => p.id}
      pageSize={4}
      filterPlaceholder="Filter people"
      selectable
      columnMenu
      bulkActions={(rows, clear) => <Button size="sm" variant="outline" onClick={clear}>Export {rows.length}</Button>}
    />
  );
}
