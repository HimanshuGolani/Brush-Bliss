import { motion } from "framer-motion";
import "./About.css";

export default function About() {
  return (
    <section className="about section">
      <div className="container about__inner">
        <motion.div
          className="about__rule"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />

        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6 }}
        >
          The Studio
        </motion.p>

        <motion.h2
          className="about__heading"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Every piece is poured, plotted or painted by hand.
        </motion.h2>

        <motion.p
          className="about__text"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Brush&amp;Bliss is a home-grown art studio working across resin,
          mandala, tanjore, fabric, canvas and texture mediums — turning
          them into pieces for your walls and into gifts for the people
          you love. Our palette leans deliberately into marigold and
          sunrise-orange, chosen in keeping with numerology, for warmth,
          energy and good fortune in every piece that leaves the studio.
        </motion.p>
      </div>
    </section>
  );
}
