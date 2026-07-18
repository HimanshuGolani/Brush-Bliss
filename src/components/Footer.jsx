import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <a href="#top" className="footer__logo">
          Brush<span>&amp;</span>Bliss
        </a>
        <p className="footer__tag">Resin &middot; Mandala &middot; Tanjore &middot; Fabric &middot; Canvas &middot; Texture &middot; Home Decor</p>
        <p className="footer__copy">
          &copy; {new Date().getFullYear()} Brush&amp;Bliss. Handcrafted with love.
        </p>
      </div>
    </footer>
  );
}
