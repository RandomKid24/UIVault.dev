# Changelog

All notable changes to befui. Versions follow [semver](https://semver.org): new components are minor releases, breaking prop changes are major. The same list, with links to each component, is on the docs site under Changelog.
(Generated from src/registry/changelog.json by `npm run registry:build`. Edit the JSON, not this file.)

## 1.4.1 - 2026-10-09

An easier-to-read changelog

- **Changed:** Version log: each release groups its notes under Added, Changed, Fixed and Removed, with a bold lead phrase on every note so a long release can be skimmed. Larger text and clearer spacing. (Version log)
- **Fixed:** Event calendar: the "+n more" label no longer reads backwards in right-to-left pages. (Event calendar)

## 1.4.0 - 2026-10-09

Install flow, four new components, two blocks and locale support

- **Added:** New components: phone input (country picker, E.164 output), signature pad, event calendar (month view, multi-day events) and virtual list for huge datasets. (Phone input, Signature pad, Event calendar, Virtual list)
- **Added:** New blocks: pricing page and settings page. (Pricing page, Settings page)
- **Added:** Install flow: every component page now shows the befui add command first, and has a Copy for AI button that copies the install line, an example and the full source.
- **Added:** RTL switch: every preview can be flipped right-to-left to check a component.
- **Changed:** Locale support: calendar, date picker and range picker take a locale for month and weekday names and digits. Calendar flips its arrows and arrow-key movement in right-to-left pages, and the currency input and date picker use logical start and end spacing. (Calendar, Date picker, Currency input)

## 1.3.0 - 2026-10-08

Animated changelog and a version log component

- **Added:** Version log: an animated version history component. The rail draws and dots pop as releases scroll in, entries slide in one by one, releases fold open, with a version jump strip and a kind filter. The changelog page uses it. (Version log)
- **Added:** A changelog page on the docs site. Click any component name to open it.
- **Added:** 95 new icons (189 in total): devices and media, commerce, charts, text formatting, files, map and travel, status, playback and more. Find them on the Icons page.

## 1.1.0 - 2026-10-08

Sixty new components, blocks and a smarter CLI

- **Added:** Page furniture and content: changelog, testimonial card, comment thread, code block, status dot, table of contents. (Changelog, Testimonial card, Comment thread, Code block, Status dot, Table of contents)
- **Added:** Search and input helpers: search bar with live results, currency input, inline edit, filter bar, notification center, cookie consent. (Search bar, Currency input, Inline edit, Filter bar, Notification center, Cookie consent)
- **Added:** Roles and access grid: permission matrix with per-column toggles and locked roles. (Permission matrix)
- **Changed:** Tooltip gets a title, keyboard shortcut, light style and arrow, plus InfoTip and TruncatedText. (Tooltip)
- **Changed:** Data table gets row selection with bulk actions, a column menu, sticky header, toolbar slot, row action menus and clickable rows. Table gets a footer and caption. (Data table, Table)
- **Added:** Boards, feeds and menus: kanban, activity feed, context menu. (Kanban board, Activity feed, Context menu)
- **Added:** Loader with six animations, a bar and an overlay. (Loader)
- **Changed:** Date range picker gets quick presets (Last 7 days, This month and more) and a day count. (Date picker)
- **Added:** Reports table block: search, filters, sorting, row actions and a details drawer. (Reports table)
- **Added:** Online shop pieces: product card, coupon input, order summary. (Product card, Coupon input, Order summary)
- **Added:** Layout and lists: split pane, sortable list, navbar, bottom navigation, floating action button. (Split pane, Sortable list, Navbar, Bottom navigation, Floating action button)
- **Added:** People and conversation: chat, mention input, profile card, terminal, error state, image viewer. (Chat, Mention input, Profile card, Terminal, Error state, Image viewer)
- **Added:** Charts and files: line chart, radar chart, audit log, file manager. (Line chart, Radar chart, Audit log, File manager)
- **Added:** Mobile and uploads: swipe actions, pull to refresh, bottom sheet, date and time picker, image upload. (Swipe actions, Pull to refresh, Bottom sheet, Date and time picker, Image upload)
- **Changed:** Avatar gets presence dots, square shape, an extra-large size, hover names on groups and UserInfo. (Avatar)
- **Added:** Avatar upload with instant preview. (Avatar upload)
- **Added:** Forms and settings: schema form (multi-step wizard), rich text editor, notification preferences, saved views. (Schema form, Rich text editor, Notification preferences, Saved views)
- **Added:** Planning and flow: funnel chart, gantt chart, org chart, approval flow, onboarding checklist, tag manager. (Funnel chart, Gantt chart, Org chart, Approval flow, Onboarding checklist, Tag manager)
- **Added:** Shortcuts dialog (press ?) and number formatting helpers. (Shortcuts dialog, Format helpers)
- **Added:** Sales dashboard block: KPI cards, revenue line chart, funnel and top deals. (Sales dashboard)
- **Added:** befui update command adds missing animations to your index.css; befui add warns when one is missing. befui mcp runs an MCP server for AI tools.
- **Changed:** Every component now uses the built-in icon set. lucide-react is no longer installed by init.
- **Changed:** The docs site loads demos on demand (main bundle 1.4 MB down to 0.58 MB), and llms.txt is grouped by category with rules and a task map.

## 1.0.1 - 2026-10-07

Time components and AI-friendly docs

- **Added:** Time category: time picker, analog clock, world clock, stopwatch, timer, countdown and relative time. (Time picker, Analog clock, World clock, Stopwatch, Timer, Countdown, Relative time)
- **Added:** Heatmap and pricing card. (Heatmap, Pricing card)
- **Added:** llms.txt and llms-full.txt, AGENTS.md rules written by init, a Use with AI page, and befui add all.

## 1.0.0 - 2026-10-06

First release

- **Added:** Inputs and forms: button, input, label and field, checkbox, switch, select, combobox, calendar, date picker, segmented, slider, radio group, rating, OTP input, tag input, number stepper, chip, color picker. (Button, Input, Label and Field, Checkbox, Switch, Select, Combobox, Calendar, Segmented control, Slider, Radio group, Rating, OTP input, Tag input, Number stepper, Chip, Color picker)
- **Added:** Display and motion: accordion, spotlight card, border beam, marquee, carousel, compare, tilt card, shimmer text, typewriter, confetti, dock, collapsible, tree view. (Accordion, Spotlight card, Border beam, Marquee, Carousel, Image compare, Tilt card, Shimmer text, Typewriter, Confetti, Dock, Collapsible, Tree view)
- **Added:** Data and layout: data table, gauge, progress ring, number ticker, stat card, charts, sidebar, app shell. (Data table, Gauge, Progress ring, Number ticker, Stat card, Charts, Sidebar, App shell)
- **Added:** Feedback and overlays: banner, alert, toast, skeleton, dialog and sheet, alert dialog, dropdown menu, popover, tooltip, command palette. (Banner, Alert, Toast, Skeleton, Dialog and Sheet, Alert dialog, Dropdown menu, Popover, Tooltip, Command palette)
- **Added:** A built-in icon set, Storybook, the befui CLI (init, add, list), and HRMS and marketing blocks. (Admin shell, Employee directory, Leave approvals, Lead pipeline, Sign in)
