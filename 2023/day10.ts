import { assertInputDefined } from "./util/assertInputDefined";
import { getDocumentRows, getInputRows } from "./util/getDocumentRows";

const VERTICAL_PIPE = "|";
const HORIZONTAL_PIPE = "-";
const NORTH_EAST_PIPE = "L";
const NORTH_WEST_PIPE = "J";
const SOUTH_WEST_PIPE = "7";
const SOUTH_EAST_PIPE = "F";
const GROUND = ".";
const START = "S";

const VALID_PIPE_MAP_CHARS = [
    VERTICAL_PIPE,
    HORIZONTAL_PIPE,
    NORTH_EAST_PIPE,
    NORTH_WEST_PIPE,
    SOUTH_WEST_PIPE,
    SOUTH_EAST_PIPE,
    GROUND,
    START,
] as const;

type PipeMapChar = typeof VALID_PIPE_MAP_CHARS[number];

const validCharsSet: Set<string> = new Set(VALID_PIPE_MAP_CHARS);

function assertIsValidPipeChar(
    input: string | PipeMapChar
): asserts input is PipeMapChar {
    if (!validCharsSet.has(input)) {
        throw new Error(`bad input!: ${input}`);
    }
}

type PipeMap = PipeMapChar[][];
type Coord = [number, number];

// const testInput = `
// .....
// .S-7.
// .|.|.
// .L-J.
// .....
// `;

// const testInput = `
// ...........
// .S-------7.
// .|F-----7|.
// .||.....||.
// .||.....||.
// .|L-7.F-J|.
// .|..|.|..|.
// .L--J.L--J.
// ...........
// `;
const testInput = `
......................
.FF7FSF7F7F7F7F7F---7.
.L|LJ||||||||||||F--J.
.FL-7LJLJ||||||LJL-77.
.F--JF--7||LJLJ7F7FJ-.
.L---JF-JLJ.||-FJLJJ7.
.|F|F-JF---7F7-L7L|7|.
.|FFJF7L7F-JF7|JL---7.
.7-L-JL7||F7|L7F-7F7|.
.L.L7LFJ|||||FJL7||LJ.
.L7JLJL-JLJLJL--JLJ.L.
......................
`;

const makePipeMap = (input: string[]): PipeMap =>
    input.map((string) =>
        string.split("").map((str2) => {
            assertIsValidPipeChar(str2);
            return str2;
        })
    );
const findStartPosition = (pipeMap: PipeMap): Coord => {
    let startPosition: Coord = [-1, -1];
    pipeMap.forEach((row, index) => {
        const startPosIfAny = row.indexOf("S");
        if (startPosIfAny > -1) {
            startPosition = [index, startPosIfAny];
        }
    });
    return startPosition;
};

function printFurthestPipeDistance(input: string[]) {
    const pipeMap: PipeMap = makePipeMap(input);
    const startPosition = findStartPosition(pipeMap);
    const steps = walkAndMap(pipeMap, startPosition, startPosition, [
        startPosition,
    ]);
    // console.log("steps", steps);
    console.log(Math.ceil(steps.length / 2));
}

const getCoordFromMap = (map: PipeMap, coord: Coord) => {
    const value = map[coord[0]]?.[coord[1]];
    assertInputDefined(value);
    return value;
};

function walkAndMap(
    pipeMap: PipeMap,
    currentPosition: Coord,
    previousPosition: Coord,
    steps: Coord[]
) {
    let keepWalking = true;
    while (keepWalking) {
        const nextPosition = getNextPosition(
            pipeMap,
            previousPosition,
            currentPosition
        );
        if (getCoordFromMap(pipeMap, nextPosition) === "S") {
            keepWalking = false;
            break;
        }
        if (steps.length > pipeMap.length * pipeMap.length * 10) {
            throw new Error("walked too hard");
        }
        steps.push(nextPosition);
        previousPosition = currentPosition;
        currentPosition = nextPosition;
    }
    return steps;
}

