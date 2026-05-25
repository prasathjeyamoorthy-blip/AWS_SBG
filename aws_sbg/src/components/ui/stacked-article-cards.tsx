'use client';
import React, { MouseEventHandler, useState, useRef, useEffect, useCallback } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

export interface FAQItem {
  question: string;
  answer: string;
  icon?: React.ReactNode;
}

/** Stacked top offset when collapsed */
const COLLAPSED_OFFSETS = [
  'top-6',
  'top-[calc(1.5rem+0.75rem)]',
  'top-[calc(1.5rem+1.5rem)]',
  'top-[calc(1.5rem+2.25rem)]',
  'top-[calc(1.5rem+3rem)]',
  'top-[calc(1.5rem+3.75rem)]',
  'top-[calc(1.5rem+4.5rem)]',
  'top-[calc(1.5rem+5.25rem)]',
  'top-[calc(1.5rem+6rem)]',
  'top-[calc(1.5rem+6.75rem)]',
];

interface StackedFAQCardsProps {
  items: FAQItem[];
  className?: string;
}

const GAP = 16; // px gap between expanded cards

export default function StackedFAQCards({ items, className }: StackedFAQCardsProps) {
  const [isActive, setIsActive] = useState(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [expandedOffsets, setExpandedOffsets] = useState<number[]>([]);
  const [totalExpandedHeight, setTotalExpandedHeight] = useState(0);

  // Measure card heights after expansion to compute dynamic offsets
  const computeOffsets = useCallback(() => {
    const heights: number[] = cardRefs.current.map(el => el?.offsetHeight ?? 80);
    const offsets: number[] = [];
    let cumulative = 24; // 1.5rem = 24px
    for (let i = 0; i < heights.length; i++) {
      offsets.push(cumulative);
      cumulative += heights[i] + GAP;
    }
    setExpandedOffsets(offsets);
    setTotalExpandedHeight(cumulative + 48); // extra space for collapse button
  }, []);

  // Recompute on window resize when expanded
  useEffect(() => {
    if (!isActive) return;
    computeOffsets();
    const ro = new ResizeObserver(computeOffsets);
    cardRefs.current.forEach(el => el && ro.observe(el));
    return () => ro.disconnect();
  }, [isActive, computeOffsets]);

  const handleExpand = () => {
    setIsActive(true);
    // Compute after next paint so cards are visible and measurable
    requestAnimationFrame(() => requestAnimationFrame(computeOffsets));
  };

  const handleCollapse: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setIsActive(false);
  };

  const collapsedHeight = `calc(1.5rem + ${Math.min(items.length, 7)} * 0.75rem + 80px)`;

  return (
    <div
      className={cn('relative w-full cursor-pointer', className)}
      style={{
        minHeight: isActive ? totalExpandedHeight || collapsedHeight : collapsedHeight,
        transition: 'min-height 1s cubic-bezier(0.075,0.82,0.165,1)',
      }}
      onClick={handleExpand}
    >
      {items.map((item, index) => (
        <div
          key={index}
          ref={el => { cardRefs.current[index] = el; }}
          className={cn(
            'absolute left-0 right-0 mx-auto flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 shadow-lg shadow-black/20 backdrop-blur-xl transition-all duration-1000 ease-[cubic-bezier(0.075,0.82,0.165,1)] hover:bg-white/8',
            !isActive && COLLAPSED_OFFSETS[index],
          )}
          style={{
            maxWidth: '720px',
            zIndex: items.length - index,
            ...(isActive && expandedOffsets[index] !== undefined
              ? { top: `${expandedOffsets[index]}px` }
              : {}),
          }}
        >
          {/* Question row */}
          <div className="flex items-start gap-3">
            {item.icon && (
              <span className="mt-0.5 flex-shrink-0 text-purple-400">{item.icon}</span>
            )}
            <p className="text-white text-sm sm:text-base font-bold leading-snug flex-1">
              {item.question}
            </p>
          </div>
          {/* Answer — only visible when expanded */}
          <div
            className={cn(
              'overflow-hidden transition-all duration-700',
              isActive ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0',
            )}
          >
            <p className="text-white/60 text-sm leading-relaxed pt-1 border-t border-white/10">
              {item.answer}
            </p>
          </div>
        </div>
      ))}

      {/* Collapse button */}
      <div
        className={cn(
          'absolute left-0 right-0 mx-auto flex justify-center transition-all duration-300',
          isActive ? 'pointer-events-auto visible opacity-100' : 'pointer-events-none invisible opacity-0',
        )}
        style={{
          top: isActive && totalExpandedHeight
            ? `${totalExpandedHeight - 48}px`
            : `calc(1.5rem + ${items.length} * 130px + ${items.length} * 1rem)`,
          maxWidth: '720px',
        }}
      >
        <button
          onClick={handleCollapse}
          className="px-6 py-2 rounded-full text-xs font-mono-bold tracking-widest uppercase border border-white/20 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition-all"
        >
          Show less
        </button>
      </div>
    </div>
  );
}
