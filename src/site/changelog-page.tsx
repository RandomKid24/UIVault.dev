import { VersionLog, type VersionRelease } from '@/components/ui/version-log';
import { blocks, components } from '@/registry';
import releases from '@/registry/changelog.json';
import { Link } from './router';

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

const data: VersionRelease[] = (releases as { version: string; date: string; title: string; entries: { kind: VersionRelease['entries'][number]['kind']; text: string; slugs?: string[] }[] }[]).map((r) => ({
  version: r.version,
  date: r.date,
  title: r.title,
  entries: r.entries.map((e) => ({
    kind: e.kind,
    text: e.text,
    extra: e.slugs && <div className="flex flex-wrap gap-1.5">{e.slugs.map((s) => <Chip key={s} slug={s} />)}</div>,
  })),
}));

export function ChangelogPage() {
  return (
    <article className="max-w-3xl">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Changelog</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">What changed in each version. Click a component or block to open it.</p>
      <VersionLog className="mt-6" releases={data} openCount={2} />
    </article>
  );
}
