// const realInput: number[] = document.body.innerText
//   .trim()
//   .split("\n")
//   .map((string) => +string);
var testInput = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];
var getTotalCountIncreases = function (input) {
    return input.reduce(function (countIncreases, currentValue, index) {
        var previousValue = input[index - 1];
        if (typeof previousValue === "undefined") {
            return countIncreases;
        }
        if (currentValue > previousValue) {
            return countIncreases + 1;
        }
        return countIncreases;
    }, 0);
};
console.log("Total Increases for input", getTotalCountIncreases(testInput));
var isNumberArray = function (array) {
    return array.every(function (el) { return typeof el === "number"; });
};
var getTotalWindowCountIncreases = function (input) {
    return input.reduce(function (countIncreases, _, index) {
        var currentWindow = [input[index], input[index + 1], input[index + 2]];
        var nextWindow = [input[index + 1], input[index + 2], input[index + 3]];
        if (!isNumberArray(currentWindow) || !isNumberArray(nextWindow)) {
            // stop if either window has undefined elements
            return countIncreases;
        }
        var currentWindowTotal = currentWindow.reduce(function (acc, val) { return acc + val; }, 0);
        var nextWindowTotal = nextWindow.reduce(function (acc, val) { return acc + val; }, 0);
        if (nextWindowTotal > currentWindowTotal) {
            return countIncreases + 1;
        }
        return countIncreases;
    }, 0);
};
console.log("Total window increases for input", getTotalWindowCountIncreases(testInput));
