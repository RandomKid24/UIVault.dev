import * as React from 'react';
import { Heatmap } from '@/components/ui/heatmap';

export default function HeatmapDemo() {
  // Deterministic pseudo-random so the demo looks the same every time.
  const values = React.useMemo(() => Array.from({ length: 26 * 7 }, (_, i) => {
    const x = Math.sin(i * 12.9898) * 43758.5453;
    const r = x - Math.floor(x);
    const weekend = i % 7 === 0 || i % 7 === 6;
    return r < (weekend ? 0.6 : 0.2) ? 0 : Math.floor(r * 12);
  }), []);
  return <Heatmap values={values} unit="check-ins" />;
}
