import { epcotTips } from '../../../data/epcotData';
import ParkStrategySection from '../shared/ParkStrategySection';

const THEME_VARS = {
  '--park-accent': 'var(--epcot-accent, #b8960a)',
};

export default function EpcotStrategy() {
  return (
    <ParkStrategySection
      parkShortName="EPCOT"
      parkName="EPCOT"
      sectionId="epcot-strategy"
      background="var(--bg)"
      themeVars={THEME_VARS}
      tips={epcotTips}
    />
  );
}
