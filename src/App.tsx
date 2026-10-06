import { Shell } from '@/site/layout';
import { BlockPage, BlocksIndex, ComponentPage, ComponentsIndex, GettingStarted, NotFound } from '@/site/pages';
import { Home } from '@/site/landing';
import { IconsPage } from '@/site/icons-page';
import { useRoute } from '@/site/router';

export default function App() {
  const path = useRoute();
  const [, section, slug] = path.split('/');
  const home = path === '/';

  let page;
  if (home) page = <Home />;
  else if (section === 'docs') page = <GettingStarted />;
  else if (section === 'components') page = slug ? <ComponentPage slug={slug} /> : <ComponentsIndex />;
  else if (section === 'icons') page = <IconsPage />;
  else if (section === 'blocks') page = slug ? <BlockPage slug={slug} /> : <BlocksIndex />;
  else page = <NotFound />;

  return (
    <Shell path={path} docs={!home && section !== 'icons'}>
      {page}
    </Shell>
  );
}
