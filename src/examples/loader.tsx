import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarLoader, Loader, LoadingOverlay, type LoaderVariant } from '@/components/ui/loader';
import { Skeleton } from '@/components/ui/skeleton';

const variants: LoaderVariant[] = ['ring', 'dots', 'bars', 'pulse', 'orbit', 'dual'];

export default function LoaderDemo() {
  const [loading, setLoading] = React.useState(true);
  return (
    <div className="grid w-full max-w-lg gap-6">
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
        {variants.map((v) => (
          <div key={v} className="grid justify-items-center gap-2 rounded-lg border py-4">
            <Loader variant={v} />
            <span className="text-[11px] text-muted-foreground">{v}</span>
          </div>
        ))}
      </div>
      <div className="grid gap-3">
        <BarLoader />
        <BarLoader value={64} />
      </div>
      <Button size="sm" variant="outline" className="justify-self-start" onClick={() => setLoading((l) => !l)}>{loading ? 'Stop loading' : 'Reload report'}</Button>
      <LoadingOverlay loading={loading} label="Fetching report" variant="orbit">
        <Card>
          <CardHeader>
            <CardTitle>Monthly revenue</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </CardContent>
        </Card>
      </LoadingOverlay>
    </div>
  );
}
