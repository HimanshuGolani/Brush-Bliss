import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { galleryItems, galleryFilters, services } from "../data/content";
import "./Gallery.css";

export default function Gallery() {
  const [active, setActive] = useState("all");

  const filtered = useMemo(() => {
    if (active === "all") return galleryItems;
    return galleryItems.filter((it) => it.category === active);
  }, [active]);

  return (
    <section id="gallery" className="gallery section">
      <div className="container">
        <header className="gallery__header">
          <p className="eyebrow">The Work</p>
          <h2 className="gallery__heading">Gallery</h2>
          <p className="gallery__intro">
            Photos and videos of finished pieces, organised by medium. This
            space grows as new work leaves the studio.
          </p>
        </header>

        <div className="gallery__filters">
          {galleryFilters.map((f) => (
            <button
              key={f.id}
              className={`gallery__filter ${active === f.id ? "is-active" : ""}`}
              onClick={() => setActive(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div
              key="grid"
              className="gallery__grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {filtered.map((it) => (
                <motion.figure
                  className="gallery__tile"
                  key={it.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45 }}
                >
                  {it.type === "video" ? (
                    <video
                      src={it.src}
                      muted
                      loop
                      playsInline
                      autoPlay
                      preload="metadata"
                    />
                  ) : (
                    <img src={it.src} alt={it.caption || it.category} loading="lazy" />
                  )}
                  {it.caption && <figcaption>{it.caption}</figcaption>}
                </motion.figure>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              className="gallery__empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {(active === "all" ? services : services.filter((s) => s.id === active)).map(
                (s) => (
                  <div className="gallery__placeholder" key={s.id}>
                    <span className="gallery__placeholder-seal">{s.seal}</span>
                    <p className="gallery__placeholder-title">{s.title}</p>
                    <p className="gallery__placeholder-note">Photos &amp; videos coming soon</p>
                  </div>
                )
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
