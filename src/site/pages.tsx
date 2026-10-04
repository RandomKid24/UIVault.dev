import * as React from 'react';
import { ArrowRight, Blocks, Check, Github, Layers, Palette, Package } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Alert } from '@/components/ui/alert';
import { BarChart, Sparkline } from '@/components/ui/charts';
import { StatCard } from '@/components/ui/stat-card';
import { Avatar } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Users, IndianRupee } from 'lucide-react';
import { blocks, categories, components, globalCss, utilsSource } from '@/registry';
import { cn } from '@/lib/utils';
import { Command, CodeBlock } from './code';
import { REPO } from './layout';
import { Link } from './router';
import { Preview } from './preview';

const h1 = 'text-3xl font-semibold tracking-tight sm:text-4xl';
const h2 = 'mt-12 mb-4 scroll-mt-20 text-xl font-semibold tracking-tight';

/* ------------------------------------------------------------------ home */

function HeroCollage() {
  return (
    <div className="pointer-events-none relative mx-auto mt-14 w-full max-w-4xl select-none text-left" aria-hidden>
      <div className="absolute -inset-x-6 -top-6 bottom-0 -z-10 rounded-[2rem] bg-[radial-gradient(60%_60%_at_50%_0%,color-mix(in_srgb,var(--primary)_14%,transparent),transparent)]" />
      <div className="rounded-2xl border bg-card p-3 shadow-xl shadow-black/5 sm:p-4">
        <div className="grid gap-3 sm:grid-cols-3">
          <StatCard label="Headcount" value="142" delta={4.2} icon={<Users />} chart={<Sparkline data={[3, 4, 4, 5, 6, 6, 8, 9]} />} />
          <StatCard label="Revenue" value="₹48.2L" delta={12.5} icon={<IndianRupee />} chart={<Sparkline data={[2, 3, 2.5, 4, 5, 4.6, 6, 7]} className="text-success" />} />
          <Card className="hidden flex-col justify-between gap-3 p-5 sm:flex">
            <span className="text-[13px] font-medium text-muted-foreground">Leave balance</span>
            <div className="grid gap-2.5">
              <Progress value={70} /><Progress value={45} tone="success" /><Progress value={20} tone="warning" />
            </div>
          </Card>
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-5">
          <Card className="p-5 sm:col-span-3">
            <p className="mb-3 text-sm font-semibold">Leads per month</p>
            <BarChart height={110} data={[{ label: 'May', value: 38 }, { label: 'Jun', value: 52 }, { label: 'Jul', value: 47 }, { label: 'Aug', value: 66 }, { label: 'Sep', value: 59 }, { label: 'Oct', value: 81 }]} />
          </Card>
          <Card className="grid content-start gap-3 p-5 sm:col-span-2">
            <p className="text-sm font-semibold">Approvals</p>
            {[['Diya Rao', 'Casual leave', 'success'], ['Rohan Das', 'Sick leave', 'warning'], ['Isha Nair', 'Earned leave', 'info']].map(([n, t, v]) => (
              <div key={n} className="flex items-center gap-2.5">
                <Avatar name={n!} size="sm" />
                <div className="grid flex-1 leading-tight"><span className="text-[13px] font-medium">{n}</span><span className="text-xs text-muted-foreground">{t}</span></div>
                <Badge variant={v as 'success' | 'warning' | 'info'} dot>{v === 'success' ? 'Done' : 'Open'}</Badge>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}

export function Home() {
  const features = [
    { icon: Package, title: 'You own the code', body: 'Each component is one file. Copy it, edit it. No package to upgrade or fight.' },
    { icon: Palette, title: 'Themed with CSS variables', body: 'Change --primary once and everything follows, in light and dark.' },
    { icon: Layers, title: 'Radix underneath', body: 'Dialogs, menus, selects and tabs get focus handling and keyboard support from Radix.' },
    { icon: Blocks, title: 'Real screens included', body: 'HRMS and marketing blocks you can drop in: directory, approvals, pipeline, campaign report.' },
  ];
  return (
    <>
      <section className="mx-auto max-w-[88rem] px-4 pb-16 pt-16 text-center sm:px-6 sm:pt-24">
        <Badge variant="outline" className="mb-5 py-1 pl-1 pr-3">
          <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-primary-foreground">New</span>
          {components.length} components and {blocks.length} blocks
        </Badge>
        <h1 className="mx-auto max-w-3xl text-balance text-4xl font-semibold tracking-tight sm:text-6xl sm:leading-[1.05]">
          Slim React components you copy into your project
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-pretty text-base text-muted-foreground sm:text-lg">
          Dense, quiet UI for dashboards and internal tools. Built on Radix and Tailwind, with ready-made HRMS and marketing screens.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg"><Link to="/docs">Get started <ArrowRight /></Link></Button>
          <Button asChild size="lg" variant="outline"><Link to="/components">Browse components</Link></Button>
        </div>
        <HeroCollage />
      </section>

      <section className="border-y bg-muted/40">
        <div className="mx-auto grid max-w-[88rem] gap-8 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="grid content-start gap-2">
              <span className="grid size-9 place-items-center rounded-lg border bg-background text-primary"><f.icon className="size-4" /></span>
              <h3 className="mt-1 text-sm font-semibold">{f.title}</h3>
              <p className="text-[13px] leading-relaxed text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[88rem] px-4 py-16 sm:px-6">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Blocks</h2>
            <p className="mt-1 text-[13px] text-muted-foreground">Whole screens built from the components.</p>
          </div>
          <Button asChild variant="ghost" size="sm"><Link to="/blocks">All blocks <ArrowRight /></Link></Button>
        </div>
        <BlockGrid items={blocks.slice(0, 3)} />
      </section>

      <Footer />
    </>
  );
}

function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-[88rem] flex-wrap items-center justify-between gap-3 px-4 py-6 text-[13px] text-muted-foreground sm:px-6">
        <span>UIVault. MIT licensed.</span>
        <a href={REPO} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"><Github className="size-4" /> Source on GitHub</a>
      </div>
    </footer>
  );
}

/* ----------------------------------------------------------- getting started */

const ACCENTS = [
  { name: 'Blue', value: '#2563eb', ring: '#3b82f6', tint: '#eff6ff', fg: '#1d4ed8' },
  { name: 'Violet', value: '#7c3aed', ring: '#8b5cf6', tint: '#f5f3ff', fg: '#6d28d9' },
  { name: 'Emerald', value: '#059669', ring: '#10b981', tint: '#ecfdf5', fg: '#047857' },
  { name: 'Rose', value: '#e11d48', ring: '#f43f5e', tint: '#fff1f2', fg: '#be123c' },
  { name: 'Slate', value: '#0f172a', ring: '#475569', tint: '#f1f5f9', fg: '#0f172a' },
];

function AccentPicker() {
  const [active, setActive] = React.useState('Blue');
  const apply = (a: (typeof ACCENTS)[number]) => {
    setActive(a.name);
    const s = document.documentElement.style;
    if (a.name === 'Blue') ['--primary', '--ring', '--accent', '--accent-foreground'].forEach((k) => s.removeProperty(k));
    else {
      s.setProperty('--primary', a.value);
      s.setProperty('--ring', a.ring);
      s.setProperty('--accent', a.tint);
      s.setProperty('--accent-foreground', a.fg);
    }
  };
  return (
    <div className="flex flex-wrap items-center gap-2">
      {ACCENTS.map((a) => (
        <button
          key={a.name}
          onClick={() => apply(a)}
          aria-label={a.name}
          aria-pressed={active === a.name}
          className={cn('grid size-8 place-items-center rounded-full border-2 border-transparent outline-none transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-ring/50 aria-pressed:border-foreground/70')}
          style={{ background: a.value }}
        >
          {active === a.name && <Check className="size-3.5 text-white" strokeWidth={3} />}
        </button>
      ))}
      <span className="ml-1 text-xs text-muted-foreground">Accent applies to this tab only.</span>
    </div>
  );
}

export function GettingStarted() {
  const step = (n: number, title: string) => (
    <h2 className={h2}>
      <span className="mr-2.5 inline-grid size-6 place-items-center rounded-full bg-secondary align-middle text-xs font-semibold text-muted-foreground">{n}</span>
      {title}
    </h2>
  );
  return (
    <article className="max-w-3xl">
      <Breadcrumb className="mb-4" items={[{ label: 'Docs', href: '#/docs' }, { label: 'Getting started' }]} />
      <h1 className={h1}>Getting started</h1>
      <p className="mt-3 text-muted-foreground">
        UIVault is not an npm package. You copy the files you need into your own project, so there is nothing to version-lock. Setup takes five minutes the first time.
      </p>

      {step(1, 'Install Tailwind 4')}
      <p className="mb-3 text-[13px] text-muted-foreground">With Vite. Other bundlers work too, see the Tailwind docs.</p>
      <Command>npm i tailwindcss @tailwindcss/vite</Command>

      {step(2, 'Install the shared helpers')}
      <Command>npm i clsx tailwind-merge class-variance-authority lucide-react</Command>

      {step(3, 'Add the cn helper')}
      <p className="mb-3 text-[13px] text-muted-foreground">Merges class names and lets your overrides win over defaults.</p>
      <CodeBlock code={utilsSource} title="src/lib/utils.ts" />

      {step(4, 'Add the theme')}
      <p className="mb-3 text-[13px] text-muted-foreground">
        Paste this into your global CSS. Colors live in variables, so a theme is a handful of lines. Dark mode switches when the <code className="rounded bg-secondary px-1 py-0.5 font-mono text-xs">dark</code> class is on <code className="rounded bg-secondary px-1 py-0.5 font-mono text-xs">&lt;html&gt;</code>.
      </p>
      <CodeBlock code={globalCss} title="src/index.css" maxHeight={320} />

      {step(5, 'Set up the @ alias')}
      <p className="mb-3 text-[13px] text-muted-foreground">Components import each other and the helper through <code className="rounded bg-secondary px-1 py-0.5 font-mono text-xs">@/</code>.</p>
      <CodeBlock title="vite.config.ts" code={`import path from 'path';\nimport tailwindcss from '@tailwindcss/vite';\n\nexport default defineConfig({\n  plugins: [react(), tailwindcss()],\n  resolve: { alias: { '@': path.resolve(__dirname, 'src') } },\n});`} />

      {step(6, 'Copy a component')}
      <p className="text-[13px] text-muted-foreground">
        Open any <Link to="/components" className="font-medium text-primary hover:underline">component page</Link>, install the packages it lists, and paste the file into <code className="rounded bg-secondary px-1 py-0.5 font-mono text-xs">src/components/ui</code>.
      </p>

      <h2 className={h2}>Theming</h2>
      <p className="mb-4 text-[13px] text-muted-foreground">
        Every color is a variable. To rebrand, change <code className="rounded bg-secondary px-1 py-0.5 font-mono text-xs">--primary</code>, <code className="rounded bg-secondary px-1 py-0.5 font-mono text-xs">--ring</code> and the two accent values. Try it:
      </p>
      <Preview title="Theme preview" code={`:root {\n  --primary: #7c3aed;\n  --ring: #8b5cf6;\n  --accent: #f5f3ff;\n  --accent-foreground: #6d28d9;\n}`}>
        <div className="grid w-full max-w-md gap-5">
          <AccentPicker />
          <div className="flex flex-wrap gap-2">
            <Button>Primary</Button><Button variant="outline">Outline</Button><Badge variant="primary">Badge</Badge>
          </div>
          <Progress value={66} />
        </div>
      </Preview>

      <Alert variant="info" title="Why not an npm package?" className="mt-12">
        Dashboards need small changes everywhere: a denser row, a different empty state. Owning the file beats wrapping a library with overrides.
      </Alert>
    </article>
  );
}

/* ------------------------------------------------------------ components */

export function ComponentsIndex() {
  return (
    <div>
      <h1 className={h1}>Components</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">{components.length} components. Each is a single file with a live example.</p>
      {categories.map((cat) => (
        <section key={cat} className="mt-10">
          <h2 className="mb-3 text-sm font-semibold text-muted-foreground">{cat}</h2>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {components.filter((c) => c.category === cat).map((c) => (
              <Link key={c.slug} to={`/components/${c.slug}`} className="group rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring/50">
                <Card hoverable className="h-full p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">{c.name}</p>
                    <ArrowRight className="size-4 text-muted-foreground/0 transition-all group-hover:translate-x-0.5 group-hover:text-muted-foreground" />
                  </div>
                  <p className="mt-1 text-[13px] text-muted-foreground">{c.description}</p>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function PrevNext<T extends { slug: string; name: string }>({ list, slug, base }: { list: T[]; slug: string; base: string }) {
  const i = list.findIndex((x) => x.slug === slug);
  const prev = list[i - 1];
  const next = list[i + 1];
  return (
    <div className="mt-16 flex items-center justify-between gap-3 border-t pt-6">
      {prev ? <Button asChild variant="outline"><Link to={`${base}/${prev.slug}`}>← {prev.name}</Link></Button> : <span />}
      {next ? <Button asChild variant="outline"><Link to={`${base}/${next.slug}`}>{next.name} →</Link></Button> : <span />}
    </div>
  );
}

export function ComponentPage({ slug }: { slug: string }) {
  const c = components.find((x) => x.slug === slug);
  if (!c) return <NotFound />;
  const packages = ['clsx', 'tailwind-merge', 'class-variance-authority', ...c.deps];
  const needs = c.requires.map((r) => components.find((x) => x.slug === r)!);
  return (
    <article className="max-w-4xl">
      <Breadcrumb className="mb-4" items={[{ label: 'Components', href: '#/components' }, { label: c.category }, { label: c.name }]} />
      <h1 className={h1}>{c.name}</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">{c.description}</p>

      <div className="mt-8">
        <Preview title={`examples/${c.slug}.tsx`} code={c.demoSource}><c.Demo /></Preview>
      </div>

      <h2 className={h2}>Install</h2>
      <p className="mb-3 text-[13px] text-muted-foreground">Packages (skip any you already have):</p>
      <Command>{`npm i ${[...new Set(packages)].join(' ')}`}</Command>
      <p className="mb-3 mt-6 text-[13px] text-muted-foreground">
        Copy this file to <code className="rounded bg-secondary px-1 py-0.5 font-mono text-xs">src/{c.path}</code>
        {needs.length > 0 && (
          <>
            , along with {needs.map((n, i) => (
              <React.Fragment key={n.slug}>{i > 0 && ', '}<Link to={`/components/${n.slug}`} className="font-medium text-primary hover:underline">{n.name}</Link></React.Fragment>
            ))}
          </>
        )}
        .
      </p>
      <CodeBlock code={c.source} title={c.path} maxHeight={420} />

      <PrevNext list={components} slug={slug} base="/components" />
    </article>
  );
}

/* ---------------------------------------------------------------- blocks */

function BlockGrid({ items }: { items: typeof blocks }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {items.map((b) => (
        <Link key={b.slug} to={`/blocks/${b.slug}`} className="group rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring/50">
          <Card hoverable className="overflow-hidden">
            <div className="pointer-events-none relative h-56 overflow-hidden border-b bg-muted/50" aria-hidden>
              <div className="absolute left-0 top-0 w-[200%] origin-top-left scale-50 p-6"><b.Demo /></div>
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-card to-transparent" />
            </div>
            <div className="flex items-start justify-between gap-3 p-4">
              <div>
                <p className="text-sm font-semibold">{b.name}</p>
                <p className="mt-0.5 text-[13px] text-muted-foreground">{b.description}</p>
              </div>
              <Badge variant="outline">{b.module}</Badge>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}

export function BlocksIndex() {
  return (
    <div>
      <h1 className={h1}>Blocks</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">Full screens for HR and marketing tools. They use mock data, so swap in your own API calls.</p>
      <div className="mt-8"><BlockGrid items={blocks} /></div>
    </div>
  );
}

export function BlockPage({ slug }: { slug: string }) {
  const b = blocks.find((x) => x.slug === slug);
  if (!b) return <NotFound />;
  return (
    <article>
      <Breadcrumb className="mb-4" items={[{ label: 'Blocks', href: '#/blocks' }, { label: b.module }, { label: b.name }]} />
      <h1 className={h1}>{b.name}</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">{b.description}</p>
      <div className="mt-8"><Preview bleed title={b.path} code={b.source}><b.Demo /></Preview></div>

      <h2 className={h2}>Uses</h2>
      <p className="mb-3 text-[13px] text-muted-foreground">Copy these components first, then paste the block.</p>
      <div className="flex flex-wrap gap-2">
        {b.uses.map((u) => {
          const c = components.find((x) => x.slug === u);
          return c ? (
            <Link key={u} to={`/components/${u}`}><Badge variant="outline" className="px-2.5 py-1 text-xs transition-colors hover:bg-secondary">{c.name}</Badge></Link>
          ) : null;
        })}
      </div>
      <PrevNext list={blocks} slug={slug} base="/blocks" />
    </article>
  );
}

export function NotFound() {
  return (
    <div className="grid place-items-center gap-3 py-24 text-center">
      <p className="text-4xl font-semibold">404</p>
      <p className="text-muted-foreground">That page does not exist.</p>
      <Button asChild variant="outline"><Link to="/components">See all components</Link></Button>
    </div>
  );
}
