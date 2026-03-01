import ParkDiningSection from '../shared/ParkDiningSection';

const THEME_VARS = {
  '--park-accent': 'var(--yellow)',
  '--park-accent-light': 'var(--epcot-accent-bg, #fff3b0)',
  '--park-gradient-end': '#d4a50a',
  '--park-filter-color': 'var(--epcot-accent, #b8960a)',
  '--park-active-color': 'var(--text)',
};

const MUST_TRY = [
  { name: 'Le Cellier Steakhouse', emoji: '\uD83E\uDD69', note: 'The #1 rated restaurant at EPCOT. Canadian filet mignon, pretzel bread, and cheddar cheese soup. Book 60 days out!' },
  { name: 'Space 220', emoji: '\uD83D\uDE80', note: 'Dine in a simulated space station 220 miles above Earth! The elevator ride up is half the experience. Book ASAP.' },
  { name: 'Les Halles Boulangerie', emoji: '\uD83E\uDD50', note: "EPCOT's best-kept secret. Authentic French pastries, croissants, and sandwiches at quick-service prices." },
  { name: 'Teppan Edo', emoji: '\uD83D\uDD25', note: 'Teppanyaki-style cooking at your table in Japan. The chef puts on a show \u2014 kids will love it!' },
];

export default function EpcotDining({ onSelectItem }) {
  return (
    <ParkDiningSection
      parkName="EPCOT"
      sectionId="epcot-dining"
      background="var(--bg)"
      themeVars={THEME_VARS}
      subtitle="From world-class table service to festival food booths"
      mustTryItems={MUST_TRY}
      onSelectItem={onSelectItem}
    />
  );
}
