import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { config } from '../config.js';
import './MusicPlayer.css';

export default function MusicPlayer() {
  const [playing,  setPlaying]  = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [volume,   setVolume]   = useState(0.4);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.loop   = true;
    }
  }, [volume]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {
        // Autoplay may be blocked — user interaction handles this
      });
    }
    setPlaying(!playing);
  };

  return (
    <div className="music-player" role="complementary" aria-label="Music player">
      {/* Hidden audio element */}
      {/* 🎵 REPLACE: Place your wedding music file at public/music/wedding-music.mp3 */}
      <audio ref={audioRef} src={config.musicFile} preload="none" aria-hidden="true" />

      <AnimatePresence>
        {expanded && (
          <motion.div
            className="music-player__panel"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.25 }}
          >
            <div className="music-player__title">{config.musicTitle}</div>
            <div className="music-player__controls">
              <button
                className={`music-player__btn-main ${playing ? 'playing' : ''}`}
                onClick={togglePlay}
                aria-label={playing ? 'Pause music' : 'Play music'}
              >
                {playing ? '⏸' : '▶'}
              </button>
            </div>
            <div className="music-player__volume">
              <span className="music-player__vol-icon">🔈</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                aria-label="Volume control"
                className="music-player__vol-range"
              />
              <span className="music-player__vol-icon">🔊</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating toggle button */}
      <motion.button
        className={`music-player__toggle ${playing ? 'music-player__toggle--playing' : ''}`}
        onClick={() => setExpanded(!expanded)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle music player"
        title="Wedding Music"
      >
        <span className="music-player__note">{playing ? '🎵' : '🎶'}</span>
        {playing && <div className="music-player__bars" aria-hidden="true">
          <span /><span /><span /><span />
        </div>}
      </motion.button>
    </div>
  );
}
