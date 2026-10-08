import { FileIcon, GitMergeIcon, MessageSquareIcon, UserPlusIcon } from '@/components/ui/icons';
import { ActivityFeed, type Activity } from '@/components/ui/activity-feed';

const h = 3600000;
const items: Activity[] = [
  { id: '1', actor: 'Aarav Mehta', action: 'commented on', target: 'Leave policy 2025', at: Date.now() - 0.2 * h, icon: <MessageSquareIcon />, detail: '“Carry-forward cap should be 12 days, not 10. Checked with Finance.”' },
  { id: '2', actor: 'Diya Rao', action: 'uploaded', target: 'offer-letter-v3.pdf', at: Date.now() - 2 * h, icon: <FileIcon />, detail: '248 KB · PDF' },
  { id: '3', actor: 'Isha Nair', action: 'added', target: 'Kabir Shah to Engineering', at: Date.now() - 5 * h, icon: <UserPlusIcon /> },
  { id: '4', actor: 'Rohan Das', action: 'merged', target: 'Payroll export fixes', at: Date.now() - 27 * h, icon: <GitMergeIcon /> },
  { id: '5', actor: 'Meera Iyer', action: 'approved', target: 'September expense report', at: Date.now() - 30 * h },
  { id: '6', actor: 'Vikram Joshi', action: 'closed', target: 'Duplicate employee IDs', at: Date.now() - 100 * h },
];

export default function ActivityFeedDemo() {
  return <ActivityFeed className="w-full max-w-md" items={items} />;
}
