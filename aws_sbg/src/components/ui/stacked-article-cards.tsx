'use client';
import React, { MouseEventHandler, useState } from 'react';
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
];

/** Spread top offset when expanded — each card is ~auto height ~120px + 1rem gap */
const EXPANDED_OFFSETS = [
  'top-6',
  'top-[calc(1.5rem+130px+1rem)]',
  'top-[calc(1.5rem+260px+2rem)]',
  'top-[calc(1.5rem+390px+3rem)]',
  'top-[calc(1.5rem+520px+4rem)]',
  'top-[calc(1.5rem+650px+5rem)]',
  'top-[calc(1.5rem+780px+6rem)]',
];

interface StackedFAQCardsProps {
  items: FAQItem[];
  className?: string;
}

export default function StackedFAQCards({ items, className }: StackedFAQCardsProps) {
  const [isActive, setIsActive] = useState(false);

  const handleExpand = () => setIsActive(true);

  const handleCollapse: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setIsActive(false);
  };

  const collapsedHeight = `calc(1.5rem + ${Math.min(items.length, 7)} * 0.75rem + 80px)`;
  const expandedHeight = `calc(1.5rem + ${items.length} * 130px + ${items.length} * 1rem + 80px)`;
  const totalHeight = isActive ? expandedHeight : collapsedHeight;

  return (
    <div
      className={cn('relative w-full cursor-pointer', className)}
      style={{ minHeight: totalHeight, transition: 'min-height 1s cubic-bezier(0.075,0.82,0.165,1)' }}
      onClick={handleExpand}
    >
      {items.map((item, index) => (
        <div
          key={index}
          className={cn(
            'absolute left-0 right-0 mx-auto flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/20 backdrop-blur-xl transition-all duration-1000 ease-[cubic-bezier(0.075,0.82,0.165,1)] hover:bg-white/8',
            isActive ? EXPANDED_OFFSETS[index] : COLLAPSED_OFFSETS[index],
          )}
          style={{
            maxWidth: '720px',
            zIndex: items.length - index,
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
              isActive ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0',
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
          top: `calc(1.5rem + ${items.length} * 130px + ${items.length} * 1rem)`,
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
