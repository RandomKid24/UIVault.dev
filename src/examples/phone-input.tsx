import * as React from 'react';
import { PhoneInput, type PhoneValue } from '@/components/ui/phone-input';
import { Field } from '@/components/ui/label';

export default function PhoneInputDemo() {
  const [v, setV] = React.useState<PhoneValue>();
  const bad = !!v?.national && !v.valid;
  return (
    <div className="w-full max-w-sm">
      <Field label="Mobile number" htmlFor="phone" error={bad ? 'Number looks incomplete.' : undefined} hint={v?.valid ? `Saved as ${v.e164}` : 'We only use this for sign-in codes.'}>
        <PhoneInput id="phone" value={v} onValueChange={setV} invalid={bad} />
      </Field>
    </div>
  );
}
