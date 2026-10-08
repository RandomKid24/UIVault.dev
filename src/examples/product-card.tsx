import * as React from 'react';
import { Price, ProductCard } from '@/components/ui/product-card';
import { toast } from '@/components/ui/toast';

const art = (a: string, b: string, glyph: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240"><rect width="240" height="240" fill="${a}"/><circle cx="120" cy="120" r="62" fill="${b}"/><text x="120" y="136" font-family="sans-serif" font-size="44" text-anchor="middle" fill="white">${glyph}</text></svg>`)}`;

const products = [
  { id: 'p1', name: 'Wireless keyboard', category: 'Accessories', price: 3499, compareAt: 4999, rating: 4.6, reviews: 128, image: art('#e0e7ff', '#4f46e5', 'K') },
  { id: 'p2', name: 'Noise-cancelling headphones', category: 'Audio', price: 8999, rating: 4.8, reviews: 412, image: art('#fce7f3', '#db2777', 'H') },
  { id: 'p3', name: 'Standing desk mat', category: 'Office', price: 1299, compareAt: 1599, rating: 4.2, reviews: 57, image: art('#dcfce7', '#16a34a', 'M') },
];

export default function ProductCardDemo() {
  const [liked, setLiked] = React.useState<Record<string, boolean>>({ p2: true });
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {products.map(({ id, ...p }) => (
        <ProductCard key={id} {...p} wishlisted={!!liked[id]} onWishlist={(v) => setLiked({ ...liked, [id]: v })} onAdd={() => toast.success('Added to cart', p.name)} />
      ))}
      <p className="w-full text-center text-xs text-muted-foreground">Standalone price: <Price amount={2499} compareAt={3299} /></p>
    </div>
  );
}
