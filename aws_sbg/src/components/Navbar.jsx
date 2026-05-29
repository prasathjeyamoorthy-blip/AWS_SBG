import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Home, Clock, Shield, Compass, Trophy, HelpCircle, Phone, MapPin } from 'lucide-react';
import { LimelightNav } from './ui/limelight-nav';
import { JoinNowButton } from './ui/join-now-button';

// Shared nav data — order must match page section order
const NAV = [
  { id: 'home',      label: 'Home',      href: '#hero',      icon: <Home /> },
  { id: 'tracks',    label: 'Tracks',    href: '#tracks',    icon: <Compass /> },
  { id: 'timeline',  label: 'Timeline',  href: '#timeline',  icon: <Clock /> },
  { id: 'mentors', label: 'Mentors', href: '#mentors', icon: <Shield /> },
  { id: 'prizes',    label: 'Prizes',    href: '#prizes',    icon: <Trophy /> },
  { id: 'venue',     label: 'Venue',     href: '#venue',     icon: <MapPin /> },
  { id: 'faq',       label: 'FAQ',       href: '#faq',       icon: <HelpCircle /> },
  { id: 'contact',   label: 'Contact',   href: '#contact',   icon: <Phone /> },
];

// Mobile shows only 5 key items so each icon is large and tappable
const MOBILE_NAV_IDS = ['home', 'timeline', 'prizes', 'faq', 'contact'];
const MOBILE_NAV = NAV.filter(n => MOBILE_NAV_IDS.includes(n.id));

// Section IDs in page order (strip the '#')
const SECTION_IDS = NAV.map(({ href }) => href.replace('#', ''));

const desktopItems = NAV.map(({ id, label, href, icon }) => ({
  id, label, icon,
  onClick: () => {
    document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });
  },
}));

const mobileItems = NAV.map(({ id, label, href, icon }) => ({
  id, label, icon,
  onClick: () => {
    document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });
  },
}));

const mobileOnlyItems = MOBILE_NAV.map(({ id, label, href, icon }) => ({
  id, label, icon,
  onClick: () => {
    document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });
  },
}));

