import * as React from 'react';
import { PivotTable } from '@/components/ui/pivot-table';
import { Segmented } from '@/components/ui/segmented';

const regions = ['North', 'South', 'West', 'East'];
const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
const products = ['Starter', 'Growth', 'Scale'];
const sales = regions.flatMap((region, i) => quarters.flatMap((quarter, j) => products.map((product, k) => ({ region, quarter, product, revenue: ((i + 2) * (j + 3) * (k + 1) * 37_000) % 900_000 + 120_000 }))));

export default function PivotTableDemo() {
  const [by, setBy] = React.useState<'quarter' | 'product'>('quarter');
  return (
    <div className="grid w-full gap-4">
      <Segmented value={by} onValueChange={setBy} options={[{ value: 'quarter', label: 'By quarter' }, { value: 'product', label: 'By product' }]} />
      <PivotTable data={sales} rows="region" columns={by} value="revenue" rowLabel="Region" format={(n) => `₹${(n / 100_000).toFixed(1)}L`} />
    </div>
  );
}
