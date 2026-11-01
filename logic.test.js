import { test, expect } from "vitest";
import { toDays, needsUmbrella, summarize } from "./logic.js";

const daily = {
  time: ["05-21", "05-22", "05-23"],
  temperature_2m_min: [7.7, 3.4, 2.0],
  temperature_2m_max: [10.5, 11.6, 9.8],
  precipitation_probability_max: [78, 50, 10],
};

test("toDays builds one object per day", () => {
  const days = toDays(daily);
  expect(days[0]).toEqual({ date: "05-21", min: 7.7, max: 10.5, rain: 78 });
});

test("umbrella when rain is above the threshold", () => {
  expect(needsUmbrella({ rain: 78 }, 50)).toBe(true);
});

test("umbrella when rain is exactly the threshold", () => {
  expect(needsUmbrella({ rain: 50 }, 50)).toBe(true);
});

test("no umbrella when rain is below the threshold", () => {
  expect(needsUmbrella({ rain: 10 }, 50)).toBe(false);
});

test("summarize counts the wet days", () => {
  expect(summarize(toDays(daily), 50)).toBe("umbrella on 2 of 3 days");
});

test("summarize works with no days", () => {
  expect(summarize([], 50)).toBe("umbrella on 0 of 0 days");
});
