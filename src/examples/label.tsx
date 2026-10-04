import { Field, Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default function LabelDemo() {
  return (
    <div className="grid w-full max-w-sm gap-5">
      <div className="grid gap-1.5">
        <Label htmlFor="a" required>
          Label on its own
        </Label>
        <Input id="a" />
      </div>
      <Field label="Field wraps label, control and message" htmlFor="b" hint="Shown under the control.">
        <Input id="b" />
      </Field>
    </div>
  );
}
