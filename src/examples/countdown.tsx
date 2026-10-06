import * as React from 'react';
import { Countdown } from '@/components/ui/countdown';

export default function CountdownDemo() {
  const to = React.useMemo(() => Date.now() + 3 * 86400000 + 4 * 3600000, []);
  return <Countdown to={to} />;
}
