import type { ComponentType } from 'react';

export type Category = 'Inputs' | 'Display' | 'Feedback' | 'Overlays' | 'Navigation' | 'Data' | 'Layout';

export interface Entry {
  slug: string;
  name: string;
  description: string;
  category: Category;
  /** npm packages the file imports, besides react, clsx, tailwind-merge and class-variance-authority. */
  deps: string[];
  /** Other UIVault files this one imports. */
  requires: string[];
  keywords: string[];
  /** Example needs the full page width, so skip the centered dotted frame. */
  wide: boolean;
  Demo: ComponentType;
  demoSource: string;
  source: string;
  path: string;
}

type Meta = Omit<Entry, 'Demo' | 'demoSource' | 'source' | 'path'>;

const m = (
  slug: string,
  name: string,
  category: Category,
  description: string,
  extra: { deps?: string[]; requires?: string[]; keywords?: string[]; wide?: boolean } = {},
): Meta => ({ slug, name, category, description, deps: extra.deps ?? [], requires: extra.requires ?? [], keywords: extra.keywords ?? [], wide: extra.wide ?? false });

const metas: Meta[] = [
  m('button', 'Button', 'Inputs', 'Six variants, five sizes, loading state, and asChild for links.', { deps: ['@radix-ui/react-slot', 'lucide-react'], keywords: ['cta', 'action', 'submit'] }),
  m('input', 'Input', 'Inputs', 'Text input and textarea with icon, trailing slot, and invalid state.', { keywords: ['text', 'field', 'form', 'textarea', 'search'] }),
  m('label', 'Label and Field', 'Inputs', 'Label with required marker, plus Field for label, control and hint or error.', { deps: ['@radix-ui/react-label'], keywords: ['form', 'error', 'hint'] }),
  m('checkbox', 'Checkbox', 'Inputs', 'Checked, unchecked and indeterminate. Works for select-all rows.', { deps: ['@radix-ui/react-checkbox', 'lucide-react'], keywords: ['select', 'check', 'form'] }),
  m('switch', 'Switch', 'Inputs', 'On/off toggle for settings that apply immediately.', { deps: ['@radix-ui/react-switch'], keywords: ['toggle', 'setting'] }),
  m('select', 'Select', 'Inputs', 'Styled dropdown with groups, built on Radix Select.', { deps: ['@radix-ui/react-select', 'lucide-react'], keywords: ['dropdown', 'picker', 'form'] }),
  m('combobox', 'Combobox', 'Inputs', 'Searchable select, single or multiple, with descriptions under each option.', { deps: ['cmdk', '@radix-ui/react-popover', 'lucide-react'], requires: ['badge', 'command', 'popover'], keywords: ['autocomplete', 'search select', 'typeahead', 'multi'] }),
  m('calendar', 'Calendar', 'Inputs', 'Month grid for one day or a range. Arrow keys, Page Up/Down, Home and End work.', { deps: ['lucide-react'], keywords: ['date', 'month', 'range', 'schedule'] }),
  m('date-picker', 'Date picker', 'Inputs', 'Date and date range fields that open a calendar. Closes on pick.', { deps: ['@radix-ui/react-popover', 'lucide-react'], requires: ['calendar', 'popover'], keywords: ['date', 'range', 'leave', 'schedule', 'calendar'] }),
  m('segmented', 'Segmented control', 'Inputs', 'Pick one of a few views or ranges. Smaller than tabs.', { deps: ['@radix-ui/react-toggle-group'], keywords: ['toggle', 'filter', 'range'] }),

  m('card', 'Card', 'Display', 'Bordered surface with header, content and footer parts.', { keywords: ['panel', 'container', 'surface'] }),
  m('badge', 'Badge', 'Display', 'Status pill with semantic colors and an optional dot.', { keywords: ['status', 'tag', 'chip', 'label'] }),
  m('avatar', 'Avatar', 'Display', 'Image with initials fallback in a stable color, plus a stacked group.', { deps: ['@radix-ui/react-avatar'], keywords: ['user', 'profile', 'people'] }),
  m('table', 'Table', 'Display', 'Dense table parts with hover rows and a selected state.', { keywords: ['grid', 'list', 'rows', 'data'] }),
  m('separator', 'Separator', 'Display', 'Horizontal or vertical divider.', { deps: ['@radix-ui/react-separator'], keywords: ['divider', 'line'] }),
  m('kbd', 'Kbd', 'Display', 'Keyboard key hint.', { keywords: ['shortcut', 'key'] }),
  m('empty-state', 'Empty state', 'Display', 'Dashed placeholder with icon, text and an action.', { keywords: ['blank', 'no data', 'zero'] }),
  m('timeline', 'Timeline', 'Display', 'Vertical activity feed with tone-colored markers.', { keywords: ['activity', 'history', 'log', 'feed'] }),

  m('stat-card', 'Stat card', 'Data', 'KPI tile with value, trend delta and a sparkline slot.', { deps: ['lucide-react'], requires: ['card'], keywords: ['kpi', 'metric', 'number', 'dashboard'] }),
  m('charts', 'Charts', 'Data', 'Sparkline, bar chart and donut in plain SVG. No chart library.', { keywords: ['graph', 'bar', 'donut', 'sparkline', 'plot'] }),
  m('progress', 'Progress', 'Data', 'Thin progress bar with four tones.', { deps: ['@radix-ui/react-progress'], keywords: ['bar', 'loading', 'budget'] }),

  m('alert', 'Alert', 'Feedback', 'Inline message in info, success, warning and danger.', { deps: ['lucide-react'], keywords: ['banner', 'notice', 'message'] }),
  m('toast', 'Toast', 'Feedback', 'Call toast.success() from anywhere. No provider needed.', { deps: ['lucide-react'], keywords: ['notification', 'snackbar'] }),
  m('skeleton', 'Skeleton', 'Feedback', 'Shimmering placeholder for content that is loading.', { keywords: ['loading', 'placeholder'] }),
  m('spinner', 'Spinner', 'Feedback', 'Tiny CSS spinner that inherits text color.', { keywords: ['loading', 'wait'] }),

  m('dialog', 'Dialog and Sheet', 'Overlays', 'Centered modal and edge-docked sheet on Radix Dialog.', { deps: ['@radix-ui/react-dialog', 'lucide-react'], keywords: ['modal', 'drawer', 'popup'] }),
  m('dropdown-menu', 'Dropdown menu', 'Overlays', 'Action menu with checkbox items, shortcuts and destructive items.', { deps: ['@radix-ui/react-dropdown-menu', 'lucide-react'], keywords: ['menu', 'actions', 'context'] }),
  m('popover', 'Popover', 'Overlays', 'Floating panel anchored to a trigger.', { deps: ['@radix-ui/react-popover'], keywords: ['floating', 'quick'] }),
  m('tooltip', 'Tooltip', 'Overlays', 'One-line hint on hover and focus.', { deps: ['@radix-ui/react-tooltip'], keywords: ['hint', 'hover'] }),
  m('command', 'Command palette', 'Overlays', 'Searchable palette on cmdk. Bind it to Ctrl or Cmd K.', { deps: ['cmdk', '@radix-ui/react-dialog', 'lucide-react'], keywords: ['search', 'spotlight', 'cmdk'] }),

  m('tabs', 'Tabs', 'Navigation', 'Underline or pill tabs on Radix Tabs.', { deps: ['@radix-ui/react-tabs'], keywords: ['sections', 'switch'] }),
  m('breadcrumb', 'Breadcrumb', 'Navigation', 'Trail of parent pages.', { deps: ['lucide-react'], keywords: ['path', 'trail'] }),
  m('pagination', 'Pagination', 'Navigation', 'Page buttons with ellipsis for long ranges.', { deps: ['lucide-react'], keywords: ['pages', 'next', 'previous'] }),
  m('stepper', 'Stepper', 'Navigation', 'Horizontal steps for multi-step forms and onboarding.', { deps: ['lucide-react'], keywords: ['wizard', 'steps', 'onboarding'] }),

  m('sidebar', 'Sidebar', 'Layout', 'Collapsible nav with groups, nested links and badges. Icon rail on desktop, slide-over on mobile.', { deps: ['@radix-ui/react-dialog', '@radix-ui/react-tooltip', 'lucide-react'], requires: ['dialog', 'tooltip'], keywords: ['nav', 'menu', 'navigation', 'drawer', 'rail'], wide: true }),
  m('app-shell', 'App shell', 'Layout', 'Sidebar, topbar and scrolling content area, plus a page header.', { deps: ['lucide-react'], requires: ['sidebar'], keywords: ['layout', 'dashboard', 'frame', 'page', 'admin'], wide: true }),
];

