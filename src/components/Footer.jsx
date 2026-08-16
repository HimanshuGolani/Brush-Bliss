import "./Footer.css";

const legalLinks = [
  { href: "/privacy.html", label: "Privacy Policy" },
  { href: "/terms.html", label: "Terms of Service" },
  { href: "/cookies.html", label: "Cookie Policy" },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <a href="#top" className="footer__logo">
          Brush<span>&amp;</span>Bliss
        </a>
        <p className="footer__tag">Resin &middot; Mandala &middot; Tanjore &middot; Fabric &middot; Canvas &middot; Texture &middot; Home Decor</p>

        <nav className="footer__legal" aria-label="Legal">
          {legalLinks.map((l) => (
            <a key={l.href} href={l.href} className="footer__legal-link">
              {l.label}
            </a>
          ))}
        </nav>

        <p className="footer__copy">
          &copy; {new Date().getFullYear()} Brush&amp;Bliss. Handcrafted with love.
        </p>
      </div>
    </footer>
  );
}
