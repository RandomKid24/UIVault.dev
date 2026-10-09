import * as React from 'react';
import { SignaturePad } from '@/components/ui/signature-pad';

export default function SignaturePadDemo() {
  const [png, setPng] = React.useState<string | null>(null);
  return (
    <div className="grid w-full max-w-md gap-3">
      <SignaturePad onChange={setPng} />
      <p className="text-xs text-muted-foreground">{png ? `Captured, ${Math.round(png.length / 1024)} KB PNG.` : 'Nothing signed yet.'}</p>
    </div>
  );
}
