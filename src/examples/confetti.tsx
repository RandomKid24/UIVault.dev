import { Button } from '@/components/ui/button';
import { Confetti } from '@/components/ui/confetti';
import { SparkleIcon } from '@/components/ui/icons';

export default function ConfettiDemo() {
  return (
    <Confetti>
      <Button size="lg"><SparkleIcon /> Approve all</Button>
    </Confetti>
  );
}
