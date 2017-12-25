// const input =[
// 'b inc 5 if a > 1',
// 'a inc 1 if b < 5',
// 'c dec -10 if a >= 1',
// 'c inc -20 if c == 10'
// ];

const input = document.body.innerText.trim().split('\n');

let registers = {};
let max = 0;
let maxReg;
let def = 0;
let operations = {};
function processLine(line){
	let [reg, posOrNeg, amt] = line.split(' ');
	registers[reg] = registers[reg] || def;
	let condition = line.split(' if ')[1];
	if (evaluate(condition)){
		let change = (posOrNeg == 'inc' ? 1 : -1) * parseInt(amt);
		console.log(posOrNeg, amt, change);
		registers[reg] = registers[reg] + change;
		if (registers[reg] > max){
			max = registers[reg];
			maxReg = reg;
		} 
	}
}

for (let i = 0; i < input.length; i++) {
	processLine(input[i]);
}

// for (let reg in registers) {
// 	if (registers[reg] > max){
// 		max = registers[reg];
// 		maxReg = reg;
// 	}
// }
console.log(maxReg, max);

for (let i = 0; i < input.length; i++) {
	if (!registers[input[i].split(' ')[0]]){
		debugger;
	}
}

function evaluate(condition){
	let [reg, comparison, number] = condition.split(' ');
	registers[reg] = registers[reg] || def;
	operations[comparison] = true;
	let truth = eval(registers[reg] +  comparison + number);
	console.log(truth, registers[reg] +  comparison + number);
	return truth;
}
