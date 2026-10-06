import * as React from 'react';
import { AlertDialog } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { TrashIcon } from '@/components/ui/icons';
import { toast } from '@/components/ui/toast';

export default function AlertDialogDemo() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button variant="destructive" onClick={() => setOpen(true)}><TrashIcon /> Delete employee</Button>
      <AlertDialog
        open={open}
        onOpenChange={setOpen}
        destructive
        title="Delete this employee?"
        description="Their records are removed from payroll and cannot be recovered."
        confirmLabel="Delete"
        onConfirm={() => toast.success('Employee deleted')}
      />
    </>
  );
}
