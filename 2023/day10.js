"use strict";
exports.__esModule = true;
var assertInputDefined_1 = require("./util/assertInputDefined");
var getDocumentRows_1 = require("./util/getDocumentRows");
var VERTICAL_PIPE = "|";
var HORIZONTAL_PIPE = "-";
var NORTH_EAST_PIPE = "L";
var NORTH_WEST_PIPE = "J";
var SOUTH_WEST_PIPE = "7";
var SOUTH_EAST_PIPE = "F";
var GROUND = ".";
var START = "S";
var VALID_PIPE_MAP_CHARS = [
    VERTICAL_PIPE,
    HORIZONTAL_PIPE,
    NORTH_EAST_PIPE,
    NORTH_WEST_PIPE,
    SOUTH_WEST_PIPE,
    SOUTH_EAST_PIPE,
    GROUND,
    START,
];
var validCharsSet = new Set(VALID_PIPE_MAP_CHARS);
function assertIsValidPipeChar(input) {
    if (!validCharsSet.has(input)) {
        throw new Error("bad input!: " + input);
    }
}
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
var testInput = "\n......................\n.FF7FSF7F7F7F7F7F---7.\n.L|LJ||||||||||||F--J.\n.FL-7LJLJ||||||LJL-77.\n.F--JF--7||LJLJ7F7FJ-.\n.L---JF-JLJ.||-FJLJJ7.\n.|F|F-JF---7F7-L7L|7|.\n.|FFJF7L7F-JF7|JL---7.\n.7-L-JL7||F7|L7F-7F7|.\n.L.L7LFJ|||||FJL7||LJ.\n.L7JLJL-JLJLJL--JLJ.L.\n......................\n";
var makePipeMap = function (input) {
    return input.map(function (string) {
        return string.split("").map(function (str2) {
            assertIsValidPipeChar(str2);
            return str2;
        });
    });
};
var findStartPosition = function (pipeMap) {
    var startPosition = [-1, -1];
    pipeMap.forEach(function (row, index) {
        var startPosIfAny = row.indexOf("S");
        if (startPosIfAny > -1) {
            startPosition = [index, startPosIfAny];
        }
    });
    return startPosition;
};
function printFurthestPipeDistance(input) {
    var pipeMap = makePipeMap(input);
    var startPosition = findStartPosition(pipeMap);
    var steps = walkAndMap(pipeMap, startPosition, startPosition, [
        startPosition,
    ]);
    // console.log("steps", steps);
    console.log(Math.ceil(steps.length / 2));
}
var getCoordFromMap = function (map, coord) {
    var _a;
    var value = (_a = map[coord[0]]) === null || _a === void 0 ? void 0 : _a[coord[1]];
    assertInputDefined_1.assertInputDefined(value);
    return value;
};
function walkAndMap(pipeMap, currentPosition, previousPosition, steps) {
    var keepWalking = true;
    while (keepWalking) {
        var nextPosition = getNextPosition(pipeMap, previousPosition, currentPosition);
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
function getNextPosition(pipeMap, previousPosition, currentPosition) {
    var _a;
    var currentPositionValue = getCoordFromMap(pipeMap, currentPosition);
    switch (currentPositionValue) {
        case START: {
            var possibleNextCoords = [
                [currentPosition[0], currentPosition[1] + 1],
                [currentPosition[0] + 1, currentPosition[1]],
                [currentPosition[0], currentPosition[1] - 1],
                [currentPosition[0] - 1, currentPosition[1]],
            ];
            for (var i = 0; i < possibleNextCoords.length; i++) {
                var possibleNextCoord = possibleNextCoords[i];
                assertInputDefined_1.assertInputDefined(possibleNextCoord);
                var nextCoordValue = (_a = pipeMap[possibleNextCoord[0]]) === null || _a === void 0 ? void 0 : _a[possibleNextCoord[1]];
                if (nextCoordValue && nextCoordValue !== ".") {
                    return possibleNextCoord;
                }
            }
            throw new Error("now valid path from start");
        }
        case VERTICAL_PIPE: {
            var rowNumber = previousPosition[0] < currentPosition[0]
                ? currentPosition[0] + 1
                : currentPosition[0] - 1;
            return [rowNumber, currentPosition[1]];
        }
        case HORIZONTAL_PIPE: {
            var colNumber = previousPosition[1] < currentPosition[1]
                ? currentPosition[1] + 1
                : currentPosition[1] - 1;
            return [currentPosition[0], colNumber];
        }
        case NORTH_EAST_PIPE: {
            if (previousPosition[0] < currentPosition[0]) {
                // if moved down, go right
                return [currentPosition[0], currentPosition[1] + 1];
            }
            else {
                // if moved left, go up
                return [currentPosition[0] - 1, currentPosition[1]];
            }
        }
        case NORTH_WEST_PIPE: {
            if (previousPosition[0] < currentPosition[0]) {
                // if moved down, go left
                return [currentPosition[0], currentPosition[1] - 1];
            }
            else {
                // if moved right, go up
                return [currentPosition[0] - 1, currentPosition[1]];
            }
        }
        case SOUTH_WEST_PIPE: {
            if (previousPosition[0] > currentPosition[0]) {
                // if moved up, go left
                return [currentPosition[0], currentPosition[1] - 1];
            }
            else {
                // if moved right, go down
                return [currentPosition[0] + 1, currentPosition[1]];
            }
        }
        case SOUTH_EAST_PIPE: {
            if (previousPosition[0] > currentPosition[0]) {
                // if moved up, go right
                return [currentPosition[0], currentPosition[1] + 1];
            }
            else {
                // if moved left, go down
                return [currentPosition[0] + 1, currentPosition[1]];
            }
        }
        case GROUND:
        default:
            throw new Error("what happened");
    }
}
function printNumPointsInPipePath(input) {
    var pipeMap = makePipeMap(input);
    var startPosition = findStartPosition(pipeMap);
    var polygon = walkAndMap(pipeMap, startPosition, startPosition, [
        startPosition,
    ]);
    // const stepMap = {}
    var numPointsInPolygon = 0;
    for (var i = 0; i < pipeMap.length; i++) {
        var row = pipeMap[i];
        assertInputDefined_1.assertInputDefined(row);
        for (var j = 0; j < row.length; j++) {
            if (pointIsInsidePolygon([i, j], polygon)) {
                numPointsInPolygon++;
            }
        }
    }
    console.log("Points in polygon", numPointsInPolygon);
}
var areCoordsEqual = function (coordA, coordB) {
    return coordA[0] === coordB[0] && coordA[1] === coordB[1];
};
function pointIsInsidePolygon(coord, polygon
// pipeMap: PipeMap
) {
    var row = coord[0], col = coord[1];
    // j is previous point index
    var j = polygon.length - 1;
    var insidePolygon = false;
    for (var i = 0; i < polygon.length; i++) {
        var polygonPoint = polygon[i];
        var previousPolygonPoint = polygon[j];
        assertInputDefined_1.assertInputDefined(polygonPoint);
        assertInputDefined_1.assertInputDefined(previousPolygonPoint);
        if (areCoordsEqual(polygonPoint, coord)) {
            return false;
        }
        if (polygonPoint[1] > col !== previousPolygonPoint[1] > col) {
            var slope = (row - polygonPoint[0]) *
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
printFurthestPipeDistance(getDocumentRows_1.getInputRows(testInput));
printFurthestPipeDistance(getDocumentRows_1.getDocumentRows("2023/day10.txt"));
printNumPointsInPipePath(getDocumentRows_1.getInputRows(testInput));
printNumPointsInPipePath(getDocumentRows_1.getDocumentRows("2023/day10.txt"));
