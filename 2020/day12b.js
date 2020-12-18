var executeInstruction2 = function (instruction, shipCoords, waypointOffsetCoords) {
    var instructionType = instruction[0];
    var instructionValue = Number(instruction.slice(1));
    switch (instructionType) {
        case "R":
            waypointOffsetCoords = swingWaypointRight(instructionValue, waypointOffsetCoords);
            break;
        case "L":
            waypointOffsetCoords = swingWaypointRight(-instructionValue, waypointOffsetCoords);
            break;
        case "F":
            var xDelta = waypointOffsetCoords[0];
            var yDelta = waypointOffsetCoords[1];
            shipCoords[0] += xDelta * instructionValue;
            shipCoords[1] += yDelta * instructionValue;
            break;
        case "N":
            waypointOffsetCoords[1] += instructionValue;
            break;
        case "S":
            waypointOffsetCoords[1] -= instructionValue;
            break;
        case "E":
            waypointOffsetCoords[0] += instructionValue;
            break;
        case "W":
            waypointOffsetCoords[0] -= instructionValue;
            break;
        default:
            break;
    }
    return { shipCoords: shipCoords, waypointOffsetCoords: waypointOffsetCoords };
};
var swingWaypointRight = function (angle, waypointOffsetCoords) {
    switch (angle) {
        case 90:
        case -270:
            return [waypointOffsetCoords[1], -waypointOffsetCoords[0]];
        case 180:
        case -180:
            return [-waypointOffsetCoords[0], -waypointOffsetCoords[1]];
        case -90:
        case 270:
            return [-waypointOffsetCoords[1], waypointOffsetCoords[0]];
        default:
            throw Error("unable to parse instruction");
            break;
    }
};
var walkAndFindDistance2 = function (input) {
    var shipCoords = [0, 0];
    var waypointOffsetCoords = [10, 1];
    for (var i = 0; i < input.length; i++) {
        var next = executeInstruction2(input[i], shipCoords, waypointOffsetCoords);
        shipCoords = next.shipCoords;
        waypointOffsetCoords = next.waypointOffsetCoords;
    }
    return Math.abs(shipCoords[0]) + Math.abs(shipCoords[1]);
};
var testInput = [
    "F10", "N3", "F7", "R90", "F11"
];
console.log(walkAndFindDistance2(testInput));
console.log(walkAndFindDistance2(document.body.innerText.trim().split("\n")));
