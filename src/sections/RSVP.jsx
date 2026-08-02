import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { config } from '../config.js';
import './RSVP.css';

const initialForm = {
  name:       '',
  guests:     '1',
  attendance: 'yes',
  message:    '',
};

function validate(form) {
  const errors = {};
  if (!form.name.trim())       errors.name    = 'Please enter your name.';
  if (!form.attendance)        errors.attendance = 'Please select attendance.';
  const g = parseInt(form.guests, 10);
  if (isNaN(g) || g < 1 || g > 10) errors.guests = 'Please enter 1–10 guests.';
  return errors;
}

export default function RSVP() {
  const [form,    setForm]    = useState(initialForm);
  const [errors,  setErrors]  = useState({});
  const [status,  setStatus]  = useState('idle'); // idle | loading | success | error
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus('loading');

    // Check if API URL has been configured
    if (config.RSVP_API_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
      // Demo mode: simulate success after a short delay
      await new Promise(r => setTimeout(r, 1200));
      setStatus('success');
      return;
    }

    try {
      // Submit to Google Apps Script
      const payload = new URLSearchParams({
        name:       form.name.trim(),
        guests:     form.guests,
        attendance: form.attendance,
        message:    form.message.trim(),
        timestamp:  new Date().toISOString(),
      });

      const res = await fetch(config.RSVP_API_URL, {
        method: 'POST',
        body:   payload,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });

      const json = await res.json();
      if (json.result === 'success') {
        setStatus('success');
      } else {
        throw new Error(json.error || 'Submission failed');
      }
    } catch (err) {
      console.error('RSVP Error:', err);
      setStatus('error');
    }
  };

  const resetForm = () => {
    setForm(initialForm);
    setErrors({});
    setStatus('idle');
  };

  return (
    <section id="rsvp" className="rsvp">
      {/* Romantic background */}
      <div className="rsvp__bg" aria-hidden="true">
        {/* 📸 REPLACE: Swap this with a romantic photo URL or your couple photo */}
        <img
          src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1600&q=70&auto=format&fit=crop"
          alt=""
          className="rsvp__bg-img"
          loading="lazy"
        />
        <div className="rsvp__overlay" />
      </div>

      <div className="container rsvp__inner">
        <motion.div
          ref={ref}
          className="rsvp__card"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Header */}
          <div className="rsvp__header">
            <div className="section-subtitle" style={{ color: 'var(--color-gold)' }}>Kindly Reply</div>
            <h2 className="rsvp__title">Will You Join Us?</h2>
            <div className="divider"><span className="divider-icon">💌</span></div>
            <p className="rsvp__subtitle">
              Please RSVP by <strong>1 August 2026</strong>
            </p>
          </div>

          {/* Success state */}
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                className="rsvp__success"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                role="alert"
                aria-live="polite"
              >
                <div className="rsvp__success-icon" aria-hidden="true">🎉</div>
                <h3 className="rsvp__success-title">Thank You!</h3>
                <p className="rsvp__success-msg">
                  We've received your RSVP and can't wait to celebrate with you.
                </p>
                <button className="btn-outline rsvp__reset-btn" onClick={resetForm}>
                  Submit Another RSVP
                </button>
              </motion.div>
            ) : status === 'error' ? (
              <motion.div
                key="error"
                className="rsvp__error-msg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                role="alert"
                aria-live="assertive"
              >
                <p>Something went wrong. Please try again or contact us directly.</p>
                <button className="btn-outline rsvp__reset-btn" onClick={() => setStatus('idle')}>
                  Try Again
                </button>
              </motion.div>
            ) : (
              /* RSVP Form */
              <motion.form
                key="form"
                className="rsvp__form"
                onSubmit={handleSubmit}
                noValidate
                aria-label="RSVP form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Guest Name */}
                <div className={`form-group ${errors.name ? 'form-group--error' : ''}`}>
                  <label className="form-label" htmlFor="rsvp-name">
                    Your Full Name *
                  </label>
                  <input
                    id="rsvp-name"
                    type="text"
                    name="name"
                    className="form-input"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. Ayesha Perera"
                    autoComplete="name"
                    required
                    aria-required="true"
                    aria-describedby={errors.name ? 'rsvp-name-error' : undefined}
                  />
                  {errors.name && (
                    <span id="rsvp-name-error" className="form-error" role="alert">{errors.name}</span>
                  )}
                </div>

                {/* Attendance */}
                <div className={`form-group ${errors.attendance ? 'form-group--error' : ''}`}>
                  <label className="form-label">Attendance *</label>
                  <div className="form-radio-group" role="radiogroup" aria-label="Will you attend?">
                    {[
                      { value: 'yes', label: '✅ Joyfully Accept' },
                      { value: 'no',  label: '😢 Regretfully Decline' },
                    ].map(opt => (
                      <label key={opt.value} className="form-radio-label">
                        <input
                          type="radio"
                          name="attendance"
                          value={opt.value}
                          checked={form.attendance === opt.value}
                          onChange={handleChange}
                          className="form-radio"
                        />
                        <span className="form-radio-custom" />
                        <span>{opt.label}</span>
                      </label>
                    ))}
                  </div>
                  {errors.attendance && (
                    <span className="form-error" role="alert">{errors.attendance}</span>
                  )}
                </div>

                {/* Number of guests */}
                <div className={`form-group ${errors.guests ? 'form-group--error' : ''}`}>
                  <label className="form-label" htmlFor="rsvp-guests">
                    Number of Guests
                  </label>
                  <select
                    id="rsvp-guests"
                    name="guests"
                    className="form-input form-select"
                    value={form.guests}
                    onChange={handleChange}
                    aria-describedby={errors.guests ? 'rsvp-guests-error' : undefined}
                  >
                    {[1,2,3,4,5,6,7,8,9,10].map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                  {errors.guests && (
                    <span id="rsvp-guests-error" className="form-error" role="alert">{errors.guests}</span>
                  )}
                </div>

                {/* Message */}
                <div className="form-group">
                  <label className="form-label" htmlFor="rsvp-message">
                    Leave a Message <span style={{ fontWeight: 300 }}>(optional)</span>
                  </label>
                  <textarea
                    id="rsvp-message"
                    name="message"
                    className="form-input form-textarea"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Send your wishes or special requests…"
                    rows={4}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className={`btn-gold rsvp__submit ${status === 'loading' ? 'loading' : ''}`}
                  disabled={status === 'loading'}
                  aria-busy={status === 'loading'}
                >
                  {status === 'loading' ? (
                    <>
                      <span className="rsvp__spinner" aria-hidden="true" />
                      <span>Sending…</span>
                    </>
                  ) : (
                    <>
                      <span>💌</span>
                      <span>Send RSVP</span>
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
