export function isNotEmpty(str: string): boolean {
    return !!str;
}

export function isDigit(str: string): boolean {
    return !isNaN(parseInt(str));
}
