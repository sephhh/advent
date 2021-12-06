const getOrMaskInt = (maskString: string): number => {
    //get int version of string to binary with all x's counting as 0
    return parseInt(maskString.replace(/X/g, "0"), 2);
}

const getAndMaskInt = (maskString: string): number => {
    //get int version of string to binary with all x's counting as 1
    return parseInt(maskString.replace(/X/g, "1"), 2);
}


const solvePart1 = (input: string[]): number => {
    let maskString: any;
    let memoryLookup = {};
    for (let i = 0; i < input.length; i++) {
        const line = input[i];
        if (line.slice(0, 4) === "mask") {
            maskString = line.split(" = ")[1];
        } else {
            const [_, memoryLoc, numString] = line.match(/^mem\[(\d+)] = (\d+)$/);
            memoryLookup[memoryLoc] = applyMask(maskString, Number(numString));
        }
    }
    console.log("memory lookup", memoryLookup);

    return Object.keys(memoryLookup).reduce((sum, key) => sum + memoryLookup[key], 0);
}


const binaryStringToInt = (binaryString:string):number => parseInt(parseInt(binaryString, 2).toString(10), 10);
const intToBinaryString = (input: number) :string => {
    const inputBinaryString = (input >>> 0).toString(2);
    return "000000000000000000000000000000000000".slice(0, 36 - inputBinaryString.length) + inputBinaryString;
}

const applyMask = (maskString: string, input: number): number => {
    const inputBinaryString = intToBinaryString(input);
    const afterMask = [...inputBinaryString].map((char, i) => {
        if (maskString[i] === "0") {
            return "0";
        }
        if (maskString[i] === "1") {
            return "1";
        }
        return char;
    }).join("");
    return binaryStringToInt(afterMask);
}

const testInput = `
mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
mem[8] = 11
mem[7] = 101
mem[8] = 0
`.trim().split("\n");


console.log(solvePart1(testInput));
// console.log(solvePart1(document.body.innerText.trim().split("\n")));

const solvePart2 = (input) => {
    let maskString: any;
    let memoryLookup = {};
    for (let i = 0; i < input.length; i++) {
        const line = input[i];
        if (line.slice(0, 4) === "mask") {
            maskString = line.split(" = ")[1];
        } else {
            const [_, memoryLoc, numString] = line.match(/^mem\[(\d+)] = (\d+)$/);
            const memoryLocations = findAllLocations(maskString, intToBinaryString(Number(memoryLoc)));
            console.log("maskString", maskString, memoryLocations);
            memoryLocations.forEach((loc) => memoryLookup[loc] = Number(numString));
        }
    }
    console.log("memory lookup", memoryLookup);

    return Object.keys(memoryLookup).reduce((sum, key) => sum + memoryLookup[key], 0);
}

//If the bitmask bit is 0, the corresponding memory address bit is unchanged.
// If the bitmask bit is 1, the corresponding memory address bit is overwritten with 1.
// If the bitmask bit is X, the corresponding memory address bit is floating.

const findAllLocations = (maskString: string, originalBinaryString: string): number[] => {
    if (maskString.indexOf("X") > -1) {
        return [
            ...findAllLocations(maskString.replace("X", "N"), originalBinaryString),
            ...findAllLocations(maskString.replace("X", "1"), originalBinaryString)
        ];
    }
    const afterMask = [...originalBinaryString].map((char, i) => {
        if (maskString[i] === "0") {
            return char;
        }
        if (maskString[i] === "N") {
            return "0";
        }
        if (maskString[i] === "1") {
            return "1";
        }
    }).join("");
    return [binaryStringToInt(afterMask)];
}


const testInput2 = `
mask = 000000000000000000000000000000X1001X
mem[42] = 100
mask = 00000000000000000000000000000000X0XX
mem[26] = 1
`.trim().split("\n");

console.log(solvePart2(testInput2));
console.log(solvePart2(document.body.innerText.trim().split("\n")));

