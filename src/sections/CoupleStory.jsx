import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { config } from '../config.js';
import './CoupleStory.css';

// Unsplash images — replace with real couple photos
const timelineImages = [
  'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1529636798458-92182e662485?w=600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80&auto=format&fit=crop',
];

function TimelineItem({ item, index, image }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      className={`story-item ${isLeft ? 'story-item--left' : 'story-item--right'}`}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
    >
      {/* Card */}
      <div className="story-card">
        {/* 📸 REPLACE: Swap these Unsplash URLs with your real couple photos */}
        <div className="story-card__img-wrap">
          <img
            src={image}
            alt={item.title}
            className="story-card__img"
            loading="lazy"
          />
          <div className="story-card__img-overlay" />
        </div>

        <div className="story-card__body">
          <div className="story-card__emoji" aria-hidden="true">{item.emoji}</div>
          <div className="story-card__year">{item.year}</div>
          <h3 className="story-card__title">{item.title}</h3>
          <p className="story-card__desc">{item.desc}</p>
        </div>
      </div>

      {/* Center dot */}
      <div className="story-dot" aria-hidden="true">
        <div className="story-dot__inner" />
      </div>

      {/* Spacer */}
      <div className="story-spacer" />
    </motion.div>
  );
}

export default function CoupleStory() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="story" className="story section">
      <div className="container">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="story__header"
        >
          <div className="section-subtitle">Our Journey</div>
          <h2 className="section-title">Two Hearts, One Journey</h2>
          <div className="divider"><span className="divider-icon">🌹</span></div>
          <p className="section-desc">
            Every love story is beautiful, but ours is our favourite.<br />
            Here's how we found each other.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="story-timeline" role="list">
          {/* Vertical line */}
          <div className="story-timeline__line" aria-hidden="true" />

          {config.storyTimeline.map((item, i) => (
            <TimelineItem
              key={i}
              item={item}
              index={i}
              image={timelineImages[i] || timelineImages[0]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
