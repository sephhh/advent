type Coordinates = [number, number];
type Direction = "N" | "S" | "E" | "W";

const executeInstruction = (instruction: string, coords:Coordinates, direction: Direction) => {
    const instructionType = instruction[0];
    const instructionValue = Number(instruction.slice(1));
    switch (instructionType) {
        case "R":
            direction = turnRight(instructionValue, direction);
            break;
        case "L":
            direction = turnRight(-instructionValue, direction);
            break;
        case "F":
            return executeInstruction(`${direction}${instructionValue}`, coords, direction);
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

    return {coords, direction};
}

const turnRight = (angle: number, prevDirection: Direction):Direction => {
    const directions = ["N", "E", "S", "W"];
    const offset = angle / 90;
    const prevDirIndex = directions.indexOf(prevDirection);
    let newDirIndex = prevDirIndex + offset;
    if (newDirIndex > 3) {
        newDirIndex -= 4;
    }
    if (newDirIndex < 0) {
        newDirIndex += 4;
    }
    const newDirection: Direction = directions[newDirIndex];
    return newDirection;
};

const walkAndFindDistance = (input: string[]) :number => {
    let coords: Coordinates = [0, 0];
    let direction: Direction = "E";
    for (let i = 0; i < input.length; i++) {
        let next = executeInstruction(input[i], coords, direction);
        coords = next.coords;
        direction = next.direction;
    }
    return Math.abs(coords[0]) + Math.abs(coords[1]);
}


const testInput = [
    "F10","N3","F7","R90","F11"
];

console.log(walkAndFindDistance(testInput));
console.log(walkAndFindDistance(document.body.innerText.trim().split("\n")));
