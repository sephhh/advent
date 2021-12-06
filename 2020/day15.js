const solvePart1 = (input) => {
    const lookup = {};
    let numberToSay;
    for (let i = 0; i < 2020; i++) {
        if (input[i]) {
            numberToSay = input[i];
        }
        else {
            const lastSaidIndices = lookup[numberToSay];
            if ((lastSaidIndices === null || lastSaidIndices === void 0 ? void 0 : lastSaidIndices.length) === 2) {
                numberToSay = lastSaidIndices[1] - lastSaidIndices[0];
            }
            else {
                numberToSay = 0;
            }
        }
        lookup[numberToSay] = lookup[numberToSay] || [];
        lookup[numberToSay].push(i);
        if (lookup[numberToSay].length > 2) {
            lookup[numberToSay].shift();
        }
    }
    return numberToSay;
};
const solvePart2 = (input) => {
    const lookup = new Map();
    let numberToSay;
    for (let i = 0; i < 30000000; i++) {
        if (i % 1000000 === 0) {
            console.log("processing...", i);
        }
        if (input[i]) {
            numberToSay = input[i];
        }
        else {
            const lastSaidIndices = lookup[numberToSay];
            if ((lastSaidIndices === null || lastSaidIndices === void 0 ? void 0 : lastSaidIndices.length) === 2) {
                numberToSay = lastSaidIndices[1] - lastSaidIndices[0];
            }
            else {
                numberToSay = 0;
            }
        }
        lookup[numberToSay] = lookup[numberToSay] || [];
        lookup[numberToSay].push(i);
        if (lookup[numberToSay].length > 2) {
            lookup[numberToSay].shift();
        }
    }
    return numberToSay;
};
console.log(solvePart1([0, 3, 6]));
console.log(solvePart1([1, 3, 2]));
console.log(solvePart1([2, 1, 3]));
console.log(solvePart1([1, 20, 8, 12, 0, 14]));
// console.log(solvePart2([0, 3, 6]));
// console.log(solvePart2([1,3,2]));
// console.log(solvePart2([2,1,3]));
console.log(solvePart2([1,20,8,12,0,14]));
