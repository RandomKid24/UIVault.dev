import { BellIcon, CalendarIcon, UsersIcon } from '@/components/ui/icons';
import { OnboardingCarousel } from '@/components/ui/onboarding-carousel';
import { toast } from '@/components/ui/toast';

export default function OnboardingCarouselDemo() {
  return (
    <OnboardingCarousel
      onFinish={() => toast.success('Welcome aboard')}
      slides={[
        { title: 'Apply for leave in seconds', description: 'Pick your dates, choose an approver and send. No emails, no spreadsheets.', visual: <CalendarIcon /> },
        { title: 'Know where your team is', description: 'See who is in, out or on leave today, right from the home screen.', visual: <UsersIcon /> },
        { title: 'Never miss an approval', description: 'Get a nudge when something needs your attention, and none when it does not.', visual: <BellIcon /> },
      ]}
    />
  );
}
