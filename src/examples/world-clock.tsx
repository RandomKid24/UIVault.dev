import { WorldClock } from '@/components/ui/world-clock';

export default function WorldClockDemo() {
  return (
    <WorldClock
      className="w-80"
      zones={[
        { city: 'Mumbai', timeZone: 'Asia/Kolkata' },
        { city: 'London', timeZone: 'Europe/London' },
        { city: 'San Francisco', timeZone: 'America/Los_Angeles' },
        { city: 'Singapore', timeZone: 'Asia/Singapore' },
        { city: 'Sydney', timeZone: 'Australia/Sydney' },
      ]}
    />
  );
}
