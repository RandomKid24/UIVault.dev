import * as React from 'react';
import { BellIcon, HomeIcon, SearchIcon, UserIcon } from '@/components/ui/icons';
import { BottomNav } from '@/components/ui/bottom-nav';

export default function BottomNavDemo() {
  const [tab, setTab] = React.useState('home');
  return (
    <div className="grid h-64 w-72 grid-rows-[1fr_auto] overflow-hidden rounded-[1.75rem] border-4 border-foreground/80 bg-background">
      <div className="grid place-items-center text-sm font-medium capitalize text-muted-foreground">{tab}</div>
      <BottomNav
        value={tab}
        onValueChange={setTab}
        items={[
          { id: 'home', label: 'Home', icon: <HomeIcon /> },
          { id: 'search', label: 'Search', icon: <SearchIcon /> },
          { id: 'alerts', label: 'Alerts', icon: <BellIcon />, badge: 3 },
          { id: 'profile', label: 'Profile', icon: <UserIcon /> },
        ]}
      />
    </div>
  );
}
