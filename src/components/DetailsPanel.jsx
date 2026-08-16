import { useEffect } from "react";
import { motion } from "framer-motion";
import { FiX, FiMaximize2 } from "react-icons/fi";
import AnimatedButton from "./AnimatedButton";
import "./GalleryModals.css";

const specs = [
  { key: "price", label: "Price" },
  { key: "materials", label: "Materials" },
  { key: "colour", label: "Colour" },
  { key: "dimensions", label: "Dimensions" },
];

export default function DetailsPanel({ item, onClose, onViewFullScreen }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

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
      aria-label={`Details: ${item.title || item.caption || "artwork"}`}
    >
      <button className="modal-close" onClick={onClose} aria-label="Close details">
        <FiX />
      </button>

      <motion.div
        className="details-panel"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="details-panel__thumb" onClick={onViewFullScreen} aria-label="View full screen">
          {item.type === "video" ? (
            <video src={item.src} muted loop autoPlay playsInline />
          ) : (
            <img src={item.src} alt={item.title || item.caption || ""} />
          )}
          <span className="details-panel__thumb-hint">
            <FiMaximize2 /> Full screen
          </span>
        </button>

        <div className="details-panel__body">
          {item.title && <h3 className="details-panel__title">{item.title}</h3>}
          {item.price && <p className="details-panel__price">{item.price}</p>}

          <dl className="details-panel__specs">
            {specs
              .filter((s) => s.key !== "price" && item[s.key])
              .map((s) => (
                <div className="details-panel__spec" key={s.key}>
                  <dt>{s.label}</dt>
                  <dd>{item[s.key]}</dd>
                </div>
              ))}
          </dl>

          {item.description && <p className="details-panel__desc">{item.description}</p>}

          <AnimatedButton
            href={`mailto:soniyadlakhwani@gmail.com?subject=Enquiry: ${encodeURIComponent(
              item.title || item.caption || "artwork"
            )}`}
            variant="solid"
            className="details-panel__cta"
          >
            Enquire About This Piece
          </AnimatedButton>
        </div>
      </motion.div>
    </motion.div>
  );
}
