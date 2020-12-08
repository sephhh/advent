var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var input = document.body.innerText.trim().split("\n");
var ROWS = 127;
var COLS = 7;
var findSeatId = function (input) {
    var rowChars = __spreadArrays(input).slice(0, 7);
    var colChars = __spreadArrays(input).slice(7);
    var row = findRow(rowChars)[0];
    var col = findCol(colChars)[0];
    return row * 8 + col;
};
var findRow = function (input, range) {
    if (range === void 0) { range = [0, ROWS]; }
    if (input.length === 0) {
        return range;
    }
    var head = input[0], tail = input.slice(1);
    switch (head) {
        case "F":
            return findRow(tail, getFirstHalfOfRange(range));
        case "B":
            return findRow(tail, getSecondHalfOfRange(range));
        default:
            console.log("what happened");
            return [0, 0];
    }
};
var findCol = function (input, range) {
    if (range === void 0) { range = [0, COLS]; }
    if (input.length === 0) {
        return range;
    }
    var head = input[0], tail = input.slice(1);
    switch (head) {
        case "L":
            return findCol(tail, getFirstHalfOfRange(range));
        case "R":
            return findCol(tail, getSecondHalfOfRange(range));
        default:
            console.log("what happened");
            return [0, 0];
    }
};
var getFirstHalfOfRange = function (range) { return [range[0], range[0] + Math.floor((range[1] - range[0]) / 2)]; };
var getSecondHalfOfRange = function (range) { return [range[0] + ((range[1] - range[0] + 1)) / 2, range[1]]; };
console.log(findSeatId("FBFBBFFRLR"));
console.log(findSeatId("FFFBBBFRRR"));
console.log(findSeatId("BBFFBBFRLL"));
var getHighestSeatId = function (input) {
    var highestSeatId = 0;
    for (var i = 0; i < input.length; i++) {
        var seatId = findSeatId(input[i]);
        if (seatId > highestSeatId) {
            highestSeatId = seatId;
        }
    }
    return highestSeatId;
};
// console.log(getHighestSeatId(input));
var getMySeatId = function (input) {
    var seatLookup = {};
    for (var i = 0; i < input.length; i++) {
        seatLookup[findSeatId(input[i])] = true;
    }
    var mySeatId = -1;
    Object.keys(seatLookup).forEach(function (seatId) {
        var seatIdNumber = Number(seatId);
        if (!seatLookup[seatIdNumber - 1] && seatLookup[seatIdNumber - 2]) {
            mySeatId = seatIdNumber - 1;
        }
    });
    return mySeatId;
};
console.log(getMySeatId(input));
