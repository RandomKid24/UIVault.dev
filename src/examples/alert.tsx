import { Alert } from '@/components/ui/alert';

export default function AlertDemo() {
  return (
    <div className="grid w-full max-w-lg gap-3">
      <Alert variant="info" title="Payroll locks on the 25th">Submit attendance corrections before then.</Alert>
      <Alert variant="success" title="Leave approved" />
      <Alert variant="warning" title="3 documents expire this month">Review them in the compliance tab.</Alert>
      <Alert variant="danger" title="Sync failed">The biometric device did not respond. Retrying in 5 minutes.</Alert>
    </div>
  );
}
