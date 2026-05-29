import { useEffect, useRef, useState, memo, useCallback } from 'react';
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

/* ─── Interactive Particle Network Canvas ────────────────────────────────── */
function ParticleCanvas() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W, H, particles;

    const COLORS = [
      'rgba(168,85,247,',   // purple
      'rgba(139,92,246,',   // violet
      'rgba(192,132,252,',  // light purple
      'rgba(109,40,217,',   // deep purple
      'rgba(216,180,254,',  // lavender
    ];

    function resize() {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      init();
    }

    function init() {
      const count = Math.min(Math.floor((W * H) / 9000), 120);
      particles = Array.from({ length: count }, () => {
        // Give each particle a fixed base drift speed so they always move
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.25 + Math.random() * 0.35;
        return {
          x: Math.random() * W,
          y: Math.random() * H,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          baseVx: Math.cos(angle) * speed,
          baseVy: Math.sin(angle) * speed,
          r: Math.random() * 2 + 1,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          opacity: Math.random() * 0.5 + 0.2,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.015 + Math.random() * 0.015,
        };
      });
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.25;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(139,92,246,${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Mouse interaction — draw bright connection to nearby particles
        const mdx = a.x - mouse.current.x;
        const mdy = a.y - mouse.current.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 160) {
          const alpha = (1 - mdist / 160) * 0.6;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.current.x, mouse.current.y);
          ctx.strokeStyle = `rgba(192,132,252,${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Draw particles
      particles.forEach(p => {
        p.pulse += p.pulseSpeed;
        const pulsedR = p.r + Math.sin(p.pulse) * 0.5;
        const pulsedOpacity = p.opacity + Math.sin(p.pulse) * 0.1;

        // Glow
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, pulsedR * 4);
        grad.addColorStop(0, p.color + pulsedOpacity + ')');
        grad.addColorStop(1, p.color + '0)');
        ctx.beginPath();
        ctx.arc(p.x, p.y, pulsedR * 4, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, pulsedR, 0, Math.PI * 2);
        ctx.fillStyle = p.color + (pulsedOpacity + 0.3) + ')';
        ctx.fill();

        // Mouse repulsion — strong push away
        const repDx = p.x - mouse.current.x;
        const repDy = p.y - mouse.current.y;
        const repDist = Math.sqrt(repDx * repDx + repDy * repDy);
        if (repDist < 120 && repDist > 0) {
          const force = (120 - repDist) / 120 * 1.2;
          p.vx += (repDx / repDist) * force;
          p.vy += (repDy / repDist) * force;
        }

        // Clamp max speed (repelled particles can go faster)
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const maxSpeed = repDist < 120 ? 4.0 : 0.7;
        if (speed > maxSpeed) {
          p.vx = (p.vx / speed) * maxSpeed;
          p.vy = (p.vy / speed) * maxSpeed;
        }

        // Gently steer back toward base drift velocity (galaxy drift always on)
        p.vx += (p.baseVx - p.vx) * 0.012;
        p.vy += (p.baseVy - p.vy) * 0.012;

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges
        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10;
        if (p.y > H + 10) p.y = -10;
      });

      animRef.current = requestAnimationFrame(draw);
    }

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMouseLeave = () => { mouse.current = { x: -9999, y: -9999 }; };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    draw();

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);

    return () => {
      cancelAnimationFrame(animRef.current);
      ro.disconnect();
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 1, pointerEvents: 'auto' }}
    />
  );
}

/* ─── Floating orbs ──────────────────────────────────────────────────────── */
function FloatingOrbs() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {/* Large center orb */}
      <div className="absolute rounded-full"
        style={{
          width: 'clamp(400px, 80vw, 900px)',
          height: 'clamp(400px, 80vw, 900px)',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -55%)',
          background: 'radial-gradient(circle, rgba(88,28,135,0.22) 0%, rgba(139,92,246,0.08) 40%, transparent 70%)',
          animation: 'orbPulse 8s ease-in-out infinite',
        }}
      />
      {/* Top-left accent */}
      <div className="absolute rounded-full"
        style={{
          width: 300, height: 300,
          top: '-80px', left: '-60px',
          background: 'radial-gradient(circle, rgba(109,40,217,0.18) 0%, transparent 70%)',
          animation: 'orbPulse 11s ease-in-out infinite reverse',
        }}
      />
      {/* Bottom-right accent */}
      <div className="absolute rounded-full"
        style={{
          width: 250, height: 250,
          bottom: '10%', right: '-40px',
          background: 'radial-gradient(circle, rgba(168,85,247,0.14) 0%, transparent 70%)',
          animation: 'orbPulse 9s ease-in-out infinite 2s',
        }}
      />
      <style>{`
        @keyframes orbPulse {
          0%, 100% { transform: translate(-50%, -55%) scale(1); opacity: 0.8; }
          50%       { transform: translate(-50%, -55%) scale(1.12); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

/* ─── Subtle grid overlay ────────────────────────────────────────────────── */
function GridOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          linear-gradient(rgba(139,92,246,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(139,92,246,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 80%)',
      }} />
    </div>
  );
}

/* ─── Hero ───────────────────────────────────────────────────────────────── */
export default function Hero() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const sectionRef = useRef(null);

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
      style={{ background: '#08000f' }}
    >
      {/* Layered background */}
      <FloatingOrbs />
      <GridOverlay />
      <ParticleCanvas />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #08000f)', zIndex: 2 }} />

      {/* ── Side stats — left column ── */}
      <div className="absolute left-4 xl:left-8 top-1/2 -translate-y-1/2 z-10 flex-col gap-8 xl:gap-10 pointer-events-none select-none hidden xl:flex">
        <div className="flex flex-col leading-none items-start">
          <span className="text-xl xl:text-3xl 2xl:text-4xl font-display-bold tracking-tight" style={{ color: '#ffffff', textShadow: '0 0 30px rgba(255,255,255,0.15)' }}>ENDLESS</span>
          <span className="text-xl xl:text-3xl 2xl:text-4xl font-display-bold tracking-tight" style={{ color: 'transparent', WebkitTextStroke: '1.5px rgba(139,92,246,0.5)' }}>INNOVATION</span>
        </div>
        <div className="flex flex-col leading-none items-start">
          <span className="text-xl xl:text-3xl 2xl:text-4xl font-display-bold tracking-tight" style={{ color: '#ffffff', textShadow: '0 0 30px rgba(255,255,255,0.15)' }}>GUARDIAN</span>
          <span className="text-xl xl:text-3xl 2xl:text-4xl font-display-bold tracking-tight" style={{ color: 'transparent', WebkitTextStroke: '1.5px rgba(139,92,246,0.5)' }}>MENTORS</span>
        </div>
      </div>

      {/* ── Side stats — right column ── */}
      <div className="absolute right-4 xl:right-8 top-1/2 -translate-y-1/2 z-10 flex-col gap-8 xl:gap-10 pointer-events-none select-none items-end hidden xl:flex">
        <div className="flex flex-col leading-none items-end">
          <span className="text-xl xl:text-3xl 2xl:text-4xl font-display-bold tracking-tight" style={{ color: '#ffffff', textShadow: '0 0 30px rgba(255,255,255,0.15)' }}>TEAM-BASED</span>
          <span className="text-xl xl:text-3xl 2xl:text-4xl font-display-bold tracking-tight" style={{ color: 'transparent', WebkitTextStroke: '1.5px rgba(139,92,246,0.5)' }}>HACKATHON</span>
        </div>
        <div className="flex flex-col leading-none items-end">
          <span className="text-xl xl:text-3xl 2xl:text-4xl font-display-bold tracking-tight" style={{ color: '#ffffff', textShadow: '0 0 30px rgba(255,255,255,0.15)' }}>OFFLINE</span>
          <span className="text-xl xl:text-3xl 2xl:text-4xl font-display-bold tracking-tight" style={{ color: 'transparent', WebkitTextStroke: '1.5px rgba(139,92,246,0.5)' }}>GRAND FINALE</span>
        </div>
      </div>

      {/* ── Hero content ── */}
      <div className="relative z-10 max-w-3xl xl:max-w-4xl mx-auto pointer-events-none select-none w-full px-2">
        <p className="text-purple-400 text-xs tracking-[0.35em] uppercase mb-5 font-mono-bold">
          AWS Student Builder Group · Hackathon 2026
        </p>

        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white leading-[1.05] mb-6 font-display-bold">
          THE GRAND
          <br />
          <span className="purple-gradient-text glow-purple">HACKATHON</span>
        </h1>

        {/* ── Hackathon name — #include<1.0> ── */}
        <div className="relative inline-block mb-4 select-none">
          {/* Animated shimmer sweep */}
          <style>{`
            @keyframes shimmerSweep {
              0%   { transform: translateX(-100%); }
              100% { transform: translateX(300%); }
            }
            @keyframes borderPulse {
              0%, 100% { opacity: 0.5; }
              50%       { opacity: 1; }
            }
            @keyframes glowPulse {
              0%, 100% { opacity: 0.6; }
              50%       { opacity: 1; }
            }
          `}</style>

          {/* Outer glow halo */}
          <div className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(139,92,246,0.35) 0%, transparent 70%)',
              filter: 'blur(16px)',
              animation: 'glowPulse 3s ease-in-out infinite',
            }}
          />

          {/* Main name block */}
          <div
            className="relative px-6 sm:px-10 py-3 sm:py-4 rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(109,40,217,0.25) 0%, rgba(15,0,30,0.8) 50%, rgba(109,40,217,0.2) 100%)',
              border: '1px solid rgba(168,85,247,0.45)',
              boxShadow: '0 0 40px rgba(139,92,246,0.25), inset 0 1px 0 rgba(255,255,255,0.07)',
            }}
          >
            {/* Shimmer sweep */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(105deg, transparent 40%, rgba(192,132,252,0.15) 50%, transparent 60%)',
                animation: 'shimmerSweep 3.5s ease-in-out infinite',
              }}
            />

            {/* Top-left corner accent */}
            <div className="absolute top-0 left-0 w-6 h-6 pointer-events-none"
              style={{ borderTop: '2px solid rgba(168,85,247,0.8)', borderLeft: '2px solid rgba(168,85,247,0.8)', borderRadius: '8px 0 0 0' }} />
            {/* Bottom-right corner accent */}
            <div className="absolute bottom-0 right-0 w-6 h-6 pointer-events-none"
              style={{ borderBottom: '2px solid rgba(168,85,247,0.8)', borderRight: '2px solid rgba(168,85,247,0.8)', borderRadius: '0 0 8px 0' }} />

            {/* The name */}
            <div className="relative flex items-baseline justify-center gap-0.5 sm:gap-1">
              {/* # */}
              <span
                className="font-mono-bold text-2xl sm:text-4xl md:text-5xl"
                style={{ color: '#a78bfa', textShadow: '0 0 20px rgba(167,139,250,0.8)' }}
              >#</span>
              {/* include */}
              <span
                className="font-mono-bold text-2xl sm:text-4xl md:text-5xl tracking-tight"
                style={{
                  background: 'linear-gradient(90deg, #e9d5ff 0%, #c084fc 40%, #a855f7 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: 'none',
                  filter: 'drop-shadow(0 0 12px rgba(192,132,252,0.6))',
                }}
              >include</span>
              {/* < */}
              <span
                className="font-mono-bold text-xl sm:text-3xl md:text-4xl"
                style={{ color: '#7c3aed', textShadow: '0 0 16px rgba(124,58,237,0.9)' }}
              >&lt;</span>
              {/* 1.0 */}
              <span
                className="font-mono-bold text-2xl sm:text-4xl md:text-5xl"
                style={{
                  background: 'linear-gradient(90deg, #f0abfc 0%, #e879f9 50%, #c026d3 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 0 14px rgba(232,121,249,0.7))',
                }}
              >1.0</span>
              {/* > */}
              <span
                className="font-mono-bold text-xl sm:text-3xl md:text-4xl"
                style={{ color: '#7c3aed', textShadow: '0 0 16px rgba(124,58,237,0.9)' }}
              >&gt;</span>
            </div>

            {/* Subtitle line */}
            <p className="relative text-center text-purple-400/70 text-[10px] sm:text-xs font-mono-bold tracking-[0.3em] uppercase mt-1 hidden">
              The Grand Hackathon
            </p>
          </div>
        </div>

        <p className="text-purple-300 text-base sm:text-lg md:text-2xl mb-3 font-display-bold-italic">
          Code the Future. Build What Matters.
        </p>

        <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-10 font-body-bold px-2">
          An immersive team-based hackathon where builders tackle real-world challenges, get mentored by industry experts, and compete for the Grand Finale.
          Form your team, choose your track, build your solution, and make it to the stage.
        </p>

        {/* Floating stats — mobile/tablet */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-10 xl:hidden">
          {['Endless Innovation', 'Guardian Mentors', 'Team-Based Hackathon', 'Offline Grand Finale'].map((text) => (
            <span key={text} className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-purple-700/40 bg-purple-950/30 text-purple-300 text-xs font-body-bold tracking-wide">
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
          <BluetoothKey label="Register Your Team" href="#register" variant="primary" />
          <BluetoothKey label="Explore the Timeline" href="#timeline" variant="secondary" />
          <BluetoothKey label="Meet the Mentors" href="#guardians" variant="secondary" />
        </div>
      </div>

      {/* Quote */}
      <div className="hero-quote absolute left-0 right-0 z-30 flex justify-center pointer-events-none px-6">
        <p className="text-purple-200 text-xs sm:text-base md:text-xl lg:text-2xl font-display-italic text-center" style={{ textShadow: '0 0 12px rgba(216,180,254,0.5)' }}>
          "The best way to predict the future is to build it."
        </p>
      </div>

      <SectionBlurEdges variant="hero" />
    </section>
  );
}
