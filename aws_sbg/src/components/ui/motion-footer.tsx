"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import SectionBlurEdges from "./SectionBlurEdges";
import GlitchText from "./GlitchText";

// Register ScrollTrigger safely for React
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// -------------------------------------------------------------------------
// 1. THEME-ADAPTIVE INLINE STYLES
// -------------------------------------------------------------------------
const STYLES = `
.cinematic-footer-wrapper {
  font-family: 'Amazon Ember', 'Amazon Ember Display', sans-serif;
  -webkit-font-smoothing: antialiased;
  --pill-bg-1: color-mix(in oklch, var(--foreground) 3%, transparent);
  --pill-bg-2: color-mix(in oklch, var(--foreground) 1%, transparent);
  --pill-shadow: color-mix(in oklch, var(--background) 50%, transparent);
  --pill-highlight: color-mix(in oklch, var(--foreground) 10%, transparent);
  --pill-inset-shadow: color-mix(in oklch, var(--background) 80%, transparent);
  --pill-border: color-mix(in oklch, var(--foreground) 8%, transparent);
  --pill-bg-1-hover: color-mix(in oklch, var(--foreground) 8%, transparent);
  --pill-bg-2-hover: color-mix(in oklch, var(--foreground) 2%, transparent);
  --pill-border-hover: color-mix(in oklch, var(--foreground) 20%, transparent);
  --pill-shadow-hover: color-mix(in oklch, var(--background) 70%, transparent);
  --pill-highlight-hover: color-mix(in oklch, var(--foreground) 20%, transparent);
  /* Map site tokens to shadcn-style tokens */
  --foreground: 255 255 255;
  --background: 8 0 15;
  --primary: 139 92 246;
  --secondary: 168 85 247;
  --muted-foreground: rgba(168, 162, 185, 1);
  --destructive: 239 68 68;
  --border: rgba(139, 92, 246, 0.2);
}

@keyframes footer-breathe {
  0%   { transform: translate(-50%, -50%) scale(1);   opacity: 0.6; }
  100% { transform: translate(-50%, -50%) scale(1.1); opacity: 1;   }
}
@keyframes footer-scroll-marquee {
  from { transform: translateX(0);    }
  to   { transform: translateX(-50%); }
}
@keyframes footer-heartbeat {
  0%,  100% { transform: scale(1);   filter: drop-shadow(0 0 5px rgba(239,68,68,0.5));  }
  15%, 45%  { transform: scale(1.2); filter: drop-shadow(0 0 10px rgba(239,68,68,0.8)); }
  30%       { transform: scale(1);   }
}

.animate-footer-breathe       { animation: footer-breathe 8s ease-in-out infinite alternate; will-change: transform, opacity; }
.animate-footer-scroll-marquee{ animation: footer-scroll-marquee 40s linear infinite; will-change: transform; }
.animate-footer-heartbeat      { animation: footer-heartbeat 2s cubic-bezier(0.25,1,0.5,1) infinite; }

.footer-bg-grid {
  background-size: 60px 60px;
  background-image:
    linear-gradient(to right,  rgba(139,92,246,0.06) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(139,92,246,0.06) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
}

.footer-aurora {
  background: radial-gradient(
    circle at 50% 50%,
    rgba(139,92,246,0.18) 0%,
    rgba(88,28,135,0.15)  40%,
    transparent           70%
  );
}

.footer-glass-pill {
  background: linear-gradient(135deg, rgba(139,92,246,0.18) 0%, rgba(88,28,135,0.12) 50%, rgba(139,92,246,0.1) 100%);
  box-shadow:
    0 8px 32px rgba(139,92,246,0.25),
    0 2px 8px rgba(0,0,0,0.4),
    inset 0 1px 1px rgba(255,255,255,0.12),
    inset 0 -1px 2px rgba(0,0,0,0.3);
  border: 1px solid rgba(168,85,247,0.45);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
}
.footer-glass-pill:hover {
  background: linear-gradient(135deg, rgba(139,92,246,0.35) 0%, rgba(109,40,217,0.25) 100%);
  border-color: rgba(168,85,247,0.75);
  box-shadow:
    0 20px 48px rgba(139,92,246,0.4),
    inset 0 1px 1px rgba(168,85,247,0.3);
  color: #ffffff;
}

.footer-giant-bg-text {
  font-size: 26vw;
  line-height: 0.75;
  font-weight: 900;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1px rgba(139,92,246,0.08);
  background: linear-gradient(180deg, rgba(139,92,246,0.12) 0%, transparent 60%);
  -webkit-background-clip: text;
  background-clip: text;
}

.footer-text-glow {
  background: linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.4) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0px 0px 20px rgba(139,92,246,0.3));
}
`;

