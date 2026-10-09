/*! befui-web — <bf-select>, <bf-date-picker>, <bf-dialog>, <bf-toast>. Plain custom elements, no dependencies. */
(() => {
  if (window.BefUI) return;

  const NATIVE = 'popover' in HTMLElement.prototype;
  const SHEET = '(max-width: 640px)';
  let seq = 0;

  const h = (tag, cls, attrs) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  };
  const fire = (el, type) => el.dispatchEvent(new Event(type, { bubbles: true }));
  const lang = (el) => el.closest('[lang]')?.lang || navigator.language || 'en';
  const inRect = (r, e) => e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;

  // Put the menu under (or above) its trigger, inside the viewport.
  function position(menu, a) {
    const r = a.getBoundingClientRect(), gap = 4, pad = 8;
    const below = innerHeight - r.bottom - gap - pad, above = r.top - gap - pad;
    menu.style.minWidth = r.width + 'px';
    menu.style.maxHeight = '';
    const full = menu.offsetHeight;
    const up = full > below && above > below;
    menu.style.maxHeight = Math.max(120, Math.min(full, up ? above : below)) + 'px';
    menu.style.top = (up ? r.top - gap - menu.offsetHeight : r.bottom + gap) + 'px';
    menu.style.left = Math.max(pad, Math.min(r.left, innerWidth - menu.offsetWidth - pad)) + 'px';
  }

  // Open/close a menu next to its trigger. Phones get a bottom sheet (CSS .bf-sheet).
  // Uses the native popover layer (so it also works inside <dialog>), plain `hidden` as a fallback.
  function popup(trigger, menu, onOpen) {
    let off;
    const api = {
      get isOpen() { return trigger.getAttribute('aria-expanded') === 'true'; },
      open() {
        if (api.isOpen) return;
        const sheet = matchMedia(SHEET).matches;
        menu.classList.toggle('bf-sheet', sheet);
        if (sheet) menu.removeAttribute('style');
        if (NATIVE) menu.showPopover(); else menu.hidden = false;
        menu.setAttribute('data-open', '');
        trigger.setAttribute('aria-expanded', 'true');
        const place = () => { if (!sheet) position(menu, trigger); };
        const down = (e) => { if (!inRect(menu.getBoundingClientRect(), e) && !trigger.contains(e.target)) api.close(); };
        const move = (e) => { if (!menu.contains(e.target)) place(); };
        place();
        document.addEventListener('pointerdown', down, true);
        addEventListener('scroll', move, true);
        addEventListener('resize', place);
        off = () => {
          document.removeEventListener('pointerdown', down, true);
          removeEventListener('scroll', move, true);
          removeEventListener('resize', place);
        };
        onOpen();
      },
      close(refocus) {
        if (!api.isOpen) return;
        off();
        try { if (NATIVE) menu.hidePopover(); else menu.hidden = true; } catch {}
        menu.removeAttribute('data-open');
        trigger.setAttribute('aria-expanded', 'false');
        if (refocus) trigger.focus();
      },
    };
    return api;
  }

  /* ------------------------------------------------------------------ bf-select */

  const option = (o, groupDisabled) => ({ v: o.value, t: o.label || o.textContent.trim(), d: groupDisabled || o.disabled, s: o.hasAttribute('selected') });

  class BfSelect extends HTMLElement {
    static formAssociated = true;
    static observedAttributes = ['required', 'placeholder'];

    constructor() {
      super();
      this._i = this.attachInternals();
      this._v = '';
      this._items = [];
      this._a = -1;
      this._type = '';
    }

    get name() { return this.getAttribute('name') || ''; }
    get value() { return this._v; }
    set value(v) { v = String(v); this._pick(this._items.some((i) => !i.g && i.v === v) ? v : '', false); }
    get form() { return this._i.form; }
    get validity() { return this._i.validity; }
    get validationMessage() { return this._i.validationMessage; }
    get willValidate() { return this._i.willValidate; }
    checkValidity() { return this._i.checkValidity(); }
    reportValidity() { return this._i.reportValidity(); }
    focus(o) { this._t?.focus(o); }

    connectedCallback() {
      if (!this._t) this._mount();
      this._sync();
    }
    disconnectedCallback() { this._pop?.close(); }
    attributeChangedCallback() { if (this._t) this._paint(); }
    formDisabledCallback(d) { if (this._t) this._t.disabled = d; }
    formResetCallback() { this.removeAttribute('data-invalid'); this._pick(this._def(), false); }
    formStateRestoreCallback(s) { if (typeof s === 'string') this._pick(s, false); }

    _mount() {
      const t = this._t = h('button', 'bf-trigger', { type: 'button', 'aria-haspopup': 'listbox', 'aria-expanded': 'false' });
      t.append(h('span'));
      try { t.disabled = this.matches(':disabled'); } catch {}
      const m = this._m = h('div', 'bf-menu', { role: 'listbox', tabindex: '-1', popover: 'manual' });
      if (!NATIVE) m.hidden = true;
      this.append(t, m);
      this._pop = popup(t, m, () => {
        const sel = this._items.findIndex((i) => !i.g && i.v === this._v && !i.d);
        this._act(sel >= 0 ? sel : this._step(-1, 1), true);
        m.focus({ preventScroll: true });
      });

      t.onclick = () => (this._pop.isOpen ? this._pop.close() : this._pop.open());
      t.onkeydown = (e) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); this._pop.open(); }
      };
      this.addEventListener('click', (e) => { if (e.target === this) t.focus(); }); // <label for> forwards a click to the host
      this.addEventListener('invalid', () => this.setAttribute('data-invalid', ''));

      m.onclick = (e) => {
        const o = e.target.closest('.bf-opt');
        if (o) this._choose(+o.dataset.i);
      };
      m.onpointermove = (e) => {
        const o = e.target.closest('.bf-opt');
        if (o && o.getAttribute('aria-disabled') !== 'true') this._act(+o.dataset.i, false);
      };
      m.onkeydown = (e) => {
        const k = e.key;
        if (k === 'Tab') return this._pop.close();
        if (k === 'ArrowDown') this._act(this._step(this._a, 1), true);
        else if (k === 'ArrowUp') this._act(this._step(this._a, -1), true);
        else if (k === 'Home') this._act(this._step(-1, 1), true);
        else if (k === 'End') this._act(this._step(this._items.length, -1), true);
        else if (k === 'Enter' || k === ' ') this._choose(this._a);
        else if (k === 'Escape') this._pop.close(true);
        else if (k.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) this._typeahead(k);
        else return;
        e.preventDefault();
        e.stopPropagation();
      };

      new MutationObserver((muts) => {
        if (muts.some((x) => !m.contains(x.target) && !t.contains(x.target))) this._sync();
      }).observe(this, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['value', 'disabled', 'selected', 'label'] });
    }

    // Read the <option>/<optgroup> children; re-render only when they changed.
    _sync() {
      const items = [];
      for (const n of this.children) {
        if (n.tagName === 'OPTION') items.push(option(n));
        else if (n.tagName === 'OPTGROUP') {
          items.push({ g: n.label });
          for (const c of n.children) if (c.tagName === 'OPTION') items.push(option(c, n.disabled));
        }
      }
      const sig = JSON.stringify(items);
      if (sig === this._sig) return;
      this._sig = sig;
      this._items = items;
      this._m.replaceChildren(...items.map((it, i) => {
        if (it.g !== undefined) { const g = h('div', 'bf-group', { role: 'presentation' }); g.textContent = it.g; return g; }
        const o = h('div', 'bf-opt', { role: 'option', id: 'bfo' + ++seq, 'data-i': i });
        if (it.d) o.setAttribute('aria-disabled', 'true');
        o.textContent = it.t;
        return o;
      }));
      const has = this._ready && items.some((i) => !i.g && i.v === this._v);
      if (items.some((i) => !i.g)) this._ready = true;
      this._pick(has ? this._v : this._def(), false);
    }

    _def() {
      const real = this._items.filter((i) => !i.g);
      const attr = this.getAttribute('value');
      const hit = attr != null ? real.find((i) => i.v === attr) : real.find((i) => i.s);
      if (hit) return hit.v;
      return this.hasAttribute('placeholder') ? '' : (real.find((i) => !i.d)?.v ?? '');
    }

    _pick(v, user) {
      const changed = v !== this._v;
      this._v = v;
      this._i.setFormValue(v, v);
      this._paint();
      if (user && changed) {
        this.removeAttribute('data-invalid');
        fire(this, 'input');
        fire(this, 'change');
      }
    }

    _paint() {
      const it = this._items.find((i) => !i.g && i.v === this._v);
      this._t.firstChild.textContent = it ? it.t : this.getAttribute('placeholder') || ' ';
      this._t.classList.toggle('bf-placeholder', !this._v);
      const label = [...(this._i.labels || [])].map((l) => l.textContent.trim()).join(' ');
      if (label) this._t.setAttribute('aria-label', label + ', ' + this._t.firstChild.textContent);
      for (const o of this._m.querySelectorAll('.bf-opt')) o.setAttribute('aria-selected', String(this._items[+o.dataset.i].v === this._v));
      if (this.hasAttribute('required') && !this._v) {
        this._i.setValidity({ valueMissing: true }, this.dataset.requiredMessage || 'Please select an option.', this._t);
      } else this._i.setValidity({});
    }

    // Next enabled option from index `from` in direction `dir` (stays put at the ends).
    _step(from, dir) {
      for (let i = from + dir; i >= 0 && i < this._items.length; i += dir) {
        const it = this._items[i];
        if (!it.g && !it.d) return i;
      }
      return from < 0 || from >= this._items.length ? -1 : from;
    }

    _act(i, scroll) {
      this._a = i;
      for (const o of this._m.querySelectorAll('.bf-opt')) {
        const on = +o.dataset.i === i;
        o.toggleAttribute('data-active', on);
        if (on) {
          this._m.setAttribute('aria-activedescendant', o.id);
          if (scroll) o.scrollIntoView({ block: 'nearest' });
        }
      }
    }

    _choose(i) {
      const it = this._items[i];
      if (!it || it.g !== undefined || it.d) return;
      this._pop.close(true);
      this._pick(it.v, true);
    }

    _typeahead(ch) {
      clearTimeout(this._tt);
      this._type += ch.toLowerCase();
      this._tt = setTimeout(() => (this._type = ''), 600);
      const n = this._items.length;
      const from = this._type.length > 1 ? this._a : this._a + 1;
      for (let k = 0; k < n; k++) {
        const i = (from + k + n) % n, it = this._items[i];
        if (!it.g && !it.d && it.t.toLowerCase().startsWith(this._type)) return this._act(i, true);
      }
    }
  }

  /* ------------------------------------------------------------- bf-date-picker */

  const pad = (n) => String(n).padStart(2, '0');
  const iso = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const parse = (s) => {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || '');
    if (!m) return null;
    const d = new Date(+m[1], m[2] - 1, +m[3]);
    return d.getMonth() === m[2] - 1 ? d : null;
  };
  const addMonths = (d, n) => {
    const t = new Date(d.getFullYear(), d.getMonth() + n, 1);
    t.setDate(Math.min(d.getDate(), new Date(t.getFullYear(), t.getMonth() + 1, 0).getDate()));
    return t;
  };
  const addDays = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);

  class BfDatePicker extends HTMLElement {
    static formAssociated = true;
    static observedAttributes = ['required', 'placeholder', 'min', 'max'];

    constructor() {
      super();
      this._i = this.attachInternals();
      this._v = '';
    }

    get name() { return this.getAttribute('name') || ''; }
    get value() { return this._v; }
    set value(v) { this._pick(parse(v) ? v : '', false); }
    get form() { return this._i.form; }
    get validity() { return this._i.validity; }
    get validationMessage() { return this._i.validationMessage; }
    get willValidate() { return this._i.willValidate; }
    checkValidity() { return this._i.checkValidity(); }
    reportValidity() { return this._i.reportValidity(); }
    focus(o) { this._t?.focus(o); }

    connectedCallback() {
      if (this._t) return;
      this._mount();
      this._pick(parse(this.getAttribute('value')) ? this.getAttribute('value') : '', false);
    }
    disconnectedCallback() { this._pop?.close(); }
    attributeChangedCallback() { if (this._t) this._paint(); }
    formDisabledCallback(d) { if (this._t) this._t.disabled = d; }
    formResetCallback() { this.removeAttribute('data-invalid'); this._pick(parse(this.getAttribute('value')) ? this.getAttribute('value') : '', false); }
    formStateRestoreCallback(s) { if (typeof s === 'string') this._pick(parse(s) ? s : '', false); }

    _mount() {
      const t = this._t = h('button', 'bf-trigger', { type: 'button', 'aria-haspopup': 'dialog', 'aria-expanded': 'false' });
      t.append(h('span'));
      try { t.disabled = this.matches(':disabled'); } catch {}
      const m = this._m = h('div', 'bf-menu', { role: 'dialog', 'aria-label': 'Choose date', popover: 'manual' });
      if (!NATIVE) m.hidden = true;

      const l = lang(this);
      const nav = (label, d) => {
        const b = h('button', 'bf-btn bf-btn-ghost', { type: 'button', 'aria-label': label });
        b.textContent = d < 0 ? '‹' : '›';
        b.onclick = () => this._go(addMonths(this._f, d), false);
        return b;
      };
      this._ms = h('select', 'bf-input', { 'aria-label': 'Month' });
      const mf = new Intl.DateTimeFormat(l, { month: 'long' });
      for (let i = 0; i < 12; i++) this._ms.add(new Option(mf.format(new Date(2023, i, 1)), i));
      this._ys = h('select', 'bf-input', { 'aria-label': 'Year' });
      this._ms.onchange = () => this._go(addMonths(this._f, +this._ms.value - this._f.getMonth()), false);
      this._ys.onchange = () => this._go(addMonths(this._f, (+this._ys.value - this._f.getFullYear()) * 12), false);
      const head = h('div', 'bf-cal-head');
      head.append(nav('Previous month', -1), this._ms, this._ys, nav('Next month', 1));

      this._g = h('div', 'bf-grid', { role: 'group' });
      this._g.onclick = (e) => {
        const b = e.target.closest('.bf-day');
        if (b && !b.disabled) this._choose(parse(b.dataset.d));
      };
      this._g.onkeydown = (e) => this._key(e);

      const foot = h('div', 'bf-cal-foot');
      const today = h('button', 'bf-btn bf-btn-ghost bf-btn-sm', { type: 'button' });
      today.textContent = this.dataset.todayLabel || 'Today';
      today.onclick = () => { const d = new Date(); if (this._ok(d)) this._choose(d); };
      this._clear = h('button', 'bf-btn bf-btn-ghost bf-btn-sm', { type: 'button' });
      this._clear.textContent = this.dataset.clearLabel || 'Clear';
      this._clear.onclick = () => { this._pop.close(true); this._pick('', true); };
      foot.append(today, this._clear);

      const cal = h('div', 'bf-cal');
      cal.append(head, this._g, foot);
      m.append(cal);
      this.append(t, m);

      this._pop = popup(t, m, () => {
        let d = parse(this._v) || new Date();
        const lo = this._min(), hi = this._max();
        if (lo && d < lo) d = lo;
        if (hi && d > hi) d = hi;
        this._go(d, true);
      });
      t.onclick = () => (this._pop.isOpen ? this._pop.close() : this._pop.open());
      t.onkeydown = (e) => { if (e.key === 'ArrowDown') { e.preventDefault(); this._pop.open(); } };
      m.onkeydown = (e) => { if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); this._pop.close(true); } else if (e.key === 'Tab' && !m.contains(document.activeElement)) this._pop.close(); };
      this.addEventListener('click', (e) => { if (e.target === this) t.focus(); });
      this.addEventListener('invalid', () => this.setAttribute('data-invalid', ''));
    }

    _min() { return parse(this.getAttribute('min')); }
    _max() { return parse(this.getAttribute('max')); }
    _ok(d) {
      const lo = this._min(), hi = this._max();
      return !(lo && iso(d) < iso(lo)) && !(hi && iso(d) > iso(hi));
    }

    _choose(d) {
      this._pop.close(true);
      this._pick(iso(d), true);
    }

    _pick(s, user) {
      const changed = s !== this._v;
      this._v = s;
      this._i.setFormValue(s, s);
      this._paint();
      if (user && changed) {
        this.removeAttribute('data-invalid');
        fire(this, 'input');
        fire(this, 'change');
      }
    }

    _paint() {
      const d = parse(this._v);
      const text = d ? new Intl.DateTimeFormat(lang(this), { dateStyle: 'medium' }).format(d) : this.getAttribute('placeholder') || 'Pick a date';
      this._t.firstChild.textContent = text;
      this._t.classList.toggle('bf-placeholder', !d);
      const label = [...(this._i.labels || [])].map((x) => x.textContent.trim()).join(' ');
      if (label) this._t.setAttribute('aria-label', label + ', ' + text);
      this._clear.hidden = this.hasAttribute('required');
      if (this.hasAttribute('required') && !d) {
        this._i.setValidity({ valueMissing: true }, this.dataset.requiredMessage || 'Please pick a date.', this._t);
      } else if (d && !this._ok(d)) {
        this._i.setValidity({ rangeUnderflow: true }, 'Date is outside the allowed range.', this._t);
      } else this._i.setValidity({});
    }

    // Show the month of `d` and make `d` the keyboard-focus day.
    _go(d, focus) {
      this._f = d;
      const l = lang(this), sel = parse(this._v), todayIso = iso(new Date());
      const y = d.getFullYear(), now = new Date().getFullYear();
      const y0 = Math.min(this._min()?.getFullYear() ?? now - 100, y), y1 = Math.max(this._max()?.getFullYear() ?? now + 10, y);
      if (this._yr !== y0 + '-' + y1) {
        this._yr = y0 + '-' + y1;
        this._ys.replaceChildren(...Array.from({ length: y1 - y0 + 1 }, (_, i) => new Option(y0 + i, y0 + i)));
      }
      this._ms.value = d.getMonth();
      this._ys.value = y;

      let ws = +this.getAttribute('week-start');
      if (!this.hasAttribute('week-start')) {
        try { const w = new Intl.Locale(l); ws = (w.getWeekInfo ? w.getWeekInfo() : w.weekInfo).firstDay % 7; } catch { ws = 0; }
      }
      const full = new Intl.DateTimeFormat(l, { dateStyle: 'full' });
      const dow = new Intl.DateTimeFormat(l, { weekday: 'narrow' });
      const cells = [];
      for (let i = 0; i < 7; i++) {
        const c = h('div', 'bf-dow', { 'aria-hidden': 'true' });
        c.textContent = dow.format(new Date(2023, 0, 1 + ((ws + i) % 7)));
        cells.push(c);
      }
      const first = new Date(y, d.getMonth(), 1);
      const start = addDays(first, -((first.getDay() - ws + 7) % 7));
      for (let k = 0; k < 42; k++) {
        const c = addDays(start, k), s = iso(c);
        const b = h('button', 'bf-day', { type: 'button', 'data-d': s, 'aria-label': full.format(c), tabindex: s === iso(d) ? '0' : '-1', 'aria-pressed': String(!!sel && s === iso(sel)) });
        b.textContent = c.getDate();
        if (c.getMonth() !== d.getMonth()) b.setAttribute('data-out', '');
        if (s === todayIso) b.setAttribute('data-today', '');
        if (!this._ok(c)) b.disabled = true;
        cells.push(b);
      }
      this._g.setAttribute('aria-label', new Intl.DateTimeFormat(l, { month: 'long', year: 'numeric' }).format(d));
      this._g.replaceChildren(...cells);
      if (focus) this._g.querySelector('[tabindex="0"]').focus({ preventScroll: true });
      if (this._pop.isOpen && !matchMedia(SHEET).matches) position(this._m, this._t);
    }

    _key(e) {
      const f = this._f;
      const next = {
        ArrowLeft: () => addDays(f, -1),
        ArrowRight: () => addDays(f, 1),
        ArrowUp: () => addDays(f, -7),
        ArrowDown: () => addDays(f, 7),
        PageUp: () => addMonths(f, e.shiftKey ? -12 : -1),
        PageDown: () => addMonths(f, e.shiftKey ? 12 : 1),
        Home: () => addDays(f, -[...this._g.querySelectorAll('.bf-day')].findIndex((b) => b.dataset.d === iso(f)) % 7),
        End: () => addDays(f, 6 - [...this._g.querySelectorAll('.bf-day')].findIndex((b) => b.dataset.d === iso(f)) % 7),
      }[e.key];
      if (!next) return;
      e.preventDefault();
      this._go(next(), true);
    }
  }

  /* ------------------------------------------------------------------ bf-dialog */

  class BfDialog extends HTMLElement {
    connectedCallback() {
      if (this.hasAttribute('open') && !this._d) {
        const go = () => this.show();
        document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', go, { once: true }) : go();
      }
    }

    // Built on first show, so the content is fully parsed by then.
    _build() {
      if (this._d) return;
      const id = 'bfd' + ++seq;
      const d = this._d = h('dialog', 'bf-dialog');
      const title = this.getAttribute('heading'), desc = this.getAttribute('description');
      if (title) {
        const head = h('div', 'bf-dialog-head');
        const t = h('h2', 'bf-dialog-title', { id: id + 't' });
        t.textContent = title;
        head.append(t);
        d.setAttribute('aria-labelledby', id + 't');
        if (desc) {
          const p = h('p', 'bf-dialog-desc', { id: id + 'd' });
          p.textContent = desc;
          head.append(p);
          d.setAttribute('aria-describedby', id + 'd');
        }
        d.append(head);
      }
      const body = h('div', 'bf-dialog-body'), foot = h('div', 'bf-dialog-foot');
      for (const n of [...this.childNodes]) (n.nodeType === 1 && n.getAttribute('slot') === 'footer' ? foot : body).append(n);
      const x = h('button', 'bf-dialog-x', { type: 'button', 'data-bf-close': '', 'aria-label': 'Close' });
      x.textContent = '×';
      d.append(body, foot, x);
      let down;
      d.addEventListener('pointerdown', (e) => (down = e.target));
      d.addEventListener('click', (e) => { if (e.target === d && down === d) d.close(); });
      d.addEventListener('close', () => { this.removeAttribute('open'); fire(this, 'close'); });
      this.append(d);
      this.setAttribute('data-built', '');
    }

    get isOpen() { return !!this._d?.open; }
    show() {
      this._build();
      if (!this._d.open) { this._d.showModal(); this.setAttribute('open', ''); fire(this, 'open'); }
    }
    close() { this._d?.close(); }
  }

  /* ------------------------------------------------------------------- bf-toast */

  const regions = {};
  function region(pos) {
    let r = regions[pos];
    if (!r || !r.isConnected) {
      r = regions[pos] = h('div', 'bf-toasts', { role: 'region', 'aria-label': 'Notifications', 'data-pos': pos });
      if (NATIVE) r.setAttribute('popover', 'manual');
      document.body.append(r);
    }
    if (NATIVE) { try { r.hidePopover(); r.showPopover(); } catch {} } // top layer, above any open dialog
    return r;
  }

  class BfToast extends HTMLElement {
    connectedCallback() {
      if (this._ok) return;
      this._ok = true;
      const type = this.getAttribute('type');
      this.setAttribute('role', type === 'error' || type === 'destructive' ? 'alert' : 'status');
      const x = h('button', 'bf-toast-x', { type: 'button', 'aria-label': 'Dismiss' });
      x.textContent = '×';
      x.onclick = () => this.dismiss();
      this.append(x);
      this.onmouseenter = () => clearTimeout(this._tm);
      this.onmouseleave = () => this._arm();
      region(this.getAttribute('position') || 'bottom-right').append(this);
      this._arm();
    }
    _arm() {
      const ms = +(this.getAttribute('duration') ?? 4000);
      clearTimeout(this._tm);
      if (ms > 0) this._tm = setTimeout(() => this.dismiss(), ms);
    }
    dismiss() {
      if (this._gone) return;
      this._gone = true;
      clearTimeout(this._tm);
      this.setAttribute('data-leaving', '');
      setTimeout(() => this.remove(), 200);
    }
  }

  function toast(message, o = {}) {
    const t = document.createElement('bf-toast');
    t.textContent = message;
    for (const k of ['type', 'duration', 'position']) if (o[k] != null) t.setAttribute(k, o[k]);
    document.body.append(t);
    return t;
  }

  /* ------------------------------------------------------------------- wiring */

  for (const [name, cls] of [['bf-select', BfSelect], ['bf-date-picker', BfDatePicker], ['bf-dialog', BfDialog], ['bf-toast', BfToast]]) {
    if (!customElements.get(name)) customElements.define(name, cls);
  }

  // <button data-bf-open="#id"> opens a dialog; [data-bf-close] closes the one it is in. Works for content added later.
  document.addEventListener('click', (e) => {
    const o = e.target.closest?.('[data-bf-open]');
    if (o) document.querySelector(o.getAttribute('data-bf-open'))?.show?.();
    const c = e.target.closest?.('[data-bf-close]');
    if (c) c.closest('bf-dialog')?.close();
  });
  // Server-driven toasts, e.g. htmx `HX-Trigger: {"bf:toast": {"message": "Saved", "type": "success"}}`.
  document.addEventListener('bf:toast', (e) => toast(e.detail?.message ?? String(e.detail ?? ''), e.detail || {}));

  window.BefUI = { version: '1.0.0', toast };
})();
