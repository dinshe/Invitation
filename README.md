# 💍 Nethmi & Dinuth — Wedding Invitation Website

> **A premium luxury digital wedding invitation** built with React + Vite, fully static, and deployable on GitHub Pages for free.

---

## ✨ Features

| Feature | Details |
|---------|---------|
| 🎬 Hero Section | Full-screen cinematic opening with floating flower particles |
| ⏱️ Countdown Timer | Live countdown to 20 August 2026, 9:30 AM Sri Lanka time |
| 💑 Couple Story | Interactive photo timeline with scroll animations |
| 📸 Photo Gallery | Masonry layout with lightbox popup |
| 💒 Wedding Details | Ceremony, venue, reception cards + event timeline |
| 📍 Location | Venue map, address, Google Maps directions |
| 💌 RSVP Form | Google Sheets integration, validation, loading/success states |
| ✉️ Guestbook | Wishes section with Google Sheets backend |
| 🎵 Music Player | Floating play/pause toggle with volume control |
| 📱 Mobile-first | Fully responsive, hamburger nav, touch-friendly |
| ♿ Accessible | ARIA labels, focus management, semantic HTML |
| 🔍 SEO Ready | Meta tags, Open Graph, Twitter Card |

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ ([download](https://nodejs.org))
- npm 9+

### Install & Run

```bash
cd wedding-invitation
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## 📁 Project Structure

```
wedding-invitation/
│
├── public/
│   ├── favicon.svg               ← Wedding ring favicon
│   ├── music/
│   │   └── wedding-music.mp3     ← 🎵 Place your audio file here
│   └── images/
│       └── gallery/              ← 📸 Place real wedding photos here
│
├── src/
│   ├── components/
│   │   ├── Navbar.jsx/css        ← Sticky transparent nav
│   │   ├── LoadingScreen.jsx/css ← Elegant intro animation
│   │   └── MusicPlayer.jsx/css  ← Floating music player
│   │
│   ├── sections/
│   │   ├── Hero.jsx/css          ← Full-screen hero
│   │   ├── Countdown.jsx/css     ← Live countdown timer
│   │   ├── CoupleStory.jsx/css  ← Timeline story
│   │   ├── Gallery.jsx/css       ← Masonry gallery + lightbox
│   │   ├── WeddingDetails.jsx/css← Cards + event schedule
│   │   ├── RSVP.jsx/css          ← Google Sheets RSVP form
│   │   ├── Location.jsx/css      ← Venue map & address
│   │   ├── Guestbook.jsx/css     ← Wishes + guest messages
│   │   └── Footer.jsx/css        ← Elegant closing footer
│   │
│   ├── styles/
│   │   └── global.css            ← Design tokens, utilities, animations
│   │
│   ├── config.js                 ← ⚙️ ALL settings in one place
│   ├── App.jsx                   ← Root component
│   └── main.jsx                  ← React entry point
│
├── google-apps-script/
│   └── Code.gs                   ← Google Apps Script for RSVP backend
│
├── index.html                    ← SEO + Google Fonts
├── vite.config.js                ← GitHub Pages base path
├── package.json
└── README.md
```

---

## ⚙️ Customization

All wedding details live in **[`src/config.js`](src/config.js)**. Open it and update:

```js
export const config = {
  bride:           "Nethmi",
  groom:           "Dinuth",
  weddingDateISO:  "2026-08-20T09:30:00+05:30",
  venueName:       "Rock Fort Beach Resort",
  RSVP_API_URL:    "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE",
  // ...
};
```

### Replace Photos

Look for `📸 REPLACE` comments in the code. Each one tells you exactly where to swap the Unsplash placeholder with your real photo.

**For gallery photos:** Place files in `public/images/gallery/` and update paths in `src/sections/Gallery.jsx`:
```js
src: '/wedding-invitation/images/gallery/your-photo.jpg'
```

### Replace Music

Place your audio file at `public/music/wedding-music.mp3`, then update `config.musicFile` if you use a different filename.

---

## 💌 Setting Up RSVP (Google Sheets)

### Step 1 — Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet named **"Nethmi & Dinuth Wedding"**
3. Copy the **Spreadsheet ID** from the URL:
   ```
   https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit
   ```

### Step 2 — Deploy Google Apps Script

1. Open [Google Apps Script](https://script.google.com)
2. Click **New Project**
3. Paste the contents of `google-apps-script/Code.gs`
4. Update `SPREADSHEET_ID` with your sheet's ID
5. Click **Deploy** → **New Deployment**
   - Type: **Web App**
   - Execute as: **Me**
   - Who has access: **Anyone**
6. Click **Deploy** and **Authorize**
7. Copy the **Web App URL**

### Step 3 — Update config.js

```js
RSVP_API_URL:      "https://script.google.com/macros/s/YOUR_ID/exec",
GUESTBOOK_API_URL: "https://script.google.com/macros/s/YOUR_ID/exec",
```

> **Note:** You can use the same URL for both RSVP and Guestbook — the script auto-detects the type.

---

## 🌐 Deploying to GitHub Pages

### Step 1 — Create GitHub Repository

```bash
git init
git add .
git commit -m "Initial commit: Wedding invitation website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/wedding-invitation.git
git push -u origin main
```

### Step 2 — Update Base Path

In `vite.config.js`, ensure the `base` matches your repo name:
```js
base: '/wedding-invitation/',   // ← your GitHub repo name
```

Also update the URLs in `index.html`:
```html
<meta property="og:url" content="https://YOUR_USERNAME.github.io/wedding-invitation/" />
```

### Step 3 — Build

```bash
npm run build
```

This generates the `dist/` folder.

### Step 4 — Deploy via GitHub Actions (Recommended)

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
          cache-dependency-path: wedding-invitation/package.json
      - run: cd wedding-invitation && npm ci && npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: wedding-invitation/dist
      - uses: actions/deploy-pages@v4
```

Then in your GitHub repo:
1. Go to **Settings** → **Pages**
2. Source: **GitHub Actions**
3. Push to main → site deploys automatically!

### Step 5 — Manual Deploy Alternative

If you prefer manual:
```bash
npm install -g gh-pages
npm run build
npx gh-pages -d dist
```

---

## 🎨 Design Customization

Edit CSS variables in `src/styles/global.css`:

```css
:root {
  --color-gold:     #c9a96e;  /* Primary gold accent */
  --color-cream:    #fdf8f2;  /* Background */
  --color-rose:     #d4a5a5;  /* Soft rose accent */
  --font-serif:     'Cormorant Garamond', serif;
  --font-script:    'Dancing Script', cursive;
}
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| React 18 | UI Components |
| Vite 5 | Build tool & dev server |
| Framer Motion 11 | Smooth animations |
| react-intersection-observer | Scroll-triggered reveals |
| Google Fonts | Cormorant Garamond, Montserrat, Dancing Script |
| Canvas API | Floating particle animation |
| Google Apps Script | Serverless RSVP backend |
| GitHub Pages | Free static hosting |

---

## 📱 Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+
- Mobile Safari / Chrome for Android

---

## 📋 Checklist Before Going Live

- [ ] Update all details in `src/config.js`
- [ ] Replace Unsplash placeholder images with real photos
- [ ] Add wedding music to `public/music/`
- [ ] Set up Google Apps Script and update API URL
- [ ] Test RSVP form submission
- [ ] Update Google Maps URL to actual venue
- [ ] Update `base` in `vite.config.js` with your repo name
- [ ] Update Open Graph URLs in `index.html`
- [ ] Run `npm run build` and check for errors
- [ ] Deploy and test on mobile device

---

## 💛 Made with Love

*For Nethmi & Dinuth — Thursday, 20 August 2026*
*Rock Fort Beach Resort, Blue Ocean Ballroom, Dalawella, Unawatuna, Galle, Sri Lanka*

---

> **Questions?** Open an issue or reach out directly.
