import { returnLinebreakRegex } from "./regex.ts";

export async function dayFourA(): Promise<number> {
  const linebreak: RegExp = returnLinebreakRegex();
  let numberOfXMAS: number = 0;
  const text: string = await Deno.readTextFile("day-4.input");
  const rows: string[] = text.split(linebreak);
  const letters: string[][] = rows.map((row: string): string[] =>
    row.split("")
  );
  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < letters[0].length; j++) {
      if (letters[i][j] === "X") {
        numberOfXMAS += howManyXMAS(letters, i, j, 1);
        numberOfXMAS += howManyXMAS(letters, i, j, -1);
      }
    }
  }
  return numberOfXMAS;
}

export async function dayFourB(): Promise<number> {
  const linebreak: RegExp = returnLinebreakRegex();
  let numberOfXShapeMas: number = 0;
  const text: string = await Deno.readTextFile("day-4.input");
  const rows: string[] = text.split(linebreak);
  const letters: string[][] = rows.map((row: string): string[] =>
    row.split("")
  );
  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < letters[0].length; j++) {
      if (letters[i][j] === "A") {
        if (isXShapeMas(letters, i, j)) {
          numberOfXShapeMas++;
        }
      }
    }
  }
  return numberOfXShapeMas;
}

function howManyXMAS(
  letters: string[][],
  i: number,
  j: number,
  direction: number,
): number {
  function checkProgress(
    letters: string[][],
    x: number,
    y: number,
    progress: number,
  ): number {
    if (x < letters.length && y < letters[0].length && x >= 0 && y >= 0) {
      if (letters[x][y] === goal[progress]) {
        if (goal[progress] === "S") {
          return 1;
        }
        return 0;
      } else {
        return -1;
      }
    } else {
      return -1;
    }
  }
  const goal: string[] = ["X", "M", "A", "S"];
  let numberOfXMAS: number = 0;
  let x: number;
  let y: number;
  // Diagonal Up
  for (let progress = 1; progress < goal.length; progress++) {
    x = i - (progress * direction);
    y = j + (progress * direction);
    const status = checkProgress(letters, x, y, progress);
    if (status === -1) break;
    if (status === 0) continue;
    if (status === 1) numberOfXMAS++;
  }
  // Horizontal
  for (let progress = 1; progress < goal.length; progress++) {
    x = i;
    y = j + (progress * direction);
    const status = checkProgress(letters, x, y, progress);
    if (status === -1) break;
    if (status === 0) continue;
    if (status === 1) numberOfXMAS++;
  }
  // Diagonal Down
  for (let progress = 1; progress < goal.length; progress++) {
    x = i + (progress * direction);
    y = j + (progress * direction);
    const status = checkProgress(letters, x, y, progress);
    if (status === -1) break;
    if (status === 0) continue;
    if (status === 1) numberOfXMAS++;
  }
  // Vertical
  for (let progress = 1; progress < goal.length; progress++) {
    x = i + (progress * direction);
    y = j;
    const status = checkProgress(letters, x, y, progress);
    if (status === -1) break;
    if (status === 0) continue;
    if (status === 1) numberOfXMAS++;
  }

  return numberOfXMAS;
}

function isXShapeMas(letters: string[][], i: number, j: number): boolean {
  function isInBound(letters: string[][], x: number, y: number) {
    return x >= 0 && x < letters.length && y >= 0 && y < letters[0].length;
  }
  let isXShape = false;
  const goal: string = "MAS";
  const goalReverse: string = goal.split("").reverse().join("");
  let stringDown: string = "";
  let stringUp: string = "";
  let x: number = i - 1;
  let y: number = j - 1;
  if (isInBound(letters, x, y)) {
    stringDown = stringDown.concat(letters[x][y]);
  } else {
    return isXShape;
  }
  stringDown = stringDown.concat("A");
  x = i + 1;
  y = j + 1;
  if (isInBound(letters, x, y)) {
    stringDown = stringDown.concat(letters[x][y]);
  } else {
    return isXShape;
  }
  x = i + 1;
  y = j - 1;
  if (isInBound(letters, x, y)) {
    stringUp = stringUp.concat(letters[x][y]);
  } else {
    return isXShape;
  }
  stringUp = stringUp.concat("A");
  x = i - 1;
  y = j + 1;
  if (isInBound(letters, x, y)) {
    stringUp = stringUp.concat(letters[x][y]);
  } else {
    return isXShape;
  }
  if (
    (stringUp === goal || stringUp === goalReverse) &&
    (stringDown === goal || stringDown === goalReverse)
  ) {
    isXShape = true;
  }

  return isXShape;
}

if (import.meta.main) {
  console.log("Part 1:", await dayFourA());
  console.log("Part 2:", await dayFourB());
}
