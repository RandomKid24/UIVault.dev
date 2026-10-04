import { Spinner } from '@/components/ui/spinner';

export default function SpinnerDemo() {
  return (
    <div className="flex items-center gap-5 text-primary">
      <Spinner className="size-3" />
      <Spinner />
      <Spinner className="size-6 border-[3px]" />
    </div>
  );
}
