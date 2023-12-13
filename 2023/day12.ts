import { assertInputDefined } from "./util/assertInputDefined";
import { getDocumentRows, getInputRows } from "./util/getDocumentRows";

const testInput = `
???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1
`;

const parseRowString = (rowString: string) => {
    const [infoString, groupString] = rowString.split(" ");
    assertInputDefined(infoString);
    assertInputDefined(groupString);
    const groups = groupString.split(",").map(Number);
    // const info = infoString.split("");
    return { infoString, groups };
};

function calculateArrangements(inputRows: string[]) {
    let total = 0;
    inputRows.forEach((row) => {
        const { infoString, groups } = parseRowString(row);
        // console.log(infoString, groups);
        const countPerRow = countPermutationsPerRow(infoString, groups);
        // console.log("countPerRow", countPerRow);
        total += countPerRow;
    });
    console.log("total permutations", total);
}

function countPermutationsPerRow(infoString: string, groups: number[]) {
    let regexString = "^\\.*";
    regexString += groups.map((number) => `#{${number}}`).join("\\.+");
    regexString += "\\.*$";
    const regexp = new RegExp(regexString);
    // console.log("regexp", regexp);
    return testPermutations(infoString, regexp);
}

function testPermutations(string: string, regex: RegExp, count = 0): number {
    const hasAnyQuestionMarks = /\?/.test(string);
    if (!hasAnyQuestionMarks) {
        const doesItMatch = regex.test(string);
        // if (doesItMatch) {
        //     console.log("matching string", string);
        // } else {
        //     console.log("not matching", string);
        // }
        return doesItMatch ? count + 1 : count;
    }
    const newStringA = string.replace("?", ".");
    const newStringB = string.replace("?", "#");
    return (
        testPermutations(newStringA, regex, count) +
        testPermutations(newStringB, regex, count)
    );
}

calculateArrangements(getInputRows(testInput));
calculateArrangements(getDocumentRows("2023/day12.txt"));

function calculateArrangementsTimesFive(inputRows: string[]) {
    let total = 0;
    inputRows.forEach((row) => {
        const { infoString, groups } = parseRowString(row);
        const unfoldedInfoString =
            infoString +
            "?" +
            infoString +
            "?" +
            infoString +
            "?" +
            infoString +
            "?" +
            infoString;
        const unfoldedGroups = [
            ...groups,
            ...groups,
            ...groups,
            ...groups,
            ...groups,
        ];
        const totalPerRow = countPermutationsPerRow(
            unfoldedInfoString,
            unfoldedGroups
        );
        console.log("per row", unfoldedInfoString, totalPerRow);
        total += totalPerRow;
    });
    console.log("total permutations", total);
}
calculateArrangementsTimesFive(getInputRows(testInput));
