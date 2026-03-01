import ParkRidesSection from '../shared/ParkRidesSection';

const THEME_VARS = {
  '--park-accent': 'var(--coral)',
  '--park-accent-light': 'var(--coral-light)',
  '--park-tip-bg': '#fff5f5',
};

export default function MKRides({ onSelectItem }) {
  return <ParkRidesSection parkName="Magic Kingdom" sectionId="mk-rides" background="var(--bg)" themeVars={THEME_VARS} onSelectItem={onSelectItem} />;
}
