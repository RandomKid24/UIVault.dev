import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Terminal } from '@/components/ui/terminal';

export default function TerminalDemo() {
  const [run, setRun] = React.useState(0);
  return (
    <div className="grid w-full max-w-xl justify-items-center gap-3">
      <Terminal
        key={run}
        animate
        title="~/projects/hrms"
        lines={[
          'npx github:RandomKid24/befui init',
          { text: 'Wrote src/index.css and src/lib/utils.ts', kind: 'muted' },
          'npx github:RandomKid24/befui add data-table kanban',
          { text: 'Installed 2 components and 1 dependency', kind: 'output' },
          { text: 'Done in 2.1s', kind: 'success' },
        ]}
      />
      <Button size="xs" variant="outline" onClick={() => setRun(run + 1)}>Replay</Button>
    </div>
  );
}
