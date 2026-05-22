import SectionBlurEdges from './ui/SectionBlurEdges';
import {
  TextRevealCard,
  TextRevealCardTitle,
  TextRevealCardDescription,
} from './ui/diagram-card';

const roles = [
  {
    role: 'Captain',
    description: 'The leader of the crew. Responsible for strategy, coordination, and guiding the team toward victory.',
    baseText: 'Lead the crew. Chart the course.',
    revealText: '"A ship without a captain is just driftwood in the storm."',
    bgImage: '/captain.jpg',
    bgPosition: 'center center',
    flipImage: false,
    imageRotate: 0,
  },
  {
    role: 'Shipwright',
    description: 'The master builder. Develops systems, features, and technical foundations of the ship.',
    baseText: 'Build the ship. Forge the future.',
    revealText: '"Every great ship was once just a blueprint and a bold engineer."',
    bgImage: '/shipwright.jpg',
    bgPosition: 'center center',
    flipImage: false,
    overlayOpacity: 0.75,
  },
  {
    role: 'Sail Master',
    description: 'The creative navigator. Designs user experiences, visuals, branding, and interface aesthetics.',
    baseText: 'Design the sails. Shape the journey.',
    revealText: '"The sails you design today carry the crew to shores unseen tomorrow."',
    bgImage: '/sailmaster.jpg',
    bgPosition: 'center center',
    flipImage: false,
  },
  {
    role: 'Compass Keeper',
    description: 'The intelligence specialist. Handles AI systems, automation, data models, and futuristic technologies.',
    baseText: 'Read the stars. Navigate the unknown.',
    revealText: '"In a sea of data, the engineer who reads the stars never gets lost."',
    bgImage: '/compasskeeper.jpg',
    bgPosition: 'center center',
    flipImage: false,
  },
  {
    role: 'Voice of the Seas',
    description: 'The storyteller. Responsible for pitching, presenting, communication, and public speaking.',
    baseText: 'Speak the truth. Move the crowd.',
    revealText: '"A pirate who commands words commands more than one who swings a sword."',
    bgImage: '/voiceoftheseasssssssss.jpg',
    bgPosition: 'top center',
    flipImage: false,
  },
  {
    role: 'Guardian of the Multiverse',
    description: 'The legendary mentor. Guides pirate crews with wisdom gathered from distant universes.',
    baseText: 'Guard the wisdom. Guide the voyage.',
    revealText: '"The greatest engineers don\'t just build ships — they build the pirates who sail them."',
    bgImage: '/multiverse.jpg',
    bgPosition: 'center center',
    flipImage: false,
  },
];

export default function CrewRoles() {
  return (
    <section
      id="crew"
      className="py-16 sm:py-28 px-4 sm:px-6 relative overflow-hidden"
      style={{ background: '#000000' }}
    >
      {/* Top purple edge */}
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {roles.map(({ role, description, baseText, revealText, bgImage, bgPosition, flipImage, imageRotate, overlayOpacity }) => (
            <TextRevealCard
              key={role}
              text={baseText}
              revealText={revealText}
              bgImage={bgImage}
              bgPosition={bgPosition}
              flipImage={flipImage}
              imageRotate={imageRotate}
              overlayOpacity={overlayOpacity}
            >
              <TextRevealCardTitle>{role}</TextRevealCardTitle>
              <TextRevealCardDescription>{description}</TextRevealCardDescription>
            </TextRevealCard>
          ))}
        </div>
      </div>

      <SectionBlurEdges />
    </section>
  );
}
