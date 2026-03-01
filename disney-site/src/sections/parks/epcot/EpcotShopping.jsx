import ParkShoppingSection from '../shared/ParkShoppingSection';

export default function EpcotShopping({ onSelectItem }) {
  return <ParkShoppingSection parkName="EPCOT" sectionId="epcot-shopping" background="var(--bg-alt)" onSelectItem={onSelectItem} />;
}
