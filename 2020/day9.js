var testInput = [
    35,
    20,
    15,
    25,
    47,
    40,
    62,
    55,
    65,
    95,
    102,
    117,
    150,
    182,
    127,
    219,
    299,
    277,
    309,
    576
];
var input = document.body.innerText.trim().split("\n").map(function (stringNum) { return Number(stringNum); });
var BUFFER_LENGTH = 25;
var findInvalidInStream = function (input, bufferLength) {
    if (bufferLength === void 0) { bufferLength = BUFFER_LENGTH; }
    var bufferArray = [];
    for (var i = 0; i < input.length; i++) {
        var num = input[i];
        if (bufferArray.length === bufferLength) {
            if (!canSumToNum(bufferArray, num)) {
                console.log("FOUND THE NUM", num);
                return num;
            }
        }
        bufferArray.push(num);
        if (bufferArray.length > bufferLength) {
            bufferArray.shift();
        }
    }
};
var canSumToNum = function (bufferArray, targetSum) {
    var sumMatchLookup = {};
    for (var i = 0; i < bufferArray.length; i++) {
        var num = bufferArray[i];
        if (sumMatchLookup["" + (targetSum - num)]) {
            return true;
        }
        sumMatchLookup["" + num] = true;
    }
    return false;
};
findInvalidInStream(testInput, 5);
findInvalidInStream(input);
var sumOfSmallestAndLargest = function (array) {
    var smallest, largest;
    array.forEach(function (value) {
        if (smallest === undefined || value < smallest) {
            smallest = value;
        }
        if (largest === undefined || value > largest) {
            largest = value;
        }
    });
    return smallest + largest;
};
var findRangeSummingToInvalidInStream = function (input, bufferLength) {
    if (bufferLength === void 0) { bufferLength = BUFFER_LENGTH; }
    var target = findInvalidInStream(input, bufferLength);
    var sum = 0;
    var sumBuffer = [];
    for (var i = 0; i < input.length; i++) {
        var num = input[i];
        if (num === target) {
            sum = 0;
            sumBuffer = [];
            continue;
        }
        sum += num;
        sumBuffer.push(num);
        while (sum > target) {
            sum -= sumBuffer[0];
            sumBuffer.shift();
        }
        if (sum === target) {
            console.log("SUMMM", sumBuffer);
            return sumOfSmallestAndLargest(sumBuffer);
        }
    }
    console.log("didn't find it eh??");
};
findRangeSummingToInvalidInStream(testInput, 5);
findRangeSummingToInvalidInStream(input);
