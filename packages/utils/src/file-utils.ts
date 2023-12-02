import type { PathLike } from 'fs';
import { readFile } from 'fs/promises';

export async function readLines(path: PathLike): Promise<string[]> {
    const fileContent = await readFile(path, { encoding: 'utf-8' });
    return fileContent.split('\n');
}
