import { groupArrayByEmptyLines, numberCompare } from 'utils';

export async function firstPuzzle(input: string[]): Promise<string> {
    const [seedString, _, ...mapLines] = input;
    const seeds = seedString!
        .substring('seeds: '.length)
        .split(' ')
        .map((seed) => parseInt(seed));

    const almanach = groupArrayByEmptyLines(mapLines).map(GardeningMap.from);

    return seeds
        .map((seed) => solve(seed, almanach))
        .toSorted(numberCompare)[0]!
        .toString();
}

export async function secondPuzzle(input: string[]): Promise<string> {
    const [seedString, _, ...mapLines] = input;
    const seeds = seedString!
        .substring('seeds: '.length)
        .split(' ')
        .map((seed) => parseInt(seed));

    const almanach = groupArrayByEmptyLines(mapLines).map(GardeningMap.from);
    let minLocation = Number.MAX_SAFE_INTEGER;

    for (let i = 0; i < seeds.length; i += 2) {
        const startSeed = seeds[i]!;
        const range = seeds[i + 1]!;

        for (let seed = startSeed; seed < startSeed + range; seed++) {
            minLocation = Math.min(solve(seed, almanach), minLocation);
        }
    }

    return minLocation.toString();
}

function solve(seed: number, almanach: GardeningMap[]): number {
    const [
        seedToSoil,
        soilToFertilizer,
        fertilizerToWater,
        waterToLight,
        lightToTemperature,
        temperatureToHumidity,
        humidityToLocation,
    ] = almanach;

    const soil = seedToSoil!.getDestinationNumber(seed);
    const fertilizer = soilToFertilizer!.getDestinationNumber(soil);

    const water = fertilizerToWater!.getDestinationNumber(fertilizer);
    const light = waterToLight!.getDestinationNumber(water);
    const temperature = lightToTemperature!.getDestinationNumber(light);
    const humidity = temperatureToHumidity!.getDestinationNumber(temperature);

    return humidityToLocation!.getDestinationNumber(humidity);
}

class GardeningMap {
    constructor(
        public readonly name: string,
        public readonly ranges: GardeningMapRange[],
    ) {}

    public getDestinationNumber(sourceNumber: number): number {
        const range = this.ranges.find(
            (range) =>
                sourceNumber >= range.sourceRangeStart &&
                sourceNumber < range.sourceRangeStart + range.rangeLength,
        );

        return range == null ? sourceNumber : range.getDestinationNumber(sourceNumber);
    }

    public static from(mapLines: string[]): GardeningMap {
        const [name, ...ranges] = mapLines;
        return new GardeningMap(name!, ranges.map(GardeningMapRange.from));
    }
}

class GardeningMapRange {
    constructor(
        public readonly destinationRangeStart: number,
        public readonly sourceRangeStart: number,
        public readonly rangeLength: number,
    ) {}

    public getDestinationNumber(sourceNumber: number): number {
        const offset = Math.abs(sourceNumber - this.sourceRangeStart);
        return this.destinationRangeStart + offset;
    }

    public static from(str: string): GardeningMapRange {
        const [destinationRangeStart, sourceRangeStart, rangeLength] = str.split(' ');
        return new GardeningMapRange(
            parseInt(destinationRangeStart!),
            parseInt(sourceRangeStart!),
            parseInt(rangeLength!),
        );
    }
}
