# Deployment Guide — ACO CLIM Website

## Current Setup: GitHub Pages

The site is deployed at:  
**https://youssssssefx.github.io/Acoclim/**

Repository: **https://github.com/Youssssssefx/Acoclim**  
Branch: **main** (root of branch is served directly)

---

## Deploying an Update (standard workflow)

```bash
cd "c:/Users/THINKBOOK/Desktop/PROJET ACOCLIM WEBSITE"

# 1. Stage only the changed files
git add index.html
git add styles.css
git add script.js
# Add images if you changed/added any:
# git add images/...

# 2. Commit with a descriptive message
git commit -m "Update: describe what you changed"

# 3. Push to GitHub
git push origin main
```

GitHub Pages picks up the push automatically. The live site updates in **1–3 minutes**.

---

## First-Time Git Setup (if starting fresh on a new machine)

```bash
# Configure identity (required once per machine)
git config --global user.name "Youssssssefx"
git config --global user.email "youssefelazhar99@gmail.com"

# Clone the repo
git clone https://github.com/Youssssssefx/Acoclim.git
cd Acoclim
```

---

## Vercel Deployment (alternative — faster, supports custom domains easily)

Vercel gives you free HTTPS, CDN, and instant deploys from GitHub.

### Steps

1. Go to https://vercel.com and sign in with your GitHub account.
2. Click **"Add New Project"**.
3. Find and import the **Acoclim** repository.
4. Framework preset: select **"Other"** (it's a static site).
5. Build command: leave **empty**.
6. Output directory: leave **empty** (or set to `.`).
7. Click **"Deploy"**.

Vercel assigns a URL like `acoclim.vercel.app` immediately.

### Auto-deploy on push

After the initial Vercel setup, every `git push origin main` automatically triggers a new deploy — no manual action needed.

---

## Custom Domain Setup (Vercel)

If ACO CLIM gets a domain like `acoclim.ma`:

1. In Vercel project → **Settings → Domains**.
2. Add `acoclim.ma` and `www.acoclim.ma`.
3. Vercel shows you DNS records to add:
   - `A` record: point `@` to Vercel's IP
   - `CNAME` record: point `www` to `cname.vercel-dns.com`
4. Add these in your domain registrar's DNS panel.
5. Vercel auto-provisions SSL certificate (HTTPS) within minutes.

### Custom Domain Setup (GitHub Pages)

1. In your domain registrar, add:
   - `CNAME` record: `www` → `youssssssefx.github.io`
   - Or `A` records pointing to GitHub Pages IPs (see GitHub docs)
2. In the GitHub repo → **Settings → Pages → Custom domain**: enter `www.acoclim.ma`
3. Check "Enforce HTTPS" after DNS propagates (~24h).

---

## Environment Variables

**None required.** This is a fully static website with no server-side code, no API keys, and no build process.

The only "dynamic" integrations are:
- **WhatsApp links** — hard-coded `wa.me` URLs in `index.html`
- **Email** — hard-coded `mailto:` link in `index.html` and `script.js`

---

## Checking Deploy Status

- **GitHub Pages**: Go to repo → **Actions** tab, or **Settings → Pages** to see current status.
- **Vercel**: Dashboard shows build logs and deploy history per commit.

---

## Rollback

### GitHub Pages rollback

```bash
# See recent commits
git log --oneline -10

# Revert to a previous commit (replace HASH with the commit hash)
git revert HEAD
git push origin main
# Or for a specific commit:
git revert <HASH>
git push origin main
```

### Vercel rollback

In Vercel dashboard → **Deployments** → click any previous deploy → **"Promote to Production"**.
