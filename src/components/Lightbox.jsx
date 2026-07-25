import { useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "./GalleryModals.css";

export default function Lightbox({ item, items, onClose, onNavigate }) {
  const index = items.findIndex((it) => it.id === item.id);

  const goTo = useCallback(
    (dir) => {
      const next = (index + dir + items.length) % items.length;
      onNavigate(items[next]);
    },
    [index, items, onNavigate]
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && items.length > 1) goTo(1);
      if (e.key === "ArrowLeft" && items.length > 1) goTo(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, goTo, items.length]);

  return (
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Full screen view: ${item.title || item.caption || "artwork"}`}
    >
      <button className="modal-close" onClick={onClose} aria-label="Close full screen view">
        <FiX />
      </button>

      {items.length > 1 && (
        <>
          <button
            className="lightbox__nav lightbox__nav--prev"
            aria-label="Previous piece"
            onClick={(e) => {
              e.stopPropagation();
              goTo(-1);
            }}
          >
            <FiChevronLeft />
          </button>
          <button
            className="lightbox__nav lightbox__nav--next"
            aria-label="Next piece"
            onClick={(e) => {
              e.stopPropagation();
              goTo(1);
            }}
          >
            <FiChevronRight />
          </button>
        </>
      )}

      <motion.div
        className="lightbox__stage"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
      >
        {item.type === "video" ? (
          <video src={item.src} controls autoPlay playsInline className="lightbox__media" />
        ) : (
          <img src={item.src} alt={item.title || item.caption || ""} className="lightbox__media" />
        )}
        {(item.title || item.caption) && (
          <p className="lightbox__caption">{item.title || item.caption}</p>
        )}
      </motion.div>
    </motion.div>
  );
}
