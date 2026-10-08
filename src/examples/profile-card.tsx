import { Button } from '@/components/ui/button';
import { ProfileCard } from '@/components/ui/profile-card';

export default function ProfileCardDemo() {
  return (
    <ProfileCard name="Aarav Mehta" role="Senior engineer, Platform" location="Pune, India" status="Online" stats={[{ label: 'Projects', value: 14 }, { label: 'Reports', value: 5 }, { label: 'Years', value: '4.5' }]}>
      <Button variant="outline">Message</Button>
      <Button>View profile</Button>
    </ProfileCard>
  );
}
