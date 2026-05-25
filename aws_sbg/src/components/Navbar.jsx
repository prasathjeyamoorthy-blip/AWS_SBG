import { useState, useEffect } from 'react';
import { Home, Map, Clock, Shield, Compass, Trophy, HelpCircle } from 'lucide-react';
import { LimelightNav } from './ui/limelight-nav';
import { JoinNowButton } from './ui/join-now-button';

// Shared nav data — used for both desktop (text) and mobile (icon) modes
const NAV = [
  { id: 'home',      label: 'Home',      href: '#hero',      icon: <Home /> },
  { id: 'voyage',    label: 'Voyage',    href: '#about',     icon: <Map /> },
  { id: 'timeline',  label: 'Timeline',  href: '#timeline',  icon: <Clock /> },
  { id: 'guardians', label: 'Guardians', href: '#guardians', icon: <Shield /> },
  { id: 'tracks',    label: 'Tracks',    href: '#tracks',    icon: <Compass /> },
  { id: 'treasure',  label: 'Treasure',  href: '#prizes',    icon: <Trophy /> },
  { id: 'faq',       label: 'FAQ',       href: '#faq',       icon: <HelpCircle /> },
];

const desktopItems = NAV.map(({ id, label, href, icon }) => ({
  id, label, icon,
  onClick: () => { window.location.hash = href; },
}));

const mobileItems = NAV.map(({ id, label, href, icon }) => ({
  id, label, icon,
  onClick: () => { window.location.hash = href; },
}));

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(prev => prev === isScrolled ? prev : isScrolled);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
            AWS SBG
          </span>
        </div>

        {/* Limelight nav — text mode, centered */}
        <div className="flex-1 flex justify-center min-w-0 overflow-hidden">
          <LimelightNav
            items={desktopItems}
            defaultActiveIndex={0}
            textMode={true}
            className="bg-transparent border-transparent h-14"
            limelightClassName="bg-purple-500 shadow-[0_0_18px_4px_rgba(139,92,246,0.55)]"
          />
        </div>

        {/* CTA */}
        <div className="flex-shrink-0 min-w-[100px] flex justify-end">
          <JoinNowButton href="#register" />
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
        <JoinNowButton href="#register" />
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
        <JoinNowButton href="#register" />
      </header>

      {/* ── LIMELIGHT BOTTOM NAV (mobile + tablet only) ── */}
      <div className="fixed bottom-4 sm:bottom-6 left-0 right-0 z-50 flex justify-center lg:hidden pointer-events-none px-3">
        <div className="pointer-events-auto w-full max-w-sm sm:max-w-md">
          <LimelightNav
            items={mobileItems}
            defaultActiveIndex={0}
            className="bg-black/80 backdrop-blur-xl border-purple-800/40 shadow-2xl shadow-purple-950/60 w-full justify-around"
            limelightClassName="bg-purple-500 shadow-[0_0_18px_4px_rgba(139,92,246,0.6)]"
            iconClassName="text-purple-200"
          />
        </div>
      </div>
    </>
  );
}
