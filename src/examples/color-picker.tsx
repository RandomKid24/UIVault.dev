import * as React from 'react';
import { ColorPicker } from '@/components/ui/color-picker';

export default function ColorPickerDemo() {
  const [c, setC] = React.useState('#2563eb');
  return (
    <div className="flex items-start gap-8">
      <ColorPicker value={c} onValueChange={setC} />
      <div className="grid h-24 w-32 place-items-center rounded-xl text-sm font-medium text-white transition-colors duration-300" style={{ background: c }}>Preview</div>
    </div>
  );
}
