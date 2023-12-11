import { getDocumentRows, getInputRows } from "./util/getDocumentRows";
import { assertInputDefined } from "./util/assertInputDefined";

const testInput = `
Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
`;

const printWinningPoints = (inputRows: string[]) => {
    let winningPoints = 0;
    inputRows.forEach((row) => {
        let rowWinningPoints = 0;

        const numbers = row.split(":")[1]?.trim();
        assertInputDefined(numbers);

        const [winningNumbers, myNumbers] = numbers
            .split(" | ")
            .map((str) => str.split(/\s+/).map((str2) => +str2.trim()));

        assertInputDefined(winningNumbers);
        assertInputDefined(myNumbers);

        const totalNumberCount =
            new Set(winningNumbers).size + new Set(myNumbers).size;
        console.log("counts", winningNumbers.length, myNumbers.length);
        const nonOverlappingNumberCount = new Set([
            ...winningNumbers,
            ...myNumbers,
        ]).size;
        const myWinningNumberCount =
            totalNumberCount - nonOverlappingNumberCount;
        if (myWinningNumberCount > 0) {
            rowWinningPoints = Math.pow(2, myWinningNumberCount - 1);
        }
        console.log("rowWinningPoints", myWinningNumberCount, rowWinningPoints);
        winningPoints += rowWinningPoints;
    });
    console.log("total winning points", winningPoints);
};

printWinningPoints(getInputRows(testInput));

printWinningPoints(getDocumentRows("2023/day4.txt"));
