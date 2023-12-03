import { isDigit, sum } from 'utils';

export async function firstPuzzle(input: string[]): Promise<string> {
    const engineParts = getEngineParts(input);

    return engineParts
        .map((enginePart) => enginePart.partNumber)
        .reduce(sum)
        .toString();
}

export async function secondPuzzle(input: string[]): Promise<string> {
    const engineParts = getEngineParts(input);
    const gearToEnginePartMap = new Map<string, EnginePart[]>();

    for (const enginePart of engineParts) {
        for (const gear of enginePart.gearLocations) {
            const gearId = `(${gear.xIndex},${gear.yIndex})`;
            const parts = gearToEnginePartMap.get(gearId);

            if (parts == null) {
                gearToEnginePartMap.set(gearId, [enginePart]);
            } else {
                parts.push(enginePart);
            }
        }
    }

    return Array.from(gearToEnginePartMap.values())
        .filter((parts) => parts.length === 2)
        .map(([enginePartLeft, enginePartRight]) =>
            calculateGearRation(enginePartLeft!, enginePartRight!),
        )
        .reduce(sum)
        .toString();
}

function getEngineParts(input: string[]): EnginePart[] {
    const engineSchematic: string[][] = input.map((line) => line.split(''));
    const engineParts: EnginePart[] = [];

    for (let lineIndex = 0; lineIndex < engineSchematic.length; lineIndex++) {
        let number: number | undefined = undefined;
        let startIndex = 0;

        for (let columnIndex = 0; columnIndex < engineSchematic[lineIndex]!.length; columnIndex++) {
            const char = engineSchematic[lineIndex]![columnIndex]!;

            if (isDigit(char)) {
                const parsedNumber = parseInt(char);

                if (number == null) {
                    number = parsedNumber;
                    startIndex = columnIndex;
                } else {
                    number = number * 10 + parsedNumber;
                }
            } else if (number != null) {
                const partNumberLength = columnIndex - startIndex - 1;

                if (isValidPartNumber(startIndex, partNumberLength, lineIndex, engineSchematic)) {
                    const gearLocations = getGearLocations(
                        startIndex,
                        partNumberLength,
                        lineIndex,
                        engineSchematic,
                    );

                    engineParts.push(new EnginePart(number, gearLocations));
                }

                number = undefined;
            }
        }

        const partNumberLength = engineSchematic[lineIndex]!.length - 1 - startIndex - 1;

        if (
            number != null &&
            isValidPartNumber(startIndex, partNumberLength, lineIndex, engineSchematic)
        ) {
            const gearLocations = getGearLocations(
                startIndex,
                partNumberLength,
                lineIndex,
                engineSchematic,
            );

            engineParts.push(new EnginePart(number, gearLocations));
        }
    }

    return engineParts;
}

function isValidPartNumber(
    startIndex: number,
    length: number,
    lineIndex: number,
    charMatrix: string[][],
): boolean {
    const startX = Math.max(startIndex - 1, 0);
    const startY = Math.max(lineIndex - 1, 0);
    const endX = Math.min(startIndex + length + 1, charMatrix[lineIndex]!.length - 1);
    const endY = Math.min(lineIndex + 1, charMatrix.length - 1);

    for (let y = startY; y <= endY; y++) {
        for (let x = startX; x <= endX; x++) {
            const char = charMatrix[y]![x]!;
            if (char !== '.' && !isDigit(char)) {
                return true;
            }
        }
    }

    return false;
}

function getGearLocations(
    startIndex: number,
    length: number,
    lineIndex: number,
    charMatrix: string[][],
): GearLocation[] {
    const startX = Math.max(startIndex - 1, 0);
    const startY = Math.max(lineIndex - 1, 0);
    const endX = Math.min(startIndex + length + 1, charMatrix[lineIndex]!.length - 1);
    const endY = Math.min(lineIndex + 1, charMatrix.length - 1);
    const gearLocations: GearLocation[] = [];

    for (let y = startY; y <= endY; y++) {
        for (let x = startX; x <= endX; x++) {
            const char = charMatrix[y]![x]!;
            if (char === '*') {
                gearLocations.push(new GearLocation(x, y));
            }
        }
    }

    return gearLocations;
}

function calculateGearRation(enginePartLeft: EnginePart, enginePartRight: EnginePart): number {
    return enginePartLeft.partNumber * enginePartRight.partNumber;
}

class EnginePart {
    constructor(
        public partNumber: number,
        public gearLocations: GearLocation[],
    ) {}
}

class GearLocation {
    constructor(
        public xIndex: number,
        public yIndex: number,
    ) {}
}
