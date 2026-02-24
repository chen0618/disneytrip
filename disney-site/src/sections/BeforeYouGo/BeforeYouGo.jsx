import { useState } from 'react';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import WaveDivider from '../../components/WaveDivider';
import { checklist, firstTimerTips } from '../../data/beforeYouGoInfo';
import styles from './BeforeYouGo.module.css';

export default function BeforeYouGo() {
  const [checked, setChecked] = useState(() => new Set());

  function toggle(index) {
    setChecked(prev => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  return (
    <section id="before-you-go" className={styles.section}>
      <div className="section-inner">
        <SectionHeader title="Before You Go" subtitle="Get these done before we fly out!" />

        <div className={`${styles.checklistCard} reveal`}>
          <h3>Pre-Trip Checklist</h3>
          <p className={styles.checklistSub}>
            {checked.size} of {checklist.length} done
          </p>
          <ul className={styles.checklist}>
            {checklist.map((item, i) => (
              <li
                key={i}
                className={`${styles.checkItem} ${checked.has(i) ? styles.checkItemDone : ''}`}
                onClick={() => toggle(i)}
              >
                <span className={styles.checkbox}>
                  {checked.has(i) ? '✅' : '⬜'}
                </span>
                <span className={styles.checkIcon}>{item.icon}</span>
                <span className={styles.checkText}>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <h3 className="reveal" style={{ textAlign: 'center', margin: '2.5rem 0 1.5rem' }}>
          First-Timer Tips
        </h3>
        <div className={`${styles.tipGrid} reveal`}>
          {firstTimerTips.map((tip, i) => (
            <div key={tip.title} className={`${styles.tipCard} reveal delay-${i + 1}`}>
              <span className={styles.tipIcon}>{tip.icon}</span>
              <h4>{tip.title}</h4>
              <p>{tip.text}</p>
            </div>
          ))}
        </div>

      </div>
      <WaveDivider fill="var(--bg)" variant={3} />
    </section>
  );
}
