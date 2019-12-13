// const line1 = 'R8,U5,L5,D3';
// const line2 = 'U7,R6,D4,L4';
// const line1 = 'R75,D30,R83,U83,L12,D49,R71,U7,L72';
// const line2 = 'U62,R66,U55,R34,D71,R55,D58,R83';
const [line1, line2] = document.body.innerText.trim().split("\n");


const line1Char = "+";
const line2Char = "-";
const crossChar = "x";

const grid = {"0" : {"0": {char: "O"}}};
let currentCoordinate = [0, 0];
let closestCross;
let lowestY = 0;
let highestY = 0;
let highestX = 0;
let lowestX = 0;
let step = 0;


const plotPoint = (x, y, character) => {
    grid[x] = grid[x] || {};
    if (grid[x][y] && grid[x][y] !== character){
        grid[x][y] = crossChar;
        let crossDistance = Math.abs(Number(x)) + Math.abs(Number(y));
        if (typeof closestCross === "undefined" || crossDistance < closestCross){
            closestCross = crossDistance;
        }
    } else {
        grid[x][y] = character;
    }
}

const plotPoint2 = (x, y, character) => {
    step++;
    grid[x] = grid[x] || {}; 
    if (grid[x][y] && grid[x][y].char !== character){
        const crossDistance = step + grid[x][y].step;
        if (typeof closestCross === "undefined" || crossDistance < closestCross){
            closestCross = crossDistance;
        }
        grid[x][y] = {char: crossChar, step: crossDistance};
    } else {
        grid[x][y] = {char: character, step: step};
    }
}

const plotDirection = (direction, number, character) => {
    let y;
    let x;
    switch (direction) {
        case "R":
            y = String(currentCoordinate[1]);
            for (let i = 1; i <= number; i++) {
                let x = String(currentCoordinate[0] + i);
                // plotPoint(x, y, character);
                plotPoint2(x, y, character);
            }
            var newX = currentCoordinate[0] + number;
            if (newX > highestX){ highestX = newX}
            currentCoordinate[0] = newX;
            break;
        case "L":
            y = String(currentCoordinate[1]);
            for (let i = 1; i <= number; i++) {
                let x = String(currentCoordinate[0] - i);
                // plotPoint(x, y, character);
                plotPoint2(x, y, character);
            }
            var newX = currentCoordinate[0] - number;
            if (newX < lowestX){ lowestX = newX}
            currentCoordinate[0] = newX;
            break;
        case "U":
            x = String(currentCoordinate[0]);
            for (let i = 1; i <= number; i++) {
                let y = String(currentCoordinate[1] + i);
                // plotPoint(x, y, character);
                plotPoint2(x, y, character);
            }
            var newY = currentCoordinate[1] + number;
            if (newY > highestY){ highestY = newY}
            currentCoordinate[1] = newY;
            break;
        case "D":
                x = String(currentCoordinate[0]);
                for (let i = 1; i <= number; i++) {
                    let y = String(currentCoordinate[1] - i);
                    // plotPoint(x, y, character);
                    plotPoint2(x, y, character);
                }
                var newY = currentCoordinate[1] - number;
                if (newY < lowestY){ lowestY = newY}
                currentCoordinate[1] = newY;
                break;
        default:
            break;
    }
}

line1.split(",").forEach((direction) => {
    plotDirection(direction[0], Number(direction.slice(1)), line1Char);
});

step = 0;
currentCoordinate = [0, 0];

line2.split(",").forEach((direction) => {
    plotDirection(direction[0], Number(direction.slice(1)), line2Char);
});

console.log(closestCross);
// const padding = 10;
// for (let i = highestY + padding; i >= lowestY - padding; i--) {
//     let string = '';
//     for (let j = lowestX - padding; j < highestX + padding; j++) {
//         if (grid[j] && grid[j][i]){
//             string += grid[j][i].char;
//             // string += grid[j][i].step || grid[j][i].char;
//         }
//         else {
//             string +=" ";
//         }
//         // string += " ";
//     }    
//     console.log(string);
// }