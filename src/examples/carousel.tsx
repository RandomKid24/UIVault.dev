import { Carousel } from '@/components/ui/carousel';

const slides = [
  ['bg-primary text-primary-foreground', 'Hire faster'],
  ['bg-foreground text-background', 'Onboard in a day'],
  ['bg-accent text-accent-foreground', 'Pay on time'],
];

export default function CarouselDemo() {
  return (
    <Carousel className="w-full max-w-md">
      {slides.map(([g, t]) => (
        <div key={t} className={`grid h-48 place-items-center ${g} text-2xl font-semibold`}>{t}</div>
      ))}
    </Carousel>
  );
}
