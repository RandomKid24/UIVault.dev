import * as React from 'react';
import { Rating } from '@/components/ui/rating';

export default function RatingDemo() {
  const [v, setV] = React.useState(3);
  return (
    <div className="grid justify-items-center gap-3">
      <Rating value={v} onValueChange={setV} />
      <Rating value={4} className="[&_svg]:size-4" />
    </div>
  );
}
