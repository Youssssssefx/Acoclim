# Changelog — ACO CLIM Website

All significant changes, features, and iterations are documented here in reverse chronological order.

---

## v1.8 — 2026-04-16

### Changed
- Removed captions/titles from all slides in the "Pourquoi ACO CLIM ?" carousel
  - Deleted `<div class="why-carousel-caption" id="whyCaption">` from `index.html`
  - Removed `caption` variable, `captions[]` array, and caption update logic from `script.js`

---

## v1.7 — 2026-04-16

### Fixed
- Removed `-webkit-tap-highlight-color` blue flash on mobile tap for all `<a>` and `<button>` elements
  - Added global reset: `a, button { -webkit-tap-highlight-color: transparent; }`

### Fixed
- Mobile nav links invisible (white text on white background)
  - Changed mobile dropdown background to match header: blue gradient `linear-gradient(135deg, var(--blue-dark) 0%, var(--blue) 100%)`

---

## v1.6 — 2026-04-16

### Fixed
- Performance: scroll handlers lagging on mid-range devices
  - Replaced `filter: brightness(0.55) blur(1.5px)` on dimmed service cards with `opacity: 0.55` (GPU-friendly)
  - Removed `backdrop-filter: blur(8px)` from header (expensive, causes full repaint)
  - Added `will-change: transform, opacity` and `transform: translateZ(0)` to `.service-card`
  - Wrapped nav highlight scroll handler in `requestAnimationFrame` with pending flag

---

## v1.5 — 2026-04-16

### Deployed
- Pushed project to GitHub repository: **https://github.com/Youssssssefx/Acoclim**
- Enabled GitHub Pages on `main` branch
- Live URL: **https://youssssssefx.github.io/Acoclim/**

---

## v1.4 — 2026-04-16

### Changed
- Service card images: moved from hidden hover-reveal state to always-visible position at the top of each card
  - Restructured HTML: `.service-img-area` placed before `.service-card-inner`
  - Removed expand/collapse image behavior; images are now permanently displayed
  - Resized image area: `height: 170px` with `border-radius` matching card top corners

### Changed
- Service card image assignments:
  - Card 1 (Climatisation & CVC): `images/climatisation-cvc/2.jpg.jpg` (single image)
  - Card 2 (Froid Commercial): `images/10 photos/pexels-shvetsa-5953713.jpg` (single image)
  - Card 3 (Contrats & Services Pro): `images/10 photos/businessman-examining-papers-table.jpg` (single image)

### Changed
- Hero title forced onto 2 lines using `<br>` tags in the subtitle

---

## v1.3 — 2026-04-16

### Changed
- Logo: replaced previous ACO CLIM logo with `brand_assets/daoudia.png` in both header and footer
- "Pourquoi ACO CLIM ?" carousel: updated to 10 slides
  - Slides 1–3: `climatisation-cvc/1.jpg.jpg`, `2.jpg.jpg`, `4.jpg.jpg`
  - Slides 4–10: all 7 images from `images/10 photos/`
  - Removed slides for images 3 and 5 from climatisation-cvc

### Changed
- Hero background: reverted to solid blue gradient (no background image)

---

## v1.2 — 2026-04-15

### Added
- Contact section redesigned: split two-column layout
  - Left panel: contact form (nom/prénom, ville, type particulier/entreprise, conditional entreprise field, message)
  - Right panel: WhatsApp direct contact with green gradient background
- Form logic in `script.js`: show/hide entreprise field based on radio selection, mailto construction on submit

### Changed
- Header background: blue gradient `linear-gradient(135deg, #001a4d 0%, #002e7f 50%, #1a4ca8 100%)`
- Footer background: same blue gradient; all text changed to white
- Removed 3 old contact cards

### Removed
- Gmail popup overlay (the email collection modal)
- Email float button (bottom-right corner)

---

## v1.1 — 2026-04-15

### Added
- Navbar: added "Pourquoi ACO CLIM ?" section link (with `?` character)
- Navbar: added "Catalogue" section link
- Corresponding `<section>` elements: `#pourquoi`, `#catalogue`
- "Pourquoi ACO CLIM ?" full-width image carousel with:
  - Auto-advance every 3.5s
  - Prev/Next buttons
  - Dot indicators + slide counter
  - Touch swipe support
  - Pause on hover
- Portfolio section: WhatsApp Business Catalogue CTA button

### Changed
- WhatsApp pre-filled messages updated to new client-specified text for:
  - Navbar "Diagnostic gratuit" CTA button
  - Hero "Demander un devis" CTA button
  - Service card "Planifier une intervention" buttons
  - Service card "Parler à un expert" button
- Testimonials text updated to new client-provided content

### Changed
- Navbar height: `70px`
- Logo: sized to `calc(90px * 0.94)`, positioned with `absolute` + `translateY(calc(-50% + 0.15cm))` for visual centering with overflow

---

## v1.0 — Initial Build

### Added (full initial feature set)
- Fixed sticky header with logo + navigation
- Hero section: full-width background, gradient overlay, headline, CTA button (WhatsApp)
- Hero stats: animated counters (clients, interventions, availability)
- Services section: 3 expandable cards with:
  - Image sliders (prev/next/dots/auto-play)
  - Sub-service lists (Climatisation, Froid Commercial, Contrats Pro)
  - Expand on hover (desktop) / click (mobile/touch)
  - Service icon spin micro-animation on hover
- Testimonials: 3 cards with star ratings, client names, quotes
- Portfolio section: WhatsApp Business Catalogue link
- Contact section: initial 3-card layout (later redesigned in v1.2)
- Footer: 3-column layout (logo/desc, quick links, contact info)
- Scroll-reveal animations via `IntersectionObserver`
- Active nav link highlighting on scroll
- 3D tilt effect on testimonial, why-card, and contact cards
- Parallax on hero orbs (blue + red decorative blobs)
- Smooth anchor scroll with 80px header offset
- Mobile hamburger menu
- Responsive layout (desktop-first, mobile breakpoints at 768px / 480px)
- Performance: `requestAnimationFrame`-throttled scroll listeners
- Brand colors: `#002e7f` (blue), `#9d211f` (red)
- Font: Google Fonts — Poppins
