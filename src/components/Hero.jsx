import { motion } from "framer-motion";
import Mandala from "./Mandala";
import "./Hero.css";

export default function Hero() {
  return (
    <section id="top" className="hero">
      <Mandala className="hero__mandala" />
      <div className="hero__glow" aria-hidden="true" />

      <div className="container hero__content">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Handcrafted Indian Art Studio
        </motion.p>

        <motion.h1
          className="hero__title"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          Brush<span>&amp;</span>Bliss
        </motion.h1>

        <motion.p
          className="hero__tagline"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          Resin, mandala, tanjore &amp; more — art made by hand, poured with
          patience, and finished for a lifetime.
        </motion.p>

        <motion.div
          className="hero__actions"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
        >
          <a href="#services" className="btn solid">
            View Services
          </a>
          <a href="#custom-orders" className="btn">
            Custom Orders
          </a>
        </motion.div>
      </div>

      <motion.a
        href="#services"
        className="hero__scroll"
        aria-label="Scroll to services"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <span className="hero__scroll-line" />
        Scroll
      </motion.a>
    </section>
  );
}
