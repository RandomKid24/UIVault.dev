import { Inbox } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';

export default function EmptyStateDemo() {
  return (
    <EmptyState
      className="w-full max-w-md"
      icon={<Inbox />}
      title="No leave requests"
      description="When someone on your team applies for leave, it shows up here."
      action={<Button size="sm" variant="outline">Invite teammate</Button>}
    />
  );
}
