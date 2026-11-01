export function toDays(daily) {
  return daily.time.map((date, i) => ({
    date,
    min: daily.temperature_2m_min[i],
    max: daily.temperature_2m_max[i],
    rain: daily.precipitation_probability_max[i],
  }));
}

export function needsUmbrella(day, threshold) {
  return day.rain >= threshold;
}

export function summarize(days, threshold) {
  const wet = days.filter((day) => needsUmbrella(day, threshold));
  return `umbrella on ${wet.length} of ${days.length} days`;
}

export function tempRange(days) {
  if (days.length === 0) return null;
  const mins = days.map((day) => day.min);
  const maxes = days.map((day) => day.max);
  return { min: Math.min(...mins), max: Math.max(...maxes) };
}
