interface RulesTable {
    [key: string] : string[];
}

export async function dayFiveA():Promise<number> {
    let sumOfMiddle: number = 0;
    const text: string = await Deno.readTextFile("day-5.input");
    const rulesText: string = text.split(/\r\n\r\n/)[0];
    const updateText: string = text.split(/\r\n\r\n/)[1];
    const rulesMap: RulesTable = createRulesHashMap(rulesText);
    const updateRows = updateText.split(/\r\n/).map((row: string): string[] => row.split(","));

    updateRows.forEach((update: string[]): void => {
        let updateFollowsRules: boolean = true;
        for (let i = 0; i < update.length - 1; i++) {
            if (rulesMap[update[i]]) {
                rulesMap[update[i]].forEach((page: string): void => {
                    if (update.includes(page, i + 1)) {
                        updateFollowsRules = false;
                    }
                })
            }
        }
        if (updateFollowsRules) {
            sumOfMiddle += parseInt(update[Math.floor(update.length / 2)]);
        }
    })

    return sumOfMiddle;
}

export async function dayFiveB(): Promise<number> {
    let sumOfMiddle: number = 0;
    const text: string = await Deno.readTextFile("day-5.input");
    const rulesText: string = text.split(/\r\n\r\n/)[0];
    const updateText: string = text.split(/\r\n\r\n/)[1];
    const rulesMap: RulesTable = createRulesHashMap(rulesText);
    const updateRows: string[][] = updateText.split(/\r\n/).map((row: string): string[] => row.split(","));
    updateRows.forEach((update: string[]): void => {
        let updateFollowsRules: boolean = true;
        let temp: string = "";
        for (let i = 0; i < update.length - 1; i++) {
            if (rulesMap[update[i]]) {
                for (let j = i + 1; j < update.length; j++) {
                    if (rulesMap[update[i]].includes(update[j])) {
                        updateFollowsRules = false;
                        temp = update[i];
                        update[i] = update[j];
                        update[j] = temp;
                    }
                }
            }
        }
        if (!updateFollowsRules) {
            sumOfMiddle += parseInt(update[Math.floor(update.length / 2)]);
        } 
    });

    return sumOfMiddle;
}

function createRulesHashMap(rulesText: string): RulesTable {
    const rulesMap: RulesTable = {};
    rulesText.split(/\r\n/).map((row: string): void => {
        const rulesNumbersString = row.split("|");
        if(rulesMap[rulesNumbersString[1]]) {
            rulesMap[rulesNumbersString[1]].push(rulesNumbersString[0]);
        } else {
            rulesMap[rulesNumbersString[1]] = [rulesNumbersString[0]];
        }
        
    });
    return rulesMap;
}

if (import.meta.main) {
    console.log("Part 1:", await dayFiveA());
    console.log("Part 2:", await dayFiveB());
}