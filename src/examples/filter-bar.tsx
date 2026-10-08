import * as React from 'react';
import { FilterBar, type FilterValue } from '@/components/ui/filter-bar';

export default function FilterBarDemo() {
  const [value, setValue] = React.useState<FilterValue>({ status: 'Active' });
  return (
    <FilterBar
      value={value}
      onChange={setValue}
      fields={[
        { key: 'status', label: 'Status', options: ['Active', 'On leave', 'Exited'] },
        { key: 'dept', label: 'Department', options: ['Engineering', 'Sales', 'People', 'Finance'] },
        { key: 'type', label: 'Type', options: ['Full-time', 'Contract', 'Intern'] },
      ]}
    />
  );
}
