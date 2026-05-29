import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Bot, Cloud, Link2, ShieldCheck, Rocket } from 'lucide-react';
import SectionBlurEdges from './ui/SectionBlurEdges';

const tracks = [
  {
    id: 1,
    title: 'AI & Automation',
    icon: Bot,
    description: 'Build intelligent systems that learn, adapt, and automate. From ML models to smart assistants — make machines work for people.',
    tags: ['Machine Learning', 'NLP', 'Computer Vision', 'Automation'],
    color: '#7c3aed',
    glow: 'rgba(124,58,237,0.4)',
    gradient: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(88,28,135,0.1))',
  },
  {
    id: 2,
    title: 'Web & Cloud',
    icon: Cloud,
    description: 'Design scalable platforms, APIs, and cloud-native apps. Build the digital infrastructure that powers the next generation.',
    tags: ['AWS', 'Full Stack', 'Serverless', 'DevOps'],
    color: '#0ea5e9',
    glow: 'rgba(14,165,233,0.4)',
    gradient: 'linear-gradient(135deg, rgba(14,165,233,0.2), rgba(7,89,133,0.1))',
  },
  {
    id: 3,
    title: 'Blockchain & Web3',
    icon: Link2,
    description: 'Decentralize trust. Build smart contracts, DeFi tools, and Web3 applications that redefine ownership and transparency.',
    tags: ['Smart Contracts', 'DeFi', 'NFTs', 'Decentralized Apps'],
    color: '#f59e0b',
    glow: 'rgba(245,158,11,0.4)',
    gradient: 'linear-gradient(135deg, rgba(245,158,11,0.2), rgba(180,83,9,0.1))',
  },
  {
    id: 4,
    title: 'Cybersecurity',
    icon: ShieldCheck,
    description: 'Protect systems, data, and people. Build tools that detect threats, secure infrastructure, and keep the digital world safe.',
    tags: ['Threat Detection', 'Encryption', 'Pen Testing', 'Zero Trust'],
    color: '#10b981',
    glow: 'rgba(16,185,129,0.4)',
    gradient: 'linear-gradient(135deg, rgba(16,185,129,0.2), rgba(6,78,59,0.1))',
  },
  {
    id: 5,
    title: 'Future Tech',
    icon: Rocket,
    description: 'Push the boundaries of what\'s possible. AR/VR, IoT, robotics, quantum — build the technology that doesn\'t exist yet.',
    tags: ['AR/VR', 'IoT', 'Robotics', 'Quantum'],
    color: '#ec4899',
    glow: 'rgba(236,72,153,0.4)',
    gradient: 'linear-gradient(135deg, rgba(236,72,153,0.2), rgba(131,24,67,0.1))',
  },
];

/* Animated background grid lines */
function GridLines() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-0 bottom-0 w-px"
          style={{ left: `${(i + 1) * (100 / 7)}%`, background: 'rgba(139,92,246,0.06)' }}
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.5 }}
        />
      ))}
    </div>
  );
}

