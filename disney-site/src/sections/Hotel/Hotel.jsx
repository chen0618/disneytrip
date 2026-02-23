import SectionHeader from '../../components/SectionHeader/SectionHeader';
import Callout from '../../components/Callout/Callout';
import WaveDivider from '../../components/WaveDivider';
import hotelHighlights from '../../data/hotelHighlights';
import styles from './Hotel.module.css';

const photos = [
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Disney%27s-Pop-Century-Resort-Entrance.jpg/960px-Disney%27s-Pop-Century-Resort-Entrance.jpg",
    alt: 'Pop Century Resort entrance with giant icons',
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Orlando_-_Disney_World_-_Disney%27s_Pop_Century_Resort_-_Art_of_Animation_Resort_Across_Hourglass_Lake_%2817031500338%29.jpg/960px-Orlando_-_Disney_World_-_Disney%27s_Pop_Century_Resort_-_Art_of_Animation_Resort_Across_Hourglass_Lake_%2817031500338%29.jpg",
    alt: 'Pop Century across Hourglass Lake',
  },
];

export default function Hotel() {
  return (
    <section id="hotel" className={styles.section}>
      <div className="section-inner">
        <SectionHeader title="Our Hotel: Pop Century Resort" subtitle="A Value Resort with a Secret Superpower 🚡" />

        <div className={styles.layout}>
          <div className={`${styles.images} reveal-left`}>
            {photos.map(p => (
              <img key={p.alt} src={p.src} alt={p.alt} loading="lazy" />
            ))}
          </div>
          <div className={`${styles.info} reveal-right`}>
            <p>
              Pop Century is one of Disney's <strong>Value Resorts</strong> &mdash; the most affordable tier. But it has a huge advantage that even pricier hotels don't: <strong>Skyliner gondola access</strong> directly to two parks!
            </p>
            <ul className={styles.highlights}>
              {hotelHighlights.map((h, i) => (
                <li key={h.title} className={`${styles.highlight} reveal delay-${i + 1}`}>
                  <span className={styles.hlIcon}>{h.icon}</span>
                  <div className={styles.hlText}>
                    <h4>{h.title}</h4>
                    <p>{h.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Callout variant="highlight" title="💰 Budget Hack: Disney Gift Cards at a Discount">
          We pay for almost our ENTIRE Disney trip — hotel, tickets, food, merchandise — using Disney gift cards purchased at a discount. Costco, Sam's Club, and Target all sell Disney gift cards for less than face value. Target occasionally runs promos where spending a certain amount earns you Target merch credit on top of the discount. Historically, we've managed to buy gift cards at <strong>5–15% off</strong>, which on a big family trip adds up to hundreds in savings!
        </Callout>
      </div>
      <WaveDivider fill="var(--bg-alt)" variant={4} />
    </section>
  );
}
