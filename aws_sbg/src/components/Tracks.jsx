import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionBlurEdges from './ui/SectionBlurEdges';

const tracks = [
  { id: 1, title: 'AI & Automation',   description: 'Intelligent systems and smart solutions.' },
  { id: 2, title: 'Web & Cloud',        description: 'Scalable digital platforms and experiences.' },
  { id: 3, title: 'Blockchain & Web3',  description: 'Secure and decentralized innovation.' },
  { id: 4, title: 'Cybersecurity',      description: 'Protect the seas from digital threats.' },
  { id: 5, title: 'Future Tech',        description: 'Futuristic and next-generation ideas.' },
];

// ─── Adjust these x/y values (% of video width/height) to match ship centers ───
const SHIP_HOTSPOTS = [
  { track: tracks[0], x: 25.0, y: 18.5 }, // AI & Automation   — top-left ship
  { track: tracks[1], x: 15.4, y: 41.5 }, // Web & Cloud       — left-middle ship
  { track: tracks[2], x: 25.4, y: 70.6 }, // Blockchain & Web3 — bottom-left ship
  { track: tracks[3], x: 51.5, y: 82.4 }, // Cybersecurity     — bottom-center ship
  { track: tracks[4], x: 50.3, y:  6.1 }, // Future Tech       — top-center ship
];

/* ── Track card ── */
function TrackCard({ track, onClose }) {
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const rx = -((e.clientY - rect.top  - rect.height / 2) / (rect.height / 2)) * 8;
    const ry =  ((e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2)) * 8;
    el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (cardRef.current) cardRef.current.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className="relative rounded-[24px] overflow-hidden"
      style={{
        width: 'min(260px, 72vw)',
        backgroundColor: '#0e131f',
        boxShadow: '0 -10px 80px 8px rgba(139,92,246,0.3), 0 0 10px 0 rgba(0,0,0,0.6)',
        transition: 'transform 0.15s ease',
        willChange: 'transform',
      }}
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.85, y: 20 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 50%)', zIndex: 35 }} />
      <div className="absolute inset-0 z-0" style={{ background: 'linear-gradient(180deg, #08000f 0%, #0d0020 100%)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-2/3 z-20 pointer-events-none" style={{ background: 'radial-gradient(ellipse at bottom center, rgba(139,92,246,0.5) -10%, transparent 65%)', filter: 'blur(30px)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-[2px] z-25 pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6) 50%, transparent)', boxShadow: '0 0 14px 3px rgba(139,92,246,0.7)' }} />
      <div className="relative flex flex-col p-6 z-40">
        <div className="w-10 h-10 rounded-full flex items-center justify-center mb-5" style={{ background: 'linear-gradient(225deg, rgba(139,92,246,0.4) 0%, rgba(88,28,135,0.6) 100%)', border: '1px solid rgba(168,85,247,0.5)', boxShadow: '0 4px 10px -2px rgba(0,0,0,0.3)' }}>
          <span className="text-white font-mono-bold text-sm">{track.id}</span>
        </div>
        <h3 className="text-xl text-white mb-3 font-display-bold leading-tight">{track.title}</h3>
        <p className="text-sm text-purple-200/75 leading-relaxed font-body-bold mb-5">{track.description}</p>
        <button className="inline-flex items-center gap-1.5 text-purple-300 text-xs font-mono-bold tracking-widest uppercase self-end opacity-70 hover:opacity-100 transition-opacity" onClick={(e) => { e.stopPropagation(); onClose(); }}>
          close ✕
        </button>
      </div>
    </motion.div>
  );
}

