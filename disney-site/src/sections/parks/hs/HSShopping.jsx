import ParkShoppingSection from '../shared/ParkShoppingSection';

export default function HSShopping({ onSelectItem }) {
  return <ParkShoppingSection parkName="Hollywood Studios" sectionId="hs-shopping" background="var(--bg-alt)" onSelectItem={onSelectItem} />;
}
