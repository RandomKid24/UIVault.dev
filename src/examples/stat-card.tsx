import { IndianRupee, Megaphone, Users } from 'lucide-react';
import { Sparkline } from '@/components/ui/charts';
import { StatCard } from '@/components/ui/stat-card';

export default function StatCardDemo() {
  return (
    <div className="grid w-full gap-4 sm:grid-cols-3">
      <StatCard label="Headcount" value="142" delta={4.2} icon={<Users />} chart={<Sparkline data={[3, 4, 4, 5, 6, 6, 8, 9]} />} />
      <StatCard label="Revenue" value="₹48.2L" delta={12.5} icon={<IndianRupee />} chart={<Sparkline data={[2, 3, 2.5, 4, 5, 4.6, 6, 7]} className="text-success" />} />
      <StatCard label="Open leads" value="64" delta={-3.1} icon={<Megaphone />} chart={<Sparkline data={[8, 7, 7.5, 6, 6.2, 5, 5.4, 4]} className="text-destructive" />} />
    </div>
  );
}
