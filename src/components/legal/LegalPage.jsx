import { motion } from "framer-motion";
import SmoothScroll from "../SmoothScroll";
import ScrollProgress from "../ScrollProgress";
import Footer from "../Footer";
import AnimatedButton from "../AnimatedButton";
import { legalDocs, legalNav, legalContact } from "../../data/legalContent";
import "./LegalPage.css";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const line = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function LegalPage({ doc }) {
  const data = legalDocs[doc];

  return (
    <SmoothScroll>
      <ScrollProgress />
      <a href="#main-content" className="legal__skip-link">
        Skip to content
      </a>

      <header className="legal__site-header">
        <div className="container legal__site-header-inner">
          <a href="/" className="legal__logo">
            Brush<span>&amp;</span>Bliss
          </a>
          <nav className="legal__nav" aria-label="Legal documents">
            {legalNav.map((d) => (
              <a
                key={d.id}
                href={`/${d.id}.html`}
                className={`legal__nav-link ${d.id === doc ? "is-active" : ""}`}
              >
                {d.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main id="main-content" className="legal__main">
        <section className="legal section">
          <div className="container">
            <motion.div
              className="legal__doc"
              variants={container}
              initial="hidden"
              animate="show"
            >
              <motion.p className="eyebrow" variants={line}>
                Legal
              </motion.p>

              <motion.h1 className="legal__title" variants={line}>
                {data.title}
              </motion.h1>

              <motion.p className="legal__meta" variants={line}>
                Last updated: {data.lastUpdated} &middot; Version {data.version}
              </motion.p>

              <motion.div className="legal__summary" variants={line}>
                <p>{data.summary}</p>
              </motion.div>

              <motion.div className="legal__body" variants={line}>
                {data.sections.map((s, i) => (
                  <motion.div className="legal__section" key={i} variants={line}>
                    <h2 className="legal__section-title">{s.heading}</h2>
                    <p className="legal__section-content">{s.content}</p>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div className="legal__history" variants={line}>
                <h2 className="legal__section-title">Version History</h2>
                {data.versionHistory.map((v) => (
                  <div className="legal__version" key={v.version}>
                    <div className="legal__version-head">
                      <span className="legal__version-badge">
                        v{v.version}
                      </span>
                      <span className="legal__version-date">{v.date}</span>
                    </div>
                    <ul className="legal__version-changes">
                      {v.changes.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </motion.div>

              <motion.div className="legal__contact" variants={line}>
                <h2 className="legal__section-title">Legal Enquiries</h2>
                <p className="legal__contact-text">
                  Have a question about your data, privacy, or these terms?
                  Reach out — we're happy to help.
                </p>
                <div className="legal__contact-details">
                  <p>Email: {legalContact.email}</p>
                  <p>Phone: {legalContact.phone}</p>
                  <p>{legalContact.address}</p>
                </div>
                <AnimatedButton
                  href={`mailto:${legalContact.email}?subject=Legal enquiry`}
                  variant="outline"
                  ariaLabel="Email legal enquiries"
                >
                  Email Us
                </AnimatedButton>
              </motion.div>

              <motion.div className="legal__back" variants={line}>
                <AnimatedButton href="/" variant="outline">
                  Back to Brush&amp;Bliss
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
