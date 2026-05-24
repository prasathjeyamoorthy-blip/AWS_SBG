import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionBlurEdges from './ui/SectionBlurEdges';

const tracks = [
  {
    id: 1,
    title: 'AI & Automation',
    description: 'Intelligent systems and smart solutions.',
  },
  {
    id: 2,
    title: 'Web & Cloud',
    description: 'Scalable digital platforms and experiences.',
  },
  {
    id: 3,
    title: 'Blockchain & Web3',
    description: 'Secure and decentralized innovation.',
  },
  {
    id: 4,
    title: 'Cybersecurity',
    description: 'Protect the seas from digital threats.',
  },
  {
    id: 5,
    title: 'Future Tech',
    description: 'Futuristic and next-generation ideas.',
  },
];

function getTrackForClick(xPct, yPct) {
  if (xPct <= 26)               return tracks[4]; // Future Tech       — left ship
  if (xPct <= 35)               return null;       // unassigned ship zone
  // Center column — treasure chest dead zone (center of video)
  if (xPct <= 58) {
    if (yPct >= 35 && yPct <= 65) return null;     // treasure chest — no popup
    if (yPct < 50)               return tracks[0]; // AI & Automation   — top-center ship
    return tracks[3];                              // Cybersecurity     — bottom-center ship
  }
  if (xPct <= 74)               return tracks[1]; // Web & Cloud       — top-right ship
  return tracks[2];                               // Blockchain & Web3 — right-middle ship
}

