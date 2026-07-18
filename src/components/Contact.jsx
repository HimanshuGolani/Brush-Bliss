import { motion } from "framer-motion";
import Mandala from "./Mandala";
import "./Contact.css";

export default function Contact() {
  return (
    <section id="contact" className="contact section">
      <Mandala className="contact__mandala" spin={false} />
      <div className="container contact__inner">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6 }}
        >
          Let's Create Something
        </motion.p>

        <motion.h2
          className="contact__heading"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Have an occasion in mind?
        </motion.h2>

        <motion.p
          className="contact__text"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Tell us the occasion, the colours, the person it's for — we'll turn
          it into a piece worth keeping.
        </motion.p>

        <motion.div
          className="contact__actions"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Update href values with the studio's real contact details */}
          <a href="mailto:hello@brushandbliss.example" className="btn solid">
            Email the Studio
          </a>
          <a href="https://instagram.com" className="btn" target="_blank" rel="noreferrer">
            Instagram
          </a>
        </motion.div>
      </div>
    </section>
  );
}
