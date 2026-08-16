import { useEffect } from "react";
import { motion } from "framer-motion";
import { FiX, FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import useCart from "./useCart";
import { parsePrice, formatPrice } from "../lib/pricing";
import AnimatedButton from "./AnimatedButton";
import "./Cart.css";

const backdrop = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const panel = {
  initial: { x: "100%" },
  animate: { x: 0 },
  exit: { x: "100%" },
};

export default function Cart({ onClose, onCheckout }) {
  const { items, totalItems, grandTotal, updateQuantity, remove, isEmpty } = useCart();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleCheckout = () => {
    onClose();
    onCheckout();
  };

  return (
    <>
      <motion.div
        className="cart-backdrop"
        variants={backdrop}
        initial="initial"
        animate="animate"
        exit="exit"
        onClick={onClose}
      />
      <motion.aside
        className="cart"
        variants={panel}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ type: "tween", duration: 0.35, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Your Cart"
      >
        <div className="cart__header">
          <h2 className="cart__title">Your Cart</h2>
          <button
            className="cart__close"
            onClick={onClose}
            aria-label="Close cart"
          >
            <FiX />
          </button>
        </div>

        {isEmpty ? (
          <div className="cart__empty">
            <p className="cart__empty-text">Your cart is empty.</p>
            <AnimatedButton href="/#gallery" variant="outline" onClick={onClose}>
              Browse Gallery
            </AnimatedButton>
          </div>
        ) : (
          <>
            <ul className="cart__list">
              {items.map((item) => {
                const unit = parsePrice(item.price);
                const subtotal = unit * item.quantity;
                return (
                  <li className="cart__item" key={item.id}>
                    <div className="cart__item-media">
                      <img
                        src={item.src}
                        alt={item.title || item.caption || ""}
                        className="cart__item-img"
                      />
                    </div>
                    <div className="cart__item-details">
                      <p className="cart__item-title">
                        {item.title || item.caption || "Untitled"}
                      </p>
                      <p className="cart__item-price">
                        {formatPrice(unit)} &times; {item.quantity}
                      </p>
                      <p className="cart__item-subtotal">
                        Subtotal: {formatPrice(subtotal)}
                      </p>
                    </div>
                    <div className="cart__item-controls">
                      <button
                        className="cart__qty-btn"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        aria-label={`Decrease quantity of ${item.title}`}
                      >
                        <FiMinus />
                      </button>
                      <span className="cart__qty">{item.quantity}</span>
                      <button
                        className="cart__qty-btn"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        aria-label={`Increase quantity of ${item.title}`}
                      >
                        <FiPlus />
                      </button>
                      <button
                        className="cart__item-remove"
                        onClick={() => remove(item.id)}
                        aria-label={`Remove ${item.title} from cart`}
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="cart__summary">
              <div className="cart__summary-row">
                <span>Items</span>
                <span>{totalItems}</span>
              </div>
              <div className="cart__summary-row cart__summary-row--total">
                <span>Total</span>
                <span>{formatPrice(grandTotal)}</span>
              </div>
            </div>

            <div className="cart__actions">
              <AnimatedButton
                href="/#gallery"
                variant="outline"
                onClick={onClose}
              >
                Continue Shopping
              </AnimatedButton>
              <AnimatedButton
                variant="solid"
                onClick={handleCheckout}
              >
                Checkout
              </AnimatedButton>
            </div>
          </>
        )}
      </motion.aside>
    </>
  );
}
