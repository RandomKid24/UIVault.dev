import * as React from 'react';
import { Button } from '@/components/ui/button';
import { OnboardingChecklist, type ChecklistItem } from '@/components/ui/onboarding-checklist';

export default function OnboardingChecklistDemo() {
  const [items, setItems] = React.useState<ChecklistItem[]>([
    { id: 'profile', title: 'Complete your profile', done: true },
    { id: 'team', title: 'Invite your team', description: 'Add colleagues by email so they can see shared reports.', done: false, action: <Button size="xs">Invite people</Button> },
    { id: 'data', title: 'Import employees', description: 'Upload a CSV or connect your payroll tool.', done: false, action: <Button size="xs" variant="outline">Upload CSV</Button> },
    { id: 'leave', title: 'Set up leave policies', done: false },
  ]);
  return <OnboardingChecklist items={items} onToggle={(id, done) => setItems((l) => l.map((i) => (i.id === id ? { ...i, done } : i)))} />;
}
