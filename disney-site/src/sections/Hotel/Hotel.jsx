import SectionHeader from '../../components/SectionHeader/SectionHeader';
import Callout from '../../components/Callout/Callout';
import WaveDivider from '../../components/WaveDivider';
import hotelHighlights from '../../data/hotelHighlights';
import styles from './Hotel.module.css';

const photos = [
  {
    src: "https://cdn1.parksmedia.wdprapps.disney.com/resize/mwImage/1/900/450/75/dam/wdpro-assets/places-to-stay/pop-century/pop-century-resort-00.jpg",
    alt: 'Pop Century Resort entrance sign at night',
  },
  {
    src: "https://cdn1.parksmedia.wdprapps.disney.com/resize/mwImage/1/900/450/75/dam/wdpro-assets/places-to-stay/pop-century/pop-century-resort-01.jpg",
    alt: 'Hippy Dippy Pool with giant Lady and the Tramp statue',
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
          We pay for almost our ENTIRE Disney trip &mdash; hotel, tickets, food, merchandise &mdash; using Disney gift cards purchased at a discount.
          <br /><br />
          Costco, Sam's Club, and Target all sell Disney gift cards for less than face value. Target occasionally runs promos where spending a certain amount earns you Target merch credit on top of the discount.
          <br /><br />
          Historically, we've managed to buy gift cards at <strong>5–15% off</strong>, which on a big family trip adds up to hundreds in savings!
        </Callout>
      </div>
      <WaveDivider fill="var(--bg)" variant={4} />
    </section>
  );
}
