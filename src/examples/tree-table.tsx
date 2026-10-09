import { Badge } from '@/components/ui/badge';
import { TreeTable, type TreeRow } from '@/components/ui/tree-table';

interface Budget extends TreeRow { name: string; owner: string; budget: number; spent: number; children?: Budget[] }

const rows: Budget[] = [
  { id: 'eng', name: 'Engineering', owner: 'Aarav Mehta', budget: 9_000_000, spent: 6_400_000, children: [
    { id: 'eng-web', name: 'Web platform', owner: 'Ananya K.', budget: 4_000_000, spent: 3_100_000, children: [
      { id: 'eng-web-fe', name: 'Frontend', owner: 'Ananya K.', budget: 2_200_000, spent: 1_800_000 },
      { id: 'eng-web-be', name: 'Backend', owner: 'Kabir Shah', budget: 1_800_000, spent: 1_300_000 },
    ] },
    { id: 'eng-mobile', name: 'Mobile', owner: 'Rohan Das', budget: 3_000_000, spent: 2_100_000 },
    { id: 'eng-infra', name: 'Infrastructure', owner: 'Kabir Shah', budget: 2_000_000, spent: 1_200_000 },
  ] },
  { id: 'sales', name: 'Sales', owner: 'Vikram Joshi', budget: 5_000_000, spent: 5_300_000, children: [
    { id: 'sales-in', name: 'India', owner: 'Vikram Joshi', budget: 3_000_000, spent: 3_400_000 },
    { id: 'sales-me', name: 'Middle East', owner: 'Isha Nair', budget: 2_000_000, spent: 1_900_000 },
  ] },
  { id: 'ops', name: 'People Ops', owner: 'Isha Nair', budget: 1_500_000, spent: 900_000 },
];
const lakh = (n: number) => `₹${(n / 100_000).toFixed(1)}L`;

export default function TreeTableDemo() {
  return (
    <TreeTable
      className="w-full"
      rows={rows}
      defaultExpanded={['eng']}
      columns={[
        { key: 'name', header: 'Department' },
        { key: 'owner', header: 'Owner' },
        { key: 'budget', header: 'Budget', align: 'end', render: (r) => lakh(r.budget) },
        { key: 'spent', header: 'Spent', align: 'end', render: (r) => lakh(r.spent) },
        { key: 'status', header: 'Status', render: (r) => (r.spent > r.budget ? <Badge variant="danger">Over</Badge> : <Badge variant="success">On track</Badge>) },
      ]}
    />
  );
}
