import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMaximize2, FiInfo, FiMail, FiPlayCircle } from "react-icons/fi";
import { galleryItems, galleryFilters, services } from "../data/content";
import Lightbox from "./Lightbox";
import DetailsPanel from "./DetailsPanel";
import "./Gallery.css";

export default function Gallery() {
  const [active, setActive] = useState("all");
  const [touchActiveId, setTouchActiveId] = useState(null);
  const [lightboxItem, setLightboxItem] = useState(null);
  const [detailsItem, setDetailsItem] = useState(null);
  const [page, setPage] = useState(1);

  const ITEMS_PER_PAGE = 8;

  const filtered = useMemo(() => {
    if (active === "all") return galleryItems;
    if (services.some((s) => s.id === active)) {
      return galleryItems.filter((it) => it.category === active);
    }
    const subItem = galleryFilters.find((f) => f.id === active && f.group === "resin");
    if (subItem) {
      return galleryItems.filter(
        (it) => it.category === "resin" && it.subcategory === active
      );
    }
    return galleryItems;
  }, [active]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
  const paged = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, page]);

  const handleFilterChange = (id) => {
    setActive(id);
    setPage(1);
  };

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
              className={`gallery__filter ${active === f.id ? "is-active" : ""} ${f.group === "divider" ? "is-divider" : ""} ${f.group === "resin" ? "is-sub" : ""}`}
              onClick={() => f.id !== "resin-subcategories" && handleFilterChange(f.id)}
              disabled={f.group === "divider"}
            >
              {f.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {paged.length > 0 ? (
            <motion.div
              key="grid"
              className="gallery__grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {paged.map((it) => (
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
                      <div className="gallery__video-wrapper">
                        <video
                          src={it.src}
                          muted
                          loop
                          playsInline
                          preload="metadata"
                          poster={it.thumbnail}
                        />
                        <span className="gallery__video-icon" aria-hidden="true">
                          <FiPlayCircle />
                        </span>
                      </div>
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
                      <button
                        className="gallery__action"
                        onClick={(e) => {
                          e.stopPropagation();
                          const subject = encodeURIComponent(
                            `Enquiry: ${it.title || it.caption || "artwork"}`
                          );
                          window.location.href = `mailto:soniyadlakhwani@gmail.com?subject=${subject}`;
                        }}
                      >
                        <FiMail />
                        Enquire
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

        {totalPages > 1 && filtered.length > 0 && (
          <div className="gallery__pagination">
            <button
              className="gallery__page-btn"
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              aria-label="Previous page"
            >
              ‹
            </button>
            <span className="gallery__page-info">
              Page {page} of {totalPages}
            </span>
            <button
              className="gallery__page-btn"
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              aria-label="Next page"
            >
              ›
            </button>
          </div>
        )}
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
