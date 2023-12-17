import { readInputLines } from 'utils';

import { firstPuzzle, secondPuzzle } from './day-08.js';

describe('day 08', () => {
    describe('first puzzle', () => {
        it('should return 2', async () => {
            const path = new URL('../resources/puzzle-1-example-input.txt', import.meta.url);
            const input = await readInputLines(path);
            const result = await firstPuzzle(input);

            expect(result).toEqual('2');
        });
    });
    describe('second puzzle', () => {
        it('should return 6', async () => {
            const path = new URL('../resources/puzzle-2-example-input.txt', import.meta.url);
            const input = await readInputLines(path);
            const result = await secondPuzzle(input);

            expect(result).toEqual('6');
        });
    });
});
