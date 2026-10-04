import * as React from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

const KEYWORDS =
  /^(import|export|from|default|const|let|var|function|return|if|else|type|interface|extends|as|new|typeof|async|await|for|of|in|null|undefined|true|false|React)$/;
const TOKEN = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|('(?:\\.|[^'\\\n])*'|"(?:\\.|[^"\\\n])*"|`(?:\\.|[^`\\])*`)|(<\/?[A-Z][\w.]*)|(\b\d+(?:\.\d+)?\b)|(\b[A-Za-z_$][\w$]*\b)/g;

/** Small regex highlighter. Not a parser, but good enough to read TSX and CSS. */
function highlight(code: string): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  let last = 0;
  let i = 0;
  for (const match of code.matchAll(TOKEN)) {
    const [text, comment, str, tag, num, word] = match;
    const start = match.index!;
    if (start > last) out.push(code.slice(last, start));
    const key = i++;
    if (comment) out.push(<span key={key} className="text-muted-foreground/70 italic">{text}</span>);
    else if (str) out.push(<span key={key} className="text-emerald-700 dark:text-emerald-300">{text}</span>);
    else if (tag) out.push(<span key={key} className="text-blue-700 dark:text-blue-300">{text}</span>);
    else if (num) out.push(<span key={key} className="text-amber-700 dark:text-amber-300">{text}</span>);
    else if (word && KEYWORDS.test(word)) out.push(<span key={key} className="text-violet-700 dark:text-violet-300">{text}</span>);
    else out.push(text);
    last = start + text.length;
  }
  out.push(code.slice(last));
  return out;
}

export function CopyButton({ text, className, label }: { text: string; className?: string; label?: string }) {
  const [done, setDone] = React.useState(false);
  return (
    <button
      type="button"
      aria-label="Copy"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setDone(true);
          setTimeout(() => setDone(false), 1400);
        } catch {
          /* clipboard can be blocked in iframes */
        }
      }}
      className={cn(
        'inline-flex h-7 items-center gap-1.5 rounded-md px-2 text-xs font-medium text-muted-foreground outline-none transition-colors hover:bg-secondary hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40',
        className,
      )}
    >
      {done ? <Check className="size-3.5 text-success" /> : <Copy className="size-3.5" />}
      {label && <span>{done ? 'Copied' : label}</span>}
    </button>
  );
}

export function CodeBlock({
  code,
  title,
  maxHeight,
  className,
}: {
  code: string;
  title?: string;
  maxHeight?: number;
  className?: string;
}) {
  const [expanded, setExpanded] = React.useState(false);
  const clipped = maxHeight !== undefined && !expanded;
  const nodes = React.useMemo(() => highlight(code), [code]);
  return (
    <div className={cn('overflow-hidden rounded-lg border bg-muted/60', className)}>
      <div className="flex h-9 items-center justify-between border-b bg-muted px-3">
        <span className="font-mono text-xs text-muted-foreground">{title}</span>
        <CopyButton text={code} label="Copy" />
      </div>
      <div className="relative">
        <pre
          className="overflow-auto p-4 font-mono text-[12.5px] leading-relaxed"
          style={clipped ? { maxHeight } : undefined}
        >
          <code>{nodes}</code>
        </pre>
        {clipped && (
          <div className="absolute inset-x-0 bottom-0 flex h-20 items-end justify-center bg-gradient-to-t from-muted to-transparent pb-3">
            <button
              onClick={() => setExpanded(true)}
              className="rounded-md border bg-background px-3 py-1 text-xs font-medium shadow-sm transition-colors hover:bg-secondary"
            >
              Show full file
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export function Command({ children }: { children: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border bg-muted/60 py-1.5 pl-4 pr-1.5">
      <code className="overflow-x-auto whitespace-nowrap font-mono text-[12.5px]">{children}</code>
      <CopyButton text={children} />
    </div>
  );
}
