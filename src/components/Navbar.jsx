import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Navbar.css";

const links = [
  { href: "#services", label: "Services" },
  { href: "#custom-orders", label: "Custom Orders" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const handleLinkClick = () => setOpen(false);

  return (
    <header className={`navbar ${scrolled ? "navbar--solid" : ""}`}>
      <div className="container navbar__inner">
        <a href="#top" className="navbar__logo" onClick={handleLinkClick}>
          Brush<span>&amp;</span>Bliss
        </a>

        <nav className="navbar__links navbar__links--desktop">
          {links.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
          <a href="#contact" className="btn navbar__cta">
            Enquire
          </a>
        </nav>

        <button
          className={`navbar__burger ${open ? "is-open" : ""}`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="navbar__mobile"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={handleLinkClick}>
                {l.label}
              </a>
            ))}
            <a href="#contact" className="btn solid" onClick={handleLinkClick}>
              Enquire
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
