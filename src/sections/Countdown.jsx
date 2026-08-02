import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { config } from '../config.js';
import './Countdown.css';

function useCountdown(targetISO) {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const target = new Date(targetISO).getTime();

    const tick = () => {
      const now  = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({ done: true });
        return;
      }

      const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft({ days, hours, minutes, seconds, done: false });
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetISO]);

  return timeLeft;
}

function CountdownCard({ value, label, delay }) {
  const [ref, inView] = useInView({ triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      className="countdown__card"
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="countdown__value">{String(value).padStart(2, '0')}</div>
      <div className="countdown__label">{label}</div>
    </motion.div>
  );
}

export default function Countdown() {
  const time = useCountdown(config.weddingDateISO);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  if (time.done) {
    return (
      <section id="countdown" className="countdown countdown--done">
        <div className="container">
          <motion.div
            className="countdown__forever"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="countdown__forever-icon">💑</div>
            <h2 className="countdown__forever-text">Forever Begins</h2>
            <p className="countdown__forever-sub">Today marks the start of our beautiful journey</p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="countdown" className="countdown">
      <div className="countdown__bg" aria-hidden="true" />

      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="countdown__header"
        >
          <div className="section-subtitle">Counting Down</div>
          <h2 className="countdown__title">The Big Day</h2>
          <div className="divider"><span className="divider-icon">💍</span></div>
          <p className="section-desc">
            {config.weddingDateDisplay} &nbsp;·&nbsp; {config.weddingTime}<br />
            {config.venueName}, {config.venueAddress}
          </p>
        </motion.div>

        <div className="countdown__cards" role="timer" aria-label="Wedding countdown timer">
          {time.days    !== undefined && <CountdownCard value={time.days}    label="Days"    delay={0.1} />}
          {time.hours   !== undefined && <CountdownCard value={time.hours}   label="Hours"   delay={0.2} />}
          {time.minutes !== undefined && <CountdownCard value={time.minutes} label="Minutes" delay={0.3} />}
          {time.seconds !== undefined && <CountdownCard value={time.seconds} label="Seconds" delay={0.4} />}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="countdown__footer"
        >
          <span className="countdown__ring-emoji" aria-hidden="true">💍</span>
          <span className="countdown__footer-text">and counting…</span>
          <span className="countdown__ring-emoji" aria-hidden="true">💍</span>
        </motion.div>
      </div>
    </section>
  );
}
