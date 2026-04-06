'use client';

interface GemmarkIconProps {
  size?: number;
}

// The actual GemMARK icon: 2 tall vertical bars (navy, gray) + 2 squares (orange, yellow)
export default function GemmarkIcon({ size = 24 }: GemmarkIconProps) {
  const g = Math.max(1, Math.round(size * 0.05)); // gap

  return (
    <div style={{
      width: size,
      height: size,
      display: 'flex',
      gap: g,
    }}>
      {/* Navy tall bar — full height */}
      <div style={{ width: size * 0.24, background: '#1B2432', borderRadius: 1 }} />
      {/* Gray tall bar — full height */}
      <div style={{ width: size * 0.18, background: '#9A9A8E', borderRadius: 1 }} />
      {/* Right column: two squares stacked, filling remaining space */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: g,
      }}>
        {/* Orange square — top right */}
        <div style={{ flex: 1, background: '#D95B2B', borderRadius: 1 }} />
        {/* Yellow square — bottom right */}
        <div style={{ flex: 1, background: '#F5A623', borderRadius: 1 }} />
      </div>
    </div>
  );
}
