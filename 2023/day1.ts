import { getDocumentRows } from "./util/getDocumentRows";

const printCalibrationSum = (input: string[]) => {
    const sum = input.reduce((carry: number, currentString: string) => {
        const firstNumber = currentString.match(/\d/g)?.shift();
        const lastNumber = currentString.match(/\d/g)?.pop();
        const calibration = +`${firstNumber}${lastNumber}`;
        // console.log("calibration", calibration);
        return carry + calibration;
    }, 0);
    console.log("sum: ", sum);
};
const realInput = getDocumentRows("2023/day1.txt");
const testInput: string[] = [
    "1abc2",
    "pqr3stu8vwx",
    "a1b2c3d4e5f",
    "treb7uchet",
];

// printCalibrationSum(testInput);

// printCalibrationSum(realInput);

const spelledNumberRegex = /\d|one|two|three|four|five|six|seven|eight|nine/g;
const getNumberFromCharOrNumberWord = (string: unknown): number => {
    switch (string) {
        case "one":
            return 1;
        case "two":
            return 2;
        case "three":
            return 3;
        case "four":
            return 4;
        case "five":
            return 5;
        case "six":
            return 6;
        case "seven":
            return 7;
        case "eight":
            return 8;
        case "nine":
            return 9;
        // case "zero":
        // return 0;
        default:
            return Number(string);
    }
};
const printCalibrationSum2 = (input: string[]) => {
    const sum = input.reduce((carry: number, currentString: string) => {
        const currentStringWithoutOverlaps = currentString
            .replace(/one/g, "o one")
            .replace(/eight/g, "e eight")
            .replace(/nine/g, "n nine")
            .replace(/three/g, "t three")
            .replace(/two/g, "t two");
        const match = currentStringWithoutOverlaps.match(spelledNumberRegex);
        const firstNumberString = match?.shift();
        const lastNumberString = match?.pop() ?? firstNumberString;
        const firstNumber = getNumberFromCharOrNumberWord(firstNumberString);
        const lastNumber = getNumberFromCharOrNumberWord(lastNumberString);
        const calibration = firstNumber * 10 + lastNumber;
        return carry + calibration;
    }, 0);
    console.log("sum: ", sum);
};
const testInput2 = [
    "two1nine",
    "eightwothree",
    "abcone2threexyz",
    "xtwone3four",
    "4nineeightseven2",
    "zoneight234",
    "7pqrstsixteen",
];

printCalibrationSum(testInput);
printCalibrationSum2(testInput2);

printCalibrationSum(realInput);
printCalibrationSum2(realInput);

export default {};
