import SectionBlurEdges from './ui/SectionBlurEdges';

/* Deterministic stars */
const STARS = Array.from({ length: 80 }, (_, i) => ({
  top:     ((i * 41 + 7)  % 100),
  left:    ((i * 67 + 11) % 100),
  size:    ((i * 13 + 3)  % 2) + 1,
  opacity: ((i * 19 + 5)  % 6) / 10 + 0.1,
}));

export default function FinalCTA() {
  return (
    <section
      id="register"
      className="relative py-24 sm:py-36 px-4 sm:px-6 text-center overflow-hidden"
      style={{ background: '#000000' }}
    >      {/* Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {STARS.map((s, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{ top: s.top + '%', left: s.left + '%', width: s.size, height: s.size, opacity: s.opacity }}
          />
        ))}
      </div>

      {/* Purple glow orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          width: 'clamp(300px, 70vw, 700px)',
          height: 'clamp(300px, 70vw, 700px)',
          background: 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)'
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-2">
        <p className="text-purple-400 text-xs tracking-[0.35em] uppercase mb-6 font-mono-bold">
          The Final Stage
        </p>

        <h2 className="text-4xl sm:text-5xl md:text-7xl leading-tight mb-4 font-display-bold mixed-gradient-text">
          The Stage Is Set
        </h2>

        <p className="text-gray-200 text-lg sm:text-xl md:text-2xl mb-6 font-display-bold-italic">
          The competition is open. The mentors are ready. The judging panel awaits.
        </p>

        <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-10 max-w-xl mx-auto font-body-bold">
          Will your team rise to the challenge and claim the ultimate prize?
        </p>

        <p className="text-white text-base sm:text-lg mb-8 font-display-bold tracking-wide">
          Start Building Today
        </p>

        {/* Story block */}
        <div
          className="max-w-xl mx-auto mb-10 px-6 py-6 rounded-2xl text-left"
          style={{
            background: 'rgba(139,92,246,0.07)',
            border: '1px solid rgba(139,92,246,0.25)',
            boxShadow: '0 0 30px rgba(139,92,246,0.1)',
          }}
        >
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-display-bold-italic mb-4">
            Registrations are open.<br />
            Expert mentors are standing by.<br />
            The Grand Finale stage is being set.
          </p>
          <p className="text-purple-300 text-base sm:text-lg font-display-bold-italic">
            Will your team make it to the top?
          </p>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 mb-10">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScqy6GeNnTs3BPmAgFw73AAZ3RA6WenwfTFCrWYIKZDK0GGYQ/viewform?usp=publish-editor"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 sm:px-10 py-4 text-white text-sm rounded-full transition-all duration-300 font-body-bold tracking-widest uppercase text-center"
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #9333ea)',
              boxShadow: '0 0 40px rgba(139,92,246,0.5)',
            }}
          >
            Register Your Team
          </a>
          <a
            href="#guardians"
            className="w-full sm:w-auto px-8 sm:px-10 py-4 text-white text-sm rounded-full transition-all duration-300 font-body-bold tracking-widest uppercase text-center"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.2)' }}
          >
            Meet the Mentors
          </a>
          <a
            href="#about"
            className="w-full sm:w-auto px-8 sm:px-10 py-4 text-purple-300 text-sm rounded-full transition-all duration-300 font-body-bold tracking-widest uppercase text-center"
            style={{ border: '1px solid rgba(139,92,246,0.4)' }}
          >
            Explore the Event
          </a>
        </div>

        <p className="text-gray-600 text-xs tracking-wider font-mono-bold">
          Limited spots available · Applications close soon
        </p>
      </div>
      <SectionBlurEdges showBottom={false} />
    </section>
  );
}
