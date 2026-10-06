import { CopyButton } from '@/components/ui/copy-button';

export default function CopyButtonDemo() {
  const cmd = 'npm i clsx tailwind-merge';
  return (
    <div className="flex items-center gap-2 rounded-lg border bg-muted py-1.5 pl-3 pr-1.5">
      <code className="font-mono text-sm">{cmd}</code>
      <CopyButton value={cmd} />
    </div>
  );
}
