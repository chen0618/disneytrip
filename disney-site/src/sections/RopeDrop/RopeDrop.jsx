import SectionHeader from '../../components/SectionHeader/SectionHeader';
import Callout from '../../components/Callout/Callout';
import WaveDivider from '../../components/WaveDivider';
import { morningTimeline, standardStrategy, proStrategy, coffeeStrategy } from '../../data/ropeDropSteps';
import styles from './RopeDrop.module.css';

function StrategyCard({ strategy, variant, revealClass }) {
  const isPro = variant === 'pro';
  return (
    <div className={`${styles.strategyCard} ${isPro ? styles.pro : styles.basic} ${revealClass}`}>
      <span className={`${styles.badge} ${isPro ? styles.proBadge : styles.basicBadge}`}>{strategy.badge}</span>
      <h3>{strategy.title}</h3>
      <p>{strategy.description}</p>
      <ul className={styles.list}>
        {strategy.items.map((item, i) => (
          <li key={i} className={styles.listItem}>
            <span className={styles.liIcon}>{item.icon}</span> {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function RopeDrop() {
  return (
    <section id="rope-drop" className={styles.section}>
      <WaveDivider position="top" fill="var(--bg-alt)" variant={3} />
      <div className="section-inner">
        <SectionHeader title="Rope Drop Strategy ⏰" subtitle="How We Get Ahead of the Crowds Every Morning" />

        <div className={`${styles.intro} reveal`}>
          <p>Disney's <strong>Early Theme Park Entry</strong> lets on-property resort guests enter parks <strong>30 minutes before</strong> the official opening. That's a huge advantage &mdash; shorter lines, cooler temps, and first dibs on the big rides. But there's a trick to making it work even better.</p>
        </div>

        <h3 className="reveal" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Our Morning Timeline</h3>
        <div className={`${styles.timeline} reveal`}>
          {morningTimeline.map((step, i) => (
            <div key={i} className={styles.step}>
              <span className={styles.time}>{step.time}</span>
              <h4>{step.title}</h4>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>

        <div className={styles.strategyGrid}>
          <StrategyCard strategy={standardStrategy} variant="basic" revealClass="reveal-left" />
          <StrategyCard strategy={proStrategy} variant="pro" revealClass="reveal-right" />
        </div>

        <div className={`${styles.coffeeStrategy} reveal`}>
          <h3>{coffeeStrategy.title}</h3>
          <p>{coffeeStrategy.description}</p>
        </div>

        <Callout variant="highlight" title="💡 Lessons from Our January 2026 Trip">
          We learned this the hard way! On our first morning at MK, we took the resort bus and arrived to find huge crowds already inside the park. People who drove themselves or used rideshare had beaten us there. After that, we started calling a Minnie Van every morning at 6:45 &mdash; and it made a HUGE difference. We were walking onto rides that later had 60+ minute waits.
        </Callout>
      </div>
      <WaveDivider fill="var(--bg-alt)" variant={4} />
    </section>
  );
}
