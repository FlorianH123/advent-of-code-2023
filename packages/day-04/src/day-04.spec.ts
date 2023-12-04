import { readInputLines } from 'utils';

import { firstPuzzle, secondPuzzle } from './day-04.js';

describe('day 04', () => {
    describe('first puzzle', () => {
        it('should return 13', async () => {
            const path = new URL('../resources/puzzle-1-example-input.txt', import.meta.url);
            const input = await readInputLines(path);
            const result = await firstPuzzle(input);

            expect(result).toEqual('13');
        });
    });
    describe('second puzzle', () => {
        it('should return 30', async () => {
            const path = new URL('../resources/puzzle-2-example-input.txt', import.meta.url);
            const input = await readInputLines(path);
            const result = await secondPuzzle(input);

            expect(result).toEqual('30');
        });
    });
});
