import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { config } from '../config.js';
import './Navbar.css';

const navLinks = [
  { href: '#home',      label: 'Home' },
  { href: '#countdown', label: 'Countdown' },
  { href: '#story',     label: 'Our Story' },
  { href: '#gallery',   label: 'Gallery' },
  { href: '#details',   label: 'Details' },
  { href: '#rsvp',      label: 'RSVP' },
  { href: '#wishes',    label: 'Wishes' },
];

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [activeLink,  setActiveLink]  = useState('#home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

      // Highlight active section
      const sections = navLinks.map(l => l.href.substring(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveLink('#' + sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (href) => {
    setActiveLink(href);
    setMenuOpen(false);
    const id = href.substring(1);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <motion.nav
        className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.5, ease: 'easeOut' }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="navbar__inner">
          {/* Logo / Names */}
          <button
            className="navbar__logo"
            onClick={() => handleLinkClick('#home')}
            aria-label="Go to top"
          >
            {config.coupleNames}
          </button>

          {/* Desktop Links */}
          <ul className="navbar__links" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  className={`navbar__link ${activeLink === link.href ? 'navbar__link--active' : ''}`}
                  onClick={() => handleLinkClick(link.href)}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile Hamburger */}
          <button
            className={`navbar__hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.35 }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <button
              className="mobile-menu__close"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              ✕
            </button>

            <div className="mobile-menu__logo">{config.coupleNames}</div>

            <ul className="mobile-menu__links" role="list">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <button
                    className={`mobile-menu__link ${activeLink === link.href ? 'active' : ''}`}
                    onClick={() => handleLinkClick(link.href)}
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}
            </ul>

            <div className="mobile-menu__date">{config.weddingDateDisplay}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
