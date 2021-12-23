const testInputDay62021 = `
3,4,3,1,2
`;

const documentTextDay62021 =
    typeof document === "undefined"
        ? testInputDay62021
        : document.body.innerText;

const parseInputDay62021 = (input: string): number[] =>
    input
        .trim()
        .split(",")
        .map((str) => +str);

const birthAndTick = (fishState: number[]) => {
    const newFishState: number[] = [];
    fishState.forEach((num) => {
        if (num <= 0) {
            newFishState.push(6); // reset
            newFishState.push(8); // new born
        } else {
            newFishState.push(num - 1);
        }
    });
    return newFishState;
};

const solveDay62021P1 = (input: string, numDays: number) => {
    let fishState = parseInputDay62021(input);
    for (let i = 0; i < numDays; i++) {
        fishState = birthAndTick(fishState);
    }
    console.log("ANSWER", fishState.length);
};

solveDay62021P1(documentTextDay62021, 80);

const CACHE: Record<string, number> = {};
const USAGE: Record<string, number> = {};
const getEventualCount = (
    fishState: number,
    numDays: number,
    count = 1
): number => {
    const hash = "fishState-" + fishState + "-numDays-" + numDays;
    const cachedCount = CACHE[hash];
    if (typeof cachedCount !== "undefined") {
        let usageCount = USAGE[hash] ?? 0;
        usageCount++;
        USAGE[hash] = usageCount;
        return cachedCount;
    }
    let eventualCount: number;
    if (numDays === 0) {
        eventualCount = count;
    } else if (fishState === 0) {
        eventualCount =
            getEventualCount(6, numDays - 1, count) +
            getEventualCount(8, numDays - 1, count);
    } else {
        eventualCount = getEventualCount(fishState - 1, numDays - 1, count);
    }

    CACHE[hash] = eventualCount;

    return eventualCount;
};

const solveDay62021P2 = (input: string, numDays: number) => {
    const fishState = parseInputDay62021(input);
    let totalFish = 0;
    fishState.forEach(
        (fishState) => (totalFish += getEventualCount(fishState, numDays))
    );
    console.log("ANSWER", totalFish);
};

solveDay62021P2(documentTextDay62021, 256);
