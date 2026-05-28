import { useEffect, useRef, useState, memo } from 'react';
import { BluetoothKey } from './ui/bluetooth-key';
import SectionBlurEdges from './ui/SectionBlurEdges';

/* ─── Countdown ─────────────────────────────────────────────────────────── */
const TARGET = new Date('2026-07-25T09:00:00');
function pad(n) { return String(n).padStart(2, '0'); }

const CountdownUnit = memo(function CountdownUnit({ value, label }) {
  return (
    <div className="flex flex-col items-center gap-1 sm:gap-2">
      <div
        className="w-12 h-12 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center rounded-xl border border-purple-500/40 bg-purple-950/50 backdrop-blur-sm"
        style={{ boxShadow: '0 0 20px rgba(139,92,246,0.3)' }}
      >
        <span className="text-lg sm:text-3xl md:text-4xl text-white font-mono-bold">{pad(value)}</span>
      </div>
      <span className="text-[9px] sm:text-xs text-purple-400 tracking-widest uppercase font-mono-bold">{label}</span>
    </div>
  );
});

/* ─── Stars — drawn on canvas, zero DOM nodes ────────────────────────────── */
const STARS = Array.from({ length: 100 }, (_, i) => ({
  top:     ((i * 37 + 13) % 100) / 100,
  left:    ((i * 61 + 7)  % 100) / 100,
  size:    ((i * 17 + 3)  % 2) + 1,
  opacity: ((i * 23 + 5)  % 6) / 10 + 0.1,
}));

function StarCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const draw = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      STARS.forEach(s => {
        ctx.beginPath();
        ctx.arc(s.left * canvas.width, s.top * canvas.height, s.size / 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.opacity})`;
        ctx.fill();
      });
    };
    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }} />;
}

/* ─── Hero ───────────────────────────────────────────────────────────────── */
export default function Hero() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  /* DOM refs */
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  /* loop first 5 seconds of video */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = 0.9;
    // Poll at 250ms instead of timeupdate (which fires ~30x/sec)
    const id = setInterval(() => {
      if (video.currentTime >= 5) video.currentTime = 0;
    }, 250);
    return () => clearInterval(id);
  }, []);

  /* countdown */
  useEffect(() => {
    const tick = () => {
      const diff = TARGET - Date.now();
      if (diff <= 0) { setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return; }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
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
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-16 sm:pt-20 pb-44 md:pb-16 overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse 90% 65% at 50% 30%, rgba(88,28,135,0.4) 0%, #08000f 68%)',
      }}
    >
      {/* ── Video background — full-screen, looping first 5s ── */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          src="/pirate_video.mp4"
          autoPlay
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full"
          style={{
            objectFit: 'cover',
            objectPosition: 'center top',
            transform: 'scale(1.15)',
            transformOrigin: 'center top',
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden',
            willChange: 'transform',
          }}
        />
        {/* Color-grade overlay — cheaper than CSS filter on <video> */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'rgba(20,0,40,0.18)',
            mixBlendMode: 'multiply',
          }}
        />
        {/* Vignette — pointer-events-none so it never blocks interaction */}
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

      {/* Stars — single canvas instead of 100 divs */}
      <StarCanvas />

      {/* Purple glow orb */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none z-[1]"
        style={{
          width: 'clamp(300px, 70vw, 700px)',
          height: 'clamp(300px, 70vw, 700px)',
          background: 'radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)'
        }}
      />

      {/* ── Side stats — left column ── */}
      <div className="absolute left-4 xl:left-8 top-1/2 -translate-y-1/2 z-10 flex-col gap-8 xl:gap-10 pointer-events-none select-none hidden xl:flex">
        {/* Stat 1 */}
        <div className="flex flex-col leading-none items-start">
          <span className="text-xl xl:text-3xl 2xl:text-4xl font-display-bold tracking-tight" style={{ color: '#ffffff', textShadow: '0 0 30px rgba(255,255,255,0.15)' }}>ENDLESS</span>
          <span className="text-xl xl:text-3xl 2xl:text-4xl font-display-bold tracking-tight" style={{
            color: 'transparent',
            WebkitTextStroke: '1.5px rgba(139,92,246,0.5)',
          }}>INNOVATION</span>
        </div>
        {/* Stat 2 */}
        <div className="flex flex-col leading-none items-start">
          <span className="text-xl xl:text-3xl 2xl:text-4xl font-display-bold tracking-tight" style={{ color: '#ffffff', textShadow: '0 0 30px rgba(255,255,255,0.15)', display: 'block' }}>GUARDIAN</span>
          <span className="text-xl xl:text-3xl 2xl:text-4xl font-display-bold tracking-tight" style={{
            color: 'transparent',
            WebkitTextStroke: '1.5px rgba(139,92,246,0.5)',
            display: 'block',
            textAlign: 'left',
            marginLeft: 0,
          }}>MENTORS</span>
        </div>
      </div>

      {/* ── Side stats — right column ── */}
      <div className="absolute right-4 xl:right-8 top-1/2 -translate-y-1/2 z-10 flex-col gap-8 xl:gap-10 pointer-events-none select-none items-end hidden xl:flex">
        {/* Stat 3 */}
        <div className="flex flex-col leading-none items-end">
          <span className="text-xl xl:text-3xl 2xl:text-4xl font-display-bold tracking-tight" style={{ color: '#ffffff', textShadow: '0 0 30px rgba(255,255,255,0.15)' }}>PIRATE TEAM</span>
          <span className="text-xl xl:text-3xl 2xl:text-4xl font-display-bold tracking-tight" style={{
            color: 'transparent',
            WebkitTextStroke: '1.5px rgba(139,92,246,0.5)',
          }}>BASED VOYAGE</span>
        </div>
        {/* Stat 4 */}
        <div className="flex flex-col leading-none items-end">
          <span className="text-xl xl:text-3xl 2xl:text-4xl font-display-bold tracking-tight" style={{ color: '#ffffff', textShadow: '0 0 30px rgba(255,255,255,0.15)' }}>OFFLINE</span>
          <span className="text-xl xl:text-3xl 2xl:text-4xl font-display-bold tracking-tight" style={{
            color: 'transparent',
            WebkitTextStroke: '1.5px rgba(139,92,246,0.5)',
          }}>GRAND FINALE</span>
        </div>
      </div>

      {/* ── Hero content ── */}
      <div className="relative z-10 max-w-3xl xl:max-w-4xl mx-auto pointer-events-none select-none w-full px-2">
        <p className="text-purple-400 text-xs tracking-[0.35em] uppercase mb-5 font-mono-bold">
          Pirate Multiverse Hackathon
        </p>

        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white leading-[1.05] mb-4 font-display-bold">
          THE GRAND
          <br />
          <span className="purple-gradient-text glow-purple">PIRATE VOYAGE</span>
        </h1>

        <p className="text-purple-300 text-base sm:text-lg md:text-2xl mb-3 font-display-bold-italic">
          Code the Seas. Claim the Treasure.
        </p>

        <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-10 font-body-bold px-2">
          An immersive pirate-themed hackathon where crews sail through dangerous seas of innovation, solve challenges, unlock Royal Guards, and battle for the Final Treasure.
          Build your crew, choose your route, survive the storms, and reach the Final Island.        </p>

        {/* Floating stats — shown below xl (where side stats are hidden) */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-10 xl:hidden">
          {[
            'Endless Innovation',
            'Guardian Mentors',
            'Pirate Team Based Voyage',
            'Offline Grand Finale',
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
        <div className="flex items-center justify-center gap-1 sm:gap-3 md:gap-5 mb-10 sm:mb-12">
          <CountdownUnit value={timeLeft.days} label="Days" />
          <span className="text-purple-500 text-xl sm:text-3xl font-mono-bold mb-5 sm:mb-6">:</span>
          <CountdownUnit value={timeLeft.hours} label="Hours" />
          <span className="text-purple-500 text-xl sm:text-3xl font-mono-bold mb-5 sm:mb-6">:</span>
          <CountdownUnit value={timeLeft.minutes} label="Minutes" />
          <span className="text-purple-500 text-xl sm:text-3xl font-mono-bold mb-5 sm:mb-6">:</span>
          <CountdownUnit value={timeLeft.seconds} label="Seconds" />
        </div>

        {/* CTA buttons */}
        <div className="hero-cta-group relative flex flex-wrap justify-center gap-3 sm:gap-4 pointer-events-auto" style={{ zIndex: 30 }}>
          <BluetoothKey label="Register Your Crew" href="#register" variant="primary" />
          <BluetoothKey label="Explore the Timeline" href="#timeline" variant="secondary" />
          <BluetoothKey label="Meet the Guardians" href="#guardians" variant="secondary" />
        </div>
      </div>

      {/* Quote — sits above bottom nav on mobile, normal on desktop */}
      <div className="hero-quote absolute left-0 right-0 z-30 flex justify-center pointer-events-none px-6">
        <p className="text-purple-200 text-xs sm:text-base md:text-xl lg:text-2xl font-display-italic text-center" style={{ textShadow: '0 0 12px rgba(216,180,254,0.5)' }}>
          "Not all treasures are gold — some are innovation."
        </p>
      </div>

      <SectionBlurEdges variant="hero" />
    </section>
  );
}
