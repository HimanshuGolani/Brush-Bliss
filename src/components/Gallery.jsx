import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMaximize2, FiInfo } from "react-icons/fi";
import { galleryItems, galleryFilters, services } from "../data/content";
import Lightbox from "./Lightbox";
import DetailsPanel from "./DetailsPanel";
import "./Gallery.css";

export default function Gallery() {
  const [active, setActive] = useState("all");
  const [touchActiveId, setTouchActiveId] = useState(null);
  const [lightboxItem, setLightboxItem] = useState(null);
  const [detailsItem, setDetailsItem] = useState(null);

  const filtered = useMemo(() => {
    if (active === "all") return galleryItems;
    return galleryItems.filter((it) => it.category === active);
  }, [active]);

  const handleTileTap = (id) => {
    // On touch devices there's no hover, so tapping the tile itself
    // (not one of its action buttons) reveals the overlay first.
    setTouchActiveId((cur) => (cur === id ? null : id));
  };

  return (
    <section id="gallery" className="gallery section">
      <div className="container">
        <header className="gallery__header">
          <p className="eyebrow">The Work</p>
          <h2 className="gallery__heading">Gallery</h2>
          <p className="gallery__intro">
            Photos and videos of finished pieces, organised by medium. Tap or
            hover a piece to view it full screen or see price and details.
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
                  className={`gallery__tile ${touchActiveId === it.id ? "is-active" : ""}`}
                  key={it.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.45 }}
                  onClick={() => handleTileTap(it.id)}
                >
                  {it.isDemo && <span className="gallery__badge">Sample</span>}

                  <div className="gallery__media">
                    {it.type === "video" ? (
                      <video src={it.src} muted loop playsInline autoPlay preload="metadata" />
                    ) : (
                      <img src={it.src} alt={it.title || it.caption || it.category} loading="lazy" />
                    )}
                  </div>

                  <div className="gallery__overlay">
                    <div className="gallery__overlay-text">
                      {it.title && <p className="gallery__overlay-title">{it.title}</p>}
                      {it.price && <p className="gallery__overlay-price">{it.price}</p>}
                    </div>
                    <div className="gallery__overlay-actions">
                      <button
                        className="gallery__action"
                        onClick={(e) => {
                          e.stopPropagation();
                          setLightboxItem(it);
                        }}
                      >
                        <FiMaximize2 />
                        Full Screen
                      </button>
                      <button
                        className="gallery__action"
                        onClick={(e) => {
                          e.stopPropagation();
                          setDetailsItem(it);
                        }}
                      >
                        <FiInfo />
                        Details
                      </button>
                    </div>
                  </div>

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

      <AnimatePresence>
        {lightboxItem && (
          <Lightbox
            item={lightboxItem}
            items={filtered.length ? filtered : galleryItems}
            onClose={() => setLightboxItem(null)}
            onNavigate={setLightboxItem}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {detailsItem && (
          <DetailsPanel
            item={detailsItem}
            onClose={() => setDetailsItem(null)}
            onViewFullScreen={() => {
              setLightboxItem(detailsItem);
              setDetailsItem(null);
            }}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
