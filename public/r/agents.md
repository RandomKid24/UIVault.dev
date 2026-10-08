## UI components (befui)

This project uses [befui](https://github.com/RandomKid24/befui): copy-paste React components built on Radix, Tailwind 4 and CSS variables. Components live in `src/components/ui`, one file each, and are imported as `@/components/ui/<name>`.

Rules:
- Before building any UI, check whether a befui component already exists. Full catalog with usage examples: https://raw.githubusercontent.com/RandomKid24/befui/main/public/llms-full.txt (short index: `llms.txt` in the same folder).
- If a `befui` MCP server is connected (registered in `.mcp.json` by `init`), use its `list_components`, `get_component` (exact source, import and example) and `add_components` tools instead of guessing.
- Add a missing component with the CLI, never by retyping its code: `npx github:RandomKid24/befui add <name>` (several names allowed, `all` for everything). It also installs the npm packages and any befui components it depends on.
- Icons come from `@/components/ui/icons` (e.g. `import { SearchIcon } from '@/components/ui/icons'`). Do not add another icon package.
- Style with the theme tokens (`bg-primary`, `text-muted-foreground`, `border`, ...). Do not hard-code colors, and do not add gradients.
- Components that animate (loader, bottom-sheet, toast, ...) need keyframes in index.css. If one looks static or broken, run `npx github:RandomKid24/befui update`.
- Colors: use theme tokens. Only `terminal`, `avatar` and `tag-manager` use fixed colors on purpose (dark terminal, per-name tints).
- Merge classes with `cn` from `@/lib/utils`.
- Edit copied component files freely; they belong to this project. To pull the latest version of one, re-run `add <name> --force` (this overwrites local edits).
