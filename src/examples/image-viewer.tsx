import * as React from 'react';
import { ImageViewer, type ViewerImage } from '@/components/ui/image-viewer';

const art = (bg: string, fg: string, label: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><rect width="1200" height="800" fill="${bg}"/><circle cx="820" cy="300" r="190" fill="${fg}" opacity=".85"/><rect x="180" y="420" width="520" height="220" rx="24" fill="${fg}" opacity=".55"/><text x="60" y="110" font-family="sans-serif" font-size="56" fill="${fg}">${label}</text></svg>`)}`;

const images: ViewerImage[] = [
  { src: art('#e0e7ff', '#4338ca', 'Office floor plan'), alt: 'Office floor plan' },
  { src: art('#fce7f3', '#be185d', 'Brand moodboard'), alt: 'Brand moodboard' },
  { src: art('#dcfce7', '#15803d', 'Event photos'), alt: 'Event photos' },
  { src: art('#fef3c7', '#b45309', 'Product shots'), alt: 'Product shots' },
];

export default function ImageViewerDemo() {
  const [index, setIndex] = React.useState<number | null>(null);
  return (
    <>
      <div className="grid grid-cols-4 gap-2">
        {images.map((im, i) => (
          <button key={im.alt} type="button" onClick={() => setIndex(i)} className="aspect-square w-24 overflow-hidden rounded-lg border outline-none transition-transform hover:scale-[1.03] focus-visible:ring-2 focus-visible:ring-ring/50">
            <img src={im.src} alt={im.alt} className="size-full object-cover" />
          </button>
        ))}
      </div>
      <ImageViewer images={images} index={index} onIndexChange={setIndex} />
    </>
  );
}
