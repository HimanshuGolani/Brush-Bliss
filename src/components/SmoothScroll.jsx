import { useEffect, useRef } from "react";
import { ReactLenis } from "lenis/react";
import { cancelFrame, frame } from "framer-motion";

// Wires Lenis (buttery smooth scroll) to Framer Motion's own frame loop,
// exactly as recommended by Lenis' docs — this keeps scroll-linked motion
// (useScroll/useTransform, whileInView) perfectly in sync with the
// smoothed scroll position instead of the raw native one.
//
// People who've asked for reduced motion get plain native scrolling:
// Lenis simply isn't mounted, so the browser's default (instant) scroll
// behavior takes over untouched.
export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (prefersReducedMotion) return undefined;

    function update(data) {
      lenisRef.current?.lenis?.raf(data.timestamp);
    }

    frame.update(update, true);
    return () => cancelFrame(update);
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return children;

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false,
        lerp: 0.1,
        wheelMultiplier: 1,
        anchors: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
