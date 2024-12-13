import { returnLinebreakRegex } from "./regex.ts";

export async function dayTwelveA(): Promise<number> {
  function findRegion(
    typeOfPlant: string,
    x: number,
    y: number,
  ): { perimeter: number; area: number } {
    mapArray[x][y] = typeOfPlant.toLowerCase();
    if (!lowerCase.includes(typeOfPlant.toLowerCase())) {
      lowerCase.push(typeOfPlant.toLowerCase());
    }
    const currentRegion: { perimeter: number; area: number } = {
      perimeter: 0,
      area: 1,
    };
    if (isInBound(x - 1, y) && mapArray[x - 1][y] === typeOfPlant) {
      const nextRegtion: { perimeter: number; area: number } = findRegion(
        typeOfPlant,
        x - 1,
        y,
      );
      currentRegion.area += nextRegtion.area;
      currentRegion.perimeter += nextRegtion.perimeter;
    } else if (
      isInBound(x - 1, y) && mapArray[x - 1][y] !== typeOfPlant.toLowerCase() ||
      !isInBound(x - 1, y)
    ) {
      currentRegion.perimeter++;
    }
    if (isInBound(x, y + 1) && mapArray[x][y + 1] === typeOfPlant) {
      const nextRegtion: { perimeter: number; area: number } = findRegion(
        typeOfPlant,
        x,
        y + 1,
      );
      currentRegion.area += nextRegtion.area;
      currentRegion.perimeter += nextRegtion.perimeter;
    } else if (
      (isInBound(x, y + 1) &&
        mapArray[x][y + 1] !== typeOfPlant.toLowerCase()) ||
      !isInBound(x, y + 1)
    ) {
      currentRegion.perimeter++;
    }
    if (isInBound(x, y - 1) && mapArray[x][y - 1] === typeOfPlant) {
      const nextRegtion: { perimeter: number; area: number } = findRegion(
        typeOfPlant,
        x,
        y - 1,
      );
      currentRegion.area += nextRegtion.area;
      currentRegion.perimeter += nextRegtion.perimeter;
    } else if (
      isInBound(x, y - 1) && mapArray[x][y - 1] !== typeOfPlant.toLowerCase() ||
      !isInBound(x, y - 1)
    ) {
      currentRegion.perimeter++;
    }
    if (isInBound(x + 1, y) && mapArray[x + 1][y] === typeOfPlant) {
      const nextRegtion: { perimeter: number; area: number } = findRegion(
        typeOfPlant,
        x + 1,
        y,
      );
      currentRegion.area += nextRegtion.area;
      currentRegion.perimeter += nextRegtion.perimeter;
    } else if (
      isInBound(x + 1, y) && mapArray[x + 1][y] !== typeOfPlant.toLowerCase() ||
      !isInBound(x + 1, y)
    ) {
      currentRegion.perimeter++;
    }
    return currentRegion;
  }

  function isInBound(x: number, y: number): boolean {
    return x < mapArray.length && x >= 0 && y < mapArray[0].length && y >= 0;
  }

  const linebreak: RegExp = returnLinebreakRegex();
  const text: string = await Deno.readTextFile("day-12.input");
  const rows: string[] = text.split(linebreak);
  const mapArray: string[][] = rows.map((row: string): string[] =>
    row.split("")
  );
  let totalCost: number = 0;
  const lowerCase: string[] = [];
  for (let i = 0; i < mapArray.length; i++) {
    for (let j = 0; j < mapArray[0].length; j++) {
      if (lowerCase.includes(mapArray[i][j])) {
        continue;
      }
      const currentRegion: { perimeter: number; area: number } = findRegion(
        mapArray[i][j],
        i,
        j,
      );
      totalCost += currentRegion.perimeter * currentRegion.area;
    }
  }
  return totalCost;
}

