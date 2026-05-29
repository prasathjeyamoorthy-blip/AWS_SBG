import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, useSpring } from "framer-motion";

/* Floating particle that drifts upward */
function Particle({ style }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ width: 3, height: 3, background: 'rgba(168,85,247,0.7)', ...style }}
      animate={{ y: [-10, -60], opacity: [0, 0.8, 0], scale: [0.5, 1.2, 0.3] }}
      transition={{ duration: 2.5 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 3, ease: 'easeOut' }}
    />
  );
}

/* Animated dot on the line */
function TimelineDot({ completed, index, scrollYProgress }) {
  const threshold = index / 8;
  const isActive = useTransform(scrollYProgress, [threshold - 0.05, threshold + 0.05], [0, 1]);

  return (
    <div className="relative flex items-center justify-center" style={{ width: 44, height: 44, flexShrink: 0 }}>
      {/* Outer pulse ring */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 44, height: 44,
          border: '1px solid rgba(168,85,247,0.5)',
          opacity: isActive,
        }}
        animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: index * 0.15 }}
      />
      {/* Second pulse ring */}
      <motion.div
        className="absolute rounded-full"
        style={{ width: 36, height: 36, border: '1px solid rgba(139,92,246,0.4)' }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: index * 0.15 + 0.4 }}
      />
      {/* Main dot */}
      <motion.div
        className="relative z-10 rounded-full flex items-center justify-center"
        style={{
          width: 28, height: 28,
          background: completed
            ? 'linear-gradient(135deg, #a855f7, #7c3aed)'
            : 'rgba(88,28,135,0.6)',
          border: '1px solid rgba(168,85,247,0.6)',
          boxShadow: completed
            ? '0 0 16px rgba(168,85,247,0.8), 0 0 32px rgba(139,92,246,0.4)'
            : '0 0 8px rgba(139,92,246,0.3)',
        }}
        whileHover={{ scale: 1.2 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {completed ? (
          <svg viewBox="0 0 14 14" fill="none" width="12" height="12">
            <path d="M2.5 7l3.5 3.5 5.5-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(168,85,247,0.5)' }} />
        )}
      </motion.div>
    </div>
  );
}

/* Individual timeline card with scroll-triggered entrance */
function TimelineItem({ item, index, scrollYProgress }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className="flex items-start gap-0 md:gap-4 relative" style={{ marginBottom: '3rem' }}>

      {/* Date label — left side on desktop */}
      <motion.div
        className="hidden md:flex flex-col items-end justify-start pt-1"
        style={{ minWidth: 160, paddingRight: '1.5rem' }}
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="font-display-bold text-lg leading-tight"
          style={{ color: 'rgba(216,180,254,0.95)', textShadow: '0 0 20px rgba(168,85,247,0.5)' }}>
          {item.title}
        </span>
        {item.completed && (
          <span className="text-xs font-mono-bold mt-1" style={{ color: 'rgba(134,239,172,0.8)' }}>
            ✓ Completed
          </span>
        )}
      </motion.div>

      {/* Dot */}
      <div className="relative z-10 flex-shrink-0" style={{ marginLeft: '0.25rem', marginRight: '0.25rem' }}>
        <TimelineDot completed={item.completed} index={index} scrollYProgress={scrollYProgress} />
        {/* Particles near dot */}
        {item.completed && [0, 1, 2].map(i => (
          <Particle key={i} style={{ left: 10 + i * 8, bottom: 0 }} />
        ))}
      </div>

      {/* Card */}
      <motion.div
        className="flex-1 ml-4 md:ml-0"
        initial={{ opacity: 0, x: 40, y: 10 }}
        animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.2 + index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Mobile date */}
        <div className="md:hidden mb-2 flex items-center gap-2">
          <span className="font-display-bold text-base" style={{ color: 'rgba(216,180,254,0.95)' }}>
            {item.title}
          </span>
          {item.completed && (
            <span className="text-xs font-mono-bold" style={{ color: 'rgba(134,239,172,0.8)' }}>✓</span>
          )}
        </div>

        <motion.div
          className="relative rounded-xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(88,28,135,0.2) 0%, rgba(12,0,24,0.85) 100%)',
            border: '1px solid rgba(139,92,246,0.25)',
          }}
          whileHover={{
            borderColor: 'rgba(168,85,247,0.5)',
            boxShadow: '0 0 30px rgba(139,92,246,0.2), 0 0 60px rgba(88,28,135,0.1)',
            y: -3,
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Top shimmer line */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.6), transparent)' }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, delay: index * 0.3 }}
          />

          <div className="p-5">
            {item.content}
          </div>

          {/* Corner glow */}
          <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none"
            style={{ background: 'radial-gradient(circle at top right, rgba(139,92,246,0.15), transparent 70%)' }} />
        </motion.div>
      </motion.div>
    </div>
  );
}

export function Timeline({ data }) {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const update = () => {
      if (ref.current) setHeight(ref.current.getBoundingClientRect().height);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 15%", "end 60%"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });
  const lineHeight = useTransform(smoothProgress, [0, 1], [0, height]);
  const lineOpacity = useTransform(smoothProgress, [0, 0.05], [0, 1]);

  // Glowing orb that travels down the line
  const orbY = useTransform(smoothProgress, [0, 1], [0, height - 20]);

  return (
    <div ref={containerRef} className="w-full">
      <div ref={ref} className="relative max-w-5xl mx-auto pb-20">

        {/* Background track line — desktop only */}
        <div
          className="absolute hidden md:block"
          style={{
            left: 'calc(160px + 1.35rem)',
            top: 0,
            width: 2,
            height: `${height}px`,
            background: 'linear-gradient(to bottom, transparent, rgba(139,92,246,0.12), rgba(139,92,246,0.08), transparent)',
          }}
        >
          {/* Filled progress line */}
          <motion.div
            style={{
              position: 'absolute', top: 0, left: 0, right: 0,
              height: lineHeight,
              opacity: lineOpacity,
              background: 'linear-gradient(to bottom, #c084fc, #a855f7, #7c3aed, #6d28d9)',
              boxShadow: '0 0 8px rgba(168,85,247,0.8), 0 0 20px rgba(139,92,246,0.4)',
            }}
          />

          {/* Traveling orb */}
          <motion.div
            style={{
              position: 'absolute',
              left: '50%',
              y: orbY,
              x: '-50%',
              width: 12,
              height: 12,
              borderRadius: '50%',
              background: 'radial-gradient(circle, #fff 0%, #c084fc 40%, #7c3aed 100%)',
              boxShadow: '0 0 12px 4px rgba(192,132,252,0.9), 0 0 30px 10px rgba(139,92,246,0.5)',
              opacity: lineOpacity,
            }}
          />
        </div>

        {/* Mobile line (no date column offset) */}
        <div
          className="absolute md:hidden"
          style={{
            left: '1.35rem',
            top: 0,
            width: 2,
            height: `${height}px`,
            background: 'rgba(139,92,246,0.1)',
          }}
        >
          <motion.div
            style={{
              position: 'absolute', top: 0, left: 0, right: 0,
              height: lineHeight,
              opacity: lineOpacity,
              background: 'linear-gradient(to bottom, #c084fc, #a855f7, #7c3aed)',
              boxShadow: '0 0 8px rgba(168,85,247,0.8)',
            }}
          />
        </div>

        {/* Items */}
        <div className="pt-4">
          {data.map((item, index) => (
            <TimelineItem
              key={index}
              item={item}
              index={index}
              scrollYProgress={smoothProgress}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
