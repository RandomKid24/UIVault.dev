import * as React from 'react';
import { CalendarIcon, FileIcon, UsersIcon } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import { Kbd } from '@/components/ui/kbd';
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';

export default function CommandDemo() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open palette <Kbd>⌘K</Kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results.</CommandEmpty>
          <CommandGroup heading="People">
            <CommandItem onSelect={() => setOpen(false)}><UsersIcon /> Employee directory</CommandItem>
            <CommandItem onSelect={() => setOpen(false)}><CalendarIcon /> Leave calendar</CommandItem>
          </CommandGroup>
          <CommandGroup heading="Reports">
            <CommandItem onSelect={() => setOpen(false)}><FileIcon /> Payroll summary</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
