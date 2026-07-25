// Central place for site copy & structured content.
// Keeping this separate from components makes it easy to edit text
// without touching JSX.

export const services = [
  {
    id: "resin",
    title: "Resin Art",
    seal: "R",
    blurb:
      "Fluid pours, embedded florals and depth-cast layers — resin work built to catch the light.",
  },
  {
    id: "mandala",
    title: "Mandala Art",
    seal: "M",
    blurb:
      "Hand-plotted symmetry, dot by dot — meditative circular patterns for walls and gifting.",
  },
  {
    id: "tanjore",
    title: "Tanjore Art",
    seal: "T",
    blurb:
      "Traditional South Indian relief work with gold-foil gilding and richly pigmented figures.",
  },
  {
    id: "fabric",
    title: "Fabric Painting",
    seal: "F",
    blurb:
      "Textile-safe pigment work on sarees, dupattas and cushion covers — wearable art.",
  },
  {
    id: "canvas",
    title: "Canvas Painting",
    seal: "C",
    blurb:
      "Acrylic and mixed-media canvases, from abstract statement pieces to custom portraits.",
  },
  {
    id: "texture",
    title: "Texture Art",
    seal: "Tx",
    blurb:
      "Palette-knife relief and layered mediums that give a painting weight you can feel.",
  },
  {
    id: "decor",
    title: "Home Decor",
    seal: "H",
    blurb:
      "Functional art for the home — vases, clocks, key holders and nameplates, made to order.",
  },
];

export const customOrders = {
  intro:
    "Custom orders for special occasions & personalised, creative gift items.",
  categories: [
    {
      id: "resin-gifts",
      title: "Resin",
      items: [
        "Engagement Plate",
        "Pooja Thali",
        "Name Plate",
        "Car Hanging",
        "Rakhi",
        "Key Chain",
        "Exquisite Jewelry",
        "Unique Gift Items",
        "Wall Clock",
      ],
    },
    {
      id: "home-decor-gifts",
      title: "Home Decor",
      items: [
        "Decorative Vase",
        "Wall Hanging",
        "Key Holder",
        "Name Plate",
        "Texture Art",
        "Painting",
      ],
    },
  ],
};

// --- Gallery -----------------------------------------------------------
// Drop files into src/assets/images or src/assets/videos, then add an
// entry here. Nothing needs to change in the component — the gallery
// grid renders whatever is listed, each tile gets the hover overlay
// (fullscreen + details) automatically, and a "coming soon" placeholder
// set shows for any category with no items yet.
//
// Full field list:
// {
//   id: "resin-engagement-plate",   // unique string
//   type: "image",                  // "image" | "video"
//   src: resinPlate,                // imported file, e.g.:
//                                    //   import resinPlate from "../assets/images/resin-engagement-plate.jpg";
//   category: "resin",              // must match a services[].id
//   title: "Engagement Plate",      // shown in the details panel
//   caption: "Gold-leaf resin pour",// short line shown on the tile itself
//   price: "₹2,499",                // string, so you can write "From ₹2,499" etc.
//   materials: "Epoxy resin, gold foil, MDF base",
//   colour: "Ivory & gold",
//   dimensions: "10 in diameter",   // optional
//   description: "A longer sentence or two for the details panel.",
// }

const placeholder = (label, from, to) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${from}"/>
        <stop offset="100%" stop-color="${to}"/>
      </linearGradient>
    </defs>
    <rect width="800" height="1000" fill="url(#g)"/>
    <circle cx="400" cy="430" r="150" fill="none" stroke="#fbf3e4" stroke-opacity="0.35" stroke-width="1.5"/>
    <circle cx="400" cy="430" r="110" fill="none" stroke="#fbf3e4" stroke-opacity="0.25" stroke-width="1"/>
    <text x="50%" y="63%" font-family="Georgia, serif" font-size="38" fill="#fbf3e4" fill-opacity="0.92" text-anchor="middle">${label}</text>
  </svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

// Sample entries so the card interactions (hover, fullscreen view,
// details panel) are visible immediately. Each is flagged `isDemo` —
// remove that flag (or just replace the item) once you swap in real
// photography; the "Sample" tag on the tile only shows when it's true.
export const galleryItems = [
  {
    id: "demo-resin-plate",
    type: "image",
    src: placeholder("Resin", "#7a2a12", "#e8940c"),
    category: "resin",
    title: "Engagement Plate",
    caption: "Gold-leaf resin pour",
    price: "₹2,499",
    materials: "Epoxy resin, gold foil, MDF base",
    colour: "Ivory & gold",
    dimensions: "10 in diameter",
    description:
      "A fluid resin pour finished with hand-placed gold foil, made to order for engagements and milestone celebrations.",
    isDemo: true,
  },
  {
    id: "demo-mandala",
    type: "image",
    src: placeholder("Mandala", "#5c1a1f", "#ff7a29"),
    category: "mandala",
    title: "Dot Mandala Wall Art",
    caption: "Hand-plotted symmetry",
    price: "₹1,799",
    materials: "Acrylic on canvas board",
    colour: "Maroon, gold & ivory",
    dimensions: "12 x 12 in",
    description:
      "A meditative, hand-plotted mandala built dot by dot for a wall that needs a calm, symmetrical focal point.",
    isDemo: true,
  },
  {
    id: "demo-tanjore",
    type: "image",
    src: placeholder("Tanjore", "#3d1014", "#c9a227"),
    category: "tanjore",
    title: "Tanjore Ganesha Panel",
    caption: "Relief work with gold gilding",
    price: "₹4,999",
    materials: "Wood base, gesso relief, 22k gold foil, gouache",
    colour: "Deep red & gold",
    dimensions: "14 x 14 in",
    description:
      "Traditional South Indian relief work with gilded gold foil and richly pigmented figures — a statement piece for pooja rooms and living spaces alike.",
    isDemo: true,
  },
  {
    id: "demo-decor-vase",
    type: "image",
    src: placeholder("Home Decor", "#241505", "#e8940c"),
    category: "decor",
    title: "Decorative Vase",
    caption: "Textured, hand-painted finish",
    price: "₹1,299",
    materials: "Ceramic, acrylic paint, resin coating",
    colour: "Terracotta & marigold",
    dimensions: "8 in height",
    description:
      "A functional decor piece finished with our signature textured technique, at home on a console table or shelf.",
    isDemo: true,
  },
];

export const galleryFilters = [
  { id: "all", label: "All Work" },
  ...services.map((s) => ({ id: s.id, label: s.title })),
];
