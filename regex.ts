import { platform } from "node:os";


export function returnLinebreakRegex(): RegExp {
    let regex: RegExp;
    if (platform() === "win32") {
        regex = /\r\n/
    } else {
        regex = /\n/
    }
    return regex
}

export function returnDoubleLinebreakRegex(): RegExp {
    let regex: RegExp;
    if (platform() === "win32") {
        regex = /\r\n\r\n/
    } else {
        regex = /\n\n/
    }
    return regex
}
