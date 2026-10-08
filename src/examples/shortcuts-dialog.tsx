import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Kbd } from '@/components/ui/kbd';
import { ShortcutsDialog } from '@/components/ui/shortcuts-dialog';

export default function ShortcutsDialogDemo() {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="grid justify-items-center gap-3">
      <Button variant="outline" onClick={() => setOpen(true)}>Keyboard shortcuts</Button>
      <p className="text-xs text-muted-foreground">or press <Kbd>?</Kbd></p>
      <ShortcutsDialog
        open={open}
        onOpenChange={setOpen}
        groups={[
          { title: 'General', items: [{ keys: ['Ctrl', 'K'], label: 'Command palette' }, { keys: ['?'], label: 'This help' }, { keys: ['Esc'], label: 'Close dialog' }] },
          { title: 'Navigation', items: [{ keys: ['G', 'H'], label: 'Go to home' }, { keys: ['G', 'R'], label: 'Go to reports' }, { keys: ['/'], label: 'Focus search' }] },
          { title: 'Tables', items: [{ keys: ['J'], label: 'Next row' }, { keys: ['K'], label: 'Previous row' }, { keys: ['Enter'], label: 'Open row' }] },
          { title: 'Editing', items: [{ keys: ['⌘', 'S'], label: 'Save' }, { keys: ['⌘', 'Z'], label: 'Undo' }, { keys: ['Shift', '⌘', 'Z'], label: 'Redo' }] },
        ]}
      />
    </div>
  );
}
