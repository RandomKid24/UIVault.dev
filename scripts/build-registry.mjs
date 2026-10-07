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
const docs = [];
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
    const exportsList = [...content.matchAll(/^export (?:async )?(?:function|const|class) (\w+)/gm)].map((m) => m[1]);
    let example = '';
    try { example = readFileSync(`src/examples/${slug}.tsx`, 'utf8'); } catch { /* blocks have no separate example */ }
    if (slug === 'icons') example = `import { SearchIcon, ArrowRightIcon } from '@/components/ui/icons';\n\n<SearchIcon />                 // 16px, follows text color, static\n<SearchIcon className="size-6" />\n<ArrowRightIcon draw />        // opt-in: redraws on hover\n<SearchIcon weight={2.5} />     // heavier stroke\n\n// All ${exportsList.filter((e) => /^[A-Z]/.test(e) && e !== 'icons').length} icons: ${exportsList.filter((e) => /^[A-Z]/.test(e)).join(', ')}`;
    docs.push({ ...entry, kind, exports: exportsList, example });
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

// Agent-facing docs: a short index and a full catalog with a working example per component.
const RAW = 'https://raw.githubusercontent.com/RandomKid24/befui/main/public';
const ui = docs.filter((d) => d.kind === 'ui');
const bl = docs.filter((d) => d.kind === 'blocks');
const head = `# befui

> Copy-paste React components (Radix + Tailwind 4 + CSS variables) with real motion, plus HRMS and marketing blocks. You own the files: add them with the CLI, then import from \`@/components/ui/<name>\`.

## Setup
- One time: \`npx github:RandomKid24/befui init\` (theme CSS, cn helper, AGENTS.md rules)
- Add: \`npx github:RandomKid24/befui add <name> [name...]\` or \`add all\`; blocks are \`block:<name>\`
- Icons: our own set in \`@/components/ui/icons\`, e.g. \`import { SearchIcon } from '@/components/ui/icons'\`; no icon package needed
- Theme: CSS variables in index.css (--primary, --ring, --accent...). Dark mode = \`dark\` class on <html>
- Full catalog with examples: ${RAW}/llms-full.txt
`;
const line = (d) => `- \`${d.name}\` (${d.group}): ${d.description} Exports: ${d.exports.join(', ')}.`;
writeFileSync('public/llms.txt', `${head}\n## Components\n${ui.map(line).join('\n')}\n\n## Blocks\n${bl.map((d) => `- \`${d.name}\` (${d.group}): ${d.description} Uses: ${d.requires.join(', ')}.`).join('\n')}\n`);
const full = ui.map((d) => `## ${d.title} (\`${d.name}\`)\n${d.description}\n- Group: ${d.group}\n- Add: \`npx github:RandomKid24/befui add ${d.name}\`\n- Import: \`import { ${d.exports.filter((e) => !/Variants$/.test(e)).join(', ')} } from '@/components/ui/${d.name}'\`\n${d.requires.length ? `- Also needs: ${d.requires.join(', ')}\n` : ''}${d.deps.length ? `- npm packages: ${d.deps.join(', ')}\n` : ''}\nExample:\n\n\`\`\`tsx\n${d.example.trim()}\n\`\`\`\n`).join('\n');
writeFileSync('public/llms-full.txt', `${head}\n# Components\n\n${full}`);
writeFileSync(`${out}/agents.md`, readFileSync('scripts/agents-snippet.md', 'utf8'));
console.log(`registry: ${items.length} items, llms.txt for ${ui.length} components`);
