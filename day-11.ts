export async function dayElevenA(): Promise<number> {
  const text: string = await Deno.readTextFile("day-11.input");
  let stoneArrangement: string[] = text.split(" ");
  const numberOfBlinks: number = 25;
  for (let x = 1; x <= numberOfBlinks; x++) {
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
  const text: string = await Deno.readTextFile("day-11.input");
  let stoneArrangement: string[] = text.split(" ");
  const numberOfBlinks: number = 25;
  for (let x = 1; x <= numberOfBlinks; x++) {
    const newStoneArrangement: string[] = [];
    for (let i = 0; i < stoneArrangement.length; i++) {
      const stone = stoneArrangement[i];
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
    }

    stoneArrangement = newStoneArrangement;
  }
  return stoneArrangement.length;
}

if (import.meta.main) {
  console.log("Part 1:", await dayElevenA());
  console.log("Part 2:", await dayElevenB());
}
