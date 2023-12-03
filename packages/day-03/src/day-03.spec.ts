import { readInputLines } from 'utils';

import { firstPuzzle, secondPuzzle } from './day-03.js';

describe('day 03', () => {
    describe('first puzzle', () => {
        it('should return 4361', async () => {
            const path = new URL('../resources/puzzle-1-example-input.txt', import.meta.url);
            const input = await readInputLines(path);
            const result = await firstPuzzle(input);

            expect(result).toEqual('4361');
        });
    });
    describe('second puzzle', () => {
        it('should return 467835', async () => {
            const path = new URL('../resources/puzzle-2-example-input.txt', import.meta.url);
            const input = await readInputLines(path);
            const result = await secondPuzzle(input);

            expect(result).toEqual('467835');
        });
    });
});
