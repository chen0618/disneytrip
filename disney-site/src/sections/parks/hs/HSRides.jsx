import ParkRidesSection from '../shared/ParkRidesSection';

const THEME_VARS = {
  '--park-accent': 'var(--purple)',
  '--park-accent-light': '#c9c4fe',
  '--park-tip-bg': '#f0eefe',
};

export default function HSRides({ onSelectItem }) {
  return <ParkRidesSection parkName="Hollywood Studios" sectionId="hs-rides" background="var(--bg-alt)" themeVars={THEME_VARS} onSelectItem={onSelectItem} />;
}
