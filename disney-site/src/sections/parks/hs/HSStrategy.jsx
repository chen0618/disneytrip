import { hsTips } from '../../../data/hollywoodStudiosData';
import ParkStrategySection from '../shared/ParkStrategySection';

const THEME_VARS = {
  '--park-accent': 'var(--purple)',
};

export default function HSStrategy() {
  return (
    <ParkStrategySection
      parkName="Hollywood Studios"
      heading="Our HS Strategy"
      sectionId="hs-strategy"
      background="var(--bg)"
      themeVars={THEME_VARS}
      tips={hsTips}
    />
  );
}
