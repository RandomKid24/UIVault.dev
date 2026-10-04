import * as React from 'react';
import { CreditCard, LogOut, MoreHorizontal, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export default function DropdownMenuDemo() {
  const [compact, setCompact] = React.useState(true);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          Account <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>aarav@company.com</DropdownMenuLabel>
        <DropdownMenuItem><User /> Profile <DropdownMenuShortcut>P</DropdownMenuShortcut></DropdownMenuItem>
        <DropdownMenuItem><CreditCard /> Billing</DropdownMenuItem>
        <DropdownMenuItem><Settings /> Settings <DropdownMenuShortcut>,</DropdownMenuShortcut></DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked={compact} onCheckedChange={setCompact}>Compact rows</DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem destructive><LogOut /> Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
