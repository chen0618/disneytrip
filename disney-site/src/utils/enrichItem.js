import { officialData } from '../data/officialDisneyData';

export function enrichItem(item) {
  // Look up by id first, then by name (food items use name as key)
  const official = officialData[item.id] || officialData[item.name] || {};
  return {
    ...item,
    officialUrl: official.officialUrl || null,
    officialImage: official.officialImage || null,
  };
}
