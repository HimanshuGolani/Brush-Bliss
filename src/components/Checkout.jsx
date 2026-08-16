import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiX, FiShoppingCart, FiAlertCircle } from "react-icons/fi";
import useCart from "./useCart";
import { parsePrice, formatPrice } from "../lib/pricing";
import { buildOrderPayload, submitOrder } from "../lib/googleSheets";
import AnimatedButton from "./AnimatedButton";
import "./Checkout.css";

const backdrop = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const panel = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 16 },
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(c) {
  const errs = {};
  if (!c.phone || c.phone.replace(/\D/g, "").length < 8) {
    errs.phone = "Enter a valid phone number (at least 8 digits).";
  }
  if (!c.email || !EMAIL_RE.test(c.email)) {
    errs.email = "Enter a valid email address.";
  }
  if (!c.address || c.address.trim().length < 10) {
    errs.address = "Enter a complete shipping address.";
  }
  return errs;
}

export default function Checkout({ onClose, onComplete }) {
  const { items, totalItems, grandTotal, clear } = useCart();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const errors = validate(customer);
  const hasErrors = Object.keys(errors).length > 0;
  const canSubmit = !hasErrors && items.length > 0;

  const fieldError = (field) =>
    (submitted || customer[field]) && errors[field];

  const handleChange = (field, value) => {
    setCustomer((c) => ({ ...c, [field]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (hasErrors || items.length === 0) return;

    setSubmitting(true);
    setError("");

    const payload = buildOrderPayload({ items, customer });

    try {
      await submitOrder(payload);
      clear();
      onComplete(payload);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <>
      <motion.div
        className="checkout-backdrop"
        variants={backdrop}
        initial="initial"
        animate="animate"
        exit="exit"
        onClick={onClose}
      />
      <motion.div
        className="checkout"
        variants={panel}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.35, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Checkout"
      >
        <div className="checkout__header">
          <h2 className="checkout__title">
            <FiShoppingCart className="checkout__title-icon" />
            Checkout
          </h2>
          <button className="checkout__close" onClick={onClose} aria-label="Close checkout">
            <FiX />
          </button>
        </div>

        <div className="checkout__grid">
          <div className="checkout__summary">
            <h3 className="checkout__summary-title">Order Summary</h3>
            <ul className="checkout__items">
              {items.map((item) => {
                const unit = parsePrice(item.price);
                return (
                  <li className="checkout__item" key={item.id}>
                    <img
                      src={item.src}
                      alt={item.title || item.caption || ""}
                      className="checkout__item-img"
                    />
                    <div className="checkout__item-details">
                      <span className="checkout__item-title">
                        {item.title || item.caption || "Untitled"}
                      </span>
                      <span className="checkout__item-qty">
                        &times; {item.quantity}
                      </span>
                    </div>
                    <span className="checkout__item-subtotal">
                      {formatPrice(unit * item.quantity)}
                    </span>
                  </li>
                );
              })}
            </ul>
            <div className="checkout__totals">
              <div className="checkout__total-row">
                <span>Items</span>
                <span>{totalItems}</span>
              </div>
              <div className="checkout__total-row checkout__total-row--grand">
                <span>Total</span>
                <span>{formatPrice(grandTotal)}</span>
              </div>
            </div>
          </div>

          <form className="checkout__form" onSubmit={handleSubmit} noValidate>
            <h3 className="checkout__form-title">Delivery Details</h3>

            <div className="form-field">
              <label htmlFor="checkout-name">Name (optional)</label>
              <input
                id="checkout-name"
                type="text"
                placeholder="Your name"
                value={customer.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>

            <div className="form-field">
              <label htmlFor="checkout-phone">Phone number *</label>
              <input
                id="checkout-phone"
                type="tel"
                placeholder="+91 98765 43210"
                value={customer.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                aria-invalid={fieldError("phone") ? "true" : "false"}
                aria-describedby={fieldError("phone") ? "err-phone" : undefined}
              />
              {fieldError("phone") && (
                <p className="form-error" id="err-phone" role="alert">
                  {errors.phone}
                </p>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="checkout-email">Email address *</label>
              <input
                id="checkout-email"
                type="email"
                placeholder="you@example.com"
                value={customer.email}
                onChange={(e) => handleChange("email", e.target.value)}
                aria-invalid={fieldError("email") ? "true" : "false"}
                aria-describedby={fieldError("email") ? "err-email" : undefined}
              />
              {fieldError("email") && (
                <p className="form-error" id="err-email" role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="checkout-address">Shipping address *</label>
              <textarea
                id="checkout-address"
                placeholder="Full address including city, state and PIN"
                rows={3}
                value={customer.address}
                onChange={(e) => handleChange("address", e.target.value)}
                aria-invalid={fieldError("address") ? "true" : "false"}
                aria-describedby={fieldError("address") ? "err-address" : undefined}
              />
              {fieldError("address") && (
                <p className="form-error" id="err-address" role="alert">
                  {errors.address}
                </p>
              )}
            </div>

            {error && (
              <div className="checkout__error" role="alert">
                <FiAlertCircle className="checkout__error-icon" />
                {error}
              </div>
            )}

            {!canSubmit && submitted && items.length > 0 && hasErrors && (
              <p className="form-error">Please correct the fields above before placing your order.</p>
            )}

            <div className="checkout__actions">
              <AnimatedButton type="button" variant="outline" onClick={onClose}>
                Back to Cart
              </AnimatedButton>
              <AnimatedButton
                type="submit"
                variant="solid"
                disabled={!canSubmit || submitting}
                ariaLabel="Place order"
              >
                {submitting ? (
                  <>
                    <span className="spinner" aria-hidden="true" />
                    Placing order…
                  </>
                ) : (
                  "Place Order"
                )}
              </AnimatedButton>
            </div>
          </form>
        </div>
      </motion.div>
    </>
  );
}
