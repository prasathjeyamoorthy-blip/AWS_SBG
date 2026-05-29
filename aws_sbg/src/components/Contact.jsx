import { Mail, Phone } from 'lucide-react';
import SectionBlurEdges from './ui/SectionBlurEdges';

// ── Replace this value once the club mail is ready ──
const CLUB_EMAIL = null; // e.g. 'awssbg@smvec.ac.in'

const PEOPLE = [
  { name: 'Mrs. A. Ilakkia', initials: 'AI', role: 'Faculty Coordinator',    phone: '+91 98941 82905', tel: '+919894182905' },
  { name: 'Manojkumar',      initials: 'MK', role: 'Hackathon Coordinator',  phone: '+91 86674 96714', tel: '+918667496714' },
  { name: 'Janani',          initials: 'JN', role: 'Hackathon Coordinator',  phone: '+91 94865 62329', tel: '+919486562329' },
  { name: 'Devaprasath',     initials: 'DP', role: 'Hackathon Coordinator',  phone: '+91 76958 42138', tel: '+917695842138' },
];

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

        {/* ── Uniform 2×2 grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {PEOPLE.map((p) => (
            <div
              key={p.name}
              className="rounded-2xl p-5 sm:p-6 flex items-center gap-4 transition-all duration-300"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(139,92,246,0.2)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(139,92,246,0.08)';
                e.currentTarget.style.borderColor = 'rgba(139,92,246,0.4)';
                e.currentTarget.style.boxShadow = '0 0 24px rgba(139,92,246,0.12)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                e.currentTarget.style.borderColor = 'rgba(139,92,246,0.2)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Initials avatar */}
              <div
                className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-sm font-display-bold"
                style={{
                  background: 'rgba(139,92,246,0.15)',
                  border: '1px solid rgba(139,92,246,0.3)',
                  color: '#c4b5fd',
                  letterSpacing: '0.05em',
                }}
              >
                {p.initials}
              </div>

              {/* Info */}
              <div className="min-w-0 flex-1">
                <p className="text-white font-display-bold text-base leading-tight truncate">
                  {p.name}
                </p>
                <p className="text-purple-400/70 text-xs font-mono-bold mt-0.5 tracking-wider">
                  {p.role}
                </p>
                <a
                  href={`tel:${p.tel}`}
                  className="inline-flex items-center gap-1.5 mt-1.5 text-purple-300 hover:text-white transition-colors text-xs font-mono-bold"
                  onClick={e => e.stopPropagation()}
                >
                  <Phone size={10} />
                  {p.phone}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* ── Email ── */}
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
              Email
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
