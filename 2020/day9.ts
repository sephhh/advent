const testInput = [
    35,
    20,
    15,
    25,
    47,
    40,
    62,
    55,
    65,
    95,
    102,
    117,
    150,
    182,
    127,
    219,
    299,
    277,
    309,
    576
];
const input = document.body.innerText.trim().split("\n").map((stringNum) => Number(stringNum));


const BUFFER_LENGTH = 25;


const findInvalidInStream = (input:number[], bufferLength = BUFFER_LENGTH) => {
    const bufferArray = [];
    for (let i = 0; i < input.length; i++) {
        const num = input[i];
        if (bufferArray.length === bufferLength) {
            if (!canSumToNum(bufferArray, num)){
                console.log("FOUND THE NUM", num);
                return num;
            }
        }
        bufferArray.push(num);
        if (bufferArray.length > bufferLength) {
            bufferArray.shift();
        }
    }
}

const canSumToNum = (bufferArray: number[], targetSum: number) => {
    const sumMatchLookup = {};
    for (let i = 0; i < bufferArray.length; i++) {
        const num = bufferArray[i];
        if (sumMatchLookup[`${targetSum - num}`]) {
            return true;
        }
        sumMatchLookup[`${num}`] = true;
    }
    return false;
}


findInvalidInStream(testInput, 5);

findInvalidInStream(input);

const sumOfSmallestAndLargest = (array: number[]) => {
    let smallest: number, largest: number;

    array.forEach((value) => {
        if (smallest === undefined || value < smallest) {
            smallest = value;
        }

        if (largest === undefined || value > largest) {
            largest = value;
        }
    });

    return smallest + largest;
}

const findRangeSummingToInvalidInStream = (input:number[], bufferLength = BUFFER_LENGTH) => {
    const target = findInvalidInStream(input, bufferLength);
    let sum = 0;
    let sumBuffer = [];

    for (let i = 0; i < input.length; i++) {
        const num = input[i];

        if (num === target) {
            sum = 0;
            sumBuffer = [];
            continue;
        }

        sum += num;
        sumBuffer.push(num);

        while (sum > target) {
            sum -= sumBuffer[0];
            sumBuffer.shift();
        }

        if (sum === target) {
            console.log("SUMMM", sumBuffer);
            return sumOfSmallestAndLargest(sumBuffer);
        }
    }
    console.log("didn't find it eh??");
}

findRangeSummingToInvalidInStream(testInput, 5);
findRangeSummingToInvalidInStream(input);



