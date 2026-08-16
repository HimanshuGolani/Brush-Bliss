import { useState } from "react";
import { motion } from "framer-motion";
import { FiSearch } from "react-icons/fi";
import SmoothScroll from "./SmoothScroll";
import ScrollProgress from "./ScrollProgress";
import Footer from "./Footer";
import AnimatedButton from "./AnimatedButton";
import Mandala from "./Mandala";
import "./NotFound.css";

const siteLinks = [
  { label: "Home", href: "/", keywords: "home start landing" },
  {
    label: "Services",
    href: "/#services",
    keywords: "services resin mandala tanjore fabric canvas texture what we make",
  },
  {
    label: "Custom Orders",
    href: "/#custom-orders",
    keywords: "custom orders gifting gifts made to order",
  },
  { label: "Gallery", href: "/#gallery", keywords: "gallery artwork photos pieces" },
  { label: "Contact", href: "/#contact", keywords: "contact email instagram enquire" },
  { label: "Privacy Policy", href: "/privacy.html", keywords: "privacy data" },
  { label: "Terms of Service", href: "/terms.html", keywords: "terms conditions" },
  { label: "Cookie Policy", href: "/cookies.html", keywords: "cookies tracking" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const line = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function NotFound() {
  const [search, setSearch] = useState("");
  const needle = search.toLowerCase().trim();

  const filtered = siteLinks.filter(
    (l) => l.label.toLowerCase().includes(needle) || l.keywords.includes(needle)
  );

  return (
    <SmoothScroll>
      <ScrollProgress />

      <header className="not-found__site-header">
        <div className="container not-found__site-header-inner">
          <a href="/" className="not-found__logo">
            Brush<span>&amp;</span>Bliss
          </a>
        </div>
      </header>

      <main id="main-content" className="not-found__main">
        <section className="not-found section">
          <div className="container not-found__inner">
            <Mandala className="not-found__mandala" spin={true} aria-hidden="true" />

            <motion.div
              className="not-found__content"
              variants={container}
              initial="hidden"
              animate="show"
            >
              <motion.div className="not-found__code" variants={line}>
                404
              </motion.div>

              <motion.h1 className="not-found__title" variants={line}>
                Page not found
              </motion.h1>

              <motion.p className="not-found__desc" variants={line}>
                The page you're looking for has wandered off to dry, but the
                studio is still here. Use the search below or pick a page to
                get back on track.
              </motion.p>

              <motion.form
                className="not-found__search"
                role="search"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (filtered.length === 1) window.location.assign(filtered[0].href);
                }}
                variants={line}
              >
                <label htmlFor="not-found-search" className="visually-hidden">
                  Search pages
                </label>
                <FiSearch className="not-found__search-icon" aria-hidden="true" />
                <input
                  id="not-found-search"
                  type="search"
                  placeholder="Search pages, services, policies..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  autoComplete="off"
                />
              </motion.form>

              <motion.div className="not-found__links" variants={line}>
                <p className="not-found__links-label">
                  {needle ? "Matching pages" : "Or jump straight to"}
                </p>
                <div className="not-found__link-list">
                  {filtered.length > 0 ? (
                    filtered.map((l) => (
                      <a key={l.href} href={l.href} className="not-found__link">
                        {l.label}
                      </a>
                    ))
                  ) : (
                    <p className="not-found__no-results">
                      No pages match"{needle}". Try another term?
                    </p>
                  )}
                </div>
              </motion.div>

              <motion.div variants={line}>
                <AnimatedButton href="/" variant="solid" ariaLabel="Return to homepage">
                  Return Home
                </AnimatedButton>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </SmoothScroll>
  );
}
