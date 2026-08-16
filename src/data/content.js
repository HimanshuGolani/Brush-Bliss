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

// Gallery items are generated from the media files in public/products/
// by scripts/generate-gallery.js. Re-run the generator to update:
//   node scripts/generate-gallery.js
export { galleryItems } from "./galleryItems";

import { galleryItems as _galleryItems } from "./galleryItems";

const _subCategories = (() => {
  const seen = new Map();
  for (const item of _galleryItems) {
    if (item.subcategory) {
      const id = item.subcategory;
      if (!seen.has(id)) {
        seen.set(id, { id, label: prettifySubcategoryLabel(id), count: 0 });
      }
      seen.get(id).count += 1;
    }
  }
  return Array.from(seen.values()).sort((a, b) => a.label.localeCompare(b.label));
})();

function prettifySubcategoryLabel(id) {
  return id
    .replace(/-/g, " ")
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export const galleryFilters = [
  { id: "all", label: "All Work" },
  ...services.map((s) => ({ id: s.id, label: s.title, group: null })),
  { id: "resin-subcategories", label: "Resin Products", group: "divider" },
  ..._subCategories.map((sub) => ({ id: sub.id, label: sub.label, group: "resin", count: sub.count })),
];
