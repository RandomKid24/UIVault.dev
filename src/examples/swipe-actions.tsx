import { Archive, Star, Trash2 } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { SwipeActions } from '@/components/ui/swipe-actions';
import { toast } from '@/components/ui/toast';

const mails = [
  { name: 'Diya Rao', subject: 'Offer letter for Kabir', preview: 'Sent it this morning, joining is 3 Nov.' },
  { name: 'Finance', subject: 'September payroll is ready', preview: 'Please review and approve before Friday.' },
  { name: 'Rohan Das', subject: 'Laptop request', preview: 'Need a 16 GB machine for the new hire.' },
];

export default function SwipeActionsDemo() {
  return (
    <div className="grid w-full max-w-sm gap-2">
      {mails.map((m) => (
        <SwipeActions
          key={m.subject}
          actions={[
            { label: 'Star', icon: <Star />, tone: 'warning', onClick: () => toast.info('Starred', m.subject) },
            { label: 'Archive', icon: <Archive />, tone: 'primary', onClick: () => toast.success('Archived', m.subject) },
            { label: 'Delete', icon: <Trash2 />, tone: 'danger', onClick: () => toast.error('Deleted', m.subject) },
          ]}
        >
          <div className="flex items-center gap-3 p-3">
            <Avatar name={m.name} />
            <div className="min-w-0"><p className="truncate text-[13px] font-medium">{m.subject}</p><p className="truncate text-xs text-muted-foreground">{m.name} · {m.preview}</p></div>
          </div>
        </SwipeActions>
      ))}
      <p className="px-1 text-xs text-muted-foreground">Swipe or drag a row left. Keyboard: focus a row, press Left.</p>
    </div>
  );
}
