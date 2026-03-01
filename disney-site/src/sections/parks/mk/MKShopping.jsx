import ParkShoppingSection from '../shared/ParkShoppingSection';

export default function MKShopping({ onSelectItem }) {
  return <ParkShoppingSection parkName="Magic Kingdom" sectionId="mk-shopping" background="var(--bg)" onSelectItem={onSelectItem} />;
}
