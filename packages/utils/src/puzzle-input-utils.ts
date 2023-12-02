import type { PathLike } from 'fs';

import { readLines } from './file-utils.js';
import { isNotEmpty } from './string-utils.js';

export async function readInputLines(
    path: PathLike,
    options?: ReadInputLinesOptions,
): Promise<string[]> {
    const defaultOptions: Required<ReadInputLinesOptions> = { removeEmptyLines: true };
    const { removeEmptyLines } = { ...defaultOptions, ...options };

    const lines = await readLines(path);

    if (removeEmptyLines) {
        return lines.filter(isNotEmpty);
    }

    return lines;
}

interface ReadInputLinesOptions {
    removeEmptyLines?: boolean;
}
