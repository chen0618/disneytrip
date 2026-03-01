import ParkDiningSection from '../shared/ParkDiningSection';

const THEME_VARS = {
  '--park-accent': 'var(--purple)',
  '--park-accent-light': '#c9c4fe',
  '--park-gradient-end': '#8b83f0',
};

const MUST_TRY = [
  { name: 'Ronto Wrap', emoji: '\uD83C\uDF2F', note: "Grilled sausage in warm pita from Ronto Roasters \u2014 the must-eat of Galaxy's Edge" },
  { name: 'Totchos', emoji: '\uD83E\uDD54', note: "Loaded tater tot nachos from Woody's Lunch Box \u2014 trust us, they're legendary" },
  { name: 'Blue/Green Milk', emoji: '\uD83E\uDD5B', note: "Frozen plant-based milk from the Milk Stand \u2014 weirdly addictive Galaxy's Edge exclusive" },
];

export default function HSDining({ onSelectItem }) {
  return (
    <ParkDiningSection
      parkName="Hollywood Studios"
      sectionId="hs-dining"
      background="var(--bg)"
      themeVars={THEME_VARS}
      subtitle="From galactic cantinas to toy-sized lunch boxes"
      mustTryItems={MUST_TRY}
      onSelectItem={onSelectItem}
    />
  );
}
