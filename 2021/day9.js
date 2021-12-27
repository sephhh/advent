var testInputDay92021 = "\n2199943210\n3987894921\n9856789892\n8767896789\n9899965678\n";
var documentTextDay92021 = typeof document === "undefined"
    ? testInputDay92021
    : document.body.innerText;
var parseMapFromInput = function (input) {
    return input.split("\n").map(function (col) { return col.split("").map(function (cell) { return Number(cell); }); });
};
function assertDefined(v) {
    if (typeof v === "undefined") {
        throw new Error("unexpected undefined variable");
    }
}
var isLowPoint = function (cell, map, i, j) {
    var _a, _b, _c, _d;
    return [(_a = map[i + 1]) === null || _a === void 0 ? void 0 : _a[j], (_b = map[i - 1]) === null || _b === void 0 ? void 0 : _b[j], (_c = map[i]) === null || _c === void 0 ? void 0 : _c[j + 1], (_d = map[i]) === null || _d === void 0 ? void 0 : _d[j - 1]].every(function (cell2) {
        if (typeof cell2 === "undefined") {
            return true;
        }
        return cell2 > cell;
    });
};
var getRiskLevel = function (cell) { return cell + 1; };
var solveDay92021P1 = function (input) {
    var riskLevel = 0;
    var map = parseMapFromInput(input);
    for (var i = 0; i < map.length; i++) {
        var row = map[i];
        assertDefined(row);
        for (var j = 0; j < row.length; j++) {
            var cell = row[j];
            assertDefined(cell);
            if (isLowPoint(cell, map, i, j)) {
                // console.log("cell", cell, i, j);
                riskLevel += getRiskLevel(cell);
            }
        }
    }
    console.log("answer part 1", riskLevel);
};
solveDay92021P1(documentTextDay92021);
var isBasiny = function (cell) {
    return typeof cell !== "undefined" && cell !== 9;
};
var getBasinyNeighbors = function (map, x, y, visitedBasinyNeighbors) {
    var neighborCoords = [
        [x + 1, y],
        [x - 1, y],
        [x, y + 1],
        [x, y - 1],
    ];
    neighborCoords.forEach(function (_a) {
        var _b;
        var x1 = _a[0], y1 = _a[1];
        var neighborCell = (_b = map[x1]) === null || _b === void 0 ? void 0 : _b[y1];
        var neighborCoordHash = x1 + "-" + y1;
        if (!visitedBasinyNeighbors.has(neighborCoordHash) &&
            isBasiny(neighborCell)) {
            visitedBasinyNeighbors.add(neighborCoordHash);
            visitedBasinyNeighbors = getBasinyNeighbors(map, x1, y1, visitedBasinyNeighbors);
        }
    });
    return visitedBasinyNeighbors;
};
var getBasinSize = function (map, i, j) {
    var basinSet = new Set();
    basinSet = getBasinyNeighbors(map, i, j, basinSet);
    // console.log("basinSet", basinSet);
    return basinSet.size;
};
var solveDay92021P2 = function (input) {
    var _a, _b, _c;
    var basins = [];
    var map = parseMapFromInput(input);
    for (var i = 0; i < map.length; i++) {
        var row = map[i];
        assertDefined(row);
        for (var j = 0; j < row.length; j++) {
            var cell = row[j];
            assertDefined(cell);
            if (isLowPoint(cell, map, i, j)) {
                var basinSize = getBasinSize(map, i, j);
                // console.log("cell", cell, i, j, "basinSize", basinSize);
                basins.push(basinSize);
            }
        }
    }
    var sortedBasins = basins.sort(function (a, b) { return b - a; });
    console.log("answer part 2", ((_a = sortedBasins[0]) !== null && _a !== void 0 ? _a : 1) * ((_b = sortedBasins[1]) !== null && _b !== void 0 ? _b : 1) * ((_c = sortedBasins[2]) !== null && _c !== void 0 ? _c : 1));
};
solveDay92021P2(documentTextDay92021);
