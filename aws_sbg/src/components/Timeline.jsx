import { Timeline } from './ui/timeline';
import SectionBlurEdges from './ui/SectionBlurEdges';

// Returns true if today is past the given end date (YYYY-MM-DD)
function isPast(dateStr) {
  return new Date() > new Date(dateStr + 'T23:59:59');
}

const Tag = ({ children }) => (
  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-mono-bold"
    style={{ background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)', color: 'rgba(216,180,254,0.9)' }}>
    {children}
  </span>
);

const ActivityList = ({ items, icon }) => (
  <div className="flex flex-wrap gap-2 mt-3">
    {items.map(a => <Tag key={a}>{icon} {a}</Tag>)}
  </div>
);

const phases = [
  {
    title: "June 1–10",
    completed: isPast('2026-06-10'),
    content: (
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl">📋</span>
          <div>
            <p className="text-purple-300 text-xs tracking-widest uppercase font-mono-bold">Phase 1 · 10 Days</p>
            <h4 className="text-white text-lg font-display-bold leading-tight">Registration</h4>
          </div>
        </div>
        <p className="text-gray-400 text-sm font-display-italic mt-2 mb-3 leading-relaxed">
          Applications are open. Teams from across the country register, form their squads, and get ready to build.
        </p>
        <ActivityList items={['Team Registration', 'Team Formation', 'Portal Open']} icon="·" />
      </div>
    ),
  },
  {
    title: "June 11–18",
    completed: isPast('2026-06-18'),
    content: (
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl">💡</span>
          <div>
            <p className="text-purple-300 text-xs tracking-widest uppercase font-mono-bold">Phase 2 · 8 Days</p>
            <h4 className="text-white text-lg font-display-bold leading-tight">Ideation</h4>
          </div>
        </div>
        <p className="text-gray-400 text-sm font-display-italic mt-2 mb-3 leading-relaxed">
          Teams research problem statements, validate ideas, and shape bold solutions ready to tackle real-world challenges.
        </p>
        <ActivityList items={['Idea Planning', 'Problem Mapping', 'Proposal Submission']} icon="·" />
      </div>
    ),
  },
  {
    title: "June 21",
    completed: isPast('2026-06-21'),
    content: (
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl">📊</span>
          <div>
            <p className="text-purple-300 text-xs tracking-widest uppercase font-mono-bold">Phase 3 · 1 Day</p>
            <h4 className="text-white text-lg font-display-bold leading-tight">Ideation Result</h4>
          </div>
        </div>
        <p className="text-gray-400 text-sm font-display-italic mt-2 mb-3 leading-relaxed">
          The judging panel reviews every submitted proposal. Only the strongest ideas earn a spot in the development rounds.
        </p>
        <ActivityList items={['Team Shortlisting', 'Panel Review', 'Round Qualification']} icon="·" />
      </div>
    ),
  },
  {
    title: "June 22–30",
    completed: isPast('2026-06-30'),
    content: (
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl">🔧</span>
          <div>
            <p className="text-purple-300 text-xs tracking-widest uppercase font-mono-bold">Phase 4 · 8 Days</p>
            <h4 className="text-white text-lg font-display-bold leading-tight">Prototype Phase 1</h4>
          </div>
        </div>
        <p className="text-gray-400 text-sm font-display-italic mt-2 mb-3 leading-relaxed">
          Shortlisted teams start building their MVPs. Code becomes features. Design becomes experience. Ideas become products.
        </p>
        <ActivityList items={['Initial Development', 'Prototype Construction', 'Feature Building']} icon="·" />
      </div>
    ),
  },
  {
    title: "July 4",
    completed: isPast('2026-07-04'),
    content: (
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl">📋</span>
          <div>
            <p className="text-purple-300 text-xs tracking-widest uppercase font-mono-bold">Phase 5 · 1 Day</p>
            <h4 className="text-white text-lg font-display-bold leading-tight">Phase 1 Result</h4>
          </div>
        </div>
        <p className="text-gray-400 text-sm font-display-italic mt-2 mb-3 leading-relaxed">
          The competition intensifies. The judging panel announces teams advancing to the mentorship and final development round.
        </p>
        <ActivityList items={['Evaluation Review', 'Performance Judging', 'Team Advancement']} icon="·" />
      </div>
    ),
  },
  {
    title: "July 5–14",
    completed: isPast('2026-07-14'),
    content: (
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl">🧭</span>
          <div>
            <p className="text-purple-300 text-xs tracking-widest uppercase font-mono-bold">Phase 6 · 10 Days</p>
            <h4 className="text-white text-lg font-display-bold leading-tight">Mentor Sessions</h4>
          </div>
        </div>
        <p className="text-gray-400 text-sm font-display-italic mt-2 mb-3 leading-relaxed">
          Expert mentors from industry are assigned to teams. Guidance, feedback, and refinement push every project to its best.
        </p>
        <ActivityList items={['Mentor Guidance', 'Final Development', 'Optimization', 'Submission Finalization']} icon="·" />
      </div>
    ),
  },
  {
    title: "July 19",
    completed: isPast('2026-07-19'),
    content: (
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl">🏆</span>
          <div>
            <p className="text-purple-300 text-xs tracking-widest uppercase font-mono-bold">Phase 7 · 1 Day</p>
            <h4 className="text-white text-lg font-display-bold leading-tight">Top 10 Teams</h4>
          </div>
        </div>
        <p className="text-gray-400 text-sm font-display-italic mt-2 mb-3 leading-relaxed">
          Only 10 finalist teams remain. Their names are announced as they earn a place in the Grand Finale.
        </p>
        <ActivityList items={['Finalist Reveal', 'Leaderboard Announcement', 'Finale Qualification']} icon="·" />
      </div>
    ),
  },
  {
    title: "July 25",
    completed: isPast('2026-07-25'),
    content: (
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl">🎯</span>
          <div>
            <p className="text-purple-300 text-xs tracking-widest uppercase font-mono-bold">Phase 8 · Grand Finale</p>
            <h4 className="text-white text-lg font-display-bold leading-tight">Grand Finale</h4>
          </div>
        </div>
        <p className="text-gray-400 text-sm font-display-italic mt-2 mb-3 leading-relaxed">
          The final stage begins. Top 10 teams present live before the judging panel. One team claims the ultimate prize.
        </p>
        <ActivityList items={['Offline Finale', 'Live Demonstrations', 'Final Pitches', 'Winner Announcement']} icon="·" />
        <div className="mt-4 px-4 py-2 rounded-lg text-center font-display-bold text-sm"
          style={{
            background: 'linear-gradient(135deg, rgba(139,92,246,0.25), rgba(88,28,135,0.35))',
            border: '1px solid rgba(168,85,247,0.4)',
            color: '#d8b4fe',
            boxShadow: '0 0 20px rgba(139,92,246,0.15)',
          }}>
          🏆 Victory Achieved!
        </div>
      </div>
    ),
  },
];

export default function TimelineSection() {
  return (
    <section
      id="timeline"
      className="py-16 sm:py-28 px-4 sm:px-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0d0020 0%, #000000 50%, #0d0020 100%)' }}
    >
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 30%, rgba(88,28,135,0.12) 0%, transparent 70%)' }} />

      <div className="max-w-5xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <p className="text-purple-400 text-xs tracking-[0.35em] uppercase mb-3 font-mono-bold">
            The Hackathon Journey          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-3 font-display-bold white-gradient-text">
            Event Timeline
          </h2>
          <p className="text-gray-400 font-display-italic text-sm sm:text-base">
            Every stage unlocks a new chapter in your hackathon journey.
          </p>
          <div className="section-divider w-48 mx-auto mt-6" />
        </div>

        <Timeline data={phases} />
      </div>
      <SectionBlurEdges />
    </section>
  );
}
