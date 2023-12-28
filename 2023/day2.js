"use strict";
exports.__esModule = true;
var getDocumentRows_1 = require("./util/getDocumentRows");
var assertInputDefined_1 = require("./util/assertInputDefined");
var rawInput = "\nGame 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green\nGame 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue\nGame 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red\nGame 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red\nGame 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green\n";
var gameConstraint = {
    red: 12,
    green: 13,
    blue: 14
};
var printValidGameSum = function (inputRows, gameConstraint) {
    var sum = 0;
    inputRows.forEach(function (row) {
        var _a;
        var gameNumber = (_a = row.match(/Game (\d+)/)) === null || _a === void 0 ? void 0 : _a[1];
        assertInputDefined_1.assertInputDefined(gameNumber);
        var sets = row.split(":")[1];
        assertInputDefined_1.assertInputDefined(sets);
        var isValidGame = true;
        sets.split(";").forEach(function (set) {
            var colorCount = {
                red: 0,
                green: 0,
                blue: 0
            };
            set.trim()
                .split(",")
                .forEach(function (pull) {
                var _a = pull.trim().split(" "), number = _a[0], color = _a[1];
                assertInputDefined_1.assertInputDefined(number);
                assertInputDefined_1.assertInputDefined(color);
                if (color !== "red" &&
                    color !== "blue" &&
                    color !== "green") {
                    console.log("unexpected color", color);
                }
                else {
                    colorCount[color] += Number(number);
                }
            });
            if (colorCount.red > gameConstraint.red ||
                colorCount.green > gameConstraint.green ||
                colorCount.blue > gameConstraint.blue) {
                isValidGame = false;
            }
        });
        if (isValidGame) {
            sum += Number(gameNumber);
        }
    });
    console.log("VAILD GAME SUM", sum);
};
printValidGameSum(getDocumentRows_1.getInputRows(rawInput), gameConstraint);
var realInput = getDocumentRows_1.getDocumentRows("2023/day2.txt");
printValidGameSum(realInput, gameConstraint);
var printMinGamePower = function (inputRows) {
    var sum = 0;
    inputRows.forEach(function (row) {
        var _a;
        var gameNumber = (_a = row.match(/Game (\d+)/)) === null || _a === void 0 ? void 0 : _a[1];
        assertInputDefined_1.assertInputDefined(gameNumber);
        var sets = row.split(":")[1];
        assertInputDefined_1.assertInputDefined(sets);
        var minColorCount = {
            red: 0,
            green: 0,
            blue: 0
        };
        sets.split(";").forEach(function (set) {
            var colorCountPerSet = {
                red: 0,
                green: 0,
                blue: 0
            };
            set.trim()
                .split(",")
                .forEach(function (pull) {
                var _a = pull.trim().split(" "), number = _a[0], color = _a[1];
                assertInputDefined_1.assertInputDefined(number);
                assertInputDefined_1.assertInputDefined(color);
                if (color !== "red" &&
                    color !== "blue" &&
                    color !== "green") {
                    console.log("unexpected color", color);
                }
                else {
                    colorCountPerSet[color] += Number(number);
                }
            });
            minColorCount.green = Math.max(colorCountPerSet.green, minColorCount.green);
            minColorCount.red = Math.max(colorCountPerSet.red, minColorCount.red);
            minColorCount.blue = Math.max(colorCountPerSet.blue, minColorCount.blue);
        });
        sum += minColorCount.green * minColorCount.blue * minColorCount.red;
    });
    console.log("GAME POWER SUM", sum);
};
printMinGamePower(getDocumentRows_1.getInputRows(rawInput));
printMinGamePower(realInput);
