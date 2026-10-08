import type { ComponentType } from 'react';

export type Category = 'Inputs' | 'Display' | 'Feedback' | 'Overlays' | 'Navigation' | 'Data' | 'Layout' | 'Time';

export interface Entry {
  slug: string;
  name: string;
  description: string;
  category: Category;
  /** npm packages the file imports, besides react, clsx, tailwind-merge and class-variance-authority. */
  deps: string[];
  /** Other befui files this one imports. */
  requires: string[];
  keywords: string[];
  /** Recently added: shown first and marked "New" on the docs site. */
  isNew: boolean;
  /** Example needs the full page width, so skip the centered dotted frame. */
  wide: boolean;
  Demo: ComponentType;
  demoSource: string;
  source: string;
  path: string;
}

type Meta = Omit<Entry, 'Demo' | 'demoSource' | 'source' | 'path' | 'isNew'>;

/** Slugs shown as "New". Trim this list when a release is no longer recent. */
export const NEW_SLUGS = new Set(['product-card', 'coupon-input', 'order-summary', 'split-pane', 'sortable-list', 'chat', 'mention-input', 'profile-card', 'terminal', 'navbar', 'bottom-nav', 'fab', 'error-state', 'image-viewer', 'kanban', 'date-picker', 'context-menu', 'activity-feed', 'loader', 'permission-matrix', 'data-table', 'tooltip']);

const m = (
  slug: string,
  name: string,
  category: Category,
  description: string,
  extra: { deps?: string[]; requires?: string[]; keywords?: string[]; wide?: boolean } = {},
): Meta => ({ slug, name, category, description, deps: extra.deps ?? [], requires: extra.requires ?? [], keywords: extra.keywords ?? [], wide: extra.wide ?? false });

