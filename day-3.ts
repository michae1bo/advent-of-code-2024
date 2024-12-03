export async function dayThreeA(): Promise<number> {
    let total: number = 0;
    const regex: RegExp = /mul\(\d?\d?\d,\d?\d?\d\)/g;
    const text = await Deno.readTextFile("day-3.input");
    const matches: string[][] = [...text.matchAll(regex)];
    matches.forEach((match:string[]):void => {
        let expression:string = match[0];
        expression = expression.slice(4, -1)
        const numbers: number[] = expression.split(",").map((numberString:string):number => {
            return parseInt(numberString);
        });
        total += numbers[0] * numbers[1];
    })

    return total;
}

export async function dayThreeB(): Promise<number> {
    let total: number = 0;
    let mulEnabled: boolean = true;
    const regex: RegExp = /(mul\(\d?\d?\d,\d?\d?\d\))|(do\(\))|(don't\(\))/g;
    const text = await Deno.readTextFile("day-3.input");
    const matches: string[][] = [...text.matchAll(regex)];
    matches.forEach((match:string[]):void => {
        if(match[2]) {
            mulEnabled = true;
        } else if (match[3]) {
            mulEnabled = false;
        } else if (mulEnabled) {
            let expression:string = match[0];
            expression = expression.slice(4, -1)
            const numbers: number[] = expression.split(",").map((numberString:string):number => {
            return parseInt(numberString);
            });
            total += numbers[0] * numbers[1];
        }

    });
    return total;
}

if (import.meta.main) {
    console.log("Part 1:", await dayThreeA());
    console.log("Part 2:", await dayThreeB());
}