const testInputDay42021 = `
7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7
`;

const documentTextDay42021 =
    typeof document === "undefined"
        ? testInputDay42021
        : document.body.innerText;

type Board = string[][];
const chunksDay42021 = documentTextDay42021.trim().split("\n\n");
const [rawDraw, ...rawBoards] = chunksDay42021;
if (typeof rawDraw !== "string") {
    throw new Error("invalid document input");
}
const draw: string[] = rawDraw.split(",");
const boards: Board[] = rawBoards.map((rawBoards) =>
    rawBoards.split("\n").map((numString) => numString.trim().split(/\s+/))
);

console.log("draw", draw, boards);

const updateBoard = (ball: string, board: Board): Board =>
    board.map((row) => row.map((value) => (value === ball ? "X" : value)));

const updateBoards = (ball: string, boards: Board[]): Board[] =>
    boards.map((board) => updateBoard(ball, board));

const checkForWins = (boards: Board[]) => {
    for (const board of boards) {
        if (checkForWin(board)) {
            return board;
        }
    }
    return null;
};

const checkForWin = (board: Board) => {
    // let diagOneWin = true;
    // let diagTwoWin = true;
    for (let i = 0; i < board.length; i++) {
        if (board[i]?.every((value) => value === "X")) {
            return true;
        }
        if (board.every((row) => row[i] === "X")) {
            return true;
        }
        // if (board[i]?.[i] !== "X") {
        //     diagOneWin = false;
        // }
        // if (board[board.length - i]?.[i] !== "X") {
        //     diagTwoWin = false;
        // }
    }
    return false;
    // return diagOneWin || diagTwoWin;
};

const sumWinningBoard = (board: Board) => {
    console.log("board", board);
    const sum = board.reduce(
        (sum, row) =>
            row.reduce(
                (sum2, value) => (value === "X" ? sum2 : sum2 + Number(value)),
                sum
            ),
        0
    );
    console.log("sum!", sum);
    return sum;
};

const solveDay42021P1 = (draw: string[], boards: Board[]) => {
    let winningBoard = null;
    for (let i = 0; i < draw.length; i++) {
        const ball = draw[i];
        if (!ball) {
            throw new Error("invalid draw");
        }
        boards = updateBoards(ball, boards);
        winningBoard = checkForWins(boards);
        if (winningBoard) {
            const sum = sumWinningBoard(winningBoard);
            console.log("ANSWER", sum * Number(ball));
            return;
        }
    }
    throw new Error("no winning boards");
};

solveDay42021P1(draw, boards);

const solveDay42021P2 = (draw: string[], boards: Board[]) => {
    const winningBoards = new Set<number>();
    for (let i = 0; i < draw.length; i++) {
        const ball = draw[i];
        if (!ball) {
            throw new Error("invalid draw");
        }
        boards = updateBoards(ball, boards);
        for (let j = 0; j < boards.length; j++) {
            const board = boards[j];
            if (!board) {
                throw new Error("board junk");
            }
            if (winningBoards.has(j)) {
                continue;
            }
            if (checkForWin(board)) {
                winningBoards.add(j);
                if (winningBoards.size === boards.length) {
                    console.log("LAST WINNING BOARD FOUND");
                    const sum = sumWinningBoard(board);
                    console.log("ANSWER", sum * Number(ball));
                    return;
                }
            }
        }
    }
    throw new Error("could not find last winning board");
};

solveDay42021P2(draw, boards);
