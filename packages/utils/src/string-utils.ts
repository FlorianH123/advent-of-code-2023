export function isNotEmpty(str: string): boolean {
    return !!str;
}

export function isDigit(str: string): boolean {
    return !isNaN(parseInt(str));
}

export function substringAfter(str: string, char: string): string {
    return str.substring(str.indexOf(char) + 1);
}

export function replaceWhitespace(str: string, replacer: string): string {
    return str.replace(/\s\s+/g, replacer);
}