// -------------------------------------------------------------------------
// 2. MAGNETIC BUTTON PRIMITIVE
// -------------------------------------------------------------------------
export type MagneticButtonProps =
  React.ButtonHTMLAttributes<HTMLButtonElement> &
    React.AnchorHTMLAttributes<HTMLAnchorElement> & {
      as?: React.ElementType;
    };

const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
  (
    { className, children, as: Component = "button", ...props },
    forwardedRef,
  ) => {
    const localRef = useRef<HTMLElement>(null);

    useEffect(() => {
      if (typeof window === "undefined") return;
      const element = localRef.current;
      if (!element) return;

      const ctx = gsap.context(() => {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = element.getBoundingClientRect();
          const h = rect.width / 2;
          const w = rect.height / 2;
          const x = e.clientX - rect.left - h;
          const y = e.clientY - rect.top - w;
          gsap.to(element, {
            x: x * 0.4,
            y: y * 0.4,
            rotationX: -y * 0.15,
            rotationY: x * 0.15,
            scale: 1.05,
            ease: "power2.out",
            duration: 0.4,
          });
        };
        const handleMouseLeave = () => {
          gsap.to(element, {
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            ease: "elastic.out(1, 0.3)",
            duration: 1.2,
          });
        };
        element.addEventListener("mousemove", handleMouseMove as EventListener);
        element.addEventListener("mouseleave", handleMouseLeave);
        return () => {
          element.removeEventListener(
            "mousemove",
            handleMouseMove as EventListener,
          );
          element.removeEventListener("mouseleave", handleMouseLeave);
        };
      }, element);

      return () => ctx.revert();
    }, []);

    return (
      <Component
        ref={(node: HTMLElement) => {
          (localRef as React.MutableRefObject<HTMLElement | null>).current =
            node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef)
            (
              forwardedRef as React.MutableRefObject<HTMLElement | null>
            ).current = node;
        }}
        className={cn("cursor-pointer", className)}
        {...props}
      >
        {children}
      </Component>
    );
  },
);
MagneticButton.displayName = "MagneticButton";

// -------------------------------------------------------------------------
// 3. MARQUEE ITEM — updated with hackathon content
// -------------------------------------------------------------------------
const MarqueeItem = () => (
  <div className="flex items-center space-x-12 px-6 font-body-bold">
    <span>Endless Innovation</span>
    <span className="text-purple-400/60 text-xs">◆</span>
    <span>Team-Based Hackathon</span>
    <span className="text-purple-500/60 text-xs">◆</span>
    <span>Guardian Mentors</span>
    <span className="text-purple-400/60 text-xs">◆</span>
    <span>Offline Grand Finale</span>
    <span className="text-purple-500/60 text-xs">◆</span>
    <span>Grand Finale · July 25</span>
    <span className="text-purple-400/60 text-xs">◆</span>
  </div>
);

