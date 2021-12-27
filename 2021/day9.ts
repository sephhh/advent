const testInputDay92021 = `
2199943210
3987894921
9856789892
8767896789
9899965678
`;

const documentTextDay92021 =
    typeof document === "undefined"
        ? testInputDay92021
        : document.body.innerText;

const parseMapFromInput = (input: string) =>
    input.split("\n").map((col) => col.split("").map((cell) => Number(cell)));

function assertDefined<T>(v: T | undefined): asserts v is T {
    if (typeof v === "undefined") {
        throw new Error("unexpected undefined variable");
    }
}

const isLowPoint = (cell: number, map: number[][], i: number, j: number) =>
    [map[i + 1]?.[j], map[i - 1]?.[j], map[i]?.[j + 1], map[i]?.[j - 1]].every(
        (cell2) => {
            if (typeof cell2 === "undefined") {
                return true;
            }
            return cell2 > cell;
        }
    );

const getRiskLevel = (cell: number) => cell + 1;

const solveDay92021P1 = (input: string) => {
    let riskLevel = 0;

    const map = parseMapFromInput(input);
    for (let i = 0; i < map.length; i++) {
        const row = map[i];
        assertDefined(row);
        for (let j = 0; j < row.length; j++) {
            const cell: number | undefined = row[j];
            assertDefined(cell);
            if (isLowPoint(cell, map, i, j)) {
                // console.log("cell", cell, i, j);
                riskLevel += getRiskLevel(cell);
            }
        }
    }
    console.log("answer part 1", riskLevel);
};

solveDay92021P1(documentTextDay92021);

const isBasiny = (cell: number | undefined) =>
    typeof cell !== "undefined" && cell !== 9;

const getBasinyNeighbors = (
    map: number[][],
    x: number,
    y: number,
    visitedBasinyNeighbors: Set<string>
) => {
    const neighborCoords = [
        [x + 1, y],
        [x - 1, y],
        [x, y + 1],
        [x, y - 1],
    ] as const;
    neighborCoords.forEach(([x1, y1]) => {
        const neighborCell = map[x1]?.[y1];
        const neighborCoordHash = `${x1}-${y1}`;
        if (
            !visitedBasinyNeighbors.has(neighborCoordHash) &&
            isBasiny(neighborCell)
        ) {
            visitedBasinyNeighbors.add(neighborCoordHash);
            visitedBasinyNeighbors = getBasinyNeighbors(
                map,
                x1,
                y1,
                visitedBasinyNeighbors
            );
        }
    });
    return visitedBasinyNeighbors;
};

const getBasinSize = (map: number[][], i: number, j: number) => {
    let basinSet = new Set<string>();
    basinSet = getBasinyNeighbors(map, i, j, basinSet);
    // console.log("basinSet", basinSet);
    return basinSet.size;
};

const solveDay92021P2 = (input: string) => {
    const basins: number[] = [];

    const map = parseMapFromInput(input);
    for (let i = 0; i < map.length; i++) {
        const row = map[i];
        assertDefined(row);
        for (let j = 0; j < row.length; j++) {
            const cell: number | undefined = row[j];
            assertDefined(cell);
            if (isLowPoint(cell, map, i, j)) {
                const basinSize = getBasinSize(map, i, j);
                // console.log("cell", cell, i, j, "basinSize", basinSize);
                basins.push(basinSize);
            }
        }
    }

    const sortedBasins = basins.sort((a, b) => b - a);
    console.log(
        "answer part 2",
        (sortedBasins[0] ?? 1) * (sortedBasins[1] ?? 1) * (sortedBasins[2] ?? 1)
    );
};

solveDay92021P2(documentTextDay92021);
