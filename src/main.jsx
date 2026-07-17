import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const imageModules = import.meta.glob('./assets/images/*.{jpg,jpeg,png,webp,avif,gif}', {
  eager: true,
  query: '?url',
  import: 'default'
});

const videoModules = import.meta.glob('./assets/videos/*.{mp4,webm,ogg,mov}', {
  eager: true,
  query: '?url',
  import: 'default'
});

const images = Object.values(imageModules);
const videos = Object.values(videoModules);

const artForms = [
  'Resin Art',
  'Mandala Art',
  'Tanjore Art',
  'Fabric Painting',
  'Canvas Painting',
  'Texture Art',
  'Home Decor'
];

const resinItems = [
  'Engagement Plate',
  'Pooja Thali',
  'Name Plate',
  'Car Hanging',
  'Rakhi',
  'Key Chain',
  'Exquisite Jewelry',
  'Unique Gift Items',
  'Wall Clock'
];

const decorItems = [
  'Decorative Vase',
  'Wall Hanging',
  'Key Holder',
  'Name Plate',
  'Texture Art',
  'Custom Painting'
];

const highlights = [
  {
    icon: 'GO',
    title: 'Custom Orders',
    text: 'Personalized creative gifts for birthdays, weddings, festivals, housewarmings, and special occasions.'
  },
  {
    icon: 'NC',
    title: 'Numerology Colors',
    text: 'Thoughtful use of auspicious yellows, oranges, and complementary tones based on your brief.'
  },
  {
    icon: 'HD',
    title: 'Decor Styling',
    text: 'Statement pieces designed for entryways, pooja spaces, living rooms, bedrooms, and gifting corners.'
  }
];

function App() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const currentYear = new Date().getFullYear();

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#top" onClick={closeMenu} aria-label="Brush and Bliss home">
          <span className="brand-mark">B&B</span>
          <span>Brush&amp;Bliss</span>
        </a>
        <button
          className="menu-button"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span aria-hidden="true">{menuOpen ? 'X' : 'Menu'}</span>
        </button>
        <nav className={menuOpen ? 'nav-links nav-links-open' : 'nav-links'} aria-label="Primary navigation">
          <a href="#services" onClick={closeMenu}>Services</a>
          <a href="#gallery" onClick={closeMenu}>Gallery</a>
          <a href="#orders" onClick={closeMenu}>Custom Orders</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero section-grid">
          <div className="hero-copy reveal">
            <p className="eyebrow">Handcrafted resin, paintings & home decor</p>
            <h1>Brush&amp;Bliss</h1>
            <p className="hero-text">
              Bespoke art pieces, joyful gifting, and warm home decor made for celebrations, sacred spaces,
              personal milestones, and everyday beauty.
            </p>
            <div className="hero-actions">
              <a className="primary-action" href="#orders">
                Start a custom order <span aria-hidden="true">-&gt;</span>
              </a>
              <a className="secondary-action" href="#services">Explore services</a>
            </div>
          </div>

          <div className="hero-art" aria-label="Decorative art composition">
            <div className="sun-card float-one">
              <IconBadge label="MA" />
              <span>Mandala</span>
            </div>
            <div className="canvas-card float-two">
              <IconBadge label="CP" />
              <span>Canvas</span>
            </div>
            <div className="resin-orbit">
              <span>Resin</span>
              <span>Tanjore</span>
              <span>Texture</span>
            </div>
          </div>
        </section>

        <section className="marquee" aria-label="Art forms">
          <div className="marquee-track">
            {[...artForms, ...artForms].map((item, index) => (
              <span key={`${item}-${index}`}>{item}</span>
            ))}
          </div>
        </section>

        <section className="section" id="services">
          <div className="section-heading reveal">
            <p className="eyebrow">What we create</p>
            <h2>Art services with a personal touch</h2>
            <p>
              From festive resin keepsakes to elegant wall decor, every piece is shaped around your story,
              color preference, space, and occasion.
            </p>
          </div>
          <div className="service-grid">
            {artForms.map((service, index) => (
              <article className="service-card reveal" style={{ '--delay': `${index * 70}ms` }} key={service}>
                <span className="service-number">{String(index + 1).padStart(2, '0')}</span>
                <h3>{service}</h3>
                <p>
                  Custom-made designs in rich yellow, orange, gold, ivory, and accent shades for a bright,
                  premium handmade finish.
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="section warm-band" id="orders">
          <div className="section-heading reveal">
            <p className="eyebrow">Made for your moments</p>
            <h2>Take custom orders for special occasions & personalized creative gift items</h2>
          </div>
          <div className="order-layout">
            <ItemPanel title="Resin" icon="RA" items={resinItems} />
            <ItemPanel title="Home Decor" icon="HD" items={decorItems} />
          </div>
        </section>

        <section className="section">
          <div className="highlight-grid">
            {highlights.map(({ icon, title, text }) => (
              <article className="highlight-card reveal" key={title}>
                <IconBadge label={icon} />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section gallery-section" id="gallery">
          <div className="section-heading reveal">
            <p className="eyebrow">Local media ready</p>
            <h2>Gallery for images and videos</h2>
            <p>
              Add your files to <strong>src/assets/images</strong> and <strong>src/assets/videos</strong>.
              The gallery will update automatically when the website is rebuilt.
            </p>
          </div>

          <MediaGallery images={images} videos={videos} />
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-card reveal">
            <p className="eyebrow">Let the next piece begin</p>
            <h2>Ready for a custom Brush&amp;Bliss creation?</h2>
            <p>
              Share the occasion, item type, preferred colors, size, name/date details, and any reference ideas.
            </p>
            <div className="contact-actions">
              <a href="tel:+910000000000"><span aria-hidden="true">Ph</span> Call</a>
              <a href="mailto:hello@brushandbliss.example"><span aria-hidden="true">At</span> Email</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>Brush&amp;Bliss</span>
        <span>Handmade with color, care, and celebration.</span>
        <span>{currentYear}</span>
      </footer>
    </div>
  );
}

function IconBadge({ label }) {
  return <span className="icon-badge" aria-hidden="true">{label}</span>;
}

function ItemPanel({ title, icon, items }) {
  return (
    <article className="item-panel reveal">
      <div className="panel-title">
        <IconBadge label={icon} />
        <h3>{title}</h3>
      </div>
      <div className="chip-list">
        {items.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </article>
  );
}

function MediaGallery({ images, videos }) {
  const hasMedia = images.length > 0 || videos.length > 0;

  if (!hasMedia) {
    return (
      <div className="empty-gallery reveal">
        <IconBadge label="ART" />
        <h3>Your artwork gallery is ready</h3>
        <p>
          Place multiple image files in <strong>src/assets/images</strong> and video files in
          <strong> src/assets/videos</strong>. Until then, this section keeps the site clean and text-first.
        </p>
      </div>
    );
  }

  return (
    <div className="media-grid">
      {images.map((src, index) => (
        <figure className="media-tile reveal" key={src}>
          <img src={src} alt={`Brush&Bliss artwork ${index + 1}`} loading="lazy" />
        </figure>
      ))}
      {videos.map((src, index) => (
        <figure className="media-tile reveal" key={src}>
          <video src={src} controls muted playsInline preload="metadata" />
          <figcaption>Artwork video {index + 1}</figcaption>
        </figure>
      ))}
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
