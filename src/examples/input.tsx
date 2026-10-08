import { MailIcon, SearchIcon } from '@/components/ui/icons';
import { Field } from '@/components/ui/label';
import { Input, Textarea } from '@/components/ui/input';
import { Kbd } from '@/components/ui/kbd';

export default function InputDemo() {
  return (
    <div className="grid w-full max-w-sm gap-4">
      <Field label="Full name" htmlFor="name" required hint="As it appears on the offer letter.">
        <Input id="name" placeholder="Aarav Mehta" />
      </Field>
      <Field label="Work email" htmlFor="email">
        <Input id="email" type="email" leftIcon={<MailIcon />} placeholder="you@company.com" />
      </Field>
      <Field label="Employee ID" htmlFor="eid" error="This ID is already taken.">
        <Input id="eid" defaultValue="EMP-0042" aria-invalid />
      </Field>
      <Input leftIcon={<SearchIcon />} rightSlot={<Kbd>/</Kbd>} placeholder="Search..." />
      <Field label="Notes" htmlFor="notes">
        <Textarea id="notes" placeholder="Anything the approver should know" />
      </Field>
      <Input disabled placeholder="Disabled" />
    </div>
  );
}
