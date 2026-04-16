# ACO CLIM — Website Documentation

## Project Overview

Single-page marketing website for **ACO CLIM**, an HVAC & Climate Engineering company based in Morocco.  
The site showcases services, client testimonials, a project portfolio, and a contact form.

- **Live URL**: https://youssssssefx.github.io/Acoclim/
- **GitHub Repo**: https://github.com/Youssssssefx/Acoclim
- **Contact email**: acoclim.contact@gmail.com
- **WhatsApp**: +212 661 651 070
- **WhatsApp Business Catalogue**: https://wa.me/c/31285246476400

---

## Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Markup     | HTML5 (single file: `index.html`)   |
| Styling    | CSS3 (`styles.css`) — no framework  |
| Logic      | Vanilla JavaScript (`script.js`)    |
| Fonts      | Google Fonts — Poppins              |
| Hosting    | GitHub Pages (branch: `main`)       |
| Assets     | Local images + SVG/PNG logos        |

No build tool, no npm, no framework. Everything is static — open `index.html` in a browser and it works.

---

## Brand Colors

| Name       | Hex       | Usage                              |
|------------|-----------|------------------------------------|
| Blue Dark  | `#001a4d` | Header/footer gradient start       |
| Blue       | `#002e7f` | Primary brand color, CTAs          |
| Blue Light | `#1a4ca8` | Header/footer gradient end         |
| Red        | `#9d211f` | Accent — hero underline, badges    |
| White      | `#ffffff` | Backgrounds, text on dark surfaces |
| Text Dark  | `#1a1a2e` | Body text                          |

---

## How to Run Locally

No server needed. Just open the file:

```bash
# Option 1 — double-click
open "index.html"   # macOS
start index.html    # Windows

# Option 2 — VS Code Live Server extension
# Right-click index.html → "Open with Live Server"

# Option 3 — Python quick server (any directory)
python -m http.server 8000
# then visit http://localhost:8000
```

---

## How to Deploy

### GitHub Pages (current setup)

```bash
cd "PROJET ACOCLIM WEBSITE"

# First time — set remote (already done)
git remote set-url origin https://github.com/Youssssssefx/Acoclim.git

# Every update
git add index.html styles.css script.js
git commit -m "describe your change"
git push origin main
```

GitHub Pages automatically serves from the `main` branch root.  
Changes go live within 1–2 minutes after push.

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for Vercel / custom domain setup.

---

## Folder Structure (quick view)

```
PROJET ACOCLIM WEBSITE/
├── index.html              ← entire page structure
├── styles.css              ← all styling
├── script.js               ← all interactivity
├── brand_assets/           ← logos
├── images/
│   ├── 10 photos/          ← carousel + hero background
│   ├── climatisation-cvc/  ← service card 1 images
│   ├── froid-commercial/   ← service card 2 images (unused currently)
│   └── contrats-services/  ← service card 3 images (unused currently)
└── docs/
    └── Acoclim sitweb trace/  ← this documentation
```

See [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) for full details.
