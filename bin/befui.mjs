#!/usr/bin/env node
// befui add button       copy a component (and the components it needs) into your project
// befui add all            copy every component
// befui add block:sign-in copy a block
// befui init             add the theme CSS and cn() helper
// befui list             show everything available
// befui mcp              run the MCP server (AI tools fetch exact component source)
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

/** Adds (or refreshes) a marked befui section in AGENTS.md so AI coding agents know how to use the library. */
async function writeAgentRules() {
  try {
    const text = /^https?:/.test(from) ? await (await fetch(`${from}/agents.md`)).text() : readFileSync(join(from, 'agents.md'), 'utf8');
    const block = `<!-- befui:start -->\n${text.trim()}\n<!-- befui:end -->\n`;
    const file = 'AGENTS.md';
    const old = existsSync(file) ? readFileSync(file, 'utf8') : '';
    const next = /<!-- befui:start -->[\s\S]*<!-- befui:end -->\n?/.test(old) ? old.replace(/<!-- befui:start -->[\s\S]*<!-- befui:end -->\n?/, block) : `${old}${old && !old.endsWith('\n\n') ? '\n' : ''}${block}`;
    writeFileSync(file, next);
    ok('AI rules written to AGENTS.md (Claude Code reads CLAUDE.md: add "@AGENTS.md" to it).');
  } catch {
    console.log('  skipped AGENTS.md (could not load the rules)');
  }
}

/** Registers the befui MCP server in .mcp.json so Claude Code, Cursor etc. can fetch exact component source. */
function writeMcpConfig() {
  const file = '.mcp.json';
  const cfg = existsSync(file) ? JSON.parse(readFileSync(file, 'utf8')) : {};
  cfg.mcpServers = { ...cfg.mcpServers, befui: { command: 'npx', args: ['-y', 'github:RandomKid24/befui', 'mcp'] } };
  writeFileSync(file, JSON.stringify(cfg, null, 2) + '\n');
  ok('MCP server registered in .mcp.json (restart your AI tool to pick it up).');
}

/** Minimal MCP server over stdio (newline-delimited JSON-RPC): lets an AI list, read and add befui components. */
async function mcp() {
  const index = async () => /^https?:/.test(from) ? (await fetch(`${from}/index.json`)).json() : JSON.parse(readFileSync(join(from, 'index.json'), 'utf8'));
  const text = (t) => ({ content: [{ type: 'text', text: t }] });
  const tools = {
    list_components: {
      description: 'List every befui component and block with group and description.',
      schema: { type: 'object', properties: { query: { type: 'string', description: 'optional filter on name, group or description' } } },
      run: async ({ query }) => text((await index()).filter((i) => !query || `${i.name} ${i.group} ${i.description}`.toLowerCase().includes(query.toLowerCase())).map((i) => `${i.name} (${i.group}): ${i.description}`).join('\n')),
    },
    get_component: {
      description: 'Get the exact source, usage example, npm packages and import path of one befui component (blocks are "block:<name>").',
      schema: { type: 'object', properties: { name: { type: 'string' } }, required: ['name'] },
      run: async ({ name }) => {
        const c = await load(name);
        return text(`# ${c.title} (${c.name})\n${c.description}\n\nImport: import { ${(c.exports ?? []).join(', ')} } from '@/${c.name.startsWith('block:') ? `blocks/${c.name.slice(6)}` : `components/ui/${c.name}`}'\nAlso needs: ${c.requires.join(', ') || 'none'}\nnpm packages: ${c.deps.join(', ') || 'none'}\n\n## Example\n${c.example || '(none)'}\n\n## Source (${c.files[0].path})\n${c.files[0].content}`);
      },
    },
    add_components: {
      description: 'Copy befui components (and what they depend on) into the current project and install npm packages. Same as "befui add".',
      schema: { type: 'object', properties: { names: { type: 'array', items: { type: 'string' } }, force: { type: 'boolean' } }, required: ['names'] },
      run: async ({ names, force }) => {
        const r = spawnSync(process.execPath, [process.argv[1], 'add', ...names, ...(force ? ['--force'] : []), ...(has('from') ? ['--from', from] : []), ...(has('dir') ? ['--dir', dir] : [])], { encoding: 'utf8' });
        return { ...text((r.stdout + r.stderr).replace(/\x1b\[\d+m/g, '')), isError: r.status !== 0 };
      },
    },
  };
  const send = (m) => process.stdout.write(JSON.stringify({ jsonrpc: '2.0', ...m }) + '\n');
  let buf = '';
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', async (chunk) => {
    buf += chunk;
    let nl;
    while ((nl = buf.indexOf('\n')) >= 0) {
      const line = buf.slice(0, nl).trim();
      buf = buf.slice(nl + 1);
      if (!line) continue;
      const { id, method, params } = JSON.parse(line);
      if (id === undefined) continue; // notifications
      try {
        if (method === 'initialize') send({ id, result: { protocolVersion: params?.protocolVersion ?? '2024-11-05', capabilities: { tools: {} }, serverInfo: { name: 'befui', version: '1.0.0' } } });
        else if (method === 'tools/list') send({ id, result: { tools: Object.entries(tools).map(([name, t]) => ({ name, description: t.description, inputSchema: t.schema })) } });
        else if (method === 'tools/call') send({ id, result: await tools[params.name].run(params.arguments ?? {}) });
        else send({ id, result: {} });
      } catch (e) {
        send({ id, error: { code: -32000, message: e.message } });
      }
    }
  });
}

if (cmd === 'mcp') {
  // load() calls die() (exit) on failure; keep the server alive instead
  process.exit = ((exit) => (c) => { if (c) throw new Error('component not found, call list_components'); exit(c); })(process.exit);
  console.error = () => {};
  await mcp();
} else if (cmd === 'list') {
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
  await writeAgentRules();
  writeMcpConfig();
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
  console.log('Usage: befui <add|init|list|mcp> [names] [--dir src] [--from url-or-folder] [--force] [--no-install]');
}
