import { CheckIcon } from '@/components/ui/icons';
import { Badge } from '@/components/ui/badge';

export default function BadgeDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge>Default</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="success" dot>Approved</Badge>
      <Badge variant="warning" dot>Pending</Badge>
      <Badge variant="danger" dot>Rejected</Badge>
      <Badge variant="info">
        <CheckIcon /> Verified
      </Badge>
    </div>
  );
}
