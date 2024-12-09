export async function dayNineA(): Promise<number> {
    const text: string = await Deno.readTextFile("day-9.input");
    const diskMap: number[] = text.split("").map((string: string): number => parseInt(string));
    const diskArray: string[] = constructDisk(diskMap);
    const finalArray: string[] = swapSingleBlock(diskArray);
    return calculateChecksum(finalArray);
}

export async function dayNineB(): Promise<number> {
    const text: string = await Deno.readTextFile("day-9.input");
    const diskMap: number[] = text.split("").map((string: string): number => parseInt(string));
    const diskArray: string[] = constructDisk(diskMap);
    const finalArray: string[] = swapWholeFile(diskArray);
    return calculateChecksum(finalArray);
}

function constructDisk(diskMap: number[]): string[] {
    const diskArray: string[] = [];
    let nextID: number = 0;
    let nextCharacter: string;
    for (let i = 0; i < diskMap.length; i++) {
        if (i % 2 === 0) {
            nextCharacter = nextID.toString();
            nextID++;
        } else {
            nextCharacter = ".";
        }
        const endIndex: number = diskArray.length + diskMap[i];
        for (let j = diskArray.length; j < endIndex; j++) {
            diskArray[j] = nextCharacter;
        }
    }
    return diskArray;
}

function swapSingleBlock(diskArray: string[]): string[] {
    for (let i = diskArray.length - 1; i >= 0; i--) {
        const indexFirstEmpty = diskArray.indexOf(".");
        if (indexFirstEmpty >= i) {
            break;
        }
        else if (diskArray[i] === ".") {
            continue;
        }
        diskArray[indexFirstEmpty] = diskArray[i];
        diskArray[i] = ".";
    }
    return diskArray;
}

function swapWholeFile(diskArray: string[]): string[] {
    let currentID: number = -1;
    for (let i = diskArray.length - 1; i >= 0; i--) {
        if (parseInt(diskArray[i + 1]) === currentID) {
            i += 1;
        }
        if (diskArray[i] === ".") {
            continue;
        }
        if (currentID === -1) {
            currentID = parseInt(diskArray[i]);
        }
        else if (parseInt(diskArray[i]) !== currentID) {
            continue;
        }
        let fileLength: number = 1;
        for (let j = i - 1; diskArray[j] === diskArray[i]; j--) {
            fileLength++;
        }
        let emptyLenght: number = 0;
        let emptyIndex: number = -1;
        for (let y = 0; y < diskArray.length; y++) {
            if (diskArray[y] === ".") {
                emptyLenght++
                if (emptyLenght === fileLength) {
                    emptyIndex = y;
                    break;
                }
            } else {
                emptyLenght = 0;
            }
        }
        
        if (emptyIndex <= i - fileLength && emptyIndex >= 0) {
            for (let x = fileLength; x > 0; x--) {
                diskArray[emptyIndex] = diskArray[i];
                diskArray[i] = ".";
                i--;
                emptyIndex--;
            }
        }
        if (currentID === 0) {
            break;
        } else {
            currentID--;
        }
    }
    return diskArray;

}

function calculateChecksum(diskArray: string[]): number {
    let checksum: number = 0;
    for (let i = 0; i < diskArray.length; i++) {
        if (diskArray[i] === ".") {
            continue;
        }
        checksum += parseInt(diskArray[i]) * i;
    }
    return checksum;
}

if (import.meta.main) {
    console.log("Part 1:", await dayNineA());
    console.log("Part 2:", await dayNineB());
}