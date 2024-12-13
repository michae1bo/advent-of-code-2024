export async function dayThirteenA(): Promise<number> {
  const text: string = await Deno.readTextFile("day-13.input");
  const numberRegex: RegExp = /\d+/g;
  const numberMatches: RegExpExecArray[] = [...text.matchAll(numberRegex)];
  const machines: number[][] = [];
  let currentMachine: number[] = [];
  for (let i = 0; i < numberMatches.length; i++) {
    currentMachine.push(parseInt(numberMatches[i][0]));
    if (currentMachine.length === 6) {
      machines.push(currentMachine);
      currentMachine = [];
    }
  }
  let totalCost: number = 0;
  machines.forEach((machine: number[]): void => {
    const aX: number = machine[0];
    const aY: number = machine[1];
    const bX: number = machine[2];
    const bY: number = machine[3];
    const goalX: number = machine[4];
    const goalY: number = machine[5];
    for (let b = 100; b >= 0; b--) {
      let a: number = 0;
      let posX: number = bX * b;
      let posY: number = bY * b;
      if (posX > goalX || posY > goalY) {
        continue;
      } else if (posX < goalX || posY < goalY) {
        for (let i = 1; i <= 100; i++) {
          posX += aX;
          posY += aY;
          if (posX >= goalX || posY >= goalY) {
            a = i;
            break;
          }
        }
      }
      if (posX === goalX && posY === goalY) {
        totalCost += a * 3 + b;
        break;
      }
    }
  });

  return totalCost;
}

export async function dayThirteenB(): Promise<number> {
  const text: string = await Deno.readTextFile("day-13.input");
  const numberRegex: RegExp = /\d+/g;
  const numberMatches: RegExpExecArray[] = [...text.matchAll(numberRegex)];
  const machines: number[][] = [];
  let currentMachine: number[] = [];
  for (let i = 0; i < numberMatches.length; i++) {
    currentMachine.push(parseInt(numberMatches[i][0]));
    if (currentMachine.length === 6) {
      machines.push(currentMachine);
      currentMachine = [];
    }
  }
  let totalCost: number = 0;
  machines.forEach((machine: number[]): void => {
    const aX: number = machine[0];
    const aY: number = machine[1];
    const bX: number = machine[2];
    const bY: number = machine[3];
    const goalX: number = machine[4] + 10000000000000;
    const goalY: number = machine[5] + 10000000000000;
    // Some simple linear algebra
    const b: number = (aY * goalX - aX * goalY) / (bX * aY - bY * aX);
    const a: number = (goalY - b * bY) / aY;
    if (a === Math.floor(a) && b === Math.floor(b)) {
      totalCost += a * 3 + b;
    }
  });

  return totalCost;
}

if (import.meta.main) {
  console.log("Part 1:", await dayThirteenA());
  console.log("Part 2:", await dayThirteenB());
}
