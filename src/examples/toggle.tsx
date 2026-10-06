import * as React from 'react';
import { BookmarkIcon, HeartIcon, StarIcon } from '@/components/ui/icons';
import { Toggle } from '@/components/ui/toggle';

export default function ToggleDemo() {
  const [a, setA] = React.useState(true);
  const [b, setB] = React.useState(false);
  const [c, setC] = React.useState(false);
  return (
    <div className="flex items-center gap-2">
      <Toggle pressed={a} onPressedChange={setA} size="icon" aria-label="Favourite"><HeartIcon className={a ? 'fill-current' : ''} /></Toggle>
      <Toggle variant="outline" pressed={b} onPressedChange={setB} size="icon" aria-label="Star"><StarIcon className={b ? 'fill-current' : ''} /></Toggle>
      <Toggle variant="outline" pressed={c} onPressedChange={setC}><BookmarkIcon className={c ? 'fill-current' : ''} /> Save</Toggle>
    </div>
  );
}
