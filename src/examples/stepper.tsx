import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Stepper } from '@/components/ui/stepper';

const steps = [{ title: 'Details', description: 'Basics' }, { title: 'Role', description: 'Team & level' }, { title: 'Documents' }, { title: 'Review' }];

export default function StepperDemo() {
  const [current, setCurrent] = React.useState(1);
  return (
    <div className="grid w-full max-w-xl gap-6">
      <Stepper steps={steps} current={current} />
      <div className="flex gap-2">
        <Button size="sm" variant="outline" disabled={current === 0} onClick={() => setCurrent((c) => c - 1)}>Back</Button>
        <Button size="sm" disabled={current === steps.length} onClick={() => setCurrent((c) => c + 1)}>Next</Button>
      </div>
    </div>
  );
}
