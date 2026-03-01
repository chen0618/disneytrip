import { mkTips, fireworksGuide } from '../../../data/magicKingdomData';
import ParkStrategySection from '../shared/ParkStrategySection';
import styles from '../shared/ParkStrategySection.module.css';

const THEME_VARS = {
  '--park-accent': 'var(--coral)',
};

export default function MKStrategy() {
  return (
    <ParkStrategySection
      parkName="Magic Kingdom"
      heading="Our MK Strategy"
      sectionId="mk-strategy"
      background="var(--bg-alt)"
      themeVars={THEME_VARS}
      tips={mkTips}
    >
      {/* Nighttime Spectacular Callout */}
      <div className={`${styles.callout} reveal`}>
        <h3 className={styles.calloutTitle}>Nighttime Spectacular Viewing Tips</h3>
        <p className={styles.calloutDesc}>{fireworksGuide.tips}</p>
        <div className={styles.spotsRow}>
          {fireworksGuide.bestSpots.map((s) => (
            <div key={s.spot} className={styles.spot}>
              <strong>{s.spot}</strong>
              <p>{s.tip}</p>
            </div>
          ))}
        </div>
      </div>
    </ParkStrategySection>
  );
}
