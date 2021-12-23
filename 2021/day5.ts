const testInputDay52021 = `
0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2
`;

const documentTextDay52021 =
    typeof document === "undefined"
        ? testInputDay52021
        : document.body.innerText;

type Line = [[x1: number, y1: number], [x2: number, y2: number]];
type LineMap = number[][];
const parseLineInput = (input: string): Line[] => {
    return input
        .trim()
        .split("\n")
        .map((inputRow) => {
            const [x, y] = inputRow.split(" -> ");
            if (!x || !y) {
                throw new Error("invalid input");
            }
            const [x1, y1] = x.split(",").map((str) => +str);
            if (typeof x1 !== "number" || typeof y1 !== "number") {
                throw new Error("unexpected input");
            }
            const [x2, y2] = y.split(",").map((str) => +str);
            if (typeof x2 !== "number" || typeof y2 !== "number") {
                throw new Error("unexpected input");
            }

            return [
                [x1, y1],
                [x2, y2],
            ];
        });
};

const addCoordToMap = (coord: [x: number, y: number], map: LineMap) => {
    const [x, y] = coord;
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
    const row = map[x] || [];
    let cell = row[y] || 0;
    cell = cell + 1;
    row[y] = cell;
    map[x] = row;
};

const mapLines = (lines: Line[]) => {
    const map = [[0]];
    lines.forEach((line) => {
        const [[x1, y1], [x2, y2]] = line;
        if (x1 === x2) {
            console.log("x line", line.join("=>"));
            const start = Math.min(y1, y2);
            const end = Math.max(y1, y2);
            for (let i = start; i <= end; i++) {
                addCoordToMap([x1, i], map);
            }
        } else if (y1 === y2) {
            console.log("y line", line.join("=>"));
            const start = Math.min(x1, x2);
            const end = Math.max(x1, x2);
            for (let i = start; i <= end; i++) {
                addCoordToMap([i, y1], map);
            }
        } else {
            console.log("diag line", line.join("=>"));
            let i = x1;
            let j = y1;
            while (i !== x2) {
                addCoordToMap([i, j], map);
                if (x1 > x2) {
                    i--;
                } else {
                    i++;
                }
                if (y1 > y2) {
                    j--;
                } else {
                    j++;
                }
            }
            addCoordToMap([x2, y2], map);
        }
    });
    return map;
};

const countDoubles = (map: LineMap): number => {
    let sum = 0;
    map.forEach((row) =>
        row.forEach((cell) => {
            if (cell > 1) {
                sum++;
            }
        })
    );
    return sum;
};

const solveDay52021P1 = (lineInput: string) => {
    const lines = parseLineInput(lineInput);
    const map = mapLines(lines);
    console.log("ANSWER", countDoubles(map));
};

solveDay52021P1(documentTextDay52021);
