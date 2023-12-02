import { sum } from 'utils';

export async function firstPuzzle(input: string[]): Promise<string> {
    return solve(input);
}

export async function secondPuzzle(input: string[]): Promise<string> {
    const stringToNumber = new Map([
        ['one', 'one1one'],
        ['two', 'two2two'],
        ['three', 'three3three'],
        ['four', 'four4four'],
        ['five', 'five5five'],
        ['six', 'six6six'],
        ['seven', 'seven7seven'],
        ['eight', 'eight8eight'],
        ['nine', 'nine9nine'],
    ]);

    let inputCopy = input.join('\n');

    for (const [str, replacer] of stringToNumber.entries()) {
        inputCopy = inputCopy.replaceAll(str, replacer);
    }

    return solve(inputCopy.split('\n'));
}

function solve(input: string[]): string {
    const combineCalibrationValue = (lhs: number, rhs: number): number => lhs * 10 + rhs;
    const extractCalibrationValue = (line: string): number => {
        const numbers = line.match(/[0-9]/g)?.map((str) => parseInt(str));

        if (numbers == null) {
            return 0;
        }

        const firstNumber = numbers.shift();
        const lastNumber = numbers.pop();

        if (firstNumber == null) {
            return 0;
        }

        if (lastNumber == null) {
            return combineCalibrationValue(firstNumber, firstNumber);
        }

        return combineCalibrationValue(firstNumber, lastNumber);
    };

    return input.map(extractCalibrationValue).reduce(sum).toString();
}
