import { CalendarIcon, CakeIcon, ClockIcon, UserMinusIcon, UserPlusIcon, UsersIcon } from '@/components/ui/icons';
import { AvatarGroup } from '@/components/ui/avatar';
import { BarChart, DonutChart, Sparkline } from '@/components/ui/charts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StatCard } from '@/components/ui/stat-card';
import { Timeline } from '@/components/ui/timeline';

export default function HrmsOverview() {
  return (
    <div className="grid gap-4">
      <div>
        <h2 className="text-lg font-semibold tracking-tight">People overview</h2>
        <p className="text-[13px] text-muted-foreground">October 2026</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Headcount" value="142" delta={4.2} icon={<UsersIcon />} chart={<Sparkline data={[3, 4, 4, 5, 6, 6, 8, 9]} />} />
        <StatCard label="Present today" value="128" delta={1.8} deltaLabel="vs yesterday" icon={<CalendarIcon />} chart={<Sparkline data={[5, 6, 5, 7, 6, 8, 7, 9]} className="text-success" />} />
        <StatCard label="On leave" value="9" icon={<ClockIcon />} />
        <StatCard label="Attrition (YTD)" value="6.4%" delta={-0.9} icon={<UserMinusIcon />} chart={<Sparkline data={[8, 7, 7.5, 6, 6.2, 5, 5.4, 4]} className="text-destructive" />} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Attendance this week</CardTitle>
            <CardDescription>Employees checked in per day.</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart data={[{ label: 'Mon', value: 131 }, { label: 'Tue', value: 134 }, { label: 'Wed', value: 128 }, { label: 'Thu', value: 126 }, { label: 'Fri', value: 119 }, { label: 'Sat', value: 41 }]} height={180} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>By department</CardTitle>
          </CardHeader>
          <CardContent>
            <DonutChart size={120} thickness={12} className="flex-col items-start gap-5 sm:flex-row sm:items-center lg:flex-col lg:items-start" data={[{ label: 'Engineering', value: 58 }, { label: 'Sales', value: 31 }, { label: 'Design', value: 18 }, { label: 'Other', value: 35 }]} />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Recent activity</CardTitle></CardHeader>
          <CardContent>
            <Timeline items={[
              { title: 'Rohan Das joined Engineering', time: '2d ago', tone: 'success', icon: <UserPlusIcon /> },
              { title: 'Payroll for September processed', time: '5d ago', tone: 'info', icon: <CalendarIcon /> },
              { title: 'Sana Khan applied for sick leave', time: '6d ago', tone: 'warning', icon: <ClockIcon /> },
            ]} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Upcoming this week</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 text-[13px]">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2"><CakeIcon className="size-4 text-muted-foreground" /> Birthdays</span>
              <AvatarGroup names={['Diya Rao', 'Isha Nair', 'Kabir Shah']} size="xs" />
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2"><UserPlusIcon className="size-4 text-muted-foreground" /> New joiners Monday</span>
              <AvatarGroup names={['Vikram Patel', 'Sana Khan']} size="xs" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
