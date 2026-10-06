import { Marquee } from '@/components/ui/marquee';

const brands = ['Acme', 'Northwind', 'Globex', 'Initech', 'Umbrella', 'Hooli', 'Stark'];

export default function MarqueeDemo() {
  return (
    <div className="grid w-full gap-4">
      <Marquee>
        {brands.map((b) => <span key={b} className="text-lg font-semibold tracking-tight text-muted-foreground">{b}</span>)}
      </Marquee>
      <Marquee reverse speed={40}>
        {brands.map((b) => <span key={b} className="rounded-full border px-4 py-1.5 text-sm">{b}</span>)}
      </Marquee>
    </div>
  );
}
