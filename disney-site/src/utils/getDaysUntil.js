export function getDaysUntil(dateStr) {
  const target = new Date(dateStr + 'T00:00:00');
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return Math.ceil((target - now) / 86_400_000);
}

export function getUrgency(dateStr) {
  const days = getDaysUntil(dateStr);
  let level = 'future';
  if (days < 0) level = 'past';
  else if (days <= 30) level = 'urgent';
  else if (days <= 90) level = 'soon';
  return { days, level };
}
