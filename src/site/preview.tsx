import * as React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { CodeBlock } from './code';

/** Live render with a Code tab. `bleed` drops the dotted backdrop and padding for page-size blocks. */
export function Preview({
  children,
  code,
  title,
  bleed,
  className,
}: {
  children: React.ReactNode;
  code: string;
  title: string;
  bleed?: boolean;
  className?: string;
}) {
  return (
    <Tabs defaultValue="preview" className="min-w-0">
      <TabsList variant="pill">
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <TabsContent value="preview" className="mt-3">
        <div
          className={cn(
            'rounded-xl border bg-background',
            !bleed &&
              'flex min-h-56 items-center justify-center bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:16px_16px] p-6 sm:p-10',
            bleed && 'bg-muted/40 p-4 sm:p-6',
            className,
          )}
        >
          <div className={cn(bleed ? 'mx-auto w-full max-w-6xl' : 'max-w-full')}>{children}</div>
        </div>
      </TabsContent>
      <TabsContent value="code" className="mt-3">
        <CodeBlock code={code} title={title} maxHeight={480} />
      </TabsContent>
    </Tabs>
  );
}
