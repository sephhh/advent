var testInputDay132021 = "\n6,10\n0,14\n9,10\n0,3\n10,4\n4,11\n6,0\n6,12\n4,1\n0,13\n10,12\n3,4\n3,0\n8,4\n1,10\n2,14\n8,10\n9,0\n\nfold along y=7\nfold along x=5\n";
var documentTextDay132021 = typeof document === "undefined"
    ? testInputDay132021
    : document.body.innerText;
var parseInputDay132021 = function (input) {
    var _a = input.trim().split("\n\n"), rawCoords = _a[0], rawFolds = _a[1];
    if (!rawCoords || !rawFolds) {
        throw new Error("bad input");
    }
    var coords = rawCoords.split("\n").map(function (string) {
        var _a = string.split(","), x = _a[0], y = _a[1];
        if (!x || !y) {
            throw new Error("bad input");
        }
        var coord = [Number(x), Number(y)];
        return coord;
    });
    var folds = rawFolds.split("\n").map(function (string) {
        var match = string.match(/fold along ([xy])=([\d]+)/);
        if (!match || !match[1] || !match[2]) {
            throw new Error("bad input");
        }
        var foldInstruction = [match[1], Number(match[2])];
        return foldInstruction;
    });
    return [coords, folds];
};
var addCoordToPaper = function (coord, map) {
    var x = coord[0], y = coord[1];
    var row = map[y] || [];
    var cell = "#";
    row[x] = cell;
    map[y] = row;
};
var getPaperWidth = function (paper) {
    return paper.reduce(function (longestRow, row) {
        return row.length > longestRow ? row.length : longestRow;
    }, 0);
};
var countAndPrintPaper = function (paper) {
    var _a, _b;
    var paperWidth = getPaperWidth(paper);
    var dotCount = 0;
    console.log("width", paperWidth, "height", paper.length);
    for (var i = 0; i < paper.length; i++) {
        var rowString = "";
        for (var j = 0; j < paperWidth; j++) {
            var cell = (_b = (_a = paper[i]) === null || _a === void 0 ? void 0 : _a[j]) !== null && _b !== void 0 ? _b : ".";
            if (cell === "#") {
                dotCount++;
            }
            rowString += cell;
        }
        console.log(rowString);
    }
    return dotCount;
};
var solveDay132021P1 = function (lineInput) {
    var paper = [];
    var _a = parseInputDay132021(lineInput), coords = _a[0], folds = _a[1];
    // console.log("coords", coords, "folds", folds);
    coords.forEach(function (coord) { return addCoordToPaper(coord, paper); });
    var dotCount = countAndPrintPaper(paper);
    folds.forEach(function (fold) {
        paper = applyFold(fold, paper);
        dotCount = countAndPrintPaper(paper);
        console.log("dot count", dotCount, "fold", fold);
    });
    // console.log("ANSWER", countDoubles(map));
};
solveDay132021P1(documentTextDay132021);
function applyFold(fold, paper) {
    var _a, _b, _c, _d;
    var newPaper = [];
    var axis = fold[0], locus = fold[1];
    var paperWidth = getPaperWidth(paper);
    for (var i = 0; i < paper.length; i++) {
        for (var j = 0; j < paperWidth; j++) {
            var oldCell = (_b = (_a = paper[i]) === null || _a === void 0 ? void 0 : _a[j]) !== null && _b !== void 0 ? _b : ".";
            var newCell = oldCell;
            var newJ = j;
            var newI = i;
            if (axis === "x" && j > locus) {
                newJ = j - (j - locus) * 2;
            }
            if (axis === "y" && i > locus) {
                newI = i - (i - locus) * 2;
            }
            if (((_c = paper[newI]) === null || _c === void 0 ? void 0 : _c[newJ]) === "#") {
                newCell = "#";
            }
            var row = (_d = newPaper[newI]) !== null && _d !== void 0 ? _d : [];
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
