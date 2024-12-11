import { returnLinebreakRegex } from "./regex.ts";

export async function dayOneA(): Promise<number> {
  let totalDistance: number = 0;
  let distance: number;
  const linebreak: RegExp = returnLinebreakRegex();
  const text = await Deno.readTextFile("day-1.input");
  const arrayOne: number[] = text.split(linebreak).map((row: string) =>
    parseInt(row.split("   ")[0])
  );
  const arrayTwo: number[] = text.split(linebreak).map((row: string) =>
    parseInt(row.split("   ")[1])
  );
  const sortedOne: number[] = arrayOne.sort((a: number, b: number) => b - a);
  const sortedTwo: number[] = arrayTwo.sort((a: number, b: number) => b - a);
  const arrayLength: number = arrayOne.length;
  for (let i: number = 0; i < arrayLength; i++) {
    distance = sortedOne[i] - sortedTwo[i];
    if (distance < 0) {
      distance = -1 * distance;
    }
    totalDistance += distance;
  }

  return totalDistance;
}

export async function dayOneB(): Promise<number> {
  const linebreak: RegExp = returnLinebreakRegex();
  let similarity: number = 0;
  const text = await Deno.readTextFile("day-1.input");
  const arrayOne: number[] = text.split(linebreak).map((row: string) =>
    parseInt(row.split("   ")[0])
  );
  const arrayTwo: number[] = text.split(linebreak).map((row: string) =>
    parseInt(row.split("   ")[1])
  );

  arrayOne.forEach((firstID) => {
    const matches: number[] = arrayTwo.filter((secondID) =>
      firstID === secondID
    );
    similarity += firstID * matches.length;
  });

  return similarity;
}

if (import.meta.main) {
  console.log("Part 1:", await dayOneA());
  console.log("Part 2:", await dayOneB());
}
