import * as React from 'react';
import { PricingCard } from '@/components/ui/pricing-card';
import { Segmented } from '@/components/ui/segmented';

export default function PricingCardDemo() {
  const [plan, setPlan] = React.useState<'monthly' | 'yearly'>('monthly');
  const y = plan === 'yearly';
  return (
    <div className="grid justify-items-center gap-6">
      <Segmented value={plan} onValueChange={setPlan} options={[{ value: 'monthly', label: 'Monthly' }, { value: 'yearly', label: 'Yearly, save 20%' }]} />
      <div className="flex flex-wrap items-stretch justify-center gap-4">
        <PricingCard name="Starter" description="For teams up to 25." price={y ? 239 : 299} features={['Leave and attendance', 'Employee directory', 'Email support']} />
        <PricingCard highlighted name="Growth" description="Payroll included." price={y ? 399 : 499} features={['Everything in Starter', 'Payroll and payslips', 'Approvals workflow', 'Priority support']} />
      </div>
    </div>
  );
}
