const testInputDay72021 = `
16,1,2,0,4,2,7,1,2,14
`;

const documentTextDay72021 =
    typeof document === "undefined"
        ? testInputDay72021
        : document.body.innerText;

const parseInputDay72021 = (input: string): number[] =>
    input
        .trim()
        .split(",")
        .map((str) => +str);

const calculateFuelToMove = (target: number, positions: number[]) =>
    positions.reduce((sum, position) => sum + Math.abs(position - target), 0);

const bruteForce = (positions: number[]) => {
    const min = Math.min(...positions);
    const max = Math.max(...positions);
    let mostEfficientFuel: number | undefined;
    let mostEfficientFuelPosition: number;
    for (let i = min; i < max; i++) {
        const fuelCost = calculateFuelToMove(i, positions);
        if (typeof mostEfficientFuel === "undefined") {
            mostEfficientFuel = fuelCost;
            mostEfficientFuelPosition = i;
        } else if (fuelCost < mostEfficientFuel) {
            mostEfficientFuel = fuelCost;
            mostEfficientFuelPosition = i;
        }
    }
    return [mostEfficientFuel, mostEfficientFuelPosition];
};

const solveDay72021P1 = (input: string) => {
    const solution = bruteForce(parseInputDay72021(input));
    console.log("solution", solution);
};

solveDay72021P1(documentTextDay72021);

const sumSeries = (num: number) => {
    let sum = 0;
    for (let i = 1; i <= num; i++) {
        sum += i;
    }
    return sum;
};

const calculateFuelToMove2 = (target: number, positions: number[]) =>
    positions.reduce(
        (sum, position) => sum + sumSeries(Math.abs(position - target)),
        0
    );

const bruteForce2 = (positions: number[]) => {
    const min = Math.min(...positions);
    const max = Math.max(...positions);
    let mostEfficientFuel: number | undefined;
    let mostEfficientFuelPosition: number;
    for (let i = min; i < max; i++) {
        const fuelCost = calculateFuelToMove2(i, positions);
        if (typeof mostEfficientFuel === "undefined") {
            mostEfficientFuel = fuelCost;
            mostEfficientFuelPosition = i;
        } else if (fuelCost < mostEfficientFuel) {
            mostEfficientFuel = fuelCost;
            mostEfficientFuelPosition = i;
        }
    }
    return [mostEfficientFuel, mostEfficientFuelPosition];
};

const solveDay72021P2 = (input: string) => {
    const solution = bruteForce2(parseInputDay72021(input));
    console.log("solution", solution);
};

solveDay72021P2(documentTextDay72021);
