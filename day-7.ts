import { returnLinebreakRegex } from "./regex.ts";

export async function daySevenA(): Promise<number> {
    const linebreak: RegExp = returnLinebreakRegex();
    let totalCalibrationResult: number = 0;
    const text: string = await Deno.readTextFile("day-7.input");
    const textRows: string[] = text.split(linebreak);
    textRows.forEach((row: string) => {
        const numbers: number[] = row.split(/(?:\s)/).map((numberString: string): number => parseInt(numberString));
        if (performOperation("*", numbers) || performOperation("+", numbers)) {
            totalCalibrationResult += numbers[0];
        }
        
    })
    
    return totalCalibrationResult;
} 

export async function daySevenB(): Promise<number> {
    const linebreak: RegExp = returnLinebreakRegex();
    let totalCalibrationResult: number = 0;
    const text: string = await Deno.readTextFile("day-7.input");
    const textRows: string[] = text.split(linebreak);
    textRows.forEach((row: string) => {
        const numbers: number[] = row.split(/(?:\s)/).map((numberString: string): number => parseInt(numberString));
        if (performOperationB("*", numbers) || performOperationB("+", numbers) || performOperationB("||", numbers)) {
            totalCalibrationResult += numbers[0];
        }
        
    })
    
    return totalCalibrationResult;
}

function performOperation(operator: string, numbers: number[]): boolean {
    if (numbers.length === 2) {
            return numbers[0] === numbers[1];
    } else {
        let result: number = 0;
        if (operator === "+") {
            result = numbers[1] + numbers[2];
        } else {
            result = numbers[1] * numbers[2];
        }
        return performOperation("*", [numbers[0], result].concat(numbers.slice(3))) || performOperation("+", [numbers[0], result].concat(numbers.slice(3)));
    }
}

function performOperationB(operator: string, numbers: number[]): boolean {
    if (numbers.length === 2) {
            return numbers[0] === numbers[1];
    } else {
        let result: number = 0;
        if (operator === "+") {
            result = numbers[1] + numbers[2];
        } else if (operator === "*"){
            result = numbers[1] * numbers[2];
        } else {
            result = parseInt(numbers[1].toString() + numbers[2].toString());
        }
        return performOperationB("*", [numbers[0], result].concat(numbers.slice(3))) || performOperationB("+", [numbers[0], result].concat(numbers.slice(3))) || performOperationB("||", [numbers[0], result].concat(numbers.slice(3)));
    }
}


if (import.meta.main) {
    console.log("Part 1:", await daySevenA());
    console.log("Part 2:", await daySevenB());
}