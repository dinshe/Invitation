import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { config } from '../config.js';
import './WeddingDetails.css';

function generateGoogleCalendarUrl() {
  const base = 'https://www.google.com/calendar/render?action=TEMPLATE';
  const params = new URLSearchParams({
    text:     config.calendarEventTitle,
    dates:    `${config.calendarStart}/${config.calendarEnd}`,
    details:  `${config.bride} & ${config.groom} Wedding Ceremony`,
    location: config.calendarLocation,
  });
  return `${base}&${params.toString()}`;
}

function DetailCard({ icon, title, lines, delay }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  return (
    <motion.div
      ref={ref}
      className="detail-card"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="detail-card__icon" aria-hidden="true">{icon}</div>
      <h3 className="detail-card__title">{title}</h3>
      <div className="detail-card__divider" aria-hidden="true" />
      <div className="detail-card__lines">
        {lines.map((line, i) => (
          <p key={i} className="detail-card__line">{line}</p>
        ))}
      </div>
    </motion.div>
  );
}

export default function WeddingDetails() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="details" className="details section">
      <div className="details__bg" aria-hidden="true" />
      <div className="container">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="details__header"
        >
          <div className="section-subtitle">Join Us</div>
          <h2 className="section-title">Wedding Details</h2>
          <div className="divider"><span className="divider-icon">💐</span></div>
          <p className="section-desc">
            We would be honoured by your presence on our special day.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="details__cards">
          <DetailCard
            icon="💒"
            title="Ceremony"
            delay={0.1}
            lines={[
              config.weddingDateDisplay,
              config.weddingTime,
              config.venueName,
              config.venueHall,
            ]}
          />
          <DetailCard
            icon="📍"
            title="Venue Location"
            delay={0.2}
            lines={[
              ...config.venueAddressLines,
              'Sri Lanka',
            ]}
          />
          <DetailCard
            icon="🎊"
            title="Reception"
            delay={0.3}
            lines={[
              'Lunch Reception — 12:30 PM',
              'Evening Celebration — 6:00 PM',
              config.venueHall,
              config.venueName,
            ]}
          />
        </div>

        {/* Action buttons */}
        <motion.div
          className="details__actions"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          {/* Google Maps */}
          <a
            href={config.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold details__btn"
            aria-label="Open venue in Google Maps"
          >
            <span>📍</span>
            <span>Get Directions</span>
          </a>

          {/* Add to Calendar */}
          <a
            href={generateGoogleCalendarUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline details__btn"
            aria-label="Add wedding to Google Calendar"
          >
            <span>📅</span>
            <span>Add to Calendar</span>
          </a>
        </motion.div>

        {/* Events Timeline */}
        <motion.div
          className="details__timeline"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <h3 className="details__timeline-title">Day Schedule</h3>
          <div className="timeline-events">
            {config.events.map((ev, i) => (
              <motion.div
                key={i}
                className="timeline-event"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.9 + i * 0.12, duration: 0.6 }}
              >
                <div className="timeline-event__icon" aria-hidden="true">{ev.icon}</div>
                <div className="timeline-event__body">
                  <div className="timeline-event__time">{ev.time}</div>
                  <div className="timeline-event__title">{ev.title}</div>
                  <div className="timeline-event__desc">{ev.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
