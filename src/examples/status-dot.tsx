import { StatusDot } from '@/components/ui/status-dot';

export default function StatusDotDemo() {
  return (
    <div className="grid gap-3">
      <StatusDot pulse>Live</StatusDot>
      <StatusDot tone="warning">Degraded</StatusDot>
      <StatusDot tone="danger">Offline</StatusDot>
      <StatusDot tone="neutral">Paused</StatusDot>
    </div>
  );
}
