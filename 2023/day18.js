"use strict";
exports.__esModule = true;
var assertInputDefined_1 = require("./util/assertInputDefined");
var getDocumentRows_1 = require("./util/getDocumentRows");
var pointIsInPolygon_1 = require("./util/pointIsInPolygon");
var testInput = "\nR 6 (#70c710)\nD 5 (#0dc571)\nL 2 (#5713f0)\nD 2 (#d2c081)\nR 2 (#59c680)\nD 2 (#411b91)\nL 5 (#8ceee2)\nU 2 (#caa173)\nL 1 (#1b58a2)\nU 2 (#caa171)\nR 2 (#7807d2)\nU 3 (#a77fa3)\nL 2 (#015232)\nU 2 (#7a21e3)\n";
var UP = "U";
var DOWN = "D";
var LEFT = "L";
var RIGHT = "R";
var BLANK = "XXXXXXX";
var drawTrenchesAndCountSquares = function (inputRows) {
    var _a;
    var grid = {
        0: {
            0: "START"
        }
    };
    var currentCoord = [0, 0];
    var polygon = [];
    inputRows.forEach(function (row) {
        var _a = row.split(" "), direction = _a[0], rawLength = _a[1], rawHex = _a[2];
        assertInputDefined_1.assertInputDefined(direction);
        assertInputDefined_1.assertInputDefined(rawLength);
        assertInputDefined_1.assertInputDefined(rawHex);
        var length = Number(rawLength);
        var lineCoordinates = getLineForDirectionAndLength(currentCoord, direction, length);
        lineCoordinates.forEach(function (coord) {
            var _a;
            polygon.push(coord);
            var row = coord[0], col = coord[1];
            grid[row] = (_a = grid[row]) !== null && _a !== void 0 ? _a : {};
            grid[row][col] = rawHex === null || rawHex === void 0 ? void 0 : rawHex.replace(/[()]/g, "");
        });
        currentCoord = lineCoordinates[lineCoordinates.length - 1];
    });
    console.log("polygon", polygon);
    var sumInner = 0;
    var rowIndexes = Object.keys(grid).map(Number);
    var firstRow = Math.min.apply(Math, rowIndexes);
    var lastRow = Math.max.apply(Math, rowIndexes);
    var printableGrid = "";
    for (var i = firstRow; i < lastRow; i++) {
        var row = grid[i];
        if (row) {
            var colIndexes = Object.keys(grid).map(Number);
            var firstCol = Math.min.apply(Math, colIndexes);
            var lastCol = Math.max.apply(Math, colIndexes);
            for (var j = firstCol; j < lastCol; j++) {
                if (pointIsInPolygon_1.pointIsInPolygon([i, j], polygon)) {
                    sumInner++;
                }
                printableGrid += ((_a = row[j]) !== null && _a !== void 0 ? _a : BLANK)[0];
            }
        }
        printableGrid += "\n";
    }
    console.log("grid");
    console.log(printableGrid);
    console.log("count", sumInner + polygon.length);
};
var getLineForDirectionAndLength = function (coord, direction, length) {
    var row = coord[0], col = coord[1];
    var lineCoordinates = [];
    switch (direction) {
        case UP:
            for (var i = 0; i < length; i++) {
                lineCoordinates.push([row - i - 1, col]);
            }
            break;
        case DOWN:
            for (var i = 0; i < length; i++) {
                lineCoordinates.push([row + i + 1, col]);
            }
            break;
        case RIGHT:
            for (var i = 0; i < length; i++) {
                lineCoordinates.push([row, col + i + 1]);
            }
            break;
        case LEFT:
            for (var i = 0; i < length; i++) {
                lineCoordinates.push([row, col - i - 1]);
            }
            break;
        default:
            throw new Error("invalid direction: " + direction);
    }
    return lineCoordinates;
};
drawTrenchesAndCountSquares(getDocumentRows_1.getInputRows(testInput));
drawTrenchesAndCountSquares(getDocumentRows_1.getDocumentRows("2023/day18.txt"));
var DIRECTIONS = [RIGHT, DOWN, LEFT, UP];
var drawHexTrenchesAndCountSquares = function (inputRows) {
    var grid = {
        0: {
            0: "START"
        }
    };
    var currentCoord = [0, 0];
    var polygon = [];
    inputRows.forEach(function (row) {
        var _a = row.split("#"), _junk = _a[0], rawHex = _a[1];
        assertInputDefined_1.assertInputDefined(rawHex);
        console.log("rawHex", rawHex);
        var directionIndex = rawHex[5];
        assertInputDefined_1.assertInputDefined(directionIndex);
        var direction = DIRECTIONS[Number(directionIndex)];
        assertInputDefined_1.assertInputDefined(direction);
        var length = parseInt(rawHex.slice(0, 5), 16);
        var lineCoordinates = getLineForDirectionAndLength(currentCoord, direction, length);
        lineCoordinates.forEach(function (coord) {
            var _a;
            polygon.push(coord);
            var row = coord[0], col = coord[1];
            grid[row] = (_a = grid[row]) !== null && _a !== void 0 ? _a : {};
            grid[row][col] = rawHex === null || rawHex === void 0 ? void 0 : rawHex.replace(/[()]/g, "");
        });
        currentCoord = lineCoordinates[lineCoordinates.length - 1];
    });
    console.log("polygon", polygon.length);
    var sumInner = 0;
    var iteration = 0;
    // let printableGrid = "";
    Object.keys(grid).forEach(function (rowKey) {
        var _a;
        var row = grid[rowKey];
        if (row) {
            var sortedColKeys = Object.keys(row).map(Number).sort();
            var inside = false;
            var prevCell = "";
            for (var i = sortedColKeys[0]; i < sortedColKeys[sortedColKeys.length - 1]; i++) {
                if ((_a = grid[rowKey]) === null || _a === void 0 ? void 0 : _a[i]) {
                    prevCell = "LINE";
                }
                else {
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
drawHexTrenchesAndCountSquares(getDocumentRows_1.getInputRows(testInput));
// drawHexTrenchesAndCountSquares(getDocumentRows("2023/day18.txt"));
