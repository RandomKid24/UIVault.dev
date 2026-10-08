// Runs on `npm version`: refuses to cut a release whose version has no CHANGELOG entry.
import { readFileSync } from 'node:fs';
const { version } = JSON.parse(readFileSync('package.json', 'utf8'));
if (!new RegExp(`^## \\[?${version.replace(/\./g, '\\.')}\\]?`, 'm').test(readFileSync('CHANGELOG.md', 'utf8'))) {
  console.error(`CHANGELOG.md has no "## ${version}" section. Add one before releasing.`);
  process.exit(1);
}
