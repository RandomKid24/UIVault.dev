import * as React from 'react';
import { RichTextEditor } from '@/components/ui/rich-text-editor';

export default function RichTextEditorDemo() {
  const [html, setHtml] = React.useState('<p>Quarterly review notes: <b>on track</b> for the October release.</p><ul><li>Ship the reports block</li><li>Review hiring plan</li></ul>');
  return (
    <div className="grid w-full max-w-xl gap-3">
      <RichTextEditor value={html} onChange={setHtml} />
      <pre className="overflow-x-auto rounded-lg bg-muted p-3 font-mono text-[11px] text-muted-foreground">{html}</pre>
    </div>
  );
}
