import * as React from 'react';

// Shows web/docs.html (the React-free build) inside the site shell. Delete this file, its route in App.tsx and the /web nav links to remove the tab.
export function WebPage() {
  const [dark, setDark] = React.useState(() => document.documentElement.classList.contains('dark'));
  React.useEffect(() => {
    const el = document.documentElement;
    const ob = new MutationObserver(() => setDark(el.classList.contains('dark')));
    ob.observe(el, { attributes: true, attributeFilter: ['class'] });
    return () => ob.disconnect();
  }, []);
  return <iframe title="Use without React" src={`/web/docs.html?embed&theme=${dark ? 'dark' : 'light'}`} className="block h-[calc(100vh-3.5rem)] w-full border-0" />;
}