export default function Navbar() {
  const [scrolled, setScrolled]       = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  // Track which index was last clicked so we don't immediately override it
  const clickedIndexRef = useRef(-1);
  const clickTimerRef   = useRef(null);

  /* ── Scroll background ── */
  useEffect(() => {
    const onScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(prev => prev === isScrolled ? prev : isScrolled);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Active section tracking via IntersectionObserver ── */
  useEffect(() => {
    // Map sectionId → nav index
    const indexMap = Object.fromEntries(SECTION_IDS.map((id, i) => [id, i]));
    // Track how much of each section is visible
    const visibilityMap = {};

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          visibilityMap[entry.target.id] = entry.intersectionRatio;
        });

        // If a click just happened, don't override for 800ms
        if (clickedIndexRef.current !== -1) return;

        // Pick the section with the highest intersection ratio
        let bestId = null;
        let bestRatio = 0;
        Object.entries(visibilityMap).forEach(([id, ratio]) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        });

        if (bestId !== null && indexMap[bestId] !== undefined) {
          setActiveIndex(indexMap[bestId]);
        }
      },
      {
        // Fire at multiple thresholds for smooth tracking
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        // Shrink the root viewport so sections near the top/bottom edges
        // don't count as "active" — the middle 60% of the screen wins
        rootMargin: '-20% 0px -20% 0px',
      }
    );

    SECTION_IDS.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        visibilityMap[id] = 0;
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  /* ── On click: immediately set active and lock for 800ms ── */
  const handleNavClick = (index) => {
    setActiveIndex(index);
    clickedIndexRef.current = index;
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    clickTimerRef.current = setTimeout(() => {
      clickedIndexRef.current = -1;
    }, 800);
  };

  const desktopItemsWithClick = desktopItems.map((item, i) => ({
    ...item,
    onClick: () => { handleNavClick(i); item.onClick(); },
  }));

  const mobileItemsWithClick = mobileItems.map((item, i) => ({
    ...item,
    onClick: () => { handleNavClick(i); item.onClick(); },
  }));

  // Mobile-only 5-item nav — activeIndex mapped to MOBILE_NAV position
  const mobileOnlyActiveIndex = MOBILE_NAV_IDS.indexOf(NAV[activeIndex]?.id);
  const mobileOnlyItemsWithClick = mobileOnlyItems.map((item, i) => {
    const globalIndex = NAV.findIndex(n => n.id === item.id);
    return {
      ...item,
      onClick: () => { handleNavClick(globalIndex); item.onClick(); },
    };
  });

  return (
    <>
      {/* ── DESKTOP (lg+): Logo | LimelightNav | JoinNowButton ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 hidden lg:flex items-center justify-between h-14 px-4 xl:px-10 transition-all duration-300 ${
          scrolled
            ? 'bg-black/85 backdrop-blur-md border-b border-purple-900/40 shadow-lg shadow-purple-950/30'
            : 'bg-black/60 backdrop-blur-sm border-b border-purple-900/20'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 flex-shrink-0 min-w-[100px]">
          <img src="/aws-sbg-icon.png" alt="AWS SBG" className="w-7 h-7 xl:w-8 xl:h-8 object-contain" />
          <span className="text-white text-xs tracking-[0.15em] xl:tracking-[0.2em] uppercase font-display-bold whitespace-nowrap">
            AWS SBG SMVEC
          </span>
        </div>

        {/* Limelight nav — text mode, centered */}
        <div className="flex-1 flex justify-center min-w-0 overflow-hidden">
          <LimelightNav
            items={desktopItemsWithClick}
            activeIndex={activeIndex}
            textMode={true}
            className="bg-transparent border-transparent h-14"
            limelightClassName="bg-purple-500 shadow-[0_0_18px_4px_rgba(139,92,246,0.55)]"
          />
        </div>

        {/* CTA */}
        <div className="flex-shrink-0 min-w-[100px] flex items-center justify-end gap-3">
          <Link to="/code-of-conduct"
            className="text-xs font-mono-bold text-purple-400 hover:text-white transition-colors whitespace-nowrap">
            Code of Conduct
          </Link>
          <JoinNowButton href="https://docs.google.com/forms/d/e/1FAIpQLScqy6GeNnTs3BPmAgFw73AAZ3RA6WenwfTFCrWYIKZDK0GGYQ/viewform?usp=publish-editor" />
        </div>
      </header>

      {/* ── TABLET (md–lg): Logo | JoinNowButton + limelight bottom bar ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 hidden md:flex lg:hidden items-center justify-between h-14 px-6 transition-all duration-300 ${
          scrolled
            ? 'bg-black/85 backdrop-blur-md border-b border-purple-900/40'
            : 'bg-black/60 backdrop-blur-sm border-b border-purple-900/20'
        }`}
      >
        <div className="flex items-center gap-2">
          <img src="/aws-sbg-icon.png" alt="AWS SBG" className="w-8 h-8 object-contain" />
          <span className="text-white text-sm tracking-widest uppercase font-display-bold">
            AWS SBG
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/code-of-conduct"
            className="text-xs font-mono-bold text-purple-400 hover:text-white transition-colors whitespace-nowrap">
            Code of Conduct
          </Link>
          <JoinNowButton href="https://docs.google.com/forms/d/e/1FAIpQLScqy6GeNnTs3BPmAgFw73AAZ3RA6WenwfTFCrWYIKZDK0GGYQ/viewform?usp=publish-editor" />
        </div>
      </header>

      {/* ── MOBILE (<md): Logo | JoinNowButton ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex md:hidden items-center justify-between h-14 px-4 transition-all duration-300 ${
          scrolled
            ? 'bg-black/85 backdrop-blur-md border-b border-purple-900/40'
            : 'bg-black/60 backdrop-blur-sm border-b border-purple-900/20'
        }`}
      >
        <div className="flex items-center gap-2">
          <img src="/aws-sbg-icon.png" alt="AWS SBG" className="w-7 h-7 object-contain" />
          <span className="text-white text-xs tracking-widest uppercase font-display-bold">
            AWS SBG
          </span>
        </div>
        <JoinNowButton href="https://docs.google.com/forms/d/e/1FAIpQLScqy6GeNnTs3BPmAgFw73AAZ3RA6WenwfTFCrWYIKZDK0GGYQ/viewform?usp=publish-editor" />
      </header>

      {/* ── BOTTOM NAV: mobile <sm — 5 items, large icons ── */}
      <div className="fixed bottom-3 left-0 right-0 z-50 flex justify-center sm:hidden pointer-events-none px-4">
        <div className="pointer-events-auto w-full max-w-xs">
          <LimelightNav
            items={mobileOnlyItemsWithClick}
            activeIndex={mobileOnlyActiveIndex}
            className="bg-black/90 backdrop-blur-xl border-purple-800/40 shadow-2xl shadow-purple-950/60 w-full justify-around h-16"
            limelightClassName="bg-purple-500 shadow-[0_0_18px_4px_rgba(139,92,246,0.6)]"
            iconClassName="text-purple-200 w-6 h-6"
          />
        </div>
      </div>

      {/* ── BOTTOM NAV: tablet sm–lg — all 8 items ── */}
      <div className="fixed bottom-4 left-0 right-0 z-50 hidden sm:flex justify-center lg:hidden pointer-events-none px-3">
        <div className="pointer-events-auto w-full max-w-sm md:max-w-md">
          <LimelightNav
            items={mobileItemsWithClick}
            activeIndex={activeIndex}
            className="bg-black/85 backdrop-blur-xl border-purple-800/40 shadow-2xl shadow-purple-950/60 w-full justify-around"
            limelightClassName="bg-purple-500 shadow-[0_0_18px_4px_rgba(139,92,246,0.6)]"
            iconClassName="text-purple-200"
          />
        </div>
      </div>
    </>
  );
}
