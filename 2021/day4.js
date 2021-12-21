var testInputDay42021 = "\n7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1\n\n22 13 17 11  0\n 8  2 23  4 24\n21  9 14 16  7\n 6 10  3 18  5\n 1 12 20 15 19\n\n 3 15  0  2 22\n 9 18 13 17  5\n19  8  7 25 23\n20 11 10 24  4\n14 21 16 12  6\n\n14 21 17 24  4\n10 16 15  9 19\n18  8 23 26 20\n22 11 13  6  5\n 2  0 12  3  7\n";
var documentTextDay42021 = typeof document === "undefined"
    ? testInputDay42021
    : document.body.innerText;
var chunksDay42021 = documentTextDay42021.trim().split("\n\n");
var rawDraw = chunksDay42021[0], rawBoards = chunksDay42021.slice(1);
var draw = rawDraw.split(",");
var boards = rawBoards.map(function (rawBoards) {
    return rawBoards.split("\n").map(function (numString) { return numString.trim().split(/\s+/); });
});
console.log("draw", draw, boards);
var updateBoard = function (ball, board) {
    return board.map(function (row) { return row.map(function (value) { return (value === ball ? "X" : value); }); });
};
var updateBoards = function (ball, boards) {
    return boards.map(function (board) { return updateBoard(ball, board); });
};
var checkForWins = function (boards) {
    for (var _i = 0, boards_1 = boards; _i < boards_1.length; _i++) {
        var board = boards_1[_i];
        if (checkForWin(board)) {
            return board;
        }
    }
    return null;
};
var checkForWin = function (board) {
    var _a;
    var _loop_1 = function (i) {
        if ((_a = board[i]) === null || _a === void 0 ? void 0 : _a.every(function (value) { return value === "X"; })) {
            return { value: true };
        }
        if (board.every(function (row) { return row[i] === "X"; })) {
            return { value: true };
        }
    };
    // let diagOneWin = true;
    // let diagTwoWin = true;
    for (var i = 0; i < board.length; i++) {
        var state_1 = _loop_1(i);
        if (typeof state_1 === "object")
            return state_1.value;
    }
    return false;
    // return diagOneWin || diagTwoWin;
};
var sumWinningBoard = function (board) {
    console.log("board", board);
    var sum = board.reduce(function (sum, row) {
        return row.reduce(function (sum2, value) { return (value === "X" ? sum2 : sum2 + Number(value)); }, sum);
    }, 0);
    console.log("sum!", sum);
    return sum;
};
var solveDay42021P1 = function (draw, boards) {
    var winningBoard = null;
    for (var i = 0; i < draw.length; i++) {
        var ball = draw[i];
        if (!ball) {
            throw new Error("invalid draw");
        }
        boards = updateBoards(ball, boards);
        winningBoard = checkForWins(boards);
        if (winningBoard) {
            var sum = sumWinningBoard(winningBoard);
            console.log("ANSWER", sum * Number(ball));
            return;
        }
    }
    throw new Error("no winning boards");
};
solveDay42021P1(draw, boards);
var solveDay42021P2 = function (draw, boards) {
    var winningBoards = new Set();
    for (var i = 0; i < draw.length; i++) {
        var ball = draw[i];
        if (!ball) {
            throw new Error("invalid draw");
        }
        boards = updateBoards(ball, boards);
        for (var j = 0; j < boards.length; j++) {
            var board = boards[j];
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
                    var sum = sumWinningBoard(board);
                    console.log("ANSWER", sum * Number(ball));
                    return;
                }
            }
        }
    }
    throw new Error("could not find last winning board");
};
solveDay42021P2(draw, boards);
