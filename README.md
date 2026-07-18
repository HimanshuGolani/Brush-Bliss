# Brush&Bliss

A React + Vite site for the Brush&Bliss art studio — resin, mandala,
tanjore, fabric, canvas, and texture art, plus a custom-orders catalog
for gifts and special occasions.

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview   # preview the production build locally
```

## Project structure

```
src/
  assets/
    images/     # put photos of finished art here
    videos/     # put short clips here
  components/   # one component + matching .css per section
  data/
    content.js  # all site copy + the gallery list lives here
  App.jsx       # page layout — order of sections
  index.css     # design tokens (colors, fonts, spacing) + global styles
```

## Adding photos & videos

The gallery starts empty on purpose — no placeholder stock content. To
add real work:

1. Drop image/video files into `src/assets/images/` or
   `src/assets/videos/` (see the README in each folder for details).
2. Import the file and add an entry to the `galleryItems` array in
   `src/data/content.js`, with a `category` matching one of the
   service ids (`resin`, `mandala`, `tanjore`, `fabric`, `canvas`,
   `texture`, `decor`).

The gallery grid, filters, and empty-state placeholders are already
wired up — nothing else needs to change. You can add any number of
images and videos; the grid reflows automatically.

## Editing text

All copy — services, custom order lists, the studio blurb — lives in
`src/data/content.js`. Section-specific wording (headings, hero
tagline, contact links) lives directly inside each component in
`src/components/`.

Update the placeholder contact links in `src/components/Contact.jsx`
(`mailto:` address and Instagram URL) with the studio's real details.

## Design notes

- Palette: deep tanjore maroon + espresso-brown grounds with marigold
  and sunrise-orange accents (chosen per numerology), and a soft gold
  for gilding-style linework — see the tokens at the top of
  `src/index.css`.
- Type: Cormorant Garamond (display) paired with Jost (body/UI).
- The rotating mandala line-art is the site's signature motif, drawn
  in `src/components/Mandala.jsx` as plain SVG (no image asset needed).
- Fully responsive from small phones up through large desktop, with
  a mobile slide-down menu under ~900px.
- Respects `prefers-reduced-motion` and has visible keyboard focus
  states throughout.
