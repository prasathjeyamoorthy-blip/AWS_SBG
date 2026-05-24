import SectionBlurEdges from './ui/SectionBlurEdges';
import GlareHover from './ui/GlareHover';

const universes = [
  { universe: 'Avengers Universe',     faction: 'The Iron Fleet',           border: 'rgba(185,28,28,0.4)'   },
  { universe: 'Harry Potter Universe', faction: 'The Order of the Compass', border: 'rgba(161,98,7,0.4)'    },
  { universe: 'Star Wars Universe',    faction: 'The Galactic Navigators',  border: 'rgba(29,78,216,0.4)'   },
  { universe: 'Sherlock Universe',     faction: 'The Master Strategists',   border: 'rgba(180,83,9,0.4)'    },
  { universe: 'Anime Universe',        faction: 'The Shonen Captains',      border: 'rgba(194,65,12,0.4)'   },
  { universe: 'Cyberpunk Universe',    faction: 'The Neon Raiders',         border: 'rgba(14,116,144,0.4)'  },
];

export default function Guardians() {
  return (
    <section
      id="guardians"
      className="py-16 sm:py-28 px-4 sm:px-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0d0020 0%, #1a0035 50%, #0d0020 100%)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
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
            Legendary mentors from across the multiverse will answer the call.
            Their identities will be revealed soon.
          </p>
          <div className="section-divider w-48 mx-auto mt-6" />
        </div>

        {/* 6 empty glare cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {universes.map(({ universe }, i) => (
            <GlareHover
              key={universe}
              width="100%"
              height="220px"
              background="linear-gradient(135deg, rgba(88,28,135,0.15) 0%, rgba(12,0,24,0.92) 100%)"
              borderRadius="16px"
              borderColor="transparent"
              glareColor="#a855f7"
              glareOpacity={0.22}
              glareAngle={-35}
              glareSize={300}
              transitionDuration={1800}
              autoPlay={true}
              autoPlayInterval={5000}
            >
              <span
                className="font-display-bold select-none"
                style={{ fontSize: '5rem', color: 'rgba(139,92,246,0.45)', lineHeight: 1 }}
              >
                ?
              </span>
            </GlareHover>
          ))}
        </div>

        {/* Quote */}
        <div className="text-center mt-10 sm:mt-14 px-4">
          <p className="text-purple-300 text-base sm:text-lg md:text-xl font-display-bold-italic">
            "A wise crew listens before the storm arrives."
          </p>
        </div>
      </div>

      <SectionBlurEdges />
    </section>
  );
}
