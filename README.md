# befui

Slim React components you copy into your project. Radix for behavior, Tailwind 4 for styling, CSS variables for theming. Includes HRMS and marketing blocks.

- 71 components, one file each, in `src/components/ui`, including date picker, combobox, sidebar and app shell
- Our own icon set (73 icons) on its own Icons page, with a draw-on hover animation
- 8 blocks in `src/blocks` (admin shell, people overview, employee directory, leave approvals, leave request form, campaign performance, lead pipeline, sign in)
- A docs site with live previews (width and light/dark switches), a props playground on key components, source, and Ctrl/Cmd+K search

## Run the site

```bash
npm install
npm run dev
```

## Storybook

```bash
npm run storybook
```

One story per component and block, generated from the same registry as the docs site (`npm run stories:gen`). Toolbar has a light/dark switch, viewport sizes and an accessibility panel. `npm run build-storybook` makes a static copy in `dist-storybook`.

## Install with the CLI

```bash
npx befui init                    # theme CSS + cn() helper
npx befui add button combobox     # components, plus the ones they need and their npm packages
npx befui add all                # every component at once
npx befui add block:sign-in       # a whole block
npx befui list
```

The CLI reads `public/r/*.json`, which `npm run registry:build` regenerates from the source (it runs in `npm run build`). It defaults to this repo's `main` branch on GitHub, so push `public/r` first. Use `--from <folder-or-url>` to point it elsewhere, `--dir` for a different target, `--force` to overwrite and `--no-install` to only print the packages.

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
