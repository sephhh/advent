var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var getOrMaskInt = function (maskString) {
    //get int version of string to binary with all x's counting as 0
    return parseInt(maskString.replace(/X/g, "0"), 2);
};
var getAndMaskInt = function (maskString) {
    //get int version of string to binary with all x's counting as 1
    return parseInt(maskString.replace(/X/g, "1"), 2);
};
var solvePart1 = function (input) {
    var maskString;
    var memoryLookup = {};
    for (var i = 0; i < input.length; i++) {
        var line = input[i];
        if (line.slice(0, 4) === "mask") {
            maskString = line.split(" = ")[1];
        }
        else {
            var _a = line.match(/^mem\[(\d+)] = (\d+)$/), _ = _a[0], memoryLoc = _a[1], numString = _a[2];
            memoryLookup[memoryLoc] = applyMask(maskString, Number(numString));
        }
    }
    console.log("memory lookup", memoryLookup);
    return Object.keys(memoryLookup).reduce(function (sum, key) { return sum + memoryLookup[key]; }, 0);
};
var binaryStringToInt = function (binaryString) { return parseInt(parseInt(binaryString, 2).toString(10), 10); };
var intToBinaryString = function (input) {
    var inputBinaryString = (input >>> 0).toString(2);
    return "000000000000000000000000000000000000".slice(0, 36 - inputBinaryString.length) + inputBinaryString;
};
var applyMask = function (maskString, input) {
    var inputBinaryString = intToBinaryString(input);
    var afterMask = __spreadArrays(inputBinaryString).map(function (char, i) {
        if (maskString[i] === "0") {
            return "0";
        }
        if (maskString[i] === "1") {
            return "1";
        }
        return char;
    }).join("");
    return binaryStringToInt(afterMask);
};
var testInput = "\nmask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X\nmem[8] = 11\nmem[7] = 101\nmem[8] = 0\n".trim().split("\n");
console.log(solvePart1(testInput));
// console.log(solvePart1(document.body.innerText.trim().split("\n")));
var solvePart2 = function (input) {
    var maskString;
    var memoryLookup = {};
    var _loop_1 = function (i) {
        var line = input[i];
        if (line.slice(0, 4) === "mask") {
            maskString = line.split(" = ")[1];
        }
        else {
            var _a = line.match(/^mem\[(\d+)] = (\d+)$/), _ = _a[0], memoryLoc = _a[1], numString_1 = _a[2];
            var memoryLocations = findAllLocations(maskString, intToBinaryString(Number(memoryLoc)));
            console.log("maskString", maskString, memoryLocations);
            memoryLocations.forEach(function (loc) { return memoryLookup[loc] = Number(numString_1); });
        }
    };
    for (var i = 0; i < input.length; i++) {
        _loop_1(i);
    }
    console.log("memory lookup", memoryLookup);
    return Object.keys(memoryLookup).reduce(function (sum, key) { return sum + memoryLookup[key]; }, 0);
};
//If the bitmask bit is 0, the corresponding memory address bit is unchanged.
// If the bitmask bit is 1, the corresponding memory address bit is overwritten with 1.
// If the bitmask bit is X, the corresponding memory address bit is floating.
var findAllLocations = function (maskString, originalBinaryString) {
    if (maskString.indexOf("X") > -1) {
        return __spreadArrays(findAllLocations(maskString.replace("X", "N"), originalBinaryString), findAllLocations(maskString.replace("X", "1"), originalBinaryString));
    }
    var afterMask = __spreadArrays(originalBinaryString).map(function (char, i) {
        if (maskString[i] === "0") {
            return char;
        }
        if (maskString[i] === "N") {
            return "0";
        }
        if (maskString[i] === "1") {
            return "1";
        }
    }).join("");
    return [binaryStringToInt(afterMask)];
};
var testInput2 = "\nmask = 000000000000000000000000000000X1001X\nmem[42] = 100\nmask = 00000000000000000000000000000000X0XX\nmem[26] = 1\n".trim().split("\n");
console.log(solvePart2(testInput2));
console.log(solvePart2(document.body.innerText.trim().split("\n")));
