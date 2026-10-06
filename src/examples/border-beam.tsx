import { BorderBeam } from '@/components/ui/border-beam';
import { Button } from '@/components/ui/button';

export default function BorderBeamDemo() {
  return (
    <BorderBeam className="w-72">
      <div className="grid gap-3 p-6">
        <span className="text-xs font-medium text-primary">Most popular</span>
        <p className="text-3xl font-semibold tracking-tight">₹499<span className="text-sm font-normal text-muted-foreground"> /seat</span></p>
        <p className="text-sm text-muted-foreground">Payroll, leave and attendance for growing teams.</p>
        <Button>Start free trial</Button>
      </div>
    </BorderBeam>
  );
}
