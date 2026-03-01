import ParkDiningSection from '../shared/ParkDiningSection';

const THEME_VARS = {
  '--park-accent': 'var(--coral)',
  '--park-accent-light': 'var(--coral-light)',
  '--park-gradient-end': '#e55a5a',
};

const MUST_TRY = [
  { name: 'Dole Whip', emoji: '\uD83C\uDF4D', note: 'The iconic frozen pineapple treat at Aloha Isle in Adventureland' },
  { name: 'Turkey Leg', emoji: '\uD83C\uDF57', note: 'Massive smoked turkey legs \u2014 a Disney tradition found near Frontierland' },
  { name: 'The Grey Stuff', emoji: '\uD83C\uDF70', note: "Try it at Be Our Guest \u2014 'it's delicious, don't believe me? Ask the dishes!'" },
];

export default function MKDining({ onSelectItem }) {
  return (
    <ParkDiningSection
      parkName="Magic Kingdom"
      sectionId="mk-dining"
      background="var(--bg-alt)"
      themeVars={THEME_VARS}
      subtitle="From iconic snacks to royal feasts"
      mustTryItems={MUST_TRY}
      onSelectItem={onSelectItem}
    />
  );
}
