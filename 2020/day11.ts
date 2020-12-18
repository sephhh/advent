const testInput: string = `
L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL
`;

type CellChar = "L" | "." | "#";

type Grid = CellChar[][]

const parseInputToGrid = (input: string):string[][] => input.trim().split("\n").map((lineString) => [...lineString]);

const renderGrid = (grid: Grid) => {
	let gridDiv = document.getElementById("day-11-grid");

	if (!gridDiv) {
		gridDiv = document.createElement("div");
		gridDiv.id = "day-11-grid";
		gridDiv.style.fontSize = "8px";
		document.body.append(gridDiv);
	}

	gridDiv.innerHTML = '';

	grid.forEach((line, i) => {
        const rowDiv = document.createElement("div");
        rowDiv.id = "row-" + i;
        gridDiv.append(rowDiv);
        line.forEach((cellChar:CellChar, j) => {
			const cellSpan = document.createElement("span");
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
        })
    })
}

const getNextGrid = (grid: Grid): {nextGrid: Grid, anyCellChanged: boolean} => {
	const nextGrid = [];
	let anyCellChanged = false;
	grid.forEach((row: CellChar[], i) => {
		const newRow = [];
		row.forEach((cellChar: CellChar, j) => {
			const nextCell = getNextCell(cellChar, i, j, grid);
			if (nextCell != grid[i][j]){
				anyCellChanged = true;
			}
			newRow.push(nextCell);
		});
		nextGrid.push(newRow);
	})
	return {nextGrid, anyCellChanged};
}

const getNextCell = (cellChar: CellChar, x:number, y:number, grid:Grid) => {
	if (cellChar === "."){
		return ".";
	}
	// part 1
	// const adjacentCells = getAdjacentCells(x, y, grid);
	const adjacentCells = getVisibleNeighborSeats(x, y, grid);
	if (cellChar === "L") {
		const areAllAdjacentEmpty = adjacentCells.every((char) => char !== "#");
		return  areAllAdjacentEmpty ? "#" : "L";
	}
	if (cellChar === "#") {
		// part 1
		// const meetsAdjacentThreshold = adjacentCells.filter((char) => char === "#").length >= 4;
		const meetsAdjacentThreshold = adjacentCells.filter((char) => char === "#").length >= 5;
		return  meetsAdjacentThreshold ? "L" : "#";
	}
}


const getAdjacentCells = (x:number, y:number, grid:Grid) :CellChar[] => {
	const adjacentCells:CellChar[] = [];
	[x - 1, x, x + 1].forEach((i) => {
		[y - 1, y, y + 1].forEach((j) => {
			if (i === x && j === y){
				return;
			}
			if (grid[i] && grid[i][j]){
				adjacentCells.push(grid[i][j]);
			}
		})
	})
	return adjacentCells;
}

const getVisibleNeighborSeats = (x:number, y:number, grid:Grid) => {
	const visibleSeats = [];
	[-1, 0, 1].forEach((xDelta) => {
		[-1, 0, 1].forEach((yDelta) => {
			if (xDelta === 0 && yDelta === 0){
				return;
			}
			let i = x + xDelta;
			let j = y + yDelta;
			while(true) {
				const row = grid[i];
				if (!row){
					break;
				}
				const nextVisibleCell = row[j];
				if (!nextVisibleCell) {
					break;
				}
				if (nextVisibleCell!== "."){
					visibleSeats.push(nextVisibleCell);
					break;
				}
				i += xDelta; 
				j += yDelta;
			}
		});
	});
	return visibleSeats;
}

const evolveGridTilDone = (input: string) => {
	let currentGrid = parseInputToGrid(input);
	let count = 1;
	renderGrid(currentGrid);
	const interval = setInterval(() => {
		count++;
		const {nextGrid, anyCellChanged} = getNextGrid(currentGrid);
		currentGrid = nextGrid;
		renderGrid(currentGrid);
		if (!anyCellChanged){
			clearInterval(interval);
			alert(countOccupiedSeats(currentGrid) + " occupied seats");
		}
	}, 250);
}

const countOccupiedSeats = (grid: Grid) => grid.reduce((sum, row) => sum + row.filter((char) => char === "#").length, 0);

evolveGridTilDone(document.body.innerText);
// evolveGridTilDone(testInput);


