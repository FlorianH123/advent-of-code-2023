import { replaceWhitespace, substringAfter } from 'utils';

export async function firstPuzzle(input: string[]): Promise<string> {
    const times = replaceWhitespace(substringAfter(input[0]!, ':'), ' ').trim().split(' ');
    const distances = replaceWhitespace(substringAfter(input[1]!, ':'), ' ').trim().split(' ');
    return solve(times, distances);
}

export async function secondPuzzle(input: string[]): Promise<string> {
    const times = replaceWhitespace(substringAfter(input[0]!, ':'), '').trim();
    const distances = replaceWhitespace(substringAfter(input[1]!, ':'), '').trim();
    return solve([times], [distances]);
}

function solve(times: string[], distances: string[]): string {
    let waysToBeatRecord = 1;

    for (let i = 0; i < times.length; i++) {
        const totalRaceTime = parseInt(times[i]!);
        const maxDistance = parseInt(distances[i]!);

        let buttonPressedTime = 1;
        let minButtonPressedTime = 0;
        let maxButtonPressedTime = 0;

        while (buttonPressedTime <= totalRaceTime) {
            const speed = buttonPressedTime;
            const distance = speed * (totalRaceTime - buttonPressedTime);

            if (distance > maxDistance) {
                minButtonPressedTime = buttonPressedTime;
                break;
            }
            buttonPressedTime++;
        }

        buttonPressedTime = totalRaceTime - 1;

        while (buttonPressedTime > 0) {
            const speed = buttonPressedTime;
            const distance = speed * (totalRaceTime - buttonPressedTime);

            if (distance > maxDistance) {
                maxButtonPressedTime = buttonPressedTime;
                break;
            }
            buttonPressedTime--;
        }

        waysToBeatRecord *= maxButtonPressedTime - minButtonPressedTime + 1;
    }

    return waysToBeatRecord.toString();
}
