import { isNotEmpty } from './string-utils.js';

export function groupArrayByEmptyLines(input: string[]): string[][] {
    const groups: string[][] = [];
    let currentIndex = 0;

    for (const line of input) {
        if (isNotEmpty(line)) {
            const group = groups[currentIndex];

            if (group == null) {
                groups[currentIndex] = [line];
            } else {
                group.push(line);
            }
        } else {
            currentIndex++;
        }
    }

    return groups;
}
