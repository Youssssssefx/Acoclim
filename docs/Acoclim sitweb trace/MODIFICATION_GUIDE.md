# Modification Guide — ACO CLIM Website

This guide covers the most common changes a developer or content manager might need to make.  
All changes are in `index.html`, `styles.css`, or `script.js` — no build step required.

---

## 1. Changing Text Content

### Company name / tagline
Search for the text in `index.html`. The tagline appears in:
- Hero section: `<h1 class="hero-title">`
- Footer: `<p class="footer-desc">`

### Phone number / WhatsApp number
The WhatsApp number `+212661651070` appears multiple times. Search for it in `index.html`:
```
Ctrl+F → 212661651070
```
Replace all occurrences. Current locations:
- Navbar CTA button (`href="https://wa.me/212661651070?text=..."`)
- Hero CTA button
- Contact section WhatsApp panel (`href="tel:+212661651070"` and `href="https://wa.me/212661651070?text=..."`)
- Footer

### Email address
Search for `acoclim.contact@gmail.com` in both `index.html` and `script.js`.  
It appears in:
- `index.html`: mailto link in contact section and footer
- `script.js`: line ~330 — the form submit handler builds a `mailto:` URL

### WhatsApp pre-filled message text
The text after `?text=` in each `wa.me` link is URL-encoded. To change it:
1. Write the plain text message
2. URL-encode it (use any online URL encoder, or `encodeURIComponent()` in browser console)
3. Replace the encoded string in `index.html`

### Testimonials
In `index.html`, find `<section id="temoignages">`.  
Each testimonial is a `.testimonial-card`. Edit the text inside `.testimonial-text`, `.client-name`, `.client-role`, and adjust star icons (filled `★` vs empty `☆`).

### Service descriptions (sub-services list)
In `index.html`, find `<section id="services">`.  
Each card has a `.service-card-inner` with `<ul>` lists. Edit the `<li>` text directly.

---

## 2. Updating Images

### Hero background image
In `styles.css`, find:
```css
.hero {
  background: linear-gradient(...), url('images/10 photos/3d-rendering-ventilation-system.jpg') ...
```
Replace the filename with your new image path (must be inside the project folder).  
Recommended size: at least 1920×1080px.

### Service card images (the photo at the top of each card)

**Card 1 — Climatisation & CVC**  
In `index.html`, find `<div class="service-img-area" data-slider>` inside the first `.service-card`.  
Replace `src="images/climatisation-cvc/2.jpg.jpg"` with your image path.

**Card 2 — Froid Commercial & Industriel**  
Same structure, replace `src="images/10 photos/pexels-shvetsa-5953713.jpg"`.

**Card 3 — Contrats & Services Pro**  
Same structure, replace `src="images/10 photos/businessman-examining-papers-table.jpg"`.

To add multiple images (slider), add more `<img>` tags inside `.slider-track`. The slider JS handles the rest automatically — dots and arrows appear when there are 2+ images.

### Pourquoi ACO CLIM carousel images
In `index.html`, find `<div class="why-carousel-track">`.  
Each slide is:
```html
<div class="why-carousel-slide">
  <img src="images/..." alt="...">
</div>
```
Add, remove, or reorder slides freely. The carousel JS auto-detects the count.

### Logo
Replace `brand_assets/daoudia.png` with a new file.  
The logo is referenced in two places in `index.html`:
- Inside `<header>` — `.logo-badge > a > img`
- Inside `<footer>` — `.footer-logo > img`

Keep the filename the same, or update both `src` attributes.

---

## 3. Changing Colors

All brand colors are defined as CSS variables at the top of `styles.css`:

```css
:root {
  --blue-dark: #001a4d;
  --blue:      #002e7f;
  --red:       #9d211f;
  /* ... */
}
```

Changing a variable here updates it everywhere on the page.

### Header & footer gradient
```css
/* In styles.css — search for "header-gradient" or the header background */
background: linear-gradient(135deg, var(--blue-dark) 0%, var(--blue) 50%, #1a4ca8 100%);
```
Adjust the stop colors or percentages.

---

## 4. Adding a New Section

1. In `index.html`, add a new `<section id="new-section">` after an existing one.
2. Add a nav link in `<nav>`: `<li><a href="#new-section" class="nav-link">Label</a></li>`
3. Style the section in `styles.css`.
4. The scroll-reveal animation (`.reveal` class) and nav highlighting work automatically for any `section[id]`.

---

## 5. Adding a New Service Card

1. Copy an existing `.service-card` block in `index.html`.
2. Update: title, icon emoji, sub-service list, and the `<img src="...">` inside `.slider-track`.
3. No JS changes needed — the slider and card expand code use `querySelectorAll` and loop over all cards.

---

## 6. Updating the WhatsApp Business Catalogue Link

Search `index.html` for `wa.me/c/31285246476400`.  
This appears in the `#catalogue` section CTA button and possibly the footer.  
Replace with the new catalogue URL.

---

## 7. Changing Contact Form Behavior

The form is handled in `script.js` at the bottom (the last IIFE).  
Currently it builds a `mailto:` URL on submit, which opens the user's email client.

### To change the recipient email:
```js
// script.js — last section, find:
window.location.href = `mailto:acoclim.contact@gmail.com?subject=...`
// Replace the email address
```

### To add a new form field:
1. Add the `<input>` or `<textarea>` in `index.html` with a unique `id`.
2. In `script.js`, retrieve it: `const newField = document.getElementById('cf-newfield').value.trim();`
3. Append it to the `body` string before the `window.location.href` line.

---

## 8. Adjusting the Navbar

### Navbar height
```css
/* styles.css */
.site-header { height: 70px; }
```

### Logo size
```css
.logo img { height: calc(90px * 0.94); }
```

### Adding/removing nav items
Edit the `<ul id="navList">` in `index.html`. Add `<li><a href="#sectionId" class="nav-link">Label</a></li>`.

---

## 9. Changing Animation Timings

| Effect                  | Where to edit                              | Property          |
|-------------------------|--------------------------------------------|-------------------|
| Carousel auto-advance   | `script.js` — Why carousel IIFE            | `3500` (ms)       |
| Service card slider     | `script.js` — image sliders loop           | `3200` (ms)       |
| Scroll-reveal stagger   | `script.js` — revealObserver               | `idx * 100` (ms)  |
| Counter duration        | `script.js` — animateCounters              | `1800` (ms)       |
| Card hover transition   | `styles.css` — `.service-card`             | `--transition`    |
