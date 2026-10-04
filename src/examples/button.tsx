import { ArrowRight, Download, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ButtonDemo() {
  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-center gap-2">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Delete</Button>
        <Button variant="link">Link</Button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button size="xs">Extra small</Button>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
        <Button size="icon" variant="outline" aria-label="Add">
          <Plus />
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button>
          <Download /> Export
        </Button>
        <Button variant="outline">
          Continue <ArrowRight />
        </Button>
        <Button variant="destructive" size="sm">
          <Trash2 /> Remove
        </Button>
        <Button loading>Saving</Button>
        <Button disabled>Disabled</Button>
      </div>
    </div>
  );
}
