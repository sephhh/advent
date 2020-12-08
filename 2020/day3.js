var testInput = [
    "..##.......",
    "#...#...#..",
    ".#....#..#.",
    "..#.#...#.#",
    ".#...##..#.",
    "..#.##.....",
    ".#.#.#....#",
    ".#........#",
    "#.##...#...",
    "#...##....#",
    ".#..#...#.#",
];
var input = document.body.innerText.trim().split("\n");
var SLOPE = [1, 3];
var calculateTreesHit = function (input, slope) {
    var count = 0;
    var pos = [0, 0];
    var slopeX = slope[0], slopeY = slope[1];
    var width = input[0].length;
    while (true) {
        if (!input[pos[0]]) {
            break;
        }
        if (input[pos[0]][pos[1]] === "#") {
            count++;
        }
        pos[0] += slopeX;
        pos[1] = (pos[1] + slopeY) % width;
    }
    console.log("done", slope, count);
    return count;
};
console.log(calculateTreesHit(input, [1, 3]));
console.log(calculateTreesHit(input, [1, 3]));
var calculateForManySlopes = function (input, slopes) {
    var total = 1;
    return slopes.reduce(function (previousTotal, slope) {
        return previousTotal * calculateTreesHit(input, slope);
    }, total);
};
var SLOPES = [
    [1, 1],
    [1, 3],
    [1, 5],
    [1, 7],
    [2, 1],
];
console.log(calculateForManySlopes(testInput, SLOPES));
console.log(calculateForManySlopes(input, SLOPES));
