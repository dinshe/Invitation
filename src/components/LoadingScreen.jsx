import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './LoadingScreen.css';
import { config } from '../config.js';

export default function LoadingScreen({ onDone }) {
  const [phase, setPhase] = useState('in'); // in | hold | out

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('out'), 2000);
    const t2 = setTimeout(() => onDone(), 2600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);

  return (
    <AnimatePresence>
      {phase !== 'hidden' && (
        <motion.div
          className="loading-overlay"
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === 'out' ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          onAnimationComplete={() => {
            if (phase === 'out') setPhase('hidden');
          }}
          role="status"
          aria-label="Loading wedding invitation"
        >
          {/* Animated petals background */}
          <div className="loading-petals" aria-hidden="true">
            {[...Array(8)].map((_, i) => (
              <div key={i} className={`loading-petal loading-petal--${i + 1}`}>🌸</div>
            ))}
          </div>

          <motion.div
            className="loading-content"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="loading-ring" aria-hidden="true" />

            <div className="loading-names">{config.coupleNames}</div>

            <div className="loading-subtitle">
              {config.weddingDateDisplay}
            </div>

            <div className="loading-dots" aria-hidden="true">
              {[0, 1, 2].map(i => (
                <span key={i} className="loading-dot" style={{ animationDelay: `${i * 0.2}s` }} />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