/* ── Calibration overlay — press Shift+D to toggle ── */
function CalibrationOverlay({ containerRef }) {
  const [cursor, setCursor] = useState(null);
  const [pins, setPins]     = useState([]);

  useEffect(() => {
    const onMove = (e) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = ((e.clientX - rect.left) / rect.width  * 100).toFixed(1);
      const y = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1);
      setCursor({ x, y });
    };
    const onClick = (e) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = ((e.clientX - rect.left) / rect.width  * 100).toFixed(1);
      const y = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1);
      setPins(p => [...p.slice(-9), { x, y, id: Date.now() }]);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('click', onClick);
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('click', onClick); };
  }, [containerRef]);

  return (
    <div className="absolute inset-0 z-[100] pointer-events-none" style={{ cursor: 'crosshair' }}>
      {/* Grid lines every 10% */}
      {Array.from({ length: 9 }, (_, i) => (
        <div key={`v${i}`} className="absolute top-0 bottom-0 w-px" style={{ left: `${(i + 1) * 10}%`, background: 'rgba(255,255,255,0.15)' }} />
      ))}
      {Array.from({ length: 9 }, (_, i) => (
        <div key={`h${i}`} className="absolute left-0 right-0 h-px" style={{ top: `${(i + 1) * 10}%`, background: 'rgba(255,255,255,0.15)' }} />
      ))}
      {/* Axis labels */}
      {[10,20,30,40,50,60,70,80,90].map(v => (
        <span key={`xl${v}`} className="absolute text-[9px] text-white/50 font-mono" style={{ left: `${v}%`, top: 2, transform: 'translateX(-50%)' }}>{v}</span>
      ))}
      {[10,20,30,40,50,60,70,80,90].map(v => (
        <span key={`yl${v}`} className="absolute text-[9px] text-white/50 font-mono" style={{ top: `${v}%`, left: 2, transform: 'translateY(-50%)' }}>{v}</span>
      ))}
      {/* Clicked pins */}
      {pins.map((p, i) => (
        <div key={p.id} className="absolute" style={{ left: `${p.x}%`, top: `${p.y}%`, transform: 'translate(-50%,-50%)' }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b', border: '2px solid #fff', boxShadow: '0 0 6px #f59e0b' }} />
          <span className="absolute left-3 top-0 text-[10px] text-yellow-300 font-mono whitespace-nowrap bg-black/70 px-1 rounded">{i + 1}: {p.x},{p.y}</span>
        </div>
      ))}
      {/* Live cursor coords */}
      {cursor && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/80 text-yellow-300 text-xs font-mono px-3 py-1 rounded-full border border-yellow-500/40">
          x: {cursor.x}% &nbsp; y: {cursor.y}%
        </div>
      )}
      {/* Instructions */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-black/80 text-yellow-300 text-[10px] font-mono px-3 py-1 rounded-full border border-yellow-500/40 whitespace-nowrap">
        CALIBRATION MODE — click each ship to pin its coords · Shift+D to exit
      </div>
    </div>
  );
}

