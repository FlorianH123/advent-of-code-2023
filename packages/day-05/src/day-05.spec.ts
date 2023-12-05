import { readInputLines } from 'utils';

import { firstPuzzle, secondPuzzle } from './day-05.js';

describe('day 05', () => {
    describe('first puzzle', () => {
        it('should return 35', async () => {
            const path = new URL('../resources/puzzle-1-example-input.txt', import.meta.url);
            const input = await readInputLines(path, { removeEmptyLines: false });
            const result = await firstPuzzle(input);

            expect(result).toEqual('35');
        });
    });
    describe('second puzzle', () => {
        it('should return 46', async () => {
            const path = new URL('../resources/puzzle-2-example-input.txt', import.meta.url);
            const input = await readInputLines(path, { removeEmptyLines: false });
            const result = await secondPuzzle(input);

            expect(result).toEqual('46');
        });
    });
});
