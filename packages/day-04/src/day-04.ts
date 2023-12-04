import { replaceWhitespace, substringAfter, sum } from 'utils';

export async function firstPuzzle(input: string[]): Promise<string> {
    const cards = input.map((line) => Card.from(line));
    return cards.reduce((totalPoints, card) => totalPoints + card.getPoints(), 0).toString();
}

export async function secondPuzzle(input: string[]): Promise<string> {
    const originalCards = input.map((line) => Card.from(line));

    const cardCounter = Array<number>(originalCards.length).fill(1);

    for (const [index, cardCount] of cardCounter.entries()) {
        const totalWins = originalCards[index]!.getYourWinningNumbers().length;

        for (let i = 0; i < totalWins; i++) {
            const insertIndex = index + i + 1;

            if (insertIndex >= originalCards.length) {
                break;
            }

            cardCounter[insertIndex] += cardCount;
        }
    }

    return cardCounter.reduce(sum).toString();
}

export class Card {
    constructor(
        public readonly winningNumbers: string[],
        public readonly yourNumbers: string[],
    ) {}

    public getPoints(): number {
        const yourWinningNumbers = this.getYourWinningNumbers();
        return yourWinningNumbers.reduce((points) => (points === 0 ? points + 1 : points * 2), 0);
    }

    public getYourWinningNumbers(): string[] {
        return this.yourNumbers.filter((yourNumber) => this.winningNumbers.includes(yourNumber));
    }

    public static from(str: string): Card {
        const numbers = substringAfter(str, ':');
        const [winningNumbers, yourNumbers] = numbers.split('|');

        return new Card(
            replaceWhitespace(winningNumbers!, ' ').trim().split(' '),
            replaceWhitespace(yourNumbers!, ' ').trim().split(' '),
        );
    }
}
