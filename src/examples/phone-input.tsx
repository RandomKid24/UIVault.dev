import * as React from 'react';
import { PhoneInput, type PhoneValue } from '@/components/ui/phone-input';
import { Field, Label } from '@/components/ui/label';

export default function PhoneInputDemo() {
  const [v, setV] = React.useState<PhoneValue>();
  const bad = !!v?.national && !v.valid;
  return (
    <div className="w-full max-w-sm">
      <Field>
        <Label htmlFor="phone">Mobile number</Label>
        <PhoneInput id="phone" value={v} onValueChange={setV} invalid={bad} />
        <p className="text-xs text-muted-foreground">{v?.valid ? `Saved as ${v.e164}` : bad ? 'Number looks incomplete.' : 'We only use this for sign-in codes.'}</p>
      </Field>
    </div>
  );
}
