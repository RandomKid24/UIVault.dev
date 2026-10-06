import * as React from 'react';
import { SearchInput } from '@/components/ui/search-input';

export default function SearchInputDemo() {
  const [v, setV] = React.useState('');
  return (
    <div className="grid gap-2">
      <SearchInput className="w-72" value={v} onValueChange={setV} placeholder="Search people" />
      <p className="text-xs text-muted-foreground">Press / to focus, Esc to clear.</p>
    </div>
  );
}
