type Coordinates = [number, number];
type Direction = "N" | "S" | "E" | "W";

const executeInstruction2 = (instruction: string, shipCoords:Coordinates, waypointOffsetCoords: Coordinates) => {
    const instructionType = instruction[0];
    const instructionValue = Number(instruction.slice(1));
    switch (instructionType) {
        case "R":
            waypointOffsetCoords = swingWaypointRight(instructionValue, waypointOffsetCoords);
            break;
        case "L":
            waypointOffsetCoords = swingWaypointRight(-instructionValue, waypointOffsetCoords);
            break;
        case "F":
            const xDelta = waypointOffsetCoords[0];
            const yDelta = waypointOffsetCoords[1];
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

    return {shipCoords, waypointOffsetCoords};
}

const swingWaypointRight = (angle: number, waypointOffsetCoords: Coordinates):Coordinates => {
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

const walkAndFindDistance2 = (input: string[]) => {
    let shipCoords: Coordinates = [0, 0];
    let waypointOffsetCoords: Coordinates = [10, 1];
    for (let i = 0; i < input.length; i++) {

        let next = executeInstruction2(input[i], shipCoords, waypointOffsetCoords);
        shipCoords = next.shipCoords;
        waypointOffsetCoords = next.waypointOffsetCoords;
    }
    return Math.abs(shipCoords[0]) + Math.abs(shipCoords[1]);
}


const testInput = [
    "F10","N3","F7","R90","F11"
];

console.log(walkAndFindDistance2(testInput));
console.log(walkAndFindDistance2(document.body.innerText.trim().split("\n")));
