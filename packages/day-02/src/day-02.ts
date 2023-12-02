import { sum } from 'utils';

class Game {
    constructor(
        public id: number,
        public cubeSets: CubeSet[],
    ) {}

    toString(): string {
        return JSON.stringify(this);
    }

    public static from(str: string): Game {
        const gameId = str.substring('Game'.length, str.indexOf(':')).trim();
        const cubeSets = str
            .substring(str.indexOf(':') + 1)
            .split(';')
            .map(CubeSet.from);

        return new Game(parseInt(gameId), cubeSets);
    }
}

class CubeSet {
    constructor(
        public red: number,
        public green: number,
        public blue: number,
    ) {}

    public static from(str: string): CubeSet {
        let red = 0;
        let green = 0;
        let blue = 0;

        str.split(',').forEach((cube) => {
            const [amountStr, color] = cube.trim().split(' ');

            if (amountStr == null || color == null) {
                throw new Error('Could not parse cube set!');
            }

            const amount = parseInt(amountStr);

            switch (color) {
                case 'red':
                    red += amount;
                    break;
                case 'green':
                    green += amount;
                    break;
                case 'blue':
                    blue += amount;
                    break;
                default:
                    throw new Error(`Unknown color ${color}`);
            }
        });

        return new CubeSet(red, green, blue);
    }
}

const maxCubeSet = new CubeSet(12, 13, 14);

export async function firstPuzzle(input: string[]): Promise<string> {
    const isGameValid = (game: Game): boolean =>
        game.cubeSets.every(
            (cubeSet) =>
                cubeSet.red <= maxCubeSet.red &&
                cubeSet.green <= maxCubeSet.green &&
                cubeSet.blue <= maxCubeSet.blue,
        );

    return input
        .map(Game.from)
        .filter(isGameValid)
        .map((game) => game.id)
        .reduce(sum)
        .toString();
}

export async function secondPuzzle(input: string[]): Promise<string> {
    const getMinCubeSet = (game: Game): CubeSet => {
        const minCubeSet = new CubeSet(0, 0, 0);

        game.cubeSets.forEach((cubeSet) => {
            minCubeSet.red = Math.max(minCubeSet.red, cubeSet.red);
            minCubeSet.green = Math.max(minCubeSet.green, cubeSet.green);
            minCubeSet.blue = Math.max(minCubeSet.blue, cubeSet.blue);
        });

        return minCubeSet;
    };

    return input
        .map(Game.from)
        .map(getMinCubeSet)
        .map((cubeSet) => cubeSet.red * cubeSet.green * cubeSet.blue)
        .reduce(sum)
        .toString();
}
