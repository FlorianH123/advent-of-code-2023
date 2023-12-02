import { readInputLines } from 'utils';

import { firstPuzzle, secondPuzzle } from './day-01.js';

describe('day 01', () => {
    describe('first puzzle', () => {
        it('should return 142', async () => {
            const path = new URL('../resources/puzzle-1-example-input.txt', import.meta.url);
            const input = await readInputLines(path);
            const result = await firstPuzzle(input);

            expect(result).toEqual('142');
        });
    });
    describe('second puzzle', () => {
        it('should return 281', async () => {
            const path = new URL('../resources/puzzle-2-example-input.txt', import.meta.url);
            const input = await readInputLines(path);
            const result = await secondPuzzle(input);

            expect(result).toEqual('281');
        });
    });
});
