import { assertInputDefined } from "./util/assertInputDefined";
import { getDocumentRows, getInputRows } from "./util/getDocumentRows";

const testInput = `
O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....
`;
const ROUND_ROCK = "O";
const EMPTY_SPACE = ".";
const SQUARE_ROCK = "#";
type BoardChar = typeof ROUND_ROCK | typeof EMPTY_SPACE | typeof SQUARE_ROCK;
type Board = BoardChar[][];
type Sorter = (array: BoardChar[]) => BoardChar[];

function assertIsBoardChar(char: unknown): asserts char is BoardChar {
    if (char !== ROUND_ROCK && char !== EMPTY_SPACE && char !== SQUARE_ROCK) {
        throw new Error("bad input: " + char);
    }
}

const parseBoard = (inputRows: string[]): Board =>
    inputRows.map((string) =>
        string.split("").map((char) => {
            assertIsBoardChar(char);
            return char;
        })
    );

const memoizedSorter = (sorter: Sorter) => {
    const memo: Record<string, BoardChar[]> = {};
    return (array: BoardChar[]): BoardChar[] => {
        const arrayKey = array.join("");
        const memoEntry = memo[arrayKey];
        if (typeof memoEntry !== "undefined") {
            // console.log("cache hit");
            return memoEntry;
        }
        const sortedArray = sorter(array);
        memo[arrayKey] = sortedArray;
        return sortedArray;
    };
};

const memoizedSortRockFirst = memoizedSorter(sortRockFirst);
const memoizedSortRockLast = memoizedSorter(sortRockLast);

function tiltBoardNorth(board: Board): Board {
    return transformColumns(board, sortRockFirst);
}

function tiltBoardWest(board: Board): Board {
    return transformRows(board, sortRockFirst);
}

function tiltBoardSouth(board: Board): Board {
    return transformColumns(board, sortRockLast);
}

function tiltBoardEast(board: Board): Board {
    return transformRows(board, sortRockLast);
}

function transformColumns(board: Board, sorter: Sorter) {
    const newBoard: Board = [];
    const firstRowLength = board[0]?.length ?? 0;
    for (let i = 0; i < firstRowLength; i++) {
        const col: BoardChar[] = [];
        for (let j = 0; j < board.length; j++) {
            const cell = board[j]?.[i];
            assertInputDefined(cell);
            col.push(cell);
        }
        sorter(col).forEach((cell, rowIndex) => {
            newBoard[rowIndex] = newBoard[rowIndex] ?? [];
            // assertIsBoardChar(cell);
            newBoard[rowIndex]?.push(cell);
        });
    }
    return newBoard;
}

function transformRows(board: Board, sorter: Sorter) {
    return board.map(sorter);
}

function sortRockFirst(array: BoardChar[]) {
    let lastStopIndex = -1;
    const sortedArray: BoardChar[] = [];
    return array.reduce((carry, current, index) => {
        if (current === SQUARE_ROCK) {
            carry[index] = current;
            lastStopIndex = index;
        } else if (current === ROUND_ROCK) {
            const newIndex = lastStopIndex + 1;
            carry[newIndex] = current;
            carry[index] = carry[index] ?? EMPTY_SPACE;
            lastStopIndex = newIndex;
        } else {
            carry[index] = EMPTY_SPACE;
        }
        return carry;
    }, sortedArray);
}

function sortRockLast(array: BoardChar[]) {
    let lastStopIndex = array.length;
    const sortedArray: BoardChar[] = [];
    return array.reduce((carry, _ignore, forwardIndex) => {
        const index = array.length - 1 - forwardIndex;
        const current = array[index];
        if (current === SQUARE_ROCK) {
            carry[index] = current;
            lastStopIndex = index;
        } else if (current === ROUND_ROCK) {
            const newIndex = lastStopIndex - 1;
            carry[newIndex] = current;
            carry[index] = carry[index] ?? EMPTY_SPACE;
            lastStopIndex = newIndex;
        } else {
            carry[index] = EMPTY_SPACE;
        }
        return carry;
    }, sortedArray);
}

function printLoad(inputRows: string[]) {
    const board = parseBoard(inputRows);
    console.log("board");
    printBoard(board);
    const tiltedBoard = tiltBoardNorth(board);
    console.log("tiltedBoard");
    printBoard(tiltedBoard);
    console.log("board load", calculateLoad(tiltedBoard));
}
function printBoard(board: string[][]) {
    console.log(board.map((row) => row.join("")).join("\n"));
}

function calculateLoad(board: Board): number {
    const boardLength = board.length;
    let boardLoadTotal = 0;
    for (let i = 0; i < board.length; i++) {
        const row = board[i];
        const rowValue = boardLength - i;
        row?.forEach((cell) => {
            if (cell === ROUND_ROCK) {
                boardLoadTotal += rowValue;
            }
        });
    }
    return boardLoadTotal;
}

function printLoadAfterXCycles(inputRows: string[], numCycles: number) {
    let board = parseBoard(inputRows);
    printBoard(board);
    // let lastBoardStringSignature = "";
    console.time("batch");
    const cyclesToCalculate = 1000;
    const loadCycle = [];
    for (let i = 0; i < cyclesToCalculate; i++) {
        // const boardStringSignature = board
        //     .map((row) => row.join(""))
        //     .join("\n");
        board = tiltBoardNorth(board);
        // console.log("after north tilt");
        // printBoard(board);
        board = tiltBoardWest(board);
        // console.log("after west tilt");
        // printBoard(board);
        board = tiltBoardSouth(board);
        // console.log("after south tilt");
        // printBoard(board);
        board = tiltBoardEast(board);
        // printBoard(board);
        // if (boardStringSignature === lastBoardStringSignature) {
        //     console.log("stopping at ", i);
        //     break;
        // }
        // lastBoardStringSignature = boardStringSignature;
        const load = calculateLoad(board);
        // console.log("load", load, i);
        loadCycle.push(load);
    }
    const doubleCycle = [];
    for (let i = 0; i < loadCycle.length; i++) {
        const decrementIndex = loadCycle.length - 1 - i;
        const element = loadCycle[decrementIndex];
        doubleCycle.unshift(element);
        if (doubleCycle.length % 2 === 0) {
            if (
                doubleCycle.slice(0, doubleCycle.length / 2).join() ===
                doubleCycle.slice(doubleCycle.length / 2).join()
            ) {
                const singleCycle = doubleCycle.slice(
                    0,
                    doubleCycle.length / 2
                );
                const stepsToGoFromCycleEnd = numCycles - decrementIndex - 1;
                const cycleOffset = stepsToGoFromCycleEnd % singleCycle.length;
                const loadAfterNumSteps = singleCycle[cycleOffset];
                console.log(
                    "singleCycle",
                    singleCycle,
                    decrementIndex,
                    stepsToGoFromCycleEnd,
                    cycleOffset
                );
                console.log("FINAL LOAD", loadAfterNumSteps);
                break;
            }
        }
    }
}
console.time("iterations: " + 1);

// printLoad(getInputRows(testInput));

// printLoad(getDocumentRows("2023/day14.txt"));

printLoadAfterXCycles(getInputRows(testInput), 1000000000);
printLoadAfterXCycles(getDocumentRows("2023/day14.txt"), 1000000000);

// console.timeEnd("iterations: " + 1);
