import { replaceWhitespace, substringAfter } from 'utils';

export async function firstPuzzle(input: string[]): Promise<string> {
    const cards = input.map((line) => Card.from(line));
    return cards.reduce((totalPoints, card) => totalPoints + card.getPoints(), 0).toString();
}

export async function secondPuzzle(input: string[]): Promise<string> {
    const originalCards = input.map((line) => Card.from(line));

    const originalAndCopyCards = new Map<number, Card[]>();

    for (const [index, card] of originalCards.entries()) {
        originalAndCopyCards.set(index, [card]);
    }

    for (const [index, cards] of originalAndCopyCards.entries()) {
        for (const card of cards) {
            const totalWins = card.getYourWinningNumbers().length;

            for (let i = 0; i < totalWins; i++) {
                const nextIndex = index + i + 1;
                if (nextIndex >= originalCards.length) {
                    break;
                }

                originalAndCopyCards.get(nextIndex)!.push(originalCards[nextIndex]!);
            }
        }
    }

    return Array.from(originalAndCopyCards.values())
        .reduce((totalCards, cards) => totalCards + cards.length, 0)
        .toString();
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
