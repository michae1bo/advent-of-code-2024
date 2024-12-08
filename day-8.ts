import { returnLinebreakRegex } from "./regex.ts";

export async function dayEightA(): Promise<number> {
    let numberOfAntinodes: number = 0;
    const linebreak: RegExp = returnLinebreakRegex();
    const text: string = await Deno.readTextFile("day-8.input");
    const rows: string[] = text.split(linebreak);
    const towerMap: string[][] = rows.map((row: string): string[] => row.split(""));
    const antinodeMap: string[][] = rows.map((row: string): string[] => row.split(""));
    for (let i = 0; i < towerMap.length; i++) {
        for (let j = 0; j < towerMap[0].length; j++) {
            if (towerMap[i][j] === ".") {
                continue;
            }
            getAntinodes(towerMap, i, j).forEach((coordinates: number[]): void => {antinodeMap[coordinates[0]][coordinates[1]] = "#"} )
        }
    }
    antinodeMap.forEach((row: string[]):void => {numberOfAntinodes += row.filter((z: string): boolean => z === "#").length})
    return numberOfAntinodes;
}

export async function dayEightB(): Promise<number> {
    let numberOfAntinodes: number = 0;
    const linebreak: RegExp = returnLinebreakRegex();
    const text: string = await Deno.readTextFile("day-8.input");
    const rows: string[] = text.split(linebreak);
    const towerMap: string[][] = rows.map((row: string): string[] => row.split(""));
    const antinodeMap: string[][] = rows.map((row: string): string[] => row.split(""));
    for (let i = 0; i < towerMap.length; i++) {
        for (let j = 0; j < towerMap[0].length; j++) {
            if (towerMap[i][j] === ".") {
                continue;
            }
            getAntinodesB(towerMap, i, j).forEach((coordinates: number[]): void => {antinodeMap[coordinates[0]][coordinates[1]] = "#"} )
        }
    }
    antinodeMap.forEach((row: string[]):void => {numberOfAntinodes += row.filter((z: string): boolean => z === "#").length})
    return numberOfAntinodes;
}

function getAntinodes(map: string[][], i: number, j: number): number[][] {
    const antinodeCoordinates: number[][] = [];
    let xDistance: number = 0;
    let yDistance: number = 0;
    for (let x = 0; x < map.length; x++) {
        for (let y = 0; y < map[0].length; y++) {
            if (map[x][y] === map[i][j] && (x !== i || y !== j)) {
                xDistance = x - i;
                yDistance = y - j;
                if (isInBound(map, x + xDistance, y + yDistance)) {
                    if (!antinodeCoordinates.includes([x + xDistance, y + yDistance]) && !(x + xDistance === i && y + yDistance === j)) {
                        antinodeCoordinates.push([x + xDistance, y + yDistance]);
                    }
                }
                
            }
                
        }
    }
    return antinodeCoordinates;
}

function getAntinodesB(map: string[][], i: number, j: number): number[][] {
    const antinodeCoordinates: number[][] = [];
    let xDistance: number = 0;
    let yDistance: number = 0;
    for (let x = 0; x < map.length; x++) {
        for (let y = 0; y < map[0].length; y++) {
            if (map[x][y] === map[i][j] && (x !== i || y !== j)) {
                if (!antinodeCoordinates.includes([x, y])) {
                    antinodeCoordinates.push([x, y]);
                }
                xDistance = x - i;
                yDistance = y - j;
                while (isInBound(map, x + xDistance, y + yDistance)) {
                    if (!antinodeCoordinates.includes([x + xDistance, y + xDistance])) {
                        antinodeCoordinates.push([x + xDistance, y + yDistance]);
                    }
                    xDistance = xDistance + x - i;
                    yDistance = yDistance + y - j;
                }
            }
                
        }
    }
    return antinodeCoordinates;
}

function isInBound(map: string[][], x: number, y: number): boolean {
    return (x < map.length && x >= 0 && y < map[0].length && y >= 0);
}


if (import.meta.main) {
    console.log("Part 1:", await dayEightA());
    console.log("Part 2:", await dayEightB());
}