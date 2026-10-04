import { Kbd } from '@/components/ui/kbd';

export default function KbdDemo() {
  return (
    <p className="flex items-center gap-1.5 text-[13px] text-muted-foreground">
      Press <Kbd>Ctrl</Kbd> <Kbd>K</Kbd> to search
    </p>
  );
}
