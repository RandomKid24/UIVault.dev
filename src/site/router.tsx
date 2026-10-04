import * as React from 'react';

/** Tiny hash router so the site deploys to any static host with no rewrite rules. */
const read = () => (window.location.hash.replace(/^#/, '') || '/').split('?')[0];

export function useRoute() {
  const [path, setPath] = React.useState(read);
  React.useEffect(() => {
    const on = () => {
      setPath(read());
      window.scrollTo({ top: 0 });
    };
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return path;
}

export const go = (to: string) => {
  window.location.hash = to;
};

export function Link({ to, ...props }: Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & { to: string }) {
  return <a href={`#${to}`} {...props} />;
}
