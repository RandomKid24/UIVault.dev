import { TableOfContents } from '@/components/ui/table-of-contents';

// The ids must exist on the page. In your app they are your own headings.
export default function TableOfContentsDemo() {
  return (
    <div className="grid w-full max-w-md gap-6 sm:grid-cols-[1fr_10rem]">
      <div className="text-[13px] text-muted-foreground">
        {['Overview', 'Install', 'Usage', 'Props'].map((h) => <section key={h} id={`toc-${h}`} className="py-3"><h4 className="font-semibold text-foreground">{h}</h4><p>Scroll the page and the list highlights the section in view.</p></section>)}
      </div>
      <TableOfContents items={[{ id: 'toc-Overview', label: 'Overview' }, { id: 'toc-Install', label: 'Install' }, { id: 'toc-Usage', label: 'Usage' }, { id: 'toc-Props', label: 'Props', level: 2 }]} />
    </div>
  );
}
