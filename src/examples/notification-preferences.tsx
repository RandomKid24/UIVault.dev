import * as React from 'react';
import { NotificationPreferences, type Preferences } from '@/components/ui/notification-preferences';

export default function NotificationPreferencesDemo() {
  const [v, setV] = React.useState<Preferences>({ leave: ['email', 'push', 'app'], payroll: ['email'], mention: ['push', 'app'], digest: ['email'], security: ['email', 'sms', 'push', 'app'] });
  return (
    <NotificationPreferences
      className="max-w-2xl"
      value={v}
      onChange={setV}
      channels={[{ id: 'email', label: 'Email' }, { id: 'push', label: 'Push' }, { id: 'sms', label: 'SMS' }, { id: 'app', label: 'In-app' }]}
      events={[
        { id: 'leave', label: 'Leave requests', description: 'Submitted, approved or rejected' },
        { id: 'payroll', label: 'Payslips', description: 'When a new payslip is ready' },
        { id: 'mention', label: 'Mentions and comments' },
        { id: 'digest', label: 'Weekly digest', description: 'Monday summary of your team' },
        { id: 'security', label: 'Security alerts', description: 'New sign-ins and password changes' },
      ]}
    />
  );
}
