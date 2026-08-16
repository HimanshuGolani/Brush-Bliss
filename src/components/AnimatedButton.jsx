import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import "./AnimatedButton.css";

const MAGNETIC_STRENGTH = 0.35;
const MAGNETIC_MAX = 10;

// A single button primitive used for every CTA on the site (hero, mobile
// nav, contact, custom-order enquiries). Three things layer together:
//  1. a soft "magnetic" pull toward the cursor while hovering
//  2. a gold shimmer that sweeps across on hover
//  3. a spring-based press-down on tap/click
// Renders an <a> when `href` is passed, otherwise a <button>.
export default function AnimatedButton({
  href,
  onClick,
  variant = "outline",
  className = "",
  children,
  target,
  rel,
  ariaLabel,
  type = "button",
  disabled = false,
}) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 14, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 200, damping: 14, mass: 0.3 });

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(Math.max(-MAGNETIC_MAX, Math.min(MAGNETIC_MAX, relX * MAGNETIC_STRENGTH)));
    y.set(Math.max(-MAGNETIC_MAX, Math.min(MAGNETIC_MAX, relY * MAGNETIC_STRENGTH)));
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Component = href ? motion.a : motion.button;

  const sharedProps = {
    className: `anim-btn anim-btn--${variant} ${className}`,
    style: { x: springX, y: springY },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onClick,
    transition: { type: "spring", stiffness: 400, damping: 20 },
  };

  if (href) {
    return (
      <Component
        {...sharedProps}
        ref={ref}
        href={href}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        whileTap={{ scale: 0.94 }}
      >
        <span className="anim-btn__label">{children}</span>
        <span className="anim-btn__shimmer" aria-hidden="true" />
      </Component>
    );
  }

  return (
    <Component
      {...sharedProps}
      ref={ref}
      type={type}
      aria-label={ariaLabel}
      disabled={disabled}
      whileTap={{ scale: disabled ? 1 : 0.94 }}
    >
      <span className="anim-btn__label">{children}</span>
      <span className="anim-btn__shimmer" aria-hidden="true" />
    </Component>
  );
}
