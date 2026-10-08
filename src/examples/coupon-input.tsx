import * as React from 'react';
import { CouponInput } from '@/components/ui/coupon-input';

const codes: Record<string, string> = { WELCOME10: 'You save 10% on this order', FESTIVE250: 'You save ₹250' };

export default function CouponInputDemo() {
  const [applied, setApplied] = React.useState<string>();
  return (
    <div className="w-full max-w-xs">
      <CouponInput
        applied={applied}
        hint={applied && codes[applied]}
        onApply={async (c) => { await new Promise((r) => setTimeout(r, 600)); if (!codes[c]) return false; setApplied(c); return true; }}
        onRemove={() => setApplied(undefined)}
      />
      {!applied && <p className="mt-2 px-1 text-xs text-muted-foreground">Try WELCOME10 or FESTIVE250.</p>}
    </div>
  );
}
