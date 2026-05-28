import { motion, AnimatePresence } from 'framer-motion';
import SectionBlurEdges from './ui/SectionBlurEdges';

const phases = [
  {
    dates: 'June 1 – June 10',
    label: 'Registration Phase',
    title: 'The Call of the Sea',
    description: 'The Black Flag has been raised. Young pirates from across the world gather at the harbor, ready to form their crews and begin the hunt for legendary treasure.',
    activities: ['Team Formation', 'Registration & Crew Onboarding', 'Theme Exploration', 'Community Networking'],
    quote: '"Every captain begins with a crew — but only the fearless dare to sail."',
    completed: true,
    // pin position on the map (% of image width/height)
    pin: { x: 12, y: 20 },
  },
  {
    dates: 'June 11 – June 18',
    label: 'Ideation Phase',
    title: 'Charting the Treasure Map',
    description: 'The pirate crews study ancient maps, decode mysterious riddles, and shape bold ideas capable of conquering unknown seas.',
    activities: ['Problem Solving Sessions', 'Idea Validation', 'Product Brainstorming', 'Mentor Discussions', 'Initial Pitch Preparation'],
    quote: '"A weak map leads to lost waters. A strong idea leads to treasure."',
    completed: true,
    pin: { x: 28, y: 38 },
  },
  {
    dates: 'June 21',
    label: 'Ideation Results',
    title: "The Captain's Selection",
    description: 'The Pirate Council reviews every treasure map submitted by the crews. Only the strongest ideas earn permission to continue deeper into the voyage.',
    activities: ['Idea Evaluation', 'Team Shortlisting', 'Qualification for Development Rounds'],
    quote: '"Not every ship survives the harbor."',
    completed: true,
    pin: { x: 42, y: 25 },
  },
  {
    dates: 'June 22 – June 30',
    label: 'Phase 1 Development',
    title: 'Forging the Black Pearl',
    description: 'The selected pirate crews begin constructing their mighty vessels. Code becomes cannons. Design becomes sails. Innovation becomes power.',
    activities: ['MVP Development', 'UI/UX Design', 'AI Integration', 'Backend Engineering', 'Product Testing'],
    quote: '"A true pirate does not fear the storm."',
    completed: false,
    pin: { x: 55, y: 45 },
  },
  {
    dates: 'July 4',
    label: 'Phase 1 Results',
    title: 'The Stormbreaker Trials',
    description: 'The ocean grows violent. The Pirate Council announces the crews worthy of entering the forbidden Multiverse Waters. Only the relentless survive.',
    activities: ['Midway Evaluations', 'Prototype Reviews', 'Performance Judging', 'Team Advancements'],
    quote: '"The ocean respects only the relentless."',
    completed: false,
    pin: { x: 65, y: 30 },
  },
  {
    dates: 'July 5 – July 14',
    label: 'Phase 2 + Mentor Reveal',
    title: 'The Multiverse Alliance',
    description: 'Mysterious portals open across the sea. Legendary mentors from distant universes arrive to guide pirate crews toward greatness.',
    activities: ['Mentor Assignments', 'Guardian Sessions', 'Advanced Development', 'Product Refinement'],
    quote: '"Even pirates need legends beside them."',
    completed: false,
    pin: { x: 72, y: 55 },
  },
  {
    dates: 'July 19',
    label: 'Finalist Announcement',
    title: 'The Council of the Ten Seas',
    description: 'Only 10 legendary crews remain. Their names echo across every sea as they earn a place among the greatest pirate captains.',
    activities: ['Finalist Announcement', 'Hall of Legends Reveal', 'Community Recognition'],
    quote: '"Many sailed. Few conquered."',
    completed: false,
    pin: { x: 82, y: 38 },
  },
  {
    dates: 'July 25',
    label: 'Grand Finale',
    title: 'The Final Treasure War',
    description: 'The Final Island rises from the mist. One crew will claim the ultimate treasure before the Grand Pirate Council.',
    activities: ['Live Demonstrations', 'Final Pitch Battles', 'Jury Evaluations', 'Winner Announcements', 'Closing Ceremony'],
    quote: '"Legends are not found. They are forged."',
    completed: false,
    pin: { x: 88, y: 68 },
  },
];

function CheckIcon() {
  return (
    <svg viewBox="0 0 14 14" fill="none" width="10" height="10">
      <path d="M2.5 7l3.5 3.5 5.5-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Timeline() {
  return (
    <section
      id="timeline"
      className="py-16 sm:py-28 px-4 sm:px-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0d0020 0%, #000000 50%, #0d0020 100%)' }}
    >
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-purple-400 text-xs tracking-[0.35em] uppercase mb-3 font-mono-bold">
            The Voyage Unfolds
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-3 font-display-bold white-gradient-text">
            Event Timeline
          </h2>
          <p className="text-gray-400 font-display-italic text-sm sm:text-base">
            Every stage unlocks a new chapter in the pirate story.
          </p>
          <div className="section-divider w-48 mx-auto mt-6" />
        </div>

        {/* Treasure map — image already contains all timeline info */}
        <div className="relative w-full rounded-xl sm:rounded-2xl overflow-hidden" style={{ boxShadow: '0 0 40px rgba(139,92,246,0.2), 0 0 80px rgba(88,28,135,0.1)' }}>
          <img
            src="/treasure_map.png"
            alt="Event Timeline Treasure Map"
            className="timeline-map-img w-full h-auto block"
            style={{ filter: 'brightness(0.85) saturate(1.1)' }}
            draggable={false}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(135deg, rgba(88,28,135,0.18) 0%, transparent 60%, rgba(88,28,135,0.12) 100%)' }}
          />
        </div>

      </div>
      <SectionBlurEdges />
    </section>
  );
}
