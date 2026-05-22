import { useEffect, useRef, useState } from 'react';
import { SplineScene } from './ui/splite';
import { BluetoothKey } from './ui/bluetooth-key';
import SectionBlurEdges from './ui/SectionBlurEdges';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

/* ─── Countdown ─────────────────────────────────────────────────────────── */
const TARGET = new Date('2026-07-25T09:00:00');
function pad(n) { return String(n).padStart(2, '0'); }

function CountdownUnit({ value, label }) {
  return (
    <div className="flex flex-col items-center gap-1 sm:gap-2">
      <div
        className="w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center rounded-xl border border-purple-500/40 bg-purple-950/50 backdrop-blur-sm"
        style={{ boxShadow: '0 0 20px rgba(139,92,246,0.3)' }}
      >
        <span className="text-xl sm:text-3xl md:text-4xl text-white font-mono-bold">{pad(value)}</span>
      </div>
      <span className="text-[10px] sm:text-xs text-purple-400 tracking-widest uppercase font-mono-bold">{label}</span>
    </div>
  );
}

/* ─── Stars ──────────────────────────────────────────────────────────────── */
const STARS = Array.from({ length: 100 }, (_, i) => ({
  top:     ((i * 37 + 13) % 100),
  left:    ((i * 61 + 7)  % 100),
  size:    ((i * 17 + 3)  % 2) + 1,
  opacity: ((i * 23 + 5)  % 6) / 10 + 0.1,
}));

