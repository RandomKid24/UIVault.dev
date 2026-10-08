import * as React from 'react';
import { Button } from '@/components/ui/button';
import { BottomSheet } from '@/components/ui/bottom-sheet';
import { toast } from '@/components/ui/toast';

const options = ['Casual leave', 'Sick leave', 'Earned leave', 'Work from home'];

export default function BottomSheetDemo() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>Apply for leave</Button>
      <BottomSheet open={open} onOpenChange={setOpen} title="Apply for" description="Drag the handle down to dismiss.">
        <ul className="grid gap-1 pb-2">
          {options.map((o) => (
            <li key={o}><button type="button" onClick={() => { setOpen(false); toast.success('Selected', o); }} className="w-full rounded-lg px-3 py-3 text-left text-sm font-medium outline-none hover:bg-secondary focus-visible:bg-secondary">{o}</button></li>
          ))}
        </ul>
      </BottomSheet>
    </>
  );
}
