import * as React from 'react';
import { FileManager, type FileItem } from '@/components/ui/file-manager';

const tree: Record<string, FileItem[]> = {
  '': [
    { id: 'hr', name: 'HR', type: 'folder', modified: '07 Oct' },
    { id: 'fin', name: 'Finance', type: 'folder', modified: '05 Oct' },
    { id: 'brand', name: 'Brand assets', type: 'folder', modified: '28 Sep' },
    { id: 'readme', name: 'Welcome.pdf', type: 'file', size: 482000, modified: '01 Sep' },
  ],
  hr: [
    { id: 'policy', name: 'Leave policy 2026.pdf', type: 'file', size: 910000, modified: '06 Oct' },
    { id: 'offer', name: 'Offer letter template.docx', type: 'file', size: 64000, modified: '02 Oct' },
    { id: 'org', name: 'Org chart.png', type: 'image', size: 1840000, modified: '30 Sep' },
  ],
  fin: [
    { id: 'p', name: 'Payroll September.xlsx', type: 'file', size: 233000, modified: '05 Oct' },
    { id: 'inv', name: 'Invoices', type: 'folder', modified: '03 Oct' },
  ],
  brand: [
    { id: 'logo', name: 'Logo.png', type: 'image', size: 54000, modified: '12 Sep' },
    { id: 'guide', name: 'Brand guide.pdf', type: 'file', size: 5200000, modified: '12 Sep' },
  ],
  inv: [{ id: 'i1', name: 'INV-204.pdf', type: 'file', size: 88000, modified: '03 Oct' }],
};

export default function FileManagerDemo() {
  const [trail, setTrail] = React.useState<{ id: string; name: string }[]>([]);
  const here = trail.length ? trail[trail.length - 1].id : '';
  return (
    <FileManager
      className="max-w-xl"
      path={['Files', ...trail.map((t) => t.name)]}
      items={tree[here] ?? []}
      onNavigate={(d) => setTrail(trail.slice(0, d))}
      onOpen={(it) => it.type === 'folder' && setTrail([...trail, { id: it.id, name: it.name }])}
    />
  );
}
