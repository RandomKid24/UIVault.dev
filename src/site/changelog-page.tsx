import * as React from 'react';
import { Badge } from '@/components/ui/badge';
import { Segmented } from '@/components/ui/segmented';
import { blocks, components } from '@/registry';
import releases from '@/registry/changelog.json';
import { Link } from './router';

type Kind = 'added' | 'changed' | 'fixed';
const kindBadge = { added: 'success', changed: 'info', fixed: 'warning' } as const;

/** A component or block as a chip that opens its docs page. */
function Chip({ slug }: { slug: string }) {
  const isBlock = slug.startsWith('block:');
  const item = isBlock ? blocks.find((b) => b.slug === slug.slice(6)) : components.find((c) => c.slug === slug);
  if (!item) return null;
  return (
    <Link
      to={isBlock ? `/blocks/${item.slug}` : `/components/${item.slug}`}
      className="inline-flex items-center gap-1 rounded-full border bg-card px-2.5 py-0.5 text-xs font-medium text-foreground/90 outline-none transition-colors hover:border-primary/40 hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring/50"
    >
      {isBlock && <span className="text-[10px] uppercase tracking-wide text-muted-foreground">Block</span>}
      {item.name}
    </Link>
  );
}

export function ChangelogPage() {
  const [filter, setFilter] = React.useState<'all' | Kind>('all');
  return (
    <article className="max-w-3xl">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Changelog</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        What changed in each release. Click a component or block to open it.
      </p>
      <div className="mt-6">
        <Segmented
          value={filter}
          onValueChange={setFilter}
          options={[{ value: 'all', label: 'Everything' }, { value: 'added', label: 'Added' }, { value: 'changed', label: 'Changed' }]}
        />
      </div>

      <ol className="mt-10 grid gap-12">
        {releases.map((r, i) => {
          const entries = (r.entries as { kind: Kind; text: string; slugs?: string[] }[]).filter((e) => filter === 'all' || e.kind === filter);
          if (!entries.length) return null;
          return (
            <li key={r.version} id={`v${r.version}`} className="relative grid gap-4 sm:grid-cols-[8.5rem_1fr] sm:gap-8">
              <div className="sm:sticky sm:top-20 sm:self-start">
                <div className="flex items-center gap-2">
                  <a href={`#/changelog`} className="font-mono text-lg font-semibold">{r.version}</a>
                  {i === 0 && <Badge variant="primary">Latest</Badge>}
                </div>
                <time dateTime={r.date} className="text-xs text-muted-foreground">
                  {new Date(r.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                </time>
              </div>
              <div>
                <h2 className="text-lg font-semibold tracking-tight">{r.title}</h2>
                <ul className="mt-4 grid gap-4 border-l pl-5">
                  {entries.map((e, j) => (
                    <li key={j} className="relative grid gap-2">
                      <span className="absolute -left-[25px] top-2 size-2 rounded-full bg-border ring-4 ring-background" />
                      <p className="text-[14px] leading-relaxed">
                        <Badge variant={kindBadge[e.kind]} className="mr-2 align-middle capitalize">{e.kind}</Badge>
                        {e.text}
                      </p>
                      {e.slugs && (
                        <div className="flex flex-wrap gap-1.5">
                          {e.slugs.map((s) => <Chip key={s} slug={s} />)}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ol>
    </article>
  );
}
