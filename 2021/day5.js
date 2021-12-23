var testInputDay52021 = "\n0,9 -> 5,9\n8,0 -> 0,8\n9,4 -> 3,4\n2,2 -> 2,1\n7,0 -> 7,4\n6,4 -> 2,0\n0,9 -> 2,9\n3,4 -> 1,4\n0,0 -> 8,8\n5,5 -> 8,2\n";
var documentTextDay52021 = typeof document === "undefined"
    ? testInputDay52021
    : document.body.innerText;
var parseLineInput = function (input) {
    return input
        .trim()
        .split("\n")
        .map(function (inputRow) {
        var _a = inputRow.split(" -> "), x = _a[0], y = _a[1];
        if (!x || !y) {
            throw new Error("invalid input");
        }
        var _b = x.split(",").map(function (str) { return +str; }), x1 = _b[0], y1 = _b[1];
        if (typeof x1 !== "number" || typeof y1 !== "number") {
            throw new Error("unexpected input");
        }
        var _c = y.split(",").map(function (str) { return +str; }), x2 = _c[0], y2 = _c[1];
        if (typeof x2 !== "number" || typeof y2 !== "number") {
            throw new Error("unexpected input");
        }
        return [
            [x1, y1],
            [x2, y2],
        ];
    });
};
var addCoordToMap = function (coord, map) {
    var x = coord[0], y = coord[1];
    // for (let i = 0; i <= x; i++) {
    //     for (let j = 0; j <= y; j++) {
    //         const row = map[i] || [];
    //         let cell = row[j] || 0;
    //         if (i === x && j === y) {
    //             cell = cell + 1;
    //         }
    //         row[j] = cell;
    //         map[i] = row;
    //     }
    // }
    var row = map[x] || [];
    var cell = row[y] || 0;
    cell = cell + 1;
    row[y] = cell;
    map[x] = row;
};
var mapLines = function (lines) {
    var map = [[0]];
    lines.forEach(function (line) {
        var _a = line[0], x1 = _a[0], y1 = _a[1], _b = line[1], x2 = _b[0], y2 = _b[1];
        if (x1 === x2) {
            console.log("x line", line.join("=>"));
            var start = Math.min(y1, y2);
            var end = Math.max(y1, y2);
            for (var i = start; i <= end; i++) {
                addCoordToMap([x1, i], map);
            }
        }
        else if (y1 === y2) {
            console.log("y line", line.join("=>"));
            var start = Math.min(x1, x2);
            var end = Math.max(x1, x2);
            for (var i = start; i <= end; i++) {
                addCoordToMap([i, y1], map);
            }
        }
        else {
            console.log("diag line", line.join("=>"));
            var i = x1;
            var j = y1;
            while (i !== x2) {
                addCoordToMap([i, j], map);
                if (x1 > x2) {
                    i--;
                }
                else {
                    i++;
                }
                if (y1 > y2) {
                    j--;
                }
                else {
                    j++;
                }
            }
            addCoordToMap([x2, y2], map);
        }
    });
    return map;
};
var countDoubles = function (map) {
    var sum = 0;
    map.forEach(function (row) {
        return row.forEach(function (cell) {
            if (cell > 1) {
                sum++;
            }
        });
    });
    return sum;
};
var solveDay52021P1 = function (lineInput) {
    var lines = parseLineInput(lineInput);
    var map = mapLines(lines);
    console.log("ANSWER", countDoubles(map));
};
solveDay52021P1(documentTextDay52021);
