import * as React from 'react';
import { PasswordInput } from '@/components/ui/password-input';

export default function PasswordInputDemo() {
  const [v, setV] = React.useState('');
  return <PasswordInput meter className="w-72" placeholder="Choose a password" value={v} onChange={(e) => setV(e.target.value)} />;
}
