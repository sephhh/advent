const testInput = [
    "..##.......",
    "#...#...#..",
    ".#....#..#.",
    "..#.#...#.#",
    ".#...##..#.",
    "..#.##.....",
    ".#.#.#....#",
    ".#........#",
    "#.##...#...",
    "#...##....#",
    ".#..#...#.#",
];
const input: Array<string> = document.body.innerText.trim().split("\n");

type slope = [number, number];

const SLOPE: slope = [1, 3];


const calculateTreesHit = (input: Array<string>, slope:slope): number =>  {
    let count = 0;
    let pos = [0, 0];
    let [slopeX, slopeY] = slope;
    const width = input[0].length;
    while (true) {
        if (!input[pos[0]]){
            break;
        }
        if (input[pos[0]][pos[1]] === "#"){
            count ++;
        }
        pos[0] += slopeX;
        pos[1] = (pos[1] + slopeY) % width;
    }
    console.log("done", slope, count);
    return count;
}

console.log(calculateTreesHit(input, [1, 3]));
console.log(calculateTreesHit(input, [1, 3]));


const calculateForManySlopes = (input:Array<string>, slopes:Array<slope>):number => {
    let total = 1;
    return slopes.reduce((previousTotal, slope) => {
        return previousTotal * calculateTreesHit(input, slope);
    }, total);
}

const SLOPES:Array<slope> = [
    [1, 1],
    [1, 3],
    [1, 5],
    [1, 7],
    [2, 1],
];

console.log(calculateForManySlopes(testInput, SLOPES));
console.log(calculateForManySlopes(input, SLOPES));
