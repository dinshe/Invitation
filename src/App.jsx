import React, { useState, useCallback } from 'react';

// Components
import LoadingScreen from './components/LoadingScreen.jsx';
import Navbar        from './components/Navbar.jsx';
import MusicPlayer   from './components/MusicPlayer.jsx';

// Sections
import Hero          from './sections/Hero.jsx';
import Countdown     from './sections/Countdown.jsx';
import CoupleStory   from './sections/CoupleStory.jsx';
import Gallery       from './sections/Gallery.jsx';
import WeddingDetails from './sections/WeddingDetails.jsx';
import RSVP          from './sections/RSVP.jsx';
import Location      from './sections/Location.jsx';
import Guestbook     from './sections/Guestbook.jsx';
import Footer        from './sections/Footer.jsx';

export default function App() {
  const [loaded, setLoaded] = useState(false);

  const handleLoadingDone = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      {/* Loading screen — shown for ~2.5s */}
      {!loaded && <LoadingScreen onDone={handleLoadingDone} />}

      {/* Main site — rendered but invisible during loading */}
      <div
        style={{
          opacity:    loaded ? 1 : 0,
          transition: 'opacity 0.6s ease',
          pointerEvents: loaded ? 'auto' : 'none',
        }}
      >
        {/* Sticky navigation */}
        <Navbar />

        {/* Floating music player */}
        <MusicPlayer />

        {/* Main content */}
        <main id="main-content">
          {/* 1. Hero */}
          <Hero loaded={loaded} />

          {/* 2. Countdown Timer */}
          <Countdown />

          {/* 3. Our Story */}
          <CoupleStory />

          {/* 4. Photo Gallery */}
          <Gallery />

          {/* 5. Wedding Details + Events Timeline */}
          <WeddingDetails />

          {/* 6. RSVP */}
          <RSVP />

          {/* 7. Location */}
          <Location />

          {/* 8. Guestbook */}
          <Guestbook />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
