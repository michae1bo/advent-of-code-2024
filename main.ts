import { dayOneA, dayOneB } from "./day-1.ts";
import { dayTwoA, dayTwoB } from "./day-2.ts";
import { dayThreeA, dayThreeB } from "./day-3.ts";
import { dayFourA, dayFourB } from "./day-4.ts";
import { dayFiveA, dayFiveB } from "./day-5.ts";
import { daySixA, daySixB } from "./day-6.ts";
import { daySevenA, daySevenB } from "./day-7.ts";
import { dayEightA, dayEightB } from "./day-8.ts";
import { dayNineA, dayNineB } from "./day-9.ts";
import { dayTenA, dayTenB } from "./day-10.ts";

if (import.meta.main) {
    console.log("(Day  1)  Part 1:", await dayOneA(), "\n          Part 2:", await dayOneB());
    console.log("(Day  2)  Part 1:", await dayTwoA(), "\n          Part 2:", await dayTwoB());
    console.log("(Day  3)  Part 1:", await dayThreeA(), "\n          Part 2:", await dayThreeB());
    console.log("(Day  4)  Part 1:", await dayFourA(), "\n          Part 2:", await dayFourB());
    console.log("(Day  5)  Part 1:", await dayFiveA(), "\n          Part 2:", await dayFiveB());
    console.log("(Day  6)  Part 1:", await daySixA(), "\n          Part 2:", await daySixB());
    console.log("(Day  7)  Part 1:", await daySevenA(), "\n          Part 2:", await daySevenB());
    console.log("(Day  8)  Part 1:", await dayEightA(), "\n          Part 2:", await dayEightB());
    console.log("(Day  9)  Part 1:", await dayNineA(), "\n          Part 2:", await dayNineB());
    console.log("(Day 10)  Part 1:", await dayTenA(), "\n          Part 2:", await dayTenB());
  }