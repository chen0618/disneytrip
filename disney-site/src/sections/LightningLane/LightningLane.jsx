import SectionHeader from '../../components/SectionHeader/SectionHeader';
import Callout from '../../components/Callout/Callout';
import WaveDivider from '../../components/WaveDivider';
import { llOverview, llHowItWorks, llStrategy, riderSwapInfo } from '../../data/lightningLaneInfo';
import styles from './LightningLane.module.css';

export default function LightningLane() {
  return (
    <section id="lightning-lane" className={styles.section}>
      <WaveDivider position="top" fill="var(--bg)" variant={3} />
      <div className="section-inner">
        <SectionHeader title="Lightning Lane ⚡" subtitle="Skip the Lines Like a Pro" />

        <div className={`${styles.intro} reveal`}>
          <p>{llOverview.description}</p>
        </div>

        <div className={`${styles.typeGrid} reveal`}>
          {llHowItWorks.map(item => (
            <div key={item.title} className={styles.typeCard}>
              <span className={styles.typeIcon}>{item.icon}</span>
              <h4>{item.title}</h4>
              <p>{item.text}</p>
            </div>
          ))}
        </div>

        <h3 className="reveal" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Our Strategy</h3>
        <div className={`${styles.strategyList} reveal`}>
          {llStrategy.map(item => (
            <div key={item.title} className={styles.strategyItem}>
              <span className={styles.strategyIcon}>{item.icon}</span>
              <div>
                <h4>{item.title}</h4>
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={`${styles.riderSwap} reveal`}>
          <h3>{riderSwapInfo.title}</h3>
          <p className={styles.riderSwapDesc}>{riderSwapInfo.description}</p>
          <div className={styles.stepList}>
            {riderSwapInfo.steps.map(step => (
              <div key={step.text} className={styles.step}>
                <span className={styles.stepIcon}>{step.icon}</span>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
          <Callout variant="kids" title="💡 Pro Tip">
            {riderSwapInfo.tip}
          </Callout>
        </div>
      </div>
      <WaveDivider fill="var(--bg)" variant={5} />
    </section>
  );
}
