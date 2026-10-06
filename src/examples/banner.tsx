import { Banner } from '@/components/ui/banner';

export default function BannerDemo() {
  return (
    <div className="w-full overflow-hidden rounded-lg border">
      <Banner action={<a href="#/" className="underline underline-offset-2">Read more</a>}>Payroll 2.0 is live for everyone.</Banner>
      <div className="p-6 text-sm text-muted-foreground">Dismiss the bar and the page slides up.</div>
    </div>
  );
}
