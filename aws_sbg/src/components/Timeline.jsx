import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import SectionBlurEdges from './ui/SectionBlurEdges';
import { CardCanvas, Card } from './ui/animated-glow-card';

const springValues = { damping: 30, stiffness: 100, mass: 2 };

const phases = [
  {
    dates: 'June 1 – June 10',
    label: 'Registration Phase',
    title: 'The Call of the Sea',
    description: 'The Black Flag has been raised. Young pirates from across the world gather at the harbor, ready to form their crews and begin the hunt for legendary treasure. Every captain needs a crew. Every crew needs a dream.',
    activities: ['Team Formation', 'Registration & Crew Onboarding', 'Theme Exploration', 'Community Networking'],
    quote: '"Every captain begins with a crew — but only the fearless dare to sail."',
    completed: true,
  },
  {
    dates: 'June 11 – June 18',
    label: 'Ideation Phase',
    title: 'Charting the Treasure Map',
    description: 'The pirate crews study ancient maps, decode mysterious riddles, and shape bold ideas capable of conquering unknown seas. This is where imagination becomes direction. Where innovation becomes a compass.',
    activities: ['Problem Solving Sessions', 'Idea Validation', 'Product Brainstorming', 'Mentor Discussions', 'Initial Pitch Preparation'],
    quote: '"A weak map leads to lost waters. A strong idea leads to treasure."',
    completed: true,
  },
  {
    dates: 'June 21',
    label: 'Ideation Results',
    title: "The Captain's Selection",
    description: 'The Pirate Council reviews every treasure map submitted by the crews. Only the strongest ideas earn permission to continue deeper into the voyage.',
    activities: ['Idea Evaluation', 'Team Shortlisting', 'Qualification for Development Rounds'],
    quote: '"Not every ship survives the harbor."',
    completed: true,
  },
  {
    dates: 'June 22 – June 30',
    label: 'Phase 1 Development',
    title: 'Forging the Black Pearl',
    description: 'The selected pirate crews begin constructing their mighty vessels. Code becomes cannons. Design becomes sails. Innovation becomes power. The seas grow dangerous with bugs, crashes, sleepless nights, and impossible deadlines. But true pirates never retreat.',
    activities: ['MVP Development', 'UI/UX Design', 'AI Integration', 'Backend Engineering', 'Product Testing', 'Feature Demonstrations'],
    quote: '"A true pirate does not fear the storm."',
    completed: false,
  },
  {
    dates: 'July 4',
    label: 'Phase 1 Results',
    title: 'The Stormbreaker Trials',
    description: 'The ocean grows violent. The Pirate Council announces the crews worthy of entering the forbidden Multiverse Waters. Only the relentless survive.',
    activities: ['Midway Evaluations', 'Prototype Reviews', 'Performance Judging', 'Team Advancements'],
    quote: '"The ocean respects only the relentless."',
    completed: false,
  },
  {
    dates: 'July 5 – July 14',
    label: 'Phase 2 Development + Mentor Reveal',
    title: 'The Multiverse Alliance',
    description: 'As surviving pirate crews cross dangerous waters, mysterious portals open across the sea. From distant universes arrive legendary characters — heroes, wizards, geniuses, warriors, detectives, and masterminds who guide pirate crews toward greatness.',
    activities: ['Mentor Assignments', 'Guardian Sessions', 'Advanced Development', 'Product Refinement'],
    quote: '"Even pirates need legends beside them."',
    completed: false,
  },
  {
    dates: 'July 19',
    label: 'Finalist Announcement',
    title: 'The Council of the Ten Seas',
    description: 'After surviving storms, betrayals, impossible deadlines, and dangerous waters — only 10 legendary crews remain. Their names echo across every sea as they earn a place among the greatest pirate captains.',
    activities: ['Finalist Announcement', 'Hall of Legends Reveal', 'Community Recognition'],
    quote: '"Many sailed. Few conquered."',
    completed: false,
  },
  {
    dates: 'July 25',
    label: 'Grand Finale',
    title: 'The Final Treasure War',
    description: 'The Final Island rises from the mist. The remaining pirate crews present their creations before the Grand Pirate Council and the Guardians of the Multiverse. One crew will claim the ultimate treasure.',
    activities: ['Live Product Demonstrations', 'Final Pitch Battles', 'Jury Evaluations', 'Winner Announcements', 'Closing Ceremony'],
    quote: '"Legends are not found. They are forged."',
    completed: false,
  },
];

