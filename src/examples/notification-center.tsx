import * as React from 'react';
import { NotificationCenter, type Notice } from '@/components/ui/notification-center';

export default function NotificationCenterDemo() {
  const [notices, setNotices] = React.useState<Notice[]>([
    { id: '1', title: 'Priya requested 2 days leave', body: 'Nov 4 to Nov 5, needs your approval', time: '2m' },
    { id: '2', title: 'Payroll for October is ready', body: 'Review and release before the 28th', time: '1h' },
    { id: '3', title: 'New hire: Arjun joins Monday', time: '3h', read: true },
  ]);
  return <NotificationCenter notices={notices} onChange={setNotices} />;
}
