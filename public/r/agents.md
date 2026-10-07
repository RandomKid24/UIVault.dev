## UI components (befui)

This project uses [befui](https://github.com/RandomKid24/befui): copy-paste React components built on Radix, Tailwind 4 and CSS variables. Components live in `src/components/ui`, one file each, and are imported as `@/components/ui/<name>`.

Rules:
- Before building any UI, check whether a befui component already exists. Full catalog with usage examples: https://raw.githubusercontent.com/RandomKid24/befui/main/public/llms-full.txt (short index: `llms.txt` in the same folder).
- Add a missing component with the CLI, never by retyping its code: `npx github:RandomKid24/befui add <name>` (several names allowed, `all` for everything). It also installs the npm packages and any befui components it depends on.
- Icons come from `@/components/ui/icons` (e.g. `import { SearchIcon } from '@/components/ui/icons'`). Do not add another icon package.
- Style with the theme tokens (`bg-primary`, `text-muted-foreground`, `border`, ...). Do not hard-code colors, and do not add gradients.
- Merge classes with `cn` from `@/lib/utils`.
- Edit copied component files freely; they belong to this project. To pull the latest version of one, re-run `add <name> --force` (this overwrites local edits).
