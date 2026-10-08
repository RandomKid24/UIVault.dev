import * as React from 'react';
import { CurrencyInput } from '@/components/ui/currency-input';

export default function CurrencyInputDemo() {
  const [v, setV] = React.useState<number | null>(125000);
  return (
    <div className="grid w-60 gap-2">
      <CurrencyInput value={v} onValueChange={setV} aria-label="Salary" />
      <p className="text-xs text-muted-foreground">Value: {v ?? 'empty'}</p>
    </div>
  );
}