const metas: Meta[] = [
  m('button', 'Button', 'Inputs', 'Thirteen variants from plain to glow, shine and 3D press, pill shape, five sizes, loading state, and asChild for links.', { deps: ['@radix-ui/react-slot', 'lucide-react'], keywords: ['cta', 'action', 'submit'] }),
  m('input', 'Input', 'Inputs', 'Text input and textarea with icon, trailing slot, and invalid state.', { keywords: ['text', 'field', 'form', 'textarea', 'search'] }),
  m('label', 'Label and Field', 'Inputs', 'Label with required marker, plus Field for label, control and hint or error.', { deps: ['@radix-ui/react-label'], keywords: ['form', 'error', 'hint'] }),
  m('checkbox', 'Checkbox', 'Inputs', 'Checked, unchecked and indeterminate. Works for select-all rows.', { deps: ['@radix-ui/react-checkbox', 'lucide-react'], keywords: ['select', 'check', 'form'] }),
  m('switch', 'Switch', 'Inputs', 'On/off toggle for settings that apply immediately.', { deps: ['@radix-ui/react-switch'], keywords: ['toggle', 'setting'] }),
  m('select', 'Select', 'Inputs', 'Styled dropdown with groups, built on Radix Select.', { deps: ['@radix-ui/react-select', 'lucide-react'], keywords: ['dropdown', 'picker', 'form'] }),
  m('combobox', 'Combobox', 'Inputs', 'Searchable select, single or multiple, with descriptions under each option.', { deps: ['cmdk', '@radix-ui/react-popover', 'lucide-react'], requires: ['badge', 'command', 'popover'], keywords: ['autocomplete', 'search select', 'typeahead', 'multi'] }),
  m('calendar', 'Calendar', 'Inputs', 'Month grid for one day or a range. Arrow keys, Page Up/Down, Home and End work.', { deps: ['lucide-react'], keywords: ['date', 'month', 'range', 'schedule'] }),
  m('date-picker', 'Date picker', 'Inputs', 'Date and date range fields that open a calendar. The range picker has optional quick presets (Last 7 days, This month...) and a day count. Closes on pick.', { deps: ['@radix-ui/react-popover', 'lucide-react'], requires: ['calendar', 'popover'], keywords: ['date', 'range', 'leave', 'schedule', 'calendar'] }),
  m('segmented', 'Segmented control', 'Inputs', 'Pick one of a few views or ranges. Smaller than tabs.', { deps: ['@radix-ui/react-toggle-group'], keywords: ['toggle', 'filter', 'range'] }),

  m('accordion', 'Accordion', 'Display', 'Collapsible sections with a smooth height animation. Single or multiple open.', { deps: ['lucide-react'], keywords: ['faq', 'collapse', 'expand'] }),
  m('spotlight-card', 'Spotlight card', 'Display', 'Card with a glow and border highlight that follow the cursor.', { keywords: ['hover', 'glow', 'feature', 'marketing'] }),
  m('border-beam', 'Border beam', 'Display', 'A light beam that circles the border. For pricing cards and featured content.', { keywords: ['glow', 'pricing', 'highlight', 'animated border'] }),
  m('marquee', 'Marquee', 'Display', 'Endless logo or tag scroll with edge fade. Pauses on hover.', { keywords: ['logos', 'ticker', 'scroll', 'carousel', 'social proof'] }),
  m('number-ticker', 'Number ticker', 'Data', 'Counts up to a value with easing once it scrolls into view.', { keywords: ['count', 'animate', 'stat', 'kpi'] }),
  m('reveal', 'Reveal', 'Display', 'Scroll-in fade-up wrapper and a blur-in headline. One IntersectionObserver each.', { keywords: ['scroll', 'animation', 'stagger', 'headline', 'text'] }),
  m('copy-button', 'Copy button', 'Inputs', 'Copies text and morphs to a check.', { deps: ['lucide-react'], keywords: ['clipboard', 'code', 'share'] }),
  m('otp-input', 'OTP input', 'Inputs', 'Code boxes with paste, backspace, arrow keys, autofill and a shake on error.', { keywords: ['verification', 'pin', 'code', '2fa', 'login'] }),
  m('slider', 'Slider', 'Inputs', 'Native range input with a filled track and floating value bubble.', { keywords: ['range', 'budget', 'volume'] }),
  m('dropzone', 'Dropzone', 'Inputs', 'Drag and drop file area with size check and removable file list.', { deps: ['lucide-react'], keywords: ['upload', 'file', 'attachment', 'drag'] }),

  m('radio-group', 'Radio group', 'Inputs', 'Native radios as selectable cards with descriptions.', { keywords: ['option', 'plan', 'choice', 'form'] }),
  m('rating', 'Rating', 'Inputs', 'Star rating with hover preview. Read-only when no handler is given.', { deps: ['lucide-react'], keywords: ['stars', 'review', 'feedback'] }),
  m('tag-input', 'Tag input', 'Inputs', 'Type and press Enter to add chips. Backspace removes the last.', { deps: ['lucide-react'], keywords: ['chips', 'tags', 'skills', 'multi'] }),
  m('number-stepper', 'Number stepper', 'Inputs', 'Number field with plus and minus buttons and arrow keys.', { deps: ['lucide-react'], keywords: ['quantity', 'counter', 'increment'] }),
  m('chip', 'Chip', 'Inputs', 'Toggleable filter chips, single or multi select.', { deps: ['lucide-react'], keywords: ['filter', 'tag', 'toggle', 'pill'] }),
  m('carousel', 'Carousel', 'Display', 'Scroll-snap slides with arrows and animated dots.', { deps: ['lucide-react'], keywords: ['slider', 'gallery', 'swipe', 'slides'] }),
  m('compare', 'Image compare', 'Display', 'Before and after slider. Drag or use arrow keys.', { keywords: ['before after', 'image', 'diff'] }),
  m('tilt-card', 'Tilt card', 'Display', '3D card that tilts toward the cursor with a moving sheen.', { keywords: ['3d', 'hover', 'perspective', 'id card'] }),
  m('shimmer-text', 'Shimmer text', 'Display', 'Text with a light sweep passing over it.', { keywords: ['heading', 'hero', 'loading text', 'animated text'] }),
  m('countdown', 'Countdown', 'Data', 'Live countdown with flipping digits.', { keywords: ['timer', 'deadline', 'launch', 'clock'] }),
  m('progress-ring', 'Progress ring', 'Data', 'Circular progress with an eased stroke animation.', { keywords: ['circle', 'gauge', 'radial', 'completion'] }),
  m('banner', 'Banner', 'Feedback', 'Announcement bar that collapses smoothly when dismissed.', { deps: ['lucide-react'], keywords: ['announcement', 'promo', 'notice'] }),
  m('scroll-progress', 'Scroll progress', 'Navigation', 'Thin bar that fills as you scroll the page or a container.', { keywords: ['reading', 'indicator', 'article'] }),
  m('tree-view', 'Tree view', 'Navigation', 'Nested expandable list with animated open and close.', { deps: ['lucide-react'], keywords: ['files', 'folders', 'hierarchy', 'org chart', 'nested'] }),

  m('toggle', 'Toggle', 'Inputs', 'Two-state button for favourite, bold or mute. Announces its state to screen readers.', { requires: [], keywords: ['pressed', 'favourite', 'like', 'bold', 'button'] }),
  m('search-input', 'Search input', 'Inputs', 'Search field with a clear button, Escape to clear and a slash shortcut to focus.', { requires: ['icons'], keywords: ['filter', 'find', 'query', 'shortcut'] }),
  m('password-input', 'Password input', 'Inputs', 'Show and hide toggle with an optional strength meter.', { requires: ['icons', 'input'], keywords: ['secret', 'login', 'sign up', 'strength'] }),
  m('color-picker', 'Color picker', 'Inputs', 'Swatches, hex field and the native picker. Always returns a six-digit hex.', { requires: ['icons'], keywords: ['hex', 'swatch', 'theme', 'brand'] }),
  m('collapsible', 'Collapsible', 'Display', 'One section that opens with a smooth height animation.', { requires: ['icons'], keywords: ['expand', 'show more', 'details', 'disclosure'] }),
  m('dock', 'Dock', 'Navigation', 'Icons that grow toward the pointer, like the macOS dock.', { keywords: ['magnify', 'toolbar', 'apps', 'launcher'] }),
  m('data-table', 'Data table', 'Data', 'Sortable columns, a search box and pagination, with optional row selection and bulk actions, column visibility menu, sticky header, toolbar slot, row action menus and clickable rows. You pass rows and column definitions.', { requires: ['button', 'checkbox', 'dropdown-menu', 'icons', 'pagination', 'table'], keywords: ['sort', 'filter', 'grid', 'list', 'rows', 'select', 'bulk', 'columns', 'sticky'] }),
  m('gauge', 'Gauge', 'Data', 'Half-circle meter with a needle that swings to the value.', { keywords: ['meter', 'speedometer', 'score', 'dial'] }),
  m('typewriter', 'Typewriter', 'Display', 'Types, holds and deletes phrases in a loop. Static for reduced motion.', { keywords: ['text', 'hero', 'rotating', 'headline', 'animated text'] }),
  m('confetti', 'Confetti', 'Feedback', 'Burst of confetti from any button, or call fireConfetti(x, y) yourself.', { keywords: ['celebrate', 'success', 'party', 'delight'] }),
  m('alert-dialog', 'Alert dialog', 'Overlays', 'Confirm before something destructive. Cancel and confirm, controlled by you.', { deps: [], requires: ['icons', 'button', 'dialog'], keywords: ['confirm', 'delete', 'are you sure', 'modal'] }),

  m('time-picker', 'Time picker', 'Time', 'Hour, minute and AM/PM segments you type into or step with arrow keys. 12 or 24 hour.', { requires: ['icons'], keywords: ['clock', 'hour', 'minute', 'shift', 'schedule', 'form'] }),
  m('analog-clock', 'Analog clock', 'Time', 'SVG clock for any time zone, with a second hand that ticks with a small bounce.', { keywords: ['watch', 'timezone', 'hands', 'time'] }),
  m('world-clock', 'World clock', 'Time', 'Cities with live local time, a day or night icon and the hour difference from you.', { requires: ['icons'], keywords: ['timezone', 'team', 'remote', 'cities'] }),
  m('stopwatch', 'Stopwatch', 'Time', 'Start, pause, lap and reset, down to hundredths of a second.', { requires: ['icons', 'button'], keywords: ['lap', 'timer', 'time tracking'] }),
  m('timer', 'Timer', 'Time', 'Countdown with a ring that drains smoothly, presets and an onDone callback.', { requires: ['icons', 'button'], keywords: ['countdown', 'pomodoro', 'focus'] }),
  m('relative-time', 'Relative time', 'Time', '"3 minutes ago", kept live. Hover for the full date. Uses Intl, so it speaks your locale.', { keywords: ['ago', 'timestamp', 'activity', 'feed', 'date'] }),
  m('heatmap', 'Heatmap', 'Data', 'Contribution-style grid for daily activity. Cells pop in column by column.', { keywords: ['activity', 'contributions', 'calendar', 'attendance', 'streak'] }),
  m('pricing-card', 'Pricing card', 'Display', 'Plan card whose price counts to the new value. The highlighted plan gets a travelling border beam.', { requires: ['icons', 'badge', 'border-beam', 'button', 'number-ticker'], keywords: ['plan', 'subscription', 'marketing', 'tier', 'billing'] }),

  m('changelog', 'Changelog', 'Display', 'Release notes: version and date on the left, tagged New, Improved, Fixed or Removed changes on the right.', { requires: ['badge'], keywords: ['release notes', 'updates', 'versions', 'whats new'] }),
  m('testimonial-card', 'Testimonial card', 'Display', 'Customer quote with avatar, role and optional star rating.', { requires: ['avatar', 'icons'], keywords: ['review', 'quote', 'social proof', 'customer'] }),
  m('comment-thread', 'Comment thread', 'Display', 'Nested comments with inline reply boxes, three levels deep.', { requires: ['avatar', 'button', 'input'], keywords: ['discussion', 'replies', 'conversation', 'feedback'] }),
  m('code-block', 'Code block', 'Display', 'Code with a title, optional line numbers and a copy button. No highlighter dependency.', { requires: ['icons'], keywords: ['snippet', 'pre', 'terminal', 'docs'] }),
  m('status-dot', 'Status dot', 'Display', 'Small status light with an optional pulse and label.', { keywords: ['online', 'live', 'health', 'indicator', 'presence'] }),
  m('search-bar', 'Search bar', 'Inputs', 'Search field with live results, highlighted matches, recent searches and full keyboard control.', { requires: ['icons'], keywords: ['autocomplete', 'suggest', 'find', 'typeahead', 'lookup'] }),
  m('currency-input', 'Currency input', 'Inputs', 'Money field that groups digits as you type (1,25,000) and hands you a plain number.', { keywords: ['money', 'amount', 'price', 'salary', 'rupee', 'number'] }),
  m('inline-edit', 'Inline edit', 'Inputs', 'Text that becomes a field on click. Enter saves, Escape cancels.', { requires: ['icons'], keywords: ['rename', 'edit in place', 'title'] }),
  m('kanban', 'Kanban board', 'Data', 'Columns of draggable cards. Drag with the mouse or move a focused card with Alt and the arrow keys. Controlled, no drag library.', { keywords: ['board', 'trello', 'pipeline', 'tasks', 'drag', 'drop', 'columns', 'crm'], wide: true }),
  m('activity-feed', 'Activity feed', 'Display', 'Who did what and when, grouped under Today and Yesterday, with live relative times and an optional quoted detail.', { requires: ['avatar', 'relative-time'], keywords: ['audit', 'log', 'history', 'updates', 'stream', 'events'] }),
  m('permission-matrix', 'Permission matrix', 'Data', 'Roles by permissions grid of checkboxes with per-column toggle and locked roles.', { requires: ['checkbox', 'table'], keywords: ['roles', 'access', 'rbac', 'acl', 'admin', 'permissions'] }),
  m('filter-bar', 'Filter bar', 'Data', 'Removable filter chips with an Add filter menu: pick a field, then a value.', { requires: ['icons', 'button', 'popover'], keywords: ['filters', 'facets', 'refine', 'table', 'chips'] }),
  m('notification-center', 'Notification center', 'Feedback', 'Bell with an unread count and a popover list. Click marks read, Mark all read clears it.', { requires: ['icons', 'button', 'popover'], keywords: ['bell', 'inbox', 'alerts', 'unread', 'notifications'] }),
  m('cookie-consent', 'Cookie consent', 'Feedback', 'Bottom-left consent card that remembers Accept or Decline.', { requires: ['button'], keywords: ['gdpr', 'privacy', 'banner', 'cookies'] }),
  m('table-of-contents', 'Table of contents', 'Navigation', 'On this page list that highlights the section currently in view.', { keywords: ['scrollspy', 'headings', 'docs', 'anchor', 'outline'] }),

  m('product-card', 'Product card', 'Display', 'Product tile with image, rating, price with strike-through, discount tag, wishlist heart and Add button. Also exports Price.', { requires: ['button', 'icons', 'rating'], keywords: ['ecommerce', 'shop', 'store', 'price', 'wishlist', 'catalog', 'cart'] }),
  m('coupon-input', 'Coupon input', 'Inputs', 'Promo code field with async validation, an error message and a removable applied chip.', { requires: ['button', 'icons', 'input'], keywords: ['promo', 'discount', 'voucher', 'code', 'checkout'] }),
  m('order-summary', 'Order summary', 'Display', 'Cart lines with subtotal, discount, shipping, tax and total computed for you. Slots for a coupon field and a checkout button.', { keywords: ['cart', 'checkout', 'invoice', 'totals', 'receipt', 'ecommerce'] }),
  m('split-pane', 'Split pane', 'Layout', 'Two resizable panels with a draggable divider. Keyboard resizable. Horizontal or vertical.', { keywords: ['resizable', 'panels', 'divider', 'layout', 'ide', 'master detail'], wide: true }),
  m('sortable-list', 'Sortable list', 'Display', 'Reorder rows by dragging, or with arrow keys on the grip. Controlled, no drag library.', { keywords: ['drag', 'drop', 'reorder', 'priority', 'checklist', 'rank'] }),
  m('chat', 'Chat', 'Display', 'Message bubbles with avatars, timestamps, a typing indicator and a composer. Enter sends.', { requires: ['avatar', 'icons'], keywords: ['messages', 'conversation', 'support', 'inbox', 'dm'] }),
  m('mention-input', 'Mention input', 'Inputs', 'Textarea that suggests people when you type @. Arrow keys and Enter pick.', { requires: ['avatar'], keywords: ['at', 'tag', 'people', 'comment', 'autocomplete'] }),
  m('profile-card', 'Profile card', 'Display', 'Person card with banner, avatar, role, stats and an actions slot.', { requires: ['avatar'], keywords: ['user', 'employee', 'team', 'member', 'bio'] }),
  m('terminal', 'Terminal', 'Display', 'Dark terminal window with prompt lines and output. Optional typing animation.', { keywords: ['console', 'shell', 'cli', 'command', 'code', 'bash'] }),
  m('navbar', 'Navbar', 'Navigation', 'Top bar with brand, links and actions that folds into a menu on small screens.', { requires: ['icons'], keywords: ['header', 'nav', 'menu', 'topbar', 'marketing'], wide: true }),
  m('bottom-nav', 'Bottom navigation', 'Navigation', 'Mobile tab bar with icons, labels, an active pill and count badges.', { keywords: ['mobile', 'tab bar', 'app', 'footer nav'] }),
  m('fab', 'Floating action button', 'Inputs', 'Round primary action, extended with a label, or a speed dial that fans out actions.', { requires: ['icons'], keywords: ['speed dial', 'mobile', 'create', 'compose', 'floating'] }),
  m('error-state', 'Error state', 'Feedback', 'Full-section error or not found screen with a code or icon, explanation and retry actions.', { requires: ['icons'], keywords: ['404', '500', 'failed', 'offline', 'not found', 'empty'] }),
  m('image-viewer', 'Image viewer', 'Overlays', 'Lightbox with arrows, click to zoom and keyboard control.', { deps: ['@radix-ui/react-dialog'], requires: ['icons'], keywords: ['gallery', 'lightbox', 'photo', 'zoom', 'preview'] }),

  m('card', 'Card', 'Display', 'Bordered surface with header, content and footer parts.', { keywords: ['panel', 'container', 'surface'] }),
  m('badge', 'Badge', 'Display', 'Status pill with semantic colors and an optional dot.', { keywords: ['status', 'tag', 'chip', 'label'] }),
  m('avatar', 'Avatar', 'Display', 'Image with initials fallback in a stable color, plus a stacked group.', { deps: ['@radix-ui/react-avatar'], keywords: ['user', 'profile', 'people'] }),
  m('table', 'Table', 'Display', 'Dense table parts with hover rows, a selected state, footer and caption.', { keywords: ['grid', 'list', 'rows', 'data'] }),
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
  m('loader', 'Loader', 'Feedback', 'Six loading animations (ring, dots, bars, pulse, orbit, dual), an indeterminate or determinate bar loader, and a loading overlay.', { keywords: ['loading', 'spinner', 'wait', 'busy', 'progress', 'overlay', 'bar'] }),
  m('spinner', 'Spinner', 'Feedback', 'Tiny CSS spinner that inherits text color.', { keywords: ['loading', 'wait'] }),

  m('dialog', 'Dialog and Sheet', 'Overlays', 'Centered modal and edge-docked sheet on Radix Dialog.', { deps: ['@radix-ui/react-dialog', 'lucide-react'], keywords: ['modal', 'drawer', 'popup'] }),
  m('dropdown-menu', 'Dropdown menu', 'Overlays', 'Action menu with checkbox items, shortcuts and destructive items.', { deps: ['@radix-ui/react-dropdown-menu', 'lucide-react'], keywords: ['menu', 'actions', 'context'] }),
  m('popover', 'Popover', 'Overlays', 'Floating panel anchored to a trigger.', { deps: ['@radix-ui/react-popover'], keywords: ['floating', 'quick'] }),
  m('context-menu', 'Context menu', 'Overlays', 'Right-click menu with items, shortcuts, checkbox items, labels and nested submenus.', { deps: ['@radix-ui/react-context-menu', 'lucide-react'], keywords: ['right click', 'menu', 'actions', 'popup'] }),
  m('tooltip', 'Tooltip', 'Overlays', 'Hint on hover and focus. Optional title, keyboard shortcut, light style and arrow, plus an (i) InfoTip and a TruncatedText that only shows a tooltip when cut off.', { deps: ['@radix-ui/react-tooltip'], requires: ['icons', 'kbd'], keywords: ['hint', 'hover', 'info', 'help', 'truncate', 'shortcut'] }),
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
    isNew: NEW_SLUGS.has(meta.slug),
    Demo: exMod[f('examples')].default,
    demoSource: exSrc[f('examples')],
    source: uiSrc[f('components/ui')],
    path: `components/ui/${meta.slug}.tsx`,
  };
});

export const categories: Category[] = ['Layout', 'Inputs', 'Time', 'Display', 'Data', 'Feedback', 'Overlays', 'Navigation'];

export interface Block {
  slug: string;
  name: string;
  module: 'HRMS' | 'Marketing' | 'Auth' | 'Layout' | 'Reports';
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
  { slug: 'reports-table', name: 'Reports table', module: 'Reports', description: 'Searchable, filterable, sortable reports table with row action menus and a details drawer.', uses: ['data-table', 'filter-bar', 'dropdown-menu', 'dialog', 'charts', 'badge', 'toast'] },
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
