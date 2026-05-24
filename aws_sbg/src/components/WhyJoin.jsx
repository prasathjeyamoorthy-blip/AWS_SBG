import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionBlurEdges from './ui/SectionBlurEdges';
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
          scrollTrigger: { trigger: headerRef.current, start: 'top 85%', toggleActions: 'play none none reverse' } }
      );
      gsap.fromTo(gridRef.current.children,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 85%', toggleActions: 'play none none reverse' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="why" ref={sectionRef} className="py-16 sm:py-28 px-4 sm:px-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0d0020 0%, #1a0035 50%, #0d0020 100%)' }}
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
          {reasons.map(({ title, description }) => (
            <div
              key={title}
              className="rounded-2xl p-5 sm:p-7 transition-all duration-300 text-center glow-box-hover"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(139,92,246,0.1) 100%)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <div className="w-8 h-8 rounded-full bg-purple-600/30 border border-purple-500/50 mx-auto mb-4 flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
              </div>
              <h3 className="text-white text-base mb-3 font-display-bold">{title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed font-body-bold">{description}</p>
            </div>
          ))}
        </div>
      </div>

      <SectionBlurEdges />
    </section>
  );
}
