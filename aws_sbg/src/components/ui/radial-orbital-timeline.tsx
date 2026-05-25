"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { ArrowRight, Link, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({ timelineData }: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [pulseEffect, setPulseEffect]     = useState<Record<number, boolean>>({});
  const [activeNodeId, setActiveNodeId]   = useState<number | null>(null);

  const containerRef  = useRef<HTMLDivElement>(null);
  const orbitRef      = useRef<HTMLDivElement>(null);
  const nodeRefs      = useRef<Record<number, HTMLDivElement | null>>({});
  const angleRef      = useRef(0);
  const autoRotateRef = useRef(true);
  const rafRef        = useRef<number>(0);

  const [radius, setRadius] = React.useState(200);

  // Responsive radius based on container width
  React.useEffect(() => {
    const updateRadius = () => {
      const w = window.innerWidth;
      if (w < 480) setRadius(110);
      else if (w < 640) setRadius(140);
      else if (w < 768) setRadius(165);
      else setRadius(200);
    };
    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  const RADIUS = radius;

  // ── RAF loop — mutates DOM directly, zero React re-renders ──
  const tick = useCallback((now: number, last: number) => {
    if (autoRotateRef.current) {
      const delta = now - last;
      angleRef.current = (angleRef.current + (delta / 50) * 0.3) % 360;
    }

    const total = timelineData.length;
    timelineData.forEach((item, index) => {
      const el = nodeRefs.current[item.id];
      if (!el) return;
      const angle   = ((index / total) * 360 + angleRef.current) % 360;
      const radian  = (angle * Math.PI) / 180;
      const x       = RADIUS * Math.cos(radian);
      const y       = RADIUS * Math.sin(radian);
      const opacity = Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2)));
      el.style.transform = `translate(${x}px, ${y}px)`;
      el.style.opacity   = String(opacity.toFixed(2));
    });

    rafRef.current = requestAnimationFrame((t) => tick(t, now));
  }, [timelineData]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame((t) => tick(t, t));
    return () => cancelAnimationFrame(rafRef.current);
  }, [tick]);

  const getRelatedItems = (itemId: number) =>
    timelineData.find((i) => i.id === itemId)?.relatedIds ?? [];

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const next: Record<number, boolean> = {};
      Object.keys(prev).forEach((k) => { next[parseInt(k)] = false; });
      next[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        autoRotateRef.current = false;
        // Snap rotation so clicked node faces front
        const idx = timelineData.findIndex((i) => i.id === id);
        angleRef.current = 270 - (idx / timelineData.length) * 360;
        const pulse: Record<number, boolean> = {};
        getRelatedItems(id).forEach((r) => { pulse[r] = true; });
        setPulseEffect(pulse);
      } else {
        setActiveNodeId(null);
        autoRotateRef.current = true;
        setPulseEffect({});
      }
      return next;
    });
  };

  const isRelatedToActive = (itemId: number) =>
    activeNodeId ? getRelatedItems(activeNodeId).includes(itemId) : false;

  const getStatusStyles = (status: TimelineItem["status"]) => {
    switch (status) {
      case "completed":   return "text-white bg-black border-white";
      case "in-progress": return "text-black bg-white border-black";
      default:            return "text-white bg-black/40 border-white/50";
    }
  };

  return (
    <div
      className="w-full flex flex-col items-center justify-center overflow-hidden"
      style={{ height: 'clamp(340px, 60vw, 560px)', background: 'transparent' }}
      ref={containerRef}
      onClick={(e) => {
        if (e.target === containerRef.current || e.target === orbitRef.current) {
          setExpandedItems({});
          setActiveNodeId(null);
          setPulseEffect({});
          autoRotateRef.current = true;
        }
      }}
    >
      <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
        <div className="absolute w-full h-full flex items-center justify-center" ref={orbitRef} style={{ perspective: "1000px" }}>

          {/* Center orb */}
          <div className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-teal-500 animate-pulse flex items-center justify-center z-10">
            <div className="absolute w-20 h-20 rounded-full border border-white/20 animate-ping opacity-70" />
            <div className="absolute w-24 h-24 rounded-full border border-white/10 animate-ping opacity-50" style={{ animationDelay: "0.5s" }} />
            <div className="w-8 h-8 rounded-full bg-white/80" />
          </div>

          {/* Orbit ring */}
          <div className="absolute rounded-full border border-white/10" style={{ width: `${RADIUS * 2}px`, height: `${RADIUS * 2}px` }} />

          {/* Nodes — positions updated via DOM ref in RAF, not React state */}
          {timelineData.map((item) => {
            const isExpanded = expandedItems[item.id];
            const isRelated  = isRelatedToActive(item.id);
            const isPulsing  = pulseEffect[item.id];
            const Icon       = item.icon;

            return (
              <div
                key={item.id}
                ref={(el) => (nodeRefs.current[item.id] = el)}
                className="absolute cursor-pointer"
                style={{ zIndex: isExpanded ? 200 : 100, willChange: 'transform, opacity' }}
                onClick={(e) => { e.stopPropagation(); toggleItem(item.id); }}
              >
                <div
                  className={`absolute rounded-full ${isPulsing ? "animate-pulse" : ""}`}
                  style={{
                    background: 'radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)',
                    width: `${item.energy * 0.5 + 40}px`,
                    height: `${item.energy * 0.5 + 40}px`,
                    left: `-${(item.energy * 0.5) / 2}px`,
                    top:  `-${(item.energy * 0.5) / 2}px`,
                  }}
                />
                <div className={[
                  "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                  isExpanded ? "bg-white text-black border-white shadow-lg scale-150"
                  : isRelated ? "bg-white/50 text-black border-white animate-pulse"
                  : "bg-black text-white border-white/40",
                ].join(" ")}>
                  <Icon size={16} />
                </div>
                <div
                  className={`absolute top-12 whitespace-nowrap text-xs font-semibold tracking-wider transition-all duration-300 ${isExpanded ? "text-white" : "text-white/70"}`}
                  style={{ left: "50%", transform: "translateX(-50%)" }}
                >
                  {item.title}
                </div>
                {isExpanded && (
                  <Card className="absolute top-20 left-1/2 -translate-x-1/2 w-[min(256px,70vw)] bg-black/90 border-white/30 shadow-xl overflow-visible">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-white/50" />
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <Badge className={`px-2 text-xs ${getStatusStyles(item.status)}`}>
                          {item.status === "completed" ? "COMPLETE" : item.status === "in-progress" ? "IN PROGRESS" : "PENDING"}
                        </Badge>
                        <span className="text-xs font-mono text-white/50">{item.date}</span>
                      </div>
                      <CardTitle className="text-sm mt-2 text-white">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-white/80">
                      <p>{item.content}</p>
                      <div className="mt-4 pt-3 border-t border-white/10">
                        <div className="flex justify-between items-center text-xs mb-1">
                          <span className="flex items-center"><Zap size={10} className="mr-1" />Energy</span>
                          <span className="font-mono">{item.energy}%</span>
                        </div>
                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500" style={{ width: `${item.energy}%` }} />
                        </div>
                      </div>
                      {item.relatedIds.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-white/10">
                          <div className="flex items-center mb-2">
                            <Link size={10} className="mr-1 text-white/70" />
                            <h4 className="text-xs uppercase tracking-wider font-medium text-white/70">Connected</h4>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {item.relatedIds.map((relId) => {
                              const rel = timelineData.find((i) => i.id === relId);
                              return (
                                <Button key={relId} variant="outline" size="sm"
                                  className="h-6 px-2 py-0 text-xs border-white/20 bg-transparent hover:bg-white/10 text-white/80"
                                  onClick={(e) => { e.stopPropagation(); toggleItem(relId); }}>
                                  {rel?.title}<ArrowRight size={8} className="ml-1 text-white/60" />
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
