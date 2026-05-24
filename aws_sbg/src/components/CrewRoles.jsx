import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionBlurEdges from './ui/SectionBlurEdges';

const roles = [
  {
    id: 1,
    role: 'Shipwright',
    fullDescription: 'The master builder. Develops systems, features, and technical foundations of the ship.',
    quote: '"Every great ship was once just a blueprint and a bold engineer."',
  },
  {
    id: 2,
    role: 'Sail Master',
    fullDescription: 'The creative navigator. Designs user experiences, visuals, branding, and interface aesthetics.',
    quote: '"The sails you design today carry the crew to shores unseen tomorrow."',
  },
  {
    id: 3,
    role: 'Captain',
    fullDescription: 'The leader of the crew. Responsible for strategy, coordination, and guiding the team toward victory.',
    quote: '"A ship without a captain is just driftwood in the storm."',
  },
  {
    id: 4,
    role: 'Compass Keeper',
    fullDescription: 'The intelligence specialist. Handles AI systems, automation, data models, and futuristic technologies.',
    quote: '"In a sea of data, the engineer who reads the stars never gets lost."',
  },
];

/* ── Same card style as TrackCard in Tracks.jsx ── */
function RoleCard({ role, onClose }) {
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
        width: 'min(300px, 80vw)',
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
      {/* Glass reflection */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 50%)', zIndex: 35 }} />
      {/* Background */}
      <div className="absolute inset-0 z-0" style={{ background: 'linear-gradient(180deg, #08000f 0%, #0d0020 100%)' }} />
      {/* Bottom glow */}
      <div className="absolute bottom-0 left-0 right-0 h-2/3 z-20 pointer-events-none" style={{ background: 'radial-gradient(ellipse at bottom center, rgba(139,92,246,0.5) -10%, transparent 65%)', filter: 'blur(30px)' }} />
      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] z-25 pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6) 50%, transparent)', boxShadow: '0 0 14px 3px rgba(139,92,246,0.7)' }} />
      {/* Content */}
      <div className="relative flex flex-col p-6 z-40">
        <div className="w-10 h-10 rounded-full flex items-center justify-center mb-5" style={{ background: 'linear-gradient(225deg, rgba(139,92,246,0.4) 0%, rgba(88,28,135,0.6) 100%)', border: '1px solid rgba(168,85,247,0.5)', boxShadow: '0 4px 10px -2px rgba(0,0,0,0.3)' }}>
          <span className="text-white font-mono-bold text-sm">{role.id}</span>
        </div>
        <h3 className="text-xl text-white mb-1 font-display-bold leading-tight">{role.role}</h3>
        <p className="text-xs text-purple-300/80 font-body-bold mb-3 leading-relaxed">{role.fullDescription}</p>
        <p className="text-xs text-white/40 font-display-italic pl-3 mb-5" style={{ borderLeft: '2px solid rgba(139,92,246,0.4)' }}>{role.quote}</p>
        <button
          className="inline-flex items-center gap-1.5 text-purple-300 text-xs font-mono-bold tracking-widest uppercase self-end opacity-70 hover:opacity-100 transition-opacity"
          onClick={(e) => { e.stopPropagation(); onClose(); }}
        >
          close ✕
        </button>
      </div>
    </motion.div>
  );
}

export default function CrewRoles() {
  const [active, setActive] = useState(null);

  const handleClick = useCallback((e, i) => {
    e.stopPropagation();
    setActive(prev => prev === i ? null : i);
  }, []);

  return (
    <section
      id="crew"
      className="py-16 sm:py-28 px-4 sm:px-6 relative overflow-hidden"
      style={{ background: '#000000' }}
      onClick={() => setActive(null)}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 40% at 50% 0%, rgba(88,28,135,0.2) 0%, transparent 60%)' }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-purple-400 text-xs tracking-[0.35em] uppercase mb-3 font-mono-bold">
            Crew Roles
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-3 font-display-bold mixed-gradient-text">
            Assemble Your Pirate Crew
          </h2>
          <p className="text-gray-400 font-display-italic text-sm sm:text-base">
            Every legendary voyage needs the right crew.
          </p>
          <div className="section-divider w-48 mx-auto mt-6" />
        </div>

        {/* Characters image with clickable regions */}
        <div
          className="relative w-full"
          style={{ background: 'transparent' }}
        >
          <img
            src="/pirate_characters.png"
            alt="Pirate Crew Characters"
            className="w-full h-auto block"
            style={{ marginTop: '-160px' }}
            draggable={false}
          />

          {/* Full-height column hit zones — one per character.
              Image is a single horizontal scene with 4 visible characters.
              Roles 1-4 map to the 4 characters left→right.
              Roles 5-6 are optional extras mapped to outer edges. */}
          {roles.map((role, i) => {
            const isActive = active === i;
            // Exact character column boundaries from pixel analysis
            // char1: 0–13%, char2: 14–29%, char3: 30–66%, char4: 67–100%
            const cols = [
              { left: 0,  width: 13 },  // Shipwright
              { left: 13, width: 17 },  // Sail Master
              { left: 30, width: 37 },  // Captain
              { left: 67, width: 33 },  // Compass Keeper
            ];
            const col = cols[i];
            const flipX = col.left > 50;

            return (
              <div
                key={i}
                className="absolute inset-y-0"
                style={{
                  left: `${col.left}%`,
                  width: `${col.width}%`,
                  zIndex: isActive ? 40 : 10,
                  cursor: 'pointer',
                }}
                onClick={(e) => handleClick(e, i)}
                role="button"
                aria-label={`View ${role.role} details`}
              >
                <AnimatePresence>
                  {isActive && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '20%',
                        ...(flipX ? { right: '100%', marginRight: '8px' } : { left: '100%', marginLeft: '8px' }),
                        zIndex: 50,
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <RoleCard role={role} onClose={() => setActive(null)} />
                    </div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      <SectionBlurEdges />
    </section>
  );
}
