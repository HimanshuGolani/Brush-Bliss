import { motion } from "framer-motion";
import { customOrders } from "../data/content";
import "./CustomOrders.css";

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const rowVariants = {
  hidden: { opacity: 0, x: -14 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

export default function CustomOrders() {
  return (
    <section id="custom-orders" className="custom section">
      <div className="container">
        <header className="custom__header">
          <p className="eyebrow">Made To Order</p>
          <h2 className="custom__heading">Custom &amp; Gifting</h2>
          <p className="custom__intro">{customOrders.intro} 🎁</p>
        </header>

        <div className="custom__columns">
          {customOrders.categories.map((cat) => (
            <div className="custom__card" key={cat.id}>
              <h3 className="custom__card-title">{cat.title}</h3>
              <motion.ul
                className="custom__list"
                variants={listVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
              >
                {cat.items.map((it) => (
                  <motion.li key={it} variants={rowVariants}>
                    <span className="custom__dot" />
                    {it}
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
