import { RadarChart } from '@/components/ui/radar-chart';

export default function RadarChartDemo() {
  return (
    <RadarChart
      axes={['Delivery', 'Quality', 'Communication', 'Ownership', 'Teamwork', 'Learning']}
      series={[
        { name: 'Aarav', values: [88, 82, 70, 90, 76, 84] },
        { name: 'Team average', values: [72, 74, 78, 68, 80, 70] },
      ]}
    />
  );
}
