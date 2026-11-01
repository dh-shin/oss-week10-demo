// Run with: node check.js
// logic.js has no document and no fetch, so Node can run it as is.
import { toDays, needsUmbrella, summarize } from "./logic.js";

const daily = {
  time: ["05-21", "05-22", "05-23"],
  temperature_2m_min: [7.7, 3.4, 2.0],
  temperature_2m_max: [10.5, 11.6, 9.8],
  precipitation_probability_max: [78, 50, 10],
};

const days = toDays(daily);
console.log(days[0]);
console.log(needsUmbrella(days[1], 50)); // exactly 50
console.log(summarize(days, 50));
console.log(summarize([], 50));
