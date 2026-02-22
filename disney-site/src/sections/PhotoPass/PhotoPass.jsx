import SectionHeader from '../../components/SectionHeader/SectionHeader';
import Callout from '../../components/Callout/Callout';
import WaveDivider from '../../components/WaveDivider';
import {
  photoPassOverview,
  photoPassFeatures,
  familySharingPlan,
  accountSetupSteps,
} from '../../data/photoPassInfo';
import styles from './PhotoPass.module.css';

export default function PhotoPass() {
  return (
    <section id="photo-pass" className={styles.section}>
      <div className="section-inner">
        <SectionHeader title="Disney PhotoPass 📸" subtitle="Professional Photos at Every Magical Moment" />

        <div className={`${styles.intro} reveal`}>
          <p>{photoPassOverview.description}</p>
        </div>

        <div className={`${styles.featureGrid} reveal`}>
          {photoPassFeatures.map(f => (
            <div key={f.title} className={styles.featureCard}>
              <span className={styles.featureIcon}>{f.icon}</span>
              <h4>{f.title}</h4>
              <p>{f.text}</p>
            </div>
          ))}
        </div>

        <div className={`${styles.sharingPlan} reveal`}>
          <h3>{familySharingPlan.title}</h3>
          <p className={styles.sharingDesc}>{familySharingPlan.description}</p>
        </div>

        <h3 className="reveal" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          How to Join Our Family on Disney&rsquo;s App
        </h3>
        <div className={`${styles.stepGrid} reveal`}>
          {accountSetupSteps.map((step, i) => (
            <div key={step.title} className={`${styles.stepCard} reveal delay-${i + 1}`}>
              <span className={styles.stepNumber}>{step.icon}</span>
              <h4>{step.title}</h4>
              <p>{step.text}</p>
            </div>
          ))}
        </div>

        <Callout variant="highlight" title="⚠️ Do This BEFORE the Trip!">
          Don't wait until you're at the park! Everyone should create their My Disney Experience account and accept the family invitation at least a week before we fly out. That way, from the moment we enter the parks, every photo is automatically shared.
        </Callout>
      </div>
      <WaveDivider fill="var(--text)" variant={2} />
    </section>
  );
}
