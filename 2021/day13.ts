const testInputDay132021 = `
6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5
`;

const documentTextDay132021 =
    typeof document === "undefined"
        ? testInputDay132021
        : document.body.innerText;

type PaperGrid = string[][];
type PaperCoordinate = [x: number, y: number];
type FoldInstruction = [axis: string, line: number];
const parseInputDay132021 = (
    input: string
): [coords: PaperCoordinate[], folds: FoldInstruction[]] => {
    const [rawCoords, rawFolds] = input.trim().split("\n\n");
    if (!rawCoords || !rawFolds) {
        throw new Error("bad input");
    }
    const coords: PaperCoordinate[] = rawCoords.split("\n").map((string) => {
        const [x, y] = string.split(",");
        if (!x || !y) {
            throw new Error("bad input");
        }
        const coord: PaperCoordinate = [Number(x), Number(y)];
        return coord;
    });

    const folds: FoldInstruction[] = rawFolds.split("\n").map((string) => {
        const match = string.match(/fold along ([xy])=([\d]+)/);
        if (!match || !match[1] || !match[2]) {
            throw new Error("bad input");
        }
        const foldInstruction: FoldInstruction = [match[1], Number(match[2])];
        return foldInstruction;
    });

    return [coords, folds];
};

const addCoordToPaper = (coord: PaperCoordinate, map: PaperGrid) => {
    const [x, y] = coord;
    const row = map[y] || [];
    const cell = "#";
    row[x] = cell;
    map[y] = row;
};

const getPaperWidth = (paper: PaperGrid) =>
    paper.reduce(
        (longestRow, row) =>
            row.length > longestRow ? row.length : longestRow,
        0
    );

const countAndPrintPaper = (paper: PaperGrid) => {
    const paperWidth = getPaperWidth(paper);
    let dotCount = 0;
    console.log("width", paperWidth, "height", paper.length);
    for (let i = 0; i < paper.length; i++) {
        let rowString = "";
        for (let j = 0; j < paperWidth; j++) {
            const cell = paper[i]?.[j] ?? ".";
            if (cell === "#") {
                dotCount++;
            }
            rowString += cell;
        }
        console.log(rowString);
    }
    return dotCount;
};

const solveDay132021P1 = (lineInput: string) => {
    let paper: PaperGrid = [];
    const [coords, folds] = parseInputDay132021(lineInput);
    // console.log("coords", coords, "folds", folds);
    coords.forEach((coord) => addCoordToPaper(coord, paper));
    let dotCount = countAndPrintPaper(paper);
    folds.forEach((fold) => {
        paper = applyFold(fold, paper);
        dotCount = countAndPrintPaper(paper);
        console.log("dot count", dotCount, "fold", fold);
    });

    // console.log("ANSWER", countDoubles(map));
};

solveDay132021P1(documentTextDay132021);
function applyFold(fold: FoldInstruction, paper: PaperGrid): PaperGrid {
    const newPaper: PaperGrid = [];
    const [axis, locus] = fold;
    const paperWidth = getPaperWidth(paper);
    for (let i = 0; i < paper.length; i++) {
        for (let j = 0; j < paperWidth; j++) {
            const oldCell = paper[i]?.[j] ?? ".";
            let newCell = oldCell;
            let newJ = j;
            let newI = i;
            if (axis === "x" && j > locus) {
                newJ = j - (j - locus) * 2;
            }
            if (axis === "y" && i > locus) {
                newI = i - (i - locus) * 2;
            }
            if (paper[newI]?.[newJ] === "#") {
                newCell = "#";
            }
            const row = newPaper[newI] ?? [];
            row[newJ] = newCell;
            newPaper[newI] = row;
        }
    }
    return newPaper;
}

// if y axis
// row > locus
// row -> (row - locus) * 2
// if x axis
// col > locus
// col -> (col - locus) * 2