/* ─── Hero ───────────────────────────────────────────────────────────────── */
export default function Hero() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  /* DOM refs */
  const sectionRef   = useRef(null);

  /* countdown */
  useEffect(() => {
    const tick = () => {
      const diff = TARGET - Date.now();
      if (diff <= 0) { setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return; }
      setTimeLeft({
        days:    Math.floor(diff / 86400000),
        hours:   Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000)  / 60000),
        seconds: Math.floor((diff % 60000)    / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);



  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-16 sm:pt-20 overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse 90% 65% at 50% 30%, rgba(88,28,135,0.4) 0%, #08000f 68%)',
      }}
    >
      {/* ── Spline robot — full-screen, pointer events ON so it tracks mouse ── */}
      <div className="absolute inset-0 z-0">
        <SplineScene
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          className="w-full h-full"
        />
        {/* Vignette — pointer-events-none so it never blocks Spline */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 75% 65% at 50% 50%, transparent 25%, #08000f 78%)',
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, #08000f)' }}
        />
      </div>

      {/* Stars */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        {STARS.map((s, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{ top: s.top + '%', left: s.left + '%', width: s.size, height: s.size, opacity: s.opacity }}
          />
        ))}
      </div>

      {/* Purple glow orb */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none z-[1]"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)' }}
      />

      {/* ── Side stats — left column ── */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 z-10 flex-col gap-10 pointer-events-none select-none hidden lg:flex">
        {/* Stat 1 */}
        <div className="flex flex-col leading-none">
          <span className="text-4xl xl:text-5xl font-display-bold tracking-tight" style={{ color: '#ffffff', textShadow: '0 0 30px rgba(255,255,255,0.15)' }}>48+ HOURS</span>
          <span className="text-4xl xl:text-5xl font-display-bold tracking-tight" style={{
            color: 'transparent',
            WebkitTextStroke: '1.5px rgba(139,92,246,0.5)',
          }}>OF INNOVATION</span>
        </div>
        {/* Stat 2 */}
        <div className="flex flex-col leading-none">
          <span className="text-4xl xl:text-5xl font-display-bold tracking-tight" style={{ color: '#ffffff', textShadow: '0 0 30px rgba(255,255,255,0.15)' }}>MULTIVERSE</span>
          <span className="text-4xl xl:text-5xl font-display-bold tracking-tight" style={{
            color: 'transparent',
            WebkitTextStroke: '1.5px rgba(139,92,246,0.5)',
          }}>MENTORS</span>
        </div>
      </div>

      {/* ── Side stats — right column ── */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-10 flex-col gap-10 pointer-events-none select-none items-end hidden lg:flex">
        {/* Stat 3 */}
        <div className="flex flex-col leading-none items-end">
          <span className="text-4xl xl:text-5xl font-display-bold tracking-tight" style={{ color: '#ffffff', textShadow: '0 0 30px rgba(255,255,255,0.15)' }}>PIRATE-THEMED</span>
          <span className="text-4xl xl:text-5xl font-display-bold tracking-tight" style={{
            color: 'transparent',
            WebkitTextStroke: '1.5px rgba(139,92,246,0.5)',
          }}>CHALLENGES</span>
        </div>
        {/* Stat 4 */}
        <div className="flex flex-col leading-none items-end">
          <span className="text-4xl xl:text-5xl font-display-bold tracking-tight" style={{ color: '#ffffff', textShadow: '0 0 30px rgba(255,255,255,0.15)' }}>AI · WEB · CHAIN</span>
          <span className="text-4xl xl:text-5xl font-display-bold tracking-tight" style={{
            color: 'transparent',
            WebkitTextStroke: '1.5px rgba(139,92,246,0.5)',
          }}>FUTURE TECH</span>
        </div>
      </div>

      {/* ── Hero content ── */}
      <div className="relative z-10 max-w-5xl mx-auto pointer-events-none select-none w-full">
        <p className="text-purple-400 text-xs tracking-[0.35em] uppercase mb-5 font-mono-bold">
          Pirate Multiverse Hackathon
        </p>

        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white leading-[1.05] mb-4 font-display-bold">
          THE GRAND
          <br />
          <span className="purple-gradient-text glow-purple">PIRATE VOYAGE</span>
        </h1>

        <p className="text-purple-300 text-base sm:text-lg md:text-2xl mb-3 font-display-bold-italic">
          Code the Seas. Conquer the Multiverse.
        </p>

        <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-10 font-body-bold px-2">
          In a world where innovation is the ultimate treasure, pirates, builders, coders, dreamers,
          and creators gather from every corner of the seas to embark on a legendary hackathon adventure.
        </p>

        {/* Floating stats — mobile only (shown below lg) */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-10 lg:hidden">
          {[
            '48+ Hours of Innovation',
            'Multiverse Mentors',
            'Pirate-Themed Challenges',
            'AI · Web · Blockchain · Future Tech',
          ].map((text) => (
            <span
              key={text}
              className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-purple-700/40 bg-purple-950/30 text-purple-300 text-xs font-body-bold tracking-wide"
            >
              {text}
            </span>
          ))}
        </div>

        {/* Countdown */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-5 mb-10 sm:mb-12">
          <CountdownUnit value={timeLeft.days}    label="Days"    />
          <span className="text-purple-500 text-2xl sm:text-3xl font-mono-bold mb-6">:</span>
          <CountdownUnit value={timeLeft.hours}   label="Hours"   />
          <span className="text-purple-500 text-2xl sm:text-3xl font-mono-bold mb-6">:</span>
          <CountdownUnit value={timeLeft.minutes} label="Minutes" />
          <span className="text-purple-500 text-2xl sm:text-3xl font-mono-bold mb-6">:</span>
          <CountdownUnit value={timeLeft.seconds} label="Seconds" />
        </div>

        {/* CTA buttons */}
        <div className="relative flex flex-wrap justify-center gap-3 sm:gap-4 pointer-events-auto" style={{ zIndex: 30 }}>
          <BluetoothKey label="Join the Voyage"      href="#register"  variant="primary" />
          <BluetoothKey label="Explore the Timeline" href="#timeline"  variant="secondary" />
          <BluetoothKey label="Meet the Guardians"   href="#guardians" variant="secondary" />
        </div>
      </div>

      <SectionBlurEdges variant="hero" />
    </section>
  );
}
