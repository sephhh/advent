const testInputDay82021 = `
be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce
`;

const documentTextDay82021 =
    typeof document === "undefined"
        ? testInputDay82021
        : document.body.innerText;

const parseLineDay82021 = (line: string) => {
    const [rawPatterns, rawCode] = line.split(" | ");
    if (!rawPatterns || !rawCode) {
        throw new Error("invalid line");
    }
    const patterns = rawPatterns.split(" ");
    const code = rawCode.split(" ");
    return [patterns, code];
};

const strToArray = (str: unknown): string[] => {
    if (typeof str !== "string") {
        throw new Error("cant do it");
    }
    return str.split("");
};

type SignalCodex = Record<string, string>;

function arraySubtraction<T>(array1: Array<T>, array2: Array<T>): Array<T> {
    const newArray: Array<T> = [];
    array1.forEach((el) => {
        if (!array2.includes(el)) {
            newArray.push(el);
        }
    });
    array2.forEach((el) => {
        if (!array1.includes(el)) {
            newArray.push(el);
        }
    });
    return newArray;
}

const deduceLookupFromPatterns = (patterns: string[]) => {
    const signalCodex: SignalCodex = {};
    const sevenSignals = strToArray(patterns.find((str) => str.length === 3));
    const oneSignals = strToArray(patterns.find((str) => str.length === 2));
    const aSignal = sevenSignals.find((str) => !oneSignals.includes(str));
    if (!aSignal) {
        throw new Error("unable to deduce A signal");
    }
    signalCodex[aSignal] = "a";

    const zeroSixAndNineSignals = patterns.filter((str) => str.length === 6);
    const cSignal = oneSignals.find((char) =>
        zeroSixAndNineSignals.some((string) => string.indexOf(char) === -1)
    );

    if (!cSignal) {
        throw new Error("unable to deduce C signal");
    }

    signalCodex[cSignal] = "c";

    const fSignal = oneSignals.find((char) => char != cSignal);

    if (!fSignal) {
        throw new Error("unable to deduce F signal");
    }

    signalCodex[fSignal] = "f";

    const threeSignals = strToArray(
        patterns
            .filter((str) => str.length === 5)
            .find(
                (str) =>
                    str.includes(aSignal) &&
                    str.includes(cSignal) &&
                    str.includes(fSignal)
            )
    );
    const fourSignals = strToArray(patterns.find((str) => str.length === 4));

    const threeSignalsMinusSevenSignals = arraySubtraction(
        threeSignals,
        sevenSignals
    );
    const dSignal = threeSignalsMinusSevenSignals.find((char) =>
        fourSignals.includes(char)
    );

    if (!dSignal) {
        throw new Error("unable to deduce D signal");
    }

    signalCodex[dSignal] = "d";

    const bSignal = arraySubtraction(fourSignals, [
        cSignal,
        dSignal,
        fSignal,
    ])[0];

    if (!bSignal) {
        throw new Error("unable to deduce B signal");
    }

    signalCodex[bSignal] = "b";

    const gSignal = arraySubtraction(threeSignals, [
        aSignal,
        cSignal,
        dSignal,
        fSignal,
    ])[0];

    if (!gSignal) {
        throw new Error("unable to deduce G signal");
    }

    signalCodex[gSignal] = "g";

    const eightSignal = strToArray(patterns.find((str) => str.length === 7));
    const eSignal = arraySubtraction(eightSignal, [
        aSignal,
        bSignal,
        cSignal,
        dSignal,
        fSignal,
        gSignal,
    ])[0];

    if (!eSignal) {
        throw new Error("unable to deduce E signal");
    }

    signalCodex[eSignal] = "e";

    return signalCodex;
};

const DECODED_NUMBER_LOOKUP = {
    abcefg: 0,
    cf: 1,
    acdeg: 2,
    acdfg: 3,
    bcdf: 4,
    abdfg: 5,
    abdefg: 6,
    acf: 7,
    abcdefg: 8,
    abcdfg: 9,
} as const;

function isNumberKey(key: string): key is keyof typeof DECODED_NUMBER_LOOKUP {
    return key in DECODED_NUMBER_LOOKUP;
}

// 1 => --c--f- => 2
// 7 => a-c--f- => 3
// 4 => -bcd-f- => 4
// 2 => a-cde-g => 5
// 3 => a-cd-fg => 5
// 5 => ab-d-fg => 5
// 6 => ab-defg => 6
// 0 => abc-efg => 6
// 9 => abcd-fg => 6
// 8 => abcdefg => 7

const decode = (code: unknown, signalLookup: SignalCodex): number => {
    const codeLetters = strToArray(code);
    const decodedLetters = codeLetters.map((char) => signalLookup[char]);
    const decodedNumberKey = decodedLetters.sort().join("");
    if (isNumberKey(decodedNumberKey)) {
        return DECODED_NUMBER_LOOKUP[decodedNumberKey];
    }
    throw new Error("failed to decode, number not found");
};
const solveDay82021P1 = (input: string) => {
    const uniqueNumbers = new Set([1, 4, 7, 8]);
    let uniqueNumberCount = 0;
    const lines = input.trim().split("\n");
    lines.forEach((line) => {
        const [patterns, codes] = parseLineDay82021(line);
        if (!patterns || !codes) {
            throw new Error("invalid input");
        }
        const signalLookup = deduceLookupFromPatterns(patterns);
        codes.forEach((code) => {
            const number = decode(code, signalLookup);
            if (uniqueNumbers.has(number)) {
                uniqueNumberCount++;
            }
        });
    });
    console.log("PART 1 answer", uniqueNumberCount);
};

solveDay82021P1(documentTextDay82021);

const solveDay82021P2 = (input: string) => {
    let codeSum = 0;
    const lines = input.trim().split("\n");
    lines.forEach((line) => {
        const [patterns, codes] = parseLineDay82021(line);
        if (!patterns || !codes) {
            throw new Error("invalid input");
        }
        const signalLookup = deduceLookupFromPatterns(patterns);
        const codeNumbers = codes.map((code) => decode(code, signalLookup));
        const jointCodeNumber = Number(codeNumbers.join(""));
        console.log("decoded line", jointCodeNumber);
        codeSum += jointCodeNumber;
    });
    console.log("PART 2 answer", codeSum);
};

solveDay82021P2(documentTextDay82021);
