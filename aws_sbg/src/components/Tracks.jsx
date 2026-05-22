import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionBlurEdges from './ui/SectionBlurEdges';
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

const tracks = [
  {
    icon: '🤖',
    title: 'AI & Automation',
    description: 'Build intelligent systems that solve real-world problems using AI, agents, automation, and machine learning.',
    color: 'from-violet-900/30 to-purple-950/70',
    border: 'border-violet-700/30',
  },
  {
    icon: '🌐',
    title: 'Web & Cloud',
    description: 'Create scalable digital experiences powered by modern web technologies and cloud infrastructure.',
    color: 'from-blue-900/30 to-purple-950/70',
    border: 'border-blue-700/30',
  },
  {
    icon: '🛡️',
    title: 'Cybersecurity',
    description: 'Protect the seas from digital threats through security innovation and cyber defense systems.',
    color: 'from-red-900/30 to-purple-950/70',
    border: 'border-red-700/30',
  },
  {
    icon: '🤝',
    title: 'Productivity & Future Tech',
    description: 'Reimagine workflows, education, collaboration, and futuristic digital experiences.',
    color: 'from-green-900/30 to-purple-950/70',
    border: 'border-green-700/30',
  },
  {
    icon: '🏥',
    title: 'Health & Social Impact',
    description: 'Design solutions that improve lives, accessibility, sustainability, and social well-being.',
    color: 'from-pink-900/30 to-purple-950/70',
    border: 'border-pink-700/30',
  },
  {
    icon: '🎮',
    title: 'Gaming & Immersive Experiences',
    description: 'Build interactive worlds, gamified systems, AR/VR experiences, and next-generation entertainment.',
    color: 'from-orange-900/30 to-purple-950/70',
    border: 'border-orange-700/30',
  },
];

export default function Tracks() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.tracks-header',
        { y: -40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.tracks-header', start: 'top 85%', toggleActions: 'play none none reverse' } }
      );
      gsap.fromTo('.track-card',
        { y: 50, opacity: 0, scale: 0.92 },
        { y: 0, opacity: 1, scale: 1, stagger: 0.1, duration: 0.7, ease: 'back.out(1.2)',
          scrollTrigger: { trigger: '.track-card', start: 'top 85%', toggleActions: 'play none none reverse' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="tracks" ref={sectionRef} className="py-16 sm:py-28 px-4 sm:px-6 relative overflow-hidden" style={{ background: '#000000' }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(88,28,135,0.12) 0%, transparent 70%)' }}
      />
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="tracks-header text-center mb-10 sm:mb-14">
          <p className="text-purple-400 text-xs tracking-[0.35em] uppercase mb-3 font-mono-bold">
            Innovation Domains
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-3 font-display-bold mixed-gradient-text">
            Hackathon Tracks
          </h2>
          <p className="text-gray-400 font-display-italic text-sm sm:text-base">
            Choose your sea. Chart your course.
          </p>
          <div className="section-divider w-48 mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {tracks.map(({ title, description, color, border }) => (
            <div
              key={title}
              className={`track-card rounded-2xl p-5 sm:p-7 border ${border} bg-gradient-to-br ${color} glow-box-hover transition-all duration-300`}
            >
              <div className="w-10 h-1 rounded-full bg-purple-500 mb-5" />
              <h3 className="text-white text-lg mb-3 font-display-bold">{title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed font-body-bold">{description}</p>
            </div>
          ))}
        </div>
      </div>

      <SectionBlurEdges />
    </section>
  );
}
