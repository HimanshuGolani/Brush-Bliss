/*
 * Generates src/data/galleryItems.js from the images and videos that live
 * under public/products/.
 *
 * Folder layout:
 *   public/products/<category>/[/<subcategory>/]<file>
 *
 *   fabric_painting        -> category "fabric"   (flat, no subfolders)
 *   home_decor             -> category "decor"    (flat, no subfolders)
 *   resin/<subcategory>    -> category "resin"   (one level of subfolders)
 *
 * Each file becomes a gallery item. Image extensions -> type "image",
 * video extensions -> type "video". The item `src` is a public-path URL
 * (Vite serves `public/` at the root, so "/products/..." works in dev
 * and production).
 *
 * Run with:  node scripts/generate-gallery.js
 * (regenerate whenever you add/remove media)
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ROOT = path.resolve(__dirname, "..");
const PRODUCTS_DIR = path.join(ROOT, "public", "products");
const OUTPUT_FILE = path.join(ROOT, "src", "data", "galleryItems.js");
const THUMB_DIR = path.join(PRODUCTS_DIR, "_thumbs");

const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".jfif", ".gif"]);
const VIDEO_EXTS = new Set([".mp4", ".webm", ".mov", ".ogg"]);

// top-level folder -> existing service id (keeps gallery filters aligned
// with the studio's service labels in src/data/content.js)
const CATEGORY_MAP = {
  fabric_painting: "fabric",
  home_decor: "decor",
  resin: "resin",
};

const CATEGORY_LABELS = {
  fabric_painting: "Fabric Painting",
  home_decor: "Home Decor",
  resin: "Resin Art",
};

const CATEGORY_META = {
  fabric_painting: {
    materials: "Textile-safe acrylic pigments",
    description:
      "Hand-painted fabric art, made to bring warmth and colour to clothing and home textiles.",
  },
  home_decor: {
    materials: "Mixed media and finishes",
    description:
      "Functional, handcrafted pieces — vases, key holders, wall pieces and more — made for everyday beauty.",
  },
  resin: {
    materials: "Epoxy resin, pigment and gold foil",
    description:
      "Fluid pours, embedded florals and depth-cast layers, built to catch the light.",
  },
};

// resin/<subfolder> -> readable product title
const SUBCATEGORY_TITLES = {
  bracelets: "Resin Bracelet",
  car_hangings: "Car Hanging",
  engagement_tray: "Engagement Tray",
  jewellery: "Resin Jewellery",
  key_chains: "Key Chain",
  pendants: "Resin Pendant",
  rakhis: "Resin Rakhi",
  "pooja_plate(12'' size)": `12" Pooja Plate`,
  "pooja_plate(8'' size)": `8" Pooja Plate`,
};

function esc(str) {
  return String(str).replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function generateThumbnail(videoRelPath) {
  const videoAbsPath = path.join(PRODUCTS_DIR, videoRelPath);
  const videoName = `${path.basename(videoRelPath, path.extname(videoRelPath))}.jpg`;
  const thumbRelPath = `_thumbs/${videoName}`;
  const thumbAbsPath = path.join(THUMB_DIR, videoName);

  if (fs.existsSync(thumbAbsPath) && fs.statSync(thumbAbsPath).size > 0) {
    return `/products/${thumbRelPath}`;
  }

  if (!fs.existsSync(THUMB_DIR)) fs.mkdirSync(THUMB_DIR, { recursive: true });

  try {
    execSync(
      `ffmpeg -y -i ${JSON.stringify(videoAbsPath)} -ss 00:00:01 -vframes 1 -q:v 2 ${JSON.stringify(thumbAbsPath)}`,
      { stdio: "ignore", timeout: 30000 }
    );
    if (fs.existsSync(thumbAbsPath) && fs.statSync(thumbAbsPath).size > 0) {
      return `/products/${thumbRelPath}`;
    }
  } catch {
    // ffmpeg not available or failed — fall back gracefully
  }
  return null;
}

function isVideoFile(name) {
  const ext = path.extname(name).toLowerCase();
  return VIDEO_EXTS.has(ext);
}

function isImageFile(name) {
  const ext = path.extname(name).toLowerCase();
  return IMAGE_EXTS.has(ext);
}

function mediaType(name) {
  return isVideoFile(name) ? "video" : "image";
}

function slugify(str) {
  return String(str)
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w()'".-]/g, "")
    .replace(/^-+|-+$/g, "");
}

function prettifySubcategory(name) {
  if (SUBCATEGORY_TITLES[name]) return SUBCATEGORY_TITLES[name];
  return (
    name
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase()) + " (Resin)"
  );
}

function subcategoryId(name) {
  const pretty = prettifySubcategory(name);
  return String(pretty)
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^-\w()]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Walk `dir`, returning [{ relativePath, name }].
function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (entry.name === "_thumbs") continue;
      const full = path.join(dir, entry.name);
      out.push(...walk(full));
    } else {
      const full = path.join(dir, entry.name);
      out.push({
        relativePath: path.relative(PRODUCTS_DIR, full).split(path.sep).join("/"),
        name: entry.name,
      });
    }
  }
  return out;
}

function buildItem(file, index) {
  const rel = file.relativePath; // e.g. resin/bracelets/20260721_133032.jpg
  const parts = rel.split("/"); // [resin, bracelets, file.jpg]
  const top = parts[0]; // resin / fabric_painting / home_decor
  const ext = path.extname(file.name).toLowerCase();
  if (!isImageFile(file.name) && !isVideoFile(file.name)) return null;

  const category = CATEGORY_MAP[top] || top;
  const isVideo = mediaType(file.name) === "video";

  let title;
  let caption;
  let key = top;
  let subcategory = null;
  if (parts.length > 2) {
    // resin/<subcategory>/<file>
    const sub = parts.slice(1, -1).join("/");
    title = prettifySubcategory(sub);
    key = sub;
    caption = title;
    subcategory = subcategoryId(sub);
  } else {
    title = CATEGORY_LABELS[top] || top.replace(/_/g, " ");
    caption = title;
  }

  const meta = CATEGORY_META[top] || CATEGORY_META.resin;
  const idSlug = slugify(`${category}-${key}-${path.basename(file.name, ext)}-${index}`);

  const item = {
    id: idSlug,
    type: isVideo ? "video" : "image",
    src: `/products/${rel.replace(/[ \t]+$/, "")}`,
    category,
    subcategory,
    title,
    caption,
    materials: meta.materials,
    description: meta.description,
    price: "On request",
  };

  if (isVideo) {
    item.thumbnail = generateThumbnail(rel);
  }

  return item;
}

function main() {
  if (!fs.existsSync(PRODUCTS_DIR)) {
    console.error("❌ public/products not found — nothing to generate.");
    process.exit(1);
  }

  const files = walk(PRODUCTS_DIR);
  const items = [];
  let i = 0;
  for (const file of files) {
    const item = buildItem(file, i);
    if (item) {
      items.push(item);
      i++;
    }
  }

  const lines = [];
  lines.push("// AUTO-GENERATED by scripts/generate-gallery.js — do not edit by hand.");
  lines.push("// Regenerate whenever you add/remove media:  node scripts/generate-gallery.js");
  lines.push("//");
  lines.push("// Items are derived from the folder structure under public/products/.");
  lines.push("// Top-level folders map to existing service categories:");
  lines.push("//   fabric_painting -> fabric, home_decor -> decor, resin -> resin");
  lines.push("// Each resin/ subfolder becomes a product type (bracelets, pendants, etc.).");
  lines.push("");
  lines.push("export const galleryItems = [");

  for (const item of items) {
    lines.push("  {");
    lines.push(`    id: "${esc(item.id)}",`);
    lines.push(`    type: "${esc(item.type)}",`);
    lines.push(`    src: "${esc(item.src)}",`);
    lines.push(`    category: "${esc(item.category)}",`);
    if (item.subcategory) lines.push(`    subcategory: "${esc(item.subcategory)}",`);
    if (item.thumbnail) lines.push(`    thumbnail: "${esc(item.thumbnail)}",`);
    lines.push(`    title: "${esc(item.title)}",`);
    lines.push(`    caption: "${esc(item.caption)}",`);
    lines.push(`    materials: "${esc(item.materials)}",`);
    lines.push(`    description: "${esc(item.description)}",`);
    lines.push(`    price: "${esc(item.price)}",`);
    lines.push("  },");
  }

  lines.push("];");
  lines.push("");
  lines.push("// Quick stats for reference:");
  lines.push(`//   total items: ${items.length}`);
  const byCat = {};
  items.forEach((it) => {
    byCat[it.category] = (byCat[it.category] || 0) + 1;
  });
  Object.entries(byCat).forEach(([cat, n]) => {
    lines.push(`//   ${cat}: ${n}`);
  });
  lines.push("");
  lines.push("// Sub-categories (resin product types):");
  const bySub = {};
  items.forEach((it) => {
    if (it.subcategory) bySub[it.subcategory] = (bySub[it.subcategory] || 0) + 1;
  });
  Object.entries(bySub).forEach(([sub, n]) => {
    lines.push(`//   ${sub}: ${n}`);
  });
  lines.push("");

  const outDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, lines.join("\n"), "utf8");

  console.log(`✅ Generated ${items.length} gallery items → src/data/galleryItems.js`);
  Object.entries(byCat).forEach(([cat, n]) => console.log(`   ${cat}: ${n}`));
  console.log("   Sub-categories:");
  Object.entries(bySub).forEach(([sub, n]) => console.log(`     ${sub}: ${n}`));
}

main();
