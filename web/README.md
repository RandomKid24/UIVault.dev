# befui-web

befui without React. One CSS file, one JS file, no dependencies, no build step. For plain HTML, Django, PHP, Rails.

```html
<link rel="stylesheet" href="https://unpkg.com/befui-web@1/befui.css">
<script src="https://unpkg.com/befui-web@1/befui.js" defer></script>

<form method="post">
  <bf-select name="country" required>
    <option value="in">India</option>
    <option value="jp">Japan</option>
  </bf-select>
  <bf-date-picker name="start" required></bf-date-picker>
  <button class="bf-btn">Save</button>
</form>
```

- `befui.css`: the befui colour variables plus `bf-btn`, `bf-input`, `bf-checkbox`, `bf-badge`, `bf-card`.
- `<bf-select>`, `<bf-date-picker>`: submit with the form, validate with `required`, bottom sheet on phones.
- `<bf-dialog>`: native `<dialog>`; open with `data-bf-open="#id"`.
- `<bf-toast>` / `BefUI.toast(msg, {type})`.
- Works for elements added later (htmx, `innerHTML`).

Open `docs.html` for a copy-paste example of each, `index.html` for the smallest working page.
