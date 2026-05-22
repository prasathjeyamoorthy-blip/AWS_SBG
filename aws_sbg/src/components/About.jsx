import SectionBlurEdges from './ui/SectionBlurEdges';
import RadialOrbitalTimeline from './ui/radial-orbital-timeline';
import { Anchor, Cpu, Brain, Users, Gamepad2, Rocket, Map } from 'lucide-react';

const HACKATHON_NODES = [
  {
    id: 1,
    title: 'Competitive Innovation',
    date: 'Phase 1',
    content: 'Battle-test your ideas against the best crews. Every challenge is a chance to prove your ship is seaworthy.',
    category: 'Core',
    icon: Anchor,
    relatedIds: [2, 3],
    status: 'completed',
    energy: 100,
  },
  {
    id: 2,
    title: 'Cinematic Storytelling',
    date: 'Phase 2',
    content: 'Every great voyage has a legend. Craft your narrative, pitch your vision, and make the judges believe.',
    category: 'Creative',
    icon: Map,
    relatedIds: [1, 4],
    status: 'completed',
    energy: 90,
  },
  {
    id: 3,
    title: 'Emerging Technologies',
    date: 'Phase 3',
    content: 'Harness AI, Cloud, and Web3 to build solutions that didn\'t exist yesterday. The future is your treasure map.',
    category: 'Tech',
    icon: Cpu,
    relatedIds: [1, 5],
    status: 'in-progress',
    energy: 75,
  },
  {
    id: 4,
    title: 'Mentorship & Collaboration',
    date: 'Phase 4',
    content: 'Guardians of the Multiverse — legendary mentors from iconic universes — guide your crew through the storm.',
    category: 'Mentorship',
    icon: Brain,
    relatedIds: [2, 6],
    status: 'in-progress',
    energy: 65,
  },
  {
    id: 5,
    title: 'Gamified Experience',
    date: 'Phase 5',
    content: 'Unlock achievements, earn crew XP, and climb the leaderboard. Every decision shapes your pirate legacy.',
    category: 'Gamification',
    icon: Gamepad2,
    relatedIds: [3, 7],
    status: 'pending',
    energy: 45,
  },
  {
    id: 6,
    title: 'Startup & Product Building',
    date: 'Phase 6',
    content: 'Go beyond a hackathon project. Build something real — a product, a pitch, a company. The treasure is yours to keep.',
    category: 'Startup',
    icon: Rocket,
    relatedIds: [4, 7],
    status: 'pending',
    energy: 30,
  },
  {
    id: 7,
    title: 'Assemble Your Crew',
    date: 'Phase 7',
    content: 'No legend sails alone. Find your pirates — designers, builders, dreamers — and set course for the Grand Finale.',
    category: 'Team',
    icon: Users,
    relatedIds: [5, 6],
    status: 'pending',
    energy: 15,
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden"
      style={{ background: '#000000' }}
    >
      {/* Subtle purple edge glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(88,28,135,0.18) 0%, transparent 60%)' }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-6">
          <p className="text-purple-400 text-xs tracking-[0.35em] uppercase mb-3 font-mono-bold">
            About the Event
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4 pb-2 font-display-bold mixed-gradient-text">
            The Legend Begins
          </h2>
          <p className="text-gray-300 text-lg md:text-xl font-display-bold-italic max-w-xl mx-auto">
            Every generation has dreamers. Only a few become legends.
          </p>
          <div className="section-divider w-48 mx-auto mt-6" />
        </div>
      </div>

      {/* Orbital Timeline */}
      <div className="relative z-10">
        <RadialOrbitalTimeline timelineData={HACKATHON_NODES} />
      </div>

      {/* Quote */}
      <div className="max-w-5xl mx-auto relative z-10 mt-4">
        <div
          className="text-center py-8 px-6 rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(0,0,0,0.8))',
            border: '1px solid rgba(139,92,246,0.3)',
          }}
        >
          <p className="text-white text-lg sm:text-xl md:text-2xl font-display-bold-italic">
            "Legends are not found. They are forged."
          </p>
        </div>
      </div>

      <SectionBlurEdges />
    </section>
  );
}
