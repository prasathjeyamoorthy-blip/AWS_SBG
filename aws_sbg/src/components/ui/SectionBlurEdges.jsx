/**
 * Lightweight fade edges using CSS gradients only.
 * Replaces the previous GradualBlur implementation that stacked
 * 14 backdrop-filter layers per section (very expensive on GPU).
 */
export default function SectionBlurEdges({ topHeight = '5rem', bottomHeight = '8rem', variant, showBottom = true, showTop = true }) {
  const resolvedBottom = variant === 'hero' ? '4rem' : bottomHeight;
  return (
    <>
      {showTop && (
        <div
          className="absolute top-0 left-0 right-0 pointer-events-none"
          style={{
            height: topHeight,
            background: 'linear-gradient(to bottom, var(--section-bg, #08000f), transparent)',
            zIndex: 20,
          }}
        />
      )}
      {showBottom && (
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height: resolvedBottom,
            background: 'linear-gradient(to top, var(--section-bg, #08000f), transparent)',
            zIndex: 20,
          }}
        />
      )}
    </>
  );
}
