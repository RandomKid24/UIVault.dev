import { Collapsible } from '@/components/ui/collapsible';

export default function CollapsibleDemo() {
  return (
    <div className="w-full max-w-sm rounded-xl border bg-card px-4 py-2">
      <Collapsible title="Show advanced options" defaultOpen>
        Delegate approvals, set a carry-over cap and choose who is notified when a request is rejected.
      </Collapsible>
    </div>
  );
}
