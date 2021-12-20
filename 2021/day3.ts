const testInputDay32021 = `
00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010
`;

const documentTextDay32021 =
    typeof document === "undefined"
        ? testInputDay32021
        : document.body.innerText;

const binaryStrings: string[] = documentTextDay32021.trim().split("\n");

const calculateGammaAndEpsilon = (
    binaryStrings: string[]
): [gamma: string, epsilon: string] => {
    let gamma = "";
    let epsilon = "";
    const stringLength = binaryStrings[0]?.length ?? 0;
    const numStrings = binaryStrings.length;
    for (let i = 0; i < stringLength; i++) {
        let countOnes = 0;
        for (let j = 0; j < numStrings; j++) {
            const bit = binaryStrings?.[j]?.[i];
            if (typeof bit === "undefined") {
                throw new Error("invalid input");
            }
            if (bit === "1") {
                countOnes++;
            }
        }
        if (countOnes > numStrings / 2) {
            gamma = gamma + "1";
            epsilon = epsilon + "0";
        } else {
            gamma = gamma + "0";
            epsilon = epsilon + "1";
        }
    }
    return [gamma, epsilon];
};

const solveDay32021P1 = (binaryStrings: string[]) => {
    const [gamma, epsilon] = calculateGammaAndEpsilon(binaryStrings);
    console.log("gamma", gamma, "epsilon", epsilon);
    console.log("solution", parseInt(gamma, 2) * parseInt(epsilon, 2));
};

solveDay32021P1(binaryStrings);

const filterStringsByCharAtPosition = (
    strings: string[],
    targetChar: string,
    position: number
) => strings.filter((string) => string[position] === targetChar);

const findMostCommonBitInPosition = (strings: string[], position: number) => {
    let countOnes = 0;
    let countZeroes = 0;
    strings.forEach((string) => {
        if (string[position] === "1") {
            countOnes++;
        } else {
            countZeroes++;
        }
    });
    if (countZeroes > countOnes) {
        return "0";
    }
    return "1";
};

const findLeastCommonBitInPosition = (strings: string[], position: number) => {
    let countOnes = 0;
    let countZeroes = 0;
    strings.forEach((string) => {
        if (string[position] === "1") {
            countOnes++;
        } else {
            countZeroes++;
        }
    });
    if (countZeroes <= countOnes) {
        return "0";
    }
    return "1";
};

const calculateOxygenRating = (
    binaryStrings: string[],
    position = 0
): string => {
    console.log("oxygen length", binaryStrings.length);
    if (binaryStrings.length === 0) {
        throw new Error();
    }
    if (binaryStrings.length === 1) {
        return binaryStrings[0] ?? "ERROR";
    }

    const mostCommonAtPosition = findMostCommonBitInPosition(
        binaryStrings,
        position
    );
    return calculateOxygenRating(
        filterStringsByCharAtPosition(
            binaryStrings,
            mostCommonAtPosition,
            position
        ),
        position + 1
    );
};

const calculateCo2Rating = (binaryStrings: string[], position = 0): string => {
    console.log("co2 length", binaryStrings.length);
    if (binaryStrings.length === 0) {
        throw new Error();
    }
    if (binaryStrings.length === 1) {
        return binaryStrings[0] ?? "ERROR";
    }
    const leastCommon = findLeastCommonBitInPosition(binaryStrings, position);
    return calculateCo2Rating(
        filterStringsByCharAtPosition(binaryStrings, leastCommon, position),
        position + 1
    );
};

const solveDay32021P2 = (binaryStrings: string[]) => {
    const oxygenRating = calculateOxygenRating(binaryStrings);
    const co2Rating = calculateCo2Rating(binaryStrings);
    console.log("oxygenRating", oxygenRating, "co2Rating", co2Rating);
    console.log("solution", parseInt(oxygenRating, 2) * parseInt(co2Rating, 2));
};

solveDay32021P2(binaryStrings);
