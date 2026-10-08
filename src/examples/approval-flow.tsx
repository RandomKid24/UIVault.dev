import * as React from 'react';
import { ApprovalFlow, type ApprovalStep } from '@/components/ui/approval-flow';
import { toast } from '@/components/ui/toast';

export default function ApprovalFlowDemo() {
  const [steps, setSteps] = React.useState<ApprovalStep[]>([
    { id: '1', approver: 'Rohan Das', role: 'Team lead', status: 'approved', comment: 'Looks fine, within the team budget.', at: '07 Oct' },
    { id: '2', approver: 'Meera Iyer', role: 'Finance', status: 'pending' },
    { id: '3', approver: 'Aarav Mehta', role: 'CTO', status: 'waiting' },
  ]);
  const decide = (id: string, d: 'approved' | 'rejected', comment: string) => {
    setSteps((l) => l.map((s, i) => {
      if (s.id === id) return { ...s, status: d, comment: comment || undefined, at: 'Just now' };
      if (d === 'approved' && l[i - 1]?.id === id) return { ...s, status: 'pending' };
      return s;
    }));
    toast[d === 'approved' ? 'success' : 'info'](d === 'approved' ? 'Approved' : 'Rejected');
  };
  return (
    <div className="w-full max-w-md rounded-xl border bg-card p-5">
      <p className="mb-4 text-sm font-semibold">Laptop purchase · ₹1,45,000</p>
      <ApprovalFlow steps={steps} onDecide={decide} />
    </div>
  );
}
