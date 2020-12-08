var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var input = document.body.innerText.trim().split("\n");
var testInput = [
    "1-3 a: abcde",
    "1-3 b: cdefg",
    "2-9 c: ccccccccc",
];
var getCountValidPasswords = function (input) {
    var count = 0;
    var _loop_1 = function (i) {
        var elements = input[i].split(" ");
        var range = elements[0].split("-").map(function (string) { return Number(string); });
        var target = elements[1].replace(":", "");
        var string = elements[2];
        var targetCount = __spreadArrays(string).reduce(function (prev, current) { return current === target ? prev + 1 : prev; }, 0);
        if (targetCount >= range[0] && targetCount <= range[1]) {
            count++;
        }
    };
    for (var i = 0; i < input.length; i++) {
        _loop_1(i);
    }
    return count;
};
console.log(getCountValidPasswords(testInput));
console.log(getCountValidPasswords(input));
var getCountValidPasswordsPart2 = function (input) {
    var count = 0;
    var _loop_2 = function (i) {
        var elements = input[i].split(" ");
        var positions = elements[0].split("-").map(function (string) { return Number(string); });
        var target = elements[1].replace(":", "");
        var string = elements[2];
        var positionsWithTarget = positions.reduce(function (prev, current) { return string[current - 1] === target ? prev + 1 : prev; }, 0);
        if (positionsWithTarget === 1) {
            count++;
        }
    };
    for (var i = 0; i < input.length; i++) {
        _loop_2(i);
    }
    return count;
};
console.log(getCountValidPasswordsPart2(testInput));
console.log(getCountValidPasswordsPart2(input));
