# Project Structure — ACO CLIM Website

## Root Files

| File                      | Purpose                                                      |
|---------------------------|--------------------------------------------------------------|
| `index.html`              | The entire single-page website — all sections in one file    |
| `styles.css`              | All CSS: layout, animations, responsive breakpoints          |
| `script.js`               | All JavaScript: sliders, carousel, form, scroll effects      |
| `project-brief-updated.md`| Original client specification document                       |

---

## Folders

### `brand_assets/`
Logo files for the company.

| File                                   | Used?  | Notes                              |
|----------------------------------------|--------|------------------------------------|
| `daoudia.png`                          | **YES**| Active logo — header + footer      |
| `LOGO ACOCLIM PNG (3).png`             | No     | Old logo, kept as backup           |
| `Blue Modern Air Condition Logo...png` | No     | Old logo variant                   |

### `images/10 photos/`
Photos used in the **"Pourquoi ACO CLIM ?"** carousel and hero section background.

| File                                              | Used in                    |
|---------------------------------------------------|----------------------------|
| `3d-rendering-ventilation-system.jpg`             | Hero background            |
| `businessman-examining-papers-table.jpg`          | Service card 3 + carousel  |
| `defective-manometers-zoom-shot.jpg`              | Carousel slide             |
| `elasticcomputefarm-air-conditioner-1185041.jpg`  | Carousel slide             |
| `low-angle-shot-metal-black-ceiling...jpg`        | Carousel slide             |
| `modern-autonomous-heating-system-boiler-room.jpg`| Carousel slide             |
| `pexels-shvetsa-5953713.jpg`                      | Service card 2 + carousel  |
| `ventilation-duct-building-roof.jpg`              | Carousel slide             |

### `images/climatisation-cvc/`
Photos for **Service Card 1** (Climatisation & CVC).

| File        | Used in         |
|-------------|-----------------|
| `1.jpg.jpg` | Carousel only   |
| `2.jpg.jpg` | **Service card 1 (active image)** |
| `3.jpg.jpg` | Not used        |
| `4.jpg.jpg` | Carousel only   |
| `5.jpg.jpg` | Not used        |

### `images/froid-commercial/`
Reserved for Service Card 2. Currently empty / not linked.

### `images/contrats-services/`
Reserved for Service Card 3. Currently empty / not linked.

---

## HTML Sections (`index.html`)

The page is divided into these `<section>` elements:

| ID / Element     | Section Name              | Notes                                     |
|------------------|---------------------------|-------------------------------------------|
| `#header`        | Navigation bar            | Fixed/sticky, blue gradient, logo + nav   |
| `#accueil`       | Hero                      | Full-width, overlay, CTA button           |
| `#services`      | Services                  | 3 expandable cards with image sliders     |
| `#temoignages`   | Testimonials              | 3 static cards                            |
| `#catalogue`     | Portfolio / Catalogue     | WhatsApp Business Catalogue CTA           |
| `#pourquoi`      | Pourquoi ACO CLIM ?       | Full-width image carousel (10 slides)     |
| `#contact`       | Contact                   | Split layout: form + WhatsApp panel       |
| `footer`         | Footer                    | 3-column: logo/desc, links, contact       |

---

## CSS Architecture (`styles.css`)

The stylesheet is organized top-to-bottom matching the HTML sections:

```
1. CSS Variables & Reset
2. Typography (Poppins font)
3. Header & Navigation
4. Hero Section
5. Services Section
   └── Service Cards
   └── Image Sliders
6. Testimonials
7. Portfolio / Catalogue
8. Why Us (Pourquoi ACO CLIM) Carousel
9. Contact Section
   └── Form Panel
   └── WhatsApp Panel
10. Footer
11. Utility classes (.reveal, .btn, .section-badge, etc.)
12. Animations (@keyframes)
13. Responsive breakpoints (@media queries)
```

### Key CSS Variables (in `:root`)

```css
--blue-dark: #001a4d
--blue:      #002e7f
--red:       #9d211f
--radius-lg: 16px
--shadow-lg: 0 20px 60px rgba(0,0,0,0.12)
--transition: 0.35s cubic-bezier(0.4,0,0.2,1)
```

### Important Class Patterns

| Class / Selector          | What it does                                     |
|---------------------------|--------------------------------------------------|
| `.reveal`                 | Hidden by default; `.visible` triggers fade-in   |
| `.service-card.active`    | Card is expanded (mobile tap)                    |
| `.service-card:hover`     | Card expands on desktop hover                    |
| `.why-carousel-slide.is-active` | Active carousel slide                      |
| `.nav-link.active`        | Currently visible section's nav link highlighted |
| `header.scrolled`         | Header gets shadow after user scrolls 30px       |

---

## JavaScript Modules (`script.js`)

| Section (comment block)          | What it does                                        |
|----------------------------------|-----------------------------------------------------|
| Header scroll effect             | Adds `.scrolled` class at 30px scroll               |
| Mobile hamburger menu            | Toggles `.open` on hamburger + navList              |
| Active nav link on scroll        | Highlights nav link matching visible section        |
| Scroll-reveal (IntersectionObserver) | Fades in `.reveal` elements as they enter view  |
| Counter animation                | Animates numbers in `.stat-number[data-count]`      |
| Service card expand (mobile)     | Click to toggle `.active` on touch devices          |
| Smooth anchor scroll             | Overrides default anchor jump with smooth scroll    |
| 3D tilt effect                   | Mouse-move rotateX/Y on testimonial/why/contact cards |
| Parallax hero orbs               | Moves `.orb-blue` / `.orb-red` on scroll            |
| Image sliders (service cards)    | Per-card slider with dots, prev/next, auto-play     |
| Why-Us carousel (IIFE)           | Full carousel with swipe, dots, counter, auto-play  |
| Service icon micro-animation     | `iconSpin` keyframe on card hover                   |
| Contact form (IIFE)              | Show/hide entreprise field + mailto on submit       |
