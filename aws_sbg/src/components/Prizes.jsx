import MagicBento from './ui/MagicBento';
import SectionBlurEdges from './ui/SectionBlurEdges';

const specialAwards = [
  'Best Innovation',
  'Best AI Solution',
  'Best Design Experience',
  'Best Social Impact',
  'Community Favorite',
  'Rising Crew Award',
];

const additionalRewards = [
  'Internship Opportunities',
  'Startup Mentorship',
  'Networking Access',
  'Swag & Merchandise',
  'Recognition Certificates',
  'Showcase Opportunities',
];

const prizesCardData = [
  // Card 1 — Grand Champion (full-width banner)
  {
    color: '#0d0020',
    style: {
      background: 'linear-gradient(135deg, rgba(139,92,246,0.25), rgba(88,28,135,0.4))',
      border: '1px solid rgba(139,92,246,0.5)',
      boxShadow: '0 0 60px rgba(139,92,246,0.3), inset 0 0 40px rgba(139,92,246,0.06)',
      textAlign: 'center',
      alignItems: 'center',
    },
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75em', width: '100%' }}>
        <div className="bento-star-icon">★</div>
        <div>
          <h3 className="magic-bento-card__title" style={{ fontSize: '1.4em', textAlign: 'center' }}>
            Grand Champion Prize
          </h3>
          <p className="magic-bento-card__description" style={{ textAlign: 'center', maxWidth: '520px', opacity: 0.9 }}>
            The crew that conquers the Final Treasure War earns the title of{' '}
            <strong style={{ color: '#fff' }}>Pirate Legends</strong> — glory, treasure,
            legacy, recognition, and opportunities beyond the horizon.
          </p>
        </div>
        <div className="bento-tags" style={{ justifyContent: 'center' }}>
          {['Glory', 'Treasure', 'Legacy', 'Recognition', 'Opportunities'].map(item => (
            <span key={item} className="bento-tag">{item}</span>
          ))}
        </div>
      </div>
    ),
  },
  // Card 2 — Special Awards
  {
    color: '#120F17',
    style: { border: '1px solid rgba(255,255,255,0.1)' },
    content: (
      <>
        <div className="magic-bento-card__header">
          <span className="magic-bento-card__label">Awards</span>
        </div>
        <div className="magic-bento-card__content">
          <h2 className="magic-bento-card__title">Special Awards</h2>
          <ul className="bento-list">
            {specialAwards.map(award => <li key={award}>{award}</li>)}
          </ul>
        </div>
      </>
    ),
  },
  // Card 3 — Additional Rewards
  {
    color: '#120F17',
    style: { border: '1px solid rgba(139,92,246,0.25)', background: 'rgba(139,92,246,0.08)' },
    content: (
      <>
        <div className="magic-bento-card__header">
          <span className="magic-bento-card__label">Rewards</span>
        </div>
        <div className="magic-bento-card__content">
          <h2 className="magic-bento-card__title">Additional Rewards</h2>
          <ul className="bento-list">
            {additionalRewards.map(reward => <li key={reward}>{reward}</li>)}
          </ul>
        </div>
      </>
    ),
  },
];

export default function Prizes() {
  return (
    <section
      id="prizes"
      className="py-16 sm:py-28 px-4 sm:px-6 relative overflow-hidden"
      style={{ background: '#000000' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(88,28,135,0.15) 0%, transparent 70%)' }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <p className="text-purple-400 text-xs tracking-[0.35em] uppercase mb-3 font-mono-bold">
            The Ultimate Treasure Chest
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-3 font-display-bold mixed-gradient-text">
            Prizes &amp; Rewards
          </h2>
          <div className="section-divider w-48 mx-auto mt-6" />
        </div>

        <MagicBento
          cardData={prizesCardData}
          textAutoHide={false}
          enableStars={true}
          enableSpotlight={true}
          enableBorderGlow={true}
          enableTilt={true}
          enableMagnetism={true}
          clickEffect={true}
          spotlightRadius={300}
          particleCount={12}
          glowColor="132, 0, 255"
        />
      </div>

      <SectionBlurEdges />
    </section>
  );
}
