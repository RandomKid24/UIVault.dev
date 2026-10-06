import { Typewriter } from '@/components/ui/typewriter';

export default function TypewriterDemo() {
  return (
    <p className="text-2xl font-semibold tracking-tight">
      Built for <Typewriter className="text-primary" phrases={['HR teams', 'finance leads', 'people managers', 'growing startups']} />
    </p>
  );
}
