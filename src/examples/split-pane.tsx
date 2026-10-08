import { Badge } from '@/components/ui/badge';
import { SplitPane } from '@/components/ui/split-pane';

const files = ['invoice-template.tsx', 'payroll-run.tsx', 'leave-policy.md', 'org-chart.json', 'holidays-2026.csv'];

export default function SplitPaneDemo() {
  return (
    <SplitPane className="h-72 w-full max-w-2xl" defaultSize={34} min={20} max={70}>
      {[
        <ul key="a" className="p-2">
          {files.map((f, i) => <li key={f} className={`rounded-md px-2.5 py-1.5 text-[13px] ${i === 1 ? 'bg-accent font-medium' : 'text-muted-foreground'}`}>{f}</li>)}
        </ul>,
        <div key="b" className="grid gap-3 p-5 text-[13px]">
          <div className="flex items-center gap-2"><h3 className="text-sm font-semibold">payroll-run.tsx</h3><Badge variant="success" dot>Saved</Badge></div>
          <p className="text-muted-foreground">Drag the divider, or focus it and use the arrow keys. Shift moves in bigger steps; Home and End jump to the limits.</p>
          <pre className="rounded-lg bg-muted p-3 font-mono text-xs">{'export function runPayroll(month: string) {\n  return employees.map(pay);\n}'}</pre>
        </div>,
      ]}
    </SplitPane>
  );
}
