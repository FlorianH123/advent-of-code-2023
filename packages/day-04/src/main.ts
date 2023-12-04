import { readInputLines } from 'utils';

import { firstPuzzle, secondPuzzle } from './day-04.js';

const path = new URL('../resources/puzzle-input.txt', import.meta.url);
const input = await readInputLines(path);

firstPuzzle(input)
    .then((result) => console.log(`1. puzzle result: ${result}`))
    .catch(console.error);

secondPuzzle(input)
    .then((result) => console.log(`2. puzzle result: ${result}`))
    .catch(console.error);
