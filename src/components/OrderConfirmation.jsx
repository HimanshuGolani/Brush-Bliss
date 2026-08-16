import { useEffect } from "react";
import { motion } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi";
import { formatPrice } from "../lib/pricing";
import AnimatedButton from "./AnimatedButton";
import "./OrderConfirmation.css";

const backdrop = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const panel = {
  initial: { opacity: 0, scale: 0.96 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.98 },
};

export default function OrderConfirmation({ order, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      <motion.div
        className="confirmation-backdrop"
        variants={backdrop}
        initial="initial"
        animate="animate"
        exit="exit"
        onClick={onClose}
      />
      <motion.div
        className="confirmation"
        variants={panel}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.4, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Order confirmed"
      >
        <div className="confirmation__icon">
          <FiCheckCircle />
        </div>

        <h2 className="confirmation__title">Order Received</h2>

        <p className="confirmation__message">
          Your order <strong>{order.orderId}</strong> has been received
          successfully. You will be contacted over WhatsApp for payment and
          further order details.
        </p>

        <div className="confirmation__summary">
          <div className="confirmation__summary-row">
            <span>Order date</span>
            <span>{new Date(order.orderDate).toLocaleString()}</span>
          </div>
          <div className="confirmation__summary-row">
            <span>Items ordered</span>
            <span>{order.itemCount}</span>
          </div>
          <div className="confirmation__summary-row confirmation__summary-row--total">
            <span>Total amount</span>
            <span>{order.totalAmountFormatted}</span>
          </div>
        </div>

        <ul className="confirmation__items">
          {order.items.map((item) => (
            <li className="confirmation__item" key={item.id}>
              <span className="confirmation__item-name">
                {item.title} &times; {item.quantity}
              </span>
              <span className="confirmation__item-price">
                {formatPrice(item.subtotal)}
              </span>
            </li>
          ))}
        </ul>

        <div className="confirmation__actions">
          <AnimatedButton href="/#gallery" variant="outline" onClick={onClose}>
            Continue Shopping
          </AnimatedButton>
          <AnimatedButton
            variant="solid"
            onClick={() =>
              window.open(
                `https://wa.me/${order.phone.replace(/\D/g, "")}?text=Hi%2C%20I%20placed%20an%20order%20(${order.orderId})%20with%20Brush%26Bliss.%20Order%20total%3A%20${encodeURIComponent(
                  order.totalAmountFormatted
                )}.`,
                "_blank",
                "noopener"
              )
            }
          >
            Chat on WhatsApp
          </AnimatedButton>
        </div>
      </motion.div>
    </>
  );
}
