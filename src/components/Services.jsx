import { motion } from "framer-motion";
import { services } from "../data/content";
import "./Services.css";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function Services() {
  return (
    <section id="services" className="services section">
      <div className="container">
        <header className="services__header">
          <p className="eyebrow">What We Make</p>
          <h2 className="services__heading">Our Services</h2>
        </header>

        <motion.div
          className="services__grid"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {services.map((s) => (
            <motion.article
              className="service-card"
              key={s.id}
              variants={item}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
            >
              <span className="service-card__seal">{s.seal}</span>
              <h3 className="service-card__title">{s.title}</h3>
              <p className="service-card__blurb">{s.blurb}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
