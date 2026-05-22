import React, { useState, useRef, useLayoutEffect, cloneElement } from 'react';
import { cn } from '@/lib/utils';

// --- Internal Types ---
export type NavItem = {
  id: string | number;
  icon: React.ReactElement;
  label?: string;
  onClick?: () => void;
};

type LimelightNavProps = {
  items?: NavItem[];
  defaultActiveIndex?: number;
  onTabChange?: (index: number) => void;
  className?: string;
  limelightClassName?: string;
  iconContainerClassName?: string;
  iconClassName?: string;
  /** When true, renders text labels instead of icons (desktop mode) */
  textMode?: boolean;
};

/**
 * An adaptive-width navigation bar with a "limelight" effect that highlights the active item.
 * Supports both icon mode (mobile) and text-label mode (desktop).
 */
export const LimelightNav = ({
  items = [],
  defaultActiveIndex = 0,
  onTabChange,
  className,
  limelightClassName,
  iconContainerClassName,
  iconClassName,
  textMode = false,
}: LimelightNavProps) => {
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
  const [isReady, setIsReady] = useState(false);
  const navItemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const limelightRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (items.length === 0) return;
    const limelight = limelightRef.current;
    const activeItem = navItemRefs.current[activeIndex];
    if (limelight && activeItem) {
      const newLeft =
        activeItem.offsetLeft +
        activeItem.offsetWidth / 2 -
        limelight.offsetWidth / 2;
      limelight.style.left = `${newLeft}px`;
      if (!isReady) {
        setTimeout(() => setIsReady(true), 50);
      }
    }
  }, [activeIndex, isReady, items]);

  if (items.length === 0) return null;

  const handleItemClick = (index: number, itemOnClick?: () => void) => {
    setActiveIndex(index);
    onTabChange?.(index);
    itemOnClick?.();
  };

  return (
    <nav
      className={cn(
        'relative inline-flex items-center rounded-2xl border',
        textMode ? 'h-full px-1' : 'h-14 px-1',
        className,
      )}
    >
      {items.map(({ id, icon, label, onClick }, index) => (
        <a
          key={id}
          ref={(el) => (navItemRefs.current[index] = el)}
          className={cn(
            'relative z-20 flex h-full cursor-pointer items-center justify-center transition-colors duration-150 flex-1',
            textMode
              ? 'px-3 text-xs sm:text-sm font-body-bold tracking-wide'
              : 'p-3 sm:p-4',
            textMode
              ? activeIndex === index
                ? 'text-white'
                : 'text-purple-300 hover:text-white'
              : '',
            iconContainerClassName,
          )}
          onClick={() => handleItemClick(index, onClick)}
          aria-label={label}
        >
          {textMode ? (
            label
          ) : (
            cloneElement(icon, {
              className: cn(
                'w-5 h-5 sm:w-6 sm:h-6 transition-opacity duration-100 ease-in-out',
                activeIndex === index ? 'opacity-100' : 'opacity-40',
                icon.props.className,
                iconClassName,
              ),
            })
          )}
        </a>
      ))}

      {/* Limelight indicator */}
      <div
        ref={limelightRef}
        className={cn(
          'absolute top-0 z-10 w-11 h-[5px] rounded-full',
          isReady ? 'transition-[left] duration-300 ease-in-out' : '',
          limelightClassName,
        )}
        style={{ left: '-999px' }}
      >
        {/* Cone glow */}
        <div className="absolute left-[-30%] top-[5px] w-[160%] h-14 [clip-path:polygon(5%_100%,25%_0,75%_0,95%_100%)] bg-gradient-to-b from-[rgba(139,92,246,0.45)] to-transparent pointer-events-none" />
      </div>
    </nav>
  );
};
