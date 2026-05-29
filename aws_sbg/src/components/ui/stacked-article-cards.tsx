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

// Fixed card height when collapsed — identical on every screen size
const COLLAPSED_CARD_HEIGHT = 64; // px
const STACK_STEP = 8;             // px each subsequent card peeks below the previous

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

  const computeOffsets = useCallback(() => {
    const heights: number[] = cardRefs.current.map(el => el?.offsetHeight ?? COLLAPSED_CARD_HEIGHT);
    const offsets: number[] = [];
    let cumulative = 0;
    for (let i = 0; i < heights.length; i++) {
      offsets.push(cumulative);
      cumulative += heights[i] + GAP;
    }
    setExpandedOffsets(offsets);
    setTotalExpandedHeight(cumulative + 48);
  }, []);

  useEffect(() => {
    if (!isActive) return;
    computeOffsets();
    const ro = new ResizeObserver(computeOffsets);
    cardRefs.current.forEach(el => el && ro.observe(el));
    return () => ro.disconnect();
  }, [isActive, computeOffsets]);

  const handleExpand = () => {
    setIsActive(true);
    requestAnimationFrame(() => requestAnimationFrame(computeOffsets));
  };

  const handleCollapse: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setIsActive(false);
  };

  // Collapsed container: first card height + peeking stack lines
  const visibleStack = Math.min(items.length - 1, 6);
  const collapsedContainerHeight = COLLAPSED_CARD_HEIGHT + visibleStack * STACK_STEP;

  return (
    <div
      className={cn('relative w-full cursor-pointer', className)}
      style={{
        height: isActive ? `${totalExpandedHeight}px` : `${collapsedContainerHeight}px`,
        minHeight: isActive ? `${totalExpandedHeight}px` : `${collapsedContainerHeight}px`,
        transition: 'height 1s cubic-bezier(0.075,0.82,0.165,1), min-height 1s cubic-bezier(0.075,0.82,0.165,1)',
        overflow: isActive ? 'visible' : 'hidden',
      }}
      onClick={handleExpand}
    >
      {items.map((item, index) => (
        <div
          key={index}
          ref={el => { cardRefs.current[index] = el; }}
          className={cn(
            'absolute left-0 right-0 mx-auto rounded-2xl border bg-white/5 shadow-lg shadow-black/20 backdrop-blur-xl transition-all duration-1000 ease-[cubic-bezier(0.075,0.82,0.165,1)]',
          )}
          style={{
            maxWidth: '720px',
            zIndex: items.length - index,
            borderColor: index === 0 ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.06)',
            ...(isActive && expandedOffsets[index] !== undefined
              ? {
                  top: `${expandedOffsets[index]}px`,
                  height: 'auto',
                  padding: '1rem 1.25rem',
                }
              : {
                  top: `${index * STACK_STEP}px`,
                  height: `${COLLAPSED_CARD_HEIGHT}px`,
                  padding: '0 1.25rem',
                  overflow: 'hidden',
                }),
          }}
        >
          {/* Question row — vertically centred in the fixed-height collapsed card */}
          <div
            className="flex items-center gap-3"
            style={{ height: isActive ? 'auto' : `${COLLAPSED_CARD_HEIGHT}px` }}
          >
            {item.icon && (
              <span className="flex-shrink-0 text-purple-400">{item.icon}</span>
            )}
            <p className={cn(
              'text-white text-sm sm:text-base font-bold leading-snug flex-1',
              !isActive && 'truncate',
            )}>
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
          top: isActive && totalExpandedHeight ? `${totalExpandedHeight - 48}px` : '9999px',
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
