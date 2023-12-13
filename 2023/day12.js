"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var assertInputDefined_1 = require("./util/assertInputDefined");
var getDocumentRows_1 = require("./util/getDocumentRows");
var testInput = "\n???.### 1,1,3\n.??..??...?##. 1,1,3\n?#?#?#?#?#?#?#? 1,3,1,6\n????.#...#... 4,1,1\n????.######..#####. 1,6,5\n?###???????? 3,2,1\n";
var parseRowString = function (rowString) {
    var _a = rowString.split(" "), infoString = _a[0], groupString = _a[1];
    assertInputDefined_1.assertInputDefined(infoString);
    assertInputDefined_1.assertInputDefined(groupString);
    var groups = groupString.split(",").map(Number);
    // const info = infoString.split("");
    return { infoString: infoString, groups: groups };
};
function calculateArrangements(inputRows) {
    var total = 0;
    inputRows.forEach(function (row) {
        var _a = parseRowString(row), infoString = _a.infoString, groups = _a.groups;
        // console.log(infoString, groups);
        var countPerRow = countPermutationsPerRow(infoString, groups);
        // console.log("countPerRow", countPerRow);
        total += countPerRow;
    });
    console.log("total permutations", total);
}
function countPermutationsPerRow(infoString, groups) {
    var regexString = "^\\.*";
    regexString += groups.map(function (number) { return "#{" + number + "}"; }).join("\\.+");
    regexString += "\\.*$";
    var regexp = new RegExp(regexString);
    // console.log("regexp", regexp);
    return testPermutations(infoString, regexp);
}
function testPermutations(string, regex, count) {
    if (count === void 0) { count = 0; }
    var hasAnyQuestionMarks = /\?/.test(string);
    if (!hasAnyQuestionMarks) {
        var doesItMatch = regex.test(string);
        // if (doesItMatch) {
        //     console.log("matching string", string);
        // } else {
        //     console.log("not matching", string);
        // }
        return doesItMatch ? count + 1 : count;
    }
    var newStringA = string.replace("?", ".");
    var newStringB = string.replace("?", "#");
    return (testPermutations(newStringA, regex, count) +
        testPermutations(newStringB, regex, count));
}
calculateArrangements(getDocumentRows_1.getInputRows(testInput));
calculateArrangements(getDocumentRows_1.getDocumentRows("2023/day12.txt"));
function calculateArrangementsTimesFive(inputRows) {
    var total = 0;
    inputRows.forEach(function (row) {
        var _a = parseRowString(row), infoString = _a.infoString, groups = _a.groups;
        var unfoldedInfoString = infoString +
            "?" +
            infoString +
            "?" +
            infoString +
            "?" +
            infoString +
            "?" +
            infoString;
        var unfoldedGroups = __spreadArrays(groups, groups, groups, groups, groups);
        var totalPerRow = countPermutationsPerRow(unfoldedInfoString, unfoldedGroups);
        console.log("per row", unfoldedInfoString, totalPerRow);
        total += totalPerRow;
    });
    console.log("total permutations", total);
}
calculateArrangementsTimesFive(getDocumentRows_1.getInputRows(testInput));
