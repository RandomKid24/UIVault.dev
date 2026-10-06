import { Separator } from '@/components/ui/separator';

export default function SeparatorDemo() {
  return (
    <div className="w-64 text-[13px]">
      <p className="font-medium">befui</p>
      <p className="text-muted-foreground">Slim React components.</p>
      <Separator className="my-3" />
      <div className="flex h-5 items-center gap-3">
        <span>Docs</span>
        <Separator orientation="vertical" />
        <span>Blocks</span>
        <Separator orientation="vertical" />
        <span>Source</span>
      </div>
    </div>
  );
}
