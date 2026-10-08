import { BellIcon, HomeIcon, SearchIcon, SettingsIcon, UsersIcon } from '@/components/ui/icons';
import { AppContent, AppShell, PageHeader, Topbar } from '@/components/ui/app-shell';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Kbd } from '@/components/ui/kbd';
import { Sidebar, SidebarContent, SidebarHeader, SidebarItem } from '@/components/ui/sidebar';

/** Minimal frame. See the Admin shell block for a full one. */
export default function AppShellDemo() {
  return (
    <div className="h-[420px] overflow-hidden rounded-xl border text-left">
      <AppShell className="h-full" sidebar={
        <Sidebar>
          <SidebarHeader><span className="text-sm font-semibold">My app</span></SidebarHeader>
          <SidebarContent>
            <SidebarItem icon={<HomeIcon />} label="Home" active />
            <SidebarItem icon={<UsersIcon />} label="Team" />
            <SidebarItem icon={<SettingsIcon />} label="Settings" />
          </SidebarContent>
        </Sidebar>
      }>
        <Topbar>
          <button className="ml-2 hidden h-8 w-56 items-center gap-2 rounded-md border bg-muted/60 px-2.5 text-[13px] text-muted-foreground sm:flex"><SearchIcon className="size-3.5" /> Search <Kbd className="ml-auto">/</Kbd></button>
          <Button variant="ghost" size="icon-sm" className="ml-auto" aria-label="Notifications"><BellIcon /></Button>
        </Topbar>
        <AppContent>
          <PageHeader title="Home" description="Content scrolls here, the sidebar and topbar stay put." actions={<Button size="sm">New</Button>} />
          <Card className="p-5 text-[13px] text-muted-foreground">Your page goes here.</Card>
        </AppContent>
      </AppShell>
    </div>
  );
}
