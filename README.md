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

The gallery currently shows four **sample** cards (marked with a
"Sample" tag) so you can see the hover/fullscreen/details interactions
working. Replace them with real work:

1. Drop image/video files into `src/assets/images/` or
   `src/assets/videos/` (see the README in each folder for details).
2. Import the file and add (or edit) an entry in the `galleryItems`
   array in `src/data/content.js`, with a `category` matching one of
   the service ids (`resin`, `mandala`, `tanjore`, `fabric`, `canvas`,
   `texture`, `decor`). The full field list — `title`, `price`,
   `materials`, `colour`, `dimensions`, `description` — is documented
   in the comment above the array.
3. Delete the four `demo-*` sample entries once you have real ones
   (or just leave them — the `isDemo` flag is only cosmetic).

The gallery grid, filters, and empty-state placeholders are already
wired up — nothing else needs to change. You can add any number of
images and videos; the grid reflows automatically.

**Card interactions:** hovering a card (or tapping it on touch
devices) reveals a translucent overlay with two actions — **Full
Screen** opens the image or video in a large modal with keyboard
(arrow key) navigation between pieces, and **Details** opens a panel
with price, materials, colour, dimensions and description.

## Editing text

All copy — services, custom order lists, the studio blurb — lives in
`src/data/content.js`. Section-specific wording (headings, hero
tagline, contact links) lives directly inside each component in
`src/components/`.

Update the placeholder contact links in `src/components/Contact.jsx`
(`mailto:` address and Instagram URL) with the studio's real details.

## Cart, Checkout & Orders

Every gallery item shows an **Add to Cart** button in its hover overlay. The
cart slide-out (reachable from the Navbar cart icon) lets visitors review
items, change quantities, remove pieces, and proceed to checkout. After
checkout, visitors enter their phone, email and shipping address, then place
the order. Their order is stored in a Google Sheet (see the next section) and
they see a confirmation screen with the message:

> Your order has been received successfully. You will be contacted over
> WhatsApp for payment and further order details.

Key files:

- `src/components/CartContext.jsx` — cart state + `localStorage` persistence
  (survives refresh) so the cart stays available across navigation.
- `src/components/Cart.jsx` — cart slide-over with quantity controls.
- `src/components/Checkout.jsx` — order summary + customer form, with
  frontend validation (phone, email, shipping address) and a loading state
  that blocks duplicate submissions.
- `src/components/OrderConfirmation.jsx` — success screen with an order
  summary and a "Chat on WhatsApp" link.
- `src/lib/googleSheets.js` — builds the order payload and POSTs it to the
  Google Apps Script endpoint configured in `.env`.

### Google Sheets integration

Orders are sent to Google Sheets via a **Google Apps Script web app** — no
server needed.

1. Create a Google Sheet (e.g. "Brush&Bliss Orders") and add a sheet tab
   named `Orders`.
2. In the sheet, open **Extensions → Apps Script** and paste this script:

```js
const SHEET_NAME = "Orders";
const HEADERS = [
  "Timestamp", "Order ID", "Customer Name", "Phone", "Email",
  "Shipping Address", "Products", "Quantities", "Product Details",
  "Item Count", "Total Amount", "Order Status",
];

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const row = body.row;

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(HEADERS);
    }
    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success", orderId: body.payload.orderId }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader("Access-Control-Allow-Origin", "*")
      .setHeader("Access-Control-Allow-Methods", "POST,OPTIONS")
      .setHeader("Access-Control-Allow-Headers", "Content-Type");
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader("Access-Control-Allow-Origin", "*")
      .setHeader("Access-Control-Allow-Methods", "POST,OPTIONS")
      .setHeader("Access-Control-Allow-Headers", "Content-Type");
  }
}

function doOptions(e) {
  return ContentService
    .createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeader("Access-Control-Allow-Origin", "*")
    .setHeader("Access-Control-Allow-Methods", "POST,OPTIONS")
    .setHeader("Access-Control-Allow-Headers", "Content-Type");
}
```

3. Click **Deploy → New deployment**, choose **Web app**, set:
   - *Execute as:* **Me**
   - *Who has access:* **Anyone** (or Anyone in your organisation)
   - *Description:* `Orders endpoint`
4. Click **Deploy** (you may need to authorize), then **Copy link**. That is
   your endpoint URL (it ends in `/exec`).
5. Copy `.env.example` to `.env` and paste the URL:

```
VITE_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/YOUR_ID/exec
```

> `.env` is in `.gitignore` so the URL is never committed. On Render, add the
> same `VITE_GOOGLE_SHEETS_URL` environment variable in the dashboard. Vite
> only exposes variables prefixed with `VITE_` to the client.

6. Restart the dev server (`npm run dev`) or rebuild (`npm run build`).

### Testing the flow

- `npm run dev`, then click a gallery item → **Add to Cart** → open the cart
  from the Navbar → **Checkout** → fill the form → **Place Order**.
- With no `VITE_GOOGLE_SHEETS_URL` set, a clear error is shown instead of
  submitting.
- Check the Google Sheet's `Orders` tab — each order is one row with the
  products and quantities stored so you can see exactly what was bought.

## Legal pages

Static, cookie-free policy pages are built as separate Vite entries:

- `privacy.html`, `terms.html`, `cookies.html` (at the project root), each
  powered by `src/components/legal/LegalPage.jsx` and content from
  `src/data/legalContent.js`.
- A 404 page (`404.html`) with a branded error screen, a site search that
  filters all pages, and links back to key sections.

Links to all four are in the site Footer, and the legal pages cross-link
between each other in a header nav.

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
- Smooth scrolling is powered by [Lenis](https://github.com/darkroomengineering/lenis)
  (`src/components/SmoothScroll.jsx`), synced to Framer Motion's frame
  loop per Lenis' own recommended integration — this keeps every
  scroll-linked animation (parallax, `whileInView` reveals) perfectly
  smooth. It's skipped entirely for people with reduced-motion enabled,
  who get plain native scrolling instead.
- A thin gold progress bar (`src/components/ScrollProgress.jsx`) tracks
  scroll position at the top of the page.
- All CTA buttons use `src/components/AnimatedButton.jsx` — a shared
  button with a soft magnetic cursor pull and a gold shimmer sweep on
  hover, in the spirit of [Animate UI](https://animate-ui.com)'s
  motion-driven button patterns (built directly on our own Framer
  Motion + design tokens rather than Animate UI's Tailwind/Radix
  registry, to stay consistent with the rest of the codebase).
- The hero mandala and headline have a subtle scroll-tied parallax via
  Framer Motion's `useScroll`/`useTransform`.
