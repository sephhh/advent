"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var getDocumentRows_1 = require("./util/getDocumentRows");
var assertInputDefined_1 = require("./util/assertInputDefined");
var testInput = "\nCard 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53\nCard 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19\nCard 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1\nCard 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83\nCard 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36\nCard 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11\n";
var printWinningPoints = function (inputRows) {
    var winningPoints = 0;
    inputRows.forEach(function (row) {
        var _a;
        var rowWinningPoints = 0;
        var numbers = (_a = row.split(":")[1]) === null || _a === void 0 ? void 0 : _a.trim();
        assertInputDefined_1.assertInputDefined(numbers);
        var _b = numbers
            .split(" | ")
            .map(function (str) { return str.split(/\s+/).map(function (str2) { return +str2.trim(); }); }), winningNumbers = _b[0], myNumbers = _b[1];
        assertInputDefined_1.assertInputDefined(winningNumbers);
        assertInputDefined_1.assertInputDefined(myNumbers);
        var totalNumberCount = new Set(winningNumbers).size + new Set(myNumbers).size;
        console.log("counts", winningNumbers.length, myNumbers.length);
        var nonOverlappingNumberCount = new Set(__spreadArrays(winningNumbers, myNumbers)).size;
        var myWinningNumberCount = totalNumberCount - nonOverlappingNumberCount;
        if (myWinningNumberCount > 0) {
            rowWinningPoints = Math.pow(2, myWinningNumberCount - 1);
        }
        console.log("rowWinningPoints", myWinningNumberCount, rowWinningPoints);
        winningPoints += rowWinningPoints;
    });
    console.log("total winning points", winningPoints);
};
printWinningPoints(getDocumentRows_1.getInputRows(testInput));
printWinningPoints(getDocumentRows_1.getDocumentRows("2023/day4.txt"));
