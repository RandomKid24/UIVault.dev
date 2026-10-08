import { CookieConsent } from '@/components/ui/cookie-consent';

// Uses a throwaway key so the demo shows every time you reload.
export default function CookieConsentDemo() {
  return <CookieConsent storageKey="befui-demo-consent-never-saved" className="absolute" />;
}
