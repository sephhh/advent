var executeInstruction = function (instruction, coords, direction) {
    var instructionType = instruction[0];
    var instructionValue = Number(instruction.slice(1));
    switch (instructionType) {
        case "R":
            direction = turnRight(instructionValue, direction);
            break;
        case "L":
            direction = turnRight(-instructionValue, direction);
            break;
        case "F":
            return executeInstruction("" + direction + instructionValue, coords, direction);
        case "N":
            coords[1] += instructionValue;
            break;
        case "S":
            coords[1] -= instructionValue;
            break;
        case "E":
            coords[0] += instructionValue;
            break;
        case "W":
            coords[0] -= instructionValue;
            break;
        default:
            break;
    }
    return { coords: coords, direction: direction };
};
var turnRight = function (angle, prevDirection) {
    var directions = ["N", "E", "S", "W"];
    var offset = angle / 90;
    var prevDirIndex = directions.indexOf(prevDirection);
    var newDirIndex = prevDirIndex + offset;
    if (newDirIndex > 3) {
        newDirIndex = newDirIndex - 4;
    }
    if (newDirIndex < 0) {
        newDirIndex = 4 + newDirIndex;
    }
    if (!directions[newDirIndex]) {
        debugger;
    }
    var newDirection = directions[newDirIndex];
    return newDirection;
};
var walkAndFindDistance = function (input) {
    var coords = [0, 0];
    var direction = "E";
    for (var i = 0; i < input.length; i++) {
        var next = executeInstruction(input[i], coords, direction);
        coords = next.coords;
        direction = next.direction;
    }
    return Math.abs(coords[0]) + Math.abs(coords[1]);
};
var testInput = [
    "F10", "N3", "F7", "R90", "F11"
];
console.log(walkAndFindDistance(testInput));
console.log(walkAndFindDistance(document.body.innerText.trim().split("\n")));
