var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var testInput = "\nL.LL.LL.LL\nLLLLLLL.LL\nL.L.L..L..\nLLLL.LL.LL\nL.LL.LL.LL\nL.LLLLL.LL\n..L.L.....\nLLLLLLLLLL\nL.LLLLLL.L\nL.LLLLL.LL\n";
var parseInputToGrid = function (input) { return input.trim().split("\n").map(function (lineString) { return __spreadArrays(lineString); }); };
var renderGrid = function (grid) {
    var gridDiv = document.getElementById("day-11-grid");
    if (!gridDiv) {
        gridDiv = document.createElement("div");
        gridDiv.id = "day-11-grid";
        gridDiv.style.fontSize = "8px";
        document.body.append(gridDiv);
    }
    gridDiv.innerHTML = '';
    grid.forEach(function (line, i) {
        var rowDiv = document.createElement("div");
        rowDiv.id = "row-" + i;
        gridDiv.append(rowDiv);
        line.forEach(function (cellChar, j) {
            var cellSpan = document.createElement("span");
            cellSpan.id = "cell-" + i + "-" + j;
            cellSpan.textContent = cellChar;
            cellSpan.style.width = "10px";
            cellSpan.style.display = "inline-block";
            cellSpan.style.color = "white";
            cellSpan.style.backgroundColor = "black";
            if (cellChar === "#") {
                cellSpan.style.backgroundColor = "red";
            }
            if (cellChar === "L") {
                cellSpan.style.backgroundColor = "blue";
            }
            rowDiv.appendChild(cellSpan);
        });
    });
};
var getNextGrid = function (grid) {
    var nextGrid = [];
    var anyCellChanged = false;
    grid.forEach(function (row, i) {
        var newRow = [];
        row.forEach(function (cellChar, j) {
            var nextCell = getNextCell(cellChar, i, j, grid);
            if (nextCell != grid[i][j]) {
                anyCellChanged = true;
            }
            newRow.push(nextCell);
        });
        nextGrid.push(newRow);
    });
    return { nextGrid: nextGrid, anyCellChanged: anyCellChanged };
};
var getNextCell = function (cellChar, x, y, grid) {
    if (cellChar === ".") {
        return ".";
    }
    // part 1
    // const adjacentCells = getAdjacentCells(x, y, grid);
    var adjacentCells = getVisibleNeighborSeats(x, y, grid);
    if (cellChar === "L") {
        var areAllAdjacentEmpty = adjacentCells.every(function (char) { return char !== "#"; });
        return areAllAdjacentEmpty ? "#" : "L";
    }
    if (cellChar === "#") {
        // part 1
        // const meetsAdjacentThreshold = adjacentCells.filter((char) => char === "#").length >= 4;
        var meetsAdjacentThreshold = adjacentCells.filter(function (char) { return char === "#"; }).length >= 5;
        return meetsAdjacentThreshold ? "L" : "#";
    }
};
var getAdjacentCells = function (x, y, grid) {
    var adjacentCells = [];
    [x - 1, x, x + 1].forEach(function (i) {
        [y - 1, y, y + 1].forEach(function (j) {
            if (i === x && j === y) {
                return;
            }
            if (grid[i] && grid[i][j]) {
                adjacentCells.push(grid[i][j]);
            }
        });
    });
    return adjacentCells;
};
var getVisibleNeighborSeats = function (x, y, grid) {
    var visibleSeats = [];
    [-1, 0, 1].forEach(function (xDelta) {
        [-1, 0, 1].forEach(function (yDelta) {
            if (xDelta === 0 && yDelta === 0) {
                return;
            }
            var i = x + xDelta;
            var j = y + yDelta;
            while (true) {
                var row = grid[i];
                if (!row) {
                    break;
                }
                var nextVisibleCell = row[j];
                if (!nextVisibleCell) {
                    break;
                }
                if (nextVisibleCell !== ".") {
                    visibleSeats.push(nextVisibleCell);
                    break;
                }
                i += xDelta;
                j += yDelta;
            }
        });
    });
    return visibleSeats;
};
var evolveGridTilDone = function (input) {
    var currentGrid = parseInputToGrid(input);
    var count = 1;
    renderGrid(currentGrid);
    var interval = setInterval(function () {
        count++;
        var _a = getNextGrid(currentGrid), nextGrid = _a.nextGrid, anyCellChanged = _a.anyCellChanged;
        currentGrid = nextGrid;
        renderGrid(currentGrid);
        if (!anyCellChanged) {
            clearInterval(interval);
            alert(countOccupiedSeats(currentGrid) + " occupied seats");
        }
    }, 250);
};
var countOccupiedSeats = function (grid) { return grid.reduce(function (sum, row) { return sum + row.filter(function (char) { return char === "#"; }).length; }, 0); };
evolveGridTilDone(document.body.innerText);
// evolveGridTilDone(testInput);
