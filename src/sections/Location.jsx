import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { config } from '../config.js';
import './Location.css';

export default function Location() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="location" className="location section">
      <div className="location__bg" aria-hidden="true" />
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="location__header"
        >
          <div className="section-subtitle">Find Us</div>
          <h2 className="section-title">The Venue</h2>
          <div className="divider"><span className="divider-icon">📍</span></div>
        </motion.div>

        <div className="location__content">
          {/* Venue image */}
          <motion.div
            className="location__img-wrap"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            {/* 📸 REPLACE: Swap with actual venue photo */}
            <img
              src="https://images.unsplash.com/photo-1470116945706-e6bf5d5a53ca?w=800&q=80&auto=format&fit=crop"
              alt={`${config.venueName} — wedding venue`}
              className="location__img"
              loading="lazy"
            />
            <div className="location__img-badge">
              <span className="location__img-badge-text">🏖️ Beach Resort</span>
            </div>
          </motion.div>

          {/* Venue info */}
          <motion.div
            className="location__info"
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.3 }}
          >
            <div className="location__venue-name">{config.venueName}</div>
            <div className="location__hall">{config.venueHall}</div>

            <div className="location__address-block">
              <div className="location__address-icon" aria-hidden="true">📍</div>
              <address className="location__address">
                {config.venueAddressLines.map((line, i) => (
                  <span key={i}>{line}<br /></span>
                ))}
                Sri Lanka
              </address>
            </div>

            <div className="location__details">
              <div className="location__detail-row">
                <span className="location__detail-icon" aria-hidden="true">📅</span>
                <span className="location__detail-text">{config.weddingDateDisplay}</span>
              </div>
              <div className="location__detail-row">
                <span className="location__detail-icon" aria-hidden="true">🕘</span>
                <span className="location__detail-text">Ceremony begins at {config.weddingTime}</span>
              </div>
            </div>

            <div className="location__actions">
              <a
                href={config.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold"
                aria-label="Open venue in Google Maps"
              >
                <span>🗺️</span>
                <span>Open in Maps</span>
              </a>
            </div>

            {/* Embedded map placeholder */}
            <div className="location__map-embed">
              <div className="location__map-placeholder">
                {/* 
                  🗺️ REPLACE: To embed a real Google Map:
                  1. Go to maps.google.com
                  2. Search: "Rock Fort Beach Resort Unawatuna"
                  3. Click Share > Embed a map
                  4. Replace this div with the <iframe> code
                */}
                <div className="location__map-mock">
                  <div className="location__map-mock-bg" />
                  <div className="location__map-pin" aria-label="Map pin for venue location">
                    <span>📍</span>
                    <div className="location__map-bubble">
                      <strong>{config.venueName}</strong><br />
                      {config.venueAddress}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