function getNextPosition(
    pipeMap: PipeMap,
    previousPosition: Coord,
    currentPosition: Coord
): Coord {
    const currentPositionValue = getCoordFromMap(pipeMap, currentPosition);
    switch (currentPositionValue) {
        case START: {
            const possibleNextCoords: Coord[] = [
                [currentPosition[0], currentPosition[1] + 1],
                [currentPosition[0] + 1, currentPosition[1]],
                [currentPosition[0], currentPosition[1] - 1],
                [currentPosition[0] - 1, currentPosition[1]],
            ];
            for (let i = 0; i < possibleNextCoords.length; i++) {
                const possibleNextCoord = possibleNextCoords[i];
                assertInputDefined(possibleNextCoord);
                const nextCoordValue =
                    pipeMap[possibleNextCoord[0]]?.[possibleNextCoord[1]];
                if (nextCoordValue && nextCoordValue !== ".") {
                    return possibleNextCoord;
                }
            }
            throw new Error("now valid path from start");
        }
        case VERTICAL_PIPE: {
            const rowNumber =
                previousPosition[0] < currentPosition[0]
                    ? currentPosition[0] + 1
                    : currentPosition[0] - 1;
            return [rowNumber, currentPosition[1]];
        }
        case HORIZONTAL_PIPE: {
            const colNumber =
                previousPosition[1] < currentPosition[1]
                    ? currentPosition[1] + 1
                    : currentPosition[1] - 1;
            return [currentPosition[0], colNumber];
        }
        case NORTH_EAST_PIPE: {
            if (previousPosition[0] < currentPosition[0]) {
                // if moved down, go right
                return [currentPosition[0], currentPosition[1] + 1];
            } else {
                // if moved left, go up
                return [currentPosition[0] - 1, currentPosition[1]];
            }
        }
        case NORTH_WEST_PIPE: {
            if (previousPosition[0] < currentPosition[0]) {
                // if moved down, go left
                return [currentPosition[0], currentPosition[1] - 1];
            } else {
                // if moved right, go up
                return [currentPosition[0] - 1, currentPosition[1]];
            }
        }
        case SOUTH_WEST_PIPE: {
            if (previousPosition[0] > currentPosition[0]) {
                // if moved up, go left
                return [currentPosition[0], currentPosition[1] - 1];
            } else {
                // if moved right, go down
                return [currentPosition[0] + 1, currentPosition[1]];
            }
        }
        case SOUTH_EAST_PIPE: {
            if (previousPosition[0] > currentPosition[0]) {
                // if moved up, go right
                return [currentPosition[0], currentPosition[1] + 1];
            } else {
                // if moved left, go down
                return [currentPosition[0] + 1, currentPosition[1]];
            }
        }
        case GROUND:
        default:
            throw new Error("what happened");
    }
}
function printNumPointsInPipePath(input: string[]) {
    const pipeMap: PipeMap = makePipeMap(input);
    const startPosition = findStartPosition(pipeMap);
    const polygon = walkAndMap(pipeMap, startPosition, startPosition, [
        startPosition,
    ]);
    // const stepMap = {}
    let numPointsInPolygon = 0;
    for (let i = 0; i < pipeMap.length; i++) {
        const row = pipeMap[i];
        assertInputDefined(row);
        for (let j = 0; j < row.length; j++) {
            if (pointIsInsidePolygon([i, j], polygon)) {
                numPointsInPolygon++;
            }
        }
    }
    console.log("Points in polygon", numPointsInPolygon);
}

const areCoordsEqual = (coordA: Coord, coordB: Coord) =>
    coordA[0] === coordB[0] && coordA[1] === coordB[1];

function pointIsInsidePolygon(
    coord: Coord,
    polygon: Coord[]
    // pipeMap: PipeMap
) {
    const [row, col] = coord;
    // j is previous point index
    let j = polygon.length - 1;
    let insidePolygon = false;
    for (let i = 0; i < polygon.length; i++) {
        const polygonPoint = polygon[i];
        const previousPolygonPoint = polygon[j];
        assertInputDefined(polygonPoint);
        assertInputDefined(previousPolygonPoint);
        if (areCoordsEqual(polygonPoint, coord)) {
            return false;
        }
        if (polygonPoint[1] > col !== previousPolygonPoint[1] > col) {
            const slope =
                (row - polygonPoint[0]) *
                    (previousPolygonPoint[1] - polygonPoint[1]) -
                (previousPolygonPoint[0] - polygonPoint[0]) *
                    (col - polygonPoint[1]);
            if (slope === 0) {
                // point is on boundary
                return false;
            }
            if (slope < 0 !== previousPolygonPoint[1] < polygonPoint[1]) {
                insidePolygon = !insidePolygon;
            }
        }

        j = i;
    }
    return insidePolygon;
    // let countCrosses = 0;
    // // cast ray from coordinate downward to bottom of map
    // for (let i = coord[0]; i < pipeMap.length; i++) {
    //     const coordToCheck: Coord = [i, coord[1]];
    //     const currentCoordIsPolygonBorder = polygon.some(
    //         (polygonCoord) =>
    //             coordToCheck[0] === polygonCoord[0] &&
    //             coordToCheck[1] === polygonCoord[1]
    //     );
    //     if (
    //         currentCoordIsPolygonBorder &&
    //         pipeMap[coordToCheck[0]]?.[coordToCheck[1]] === HORIZONTAL_PIPE
    //     ) {
    //         countCrosses++;
    //     }
    // }
    // console.log("countCrosses", countCrosses, "coord", coord);
    // // odd crosses means it's inside the polygon
    // return countCrosses % 2 !== 0;
}

printFurthestPipeDistance(getInputRows(testInput));
printFurthestPipeDistance(getDocumentRows("2023/day10.txt"));

printNumPointsInPipePath(getInputRows(testInput));

printNumPointsInPipePath(getDocumentRows("2023/day10.txt"));

