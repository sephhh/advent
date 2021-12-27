const testInputDay102021 = `
[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]
`;

const documentTextDay102021 =
    typeof document === "undefined"
        ? testInputDay102021
        : document.body.innerText;

const pointLookup = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137,
} as const;

const matchingCharLookup = {
    ")": "(",
    "]": "[",
    "}": "{",
    ">": "<",
    "(": ")",
    "[": "]",
    "{": "}",
    "<": ">",
} as const;

type ClosingBracketChar = ")" | "]" | "}" | ">";
type OpeningBracketChar = "(" | "[" | "{" | "<";
type BracketChar = OpeningBracketChar | ClosingBracketChar;

const isClosingBracketChar = (char: string): char is ClosingBracketChar =>
    [")", "]", "}", ">"].includes(char);

const isBracketChar = (char: string): char is BracketChar =>
    isClosingBracketChar(char) || ["(", "[", "{", "<"].includes(char);

const findCurruptChar = (line: BracketChar[]): ClosingBracketChar | null => {
    const openChars: BracketChar[] = [];
    return (
        (line.find((char) => {
            if (isClosingBracketChar(char)) {
                const mostRecentOpenChar = openChars.pop();
                const matchingOpenChar = matchingCharLookup[char];
                if (mostRecentOpenChar !== matchingOpenChar) {
                    return char;
                }
            } else {
                openChars.push(char);
            }
            return false;
        }) as ClosingBracketChar) ?? null
    );
};
const solveDay102021P1 = (input: string) => {
    let corruptCount = 0;
    input.split("\n").forEach((line: string) => {
        const corruptChar = findCurruptChar(
            line.split("").filter(isBracketChar)
        );
        if (corruptChar) {
            corruptCount += pointLookup[corruptChar] ?? 0;
        }
    });
    console.log("answer", corruptCount);
};

solveDay102021P1(documentTextDay102021);
const pointLookup2 = {
    ")": 1,
    "]": 2,
    "}": 3,
    ">": 4,
} as const;
const getCompletionPoints = (line: BracketChar[]): number => {
    let completionPoints = 0;
    const openChars: BracketChar[] = [];
    for (const char of line) {
        if (isClosingBracketChar(char)) {
            const mostRecentOpenChar = openChars.pop();
            const matchingOpenChar = matchingCharLookup[char];
            if (mostRecentOpenChar !== matchingOpenChar) {
                // corrupt, stop here
                return 0;
            }
        } else {
            openChars.push(char);
        }
    }
    openChars.reverse().forEach((char) => {
        const matchingChar = matchingCharLookup[char];
        if (!isClosingBracketChar(matchingChar)) {
            throw new Error("wrong kind of char");
        }
        completionPoints = completionPoints * 5 + pointLookup2[matchingChar];
    });
    return completionPoints;
};

const solveDay102021P2 = (input: string) => {
    const completionPointsArray: number[] = [];
    input.split("\n").forEach((line: string) => {
        const parsedLine = line.split("").filter(isBracketChar);
        const completionPoints = getCompletionPoints(parsedLine);
        if (completionPoints) {
            completionPointsArray.push(completionPoints);
        }
    });
    const middleValue = completionPointsArray.sort((a, b) => a - b)[
        Math.floor(completionPointsArray.length / 2)
    ];
    console.log("answer", middleValue);
};

solveDay102021P2(documentTextDay102021);
