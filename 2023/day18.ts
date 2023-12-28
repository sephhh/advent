import { assertInputDefined } from "./util/assertInputDefined";
import { getDocumentRows, getInputRows } from "./util/getDocumentRows";
import { pointIsInPolygon } from "./util/pointIsInPolygon";

const testInput = `
R 6 (#70c710)
D 5 (#0dc571)
L 2 (#5713f0)
D 2 (#d2c081)
R 2 (#59c680)
D 2 (#411b91)
L 5 (#8ceee2)
U 2 (#caa173)
L 1 (#1b58a2)
U 2 (#caa171)
R 2 (#7807d2)
U 3 (#a77fa3)
L 2 (#015232)
U 2 (#7a21e3)
`;

type CellMap = Record<number, string>;
type RowMap = Record<number, CellMap>;
type Grid = Record<number, RowMap>;

const UP = "U";
const DOWN = "D";
const LEFT = "L";
const RIGHT = "R";

type Direction = typeof UP | typeof DOWN | typeof LEFT | typeof RIGHT;
type Coord = [row: number, col: number];
const BLANK = "XXXXXXX";

const drawTrenchesAndCountSquares = (inputRows: string[]) => {
    const grid: Grid = {
        0: {
            0: "START",
        },
    };
    let currentCoord: Coord = [0, 0];
    const polygon: Coord[] = [];
    inputRows.forEach((row) => {
        const [direction, rawLength, rawHex] = row.split(" ");
        assertInputDefined(direction);
        assertInputDefined(rawLength);
        assertInputDefined(rawHex);
        const length = Number(rawLength);
        const lineCoordinates = getLineForDirectionAndLength(
            currentCoord,
            direction,
            length
        );
        lineCoordinates.forEach((coord) => {
            polygon.push(coord);
            const [row, col] = coord;
            grid[row] = grid[row] ?? {};
            grid[row][col] = rawHex?.replace(/[()]/g, "");
        });
        currentCoord = lineCoordinates[lineCoordinates.length - 1];
    });
    console.log("polygon", polygon);
    let sumInner = 0;
    const rowIndexes = Object.keys(grid).map(Number);
    const firstRow = Math.min(...rowIndexes);
    const lastRow = Math.max(...rowIndexes);
    let printableGrid = "";
    for (let i = firstRow; i < lastRow; i++) {
        const row = grid[i];
        if (row) {
            const colIndexes = Object.keys(grid).map(Number);
            const firstCol = Math.min(...colIndexes);
            const lastCol = Math.max(...colIndexes);
            for (let j = firstCol; j < lastCol; j++) {
                if (pointIsInPolygon([i, j], polygon)) {
                    sumInner++;
                }
                printableGrid += (row[j] ?? BLANK)[0];
            }
        }
        printableGrid += "\n";
    }
    console.log("grid");
    console.log(printableGrid);
    console.log("count", sumInner + polygon.length);
};

const getLineForDirectionAndLength = (
    coord: Coord,
    direction: string,
    length: number
) => {
    const [row, col] = coord;
    const lineCoordinates: Coord[] = [];
    switch (direction) {
        case UP:
            for (let i = 0; i < length; i++) {
                lineCoordinates.push([row - i - 1, col]);
            }
            break;
        case DOWN:
            for (let i = 0; i < length; i++) {
                lineCoordinates.push([row + i + 1, col]);
            }
            break;
        case RIGHT:
            for (let i = 0; i < length; i++) {
                lineCoordinates.push([row, col + i + 1]);
            }
            break;
        case LEFT:
            for (let i = 0; i < length; i++) {
                lineCoordinates.push([row, col - i - 1]);
            }
            break;
        default:
            throw new Error("invalid direction: " + direction);
    }
    return lineCoordinates;
};

drawTrenchesAndCountSquares(getInputRows(testInput));
drawTrenchesAndCountSquares(getDocumentRows("2023/day18.txt"));

const DIRECTIONS = [RIGHT, DOWN, LEFT, UP];
const drawHexTrenchesAndCountSquares = (inputRows: string[]) => {
    const grid: Grid = {
        0: {
            0: "START",
        },
    };
    let currentCoord: Coord = [0, 0];
    const polygon: Coord[] = [];
    inputRows.forEach((row) => {
        const [_junk, rawHex] = row.split("#");
        assertInputDefined(rawHex);
        console.log("rawHex", rawHex);
        const directionIndex = rawHex[5];
        assertInputDefined(directionIndex);
        const direction = DIRECTIONS[Number(directionIndex)];
        assertInputDefined(direction);
        const length = parseInt(rawHex.slice(0, 5), 16);
        const lineCoordinates = getLineForDirectionAndLength(
            currentCoord,
            direction,
            length
        );
        lineCoordinates.forEach((coord) => {
            polygon.push(coord);
            const [row, col] = coord;
            grid[row] = grid[row] ?? {};
            grid[row][col] = rawHex?.replace(/[()]/g, "");
        });
        currentCoord = lineCoordinates[lineCoordinates.length - 1];
    });
    console.log("polygon", polygon.length);
    let sumInner = 0;
    let iteration = 0;
    // let printableGrid = "";
    Object.keys(grid).forEach((rowKey) => {
        const row = grid[rowKey];
        if (row) {
            const sortedColKeys = Object.keys(row).map(Number).sort();
            let inside = false;
            let prevCell = "";
            for (
                let i = sortedColKeys[0];
                i < sortedColKeys[sortedColKeys.length - 1];
                i++
            ) {
                if (grid[rowKey]?.[i]) {
                    prevCell = "LINE";
                } else {
                    if (prevCell === "LINE") {
                        inside = !inside;
                    }
                    if (inside) {
                        sumInner++;
                    }
                    prevCell = "";
                }
                iteration++;
                if (iteration % 100000000 === 0) {
                    console.log("iteration", iteration, sumInner);
                }
            }
        }
    });
    // console.log("grid");
    // console.log(printableGrid);
    console.log("count", sumInner + polygon.length);
};

drawHexTrenchesAndCountSquares(getInputRows(testInput));
// drawHexTrenchesAndCountSquares(getDocumentRows("2023/day18.txt"));
