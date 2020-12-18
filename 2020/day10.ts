const testInput = [
    28,
    33,
    18,
    42,
    31,
    14,
    46,
    20,
    48,
    47,
    24,
    23,
    49,
    45,
    19,
    38,
    39,
    11,
    1,
    32,
    25,
    35,
    8,
    17,
    7,
    9,
    4,
    2,
    34,
    10,
    3,
];

const input = document.body.innerText.trim().split("\n").map((stringNum) => Number(stringNum));


const getSortedArray = (array: number[]) => [...array].sort((a, b) => a > b ? 1 : -1);

const findDifferencesMultiplied = (input: number[]) => {
    const sortedInput = getSortedArray(input);
    console.log("sortedInput", sortedInput);
    const diffCounts = {};
    for (let i = 0; i < sortedInput.length; i++) {
        const diff = sortedInput[i] - (sortedInput[i - 1] ?? 0);
        const diffKey = `${diff}`;
        diffCounts[diffKey] = (diffCounts[diffKey] || 0)  + 1;
    }
    console.log(diffCounts);
    return diffCounts["1"] * (diffCounts["3"] + 1);
}


console.log(findDifferencesMultiplied(testInput));
console.log(findDifferencesMultiplied(input));


const findNumCombinationsForRunLength = (lengthOfRun: number) => {
    
    if (lengthOfRun <= 2) {
        return 1;
    }
    if (lengthOfRun === 3) {
        return 2;
    }
    if (lengthOfRun === 4) {
        return 4;
    }
    if (lengthOfRun === 5) {
        return 7;
    }
    console.log("DUNNO BUDDY", lengthOfRun);
    return 1;
}

const findRunLengths = (input: number[]) => {
    const sortedInputWithAdaptor = getSortedArray(input);
    sortedInputWithAdaptor.push(sortedInputWithAdaptor[sortedInputWithAdaptor.length -1] + 3);
    console.log("sortedWithAdaptor", sortedInputWithAdaptor);

    let currentRun = 1;
    const runLengths = [];
    for (let i = 0; i < sortedInputWithAdaptor.length; i++) {
        const previousNum = sortedInputWithAdaptor[i - 1] ?? 0;
        if (sortedInputWithAdaptor[i] === previousNum + 1) {
            currentRun += 1;
        } else {
            if (currentRun > 2) {
                runLengths.push(currentRun);
            }
            currentRun = 1;
        }
    }
    if (currentRun > 1) {
        runLengths.push(currentRun);
    }
    return runLengths;
}

const getTotalConnectionCombos = (input: number[]) => {
    return findRunLengths(input).reduce((carry, next) => {
        const combosForRunLength = findNumCombinationsForRunLength(next);
        console.log("combos multiplying", combosForRunLength);
        return combosForRunLength * carry;
    }, 1)
}
console.log(getTotalConnectionCombos(testInput));
console.log(getTotalConnectionCombos(input));

