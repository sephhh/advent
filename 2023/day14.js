"use strict";
exports.__esModule = true;
var assertInputDefined_1 = require("./util/assertInputDefined");
var getDocumentRows_1 = require("./util/getDocumentRows");
var testInput = "\nO....#....\nO.OO#....#\n.....##...\nOO.#O....O\n.O.....O#.\nO.#..O.#.#\n..O..#O..O\n.......O..\n#....###..\n#OO..#....\n";
var ROUND_ROCK = "O";
var EMPTY_SPACE = ".";
var SQUARE_ROCK = "#";
function assertIsBoardChar(char) {
    if (char !== ROUND_ROCK && char !== EMPTY_SPACE && char !== SQUARE_ROCK) {
        throw new Error("bad input: " + char);
    }
}
var parseBoard = function (inputRows) {
    return inputRows.map(function (string) {
        return string.split("").map(function (char) {
            assertIsBoardChar(char);
            return char;
        });
    });
};
var memoizedSorter = function (sorter) {
    var memo = {};
    return function (array) {
        var arrayKey = array.join("");
        var memoEntry = memo[arrayKey];
        if (typeof memoEntry !== "undefined") {
            // console.log("cache hit");
            return memoEntry;
        }
        var sortedArray = sorter(array);
        memo[arrayKey] = sortedArray;
        return sortedArray;
    };
};
var memoizedSortRockFirst = memoizedSorter(sortRockFirst);
var memoizedSortRockLast = memoizedSorter(sortRockLast);
function tiltBoardNorth(board) {
    return transformColumns(board, sortRockFirst);
}
function tiltBoardWest(board) {
    return transformRows(board, sortRockFirst);
}
function tiltBoardSouth(board) {
    return transformColumns(board, sortRockLast);
}
function tiltBoardEast(board) {
    return transformRows(board, sortRockLast);
}
function transformColumns(board, sorter) {
    var _a, _b, _c;
    var newBoard = [];
    var firstRowLength = (_b = (_a = board[0]) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
    for (var i = 0; i < firstRowLength; i++) {
        var col = [];
        for (var j = 0; j < board.length; j++) {
            var cell = (_c = board[j]) === null || _c === void 0 ? void 0 : _c[i];
            assertInputDefined_1.assertInputDefined(cell);
            col.push(cell);
        }
        sorter(col).forEach(function (cell, rowIndex) {
            var _a, _b;
            newBoard[rowIndex] = (_a = newBoard[rowIndex]) !== null && _a !== void 0 ? _a : [];
            // assertIsBoardChar(cell);
            (_b = newBoard[rowIndex]) === null || _b === void 0 ? void 0 : _b.push(cell);
        });
    }
    return newBoard;
}
function transformRows(board, sorter) {
    return board.map(sorter);
}
function sortRockFirst(array) {
    var lastStopIndex = -1;
    var sortedArray = [];
    return array.reduce(function (carry, current, index) {
        var _a;
        if (current === SQUARE_ROCK) {
            carry[index] = current;
            lastStopIndex = index;
        }
        else if (current === ROUND_ROCK) {
            var newIndex = lastStopIndex + 1;
            carry[newIndex] = current;
            carry[index] = (_a = carry[index]) !== null && _a !== void 0 ? _a : EMPTY_SPACE;
            lastStopIndex = newIndex;
        }
        else {
            carry[index] = EMPTY_SPACE;
        }
        return carry;
    }, sortedArray);
}
function sortRockLast(array) {
    var lastStopIndex = array.length;
    var sortedArray = [];
    return array.reduce(function (carry, _ignore, forwardIndex) {
        var _a;
        var index = array.length - 1 - forwardIndex;
        var current = array[index];
        if (current === SQUARE_ROCK) {
            carry[index] = current;
            lastStopIndex = index;
        }
        else if (current === ROUND_ROCK) {
            var newIndex = lastStopIndex - 1;
            carry[newIndex] = current;
            carry[index] = (_a = carry[index]) !== null && _a !== void 0 ? _a : EMPTY_SPACE;
            lastStopIndex = newIndex;
        }
        else {
            carry[index] = EMPTY_SPACE;
        }
        return carry;
    }, sortedArray);
}
function printLoad(inputRows) {
    var board = parseBoard(inputRows);
    console.log("board");
    printBoard(board);
    var tiltedBoard = tiltBoardNorth(board);
    console.log("tiltedBoard");
    printBoard(tiltedBoard);
    console.log("board load", calculateLoad(tiltedBoard));
}
function printBoard(board) {
    console.log(board.map(function (row) { return row.join(""); }).join("\n"));
}
function calculateLoad(board) {
    var boardLength = board.length;
    var boardLoadTotal = 0;
    var _loop_1 = function (i) {
        var row = board[i];
        var rowValue = boardLength - i;
        row === null || row === void 0 ? void 0 : row.forEach(function (cell) {
            if (cell === ROUND_ROCK) {
                boardLoadTotal += rowValue;
            }
        });
    };
    for (var i = 0; i < board.length; i++) {
        _loop_1(i);
    }
    return boardLoadTotal;
}
function printLoadAfterXCycles(inputRows, numCycles) {
    var board = parseBoard(inputRows);
    printBoard(board);
    // let lastBoardStringSignature = "";
    console.time("batch");
    var cyclesToCalculate = 1000;
    var loadCycle = [];
    for (var i = 0; i < cyclesToCalculate; i++) {
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
        var load = calculateLoad(board);
        // console.log("load", load, i);
        loadCycle.push(load);
    }
    var doubleCycle = [];
    for (var i = 0; i < loadCycle.length; i++) {
        var decrementIndex = loadCycle.length - 1 - i;
        var element = loadCycle[decrementIndex];
        doubleCycle.unshift(element);
        if (doubleCycle.length % 2 === 0) {
            if (doubleCycle.slice(0, doubleCycle.length / 2).join() ===
                doubleCycle.slice(doubleCycle.length / 2).join()) {
                var singleCycle = doubleCycle.slice(0, doubleCycle.length / 2);
                var stepsToGoFromCycleEnd = numCycles - decrementIndex - 1;
                var cycleOffset = stepsToGoFromCycleEnd % singleCycle.length;
                var loadAfterNumSteps = singleCycle[cycleOffset];
                console.log("singleCycle", singleCycle, decrementIndex, stepsToGoFromCycleEnd, cycleOffset);
                console.log("FINAL LOAD", loadAfterNumSteps);
                break;
            }
        }
    }
}
console.time("iterations: " + 1);
// printLoad(getInputRows(testInput));
// printLoad(getDocumentRows("2023/day14.txt"));
printLoadAfterXCycles(getDocumentRows_1.getInputRows(testInput), 1000000000);
printLoadAfterXCycles(getDocumentRows_1.getDocumentRows("2023/day14.txt"), 1000000000);
// console.timeEnd("iterations: " + 1);
