import { BarChart, DonutChart, Sparkline } from '@/components/ui/charts';
import { Card } from '@/components/ui/card';

export default function ChartsDemo() {
  return (
    <div className="grid w-full gap-4 lg:grid-cols-2">
      <Card className="p-5">
        <p className="mb-4 text-sm font-semibold">Leads per month</p>
        <BarChart data={[{ label: 'May', value: 38 }, { label: 'Jun', value: 52 }, { label: 'Jul', value: 47 }, { label: 'Aug', value: 66 }, { label: 'Sep', value: 59 }, { label: 'Oct', value: 81 }]} />
      </Card>
      <Card className="grid gap-5 p-5">
        <p className="text-sm font-semibold">Lead source</p>
        <DonutChart
          centerLabel={<div><p className="text-xl font-semibold leading-none">342</p><p className="text-[11px] text-muted-foreground">leads</p></div>}
          data={[{ label: 'Website', value: 140 }, { label: 'Referral', value: 90 }, { label: 'Events', value: 70 }, { label: 'Cold outreach', value: 42 }]}
        />
        <div className="h-10 w-40"><Sparkline data={[4, 6, 5, 8, 7, 10, 9, 13]} /></div>
      </Card>
    </div>
  );
}
