import { getForecast } from "./api.js";
import { toDays, needsUmbrella, summarize } from "./logic.js";

const CITIES = {
  seoul: { name: "Seoul", lat: 37.566, lon: 126.9784 },
  busan: { name: "Busan", lat: 35.1017, lon: 129.03 },
  jeju: { name: "Jeju", lat: 33.5097, lon: 126.5219 },
};

const form = document.querySelector("#check-form");
const citySelect = document.querySelector("#city");
const thresholdInput = document.querySelector("#threshold");
const statusEl = document.querySelector("#status");
const summaryEl = document.querySelector("#summary");
const rowsEl = document.querySelector("#rows");

// All the data the screen shows. render() draws the page from it.
const state = { city: null, days: [], threshold: Number(thresholdInput.value) };

function dayRow(day) {
  const tr = document.createElement("tr");
  for (const text of [day.date.slice(5), `${day.min}°`, `${day.max}°`, `${day.rain}%`]) {
    const td = document.createElement("td");
    td.textContent = text;
    tr.append(td);
  }
  if (needsUmbrella(day, state.threshold)) tr.classList.add("wet");
  return tr;
}

function render() {
  summaryEl.textContent = state.city
    ? `${state.city.name}: ${summarize(state.days, state.threshold)}.`
    : "";
  rowsEl.replaceChildren(...state.days.map(dayRow));
}

form.addEventListener("submit", async (event) => {
  event.preventDefault(); // stop the page from reloading
  const city = CITIES[citySelect.value];
  statusEl.textContent = "Loading...";
  statusEl.classList.remove("error");
  try {
    const daily = await getForecast(city);
    state.city = city;
    state.days = toDays(daily);
    statusEl.textContent = "";
  } catch (err) {
    statusEl.textContent =
      `Could not load the forecast (${err.message}).`;
    statusEl.classList.add("error");
  }
  render();
});

thresholdInput.addEventListener("input", () => {
  state.threshold = Number(thresholdInput.value);
  render(); // no new request: same data, new rule
});
