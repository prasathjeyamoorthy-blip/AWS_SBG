"use client";
import React, { useEffect, useRef, useState, memo } from "react";
import { motion, useAnimation } from "framer-motion";
import { twMerge } from "tailwind-merge";

function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export const TextRevealCard = ({
  text,
  revealText,
  children,
  className,
  bgImage,
  bgPosition = 'center center',
  flipImage = false,
  imageRotate = 0,
  overlayOpacity = 0.55,
}: {
  text: string;
  revealText: string;
  children?: React.ReactNode;
  className?: string;
  bgImage?: string;
  bgPosition?: string;
  flipImage?: boolean;
  imageRotate?: number;
  overlayOpacity?: number;
}) => {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const controls = useAnimation();
  const lineControls = useAnimation();

  function mouseEnterHandler() {
    setIsMouseOver(true);
    controls.start({
      clipPath: "inset(0 0% 0 0)",
      opacity: 1,
      transition: { duration: 0.8, ease: "easeInOut" },
    });
    lineControls.start({
      left: "100%",
      opacity: [0, 1, 0],
      transition: { duration: 0.8, ease: "easeInOut" },
    });
  }

  function mouseLeaveHandler() {
    setIsMouseOver(false);
    controls.start({
      clipPath: "inset(0 100% 0 0)",
      opacity: 0,
      transition: { duration: 0.5, ease: "easeInOut" },
    });
    lineControls.start({
      left: "0%",
      opacity: 0,
      transition: { duration: 0 },
    });
  }

  return (
    <div
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      className={cn(
        "border border-white/[0.08] w-full rounded-2xl p-6 relative overflow-hidden cursor-default",
        className
      )}
      style={{
        background: bgImage ? 'transparent' : '#1d1c20',
        minHeight: '320px',
      }}
    >
      {/* Background image layer */}
      {bgImage && (
        <>
          <img
            src={bgImage}
            alt=""
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: bgPosition,
              transform: [
                flipImage ? 'scaleX(-1)' : '',
                imageRotate ? `rotate(${imageRotate}deg)` : '',
              ].filter(Boolean).join(' ') || 'none',
              transformOrigin: 'center center',
              transformOrigin: 'center center',
              zIndex: 0,
              borderRadius: '1rem',
            }}
          />
          {/* Dark gradient overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(to bottom, rgba(0,0,0,${overlayOpacity - 0.2}) 0%, rgba(0,0,0,${overlayOpacity}) 45%, rgba(0,0,0,${Math.min(overlayOpacity + 0.25, 1)}) 100%)`,
              zIndex: 1,
              borderRadius: '1rem',
            }}
          />
        </>
      )}
      {/* All content sits above the image */}
      <div style={{ position: 'relative', zIndex: 2 }}>
      {children}

      <div className="h-28 relative flex items-center overflow-hidden">
        {/* Revealed text layer — sweeps in on hover */}
        <motion.div
          initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
          animate={controls}
          className="absolute inset-0 z-20 will-change-transform flex items-center"
          style={{ background: 'transparent' }}
        >
          <p
            style={{ textShadow: "4px 4px 15px rgba(0,0,0,0.5)" }}
            className="text-sm sm:text-base font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-300 leading-relaxed"
          >
            {revealText}
          </p>
        </motion.div>

        {/* Scrubber line */}
        <motion.div
          initial={{ left: "0%", opacity: 0 }}
          animate={lineControls}
          className="h-28 w-[6px] bg-gradient-to-b from-transparent via-neutral-500 to-transparent absolute z-50 will-change-transform"
        />

        {/* Base text layer */}
        <div className="overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,white,transparent)] w-full">
          <p className="text-sm sm:text-base font-bold bg-clip-text text-transparent bg-[#323238] leading-relaxed">
            {text}
          </p>
          <MemoizedStars />
        </div>
      </div>
      </div>
    </div>
  );
};

export const TextRevealCardTitle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h2 className={twMerge("text-white text-lg mb-1 font-bold", className)}>
      {children}
    </h2>
  );
};

export const TextRevealCardDescription = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p className={twMerge("text-[#a9a9a9] text-sm mb-4 leading-relaxed", className)}>
      {children}
    </p>
  );
};

const Stars = () => {
  const random = () => Math.random();
  return (
    <div className="absolute inset-0">
      {[...Array(60)].map((_, i) => (
        <motion.span
          key={`star-${i}`}
          animate={{
            top: `calc(${random() * 100}% + ${Math.random() * 4 - 2}px)`,
            left: `calc(${random() * 100}% + ${Math.random() * 4 - 2}px)`,
            opacity: Math.random(),
            scale: [1, 1.2, 0],
          }}
          transition={{
            duration: random() * 10 + 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            top: `${random() * 100}%`,
            left: `${random() * 100}%`,
            width: "2px",
            height: "2px",
            backgroundColor: "white",
            borderRadius: "50%",
            zIndex: 1,
          }}
          className="inline-block"
        />
      ))}
    </div>
  );
};

const MemoizedStars = memo(Stars);
