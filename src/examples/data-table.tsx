import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DataTable, type Column } from '@/components/ui/data-table';
import { TooltipProvider, TruncatedText } from '@/components/ui/tooltip';

interface Person { id: string; name: string; email: string; team: string; city: string; joined: string; salary: number; status: 'Active' | 'On leave' | 'Notice' }

const people: Person[] = [
  { id: '1', name: 'Aarav Mehta', email: 'aarav.mehta@acme.in', team: 'Engineering', city: 'Pune', joined: '2021-03-15', salary: 1850000, status: 'Active' },
  { id: '2', name: 'Diya Rao', email: 'diya.rao@acme.in', team: 'Design', city: 'Bengaluru', joined: '2022-07-01', salary: 1420000, status: 'On leave' },
  { id: '3', name: 'Rohan Das', email: 'rohan.das@acme.in', team: 'Sales', city: 'Mumbai', joined: '2023-01-09', salary: 960000, status: 'Active' },
  { id: '4', name: 'Isha Nair', email: 'isha.nair@acme.in', team: 'People Ops', city: 'Kochi', joined: '2020-11-23', salary: 1100000, status: 'Active' },
  { id: '5', name: 'Kabir Shah', email: 'kabir.shah@acme.in', team: 'Engineering', city: 'Ahmedabad', joined: '2019-05-06', salary: 2250000, status: 'Notice' },
  { id: '6', name: 'Meera Iyer', email: 'meera.iyer@acme.in', team: 'Finance', city: 'Chennai', joined: '2022-02-14', salary: 1380000, status: 'Active' },
  { id: '7', name: 'Vikram Joshi', email: 'vikram.joshi@acme.in', team: 'Sales', city: 'Nashik', joined: '2023-08-21', salary: 880000, status: 'Active' },
  { id: '8', name: 'Ananya Kulkarni', email: 'ananya.kulkarni@acme.in', team: 'Engineering', city: 'Pune', joined: '2024-01-08', salary: 1620000, status: 'Active' },
  { id: '9', name: 'Siddharth Verma', email: 'siddharth.verma@acme.in', team: 'Support', city: 'Delhi', joined: '2021-09-30', salary: 720000, status: 'On leave' },
  { id: '10', name: 'Tara Menon', email: 'tara.menon@acme.in', team: 'Design', city: 'Bengaluru', joined: '2023-04-17', salary: 1290000, status: 'Active' },
  { id: '11', name: 'Nikhil Patil', email: 'nikhil.patil@acme.in', team: 'Finance', city: 'Nagpur', joined: '2020-06-02', salary: 1540000, status: 'Active' },
  { id: '12', name: 'Pooja Desai', email: 'pooja.desai@acme.in', team: 'People Ops', city: 'Surat', joined: '2024-05-13', salary: 940000, status: 'Notice' },
  { id: '13', name: 'Arjun Reddy', email: 'arjun.reddy@acme.in', team: 'Engineering', city: 'Hyderabad', joined: '2022-10-10', salary: 1980000, status: 'Active' },
  { id: '14', name: 'Kavya Bhat', email: 'kavya.bhat@acme.in', team: 'Support', city: 'Mysuru', joined: '2023-12-04', salary: 690000, status: 'Active' },
];

const tone = { Active: 'success', 'On leave': 'warning', Notice: 'danger' } as const;
const date = (d: string) => new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

const columns: Column<Person>[] = [
  { key: 'name', header: 'Name', sortable: true, value: (p) => p.name, render: (p) => <span className="flex items-center gap-2 whitespace-nowrap"><Avatar name={p.name} size="sm" />{p.name}</span> },
  { key: 'email', header: 'Email', value: (p) => p.email, render: (p) => <TruncatedText className="w-36 text-muted-foreground">{p.email}</TruncatedText> },
  { key: 'team', header: 'Team', sortable: true, value: (p) => p.team },
  { key: 'joined', header: 'Joined', sortable: true, value: (p) => p.joined, render: (p) => <span className="whitespace-nowrap text-muted-foreground">{date(p.joined)}</span> },
  { key: 'salary', header: 'Salary', sortable: true, align: 'right', value: (p) => p.salary, render: (p) => `₹${(p.salary / 100000).toFixed(1)}L` },
  { key: 'status', header: 'Status', value: (p) => p.status, render: (p) => <Badge variant={tone[p.status]} dot>{p.status}</Badge> },
];

export default function DataTableDemo() {
  return (
    <TooltipProvider>
      <DataTable
        className="w-full"
        rows={people}
        columns={columns}
        rowKey={(p) => p.id}
        pageSize={6}
        filterPlaceholder="Filter people"
        selectable
        columnMenu
        bulkActions={(rows, clear) => (
          <>
            <Button size="xs" variant="outline" onClick={clear}>Export {rows.length}</Button>
            <Button size="xs" variant="ghost" onClick={clear}>Clear</Button>
          </>
        )}
      />
    </TooltipProvider>
  );
}
