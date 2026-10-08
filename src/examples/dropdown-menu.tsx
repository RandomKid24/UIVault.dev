import * as React from 'react';
import { CreditCardIcon, LogOutIcon, MoreIcon, SettingsIcon, UserIcon } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export default function DropdownMenuDemo() {
  const [compact, setCompact] = React.useState(true);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          Account <MoreIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>aarav@company.com</DropdownMenuLabel>
        <DropdownMenuItem><UserIcon /> Profile <DropdownMenuShortcut>P</DropdownMenuShortcut></DropdownMenuItem>
        <DropdownMenuItem><CreditCardIcon /> Billing</DropdownMenuItem>
        <DropdownMenuItem><SettingsIcon /> Settings <DropdownMenuShortcut>,</DropdownMenuShortcut></DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked={compact} onCheckedChange={setCompact}>Compact rows</DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem destructive><LogOutIcon /> Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
