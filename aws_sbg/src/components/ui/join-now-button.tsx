import React from "react";
import { motion } from "framer-motion";

// Compact beam paths sized around a ~140×40 button centered in a 260×100 canvas
const BEAMS = [
  // left beam — exits left
  {
    path: "M80 50 H20 C14 50 10 46 10 40 V10",
    gradientConfig: {
      initial: { x1: "100%", x2: "100%", y1: "0%",   y2: "20%"  },
      animate: { x1: ["100%","0%","0%"],  x2: ["80%","0%","0%"],  y1: ["0%","0%","120%"],  y2: ["20%","20%","140%"] },
      transition: { duration: 1.8, repeat: Infinity, repeatType: "loop", ease: "linear", repeatDelay: 1.5, delay: 0 },
    },
  },
  // right beam — exits right
  {
    path: "M180 50 H240 C246 50 250 46 250 40 V10",
    gradientConfig: {
      initial: { x1: "0%",   x2: "0%",   y1: "0%",   y2: "20%"  },
      animate: { x1: ["0%","100%","100%"], x2: ["20%","100%","100%"], y1: ["0%","0%","120%"], y2: ["20%","20%","140%"] },
      transition: { duration: 1.8, repeat: Infinity, repeatType: "loop", ease: "linear", repeatDelay: 1.5, delay: 0.6 },
    },
  },
  // bottom-left beam
  {
    path: "M100 62 V80 C100 86 96 90 90 90 H30",
    gradientConfig: {
      initial: { x1: "0%",   x2: "20%",  y1: "0%",   y2: "0%"   },
      animate: { x1: ["0%","0%","120%"],  x2: ["20%","20%","140%"], y1: ["0%","100%","100%"], y2: ["0%","80%","80%"] },
      transition: { duration: 1.8, repeat: Infinity, repeatType: "loop", ease: "linear", repeatDelay: 1.5, delay: 1.2 },
    },
  },
  // bottom-right beam
  {
    path: "M160 62 V80 C160 86 164 90 170 90 H230",
    gradientConfig: {
      initial: { x1: "100%", x2: "80%",  y1: "0%",   y2: "0%"   },
      animate: { x1: ["100%","100%","-20%"], x2: ["80%","80%","-40%"], y1: ["0%","100%","100%"], y2: ["0%","80%","80%"] },
      transition: { duration: 1.8, repeat: Infinity, repeatType: "loop", ease: "linear", repeatDelay: 1.5, delay: 0.3 },
    },
  },
];

const GRADIENT_COLORS = { start: "#c084fc", middle: "#a855f7", end: "#7c3aed" };

export function JoinNowButton({ href = "#register" }: { href?: string }) {
  return (
    <a href={href} className="relative inline-flex items-center justify-center group">
      {/* Animated SVG beams — hidden on very small screens to avoid overflow */}
      <svg
        width="260"
        height="100"
        viewBox="0 0 260 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 pointer-events-none hidden sm:block"
        style={{ left: "50%", top: "50%", transform: "translate(-50%,-50%)" }}
      >
        {BEAMS.map((beam, i) => (
          <React.Fragment key={i}>
            <path d={beam.path} stroke="rgba(139,92,246,0.15)" strokeWidth="1" />
            <path d={beam.path} stroke={`url(#jn-grad${i})`} strokeWidth="1.5" strokeLinecap="round" />
          </React.Fragment>
        ))}
        <defs>
          {BEAMS.map((beam, i) => (
            <motion.linearGradient
              key={i}
              id={`jn-grad${i}`}
              gradientUnits="userSpaceOnUse"
              initial={beam.gradientConfig.initial}
              animate={beam.gradientConfig.animate}
              // @ts-ignore
              transition={beam.gradientConfig.transition}
            >
              <stop offset="0%"   stopColor={GRADIENT_COLORS.start}  stopOpacity="0" />
              <stop offset="30%"  stopColor={GRADIENT_COLORS.start}  stopOpacity="1" />
              <stop offset="60%"  stopColor={GRADIENT_COLORS.middle} stopOpacity="1" />
              <stop offset="100%" stopColor={GRADIENT_COLORS.end}    stopOpacity="0" />
            </motion.linearGradient>
          ))}
        </defs>
      </svg>

      {/* Glassmorphism pill */}
      <span
        className="relative z-10 px-6 py-2 rounded-full text-sm font-body-bold tracking-wider transition-all duration-300 group-hover:scale-105 select-none overflow-hidden"
        style={{
          /* frosted glass base */
          background: "linear-gradient(135deg, rgba(168,85,247,0.18) 0%, rgba(109,40,217,0.10) 100%)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          /* thin purple border — top edge brighter for glass highlight */
          border: "1px solid rgba(192,132,252,0.35)",
          /* outer purple glow + inner highlight */
          boxShadow:
            "0 0 18px rgba(168,85,247,0.45), " +   /* outer glow */
            "0 0 6px  rgba(168,85,247,0.25), " +   /* soft halo */
            "inset 0 1px 0 rgba(255,255,255,0.15)", /* top-edge glass sheen */
          color: "rgba(233,213,255,1)",             /* purple-100 */
        }}
      >
        {/* inner top-edge highlight streak */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-full"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)",
          }}
        />
        Join Now
      </span>
    </a>
  );
}
