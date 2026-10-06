import { Reveal, TextReveal } from '@/components/ui/reveal';

export default function RevealDemo() {
  return (
    <div className="grid w-full max-w-lg gap-6">
      <TextReveal text="People software that gets out of the way." className="text-3xl font-semibold tracking-tight" />
      <div className="grid gap-3">
        {['Hire', 'Onboard', 'Pay'].map((t, i) => (
          <Reveal key={t} delay={i * 120} className="rounded-lg border bg-card p-4 text-sm font-medium">
            {i + 1}. {t}
          </Reveal>
        ))}
      </div>
    </div>
  );
}
