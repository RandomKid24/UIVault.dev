import { Button } from '@/components/ui/button';
import { ErrorState } from '@/components/ui/error-state';
import { RefreshIcon } from '@/components/ui/icons';

export default function ErrorStateDemo() {
  return (
    <div className="grid w-full gap-2 sm:grid-cols-2">
      <ErrorState code={404} title="Page not found" description="The page you are looking for was moved or never existed.">
        <Button variant="outline">Go back</Button>
        <Button>Home</Button>
      </ErrorState>
      <ErrorState title="We could not load payroll" description="The server did not respond. Your data is safe. Try again in a moment.">
        <Button variant="outline"><RefreshIcon /> Try again</Button>
      </ErrorState>
    </div>
  );
}
