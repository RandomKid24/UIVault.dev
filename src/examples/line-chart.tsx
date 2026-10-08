import { LineChart } from '@/components/ui/line-chart';

const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];

export default function LineChartDemo() {
  return (
    <div className="grid w-full max-w-2xl gap-8">
      <LineChart
        area
        labels={months}
        format={(n) => `₹${n}L`}
        series={[
          { name: 'Revenue', data: [42, 48, 45, 58, 63, 61, 72] },
          { name: 'Payroll', data: [30, 31, 31, 34, 36, 36, 38], color: 'text-warning' },
          { name: 'Profit', data: [12, 17, 14, 24, 27, 25, 34], color: 'text-success' },
        ]}
      />
    </div>
  );
}
