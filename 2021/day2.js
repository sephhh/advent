var testInput = "\nforward 5\ndown 5\nforward 8\nup 3\ndown 8\nforward 2\n";
var documentText = typeof document === "undefined" ? testInput : document.body.innerText;
var directionInput = documentText.trim().split("\n");
var move = function (position, command) {
    var _a = command.split(" "), direction = _a[0], numString = _a[1];
    if (direction === undefined || numString === undefined) {
        throw new Error("invalid command");
    }
    var num = +numString;
    switch (direction) {
        case "forward":
            return [position[0] + num, position[1]];
        case "up":
            return [position[0], position[1] - num];
        case "down":
            return [position[0], position[1] + num];
        default:
            throw new Error("invalid command");
    }
};
var solve = function (input) {
    var position = [0, 0];
    input.forEach(function (command) { return (position = move(position, command)); });
    return position[0] * position[1];
};
console.log("PART 1: ", solve(directionInput));
var moveP2 = function (position, command) {
    var _a = command.split(" "), direction = _a[0], numString = _a[1];
    if (direction === undefined || numString === undefined) {
        throw new Error("invalid command");
    }
    var num = +numString;
    switch (direction) {
        case "forward":
            return [position[0] + num, position[1] + num * position[2], position[2]];
        case "up":
            return [position[0], position[1], position[2] - num];
        case "down":
            return [position[0], position[1], position[2] + num];
        default:
            throw new Error("invalid command");
    }
};
var solveP2 = function (input) {
    var position = [0, 0, 0];
    input.forEach(function (command) { return (position = moveP2(position, command)); });
    console.log("end position", position);
    return position[0] * position[1];
};
console.log("PART 2: ", solveP2(directionInput));
