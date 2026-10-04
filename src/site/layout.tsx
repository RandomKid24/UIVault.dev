import * as React from 'react';
import { Blocks, BookOpen, Command as CommandIcon, Github, LayoutGrid, Menu, Moon, Search, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Kbd } from '@/components/ui/kbd';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/dialog';
import { Toaster } from '@/components/ui/toast';
import { Tooltip, TooltipProvider } from '@/components/ui/tooltip';
import { blocks, categories, components } from '@/registry';
import { cn } from '@/lib/utils';
import { Link, go } from './router';

export const REPO = 'https://github.com/RandomKid24/UIVault.dev';

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
      <span className="grid size-6 place-items-center rounded-md bg-primary text-primary-foreground">
        <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
          <path d="M6 5v7a6 6 0 0 0 12 0V5" />
        </svg>
      </span>
      UIVault
    </Link>
  );
}

function useTheme() {
  const [dark, setDark] = React.useState(() => document.documentElement.classList.contains('dark'));
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    try {
      localStorage.setItem('uivault-theme', next ? 'dark' : 'light');
    } catch {
      /* storage can be blocked */
    }
  };
  return { dark, toggle };
}

function SearchPalette({ open, setOpen }: { open: boolean; setOpen: (o: boolean) => void }) {
  const pick = (to: string) => {
    setOpen(false);
    go(to);
  };
  return (
    <CommandDialog open={open} onOpenChange={setOpen} label="Search components and blocks">
      <CommandInput placeholder="Search components and blocks..." />
      <CommandList>
        <CommandEmpty>Nothing matches that.</CommandEmpty>
        <CommandGroup heading="Pages">
          <CommandItem onSelect={() => pick('/docs')}><BookOpen /> Getting started</CommandItem>
          <CommandItem onSelect={() => pick('/components')}><LayoutGrid /> All components</CommandItem>
          <CommandItem onSelect={() => pick('/blocks')}><Blocks /> All blocks</CommandItem>
        </CommandGroup>
        <CommandGroup heading="Components">
          {components.map((c) => (
            <CommandItem key={c.slug} value={`${c.name} ${c.category} ${c.keywords.join(' ')}`} onSelect={() => pick(`/components/${c.slug}`)}>
              <CommandIcon /> {c.name}
              <span className="ml-auto text-xs text-muted-foreground">{c.category}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Blocks">
          {blocks.map((b) => (
            <CommandItem key={b.slug} value={`${b.name} ${b.module} block`} onSelect={() => pick(`/blocks/${b.slug}`)}>
              <Blocks /> {b.name}
              <span className="ml-auto text-xs text-muted-foreground">{b.module}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

export function SidebarNav({ path, onNavigate }: { path: string; onNavigate?: () => void }) {
  const item = (to: string, label: string) => (
    <Link
      key={to}
      to={to}
      onClick={onNavigate}
      className={cn(
        'block rounded-md px-2.5 py-1.5 text-[13px] transition-colors',
        path === to ? 'bg-accent font-medium text-accent-foreground' : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
      )}
    >
      {label}
    </Link>
  );
  const heading = (t: string) => <p className="mb-1.5 px-2.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/80">{t}</p>;
  return (
    <nav className="grid gap-6">
      <div>
        {heading('Start')}
        {item('/docs', 'Getting started')}
        {item('/components', 'All components')}
        {item('/blocks', 'All blocks')}
      </div>
      <div>
        {heading('Blocks')}
        {blocks.map((b) => item(`/blocks/${b.slug}`, b.name))}
      </div>
      {categories.map((cat) => (
        <div key={cat}>
          {heading(cat)}
          {components.filter((c) => c.category === cat).map((c) => item(`/components/${c.slug}`, c.name))}
        </div>
      ))}
    </nav>
  );
}

export function Shell({ path, docs, children }: { path: string; docs: boolean; children: React.ReactNode }) {
  const { dark, toggle } = useTheme();
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const navLink = (to: string, label: string, match: string) => (
    <Link
      to={to}
      className={cn('rounded-md px-2.5 py-1.5 text-[13px] font-medium transition-colors hover:text-foreground', path.startsWith(match) ? 'text-foreground' : 'text-muted-foreground')}
    >
      {label}
    </Link>
  );

  return (
    <TooltipProvider>
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-[88rem] items-center gap-4 px-4 sm:px-6">
          {docs && (
            <Button variant="ghost" size="icon-sm" className="lg:hidden" onClick={() => setMenuOpen(true)} aria-label="Open navigation">
              <Menu />
            </Button>
          )}
          <Logo />
          <nav className="ml-4 hidden items-center gap-1 md:flex">
            {navLink('/docs', 'Docs', '/docs')}
            {navLink('/components', 'Components', '/components')}
            {navLink('/blocks', 'Blocks', '/blocks')}
          </nav>
          <div className="ml-auto flex items-center gap-1.5">
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden h-8 w-56 items-center gap-2 rounded-md border bg-muted/60 px-2.5 text-[13px] text-muted-foreground transition-colors hover:bg-secondary sm:flex"
            >
              <Search className="size-3.5" /> Search
              <span className="ml-auto flex gap-0.5"><Kbd>Ctrl</Kbd><Kbd>K</Kbd></span>
            </button>
            <Button variant="ghost" size="icon-sm" className="sm:hidden" onClick={() => setSearchOpen(true)} aria-label="Search">
              <Search />
            </Button>
            <Tooltip content="GitHub">
              <Button asChild variant="ghost" size="icon-sm">
                <a href={REPO} target="_blank" rel="noreferrer" aria-label="GitHub"><Github /></a>
              </Button>
            </Tooltip>
            <Tooltip content={dark ? 'Light mode' : 'Dark mode'}>
              <Button variant="ghost" size="icon-sm" onClick={toggle} aria-label="Toggle theme">
                {dark ? <Sun /> : <Moon />}
              </Button>
            </Tooltip>
          </div>
        </div>
      </header>

      <SearchPalette open={searchOpen} setOpen={setSearchOpen} />
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent side="left" className="max-w-xs overflow-y-auto" aria-describedby={undefined}>
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <Logo />
          <SidebarNav path={path} onNavigate={() => setMenuOpen(false)} />
        </SheetContent>
      </Sheet>

      {docs ? (
        <div className="mx-auto flex max-w-[88rem] gap-10 px-4 sm:px-6">
          <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-52 shrink-0 overflow-y-auto py-8 pr-2 lg:block">
            <SidebarNav path={path} />
          </aside>
          <main className="min-w-0 flex-1 py-8 pb-24">{children}</main>
        </div>
      ) : (
        <main>{children}</main>
      )}
      <Toaster />
    </TooltipProvider>
  );
}
