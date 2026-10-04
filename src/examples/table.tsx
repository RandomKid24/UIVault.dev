import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const rows = [
  { id: 'INV-204', client: 'Northwind', amount: '$4,200', status: 'Paid' },
  { id: 'INV-205', client: 'Globex', amount: '$1,150', status: 'Due' },
  { id: 'INV-206', client: 'Initech', amount: '$8,900', status: 'Overdue' },
];
const tone = { Paid: 'success', Due: 'warning', Overdue: 'danger' } as const;

export default function TableDemo() {
  return (
    <Card className="w-full max-w-xl overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Invoice</TableHead>
            <TableHead>Client</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r) => (
            <TableRow key={r.id}>
              <TableCell className="font-mono text-xs">{r.id}</TableCell>
              <TableCell className="font-medium">{r.client}</TableCell>
              <TableCell className="text-right tabular-nums">{r.amount}</TableCell>
              <TableCell><Badge variant={tone[r.status as keyof typeof tone]} dot>{r.status}</Badge></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
