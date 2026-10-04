import { Bell, Pencil, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipProvider } from '@/components/ui/tooltip';

export default function TooltipDemo() {
  return (
    <TooltipProvider>
      <div className="flex gap-2">
        <Tooltip content="Edit"><Button variant="outline" size="icon"><Pencil /></Button></Tooltip>
        <Tooltip content="Share" side="bottom"><Button variant="outline" size="icon"><Share2 /></Button></Tooltip>
        <Tooltip content="Notifications" side="right"><Button variant="outline" size="icon"><Bell /></Button></Tooltip>
      </div>
    </TooltipProvider>
  );
}
