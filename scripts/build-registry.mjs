// Builds public/r/*.json: one self-contained file per component and block, plus index.json.
// The CLI (bin/befui.mjs) reads these. Dependencies come from each file's real imports.
import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';

const out = 'public/r';
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

const reg = readFileSync('src/registry/index.ts', 'utf8');
const info = {};
for (const [, slug, name, cat, desc] of reg.matchAll(/^\s*m\('([^']+)', '([^']+)', '([^']+)', '((?:[^'\\]|\\.)*)'/gm)) info[`ui/${slug}`] = { name, group: cat, description: desc.replace(/\\'/g, "'") };
for (const [, slug, name, module, desc] of reg.matchAll(/slug: '([^']+)', name: '([^']+)', module: '([^']+)', description: '((?:[^'\\]|\\.)*)'/g)) info[`blocks/${slug}`] = { name, group: module, description: desc.replace(/\\'/g, "'") };

const HELPERS = new Set(['react', 'react-dom', 'clsx', 'tailwind-merge', 'class-variance-authority']);

function analyse(src) {
  const deps = new Set();
  const requires = new Set();
  for (const [, spec] of src.matchAll(/from '([^']+)'/g)) {
    const ui = spec.match(/^(?:@\/components\/ui|\.)\/([\w-]+)$/);
    if (ui) requires.add(ui[1]);
    else if (!spec.startsWith('.') && !spec.startsWith('@/') && !HELPERS.has(spec)) deps.add(spec);
  }
  return { deps: [...deps].sort(), requires: [...requires].sort() };
}

const items = [];
for (const [kind, dir, prefix] of [['ui', 'src/components/ui', ''], ['blocks', 'src/blocks', 'block:']]) {
  for (const f of readdirSync(dir)) {
    if (!f.endsWith('.tsx')) continue;
    const slug = f.replace('.tsx', '');
    const content = readFileSync(`${dir}/${f}`, 'utf8');
    const meta = info[`${kind}/${slug}`] ?? { name: slug, group: kind, description: '' };
    const a = analyse(content);
    const entry = {
      name: `${prefix}${slug}`,
      title: meta.name,
      group: meta.group,
      description: meta.description,
      deps: a.deps,
      requires: a.requires,
      files: [{ path: `${kind === 'ui' ? 'components/ui' : 'blocks'}/${f}`, content }],
    };
    writeFileSync(`${out}/${prefix.replace(':', '-')}${slug}.json`, JSON.stringify(entry));
    items.push({ name: entry.name, title: entry.title, group: entry.group, description: entry.description });
  }
}

writeFileSync(`${out}/index.json`, JSON.stringify(items));
writeFileSync(`${out}/init.json`, JSON.stringify({
  name: 'init',
  deps: ['clsx', 'tailwind-merge', 'class-variance-authority', 'lucide-react', 'tailwindcss', '@tailwindcss/vite'],
  files: [
    { path: 'lib/utils.ts', content: readFileSync('src/lib/utils.ts', 'utf8') },
    { path: 'index.css', content: readFileSync('src/index.css', 'utf8') },
  ],
}));
console.log(`registry: ${items.length} items`);
