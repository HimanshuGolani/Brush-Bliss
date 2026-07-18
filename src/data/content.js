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
// grid renders whatever is listed and gracefully shows a "coming soon"
// placeholder set when this array is empty.
//
// Example once you have files:
// import resinPlate from "../assets/images/resin-engagement-plate.jpg";
// {
//   id: "resin-engagement-plate",
//   type: "image",           // "image" | "video"
//   src: resinPlate,
//   category: "resin",       // matches a services[].id, used for filtering
//   caption: "Engagement plate, gold-leaf resin pour",
// }

export const galleryItems = [];

export const galleryFilters = [
  { id: "all", label: "All Work" },
  ...services.map((s) => ({ id: s.id, label: s.title })),
];
