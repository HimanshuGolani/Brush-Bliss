import { motion } from "framer-motion";
import Mandala from "./Mandala";
import AnimatedButton from "./AnimatedButton";
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
          <AnimatedButton href="mailto:soniyadlakhwani@gmail.com" variant="solid">
            Email the Studio
          </AnimatedButton>
          <AnimatedButton href="https://www.instagram.com/brushnblissart?utm_source=qr&igsh=MXVlbWluN2pqdHZveA==" variant="outline" target="_blank" rel="noreferrer">
            Instagram
          </AnimatedButton>
        </motion.div>
      </div>
    </section>
  );
}
