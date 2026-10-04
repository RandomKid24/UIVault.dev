import { Progress } from '@/components/ui/progress';

export default function ProgressDemo() {
  return (
    <div className="grid w-full max-w-sm gap-4">
      <Progress value={64} />
      <Progress value={88} tone="success" />
      <Progress value={42} tone="warning" />
      <Progress value={15} tone="danger" />
    </div>
  );
}
