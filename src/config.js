// ============================================================
// WEDDING WEBSITE CONFIGURATION
// Edit this file to customize the wedding details
// ============================================================

export const config = {
  // ----- Couple Info -----
  bride: "Nethmi",
  groom: "Dinuth",
  coupleNames: "Nethmi & Dinuth",

  // ----- Wedding Date & Time -----
  // ISO format: YYYY-MM-DDTHH:MM:SS
  // Sri Lanka Standard Time (UTC+5:30)
  weddingDateISO: "2026-08-20T09:30:00+05:30",
  weddingDateDisplay: "Thursday, 20 August 2026",
  weddingTime: "9:30 AM",

  // ----- Venue -----
  venueName: "Rock Fort Beach Resort",
  venueHall: "Blue Ocean Ballroom",
  venueAddress: "Dalawella, Unawatuna, Galle, Sri Lanka",
  venueAddressLines: ["Dalawella,", "Unawatuna,", "Galle, Sri Lanka"],

  // ----- Google Maps -----
  // Replace with actual Google Maps share link for Rock Fort Beach Resort
  googleMapsUrl: "https://maps.google.com/?q=Rock+Fort+Beach+Resort+Unawatuna+Galle+Sri+Lanka",

  // ----- Google Calendar Add Event -----
  // Auto-generated; set start/end times in ISO format without hyphens/colons
  calendarEventTitle: "Nethmi & Dinuth Wedding",
  calendarStart: "20260820T040000Z", // 9:30 AM Sri Lanka = 04:00 UTC
  calendarEnd: "20260820T130000Z",   // ~6:30 PM Sri Lanka = 13:00 UTC
  calendarLocation: "Rock Fort Beach Resort, Dalawella, Unawatuna, Galle, Sri Lanka",

  // ----- RSVP Google Apps Script URL -----
  // STEP 1: Deploy your Google Apps Script (see README for instructions)
  // STEP 2: Paste the Web App URL here
  RSVP_API_URL: "https://script.google.com/macros/s/AKfycbx6QP3dIFximD0POQZMr9pigFMenriaS0b2AUv0oDhzrD5z8kGBTPay7S5Bwg-y0u4Pkg/exec",

  // ----- Guestbook API (same or separate Apps Script) -----
  GUESTBOOK_API_URL: "https://script.google.com/macros/s/AKfycbx6QP3dIFximD0POQZMr9pigFMenriaS0b2AUv0oDhzrD5z8kGBTPay7S5Bwg-y0u4Pkg/exec",

  // ----- Background Music -----
  // Place your audio file in public/music/
  // Replace "wedding-music.mp3" with your actual filename
  musicFile: "./music/wedding-music.mp3",
  musicTitle: "A Thousand Years — Christina Perri",

  // ----- Events Timeline -----
  events: [
    { time: "9:30 AM",  title: "Ceremony Begins",       icon: "💍", desc: "The sacred union begins at Blue Ocean Ballroom" },
    { time: "12:30 PM", title: "Lunch Reception",        icon: "🍽️", desc: "Enjoy a lavish reception lunch with family & friends" },
    { time: "4:00 PM",  title: "Photography Session",    icon: "📸", desc: "Capture beautiful memories by the beach" },
    { time: "6:00 PM",  title: "Evening Celebration",    icon: "✨", desc: "Dance, toast, and celebrate the night away" },
  ],

  // ----- Couple Story Timeline -----
  storyTimeline: [
    {
      year: "2020",
      title: "The First Meeting",
      desc: "Two strangers, one moment — a chance encounter that changed everything. Fate had other plans that day.",
      emoji: "👋",
    },
    {
      year: "2021",
      title: "First Date",
      desc: "A sunset walk along Galle Face, laughter that never stopped, and the quiet knowing that this was special.",
      emoji: "🌅",
    },
    {
      year: "2023",
      title: "The Proposal",
      desc: "Under a blanket of stars by the ocean, Dinuth got down on one knee. Nethmi said yes.",
      emoji: "💍",
    },
    {
      year: "2026",
      title: "Wedding Day",
      desc: "Two hearts become one. Today we begin our greatest adventure — together, forever.",
      emoji: "💑",
    },
  ],

  // ----- Sample Wishes -----
  sampleWishes: [
    { name: "Ayesha & Kasun",    message: "Wishing you a lifetime of love, laughter, and happiness! 💕",          date: "Jul 28, 2026" },
    { name: "Supun Fernando",    message: "May your journey together be filled with endless joy and blessings! ✨", date: "Jul 30, 2026" },
    { name: "Nadeesha & Lahiru", message: "So happy for you both! Can't wait to celebrate with you! 🥂",           date: "Aug 1, 2026"  },
  ],
};

export default config;
