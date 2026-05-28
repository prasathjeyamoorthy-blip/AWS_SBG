import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionBlurEdges from './ui/SectionBlurEdges';
import BorderGlow from './ui/BorderGlow';
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

const reasons = [
  { title: 'Immersive Story Experience',    description: 'Every stage of the hackathon unfolds like a cinematic pirate adventure.' },
  { title: 'Learn From Legendary Mentors',  description: 'Gain guidance from industry experts represented through iconic multiverse factions.' },
  { title: 'Build Real Products',           description: 'Transform ideas into working prototypes and future startups.' },
  { title: 'Network With Builders',         description: 'Meet developers, designers, founders, and innovators from across the seas.' },
  { title: 'Compete for Glory',             description: 'Win prizes, recognition, opportunities, and a place in pirate legend.' },
  { title: 'Gamified Experience',           description: 'Progress through missions, trials, rankings, and hidden challenges throughout the voyage.' },
];

export default function WhyJoin() {
  const sectionRef = useRef(null);
  const headerRef  = useRef(null);
  const gridRef    = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { y: -40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 85%', toggleActions: 'play none none none' } }
      );
      gsap.fromTo(gridRef.current.children,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 85%', toggleActions: 'play none none none' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="why" ref={sectionRef} className="py-16 sm:py-28 px-4 sm:px-6 relative"
      style={{ background: 'linear-gradient(135deg, #0d0020 0%, #1a0035 50%, #0d0020 100%)', overflow: 'clip' }}
    >
      <div className="absolute inset-0 pointer-events-none"
        style={{ borderTop: '1px solid rgba(139,92,246,0.25)', borderBottom: '1px solid rgba(139,92,246,0.25)' }}
      />
      <div className="max-w-6xl mx-auto relative z-10">
        <div ref={headerRef} className="text-center mb-10 sm:mb-14">
          <p className="text-purple-400 text-xs tracking-[0.35em] uppercase mb-3 font-mono-bold">
            More Than Just a Hackathon
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-3 font-display-bold white-gradient-text">
            Why Join the Voyage?
          </h2>
          <div className="section-divider w-48 mx-auto mt-6" />
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {reasons.map(({ title, description }, i) => (
            <BorderGlow
              key={title}
              autoGlow
              sweepDuration={4}
              sweepDelay={i * 0.7}
              edgeSensitivity={0}
              borderRadius={16}
              glowRadius={36}
              glowColor="270 60 70"
              glowIntensity={1.6}
              coneSpread={22}
              backgroundColor="#0e0a1a"
              colors={['#c084fc', '#f472b6', '#38bdf8']}
              fillOpacity={0.2}
              className="h-full"
            >
              <div className="p-4 sm:p-5 md:p-7 text-left h-full flex flex-col">
                {/* Sparkle icon */}
                <div className="mb-4 flex items-end gap-1">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L13.5 9.5L21 11L13.5 12.5L12 20L10.5 12.5L3 11L10.5 9.5L12 2Z"/>
                  </svg>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" style={{ marginBottom: '2px' }}>
                    <path d="M12 2L13.5 9.5L21 11L13.5 12.5L12 20L10.5 12.5L3 11L10.5 9.5L12 2Z"/>
                  </svg>
                </div>
                <h3 className="text-white text-base sm:text-lg mb-3 font-display-bold">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed font-body-bold">{description}</p>
              </div>
            </BorderGlow>
          ))}
        </div>
      </div>

      <SectionBlurEdges />
    </section>
  );
}
