import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { config } from '../config.js';
import './Footer.css';

export default function Footer() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="footer" role="contentinfo">
      {/* Background */}
      <div className="footer__bg" aria-hidden="true">
        <img
          src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1600&q=60&auto=format&fit=crop"
          alt=""
          className="footer__bg-img"
          loading="lazy"
        />
        <div className="footer__overlay" />
      </div>

      <div className="footer__inner">
        <motion.div
          ref={ref}
          className="footer__content"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          {/* Decorative top */}
          <div className="footer__flowers" aria-hidden="true">
            <span>🌸</span>
            <div className="footer__top-line" />
            <span>💍</span>
            <div className="footer__top-line" />
            <span>🌸</span>
          </div>

          {/* Couple names */}
          <div className="footer__names">{config.coupleNames}</div>

          {/* Wedding date */}
          <div className="footer__date">{config.weddingDateDisplay}</div>

          {/* Tagline */}
          <p className="footer__tagline">
            Together with our families,<br />
            we invite you to celebrate our special day.
          </p>

          {/* Divider */}
          <div className="footer__divider" aria-hidden="true" />

          {/* Venue */}
          <div className="footer__venue">
            <div className="footer__venue-name">{config.venueName}</div>
            <div className="footer__venue-hall">{config.venueHall}</div>
            <div className="footer__venue-addr">{config.venueAddress}</div>
          </div>

          {/* Navigation links */}
          <nav className="footer__nav" aria-label="Footer navigation">
            {['#home','#countdown','#story','#gallery','#details','#rsvp','#wishes'].map((href) => {
              const label = href.substring(1).charAt(0).toUpperCase() + href.slice(2);
              return (
                <button
                  key={href}
                  className="footer__nav-link"
                  onClick={() => {
                    const el = document.getElementById(href.substring(1));
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {label === 'Home' ? 'Home' :
                   label === 'Countdown' ? 'Countdown' :
                   label === 'Story' ? 'Our Story' :
                   label === 'Gallery' ? 'Gallery' :
                   label === 'Details' ? 'Details' :
                   label === 'Rsvp' ? 'RSVP' :
                   'Wishes'}
                </button>
              );
            })}
          </nav>

          {/* Bottom */}
          <div className="footer__bottom">
            <p className="footer__copy">
              Made with 💛 for Nethmi &amp; Dinuth &nbsp;·&nbsp; 20 August 2026
            </p>

            {/* Back to top */}
            <button
              className="footer__top-btn"
              onClick={scrollToTop}
              aria-label="Back to top"
            >
              ↑ Back to Top
            </button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
