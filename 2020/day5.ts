const input: Array<string> = document.body.innerText.trim().split("\n");


const ROWS = 127;
const COLS = 7;

const findSeatId = (input: string):number => {
    const rowChars = [...input].slice(0, 7);
    const colChars = [...input].slice(7);
    const row = findRow(rowChars)[0];
    const col = findCol(colChars)[0];
    return row * 8 + col;
}

const findRow = (input:Array<string>, range=[0, ROWS]):Array<number> => {
    if (input.length === 0){
        return range;
    }
    const [head, ...tail] = input;
    switch (head) {
        case "F":
            return findRow(tail, getFirstHalfOfRange(range))
        case "B":
            return findRow(tail, getSecondHalfOfRange(range))
        default:
            console.log("what happened");
            return [0, 0];
    }
}

const findCol = (input:Array<string>, range=[0, COLS]):Array<number> => {
    if (input.length === 0){
        return range;
    }
    const [head, ...tail] = input;
    switch (head) {
        case "L":
            return findCol(tail, getFirstHalfOfRange(range))
        case "R":
            return findCol(tail, getSecondHalfOfRange(range))
        default:
            console.log("what happened");
            return [0, 0];
    }
}


const getFirstHalfOfRange = (range: number[]) => [range[0], range[0] + Math.floor((range[1] - range[0]) / 2)];
const getSecondHalfOfRange = (range: number[]) => [range[0] + ((range[1] - range[0] + 1)) / 2, range[1]];

console.log(findSeatId("FBFBBFFRLR"));
console.log(findSeatId("FFFBBBFRRR"));
console.log(findSeatId("BBFFBBFRLL"));


const getHighestSeatId = (input: string[]) => {
    let highestSeatId = 0;
    for (let i = 0; i < input.length; i++) {
        const seatId = findSeatId(input[i]);
        if (seatId > highestSeatId){
            highestSeatId = seatId;
        }
    }
    return highestSeatId;
}


// console.log(getHighestSeatId(input));


const getMySeatId = (input: string[]) => {
    const seatLookup = {}
    for (let i = 0; i < input.length; i++) {
        seatLookup[findSeatId(input[i])] = true;
    }
    let mySeatId = -1;
    Object.keys(seatLookup).forEach((seatId) => {
        const seatIdNumber = Number(seatId);
        if (!seatLookup[seatIdNumber - 1] && seatLookup[seatIdNumber - 2]) {
            mySeatId = seatIdNumber - 1;
        }
    });
    return mySeatId;
}


console.log(getMySeatId(input));
