# Velour — Fragrance House

A premium, animated single-page perfume shop. Pure HTML/CSS/JS — no build
step, no framework required. Works as-is on GitHub Pages.

## Structure
```
velour-site/
├── index.html      → all page markup
├── css/style.css    → all styling (cream theme, animations)
├── js/script.js     → cart logic, product data, scroll animations
└── images/          → (empty) drop local product photos here if you want
                       to replace the hotlinked ones
```

## Images & icons
- Product and hero/story photos are hotlinked from Unsplash's CDN
  (free-license photos by Fulvio Ciccolo, Katya Azimova, and Laura
  Chouette — credited in the footer). They load directly from
  `images.unsplash.com`, so there's nothing to download — it just works
  once the site is live.
- Icons are the real [Lucide](https://lucide.dev) icon set, loaded from
  a CDN script tag in `index.html`.
- If you'd rather use your own product photography: save your files into
  `images/` (e.g. `images/product-1.jpg`) and swap the `img` paths in
  `js/script.js` (for products) and `index.html` (for hero/story).

## Deploying to GitHub Pages
1. Create a new GitHub repo and push these files to the root (or to a
   `docs/` folder).
2. In the repo, go to **Settings → Pages**.
3. Under "Build and deployment", set Source to **Deploy from a branch**,
   pick `main` (or `master`) and `/ (root)`, then Save.
4. GitHub will give you a URL like `https://yourusername.github.io/repo-name/`
   within a minute or two.

## Editing content
- Product names, prices, and descriptions: `PRODUCTS` array at the top of
  `js/script.js`.
- Hero headline / copy / feature strip text: directly in `index.html`.
- Colors and fonts: CSS variables are inlined at the top of
  `css/style.css` (cream `#F8F2E7`, cocoa `#3C2A21`, terracotta `#C87A56`).

## What's interactive
- Add-to-cart with a live count badge and slide-out bag drawer
- Toast notification on add
- Scroll-triggered fade/slide-in animations
- Floating/pulsing hero visuals
- Mobile hamburger menu
