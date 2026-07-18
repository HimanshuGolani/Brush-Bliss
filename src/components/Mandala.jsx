// A hand-plotted mandala rendered in pure SVG line-work — the brand's
// signature motif. Reused (at different scale/opacity) across the hero
// and as a quiet section-divider accent, tying every part of the page
// back to "Mandala Art".
export default function Mandala({ className = "", spin = true }) {
  const rings = [46, 74, 102, 130, 158];
  const petals = Array.from({ length: 16 });

  return (
    <svg
      className={`mandala-svg ${spin ? "mandala-spin" : ""} ${className}`}
      viewBox="0 0 340 340"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <g transform="translate(170,170)" stroke="var(--gold-soft)" fill="none">
        {rings.map((r, i) => (
          <circle key={r} r={r} strokeWidth={i === rings.length - 1 ? 1.4 : 0.7} opacity={0.55 - i * 0.07} />
        ))}
        {petals.map((_, i) => {
          const angle = (360 / petals.length) * i;
          return (
            <g key={i} transform={`rotate(${angle})`}>
              <path
                d="M0,-46 C 14,-72 14,-96 0,-130 C -14,-96 -14,-72 0,-46 Z"
                strokeWidth="0.8"
                opacity="0.75"
              />
              <circle cx="0" cy="-158" r="3.2" strokeWidth="0.8" />
            </g>
          );
        })}
        <circle r="20" strokeWidth="1.2" />
        <circle r="6" fill="var(--marigold)" stroke="none" />
      </g>
    </svg>
  );
}
