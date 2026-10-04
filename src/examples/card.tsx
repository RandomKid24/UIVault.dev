import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function CardDemo() {
  return (
    <div className="grid w-full max-w-2xl gap-4 sm:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Payroll run</CardTitle>
          <CardDescription>October cycle closes in 3 days.</CardDescription>
        </CardHeader>
        <CardContent className="text-[13px] text-muted-foreground">142 employees, 6 pending adjustments.</CardContent>
        <CardFooter className="justify-end gap-2">
          <Button variant="ghost" size="sm">Later</Button>
          <Button size="sm">Review</Button>
        </CardFooter>
      </Card>
      <Card hoverable className="p-5">
        <p className="text-sm font-semibold">Hoverable</p>
        <p className="mt-1 text-[13px] text-muted-foreground">Lifts 2px and gains a shadow on hover. Good for clickable tiles.</p>
      </Card>
    </div>
  );
}
