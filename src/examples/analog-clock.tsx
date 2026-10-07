import { AnalogClock } from '@/components/ui/analog-clock';

const zones = [['Mumbai', 'Asia/Kolkata'], ['London', 'Europe/London'], ['New York', 'America/New_York']] as const;

export default function AnalogClockDemo() {
  return (
    <div className="flex flex-wrap justify-center gap-8">
      {zones.map(([city, tz]) => (
        <div key={tz} className="grid justify-items-center gap-2">
          <AnalogClock timeZone={tz} size={128} />
          <span className="text-sm font-medium">{city}</span>
        </div>
      ))}
    </div>
  );
}
