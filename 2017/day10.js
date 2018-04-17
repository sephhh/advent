
const chai = require('chai');  

const assert = chai.assert;


let knotHashPart1 = function(input, length){
	let currentPosition = 0;
	let skipSize = 0;
	let knot = new Knot(length);

	for (let i = 0; i < input.length; i++) {
		let instruction = input[i];
		knot.reverse(currentPosition, instruction);
		currentPosition = (currentPosition + instruction + skipSize) % length; 
		skipSize ++;
	}
	return knot.marks[0] * knot.marks[1];
}

function Knot(length){
	this.marks = [];
	for (let i = 0; i < length; i++) {
		this.marks.push(i)
	}
}

Knot.prototype.reverse = function(start, reversalLength){
	let end = start + reversalLength
	for (let i = 0; i < reversalLength / 2; i++) {
		let swapPositionA = (start + i) % this.marks.length;
		let swapPositionB = (start + reversalLength - (i + 1)) % this.marks.length;
		let tempA = this.marks[swapPositionA];
		let tempB = this.marks[swapPositionB];
		this.marks[swapPositionA] = tempB;
		this.marks[swapPositionB] = tempA;
	}
}

describe('test part 1 solution', function() {

	it('should pass test result 1', function(){
		let testCase1 = knotHashPart1([3, 4, 1, 5], 5);
		assert.equal(testCase1, 12);	
	});

	it('should pass test result 1', function(){
		let testCase2 = knotHashPart1([63,144,180,149,1,255,167,84,125,65,188,0,2,254,229,24], 256);
		assert.equal(testCase2, 4480);
	});
})

describe('densify', function(){
	it ('should bitwise reduce in 16 bit chunks', function(){
		let testArray = [65,27,9,1,4,3,40,50,91,7,6,0,2,5,68,22];
		let multiTestArray = [].concat(testArray).concat(testArray);
		assert.deepEqual(densify(testArray), [64])
		assert.deepEqual(densify(multiTestArray), [64, 64])
	})
})

describe('hexify', function(){
	it ('should hexify', function(){
		let testArray = [64, 7, 255];
		let expected = ['40', '07', 'ff'];
		assert.deepEqual(hexify(testArray), expected);
	})
})


describe('test part 2 solution', function() {

	it('should pass test cases', function(){

		// The empty string becomes a2582a3a0e66e6e86e3812dcb672a272.
		// AoC 2017 becomes 33efeb34ea91902bb2f59c9920caa6cd.
		// 1,2,3 becomes 3efbe78a8d82f29979031a4aa0b16a9d.
		// 1,2,4 becomes 63960835bcdc130f0b66d7ff4f6a5a8e.
		assert.equal(knotHashPart2('', 256), 'a2582a3a0e66e6e86e3812dcb672a272');
		assert.equal(knotHashPart2('AoC 2017', 256), '33efeb34ea91902bb2f59c9920caa6cd');
		assert.equal(knotHashPart2('1,2,3', 256), '3efbe78a8d82f29979031a4aa0b16a9d');
		assert.equal(knotHashPart2('1,2,4', 256), '63960835bcdc130f0b66d7ff4f6a5a8e');

	});


})


function Hash(input, length){
	this.instructions = [];
	for (let i = 0; i < input.length; i++) {
		this.instructions.push(input[i].charCodeAt(0));
	}
	this.instructions = this.instructions.concat([17, 31, 73, 47, 23]);
	this.bits = [];
	for (let i = 0; i < length; i++) {
		this.bits.push(i)
	}

	this.currentPosition = 0;
	this.skipSize = 0;
	this.rounds = 64;

}

Hash.prototype.reverse = function(start, reversalLength){
	let end = start + reversalLength
	for (let i = 0; i < reversalLength / 2; i++) {
		let swapPositionA = (start + i) % this.bits.length;
		let swapPositionB = (start + reversalLength - (i + 1)) % this.bits.length;
		let tempA = this.bits[swapPositionA];
		let tempB = this.bits[swapPositionB];
		this.bits[swapPositionA] = tempB;
		this.bits[swapPositionB] = tempA;
	}
}

Hash.prototype.compute = function(){
	console.log('inst:', this.instructions);
	for (let i = 0; i < this.rounds; i++) {
		for (let i = 0; i < this.instructions.length; i++) {
			this.shift(this.instructions[i]);
		}
	}
	this.denseHashArray = densify(this.bits);
	this.hexArray = hexify(this.denseHashArray)
	return this.hexArray.join('');
}

function densify(array){
	let returnArray = [];
	for (let i = 0; i < array.length; i += 16) {
		let slice = array.slice(i, i + 16);
		let bitwiseXor = slice.reduce( (accumulator, currentValue ) => accumulator ^ currentValue);
		returnArray.push(bitwiseXor);
	}
	return returnArray;
}

function hexify(array){
	return array.map( (val ) => {
		let hex = val.toString(16);
		if (hex.length == 1){
			hex = '0' + hex;
		}
		return hex;
	});
}

Hash.prototype.shift = function(instruction){
	this.reverse(this.currentPosition, instruction);
	this.currentPosition = (this.currentPosition + instruction + this.skipSize) % this.bits.length; 
	this.skipSize ++;
}

let knotHashPart2 = function(input, length){
	let hash = new Hash(input, length);
	return hash.compute();
}

console.log(knotHashPart2('63,144,180,149,1,255,167,84,125,65,188,0,2,254,229,24', 256))


