import { BellIcon, CalendarIcon, HomeIcon, MailIcon, SettingsIcon, UsersIcon } from '@/components/ui/icons';
import { Dock } from '@/components/ui/dock';

export default function DockDemo() {
  return (
    <Dock
      items={[
        { id: 'home', label: 'Home', icon: <HomeIcon /> },
        { id: 'people', label: 'People', icon: <UsersIcon /> },
        { id: 'cal', label: 'Calendar', icon: <CalendarIcon /> },
        { id: 'mail', label: 'Inbox', icon: <MailIcon /> },
        { id: 'bell', label: 'Alerts', icon: <BellIcon /> },
        { id: 'set', label: 'Settings', icon: <SettingsIcon /> },
      ]}
    />
  );
}
