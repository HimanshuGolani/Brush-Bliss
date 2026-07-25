import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Mandala from "./Mandala";
import AnimatedButton from "./AnimatedButton";
import "./Hero.css";

export default function Hero() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const mandalaY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const mandalaRotate = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section id="top" className="hero" ref={sectionRef}>
      <div className="hero__mandala-wrap">
  <motion.div style={{ y: mandalaY, rotate: mandalaRotate }}>
    <Mandala className="hero__mandala" />
  </motion.div>
</div>
      <div className="hero__glow" aria-hidden="true" />

      <motion.div className="container hero__content" style={{ y: contentY, opacity: contentOpacity }}>
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
          <AnimatedButton href="#services" variant="solid">
            View Services
          </AnimatedButton>
          <AnimatedButton href="#custom-orders" variant="outline">
            Custom Orders
          </AnimatedButton>
        </motion.div>
      </motion.div>

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
