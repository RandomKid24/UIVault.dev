# Changelog

All notable changes to befui. Versions follow [semver](https://semver.org): new components are minor releases, breaking prop changes are major.

## 1.1.0 - 2026-10-08

### Added
- **60+ components.** Kanban, activity feed, context menu, loader (six styles, bar, overlay), line chart, radar chart, funnel chart, gantt, org chart, audit log, file manager, saved views, permission matrix, schema form (wizard), rich text editor, notification preferences, approval flow, onboarding checklist, tag manager, shortcuts dialog, format helpers, product card, coupon input, order summary, split pane, sortable list, chat, mention input, profile card, terminal, navbar, bottom nav, floating action button, error state, image viewer, bottom sheet, swipe actions, pull to refresh, date and time picker, image upload, avatar upload, changelog, search bar, notification center, comment thread, code block, status dot, currency input, inline edit, filter bar, table of contents, testimonial card, cookie consent, Time category (time picker, analog and world clock, stopwatch, timer, relative time), heatmap, pricing card.
- **Blocks:** reports table (search, filters, sorting, row actions, details drawer) and sales dashboard.
- **CLI:** `befui update` appends missing animations to `index.css` (`--check` for CI); `befui add` warns when a component needs one. `befui mcp` MCP server.
- Docs site: a Newly added section and New badges.

### Changed
- `tooltip`: `title`, `shortcut`, `variant="light"`, `arrow`, plus `InfoTip` and `TruncatedText`.
- `data-table`: `selectable` and `bulkActions`, `columnMenu`, `maxHeight` (sticky header), `toolbar`, `rowActions`, `onRowClick`.
- `date-picker`: `DateRangePicker` gets `presets`.
- `avatar`: `xl` size, `shape="square"`, `status` presence dot, hover names on `AvatarGroup`, new `UserInfo`.
- `table`: `TableFooter`, `TableCaption`.
- **Icons:** every component, block and example now uses the built-in icon set (94 icons). `lucide-react` is no longer installed by `init` or needed by any component. If you copied older files that import it, keep the package or re-add them with `--force`.
- `llms.txt` is grouped by category, with rules and a task map, and about a quarter smaller. Each name maps to `public/r/<name>.json`.
- Docs site loads demos and sources on demand (main bundle 1.4 MB to 0.58 MB).

## 1.0.0 - 2026-10-06

- First release: 40 components, icon set, Storybook, CLI (`init`, `add`, `list`), HRMS and marketing blocks, Use with AI page.
