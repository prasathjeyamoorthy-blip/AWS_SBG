import { Mail, GraduationCap, Zap } from 'lucide-react';
import SectionBlurEdges from './ui/SectionBlurEdges';

// ── Replace this value once the club mail is ready ──
const CLUB_EMAIL = null; // e.g. 'awssbg@smvec.ac.in'

const COORDINATORS = [
  { name: 'Manojkumar',  initials: 'MK' },
  { name: 'Janani',      initials: 'JN' },
  { name: 'Devaprasath', initials: 'DP' },
];

/* Tiny deterministic sparkle dots for the faculty card */
const SPARKS = Array.from({ length: 18 }, (_, i) => ({
  top:     ((i * 53 + 7)  % 90) + 5,
  left:    ((i * 79 + 11) % 90) + 5,
  size:    ((i * 13 + 3)  % 2) + 1,
  opacity: ((i * 17 + 5)  % 5) / 10 + 0.08,
}));

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-16 sm:py-28 px-4 sm:px-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #000000 0%, #0a0018 50%, #000000 100%)' }}
    >
      <div className="max-w-4xl mx-auto">

        {/* ── Header ── */}
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-purple-400 text-xs tracking-[0.35em] uppercase mb-3 font-mono-bold">
            Get In Touch
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-3 font-display-bold white-gradient-text">
            Contact Us
          </h2>
          <p className="text-gray-400 font-display-italic text-sm sm:text-base">
            Have questions? Reach out to our coordinators.
          </p>
          <div className="section-divider w-48 mx-auto mt-6" />
        </div>

        {/* ── Faculty Coordinator — full-width spotlight card ── */}
        <div
          className="relative rounded-3xl overflow-hidden mb-6 p-8 sm:p-10"
          style={{
            background: 'linear-gradient(135deg, rgba(109,40,217,0.18) 0%, rgba(139,92,246,0.08) 60%, rgba(0,0,0,0) 100%)',
            border: '1px solid rgba(139,92,246,0.35)',
            boxShadow: '0 0 60px rgba(139,92,246,0.12), inset 0 1px 0 rgba(255,255,255,0.06)',
          }}
        >
          {/* background sparkles */}
          <div className="absolute inset-0 pointer-events-none">
            {SPARKS.map((s, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-purple-400"
                style={{ top: s.top + '%', left: s.left + '%', width: s.size, height: s.size, opacity: s.opacity }}
              />
            ))}
          </div>

          {/* purple glow orb */}
          <div
            className="absolute -top-16 -right-16 w-64 h-64 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)' }}
          />

          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Avatar */}
            <div
              className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, rgba(139,92,246,0.3), rgba(109,40,217,0.5))',
                border: '1px solid rgba(139,92,246,0.5)',
                boxShadow: '0 0 24px rgba(139,92,246,0.3)',
              }}
            >
              <GraduationCap size={28} className="text-purple-200" />
            </div>

            <div className="flex-1">
              <p className="text-purple-400 text-xs tracking-[0.3em] uppercase font-mono-bold mb-1">
                Faculty Coordinator
              </p>
              <p className="text-white text-2xl sm:text-3xl font-display-bold leading-tight">
                Mrs. A. Ilakkia
              </p>
              <p className="text-purple-300/60 text-xs font-mono-bold mt-1 tracking-widest uppercase">
                Sri Manakula Vinayagar Engineering College
              </p>
            </div>

            {/* decorative badge */}
            <div
              className="hidden sm:flex flex-shrink-0 items-center gap-2 px-4 py-2 rounded-full"
              style={{
                background: 'rgba(139,92,246,0.12)',
                border: '1px solid rgba(139,92,246,0.3)',
              }}
            >
              <Zap size={12} className="text-purple-400" />
              <span className="text-purple-300 text-xs font-mono-bold tracking-widest uppercase">Faculty</span>
            </div>
          </div>
        </div>

        {/* ── Hackathon Coordinators — individual avatar cards ── */}
        <div className="mb-6">
          <p className="text-white/30 text-xs tracking-[0.3em] uppercase font-mono-bold mb-4 pl-1">
            Hackathon Coordinators
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {COORDINATORS.map((c, i) => (
              <div
                key={c.name}
                className="group relative rounded-2xl p-5 flex items-center gap-4 transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(139,92,246,0.08)';
                  e.currentTarget.style.borderColor = 'rgba(139,92,246,0.3)';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(139,92,246,0.1)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Initials avatar */}
                <div
                  className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-sm font-display-bold"
                  style={{
                    background: `rgba(139,92,246,${0.12 + i * 0.04})`,
                    border: '1px solid rgba(139,92,246,0.25)',
                    color: '#c4b5fd',
                    letterSpacing: '0.05em',
                  }}
                >
                  {c.initials}
                </div>

                <div className="min-w-0">
                  <p className="text-white font-display-bold text-base leading-tight truncate">
                    {c.name}
                  </p>
                  <p className="text-white/30 text-xs font-mono-bold mt-0.5 tracking-wider">
                    Coordinator
                  </p>
                </div>

                {/* subtle index number — removed */}
              </div>
            ))}
          </div>
        </div>

        {/* ── Club Email ── */}
        <div
          className="rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4"
          style={{
            background: 'rgba(139,92,246,0.05)',
            border: '1px solid rgba(139,92,246,0.18)',
          }}
        >
          <div
            className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
            style={{
              background: 'rgba(139,92,246,0.15)',
              border: '1px solid rgba(139,92,246,0.3)',
            }}
          >
            <Mail size={16} className="text-purple-400" />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-white/40 text-xs tracking-[0.25em] uppercase font-mono-bold mb-1">
              Club Email
            </p>
            {CLUB_EMAIL ? (
              <a
                href={`mailto:${CLUB_EMAIL}`}
                className="text-white text-base sm:text-lg font-display-bold hover:text-purple-300 transition-colors break-all"
              >
                {CLUB_EMAIL}
              </a>
            ) : (
              <p className="text-white/25 text-sm font-mono-bold italic tracking-wide">
                Coming soon — check back later
              </p>
            )}
          </div>
        </div>

      </div>
      <SectionBlurEdges />
    </section>
  );
}
