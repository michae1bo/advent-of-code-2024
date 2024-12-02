import { dayOneA, dayOneB } from "./day-1.ts";

if (import.meta.main) {
    console.log("(Day 1) Part 1:", await dayOneA(), "Part 2:", await dayOneB());
  }