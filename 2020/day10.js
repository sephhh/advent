var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var testInput = [
    28,
    33,
    18,
    42,
    31,
    14,
    46,
    20,
    48,
    47,
    24,
    23,
    49,
    45,
    19,
    38,
    39,
    11,
    1,
    32,
    25,
    35,
    8,
    17,
    7,
    9,
    4,
    2,
    34,
    10,
    3,
];
var input = document.body.innerText.trim().split("\n").map(function (stringNum) { return Number(stringNum); });
var getSortedArray = function (array) { return __spreadArrays(array).sort(function (a, b) { return a > b ? 1 : -1; }); };
var findDifferencesMultiplied = function (input) {
    var _a;
    var sortedInput = getSortedArray(input);
    console.log("sortedInput", sortedInput);
    var diffCounts = {};
    for (var i = 0; i < sortedInput.length; i++) {
        var diff = sortedInput[i] - ((_a = sortedInput[i - 1]) !== null && _a !== void 0 ? _a : 0);
        var diffKey = "" + diff;
        diffCounts[diffKey] = (diffCounts[diffKey] || 0) + 1;
    }
    console.log(diffCounts);
    return diffCounts["1"] * (diffCounts["3"] + 1);
};
console.log(findDifferencesMultiplied(testInput));
console.log(findDifferencesMultiplied(input));
var findNumCombinationsForRunLength = function (lengthOfRun) {
    if (lengthOfRun <= 2) {
        return 1;
    }
    if (lengthOfRun === 3) {
        return 2;
    }
    if (lengthOfRun === 4) {
        return 4;
    }
    if (lengthOfRun === 5) {
        return 7;
    }
    console.log("DUNNO BUDDY", lengthOfRun);
    return 1;
};
var findRunLengths = function (input) {
    var _a;
    var sortedInputWithAdaptor = getSortedArray(input);
    sortedInputWithAdaptor.push(sortedInputWithAdaptor[sortedInputWithAdaptor.length - 1] + 3);
    console.log("sortedWithAdaptor", sortedInputWithAdaptor);
    var currentRun = 1;
    var runLengths = [];
    for (var i = 0; i < sortedInputWithAdaptor.length; i++) {
        var previousNum = (_a = sortedInputWithAdaptor[i - 1]) !== null && _a !== void 0 ? _a : 0;
        if (sortedInputWithAdaptor[i] === previousNum + 1) {
            currentRun += 1;
        }
        else {
            if (currentRun > 2) {
                runLengths.push(currentRun);
            }
            currentRun = 1;
        }
    }
    if (currentRun > 1) {
        runLengths.push(currentRun);
    }
    return runLengths;
};
var getTotalConnectionCombos = function (input) {
    return findRunLengths(input).reduce(function (carry, next) {
        var combosForRunLength = findNumCombinationsForRunLength(next);
        console.log("combos multiplying", combosForRunLength);
        return combosForRunLength * carry;
    }, 1);
};
console.log(getTotalConnectionCombos(testInput));
console.log(getTotalConnectionCombos(input));
