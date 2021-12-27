var testInputDay102021 = "\n[({(<(())[]>[[{[]{<()<>>\n[(()[<>])]({[<{<<[]>>(\n{([(<{}[<>[]}>{[]{[(<()>\n(((({<>}<{<{<>}{[]{[]{}\n[[<[([]))<([[{}[[()]]]\n[{[{({}]{}}([{[{{{}}([]\n{<[[]]>}<{[{[{[]{()[[[]\n[<(<(<(<{}))><([]([]()\n<{([([[(<>()){}]>(<<{{\n<{([{{}}[<[[[<>{}]]]>[]]\n";
var documentTextDay102021 = typeof document === "undefined"
    ? testInputDay102021
    : document.body.innerText;
var pointLookup = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137
};
var matchingCharLookup = {
    ")": "(",
    "]": "[",
    "}": "{",
    ">": "<",
    "(": ")",
    "[": "]",
    "{": "}",
    "<": ">"
};
var isClosingBracketChar = function (char) {
    return [")", "]", "}", ">"].includes(char);
};
var isBracketChar = function (char) {
    return isClosingBracketChar(char) || ["(", "[", "{", "<"].includes(char);
};
var findCurruptChar = function (line) {
    var _a;
    var openChars = [];
    return ((_a = line.find(function (char) {
        if (isClosingBracketChar(char)) {
            var mostRecentOpenChar = openChars.pop();
            var matchingOpenChar = matchingCharLookup[char];
            if (mostRecentOpenChar !== matchingOpenChar) {
                return char;
            }
        }
        else {
            openChars.push(char);
        }
        return false;
    })) !== null && _a !== void 0 ? _a : null);
};
var solveDay102021P1 = function (input) {
    var corruptCount = 0;
    input.split("\n").forEach(function (line) {
        var _a;
        var corruptChar = findCurruptChar(line.split("").filter(isBracketChar));
        if (corruptChar) {
            corruptCount += (_a = pointLookup[corruptChar]) !== null && _a !== void 0 ? _a : 0;
        }
    });
    console.log("answer", corruptCount);
};
solveDay102021P1(documentTextDay102021);
var pointLookup2 = {
    ")": 1,
    "]": 2,
    "}": 3,
    ">": 4
};
var getCompletionPoints = function (line) {
    var completionPoints = 0;
    var openChars = [];
    for (var _i = 0, line_1 = line; _i < line_1.length; _i++) {
        var char = line_1[_i];
        if (isClosingBracketChar(char)) {
            var mostRecentOpenChar = openChars.pop();
            var matchingOpenChar = matchingCharLookup[char];
            if (mostRecentOpenChar !== matchingOpenChar) {
                // corrupt, stop here
                return 0;
            }
        }
        else {
            openChars.push(char);
        }
    }
    openChars.reverse().forEach(function (char) {
        var matchingChar = matchingCharLookup[char];
        if (!isClosingBracketChar(matchingChar)) {
            throw new Error("wrong kind of char");
        }
        completionPoints = completionPoints * 5 + pointLookup2[matchingChar];
    });
    return completionPoints;
};
var solveDay102021P2 = function (input) {
    var completionPointsArray = [];
    input.split("\n").forEach(function (line) {
        var parsedLine = line.split("").filter(isBracketChar);
        var completionPoints = getCompletionPoints(parsedLine);
        if (completionPoints) {
            completionPointsArray.push(completionPoints);
        }
    });
    var middleValue = completionPointsArray.sort(function (a, b) { return a - b; })[Math.floor(completionPointsArray.length / 2)];
    console.log("answer", middleValue);
};
solveDay102021P2(documentTextDay102021);
