import * as React from 'react';
import { NumberStepper } from '@/components/ui/number-stepper';

export default function NumberStepperDemo() {
  const [v, setV] = React.useState(2);
  return <NumberStepper value={v} onValueChange={setV} min={1} max={10} />;
}
