import * as React from 'react';
import { RadioGroup } from '@/components/ui/radio-group';

export default function RadioGroupDemo() {
  const [v, setV] = React.useState('growth');
  return (
    <RadioGroup
      name="plan"
      className="w-full max-w-sm"
      value={v}
      onValueChange={setV}
      options={[
        { value: 'starter', label: 'Starter', description: 'Up to 25 employees' },
        { value: 'growth', label: 'Growth', description: 'Payroll and attendance included' },
        { value: 'enterprise', label: 'Enterprise', description: 'SSO and audit logs', disabled: true },
      ]}
    />
  );
}
