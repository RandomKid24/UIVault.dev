import { toast } from '@/components/ui/toast';
import { Fab } from '@/components/ui/fab';
import { EditIcon, FileIcon, PlusIcon, UsersIcon } from '@/components/ui/icons';

export default function FabDemo() {
  return (
    <div className="relative h-72 w-full max-w-sm overflow-hidden rounded-xl border bg-muted/40">
      <p className="p-4 text-xs text-muted-foreground">Click the button for a speed dial. The second button is the extended form.</p>
      <Fab
        className="absolute bottom-4 right-4"
        actions={[
          { label: 'New employee', icon: <UsersIcon />, onClick: () => toast.info('New employee') },
          { label: 'New document', icon: <FileIcon />, onClick: () => toast.info('New document') },
          { label: 'Quick note', icon: <EditIcon />, onClick: () => toast.info('Quick note') },
        ]}
      />
      <Fab className="absolute bottom-4 left-4" icon={<PlusIcon />} label="Compose" onClick={() => toast.success('Compose')} />
    </div>
  );
}
