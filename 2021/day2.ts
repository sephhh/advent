type Position = [horizontal: number, depth: number];

const testInput = `
forward 5
down 5
forward 8
up 3
down 8
forward 2
`;
const documentText =
  typeof document === "undefined" ? testInput : document.body.innerText;
const directionInput: string[] = documentText.trim().split("\n");

const move = (position: Position, command: string): Position => {
  const [direction, numString] = command.split(" ");
  if (direction === undefined || numString === undefined) {
    throw new Error("invalid command");
  }
  const num: number = +numString;
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

const solve = (input: string[]) => {
  let position: Position = [0, 0];
  input.forEach((command) => (position = move(position, command)));
  return position[0] * position[1];
};

console.log("PART 1: ", solve(directionInput));

type PositionWithAim = [horizontal: number, depth: number, aim: number];

const moveP2 = (
  position: PositionWithAim,
  command: string
): PositionWithAim => {
  const [direction, numString] = command.split(" ");
  if (direction === undefined || numString === undefined) {
    throw new Error("invalid command");
  }
  const num: number = +numString;
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

const solveP2 = (input: string[]) => {
  let position: PositionWithAim = [0, 0, 0];
  input.forEach((command) => (position = moveP2(position, command)));
  console.log("end position", position);
  return position[0] * position[1];
};

console.log("PART 2: ", solveP2(directionInput));
