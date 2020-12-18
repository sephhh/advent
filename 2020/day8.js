var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var testInput = "\nnop +0\nacc +1\njmp +4\nacc +3\njmp -3\nacc -99\nacc +1\njmp -4\nacc +6\n".trim().split("\n");
var compute = function (input) {
    var accumulator = 0;
    var visitedLines = new Set();
    var currentLine = 0;
    var success = false;
    while (true) {
        if (currentLine === input.length) {
            success = true;
            console.log("WINNER WINNER CHICKEN DINNER");
            break;
        }
        if (currentLine > input.length) {
            success = false;
            console.log("JUMPED OFF THE TRACKS THERE");
            break;
        }
        if (visitedLines.has(currentLine)) {
            success = false;
            console.log("NO LUCK FRIENDO, INFINITE LOOP");
            break;
        }
        visitedLines.add(currentLine);
        var instruction = input[currentLine];
        var _a = instruction.split(" "), operation = _a[0], stringValue = _a[1];
        var value = Number(stringValue.replace("+", ""));
        switch (operation) {
            case "nop":
                currentLine += 1;
                break;
            case "acc":
                accumulator += value;
                currentLine += 1;
                break;
            case "jmp":
                currentLine += value;
                break;
            default:
                throw new Error("WHAT HAPPENED HERE??");
        }
    }
    return { accumulator: accumulator, success: success };
};
// console.log(compute(testInput));
// console.log(compute(document.body.innerText.trim().split("\n")))
var computeAllPossibleBugFixes = function (input) {
    for (var i = 0; i < input.length; i++) {
        var instruction = input[i];
        if (instruction.slice(0, 3) === "nop" || instruction.slice(0, 3) === "jmp") {
            var replacementInstruction = instruction.slice(0, 3) === "jmp" ? instruction.replace("jmp", "nop") : instruction.replace("nop", "jmp");
            var _a = compute(__spreadArrays(input.slice(0, i), [
                replacementInstruction
            ], input.slice(i + 1))), accumulator = _a.accumulator, success = _a.success;
            if (success) {
                return accumulator;
            }
        }
    }
};
console.log(computeAllPossibleBugFixes(testInput));
console.log(computeAllPossibleBugFixes(document.body.innerText.trim().split("\n")));
