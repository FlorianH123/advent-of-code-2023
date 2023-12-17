const cardToValuePart1: Record<string, number> = {
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    T: 10,
    J: 11,
    Q: 12,
    K: 13,
    A: 14,
};

const cardToValuePart2: Record<string, number> = {
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    T: 10,
    J: 1,
    Q: 12,
    K: 13,
    A: 14,
};

enum Hand {
    FiveOfAKind = 7,
    FourOfAKind = 6,
    FullHouse = 5,
    ThreeOfAKind = 4,
    TwoPairs = 3,
    OnePair = 2,
    HighCard = 1,
}

export async function firstPuzzle(input: string[]): Promise<string> {
    return solve(input, cardToValuePart1);
}

export async function secondPuzzle(input: string[]): Promise<string> {
    return solve(input, cardToValuePart2);
}

function solve(input: string[], cardToValue: Record<string, number>): string {
    const handSets = input.map((line) => {
        const [cardString, bit] = line.split(' ');
        const cards = cardString.split('');
        const cardValues = cards.map((card) => cardToValue[card]!);
        const cardFrequency = cards.reduce(
            (acc, curr) => {
                if (acc[curr]) {
                    acc[curr]++;
                } else {
                    acc[curr] = 1;
                }

                return acc;
            },
            {} as Record<string, number>,
        );

        return new GameHand(cards, parseInt(bit), cardValues, cardFrequency);
    });

    const sortedHandSets = handSets.sort((lhs, rhs) => {
        if (lhs.handValue === rhs.handValue) {
            for (let i = 0; i < lhs.cardValues.length; i++) {
                if (lhs.cardValues[i] === rhs.cardValues[i]) {
                    continue;
                }

                return lhs.cardValues[i] < rhs.cardValues[i] ? -1 : 1;
            }
        }

        return lhs.handValue < rhs.handValue ? -1 : 1;
    });

    return sortedHandSets
        .reduce((totalWinning, currentHandSet, currentIndex) => {
            totalWinning += currentHandSet.bit * (currentIndex + 1);
            return totalWinning;
        }, 0)
        .toString();
}

class GameHand {
    public readonly handValue: Hand;

    constructor(
        public readonly cards: string[],
        public readonly bit: number,
        public readonly cardValues: number[],
        public readonly cardFrequency: Record<number, number>,
    ) {
        this.handValue = this.getHandValue();
    }

    public getHandValue(): Hand {
        const hand = Object.entries(this.cardFrequency);
        let v2 = false;

        for (const [index, card] of this.cards.entries()) {
            if (card === 'J') {
                v2 = this.cardValues[index] === 1;
            }
        }
        const jokers = hand.find(([card, _]) => card === 'J')?.at(1) as number;
        const hasJokers = !!jokers && v2;

        if (hand.length === 1 || (hand.length === 2 && hasJokers)) {
            return Hand.FiveOfAKind;
        }

        if (hand.length === 5 && !hasJokers) {
            return Hand.HighCard;
        }

        if (hand.length === 2) {
            if (hand[0][1]! === 4 || hand[1][1]! === 4) {
                return Hand.FourOfAKind;
            }

            return Hand.FullHouse;
        }

        if (hand.length === 3 && hasJokers) {
            if (
                hand[0][1]! + jokers === 4 ||
                hand[1][1]! + jokers === 4 ||
                hand[2][1]! + jokers === 4
            ) {
                return Hand.FourOfAKind;
            }

            return Hand.FullHouse;
        }

        if (hand.length === 3) {
            if (hand[0][1]! === 3 || hand[1][1]! === 3 || hand[2][1]! === 3) {
                return Hand.ThreeOfAKind;
            }

            return Hand.TwoPairs;
        }

        if (hand.length === 4 && hasJokers) {
            if (
                hand[0][1]! + jokers === 3 ||
                hand[1][1]! + jokers === 3 ||
                hand[2][1]! + jokers === 3 ||
                hand[3][1]! + jokers === 3
            ) {
                return Hand.ThreeOfAKind;
            }

            return Hand.TwoPairs;
        }

        return Hand.OnePair;
    }
}
