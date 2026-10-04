import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export default function SwitchDemo() {
  return (
    <div className="grid gap-3">
      <div className="flex items-center gap-3">
        <Switch id="s1" defaultChecked />
        <Label htmlFor="s1">Auto-approve short leaves</Label>
      </div>
      <div className="flex items-center gap-3">
        <Switch id="s2" />
        <Label htmlFor="s2">Weekly digest</Label>
      </div>
      <div className="flex items-center gap-3">
        <Switch id="s3" disabled />
        <Label htmlFor="s3">Disabled</Label>
      </div>
    </div>
  );
}
