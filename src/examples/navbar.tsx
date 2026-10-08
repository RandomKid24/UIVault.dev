import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/ui/navbar';

export default function NavbarDemo() {
  return (
    <div className="w-full overflow-hidden rounded-xl border bg-card">
      <Navbar
        className="static"
        brand={<><span className="grid size-6 place-items-center rounded-md bg-primary text-xs text-primary-foreground">B</span>Beforth</>}
        links={[
          { label: 'Products', href: '#products', active: true },
          { label: 'Solutions', href: '#solutions' },
          { label: 'Pricing', href: '#pricing' },
          { label: 'Docs', href: '#docs' },
        ]}
        actions={<><Button variant="ghost" size="sm">Sign in</Button><Button size="sm">Get started</Button></>}
      />
      <div className="grid h-24 place-items-center text-xs text-muted-foreground">Narrow the window to see the menu button.</div>
    </div>
  );
}
