export async function firstPuzzle(input: string[]): Promise<string> {
    const instructions = input[0];
    const nodes = input.slice(1);
    const nodeMap = parseNodes(nodes);

    const startNode = nodeMap.get('AAA')!;
    const steps = solve(instructions, startNode, (node) => node.name === 'ZZZ');

    return steps.toString();
}

export async function secondPuzzle(input: string[]): Promise<string> {
    const instructions = input[0];
    const nodes = input.slice(1);
    const nodeMap = parseNodes(nodes);

    const startNodes = Array.from(nodeMap.entries())
        .filter(([nodeName, _]) => nodeName.endsWith('A'))
        .map(([_, node]) => node);

    const cycles = startNodes.map((startNode) =>
        solve(instructions, startNode, (node) => node.name.endsWith('Z')),
    );

    return calculateLCM(cycles).toString();
}

function greatestCommonDivisor(lhs: number, rhs: number): number {
    if (rhs === 0) {
        return lhs;
    } else {
        return greatestCommonDivisor(rhs, lhs % rhs);
    }
}

function leastCommonMultiple(lhs: number, rhs: number): number {
    return (lhs * rhs) / greatestCommonDivisor(lhs, rhs);
}

function calculateLCM(arr: number[]): number {
    return arr.reduce((steps, cylce) => leastCommonMultiple(steps, cylce));
}

function solve(instructions: string, startNode: Node, isEscaped: (node: Node) => boolean): number {
    const instructionIterator = makeInstructionIterator(instructions);
    let stepsCount = 0;
    let currentNode = startNode;

    while (!isEscaped(currentNode)) {
        const instruction = instructionIterator();
        currentNode = instruction === 'L' ? currentNode.L! : currentNode.R!;
        stepsCount++;
    }

    return stepsCount;
}
function parseNodes(nodes: string[]): Map<string, Node> {
    const nodeMap = new Map<string, Node>();

    for (const line of nodes) {
        const [_, currentNodeName, leftNodeName, rightNodeName] = line.match(
            /(\w{3}) = \((\w{3}), (\w{3})\)/,
        )!;

        let leftNode: Node | undefined = nodeMap.get(leftNodeName);

        if (leftNode == null) {
            leftNode = new Node(leftNodeName);
            nodeMap.set(leftNodeName, leftNode);
        }

        let rightNode: Node | undefined = nodeMap.get(rightNodeName);

        if (rightNode == null) {
            rightNode = new Node(rightNodeName);
            nodeMap.set(rightNodeName, rightNode);
        }

        let currentNode: Node | undefined = nodeMap.get(currentNodeName);

        if (currentNode == null) {
            currentNode = new Node(currentNodeName);
            nodeMap.set(currentNodeName, currentNode);
        }

        currentNode.leftNode = leftNode;
        currentNode.rightNode = rightNode;
    }

    return nodeMap;
}

function makeInstructionIterator(instructions: string) {
    let currentIndex = 0;
    return () => instructions[currentIndex++ % instructions.length];
}

class Node {
    constructor(
        public readonly name: string,
        public leftNode?: Node,
        public rightNode?: Node,
    ) {}

    public get L(): Node | undefined {
        return this.leftNode;
    }

    public get R(): Node | undefined {
        return this.rightNode;
    }
}