/* ── Checkmark SVG ── */
function CheckIcon() {
  return (
    <svg viewBox="0 0 14 14" fill="none" width="12" height="12">
      <path d="M2.5 7l3.5 3.5 5.5-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Tilt wrapper ── */
function TiltCard({ children }) {
  const ref = useRef(null);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale   = useSpring(1, springValues);

  function handleMouse(e) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    rotateX.set(((e.clientY - rect.top  - rect.height / 2) / (rect.height / 2)) * -6);
    rotateY.set(((e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2)) *  6);
  }

  return (
    <motion.div
      ref={ref}
      className="flex-1"
      style={{ rotateX, rotateY, scale, transformStyle: 'preserve-3d', willChange: 'transform' }}
      onMouseMove={handleMouse}
      onMouseEnter={() => scale.set(1.015)}
      onMouseLeave={() => { scale.set(1); rotateX.set(0); rotateY.set(0); }}
    >
      {children}
    </motion.div>
  );
}

export default function Timeline() {
  return (
    <section
      id="timeline"
      className="py-16 sm:py-28 px-4 sm:px-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0d0020 0%, #000000 50%, #0d0020 100%)', perspective: '1200px' }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
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

        {/* Timeline items */}
        <div className="relative">

          {/* ── Straight white vertical spine ── */}
          <div
            className="absolute top-0 bottom-0 w-px"
            style={{
              left: '11px',
              background: 'rgba(255, 255, 255, 0.25)',
            }}
          />

          <div className="space-y-6 sm:space-y-8" style={{ paddingLeft: '36px' }}>
            {phases.map((phase, i) => (
              <div key={i} className="relative flex gap-4 sm:gap-6">

                {/* ── Stage dot / check ── */}
                <div
                  className="absolute grid place-items-center rounded-full"
                  style={{
                    left: '-28px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '22px',
                    height: '22px',
                    background: phase.completed ? '#22c55e' : 'transparent',
                    border: phase.completed
                      ? '2px solid #22c55e'
                      : '2px solid rgba(255,255,255,0.45)',
                    boxShadow: phase.completed
                      ? '0 0 10px rgba(34,197,94,0.6), 0 0 20px rgba(34,197,94,0.3)'
                      : 'none',
                  }}
                >
                  {phase.completed && <CheckIcon />}
                </div>

                {/* ── Card ── */}
                <TiltCard>
                  <CardCanvas>
                    <Card>
                      <div className="p-4 sm:p-6" style={{ transform: 'translateZ(20px)', transformStyle: 'preserve-3d' }}>

                        {/* Date + label */}
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
                          <span className="text-white text-xs tracking-widest uppercase font-mono-bold">
                            {phase.dates}
                          </span>
                          <span
                            className="text-xs px-2 sm:px-3 py-1 rounded-full font-mono-bold"
                            style={{ border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.08)', color: '#fff' }}
                          >
                            {phase.label}
                          </span>
                          {phase.completed && (
                            <span
                              className="text-xs px-2 py-1 rounded-full font-mono-bold flex items-center gap-1"
                              style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.4)', color: '#4ade80' }}
                            >
                              <svg viewBox="0 0 10 10" fill="none" className="w-2.5 h-2.5">
                                <path d="M1.5 5l2.5 2.5 4.5-4" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                              Completed
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="text-white text-lg sm:text-xl mb-2 font-display-bold">
                          {phase.title}
                        </h3>

                        {/* Description */}
                        <p className="text-white/70 text-sm leading-relaxed mb-4 font-body-bold">
                          {phase.description}
                        </p>

                        {/* Activities */}
                        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
                          {phase.activities.map((a) => (
                            <span
                              key={a}
                              className="text-xs px-2 sm:px-3 py-1 rounded-full font-body-bold"
                              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff' }}
                            >
                              ✦ {a}
                            </span>
                          ))}
                        </div>

                        {/* Quote */}
                        <p
                          className="text-white/60 text-sm font-display-italic pl-3"
                          style={{ borderLeft: '2px solid rgba(255,255,255,0.25)' }}
                        >
                          {phase.quote}
                        </p>
                      </div>
                    </Card>
                  </CardCanvas>
                </TiltCard>
              </div>
            ))}
          </div>
        </div>
      </div>
      <SectionBlurEdges />
    </section>
  );
}
