"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent?: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const scaleDimensions = () => isMobile ? [0.92, 1] : [0.95, 1];

  const rotate = useTransform(scrollYProgress, [0, 0.5], [12, 0]);
  const scale  = useTransform(scrollYProgress, [0, 0.5], scaleDimensions());
  const translateY = useTransform(scrollYProgress, [0, 0.5], [40, 0]);

  return (
    <div ref={containerRef} className="relative w-full">
      {titleComponent && (
        <motion.div style={{ translateY }} className="max-w-5xl mx-auto text-center mb-4">
          {titleComponent}
        </motion.div>
      )}
      <motion.div
        style={{
          rotateX: rotate,
          scale,
          transformOrigin: "top center",
          transformPerspective: "1200px",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};