export async function dayTwelveB(): Promise<number> {
  interface Region {
    [key: number]: number[];
  }
  function findRegion(typeOfPlant: string, x: number, y: number): number[][] {
    mapArray[x][y] = typeOfPlant.toLowerCase();
    if (!lowerCase.includes(typeOfPlant.toLowerCase())) {
      lowerCase.push(typeOfPlant.toLowerCase());
    }
    let currentRegion: number[][] = [[x, y]];
    if (isInBound(x - 1, y) && mapArray[x - 1][y] === typeOfPlant) {
      const nextRegtion: number[][] = findRegion(typeOfPlant, x - 1, y);
      currentRegion = currentRegion.concat(nextRegtion);
    }
    if (isInBound(x, y + 1) && mapArray[x][y + 1] === typeOfPlant) {
      const nextRegtion: number[][] = findRegion(typeOfPlant, x, y + 1);
      currentRegion = currentRegion.concat(nextRegtion);
    }
    if (isInBound(x, y - 1) && mapArray[x][y - 1] === typeOfPlant) {
      const nextRegtion: number[][] = findRegion(typeOfPlant, x, y - 1);
      currentRegion = currentRegion.concat(nextRegtion);
    }
    if (isInBound(x + 1, y) && mapArray[x + 1][y] === typeOfPlant) {
      const nextRegtion: number[][] = findRegion(typeOfPlant, x + 1, y);
      currentRegion = currentRegion.concat(nextRegtion);
    }
    return currentRegion;
  }

  function isInBound(x: number, y: number): boolean {
    return x < mapArray.length && x >= 0 && y < mapArray[0].length && y >= 0;
  }

  function numberOfSidesX(
    region: Region,
    direction: number,
    typeOfPlant: string,
  ): number {
    let sides: number = 0;
    for (const x in region) {
      let potentialSide: boolean = false;
      for (let i = 0; i < region[x].length; i++) {
        if (
          (parseInt(x) + direction) in region &&
          mapArray[parseInt(x) + direction][region[x][i]] === typeOfPlant
        ) {
          if (potentialSide === true) {
            sides++;
          }
          potentialSide = false;
        } else if (
          region[x][i] + 1 < mapArray[0].length &&
          mapArray[parseInt(x)][region[x][i] + 1] !== typeOfPlant
        ) {
          sides++;
          potentialSide = false;
        } else {
          potentialSide = true;
        }
      }
      if (potentialSide === true) {
        sides++;
      }
    }
    return sides;
  }

  function numberOfSidesY(
    region: Region,
    direction: number,
    typeOfPlant: string,
  ): number {
    let sides: number = 0;
    for (const y in region) {
      let potentialSide: boolean = false;
      for (let i = 0; i < region[y].length; i++) {
        if (
          (parseInt(y) + direction) in region &&
          mapArray[region[y][i]][parseInt(y) + direction] === typeOfPlant
        ) {
          if (potentialSide === true) {
            sides++;
          }
          potentialSide = false;
        } else if (
          region[y][i] + 1 < mapArray.length &&
          mapArray[region[y][i] + 1][parseInt(y)] !== typeOfPlant
        ) {
          sides++;
          potentialSide = false;
        } else {
          potentialSide = true;
        }
      }
      if (potentialSide === true) {
        sides++;
      }
    }
    return sides;
  }

  const linebreak: RegExp = returnLinebreakRegex();
  const text: string = await Deno.readTextFile("day-12.input");
  const rows: string[] = text.split(linebreak);
  const mapArray: string[][] = rows.map((row: string): string[] =>
    row.split("")
  );
  let totalCost: number = 0;
  const lowerCase: string[] = [];
  for (let i = 0; i < mapArray.length; i++) {
    for (let j = 0; j < mapArray[0].length; j++) {
      if (lowerCase.includes(mapArray[i][j])) {
        continue;
      }
      let currentRegion: number[][] = findRegion(mapArray[i][j], i, j);
      const area = currentRegion.length;
      currentRegion = currentRegion.sort((a: number[], b: number[]) =>
        a[0] - b[0] || a[1] - b[1]
      );
      const regionX: Region = {};
      for (let x = 0; x < currentRegion.length; x++) {
        if (!regionX[currentRegion[x][0]]) {
          regionX[currentRegion[x][0]] = [currentRegion[x][1]];
        } else {
          regionX[currentRegion[x][0]].push(currentRegion[x][1]);
        }
      }
      const regionY: Region = {};
      for (let y = 0; y < currentRegion.length; y++) {
        if (!regionY[currentRegion[y][1]]) {
          regionY[currentRegion[y][1]] = [currentRegion[y][0]];
        } else {
          regionY[currentRegion[y][1]].push(currentRegion[y][0]);
        }
      }
      const currentPlant: string =
        mapArray[currentRegion[0][0]][currentRegion[0][1]];
      const sides: number = numberOfSidesX(regionX, -1, currentPlant) +
        numberOfSidesX(regionX, 1, currentPlant) +
        numberOfSidesY(regionY, -1, currentPlant) +
        numberOfSidesY(regionY, 1, currentPlant);
      totalCost += area * sides;
    }
  }
  return totalCost;
}

if (import.meta.main) {
  //console.log("Part 1:", await dayTwelveA());
  console.log("Part 2:", await dayTwelveB());
}
