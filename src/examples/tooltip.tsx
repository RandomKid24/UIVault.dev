import { Bell, Pencil, Save, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { InfoTip, Tooltip, TooltipProvider, TruncatedText } from '@/components/ui/tooltip';

export default function TooltipDemo() {
  return (
    <TooltipProvider>
      <div className="grid justify-items-center gap-5">
        <div className="flex gap-2">
          <Tooltip content="Edit"><Button variant="outline" size="icon"><Pencil /></Button></Tooltip>
          <Tooltip content="Share" side="bottom" arrow><Button variant="outline" size="icon"><Share2 /></Button></Tooltip>
          <Tooltip content="Notifications" side="right"><Button variant="outline" size="icon"><Bell /></Button></Tooltip>
          <Tooltip content="Save changes" shortcut={['⌘', 'S']}><Button variant="outline" size="icon"><Save /></Button></Tooltip>
        </div>
        <div className="flex items-center gap-1.5 text-sm font-medium">
          Net 30 terms
          <InfoTip title="Payment terms" content="Invoice is due 30 days after it is issued. Late fees start on day 31." />
        </div>
        <div className="w-44 rounded-md border px-3 py-2 text-sm">
          <TruncatedText>Quarterly vendor reconciliation report, final draft</TruncatedText>
        </div>
      </div>
    </TooltipProvider>
  );
}
