import { test, expect } from "vitest";
import { tempRange } from "./logic.js";

test("tempRange finds the lowest min and the highest max", () => {
  const days = [
    { date: "05-21", min: 7.7, max: 10.5, rain: 78 },
    { date: "05-22", min: 3.4, max: 11.6, rain: 50 },
    { date: "05-23", min: 2.0, max: 9.8, rain: 10 },
  ];
  expect(tempRange(days)).toEqual({ min: 2.0, max: 11.6 });
});

test("tempRange returns null for no days", () => {
  expect(tempRange([])).toBe(null);
});
