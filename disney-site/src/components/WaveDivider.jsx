const paths = {
  // Each section uses a slightly different wave path for visual variety
  1: 'M0,0 C300,60 900,0 1200,40 L1200,60 L0,60 Z',
  2: 'M0,20 C300,60 600,0 1200,30 L1200,60 L0,60 Z',
  3: 'M0,30 C200,60 400,0 600,30 C800,60 1000,0 1200,20 L1200,60 L0,60 Z',
  4: 'M0,40 C400,0 800,60 1200,10 L1200,60 L0,60 Z',
  5: 'M0,10 C300,50 600,0 900,40 C1050,55 1150,20 1200,30 L1200,60 L0,60 Z',
  6: 'M0,20 C300,50 600,10 900,40 C1050,55 1150,20 1200,30 L1200,60 L0,60 Z',
};

export default function WaveDivider({ position = 'bottom', fill = 'var(--bg)', variant = 1 }) {
  const className = position === 'top' ? 'wave-divider-top' : 'wave-divider';
  const d = paths[variant] || paths[1];

  return (
    <div className={className}>
      <svg viewBox="0 0 1200 60" preserveAspectRatio="none">
        <path d={d} fill={fill} />
      </svg>
    </div>
  );
}