const uiSrc = import.meta.glob('/src/components/ui/*.tsx', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;
const exMod = import.meta.glob('/src/examples/*.tsx', { eager: true }) as Record<string, { default: ComponentType }>;
const exSrc = import.meta.glob('/src/examples/*.tsx', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

export const components: Entry[] = metas.map((meta) => {
  const f = (dir: string, ext = '.tsx') => `/src/${dir}/${meta.slug}${ext}`;
  return {
    ...meta,
    Demo: exMod[f('examples')].default,
    demoSource: exSrc[f('examples')],
    source: uiSrc[f('components/ui')],
    path: `components/ui/${meta.slug}.tsx`,
  };
});

export const categories: Category[] = ['Layout', 'Inputs', 'Display', 'Data', 'Feedback', 'Overlays', 'Navigation'];

export interface Block {
  slug: string;
  name: string;
  module: 'HRMS' | 'Marketing' | 'Auth' | 'Layout';
  description: string;
  uses: string[];
  Demo: ComponentType;
  source: string;
  path: string;
}

const bMeta: Omit<Block, 'Demo' | 'source' | 'path'>[] = [
  { slug: 'admin-shell', name: 'Admin shell', module: 'Layout', description: 'Full app frame: grouped sidebar with nested links, topbar with search, alerts and user menu, and a dashboard page.', uses: ['app-shell', 'sidebar', 'date-picker', 'stat-card', 'dropdown-menu', 'breadcrumb', 'timeline'] },
  { slug: 'hrms-overview', name: 'People overview', module: 'HRMS', description: 'Headcount, attendance, department split and activity feed.', uses: ['stat-card', 'charts', 'card', 'timeline', 'avatar'] },
  { slug: 'employee-directory', name: 'Employee directory', module: 'HRMS', description: 'Searchable table with status filter, row selection, actions and pagination.', uses: ['table', 'checkbox', 'segmented', 'dropdown-menu', 'pagination', 'badge', 'avatar'] },
  { slug: 'leave-approvals', name: 'Leave approvals', module: 'HRMS', description: 'Manager inbox with tabs, balance bars and approve or reject toasts.', uses: ['tabs', 'card', 'progress', 'badge', 'toast', 'empty-state'] },
  { slug: 'leave-request-form', name: 'Leave request form', module: 'HRMS', description: 'Date range, approver combobox, multi-select notify list, working-day count and field validation.', uses: ['date-picker', 'combobox', 'select', 'input', 'label', 'alert', 'toast', 'card'] },
  { slug: 'campaign-performance', name: 'Campaign performance', module: 'Marketing', description: 'Channel KPIs, weekly leads chart and a campaign budget table.', uses: ['stat-card', 'charts', 'table', 'progress', 'badge'] },
  { slug: 'lead-pipeline', name: 'Lead pipeline', module: 'Marketing', description: 'Drag-and-drop board with column totals and a keyboard-friendly move button.', uses: ['card', 'badge', 'avatar', 'toast'] },
  { slug: 'sign-in', name: 'Sign in', module: 'Auth', description: 'Login card with validation, loading button and an error alert.', uses: ['card', 'input', 'label', 'checkbox', 'alert', 'button'] },
];

const bMod = import.meta.glob('/src/blocks/*.tsx', { eager: true }) as Record<string, { default: ComponentType }>;
const bSrc = import.meta.glob('/src/blocks/*.tsx', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

export const blocks: Block[] = bMeta.map((b) => ({
  ...b,
  Demo: bMod[`/src/blocks/${b.slug}.tsx`].default,
  source: bSrc[`/src/blocks/${b.slug}.tsx`],
  path: `blocks/${b.slug}.tsx`,
}));

export const globalCss: string = (
  import.meta.glob('/src/index.css', { query: '?raw', import: 'default', eager: true }) as Record<string, string>
)['/src/index.css'];
export const utilsSource: string = (
  import.meta.glob('/src/lib/utils.ts', { query: '?raw', import: 'default', eager: true }) as Record<string, string>
)['/src/lib/utils.ts'];
