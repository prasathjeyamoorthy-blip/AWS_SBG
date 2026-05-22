import GradualBlur from './GradualBlur';

/**
 * Drop this inside any `relative overflow-hidden` section to get
 * top + bottom gradual-blur fade edges.
 *
 * variant="hero" uses a shorter bottom blur that stops before the CTA buttons.
 */
export default function SectionBlurEdges({
  topHeight    = '5rem',
  bottomHeight = '8rem',
  strength     = 3,
  divCount     = 8,
  variant,
}) {
  // Hero variant: shorter bottom blur so it doesn't cover the CTA buttons
  const resolvedBottomHeight = variant === 'hero' ? '4rem' : bottomHeight;
  const resolvedStrength     = variant === 'hero' ? 2      : strength;

  return (
    <>
      <GradualBlur
        target="parent"
        position="top"
        height={topHeight}
        strength={2}
        divCount={6}
        curve="ease-in"
        opacity={1}
        style={{ zIndex: 20 }}
      />
      <GradualBlur
        target="parent"
        position="bottom"
        height={resolvedBottomHeight}
        strength={resolvedStrength}
        divCount={divCount}
        curve="bezier"
        exponential={true}
        opacity={1}
        style={{ zIndex: 20 }}
      />
    </>
  );
}
