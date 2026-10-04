import * as React from 'react';
import { BarChart3, CalendarDays, Inbox, LayoutDashboard, Megaphone, Settings, Users } from 'lucide-react';
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarItem, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Avatar } from '@/components/ui/avatar';

export default function SidebarDemo() {
  const [page, setPage] = React.useState('Dashboard');
  const [sub, setSub] = React.useState('Requests');
  const go = (p: string) => () => setPage(p);
  return (
    <SidebarProvider>
      <div className="flex h-[440px] w-full overflow-hidden rounded-xl border bg-background text-left">
        <Sidebar>
          <SidebarHeader>
            <span className="grid size-7 shrink-0 place-items-center rounded-md bg-primary text-xs font-bold text-primary-foreground">A</span>
            <span className="truncate text-sm font-semibold">Acme HR</span>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup label="Overview">
              <SidebarItem icon={<LayoutDashboard />} label="Dashboard" active={page === 'Dashboard'} onClick={go('Dashboard')} />
              <SidebarItem icon={<Inbox />} label="Inbox" badge="3" active={page === 'Inbox'} onClick={go('Inbox')} />
            </SidebarGroup>
            <SidebarGroup label="People">
              <SidebarItem icon={<Users />} label="Employees" active={page === 'Employees'} onClick={go('Employees')} />
              <SidebarItem
                icon={<CalendarDays />}
                label="Leave"
                active={page === 'Leave'}
                items={['Requests', 'Balances', 'Calendar'].map((l) => ({ label: l, active: page === 'Leave' && sub === l, onClick: () => { setPage('Leave'); setSub(l); } }))}
              />
            </SidebarGroup>
            <SidebarGroup label="Marketing">
              <SidebarItem icon={<Megaphone />} label="Campaigns" active={page === 'Campaigns'} onClick={go('Campaigns')} />
              <SidebarItem icon={<BarChart3 />} label="Reports" active={page === 'Reports'} onClick={go('Reports')} />
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarItem icon={<Settings />} label="Settings" active={page === 'Settings'} onClick={go('Settings')} />
          </SidebarFooter>
        </Sidebar>
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex h-14 items-center gap-3 border-b px-4">
            <SidebarTrigger />
            <span className="text-sm font-medium">{page}{page === 'Leave' ? ` / ${sub}` : ''}</span>
            <Avatar name="Aarav Mehta" size="xs" className="ml-auto" />
          </div>
          <p className="p-5 text-[13px] text-muted-foreground">Use the toggle to collapse the rail. Hover an icon to see its label. Below 1024px wide the sidebar becomes a slide-over.</p>
        </div>
      </div>
    </SidebarProvider>
  );
}
