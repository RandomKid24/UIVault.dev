#!/usr/bin/env node
// befui add button       copy a component (and the components it needs) into your project
// befui add all            copy every component
// befui add block:sign-in copy a block
// befui init             add the theme CSS and cn() helper
// befui list             show everything available
// Flags: --dir <src>  --from <url-or-folder>  --force  --no-install
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { spawnSync } from 'node:child_process';

const DEFAULT_FROM = 'https://raw.githubusercontent.com/RandomKid24/befui/main/public/r';
const argv = process.argv.slice(2);
const flag = (n, d) => { const i = argv.indexOf(`--${n}`); return i < 0 ? d : argv[i + 1]; };
const has = (n) => argv.includes(`--${n}`);
const valueFlags = new Set(['--dir', '--from']);
const pos = argv.filter((a, i) => !a.startsWith('--') && !valueFlags.has(argv[i - 1]));
const [cmd, ...names] = pos;

const from = (flag('from') ?? process.env.BEFUI_URL ?? DEFAULT_FROM).replace(/\/$/, '');
const dir = flag('dir', existsSync('src') ? 'src' : '.');

const die = (m) => { console.error(`\x1b[31m✗\x1b[0m ${m}`); process.exit(1); };
const ok = (m) => console.log(`\x1b[32m✓\x1b[0m ${m}`);

async function load(name) {
  const file = `${name.replace(':', '-')}.json`;
  try {
    if (/^https?:/.test(from)) {
      const r = await fetch(`${from}/${file}`);
      if (!r.ok) throw new Error(String(r.status));
      return await r.json();
    }
    return JSON.parse(readFileSync(join(from, file), 'utf8'));
  } catch (e) {
    die(`Could not load "${name}" from ${from} (${e.message}). Run "befui list" to see names.`);
  }
}

function write(files) {
  const written = [];
  for (const f of files) {
    const dest = join(dir, f.path);
    if (existsSync(dest) && !has('force')) { console.log(`  skip ${dest} (exists, use --force)`); continue; }
    mkdirSync(dirname(dest), { recursive: true });
    writeFileSync(dest, f.content);
    written.push(dest);
  }
  return written;
}

function install(deps) {
  const have = existsSync('package.json') ? JSON.parse(readFileSync('package.json', 'utf8')) : {};
  const installed = { ...have.dependencies, ...have.devDependencies };
  const need = [...deps].filter((d) => !installed[d]);
  if (!need.length) return;
  if (has('no-install')) return console.log(`  install: ${need.join(' ')}`);
  const pm = existsSync('pnpm-lock.yaml') ? ['pnpm', 'add'] : existsSync('yarn.lock') ? ['yarn', 'add'] : existsSync('bun.lockb') || existsSync('bun.lock') ? ['bun', 'add'] : ['npm', 'i'];
  console.log(`  ${pm.join(' ')} ${need.join(' ')}`);
  if (spawnSync(pm[0], [...pm.slice(1), ...need], { stdio: 'inherit' }).status !== 0) die('Dependency install failed.');
}

if (cmd === 'list') {
  const idx = await (async () => /^https?:/.test(from) ? (await fetch(`${from}/index.json`)).json() : JSON.parse(readFileSync(join(from, 'index.json'), 'utf8')))();
  let g = '';
  for (const i of idx.sort((a, b) => a.group.localeCompare(b.group))) {
    if (i.group !== g) console.log(`\n\x1b[1m${(g = i.group)}\x1b[0m`);
    console.log(`  ${i.name.padEnd(22)} ${i.description}`);
  }
} else if (cmd === 'init') {
  const init = await load('init');
  write(init.files);
  install(new Set(init.deps));
  ok('Theme and helpers added.');
  console.log('  Remaining: import "./index.css" in your entry file and add the "@" alias to src (tsconfig paths + vite resolve.alias).');
} else if (cmd === 'add' && names.length) {
  const seen = new Map();
  const visit = async (n) => {
    if (seen.has(n)) return;
    const item = await load(n);
    seen.set(n, item);
    for (const r of item.requires) await visit(r);
  };
  let wanted = names;
  if (names.includes('all')) {
    const idx = /^https?:/.test(from) ? await (await fetch(`${from}/index.json`)).json() : JSON.parse(readFileSync(join(from, 'index.json'), 'utf8'));
    wanted = idx.map((i) => i.name).filter((n) => !n.startsWith('block:'));
  }
  for (const n of wanted) await visit(n);
  const deps = new Set(['clsx', 'tailwind-merge', 'class-variance-authority']);
  for (const item of seen.values()) item.deps.forEach((d) => deps.add(d));
  if (!existsSync(join(dir, 'lib/utils.ts'))) write((await load('init')).files);
  for (const item of seen.values()) { const w = write(item.files); if (w.length) ok(`${item.name} → ${w[0]}`); }
  install(deps);
  ok(`Done. ${seen.size} file${seen.size > 1 ? 's' : ''} added.`);
} else {
  console.log('Usage: befui <add|init|list> [names] [--dir src] [--from url-or-folder] [--force] [--no-install]');
}
