import * as React from 'react';
import { ScrollProgress } from '@/components/ui/scroll-progress';

export default function ScrollProgressDemo() {
  const box = React.useRef<HTMLDivElement>(null);
  return (
    <div ref={box} className="h-48 w-full max-w-md overflow-auto rounded-lg border">
      <ScrollProgress target={box} />
      <div className="space-y-3 p-4 text-sm text-muted-foreground">
        {Array.from({ length: 14 }, (_, i) => <p key={i}>Scroll this box. The bar at the top tracks your position, paragraph {i + 1}.</p>)}
      </div>
    </div>
  );
}
