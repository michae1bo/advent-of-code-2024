import { returnLinebreakRegex } from "./regex.ts";

interface Guard {
  position: number[];
  direction: number;
}

export async function daySixA(): Promise<number> {
  const linebreak: RegExp = returnLinebreakRegex();
  let numberOfDistinctPositions: number = 0;
  let inBound: boolean = true;
  const text = await Deno.readTextFile("day-6.input");
  const mapArray: string[][] = text.split(linebreak).map((
    row: string,
  ): string[] => row.split(""));
  const guard: Guard = getGuardStartingPosition(mapArray);
  let speedX: number = 0;
  let speedY: number = 0;
  while (inBound) {
    switch (guard.direction) {
      case 0:
        speedX = -1;
        speedY = 0;
        break;
      case 1:
        speedX = 0;
        speedY = 1;
        break;
      case 2:
        speedX = 1;
        speedY = 0;
        break;
      case 3:
        speedX = 0;
        speedY = -1;
        break;
    }

    if (
      (guard.position[0] + speedX >= mapArray.length ||
        guard.position[0] + speedX < 0) ||
      (guard.position[1] + speedY >= mapArray[guard.position[0]].length ||
        guard.position[1] + speedY < 0)
    ) {
      mapArray[guard.position[0]][guard.position[1]] = "X";
      numberOfDistinctPositions++;
      inBound = false;
    } else if (
      mapArray[guard.position[0] + speedX][guard.position[1] + speedY] === "#"
    ) {
      if (guard.direction < 3) {
        guard.direction++;
      } else {
        guard.direction = 0;
      }
    } else {
      if (mapArray[guard.position[0]][guard.position[1]] !== "X") {
        mapArray[guard.position[0]][guard.position[1]] = "X";
        numberOfDistinctPositions++;
      }
      guard.position = [guard.position[0] + speedX, guard.position[1] + speedY];
    }
  }

  return numberOfDistinctPositions;
}

export async function daySixB(): Promise<number> {
  const linebreak: RegExp = returnLinebreakRegex();
  let numberOfPossibleObstruction: number = 0;
  let inBound: boolean = true;
  const text = await Deno.readTextFile("day-6.input");
  const mapArray: string[][] = text.split(linebreak).map((
    row: string,
  ): string[] => row.split(""));
  const guard: Guard = getGuardStartingPosition(mapArray);
  const biggestLoop: number = mapArray.length * 2 + mapArray[0].length * 2;
  let inPossibleLoop: boolean = false;
  let currentSetps: number = 0;
  let speedX: number = 0;
  let speedY: number = 0;
  const guardStartingPosition = guard.position;
  const guardStartingDirection = guard.direction;
  for (let i = 0; i < mapArray.length; i++) {
    for (let j = 0; j < mapArray[0].length; j++) {
      guard.position = guardStartingPosition;
      guard.direction = guardStartingDirection;
      inBound = true;
      inPossibleLoop = false;
      currentSetps = 0;
      if (
        (i !== guard.position[0] || j !== guard.position[1]) &&
        mapArray[i][j] !== "#"
      ) {
        mapArray[i][j] = "O";
      } else {
        continue;
      }
      while (inBound) {
        switch (guard.direction) {
          case 0:
            speedX = -1;
            speedY = 0;
            break;
          case 1:
            speedX = 0;
            speedY = 1;
            break;
          case 2:
            speedX = 1;
            speedY = 0;
            break;
          case 3:
            speedX = 0;
            speedY = -1;
            break;
        }
        if (
          (guard.position[0] + speedX >= mapArray.length ||
            guard.position[0] + speedX < 0) ||
          (guard.position[1] + speedY >= mapArray[guard.position[0]].length ||
            guard.position[1] + speedY < 0)
        ) {
          inBound = false;
        } else if (
          mapArray[guard.position[0] + speedX][guard.position[1] + speedY] ===
            "#"
        ) {
          if (guard.direction < 3) {
            guard.direction++;
          } else {
            guard.direction = 0;
          }
        } else if (
          mapArray[guard.position[0] + speedX][guard.position[1] + speedY] ===
            "O"
        ) {
          if (guard.direction < 3) {
            guard.direction++;
          } else {
            guard.direction = 0;
          }
          inPossibleLoop = true;
        } else {
          guard.position = [
            guard.position[0] + speedX,
            guard.position[1] + speedY,
          ];
          if (inPossibleLoop) {
            currentSetps++;
            //Not really elagant : ^)
            if (currentSetps > biggestLoop * 100) {
              numberOfPossibleObstruction++;
              break;
            }
          }
        }
      }
      mapArray[i][j] = ".";
    }
  }

  return numberOfPossibleObstruction;
}

function getGuardStartingPosition(mapArray: string[][]): Guard {
  const guard: Guard = {
    position: [0, 0],
    direction: 0,
  };
  const guardDirections: string[] = ["^", ">", "v", "<"];
  for (let i = 0; i < mapArray.length; i++) {
    for (let j = 0; j < mapArray[i].length; j++) {
      if (guardDirections.includes(mapArray[i][j])) {
        guard.position = [i, j];
        guard.direction = guardDirections.indexOf(mapArray[i][j]);
      }
    }
  }
  return guard;
}

if (import.meta.main) {
  console.log("Part 1:", await daySixA());
  console.log("Part 2:", await daySixB());
}