/* Individual track card */
function TrackCard({ track, index, isActive, onClick }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-2xl cursor-pointer overflow-hidden"
      style={{
        background: isActive ? track.gradient : 'rgba(12,0,24,0.6)',
        border: `1px solid ${isActive ? track.color + '60' : 'rgba(139,92,246,0.18)'}`,
        boxShadow: isActive ? `0 0 40px ${track.glow}, 0 0 80px ${track.glow.replace('0.4', '0.15')}` : 'none',
        transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
      }}
    >
      {/* Top shimmer on hover/active */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${track.color}, transparent)` }}
        animate={{ opacity: isActive || hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Corner glow */}
      <motion.div
        className="absolute top-0 right-0 w-24 h-24 pointer-events-none rounded-full"
        style={{ background: `radial-gradient(circle at top right, ${track.glow}, transparent 70%)` }}
        animate={{ opacity: isActive || hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative p-5 sm:p-6 z-10">
        {/* Number + icon row */}
        <div className="flex items-center justify-between mb-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: isActive || hovered ? track.color + '25' : 'rgba(139,92,246,0.1)',
              border: `1px solid ${isActive || hovered ? track.color + '50' : 'rgba(139,92,246,0.2)'}`,
              transition: 'all 0.3s',
              boxShadow: isActive || hovered ? `0 0 12px ${track.color}` : 'none',
            }}
          >
            <track.icon size={18} style={{ color: isActive || hovered ? track.color : 'rgba(168,85,247,0.7)', transition: 'color 0.3s' }} />
          </div>
          <span
            className="text-xs font-mono-bold px-2 py-1 rounded-full"
            style={{
              background: isActive ? track.color + '30' : 'rgba(139,92,246,0.1)',
              border: `1px solid ${isActive ? track.color + '50' : 'rgba(139,92,246,0.2)'}`,
              color: isActive ? track.color : 'rgba(168,85,247,0.7)',
              transition: 'all 0.3s',
            }}
          >
            Track {String(track.id).padStart(2, '0')}
          </span>
        </div>

        {/* Title */}
        <h3
          className="text-lg sm:text-xl font-display-bold mb-2 leading-tight"
          style={{ color: isActive || hovered ? '#ffffff' : 'rgba(255,255,255,0.85)', transition: 'color 0.3s' }}
        >
          {track.title}
        </h3>

        {/* Description — expands when active */}
        <AnimatePresence>
          {(isActive || hovered) && (
            <motion.p
              className="text-sm leading-relaxed font-display-regular mb-4"
              style={{ color: 'rgba(209,196,233,0.8)' }}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {track.description}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-2">
          {track.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full font-mono-bold"
              style={{
                background: isActive ? track.color + '20' : 'rgba(139,92,246,0.08)',
                border: `1px solid ${isActive ? track.color + '40' : 'rgba(139,92,246,0.15)'}`,
                color: isActive ? track.color : 'rgba(168,85,247,0.6)',
                transition: 'all 0.3s',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Active indicator */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5"
          style={{ background: `linear-gradient(90deg, transparent, ${track.color}, transparent)` }}
          animate={{ opacity: isActive ? 1 : 0, scaleX: isActive ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />
      </div>
    </motion.div>
  );
}

/* Active track detail panel */
function DetailPanel({ track }) {
  return (
    <motion.div
      key={track.id}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-2xl overflow-hidden h-full"
      style={{
        background: track.gradient,
        border: `1px solid ${track.color}40`,
        boxShadow: `0 0 60px ${track.glow}, inset 0 0 60px rgba(0,0,0,0.3)`,
        minHeight: 320,
      }}
    >
      {/* Animated background orb */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 300, height: 300,
          background: `radial-gradient(circle, ${track.glow} 0%, transparent 70%)`,
          top: '50%', left: '50%',
          x: '-50%', y: '-50%',
        }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 p-8 flex flex-col justify-between h-full">
        <div>
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
            style={{
              background: track.color + '20',
              border: `1px solid ${track.color}40`,
              boxShadow: `0 0 24px ${track.glow}`,
            }}
          >
            <track.icon size={32} style={{ color: track.color }} />
          </div>
          <h3 className="text-3xl font-display-bold text-white mb-3">{track.title}</h3>
          <p className="text-base leading-relaxed font-display-regular mb-6" style={{ color: 'rgba(220,210,240,0.85)' }}>
            {track.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {track.tags.map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.07 }}
                className="px-3 py-1 rounded-full text-sm font-mono-bold"
                style={{
                  background: track.color + '25',
                  border: `1px solid ${track.color}50`,
                  color: track.color,
                }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6" style={{ borderTop: `1px solid ${track.color}30` }}>
          <p className="text-xs font-mono-bold tracking-widest uppercase" style={{ color: track.color + 'aa' }}>
            Track {String(track.id).padStart(2, '0')} of {tracks.length}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Tracks() {
  const [activeId, setActiveId] = useState(1);
  const activeTrack = tracks.find(t => t.id === activeId);

  return (
    <section
      id="tracks"
      className="py-16 sm:py-28 px-4 sm:px-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #080015 0%, #000000 50%, #080015 100%)' }}
    >
      <GridLines />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 40%, rgba(88,28,135,0.12) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-purple-400 text-xs tracking-[0.35em] uppercase mb-3 font-mono-bold">Innovation Domains</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-3 font-display-bold mixed-gradient-text">Hackathon Tracks</h2>
          <p className="text-gray-400 font-display-italic text-sm sm:text-base">Choose your domain. Build your solution.</p>
          <div className="section-divider w-48 mx-auto mt-6" />
        </div>

        {/* Desktop: cards left + detail right */}
        <div className="hidden lg:grid lg:grid-cols-5 gap-4 items-start">
          {/* Cards column */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            {tracks.map((track, i) => (
              <TrackCard
                key={track.id}
                track={track}
                index={i}
                isActive={activeId === track.id}
                onClick={() => setActiveId(track.id)}
              />
            ))}
          </div>

          {/* Detail panel */}
          <div className="lg:col-span-2 sticky top-24">
            <AnimatePresence mode="wait">
              <DetailPanel key={activeId} track={activeTrack} />
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile/tablet: just cards stacked */}
        <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
          {tracks.map((track, i) => (
            <TrackCard
              key={track.id}
              track={track}
              index={i}
              isActive={activeId === track.id}
              onClick={() => setActiveId(activeId === track.id ? null : track.id)}
            />
          ))}
        </div>

        {/* Hint */}
        <p className="text-center text-purple-500/40 text-xs font-mono-bold tracking-widest uppercase mt-8">
          Click a track to explore
        </p>
      </div>

      <SectionBlurEdges />
    </section>
  );
}
