import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Gallery.css';

/**
 * 📸 PHOTO GALLERY
 * Replace these Unsplash URLs with your actual wedding photos.
 * Place your photos in: public/images/gallery/
 * Then update the src paths to: /wedding-invitation/images/gallery/photo1.jpg  etc.
 */
const galleryPhotos = [
  {
    id: 1,
    src:  'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80&auto=format&fit=crop',
    thumb:'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=70&auto=format&fit=crop',
    alt:  'Couple at the beach',
    span: 'tall',
  },
  {
    id: 2,
    src:  'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=800&q=80&auto=format&fit=crop',
    thumb:'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=400&q=70&auto=format&fit=crop',
    alt:  'Engagement ring',
    span: 'normal',
  },
  {
    id: 3,
    src:  'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80&auto=format&fit=crop',
    thumb:'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&q=70&auto=format&fit=crop',
    alt:  'Wedding ceremony',
    span: 'wide',
  },
  {
    id: 4,
    src:  'https://images.unsplash.com/photo-1529636798458-92182e662485?w=800&q=80&auto=format&fit=crop',
    thumb:'https://images.unsplash.com/photo-1529636798458-92182e662485?w=400&q=70&auto=format&fit=crop',
    alt:  'Couple portrait',
    span: 'normal',
  },
  {
    id: 5,
    src:  'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80&auto=format&fit=crop',
    thumb:'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400&q=70&auto=format&fit=crop',
    alt:  'First dance',
    span: 'normal',
  },
  {
    id: 6,
    src:  'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80&auto=format&fit=crop',
    thumb:'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&q=70&auto=format&fit=crop',
    alt:  'Wedding celebration',
    span: 'tall',
  },
  {
    id: 7,
    src:  'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?w=800&q=80&auto=format&fit=crop',
    thumb:'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?w=400&q=70&auto=format&fit=crop',
    alt:  'Wedding flowers',
    span: 'normal',
  },
  {
    id: 8,
    src:  'https://images.unsplash.com/photo-1470116945706-e6bf5d5a53ca?w=800&q=80&auto=format&fit=crop',
    thumb:'https://images.unsplash.com/photo-1470116945706-e6bf5d5a53ca?w=400&q=70&auto=format&fit=crop',
    alt:  'Beach sunset',
    span: 'wide',
  },
  {
    id: 9,
    src:  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80&auto=format&fit=crop',
    thumb:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=70&auto=format&fit=crop',
    alt:  'Groom portrait',
    span: 'normal',
  },
];

// Lightbox component
function Lightbox({ photo, onClose, onPrev, onNext }) {
  return (
    <AnimatePresence>
      {photo && (
        <motion.div
          className="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Photo lightbox"
        >
          <motion.div
            className="lightbox__img-wrap"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={e => e.stopPropagation()}
          >
            <img src={photo.src} alt={photo.alt} className="lightbox__img" />
            <div className="lightbox__caption">{photo.alt}</div>
          </motion.div>

          <button className="lightbox__close" onClick={onClose} aria-label="Close">✕</button>
          <button className="lightbox__prev"  onClick={onPrev}  aria-label="Previous photo">‹</button>
          <button className="lightbox__next"  onClick={onNext}  aria-label="Next photo">›</button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Gallery() {
  const [lightboxIdx, setLightboxIdx] = useState(null);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  const openLightbox  = (i) => setLightboxIdx(i);
  const closeLightbox = ()  => setLightboxIdx(null);
  const prevPhoto     = ()  => setLightboxIdx(i => (i - 1 + galleryPhotos.length) % galleryPhotos.length);
  const nextPhoto     = ()  => setLightboxIdx(i => (i + 1) % galleryPhotos.length);

  return (
    <section id="gallery" className="gallery section">
      {/* 📸 PHOTO GALLERY — replace Unsplash URLs with your real photos */}
      <div className="gallery__bg" aria-hidden="true" />
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="gallery__header"
        >
          <div className="section-subtitle">Our Moments</div>
          <h2 className="section-title">A Glimpse of Our Story</h2>
          <div className="divider"><span className="divider-icon">📸</span></div>
          <p className="section-desc">
            Every photograph holds a memory, a laugh, a tear of joy.<br />
            These are our most cherished moments.
          </p>
        </motion.div>

        {/* Masonry grid */}
        <div className="gallery__grid" role="list">
          {galleryPhotos.map((photo, i) => (
            <motion.div
              key={photo.id}
              className={`gallery__item gallery__item--${photo.span}`}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              role="listitem"
            >
              <button
                className="gallery__btn"
                onClick={() => openLightbox(i)}
                aria-label={`View photo: ${photo.alt}`}
              >
                <img
                  src={photo.thumb}
                  alt={photo.alt}
                  className="gallery__img"
                  loading="lazy"
                />
                <div className="gallery__hover">
                  <span className="gallery__hover-icon" aria-hidden="true">🔍</span>
                  <span className="gallery__hover-label">{photo.alt}</span>
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        photo={lightboxIdx !== null ? galleryPhotos[lightboxIdx] : null}
        onClose={closeLightbox}
        onPrev={prevPhoto}
        onNext={nextPhoto}
      />
    </section>
  );
}
