import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { config } from '../config.js';
import './Guestbook.css';

const SAMPLE_WISHES = config.sampleWishes;

export default function Guestbook() {
  const [wishes,    setWishes]    = useState(SAMPLE_WISHES);
  const [name,      setName]      = useState('');
  const [message,   setMessage]   = useState('');
  const [status,    setStatus]    = useState('idle'); // idle | loading | success | error
  const [nameErr,   setNameErr]   = useState('');
  const [msgErr,    setMsgErr]    = useState('');
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasErr = false;
    if (!name.trim())    { setNameErr('Please enter your name.');    hasErr = true; }
    if (!message.trim()) { setMsgErr('Please write a message.');     hasErr = true; }
    if (hasErr) return;

    setStatus('loading');

    // Optimistic update: add locally first
    const newWish = {
      name:    name.trim(),
      message: message.trim(),
      date:    new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };

    if (config.GUESTBOOK_API_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
      // Demo mode
      await new Promise(r => setTimeout(r, 800));
      setWishes(prev => [newWish, ...prev]);
      setName(''); setMessage('');
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    try {
      const payload = new URLSearchParams({
        type:      'guestbook',
        name:      newWish.name,
        message:   newWish.message,
        timestamp: new Date().toISOString(),
      });

      const res = await fetch(config.GUESTBOOK_API_URL, {
        method:  'POST',
        body:    payload,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });

      const json = await res.json();
      if (json.result === 'success') {
        setWishes(prev => [newWish, ...prev]);
        setName(''); setMessage('');
        setStatus('success');
        setTimeout(() => setStatus('idle'), 3000);
      } else throw new Error('Failed');
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <section id="wishes" className="guestbook section">
      <div className="guestbook__bg" aria-hidden="true" />
      <div className="container">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="guestbook__header"
        >
          <div className="section-subtitle">Guestbook</div>
          <h2 className="section-title">Leave Your Wishes</h2>
          <div className="divider"><span className="divider-icon">✉️</span></div>
          <p className="section-desc">
            Your words mean the world to us. Share your love and blessings.
          </p>
        </motion.div>

        <div className="guestbook__layout">
          {/* Form */}
          <motion.div
            className="guestbook__form-wrap"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="guestbook__form-title">Send Your Wish</h3>
            <form
              className="guestbook__form"
              onSubmit={handleSubmit}
              noValidate
              aria-label="Guestbook wish form"
            >
              <div className={`form-group ${nameErr ? 'form-group--error' : ''}`}>
                <label className="form-label" htmlFor="gb-name">Your Name</label>
                <input
                  id="gb-name"
                  type="text"
                  className="form-input"
                  value={name}
                  onChange={e => { setName(e.target.value); setNameErr(''); }}
                  placeholder="e.g. Kasun & Ayesha"
                  required
                />
                {nameErr && <span className="form-error" role="alert">{nameErr}</span>}
              </div>

              <div className={`form-group ${msgErr ? 'form-group--error' : ''}`}>
                <label className="form-label" htmlFor="gb-message">Your Message</label>
                <textarea
                  id="gb-message"
                  className="form-input form-textarea"
                  value={message}
                  onChange={e => { setMessage(e.target.value); setMsgErr(''); }}
                  placeholder="Write your heartfelt message here…"
                  rows={4}
                  required
                />
                {msgErr && <span className="form-error" role="alert">{msgErr}</span>}
              </div>

              <button
                type="submit"
                className={`btn-gold guestbook__submit ${status === 'loading' ? 'loading' : ''}`}
                disabled={status === 'loading'}
              >
                {status === 'loading' ? (
                  <><span className="rsvp__spinner" aria-hidden="true" /><span>Sending…</span></>
                ) : (
                  <><span>💌</span><span>Send Wishes</span></>
                )}
              </button>

              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    className="guestbook__feedback guestbook__feedback--success"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    role="alert"
                  >
                    ✅ Your wish has been added!
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div
                    className="guestbook__feedback guestbook__feedback--error"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    role="alert"
                  >
                    ❌ Something went wrong. Please try again.
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>

          {/* Wish cards */}
          <div className="guestbook__wishes">
            <AnimatePresence initial={false}>
              {wishes.map((wish, i) => (
                <motion.div
                  key={`${wish.name}-${i}`}
                  className="wish-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: i < 3 ? i * 0.1 : 0 }}
                >
                  <div className="wish-card__quote" aria-hidden="true">"</div>
                  <p className="wish-card__message">{wish.message}</p>
                  <div className="wish-card__footer">
                    <span className="wish-card__name">— {wish.name}</span>
                    <span className="wish-card__date">{wish.date}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
