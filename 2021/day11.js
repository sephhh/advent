var testInputDay112021 = "\n5483143223\n2745854711\n5264556173\n6141336146\n6357385478\n4167524645\n2176841721\n6882881134\n4846848554\n5283751526\n";
var documentTextDay112021 = typeof document === "undefined"
    ? testInputDay112021
    : document.body.innerText;
var parseGrid = function (input) {
    return input
        .trim()
        .split("\n")
        .map(function (row) { return row.split("").map(function (str) { return Number(str); }); });
};
var printGrid = function (grid) {
    grid.forEach(function (row) {
        return console.log(row.map(function (num) { return (num ? "." : 0); }).join(" "));
    });
    console.log("\n\n");
};
var hashCoord = function (x, y) { return x + "-" + y; };
var tickAndCountFlashes = function (grid) {
    // printGrid(grid);
    var newGrid = grid.map(function (row) { return row.map(function (num) { return num + 1; }); });
    var flashCount = 0;
    var flashTracker = new Set();
    while (true) {
        // printGrid(newGrid);
        var newFlashesPerIteration = 0;
        var coordsToFlash = [];
        for (var i = 0; i < newGrid.length; i++) {
            var row = newGrid[i];
            for (var j = 0; j < row.length; j++) {
                var cell = row[j];
                if (cell > 9) {
                    var coordString = hashCoord(i, j);
                    // console.log("flash ", i, j);
                    if (!flashTracker.has(coordString)) {
                        flashTracker.add(coordString);
                        coordsToFlash.push([i, j]);
                        newFlashesPerIteration += 1;
                    }
                    else {
                        // console.log("shouldn't hit this right?");
                        newGrid[i][j] = 9;
                    }
                }
            }
        }
        // console.log("new flashes", newFlashesPerIteration);
        if (newFlashesPerIteration === 0) {
            // console.log("break");
            break;
        }
        else {
            flashCount += newFlashesPerIteration;
            // console.log("flash coords", coordsToFlash);
            coordsToFlash.forEach(function (_a) {
                var x = _a[0], y = _a[1];
                for (var i = x - 1; i <= x + 1; i++) {
                    for (var j = y - 1; j <= y + 1; j++) {
                        // console.log("x", x, "y", y, "i", i, "j", j);
                        var row = newGrid[i];
                        var cell = row === null || row === void 0 ? void 0 : row[j];
                        if (typeof cell !== "undefined") {
                            row[j] = cell + 1;
                            newGrid[i] = row;
                        }
                    }
                }
            });
        }
    }
    flashTracker.forEach(function (coordHash) {
        var _a = coordHash.split("-").map(function (str) { return Number(str); }), x = _a[0], y = _a[1];
        newGrid[x][y] = 0;
    });
    return [newGrid, flashCount];
};
var solveDay112021P1 = function (input) {
    var grid = parseGrid(input);
    var iterations = 0;
    var countFlashes = 0;
    var totalIterations = 100;
    var interval = setInterval(function () {
        iterations += 1;
        if (iterations > totalIterations) {
            clearInterval(interval);
            console.log("TOTAL FLASHES", countFlashes);
            return;
        }
        var _a = tickAndCountFlashes(grid), newGrid = _a[0], newFlashes = _a[1];
        grid = newGrid;
        printGrid(grid);
        countFlashes += newFlashes;
    }, 500);
};
// solveDay112021P1(documentTextDay112021);
var solveDay112021P2 = function (input) {
    var grid = parseGrid(input);
    var i = 0;
    while (grid.some(function (row) { return row.some(function (cell) { return cell !== 0; }); })) {
        var newGrid = tickAndCountFlashes(grid)[0];
        grid = newGrid;
        i++;
    }
    console.log("iterations", i);
};
solveDay112021P2(documentTextDay112021);
