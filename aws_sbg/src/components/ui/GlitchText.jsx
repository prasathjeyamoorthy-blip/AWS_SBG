import { useEffect, useRef } from 'react';

export default function GlitchText({
  children,
  speed = 1,
  enableShadows = false,
  enableOnHover = false,
  className = '',
  style = {},
}) {
  const aRef = useRef(null);
  const bRef = useRef(null);
  const timerRef = useRef(null);
  const activeRef = useRef(!enableOnHover);

  function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
  }

  function randomClip() {
    const top = randomBetween(0, 85);
    const height = randomBetween(5, 25);
    const bottom = Math.max(0, 100 - top - height);
    return `inset(${top.toFixed(1)}% 0 ${bottom.toFixed(1)}% 0)`;
  }

  function applyGlitch() {
    const a = aRef.current;
    const b = bRef.current;
    if (!a || !b) return;

    const offsetA = randomBetween(-12, 12).toFixed(1);
    const offsetB = randomBetween(-12, 12).toFixed(1);
    const skewA = randomBetween(-2, 2).toFixed(2);

    a.style.clipPath = randomClip();
    a.style.transform = `translateX(${offsetA}px) skewX(${skewA}deg)`;
    a.style.opacity = randomBetween(0.7, 1).toFixed(2);

    b.style.clipPath = randomClip();
    b.style.transform = `translateX(${offsetB}px)`;
    b.style.opacity = randomBetween(0.6, 1).toFixed(2);
  }

  function clearGlitch() {
    const a = aRef.current;
    const b = bRef.current;
    if (a) { a.style.clipPath = 'inset(50% 0 50% 0)'; a.style.transform = 'none'; a.style.opacity = '0'; }
    if (b) { b.style.clipPath = 'inset(50% 0 50% 0)'; b.style.transform = 'none'; b.style.opacity = '0'; }
  }

  function scheduleNext() {
    if (!activeRef.current) return;

    // Burst: rapid glitch frames
    const burstFrames = Math.floor(randomBetween(2, 6));
    let frame = 0;

    function burst() {
      if (!activeRef.current) return;
      if (frame < burstFrames) {
        applyGlitch();
        frame++;
        timerRef.current = setTimeout(burst, randomBetween(30, 80) / speed);
      } else {
        // Pause between bursts
        clearGlitch();
        timerRef.current = setTimeout(scheduleNext, randomBetween(2000, 4000) / speed);
      }
    }
    burst();
  }

  useEffect(() => {
    if (!enableOnHover) {
      activeRef.current = true;
      scheduleNext();
    }
    return () => clearTimeout(timerRef.current);
  }, []);

  const layerBase = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    color: 'inherit',
    pointerEvents: 'none',
    clipPath: 'inset(50% 0 50% 0)',
    opacity: 0,
    whiteSpace: 'nowrap',
  };

  return (
    <span
      className={className}
      style={{
        position: 'relative',
        display: 'inline-block',
        color: '#fff',
        ...style,
      }}
      onMouseEnter={() => {
        if (enableOnHover) { activeRef.current = true; scheduleNext(); }
      }}
      onMouseLeave={() => {
        if (enableOnHover) { activeRef.current = false; clearTimeout(timerRef.current); clearGlitch(); }
      }}
    >
      {children}

      {/* Glitch layer A — slight red tint */}
      <span
        ref={aRef}
        aria-hidden="true"
        style={{
          ...layerBase,
          textShadow: enableShadows ? '-4px 0 rgba(255,50,50,0.9)' : '2px 0 rgba(255,255,255,0.9)',
        }}
      >
        {children}
      </span>

      {/* Glitch layer B — slight cyan tint */}
      <span
        ref={bRef}
        aria-hidden="true"
        style={{
          ...layerBase,
          textShadow: enableShadows ? '4px 0 rgba(0,220,255,0.9)' : '-2px 0 rgba(255,255,255,0.9)',
        }}
      >
        {children}
      </span>
    </span>
  );
}
