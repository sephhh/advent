var testInputDay32021 = "\n00100\n11110\n10110\n10111\n10101\n01111\n00111\n11100\n10000\n11001\n00010\n01010\n";
var documentTextDay32021 = typeof document === "undefined"
    ? testInputDay32021
    : document.body.innerText;
var binaryStrings = documentTextDay32021.trim().split("\n");
var calculateGammaAndEpsilon = function (binaryStrings) {
    var _a, _b, _c;
    var gamma = "";
    var epsilon = "";
    var stringLength = (_b = (_a = binaryStrings[0]) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
    var numStrings = binaryStrings.length;
    for (var i = 0; i < stringLength; i++) {
        var countOnes = 0;
        for (var j = 0; j < numStrings; j++) {
            var bit = (_c = binaryStrings === null || binaryStrings === void 0 ? void 0 : binaryStrings[j]) === null || _c === void 0 ? void 0 : _c[i];
            if (typeof bit === "undefined") {
                throw new Error("invalid input");
            }
            if (bit === "1") {
                countOnes++;
            }
        }
        if (countOnes > numStrings / 2) {
            gamma = gamma + "1";
            epsilon = epsilon + "0";
        }
        else {
            gamma = gamma + "0";
            epsilon = epsilon + "1";
        }
    }
    return [gamma, epsilon];
};
var solveDay32021P1 = function (binaryStrings) {
    var _a = calculateGammaAndEpsilon(binaryStrings), gamma = _a[0], epsilon = _a[1];
    console.log("gamma", gamma, "epsilon", epsilon);
    console.log("solution", parseInt(gamma, 2) * parseInt(epsilon, 2));
};
solveDay32021P1(binaryStrings);
var filterStringsByCharAtPosition = function (strings, targetChar, position) { return strings.filter(function (string) { return string[position] === targetChar; }); };
var findMostCommonBitInPosition = function (strings, position) {
    var countOnes = 0;
    var countZeroes = 0;
    strings.forEach(function (string) {
        if (string[position] === "1") {
            countOnes++;
        }
        else {
            countZeroes++;
        }
    });
    if (countZeroes > countOnes) {
        return "0";
    }
    return "1";
};
var findLeastCommonBitInPosition = function (strings, position) {
    var countOnes = 0;
    var countZeroes = 0;
    strings.forEach(function (string) {
        if (string[position] === "1") {
            countOnes++;
        }
        else {
            countZeroes++;
        }
    });
    if (countZeroes <= countOnes) {
        return "0";
    }
    return "1";
};
var calculateOxygenRating = function (binaryStrings, position) {
    var _a;
    if (position === void 0) { position = 0; }
    console.log("oxygen length", binaryStrings.length);
    if (binaryStrings.length === 0) {
        throw new Error();
    }
    if (binaryStrings.length === 1) {
        return (_a = binaryStrings[0]) !== null && _a !== void 0 ? _a : "ERROR";
    }
    var mostCommonAtPosition = findMostCommonBitInPosition(binaryStrings, position);
    return calculateOxygenRating(filterStringsByCharAtPosition(binaryStrings, mostCommonAtPosition, position), position + 1);
};
var calculateCo2Rating = function (binaryStrings, position) {
    var _a;
    if (position === void 0) { position = 0; }
    console.log("co2 length", binaryStrings.length);
    if (binaryStrings.length === 0) {
        throw new Error();
    }
    if (binaryStrings.length === 1) {
        return (_a = binaryStrings[0]) !== null && _a !== void 0 ? _a : "ERROR";
    }
    var leastCommon = findLeastCommonBitInPosition(binaryStrings, position);
    return calculateCo2Rating(filterStringsByCharAtPosition(binaryStrings, leastCommon, position), position + 1);
};
var solveDay32021P2 = function (binaryStrings) {
    var oxygenRating = calculateOxygenRating(binaryStrings);
    var co2Rating = calculateCo2Rating(binaryStrings);
    console.log("oxygenRating", oxygenRating, "co2Rating", co2Rating);
    console.log("solution", parseInt(oxygenRating, 2) * parseInt(co2Rating, 2));
};
solveDay32021P2(binaryStrings);