export default function Tracks() {
  const videoRef     = useRef(null);
  const sectionRef   = useRef(null);
  const containerRef = useRef(null);
  const [popup, setPopup]       = useState(null);
  const [calibrate, setCalibrate] = useState(false);

  // Toggle calibration with Shift+D
  useEffect(() => {
    const onKey = (e) => { if (e.shiftKey && e.key === 'D') setCalibrate(c => !c); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (video.currentTime < 4.0) video.currentTime = 4.0;
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!popup) return;
    const close = () => setPopup(null);
    window.addEventListener('click', close);
    return () => window.removeEventListener('click', close);
  }, [popup]);

  const handleHotspotClick = useCallback((e, hotspot) => {
    e.stopPropagation();
    setPopup(prev => prev?.track.id === hotspot.track.id ? null : { track: hotspot.track, x: hotspot.x, y: hotspot.y });
  }, []);

  return (
    <section
      id="tracks"
      ref={sectionRef}
      className="py-16 sm:py-20 px-4 sm:px-6 relative"
      style={{ background: 'linear-gradient(135deg, #080015 0%, #000000 50%, #080015 100%)' }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(88,28,135,0.12) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="text-center mb-8">
          <p className="text-purple-400 text-xs tracking-[0.35em] uppercase mb-3 font-mono-bold">Innovation Domains</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-3 font-display-bold mixed-gradient-text">Hackathon Tracks</h2>
          <p className="text-gray-400 font-display-italic text-sm sm:text-base">Choose your sea. Chart your course.</p>
          <div className="section-divider w-48 mx-auto mt-6" />
        </div>

        <div className="relative w-full rounded-2xl sm:rounded-3xl">
          <div
            ref={containerRef}
            className="tracks-video-container relative w-full rounded-2xl sm:rounded-3xl"
            style={{ overflow: 'visible', cursor: calibrate ? 'crosshair' : 'default' }}
            onClick={() => !calibrate && setPopup(null)}
          >
          {/* Video clipped to rounded corners via its own wrapper */}
          <div className="absolute inset-0 rounded-2xl sm:rounded-3xl overflow-hidden pointer-events-none">
            <video
              ref={videoRef}
              src="/track_video.mp4"
              autoPlay loop muted playsInline preload="auto"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(0,0,0,0.4) 100%)' }} />
          </div>

          {/* Calibration overlay */}
          {calibrate && <CalibrationOverlay containerRef={containerRef} />}

          {/* Ship hotspots — hidden during calibration */}
          {!calibrate && SHIP_HOTSPOTS.map((hotspot) => {
            const isActive = popup?.track.id === hotspot.track.id;
            return (
              <button
                key={hotspot.track.id}
                onClick={(e) => handleHotspotClick(e, hotspot)}
                aria-label={`Reveal ${hotspot.track.title} track`}
                className="ship-hotspot-btn"
                style={{
                  position: 'absolute',
                  left: `${hotspot.x}%`,
                  top: `${hotspot.y}%`,
                  transform: 'translate(-50%, -50%)',
                  zIndex: 20,
                  background: 'none',
                  border: 'none',
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* Pulse ring — centered in the hit area */}
                {!isActive && <span className="ship-pulse-ring" />}
                {/* Dot */}
                <span style={{
                  display: 'block', width: '14px', height: '14px', borderRadius: '50%',
                  background: isActive ? '#d8b4fe' : 'rgba(216,180,254,0.8)',
                  border: `2px solid ${isActive ? '#a855f7' : 'rgba(168,85,247,0.6)'}`,
                  boxShadow: isActive ? '0 0 12px 4px rgba(168,85,247,0.9)' : '0 0 8px 2px rgba(168,85,247,0.5)',
                  transition: 'background 0.2s, box-shadow 0.2s',
                  position: 'relative', zIndex: 1, flexShrink: 0,
                }} />
              </button>
            );
          })}

          {/* Popup card — rendered inside the video container, overlaid on the map */}
          <AnimatePresence>
            {popup && (() => {
              const flipX = popup.x > 60;
              const flipY = popup.y > 55;
              // On mobile clamp to keep card inside the container
              const leftStyle  = flipX ? 'auto' : `clamp(4px, ${popup.x}%, calc(100% - 260px))`;
              const rightStyle = flipX ? `clamp(4px, ${100 - popup.x}%, calc(100% - 260px))` : 'auto';
              const topStyle   = flipY ? 'auto' : `clamp(4px, calc(${popup.y}% + 0.75rem), calc(100% - 180px))`;
              const bottomStyle = flipY ? `clamp(4px, calc(${100 - popup.y}% + 0.75rem), calc(100% - 180px))` : 'auto';
              return (
                <div
                  key={popup.track.id}
                  className="pointer-events-auto absolute"
                  style={{
                    left: leftStyle,
                    right: rightStyle,
                    top: topStyle,
                    bottom: bottomStyle,
                    zIndex: 50,
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <TrackCard track={popup.track} onClose={() => setPopup(null)} />
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
          </div>{/* end containerRef */}
        </div>{/* end outer wrapper */}
      </div>

      <SectionBlurEdges />
    </section>
  );
}
