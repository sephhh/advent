const findEarliestBus = (targetTime: number, busIds: number[]) => {
    let earliestBus: number;
    let lowestDiff: number;
    for (let i = 0; i < busIds.length; i++) {
        const busId = busIds[i];
        const multiplier = Math.ceil(targetTime / busId);
        const diff = (multiplier * busId) - targetTime;
        if (typeof (lowestDiff) === "undefined" || diff < lowestDiff) {
            lowestDiff = diff;
            earliestBus = busId;
        }
    }
    return earliestBus;
}

const testInput = `
939
7,13,x,x,59,x,31,19
`;

const realInput = `
1008832
23,x,x,x,x,x,x,x,x,x,x,x,x,41,x,x,x,x,x,x,x,x,x,449,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,13,19,x,x,x,x,x,x,x,x,x,29,x,991,x,x,x,x,x,37,x,x,x,x,x,x,x,x,x,x,17
`;

const solvePart1 = (input:string) => {
    const [targetTimeString, busIdString] = input.trim().split("\n");
    const targetTime = Number(targetTimeString);
    const busIds: number[] = busIdString.split(",").filter((busId) => busId != "x").map((str) => Number(str));
    const earliestBus = findEarliestBus(targetTime, busIds);
    const waitTime = (Math.ceil(targetTime / earliestBus) * earliestBus) - targetTime;
    return waitTime * earliestBus;
}

// console.log(solvePart1(testInput));
// console.log(solvePart1(realInput));

type Requirement = {
    offset: number,
    multiplier: number
}

const buildOffsetRequirements = (busIds: string[]) => {
    const requirements: Requirement[] = [];
    for (let i = 0; i < busIds.length; i++) {
        const id = busIds[i];
        if (id !== "x") {
            requirements.push({
                offset: i,
                multiplier: Number(id)
            })
        }
    }
    requirements.sort((a, b) => a.multiplier > b.multiplier ? -1 : 1);
    return requirements;
}

const getBusIdsFromInput = (input: string): string[] => input.trim().split("\n")[1].split(",");

const solvePart2BruteForceWithManualSlightOptimization = (input: string) => {
    const requirements = buildOffsetRequirements(getBusIdsFromInput(input));
    let iterations = 0;
    let step = (23 * 449); // manual optimization for my particular input, since solution % 23 = 0, and solution % 449 = 23
    // let solutionTime = step - 23; // if you start here it only takes 62490415883 iterations to get to the answer!!!
    let solutionTime = 516350000010304;
    console.log("solution time", solutionTime);
    while (iterations < 15000000000) {
        if (doesTimeMeetAllRequirements(solutionTime, requirements)) {
            console.log("GOT IT", solutionTime);
            break;
        }
        solutionTime += step;
        iterations++;
    }
    console.log("solution time", solutionTime);
    console.log("iterations", iterations);
    return solutionTime;
}


const doesTimeMeetAllRequirements = (time: number, reqs: Requirement[]): boolean => {
    return reqs.every((req: Requirement) => {
        return (time + req.offset) % req.multiplier === 0;
    });
}

const  mod = (value: number, modulo: number) => {
    return ((value % modulo) + modulo) % modulo;
}

const solvePart2InOptimalWayThatIStillDontReallyUnderstandTheMathOf = (input) => {
    const requirements = buildOffsetRequirements(getBusIdsFromInput(input));

    let index = 0;
    let result = mod(-1 * requirements[0].offset, requirements[0].multiplier);
    let complete = requirements[0].multiplier;
    while (index < requirements.length - 1) {
        const next = requirements[index + 1];
        if (mod(result, next.multiplier) === mod(next.multiplier - next.offset, next.multiplier)) {
            complete *= next.multiplier;
            index += 1;
        } else {
            result += complete;
        }
    }

    return result;
}

const testInput2 = `
asdf
17,x,13,19
`;

const testInput3 = `
asdf
67,7,59,61
`;

const testInput4 = `
asdf
x,3,x,x,5,x,7
`;

console.log(solvePart2InOptimalWayThatIStillDontReallyUnderstandTheMathOf(realInput));

