// const input = '{{<a!>},{<a!>},{<a!>},{<ab>}}';
// const input = '<{o"i!a,<{i<a>';
const input = document.body.innerText.trim();

let inGarbage = false;
let groupDepth = 0;
let score = 0;
let garbageCount = 0;
function isGarbageStart(string, index){
	return string[index] == '<' && !isNegated(string, index);
}

function isGarbageEnd(string, index){
	return string[index] == '>' && !isNegated(string, index);
}

function isGroupStart(string, index){
	return string[index] == '{' && !isNegated(string, index);
}

function isGroupEnd(string, index){
	return string[index] == '}' && !isNegated(string, index);
}

function isNegator(string, index){
	return string[index]== '!' && !isNegated(string, index);
}

function isNegated(string, index){
	return isNegator(string, index - 1);
}

for (let i = 0; i < input.length; i++) {
	// console.log(input[i], inGarbage);
	if (!inGarbage){
		if (isGroupStart(input, i)){
			groupDepth += 1;
		} else if (isGroupEnd(input, i)){
			score+=groupDepth;
			groupDepth -=1;
		} else if (isGarbageStart(input, i)){
			inGarbage = true;
		}
	} else {
		if (isGarbageEnd(input, i)){
			inGarbage = false;
		} else if (!isNegated(input, i) && !isNegator(input, i)){
			console.log(input[i]);
			garbageCount += 1;
		}
	}
}
console.log('score', score);
console.log('garbage', garbageCount);
