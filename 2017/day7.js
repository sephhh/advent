// const input =[
// 	'pbga (66)',
// 	'xhth (57)',
// 	'ebii (61)',
// 	'havc (66)',
// 	'ktlj (57)',
// 	'fwft (72) -> ktlj, cntj, xhth',
// 	'qoyq (66)',
// 	'padx (45) -> pbga, havc, qoyq',
// 	'tknk (41) -> ugml, padx, fwft',
// 	'jptl (61)',
// 	'ugml (68) -> gyxo, ebii, jptl',
// 	'gyxo (61)',
// 	'cntj (57)',
// ];
// const parent = 'tknk';
const input = document.body.innerText.trim().split('\n');
const parent = 'azqje';

let directory = {};
let childrenMap = {};

for (let i = 0; i < input.length; i++) {
	let inputLine = input[i];
	let key = inputLine.split(' ')[0];
	let weight = parseInt(inputLine.match(/(\d+)/)[1]);
	let children = inputLine.split('-> ')[1] && inputLine.split('-> ')[1].split(', ');
	let node = new Node(key, weight, children);
	directory[key] = node;
}

function Node(key, weight, children){
	this.key = key;
	this.weight = weight;
	this.children = children || [];
	for (let i = 0; i < this.children.length; i++) {
		childrenMap[this.children[i]] = this.key;
	}
}

Node.prototype.getTotalWeight = function(){
	let totalWeight = this.weight;
	for (let i = 0; i < this.children.length; i++) {
		totalWeight += directory[this.children[i]].getTotalWeight();
	}
	return totalWeight;
};

let count = 0;

let imbalancedEndNodes = [];
function findImbalance(key){
	count++;
	// console.log(count);
	if (count < 50000){
		let node = directory[key];
		if (!node){
			debugger;
		}
		if (!node.children.length){
			// console.log(key);
			imbalancedEndNodes.push(key);
			return 'end';
		}
		let childWeights = [];
		let imbalance = false;
		for (let i = 0; i < node.children.length; i++) {
			let childNode = directory[node.children[i]];
			childWeights.push(childNode.getTotalWeight());
			if (childWeights[i] && childWeights[i-1] && childWeights[i] != childWeights[i-1]){
				imbalance = true;
			}
		}
		if (imbalance){
			console.log(key, 'imbalance perceived');
			console.log(childWeights, node.children);
			for (let i = 0; i < node.children.length; i++) {
				if (findImbalance(node.children[i]) == 'end'){
					console.log('ENDNOD', key, node.children[i]);
				}

			}
		}else{
			// console.log(key, 'balanced!!!! yayyyyy');
		}


	}
}
findImbalance(parent);