// -------------------------------------------------------------------------
// 4. MAIN CINEMATIC FOOTER
// -------------------------------------------------------------------------
export function CinematicFooter() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !wrapperRef.current) return;

    const ctx = gsap.context(() => {
      // Background parallax
      gsap.fromTo(
        giantTextRef.current,
        { y: "10vh", scale: 0.8, opacity: 0 },
        {
          y: "0vh",
          scale: 1,
          opacity: 1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 80%",
            end: "bottom bottom",
            scrub: 1,
          },
        },
      );
      // Staggered content reveal
      gsap.fromTo(
        [headingRef.current, linksRef.current],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 40%",
            end: "bottom bottom",
            scrub: 1,
          },
        },
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* Curtain-reveal wrapper */}
      <div
        ref={wrapperRef}
        className="relative w-full"
        style={{
          height: "clamp(600px, 100svh, 100vh)",
          clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)",
        }}
      >
        {/* Fixed footer underneath everything */}
        <footer
          className="fixed bottom-0 left-0 flex w-full flex-col justify-between overflow-hidden cinematic-footer-wrapper"
          style={{
            height: "clamp(600px, 100svh, 100vh)",
            background: "#08000f",
            color: "#ffffff",
          }}
        >
          {/* Grid */}
          <div className="footer-bg-grid absolute inset-0 z-0 pointer-events-none" />

          {/* Giant background text — pushed to bottom so it doesn't overlap content */}
          <div
            ref={giantTextRef}
            className="footer-giant-bg-text absolute -bottom-[2vh] left-1/2 -translate-x-1/2 whitespace-nowrap z-0 pointer-events-none select-none font-display-bold"
          >
            BUILD
          </div>

          {/* ── Marquee — fixed strip always flush under the navbar ── */}
          <div
            className="fixed left-0 w-full overflow-hidden border-b border-purple-800/30 py-3 sm:py-4 z-40 shadow-2xl"
            style={{
              top: "56px", /* matches navbar h-14 = 3.5rem = 56px */
              background: "rgba(8,0,15,0.92)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          >
            <div
              className="flex w-max animate-footer-scroll-marquee text-xs md:text-sm tracking-[0.3em] uppercase"
              style={{ color: "rgba(168,162,185,0.8)" }}
            >
              <MarqueeItem />
              <MarqueeItem />
            </div>
          </div>

          {/* ── Main center content ── */}
          <div className="relative z-10 flex flex-1 flex-col items-center justify-start pt-24 sm:pt-28 lg:pt-52 w-full">

            {/* Story block — only shown on large screens where there's room beside the heading */}
            <div
              className="hidden lg:block absolute left-10 xl:left-16 text-left"
              style={{ top: 'clamp(11rem, 20vh, 15rem)', maxWidth: '280px' }}
            >
              <p className="text-gray-300 text-base font-display-bold-italic leading-relaxed mb-3">
                Registrations are open.<br />
                Expert mentors are standing by.<br />
                The Grand Finale stage is being set.
              </p>
              <p className="text-purple-300 text-base font-display-bold-italic">
                Will your team make it to the top?
              </p>
            </div>

            {/* Story block for mobile + tablet — inline, above heading, no overlap */}
            <div className="lg:hidden w-full max-w-lg text-center mb-8 px-6">
              <p className="text-gray-200 text-lg sm:text-xl font-display-bold-italic leading-relaxed mb-3">
                Registrations are open. Expert mentors are standing by.
              </p>
              <p className="text-purple-300 text-lg sm:text-xl font-display-bold-italic">
                Will your team make it to the top?
              </p>
            </div>

            {/* Centered content */}
            <h2
              ref={headingRef}
              className="text-5xl sm:text-5xl md:text-6xl font-black tracking-tighter mb-8 sm:mb-10 text-center font-display-bold px-4"
            >
              <GlitchText
                speed={1}
                enableShadows={true}
                enableOnHover={false}
                style={{
                  filter: "drop-shadow(0px 0px 24px rgba(139,92,246,0.5))",
                }}
              >
                Ready to Build?
              </GlitchText>
            </h2>

            <div
              ref={linksRef}
              className="flex flex-col items-center gap-5 sm:gap-6 w-full px-6 sm:px-4"
            >
              {/* Primary CTA pills */}
              <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 w-full sm:w-auto">
                <MagneticButton
                  as="a"
                  href="https://docs.google.com/forms/d/e/1FAIpQLScqy6GeNnTs3BPmAgFw73AAZ3RA6WenwfTFCrWYIKZDK0GGYQ/viewform?usp=publish-editor"
                  className="footer-glass-pill w-full sm:w-auto px-8 sm:px-10 py-5 sm:py-5 rounded-2xl font-bold text-lg sm:text-base flex items-center justify-center gap-3 group font-body-bold"
                  style={{ color: "#ffffff", letterSpacing: "0.03em" }}
                >
                  Register Your Team
                </MagneticButton>
              </div>

              {/* Quote */}
              <p className="text-purple-400/80 text-base sm:text-sm font-display-italic tracking-wide mt-1 text-center">
                "Legends are forged beyond the storm."
              </p>
            </div>
          </div>

          {/* ── Bottom bar ── */}
          <div className="footer-bottom-bar relative z-20 w-full px-4 sm:px-6 md:px-12 flex flex-col md:flex-row items-center justify-end gap-4 sm:gap-6">
            {/* Back to top */}
            <MagneticButton
              as="button"
              onClick={scrollToTop}
              className="w-12 h-12 rounded-full footer-glass-pill flex items-center justify-center group"
              style={{ color: "rgba(168,162,185,0.7)" }}
            >
              <svg
                className="w-5 h-5 transform group-hover:-translate-y-1.5 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
            </MagneticButton>
          </div>

          <SectionBlurEdges showTop={false} showBottom={false} />
        </footer>
      </div>
    </>
  );
}
