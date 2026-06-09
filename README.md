# Ciao Patisserie — 2.0

A quiet-luxury, single-scroll marketing site for Ciao Patisserie (Le Cordon
Bleu–trained French pâtisserie, Sector 58, Gurgaon). React + Vite, with Lenis
smooth scroll and Motion animations.

## Run

```bash
npm install
npm run dev      # http://localhost:5180
npm run build    # production bundle → dist/
npm run preview  # serve the built bundle
```

## Where things live

- `src/data/content.js` — all copy (hero, nav, ticker, stats, vitrine, order, chef) + brand info.
- `src/data/menu.js` — the menu board items, tabs, and footnote.
- `src/styles/` — design tokens, typography, global styles.
- `src/components/` — one component per section (`Loader`, `Nav`, `Hero`, `Ticker`, `TrustBar`, `Vitrine`, `Menu`, `Order` → `OrderForm` + `ChefBio`, `Footer`) plus `ui/` primitives.
- `public/gallery/` — product photography (`product-01…16.png`, `srishti.png`).

## Before going live — replace these

1. **WhatsApp number** — `brand.whatsapp` in `src/data/content.js` (currently `91XXXXXXXXXX`).
2. **Enquiry form backend** — `OrderForm.jsx` `handleSubmit` currently just shows the
   success state; wire it to Formspree / an email endpoint / your API.
3. **Images** — swap any photo by editing the `img`/`src` paths in `content.js`.

## Notes

- `?noloader` in the URL skips the intro curtains (handy for QA / sharing a deep link).
- Fully responsive, keyboard-accessible tabbed menu, and `prefers-reduced-motion`
  is respected (no parallax / auto-marquee / long loader).
