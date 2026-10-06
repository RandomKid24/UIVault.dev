import * as React from 'react';
import { ArrowRight, Check, Download, Plus, Trash2, Zap } from 'lucide-react';
import { Alert } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CopyButton } from '@/components/ui/copy-button';

interface Item {
  title: string;
  code: string;
  node: React.ReactNode;
}

const B = Button;
const button: Item[] = [
  { title: 'Primary', code: '<Button>Primary</Button>', node: <B>Primary</B> },
  { title: 'Secondary', code: '<Button variant="secondary">Secondary</Button>', node: <B variant="secondary">Secondary</B> },
  { title: 'Outline', code: '<Button variant="outline">Outline</Button>', node: <B variant="outline">Outline</B> },
  { title: 'Ghost', code: '<Button variant="ghost">Ghost</Button>', node: <B variant="ghost">Ghost</B> },
  { title: 'Destructive', code: '<Button variant="destructive">Delete</Button>', node: <B variant="destructive">Delete</B> },
  { title: 'Link', code: '<Button variant="link">Link</Button>', node: <B variant="link">Link</B> },
  { title: 'Soft', code: '<Button variant="soft">Soft</Button>', node: <B variant="soft">Soft</B> },
  { title: 'Dark', code: '<Button variant="dark">Dark</Button>', node: <B variant="dark">Dark</B> },
  { title: 'Glow', code: '<Button variant="glow"><Zap /> Glow</Button>', node: <B variant="glow"><Zap /> Glow</B> },
  { title: 'Shine', code: '<Button variant="shine">Shine</Button>', node: <B variant="shine">Shine</B> },
  { title: 'Brutal', code: '<Button variant="brutal">Brutal</Button>', node: <B variant="brutal">Brutal</B> },
  { title: '3D press', code: '<Button variant="raised">3D press</Button>', node: <B variant="raised">3D press</B> },
  { title: 'Neon outline', code: '<Button variant="outlineGlow">Neon outline</Button>', node: <B variant="outlineGlow">Neon outline</B> },
  { title: 'Pill', code: '<Button shape="pill">Get started</Button>', node: <B shape="pill">Get started</B> },
  { title: 'Pill outline', code: '<Button shape="pill" variant="outline">Learn more</Button>', node: <B shape="pill" variant="outline">Learn more</B> },
  { title: 'Icon only', code: '<Button size="icon" variant="outline" aria-label="Add"><Plus /></Button>', node: <B size="icon" variant="outline" aria-label="Add"><Plus /></B> },
  { title: 'Leading icon', code: '<Button><Download /> Export</Button>', node: <B><Download /> Export</B> },
  { title: 'Trailing icon', code: '<Button variant="outline">Continue <ArrowRight /></Button>', node: <B variant="outline">Continue <ArrowRight /></B> },
  { title: 'Danger small', code: '<Button variant="destructive" size="sm"><Trash2 /> Remove</Button>', node: <B variant="destructive" size="sm"><Trash2 /> Remove</B> },
  { title: 'Extra small', code: '<Button size="xs">Extra small</Button>', node: <B size="xs">Extra small</B> },
  { title: 'Small', code: '<Button size="sm">Small</Button>', node: <B size="sm">Small</B> },
  { title: 'Large', code: '<Button size="lg">Large</Button>', node: <B size="lg">Large</B> },
  { title: 'Loading', code: '<Button loading>Saving</Button>', node: <B loading>Saving</B> },
  { title: 'Disabled', code: '<Button disabled>Disabled</Button>', node: <B disabled>Disabled</B> },
];

const badge: Item[] = (['default', 'outline', 'primary', 'success', 'warning', 'danger', 'info'] as const).map((v) => ({
  title: v[0].toUpperCase() + v.slice(1),
  code: v === 'default' ? '<Badge>Default</Badge>' : `<Badge variant="${v}">${v[0].toUpperCase() + v.slice(1)}</Badge>`,
  node: <Badge variant={v}>{v[0].toUpperCase() + v.slice(1)}</Badge>,
})).concat([
  { title: 'With dot', code: '<Badge variant="success" dot>Approved</Badge>', node: <Badge variant="success" dot>Approved</Badge> },
  { title: 'With icon', code: '<Badge variant="info"><Check /> Verified</Badge>', node: <Badge variant="info"><Check /> Verified</Badge> },
]);

const alert: Item[] = [
  { title: 'Info', code: '<Alert variant="info" title="Heads up">Payroll closes on the 25th.</Alert>', node: <Alert variant="info" title="Heads up">Payroll closes on the 25th.</Alert> },
  { title: 'Success', code: '<Alert variant="success" title="Saved">Your changes are live.</Alert>', node: <Alert variant="success" title="Saved">Your changes are live.</Alert> },
  { title: 'Warning', code: '<Alert variant="warning" title="Almost out">2 leave days left.</Alert>', node: <Alert variant="warning" title="Almost out">2 leave days left.</Alert> },
  { title: 'Danger', code: '<Alert variant="danger" title="Failed">Could not reach the server.</Alert>', node: <Alert variant="danger" title="Failed">Could not reach the server.</Alert> },
];

const galleries: Record<string, { items: Item[]; cols: string }> = {
  button: { items: button, cols: 'sm:grid-cols-2 lg:grid-cols-3' },
  badge: { items: badge, cols: 'sm:grid-cols-2 lg:grid-cols-3' },
  alert: { items: alert, cols: 'sm:grid-cols-2' },
};

export const hasGallery = (slug: string) => slug in galleries;

/** One card per design: its own preview and its own code. */
export function Gallery({ slug }: { slug: string }) {
  const { items, cols } = galleries[slug];
  return (
    <div className={`grid gap-4 ${cols}`}>
      {items.map((it) => (
        <figure key={it.title} className="group overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-md">
          <div className="flex h-28 items-center justify-center bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:14px_14px] p-4">{it.node}</div>
          <figcaption className="flex items-center gap-2 border-t bg-muted/50 py-2 pl-3 pr-2">
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium">{it.title}</p>
              <code className="block truncate font-mono text-[11px] text-muted-foreground" title={it.code}>{it.code}</code>
            </div>
            <CopyButton value={it.code} className="size-7 shrink-0" />
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
