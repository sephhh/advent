const testInput = `
nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6
`.trim().split("\n");

const compute = (input: string[]) => {
    let accumulator = 0;
    let visitedLines = new Set();
    let currentLine = 0;
    let success = false;
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

        if(visitedLines.has(currentLine)){
            success = false;
            console.log("NO LUCK FRIENDO, INFINITE LOOP");
            break;
        }

        visitedLines.add(currentLine);

        const instruction = input[currentLine];
        let [operation, stringValue] = instruction.split(" ");
        const value = Number(stringValue.replace("+", ""));
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
    return {accumulator, success};
}



// console.log(compute(testInput));
// console.log(compute(document.body.innerText.trim().split("\n")))

const computeAllPossibleBugFixes = (input: string[]) => {
    for (let i = 0; i < input.length; i++) {
        const instruction = input[i];
        if (instruction.slice(0, 3) === "nop" || instruction.slice(0, 3) === "jmp"){
            const replacementInstruction = instruction.slice(0, 3) === "jmp" ? instruction.replace("jmp", "nop") : instruction.replace("nop", "jmp");
            const {accumulator, success} = compute([
                ...input.slice(0, i),
                replacementInstruction,
                ...input.slice(i + 1)
            ]);
            if (success) { 
                return accumulator;
            }
        }
    }
}

console.log(computeAllPossibleBugFixes(testInput));
console.log(computeAllPossibleBugFixes(document.body.innerText.trim().split("\n")));
