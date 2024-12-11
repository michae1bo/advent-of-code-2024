import { returnLinebreakRegex } from "./regex.ts";

export async function dayTenA(): Promise<number> {
  let sumTrailheadScores: number = 0;
  let trails: number[][] = [];
  const linebreak = returnLinebreakRegex();
  const text: string = await Deno.readTextFile("day-10.input");
  const mapArray: number[][] = text.split(linebreak).map(
    (row: string): number[] => {
      return row.split("").map((char: string) => parseInt(char));
    },
  );
  for (let i = 0; i < mapArray.length; i++) {
    for (let j = 0; j < mapArray[0].length; j++) {
      if (mapArray[i][j] === 0) {
        trails = findTrails(mapArray, i, j);
        const uniqueEndPoints: number[][] = removeDuplicateArrays(trails);
        sumTrailheadScores += uniqueEndPoints.length;
      }
    }
  }
  return sumTrailheadScores;
}

export async function dayTenB(): Promise<number> {
  let sumTrailheadScores: number = 0;
  const linebreak = returnLinebreakRegex();
  const text: string = await Deno.readTextFile("day-10.input");
  const mapArray: number[][] = text.split(linebreak).map(
    (row: string): number[] => {
      return row.split("").map((char: string) => parseInt(char));
    },
  );
  for (let i = 0; i < mapArray.length; i++) {
    for (let j = 0; j < mapArray[0].length; j++) {
      if (mapArray[i][j] === 0) {
        sumTrailheadScores += findTrails(mapArray, i, j).length;
      }
    }
  }
  return sumTrailheadScores;
}

function findTrails(mapArray: number[][], i: number, j: number): number[][] {
  let returnTrails: number[][] = [];
  if (mapArray[i][j] === 9) {
    return [[i, j]];
  }
  // check upward path
  if (i - 1 >= 0 && mapArray[i][j] + 1 === mapArray[i - 1][j]) {
    const upTrails: number[][] = findTrails(mapArray, i - 1, j);
    returnTrails = returnTrails.concat(upTrails);
  }
  // check downward path
  if (i + 1 < mapArray.length && mapArray[i][j] + 1 === mapArray[i + 1][j]) {
    const downTrails: number[][] = findTrails(mapArray, i + 1, j);
    returnTrails = returnTrails.concat(downTrails);
  }
  // check left path
  if (j - 1 >= 0 && mapArray[i][j] + 1 === mapArray[i][j - 1]) {
    const leftTrails: number[][] = findTrails(mapArray, i, j - 1);
    returnTrails = returnTrails.concat(leftTrails);
  }
  // check right path
  if (j + 1 < mapArray[0].length && mapArray[i][j] + 1 === mapArray[i][j + 1]) {
    const rightTrails: number[][] = findTrails(mapArray, i, j + 1);
    returnTrails = returnTrails.concat(rightTrails);
  }

  return returnTrails;
}

function removeDuplicateArrays(trails: number[][]): number[][] {
  interface HashTable {
    [key: number]: number[];
  }
  const trailsTable: HashTable = {};
  const uniqueEndPoints: number[][] = [];

  trails.forEach((trail: number[]): void => {
    if (!trailsTable[trail[0]]) {
      trailsTable[trail[0]] = [trail[1]];
    } else if (!trailsTable[trail[0]].includes(trail[1])) {
      trailsTable[trail[0]].push(trail[1]);
    }
  });
  for (const key in trailsTable) {
    trailsTable[key].forEach((value: number): void => {
      uniqueEndPoints.push([parseInt(key), value]);
    });
  }
  return uniqueEndPoints;
}

if (import.meta.main) {
  console.log("Part 1:", await dayTenA());
  console.log("Part 2:", await dayTenB());
}
