const testInputDay112021 = `
5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526
`;

function assertIsDefined<T>(v: T | undefined): asserts v is T {
    if (typeof v === "undefined") {
        throw new Error("unexpected undefined variable");
    }
}

const documentTextDay112021 =
    typeof document === "undefined"
        ? testInputDay112021
        : document.body.innerText;

const parseGrid = (input: string) =>
    input
        .trim()
        .split("\n")
        .map((row) => row.split("").map((str) => Number(str)));
const printGrid = (grid: number[][]) => {
    grid.forEach((row) =>
        console.log(row.map((num) => (num ? "." : 0)).join(" "))
    );
    console.log("\n\n");
};

const hashCoord = (x: number, y: number) => `${x}-${y}`;

const tickAndCountFlashes = (
    grid: number[][]
): [grid: number[][], count: number] => {
    // printGrid(grid);
    const newGrid = grid.map((row) => row.map((num) => num + 1));
    let flashCount = 0;
    const flashTracker = new Set<string>();
    while (true) {
        // printGrid(newGrid);
        let newFlashesPerIteration = 0;
        const coordsToFlash = [];
        for (let i = 0; i < newGrid.length; i++) {
            const row = newGrid[i];
            assertIsDefined(row);
            for (let j = 0; j < row.length; j++) {
                const cell: number | undefined = row[j];
                assertIsDefined(cell);
                if (cell > 9) {
                    const coordString = hashCoord(i, j);
                    // console.log("flash ", i, j);
                    if (!flashTracker.has(coordString)) {
                        flashTracker.add(coordString);
                        coordsToFlash.push([i, j]);
                        newFlashesPerIteration += 1;
                    } else {
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
        } else {
            flashCount += newFlashesPerIteration;
            // console.log("flash coords", coordsToFlash);
            coordsToFlash.forEach(([x, y]) => {
                assertIsDefined(x);
                assertIsDefined(y);
                for (let i = x - 1; i <= x + 1; i++) {
                    for (let j = y - 1; j <= y + 1; j++) {
                        // console.log("x", x, "y", y, "i", i, "j", j);
                        const row = newGrid[i];
                        const cell = row?.[j];
                        if (typeof cell !== "undefined") {
                            row[j] = cell + 1;
                            newGrid[i] = row;
                        }
                    }
                }
            });
        }
    }
    flashTracker.forEach((coordHash) => {
        const [x, y] = coordHash.split("-").map((str) => Number(str));
        assertIsDefined(x);
        assertIsDefined(y);
        newGrid[x][y] = 0;
    });

    return [newGrid, flashCount];
};
const solveDay112021P1 = (input: string) => {
    let grid = parseGrid(input);
    let iterations = 0;
    let countFlashes = 0;
    const totalIterations = 100;
    const interval = setInterval(() => {
        iterations += 1;
        if (iterations > totalIterations) {
            clearInterval(interval);
            console.log("TOTAL FLASHES", countFlashes);
            return;
        }
        const [newGrid, newFlashes] = tickAndCountFlashes(grid);
        grid = newGrid;
        printGrid(grid);
        countFlashes += newFlashes;
    }, 500);
};

// solveDay112021P1(documentTextDay112021);

const solveDay112021P2 = (input: string) => {
    let grid = parseGrid(input);
    let i = 0;
    while (grid.some((row) => row.some((cell) => cell !== 0))) {
        const [newGrid] = tickAndCountFlashes(grid);
        grid = newGrid;
        i++;
    }
    console.log("iterations", i);
};

solveDay112021P2(documentTextDay112021);
