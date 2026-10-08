import { CheckIcon, FileIcon, UserPlusIcon, XIcon } from '@/components/ui/icons';
import { Timeline } from '@/components/ui/timeline';

export default function TimelineDemo() {
  return (
    <Timeline
      className="w-full max-w-sm"
      items={[
        { title: 'Offer accepted', description: 'Signed digitally by the candidate.', time: '2h ago', tone: 'success', icon: <CheckIcon /> },
        { title: 'Documents uploaded', time: 'Yesterday', tone: 'info', icon: <FileIcon /> },
        { title: 'Background check failed', description: 'Address could not be verified.', time: 'Mon', tone: 'danger', icon: <XIcon /> },
        { title: 'Application received', time: 'Last week', icon: <UserPlusIcon /> },
      ]}
    />
  );
}
