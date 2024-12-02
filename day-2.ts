export async function dayTwoA(): Promise<number> {
    let numberOfSafeReports: number = 0;
    const text = await Deno.readTextFile("day-2.input");
    const reports: number[][] = text.split(/\r\n/).map((row:string) => row.split(" ").map((entry:string) => parseInt(entry))); 
    reports.forEach((report: number[]): void => {
        if (!checkReportFail(report)) {
            numberOfSafeReports++;
        }
    })
    //test
    return numberOfSafeReports;
}

export async function dayTwoB(): Promise<number> {
    let numberOfSafeReports: number = 0;
    const text = await Deno.readTextFile("day-2.input");
    const reports: number[][] = text.split(/\r\n/).map((row:string) => row.split(" ").map((entry:string) => parseInt(entry))); 
    reports.forEach((report: number[]): void => {
        let didPass: boolean = false;
        let newReport: number[]
        if(!checkReportFail(report)) {
            didPass = true;
        } else {
            for (let i = 0; i < report.length; i++) {
                newReport = report.slice(0, i).concat(report.slice(i + 1));
                if(!checkReportFail(newReport)){
                    didPass = true;
                }
            }
        }
        if (didPass) {
            numberOfSafeReports++;
        }
    })
    return numberOfSafeReports;
}

function checkReportFail(report: number[]): boolean  {
    const reportLength: number = report.length;
        let increasing: boolean = false;
        let decreasing: boolean = false;
        let didFail: boolean = false
        for (let i = 0; i < reportLength - 1 ; i++) {
            if (report[i] > report[i + 1]) {
                decreasing = true;
                if (increasing === true) {
                    didFail = true;
                } else if (report[i] - report[i + 1] > 3) {
                    didFail = true;
                }
            } else if (report[i] < report[i + 1]) {
                increasing = true;
                if (decreasing === true) {
                    didFail = true;
                } else if (report[i + 1] - report[i] > 3) {
                    didFail = true;
                }
            } else {
                didFail = true;

            }
        }
        return didFail;
}

if (import.meta.main) {
    console.log("Part 1:", await dayTwoA());
    console.log("Part 2:", await dayTwoB());
  }