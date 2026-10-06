import { TiltCard } from '@/components/ui/tilt-card';

export default function TiltCardDemo() {
  return (
    <TiltCard className="w-64 bg-primary text-primary-foreground">
      <p className="text-xs uppercase tracking-widest text-primary-foreground/70">Employee ID</p>
      <p className="mt-6 text-xl font-semibold">Aarav Mehta</p>
      <p className="text-sm text-primary-foreground/80">Engineering · EMP-0142</p>
    </TiltCard>
  );
}
