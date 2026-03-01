import ParkRidesSection from '../shared/ParkRidesSection';

const THEME_VARS = {
  '--park-accent': 'var(--yellow)',
  '--park-accent-light': 'var(--epcot-accent-bg, #fff3b0)',
  '--park-tip-bg': '#fffbe6',
  '--park-gradient-end': '#b8960a',
  '--park-filter-color': '#b8960a',
  '--park-active-color': 'var(--text)',
};

const CALLOUTS = [
  {
    name: 'Guardians of the Galaxy: Cosmic Rewind',
    emoji: '\uD83C\uDFB6',
    tip: 'Lightning Lane Single Pass available, or use the standby queue. Go at rope drop for shortest waits \u2014 lines hit 90+ minutes by mid-morning. Rider Swap available for kids under 42\u201D.',
  },
  {
    name: 'Test Track',
    emoji: '\uD83C\uDFC1',
    tip: 'Reimagined in 2025 with a fresh new look and updated storyline! High-speed outdoor track section is still a blast. 40\u201D height requirement \u2014 Rider Swap available.',
  },
  {
    name: 'Frozen Ever After',
    emoji: '\u2744\uFE0F',
    tip: 'Rope drop priority #1! Lines hit 60+ minutes by mid-morning. During Early Entry (8:30 AM), you can walk on in under 10 minutes. No height requirement \u2014 perfect for the whole family.',
  },
];

export default function EpcotRides({ onSelectItem }) {
  return <ParkRidesSection parkName="EPCOT" sectionId="epcot-rides" background="var(--bg)" themeVars={THEME_VARS} callouts={CALLOUTS} onSelectItem={onSelectItem} />;
}
