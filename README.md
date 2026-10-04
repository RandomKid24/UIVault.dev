# UIVault

Slim React components you copy into your project. Radix for behavior, Tailwind 4 for styling, CSS variables for theming. Includes HRMS and marketing blocks.

- 31 components, one file each, in `src/components/ui`
- 6 blocks in `src/blocks` (people overview, employee directory, leave approvals, campaign performance, lead pipeline, sign in)
- A docs site with live previews, source, and Ctrl/Cmd+K search

## Run the site

```bash
npm install
npm run dev
```

## Use a component in your own app

The site's "Getting started" page has the full steps. Short version:

1. `npm i tailwindcss @tailwindcss/vite clsx tailwind-merge class-variance-authority lucide-react`
2. Copy `src/lib/utils.ts` and the theme variables from `src/index.css`.
3. Add the `@` alias to `src`.
4. Copy the component file, plus any Radix packages listed on its page.

## Add a component

1. Create `src/components/ui/<slug>.tsx`.
2. Create `src/examples/<slug>.tsx` with a default-exported demo.
3. Add an entry to `src/registry/index.ts`. The docs page, search and sidebar come from it.

## Theme

All colors are variables in `src/index.css`. Change `--primary`, `--ring`, `--accent` and `--accent-foreground` to rebrand. Dark mode applies when `<html>` has the `dark` class.

## Legacy

`legacy/` holds the earlier motion experiments (130 demos). It is not part of the build.
