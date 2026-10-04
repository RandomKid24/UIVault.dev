import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Field } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export default function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Quick add</Button>
      </PopoverTrigger>
      <PopoverContent className="grid gap-3">
        <p className="text-sm font-semibold">New lead</p>
        <Field label="Company" htmlFor="co"><Input id="co" placeholder="Acme Pvt Ltd" /></Field>
        <Button size="sm">Add lead</Button>
      </PopoverContent>
    </Popover>
  );
}
