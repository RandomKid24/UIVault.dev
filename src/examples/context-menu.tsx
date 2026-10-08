import * as React from 'react';
import { Copy, Download, FolderInput, Link2, Pencil, Trash2 } from 'lucide-react';
import { ContextMenu, ContextMenuCheckboxItem, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuSeparator, ContextMenuShortcut, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger } from '@/components/ui/context-menu';
import { toast } from '@/components/ui/toast';

export default function ContextMenuDemo() {
  const [starred, setStarred] = React.useState(false);
  return (
    <ContextMenu>
        <ContextMenuTrigger asChild>
          <div className="grid h-40 w-72 cursor-context-menu place-items-center rounded-xl border border-dashed text-sm text-muted-foreground select-none">
            <div className="text-center">
              <p className="font-medium text-foreground">Q3-budget.xlsx</p>
              <p>Right-click anywhere here</p>
            </div>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-56">
          <ContextMenuLabel>Q3-budget.xlsx</ContextMenuLabel>
          <ContextMenuItem onSelect={() => toast.info('Renaming')}><Pencil /> Rename <ContextMenuShortcut>F2</ContextMenuShortcut></ContextMenuItem>
          <ContextMenuItem onSelect={() => toast.success('Copied')}><Copy /> Duplicate <ContextMenuShortcut>⌘D</ContextMenuShortcut></ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger><FolderInput /> Move to</ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-44">
              <ContextMenuItem>Finance</ContextMenuItem>
              <ContextMenuItem>Archive</ContextMenuItem>
              <ContextMenuItem>Shared drive</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuCheckboxItem checked={starred} onCheckedChange={setStarred}>Starred</ContextMenuCheckboxItem>
          <ContextMenuSeparator />
          <ContextMenuItem onSelect={() => toast.success('Link copied')}><Link2 /> Copy link</ContextMenuItem>
          <ContextMenuItem><Download /> Download</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem destructive><Trash2 /> Delete <ContextMenuShortcut>⌫</ContextMenuShortcut></ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
  );
}
