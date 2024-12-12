export async function dayElevenA(): Promise<number> {
  const text: string = await Deno.readTextFile("day-11.input");
  let stoneArrangement: string[] = text.split(" ");
  const numberOfBlinks: number = 25;
  for (let blink = 1; blink <= numberOfBlinks; blink++) {
    const newStoneArrangement: string[] = [];
    stoneArrangement.forEach((stone: string): void => {
      if (stone === "0") {
        newStoneArrangement.push("1");
      } else if (stone.length % 2 === 0) {
        newStoneArrangement.push(stone.slice(0, stone.length / 2));
        newStoneArrangement.push(
          parseInt(stone.slice(stone.length / 2)).toString(),
        );
      } else {
        newStoneArrangement.push((parseInt(stone) * 2024).toString());
      }
    });
    stoneArrangement = newStoneArrangement;
  }
  return stoneArrangement.length;
}

export async function dayElevenB(): Promise<number> {
  function increaseStoneCount(key: string, numberToIncrease: number): void {
    if (!(key in newState)) {
      newState[key] = numberToIncrease;
    } else {
      newState[key] = newState[key] + numberToIncrease;
    }
  }
  interface HashMap {
    [key: string]: number;
  }
  const text = await Deno.readTextFile("day-11.input");
  const stoneArrangement: string[] = text.split(" ");
  let currentState: HashMap = {};
  let newState: HashMap = {};
  const numberOfBlinks: number = 75;
  for (let i = 0; i < stoneArrangement.length; i++) {
    if (!(stoneArrangement[i] in currentState)) {
      currentState[stoneArrangement[i]] = 1;
    } else {
      currentState[stoneArrangement[i]] = currentState[stoneArrangement[i]] + 1;
    }
  }
  for (let blink = 1; blink <= numberOfBlinks; blink++) {
    newState = {};
    for (const key in currentState) {
      if (key === "0") {
        increaseStoneCount("1", currentState[key]);
      } else if (key.length % 2 === 0) {
        increaseStoneCount(key.slice(0, key.length / 2), currentState[key]);
        increaseStoneCount(
          parseInt(key.slice(key.length / 2)).toString(),
          currentState[key],
        );
      } else {
        increaseStoneCount(
          (parseInt(key) * 2024).toString(),
          currentState[key],
        );
      }
    }
    currentState = newState;
  }
  let totalNumberOfStones: number = 0;
  for (const key in currentState) {
    totalNumberOfStones += currentState[key];
  }
  return totalNumberOfStones;
}

if (import.meta.main) {
  console.log("Part 1:", await dayElevenA());
  console.log("Part 2:", await dayElevenB());
}
