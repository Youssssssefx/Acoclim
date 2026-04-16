# Troubleshooting Guide — ACO CLIM Website

---

## Visual / Layout Issues

### Images not loading
**Symptom**: Broken image icon, empty space where image should be.  
**Causes & Fixes**:
- Path is wrong. Open browser DevTools (F12) → Console tab. Look for `404` errors on image URLs.
- The path in HTML must match the actual folder/filename exactly, including case sensitivity on Linux servers.
- Some filenames have double extensions like `2.jpg.jpg` — this is intentional for this project; don't rename them without updating `index.html`.

### Logo not showing
- Confirm `brand_assets/daoudia.png` exists in the project folder.
- Check the `src` attribute in both header and footer `<img>` tags.

### Page looks unstyled (no CSS)
- Confirm `styles.css` is in the same folder as `index.html`.
- Check `<link rel="stylesheet" href="styles.css">` is present in `<head>`.
- Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac).

### Fonts not loading (wrong font displayed)
- The site uses Google Fonts (Poppins). An internet connection is required to load them.
- If offline, the browser falls back to `sans-serif` — the layout is unaffected.

### Section content not animating / staying invisible
- The `.reveal` class starts hidden. Elements become visible when `IntersectionObserver` fires.
- If elements stay invisible, check that `script.js` is loading: DevTools → Console for errors.
- Disable browser extensions that block scripts.

---

## JavaScript Errors

### `Cannot read properties of null` on page load
**Symptom**: Console error like `hamburger is null` or `navList is null`.  
**Cause**: The JS file is running before the HTML is parsed, OR an element ID was renamed/removed.  
**Fix**: Confirm `<script src="script.js">` is at the **bottom** of `<body>` (it is, by design). If you renamed an HTML element ID, update the matching `getElementById()` call in `script.js`.

### Carousel not working (Pourquoi ACO CLIM)
- Check that `id="whyCarousel"`, `id="whyDots"`, `id="whyCounter"`, `id="whyPrev"`, `id="whyNext"` all exist in `index.html`.
- The IIFE at the top returns early if `#whyCarousel` is not found.

### Image slider arrows not working
- Each `[data-slider]` element needs `.slider-track`, `.slider-dots`, `.slider-prev`, `.slider-next` inside it.
- If any is missing, the JS will throw a `Cannot read properties of null` error.

### Contact form does nothing on submit
- The form requires at minimum: `cf-nom`, `cf-ville`, `cf-message` to be filled. Empty fields are silently rejected.
- If "Entreprise" is selected, `cf-entreprise` is also required.
- The form opens the default email client (`mailto:`). If no email client is configured, nothing visually happens — this is expected browser behavior.

---

## Mobile Issues

### Hamburger menu not opening
- Confirm `id="hamburger"` and `id="navList"` exist in `index.html`.
- Confirm the `.open` class toggles — check in DevTools → Elements while clicking.

### Nav links invisible in mobile menu
- The mobile dropdown has a blue gradient background. Nav links should be `color: rgba(255,255,255,0.9)`.
- In `styles.css`, find `@media (max-width: 768px)` and check `.nav-list.open .nav-link` color.

### Blue tap highlight on click (iOS/Android)
- This is suppressed globally via `-webkit-tap-highlight-color: transparent` in the CSS reset.
- If it reappears, check the global reset at the top of `styles.css`.

### Cards not expanding on mobile tap
- On touch devices, cards use `click` events (not CSS hover).
- The `isTouchDevice()` check uses `window.matchMedia('(hover: none)')`. Some devices may misreport this.
- Fallback: any device with `window.innerWidth <= 900` also gets click behavior.

---

## Git / Deployment Issues

### `remote origin already exists` error
```bash
# Don't use git remote add — use set-url instead:
git remote set-url origin https://github.com/Youssssssefx/Acoclim.git
```

### `Author identity unknown` error
```bash
git config user.name "Youssssssefx"
git config user.email "youssefelazhar99@gmail.com"
```

### GitHub Pages showing old version after push
- Wait 2–3 minutes. GitHub Pages has a propagation delay.
- Hard refresh the browser: `Ctrl+Shift+R`.
- Check repo → **Settings → Pages** to confirm the source branch is `main`.

### Push rejected (non-fast-forward)
```bash
# Someone else pushed, or you made changes on GitHub.com directly.
git pull origin main --rebase
git push origin main
```

### GitHub Pages 404 after push
- The `index.html` file must be at the **root** of the `main` branch (not inside a subfolder).
- Check repo → **Settings → Pages → Source** is set to `main` branch, `/ (root)`.

---

## Performance Issues

### Page feels slow / laggy on scroll
The site uses several performance techniques already:
- `requestAnimationFrame` throttling for scroll listeners
- `will-change: transform, opacity` on animated cards
- `transform: translateZ(0)` to promote cards to GPU layers
- No `filter: blur()` on scroll (expensive — was removed)

If performance regresses:
1. Open DevTools → Performance tab → Record while scrolling.
2. Look for long paint/layout tasks.
3. The most expensive operations are: large unoptimized images, `backdrop-filter`, and `filter: blur()` inside scroll handlers. Avoid adding these back.

### Images loading slowly
- Compress images before adding them. Recommended tools: `squoosh.app`, `tinypng.com`.
- Target: under 200KB per image for web.
- Hero background: under 400KB.

---

## Browser Compatibility

| Browser         | Status     | Notes                                           |
|-----------------|------------|-------------------------------------------------|
| Chrome 90+      | Full       | Primary target                                  |
| Firefox 88+     | Full       | —                                               |
| Safari 14+      | Full       | Uses `-webkit-` prefixes already in place       |
| Edge 90+        | Full       | Chromium-based                                  |
| IE 11           | Broken     | Not supported — uses CSS variables, ES6         |
| Chrome Android  | Full       | Mobile layout tested                            |
| Safari iOS      | Full       | Tap highlight suppressed                        |
