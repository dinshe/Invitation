import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { config } from '../config.js';
import './Hero.css';

// Floating particle class for canvas animation
class Particle {
  constructor(canvas) {
    this.canvas = canvas;
    this.reset();
  }
  reset() {
    this.x     = Math.random() * this.canvas.width;
    this.y     = Math.random() * this.canvas.height + this.canvas.height;
    this.size  = Math.random() * 18 + 8;
    this.speedY = -(Math.random() * 0.6 + 0.3);
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.opacity = Math.random() * 0.6 + 0.2;
    this.rotation = Math.random() * 360;
    this.rotSpeed = (Math.random() - 0.5) * 1.2;
    this.emoji = ['🌸', '🌹', '🌺', '💮', '🌷', '✨', '⭐'][Math.floor(Math.random() * 7)];
  }
  update() {
    this.y        += this.speedY;
    this.x        += this.speedX;
    this.rotation += this.rotSpeed;
    if (this.y < -this.size * 2) this.reset();
  }
  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.font        = `${this.size}px serif`;
    ctx.translate(this.x, this.y);
    ctx.rotate((this.rotation * Math.PI) / 180);
    ctx.fillText(this.emoji, -this.size / 2, this.size / 2);
    ctx.restore();
  }
}

export default function Hero({ loaded }) {
  const canvasRef = useRef(null);
  const animRef   = useRef(null);
  const particles = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Create 30 particles
    particles.current = Array.from({ length: 30 }, () => new Particle(canvas));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.current.forEach(p => { p.update(); p.draw(ctx); });
      animRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  const scrollToNext = () => {
    document.getElementById('countdown')?.scrollIntoView({ behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.18, delayChildren: 0.3 } },
  };

  const itemVariants = {
    hidden:  { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section
      id="home"
      className="hero"
      aria-label="Wedding invitation hero"
    >
      {/* Deep atmospheric background */}
      <div className="hero__bg" aria-hidden="true">
        {/* Background image from Unsplash — romantic beach sunset */}
        {/* 📸 REPLACE: Swap this URL with your actual hero/couple photo */}
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80&auto=format&fit=crop"
          alt=""
          className="hero__bg-img"
          loading="eager"
        />
        <div className="hero__overlay" />
      </div>

      {/* Floating particles canvas */}
      <canvas ref={canvasRef} className="hero__canvas" aria-hidden="true" />

      {/* Main Content */}
      {loaded && (
        <motion.div
          className="hero__content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Top label */}
          <motion.div variants={itemVariants} className="hero__label">
            ✦ Wedding Invitation ✦
          </motion.div>

          {/* Bride & Groom Names */}
          <motion.div variants={itemVariants} className="hero__names-wrap">
            <h1 className="hero__bride">{config.bride}</h1>
            <div className="hero__ampersand">
              <div className="hero__amp-line" />
              <span>&</span>
              <div className="hero__amp-line" />
            </div>
            <h1 className="hero__groom">{config.groom}</h1>
          </motion.div>

          {/* Decorative gold line */}
          <motion.div variants={itemVariants} className="hero__gold-divider" aria-hidden="true" />

          {/* Wedding Date */}
          <motion.div variants={itemVariants} className="hero__date-wrap">
            <time
              dateTime="2026-08-20"
              className="hero__date"
            >
              {config.weddingDateDisplay}
            </time>
            <div className="hero__time-venue">
              <span className="hero__time">{config.weddingTime}</span>
              <span className="hero__dot" aria-hidden="true">•</span>
              <span className="hero__venue-name">{config.venueName}</span>
            </div>
            <div className="hero__hall">{config.venueHall}</div>
            <div className="hero__address">{config.venueAddress}</div>
          </motion.div>

          {/* Scroll CTA */}
          <motion.div variants={itemVariants} className="hero__cta">
            <button
              className="hero__scroll-btn"
              onClick={scrollToNext}
              aria-label="Scroll down to learn more"
            >
              <span className="hero__scroll-text">Scroll to Explore</span>
              <div className="hero__scroll-arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </button>
          </motion.div>
        </motion.div>
      )}

      {/* Decorative corners */}
      <div className="hero__corner hero__corner--tl" aria-hidden="true" />
      <div className="hero__corner hero__corner--tr" aria-hidden="true" />
      <div className="hero__corner hero__corner--bl" aria-hidden="true" />
      <div className="hero__corner hero__corner--br" aria-hidden="true" />
    </section>
  );
}
