"use strict";
exports.__esModule = true;
var getDocumentRows_1 = require("./util/getDocumentRows");
var printCalibrationSum = function (input) {
    var sum = input.reduce(function (carry, currentString) {
        var _a, _b;
        var firstNumber = (_a = currentString.match(/\d/g)) === null || _a === void 0 ? void 0 : _a.shift();
        var lastNumber = (_b = currentString.match(/\d/g)) === null || _b === void 0 ? void 0 : _b.pop();
        var calibration = +("" + firstNumber + lastNumber);
        // console.log("calibration", calibration);
        return carry + calibration;
    }, 0);
    console.log("sum: ", sum);
};
var realInput = getDocumentRows_1.getDocumentRows("2023/day1.txt");
var testInput = [
    "1abc2",
    "pqr3stu8vwx",
    "a1b2c3d4e5f",
    "treb7uchet",
];
// printCalibrationSum(testInput);
// printCalibrationSum(realInput);
var spelledNumberRegex = /\d|one|two|three|four|five|six|seven|eight|nine/g;
var getNumberFromCharOrNumberWord = function (string) {
    switch (string) {
        case "one":
            return 1;
        case "two":
            return 2;
        case "three":
            return 3;
        case "four":
            return 4;
        case "five":
            return 5;
        case "six":
            return 6;
        case "seven":
            return 7;
        case "eight":
            return 8;
        case "nine":
            return 9;
        // case "zero":
        // return 0;
        default:
            return Number(string);
    }
};
var printCalibrationSum2 = function (input) {
    var sum = input.reduce(function (carry, currentString) {
        var _a;
        var currentStringWithoutOverlaps = currentString
            .replace(/one/g, "o one")
            .replace(/eight/g, "e eight")
            .replace(/nine/g, "n nine")
            .replace(/three/g, "t three")
            .replace(/two/g, "t two");
        var match = currentStringWithoutOverlaps.match(spelledNumberRegex);
        var firstNumberString = match === null || match === void 0 ? void 0 : match.shift();
        var lastNumberString = (_a = match === null || match === void 0 ? void 0 : match.pop()) !== null && _a !== void 0 ? _a : firstNumberString;
        var firstNumber = getNumberFromCharOrNumberWord(firstNumberString);
        var lastNumber = getNumberFromCharOrNumberWord(lastNumberString);
        var calibration = firstNumber * 10 + lastNumber;
        return carry + calibration;
    }, 0);
    console.log("sum: ", sum);
};
var testInput2 = [
    "two1nine",
    "eightwothree",
    "abcone2threexyz",
    "xtwone3four",
    "4nineeightseven2",
    "zoneight234",
    "7pqrstsixteen",
];
printCalibrationSum(testInput);
printCalibrationSum2(testInput2);
printCalibrationSum(realInput);
printCalibrationSum2(realInput);
exports["default"] = {};