/* ── Animated gradient card (adapted from provided component) ── */
function TrackCard({ track, onClose }) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top  - rect.height / 2;
    setRotation({
      x: -(y / rect.height) * 8,
      y:  (x / rect.width)  * 8,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative rounded-[24px] overflow-hidden"
      style={{
        width: '300px',
        transformStyle: 'preserve-3d',
        backgroundColor: '#0e131f',
        boxShadow: '0 -10px 80px 8px rgba(139,92,246,0.3), 0 0 10px 0 rgba(0,0,0,0.6)',
      }}
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: isHovered ? -4 : 0,
        rotateX: rotation.x,
        rotateY: rotation.y,
      }}
      exit={{ opacity: 0, scale: 0.85, y: 20 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Glass reflection */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0) 80%, rgba(255,255,255,0.05) 100%)',
          zIndex: 35,
        }}
        animate={{ opacity: isHovered ? 0.7 : 0.5 }}
        transition={{ duration: 0.4 }}
      />

      {/* Dark background */}
      <div className="absolute inset-0 z-0" style={{ background: 'linear-gradient(180deg, #08000f 0%, #0d0020 100%)' }} />

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-20 mix-blend-overlay z-10 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Purple/blue glow */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-2/3 z-20 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at bottom right, rgba(139,92,246,0.65) -10%, rgba(79,70,229,0) 70%),
                       radial-gradient(ellipse at bottom left,  rgba(88,28,135,0.65)  -10%, rgba(79,70,229,0) 70%)`,
          filter: 'blur(36px)',
        }}
        animate={{ opacity: isHovered ? 0.95 : 0.8 }}
        transition={{ duration: 0.4 }}
      />

      {/* Central glow */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-2/3 z-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at bottom center, rgba(139,92,246,0.7) -20%, rgba(79,70,229,0) 60%)',
          filter: 'blur(40px)',
        }}
        animate={{ opacity: isHovered ? 0.9 : 0.75, y: isHovered ? '8%' : '10%' }}
        transition={{ duration: 0.4 }}
      />

      {/* Bottom border glow */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] z-25 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.05) 100%)' }}
        animate={{
          boxShadow: isHovered
            ? '0 0 20px 4px rgba(139,92,246,0.9), 0 0 30px 6px rgba(109,40,217,0.7)'
            : '0 0 14px 3px rgba(139,92,246,0.7), 0 0 22px 5px rgba(109,40,217,0.5)',
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Card content */}
      <motion.div className="relative flex flex-col p-6 z-40" animate={{ z: 2 }}>
        {/* Track number badge */}
        <motion.div
          className="w-10 h-10 rounded-full flex items-center justify-center mb-5"
          style={{
            background: 'linear-gradient(225deg, rgba(139,92,246,0.4) 0%, rgba(88,28,135,0.6) 100%)',
            border: '1px solid rgba(168,85,247,0.5)',
          }}
          animate={{
            boxShadow: isHovered
              ? '0 8px 16px -2px rgba(0,0,0,0.4), inset 2px 2px 5px rgba(255,255,255,0.1), inset -2px -2px 5px rgba(0,0,0,0.6)'
              : '0 4px 10px -2px rgba(0,0,0,0.3), inset 1px 1px 3px rgba(255,255,255,0.08)',
            y: isHovered ? -2 : 0,
          }}
          transition={{ duration: 0.4 }}
        >
          <span className="text-white font-mono-bold text-sm">{track.id}</span>
        </motion.div>

        {/* Title */}
        <motion.h3
          className="text-xl text-white mb-3 font-display-bold leading-tight"
          initial={{ filter: 'blur(4px)', opacity: 0.6 }}
          animate={{ filter: 'blur(0px)', opacity: 1, textShadow: isHovered ? '0 2px 8px rgba(139,92,246,0.4)' : 'none' }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          {track.title}
        </motion.h3>

        {/* Description */}
        <motion.p
          className="text-sm text-purple-200/75 leading-relaxed font-body-bold mb-5"
          initial={{ filter: 'blur(4px)', opacity: 0.5 }}
          animate={{ filter: 'blur(0px)', opacity: 0.85 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {track.description}
        </motion.p>

        {/* Close */}
        <motion.button
          className="inline-flex items-center gap-1.5 text-purple-300 text-xs font-mono-bold tracking-widest uppercase self-end"
          initial={{ filter: 'blur(4px)', opacity: 0.5 }}
          animate={{ filter: 'blur(0px)', opacity: 0.7 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          whileHover={{ opacity: 1 }}
          onClick={(e) => { e.stopPropagation(); onClose(); }}
        >
          close ✕
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default function Tracks() {
  const videoRef     = useRef(null);
  const sectionRef   = useRef(null);
  const containerRef = useRef(null);
  const [popup, setPopup] = useState(null); // { track, xPct, yPct }

  /* Loop full video */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.loop = true;
  }, []);

  /* Play/pause on viewport enter/leave */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          // Re-seek in case currentTime drifted before play
          if (video.currentTime < 4.0) video.currentTime = 4.0;
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  /* Close on outside click */
  useEffect(() => {
    if (!popup) return;
    const close = () => setPopup(null);
    window.addEventListener('click', close);
    return () => window.removeEventListener('click', close);
  }, [popup]);

  function handleVideoClick(e) {
    e.stopPropagation();
    const rect = containerRef.current.getBoundingClientRect();
    const xPct = ((e.clientX - rect.left)  / rect.width)  * 100;
    const yPct = ((e.clientY - rect.top)   / rect.height) * 100;
    const track = getTrackForClick(xPct, yPct);
    if (!track) { setPopup(null); return; }
    // Toggle off if same track clicked again, otherwise show new track
    setPopup(prev => (prev?.track.id === track.id ? null : { track, xPct, yPct }));
  }

  return (
    <section
      id="tracks"
      ref={sectionRef}
      className="py-16 sm:py-20 px-4 sm:px-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #080015 0%, #000000 50%, #080015 100%)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(88,28,135,0.12) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-purple-400 text-xs tracking-[0.35em] uppercase mb-3 font-mono-bold">Innovation Domains</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-3 font-display-bold mixed-gradient-text">Hackathon Tracks</h2>
          <p className="text-gray-400 font-display-italic text-sm sm:text-base">Choose your sea. Chart your course.</p>
          <div className="section-divider w-48 mx-auto mt-6" />
        </div>

        {/* Video + overlay */}
        <div
          ref={containerRef}
          className="relative w-full rounded-3xl"
          style={{ aspectRatio: '16 / 9', cursor: 'crosshair', overflow: 'visible' }}
          onClick={handleVideoClick}
        >
          <video
            ref={videoRef}
            src="/track_video.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover rounded-3xl pointer-events-none"
          />

          {/* Vignette */}
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(0,0,0,0.4) 100%)' }}
          />

          {/* Animated card at click position */}
          <AnimatePresence>
            {popup && (() => {
              const flipX = popup.xPct > 58;
              const flipY = popup.yPct > 55;
              return (
                <div
                  key={popup.track.id}
                  className="absolute"
                  style={{
                    ...(flipX ? { right: `${100 - popup.xPct}%` } : { left: `${popup.xPct}%` }),
                    ...(flipY ? { bottom: `${100 - popup.yPct}%` } : { top: `${popup.yPct}%` }),
                    transform: `translate(${flipX ? '-8px' : '8px'}, ${flipY ? '-8px' : '8px'})`,
                    zIndex: 50,
                  }}
                >
                  <TrackCard
                    track={popup.track}
                    onClose={() => setPopup(null)}
                  />
                </div>
              );
            })()}
          </AnimatePresence>

          {/* Hint */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-center pointer-events-none">
            <p className="text-purple-300/60 text-xs font-mono-bold tracking-widest uppercase">
              ⚓ click a ship to reveal its track
            </p>
          </div>
        </div>
      </div>

      <SectionBlurEdges />
    </section>
  );
}
