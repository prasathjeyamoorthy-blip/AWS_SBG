import SectionBlurEdges from './ui/SectionBlurEdges';

const universes = [
  {
    icon: '🦸',
    universe: 'Avengers Universe',
    faction: 'The Iron Fleet',
    description: 'Mentors inspired by legendary inventors, strategists, and superheroes.',
    border: 'border-red-700/40',
    bgImage: '/avengers.jpg',
  },
  {
    icon: '🧙',
    universe: 'Harry Potter Universe',
    faction: 'The Order of the Compass',
    description: 'Mentors inspired by magical schools, ancient wisdom, and legendary wizards.',
    border: 'border-yellow-700/40',
    bgImage: '/harrypotter.jpg',
  },
  {
    icon: '🤖',
    universe: 'Star Wars Universe',
    faction: 'The Galactic Navigators',
    description: 'Mentors inspired by Jedi masters, galactic rebels, and cosmic tacticians.',
    border: 'border-blue-700/40',
    bgImage: '/starwars.jpg',
  },
  {
    icon: '🔍',
    universe: 'Sherlock Universe',
    faction: 'The Master Strategists',
    description: 'Mentors inspired by legendary detectives and analytical masterminds.',
    border: 'border-amber-700/40',
    bgImage: '/sherlock.jpg',
  },
  {
    icon: '⚡',
    universe: 'Anime Universe',
    faction: 'The Shonen Captains',
    description: 'Mentors inspired by unstoppable anime heroes and fearless captains.',
    border: 'border-orange-700/40',
    bgImage: '/anime.jpg',
  },
  {
    icon: '🌐',
    universe: 'Cyberpunk Universe',
    faction: 'The Neon Raiders',
    description: 'Mentors inspired by futuristic hackers, rogue AI systems, and neon megacities.',
    border: 'border-cyan-700/40',
    bgImage: '/cyberpunk.jpg',
  },
];

export default function Guardians() {
  return (
    <section id="guardians" className="py-16 sm:py-28 px-4 sm:px-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0d0020 0%, #1a0035 50%, #0d0020 100%)' }}
    >
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(139,92,246,0.1) 0%, transparent 70%)' }}
      />
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <p className="text-purple-400 text-xs tracking-[0.35em] uppercase mb-3 font-mono-bold">
            Mentor Reveal
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-3 font-display-bold white-gradient-text">
            Meet the Guardians of the Multiverse
          </h2>
          <p className="text-gray-300 font-display-italic text-sm sm:text-base max-w-2xl mx-auto px-2">
            The voyage beyond the Pirate Seas is impossible without guidance. Across magical kingdoms,
            futuristic cities, cosmic empires, and hidden dimensions, legendary mentors answer the call.
          </p>
          <div className="section-divider w-48 mx-auto mt-6" />
        </div>

        {/* Guardian cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-7">
          {universes.map(({ universe, border, bgImage }) => (
            <div
              key={universe}
              className={`rounded-2xl border ${border} overflow-hidden`}
            >
              <img
                src={bgImage}
                alt={universe}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
          ))}
        </div>

        {/* Quote */}
        <div className="text-center mt-14">
          <p className="text-purple-300 text-xl font-display-bold-italic">
            "A wise crew listens before the storm arrives."
          </p>
        </div>
      </div>
      <SectionBlurEdges />
    </section>
  );
}
