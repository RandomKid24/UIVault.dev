import { Timer } from '@/components/ui/timer';
import { toast } from '@/components/ui/toast';

export default function TimerDemo() {
  return <Timer onDone={() => toast.success('Time is up')} />;
}
