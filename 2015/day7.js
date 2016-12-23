var wires = {};


function Wire (inputString){
    inputArray = inputString.split(' -> ');
    this.input = inputArray[0];
    this.name = inputArray[1];
    wires[this.name] = this;
    this.value = null;
}

Wire.prototype.calculateValue = function() {
    if (this.value){
        return this.value;
    }
    var inputArray = this.input.split(' ');
    console.log(inputArray);
    if (inputArray.length === 1){
        //straight number or other wire
        this.value = isNaN(parseInt(inputArray[0]))?wires[inputArray[0]].calculateValue():parseInt(inputArray[0]);
    }
    else if (inputArray.length === 2){
        //not
        var inputVal = isNaN(parseInt(inputArray[1]))?wires[inputArray[1]].calculateValue():parseInt(inputArray[1]);
        this.value = ~inputVal;
    }
    else if (inputArray.length === 3){
        //other operations
        // console.log(inputArray[0]);
        // console.log(inputArray[1]);
        // console.log(inputArray[2]);
        var value1 = isNaN(parseInt(inputArray[0]))?wires[inputArray[0]].calculateValue():parseInt(inputArray[0]);
        var value2 = isNaN(parseInt(inputArray[2]))?wires[inputArray[2]].calculateValue():parseInt(inputArray[2]);
        var operand = inputArray[1];

        // console.log(value1 + operand + value2);
        if (operand === 'AND'){
            this.value = value1 & value2;
        }
        else if (operand === 'OR'){
            this.value = value1 | value2;
        }
        else if (operand === 'LSHIFT'){
            this.value = value1 << value2;
        }
        else if(operand === 'RSHIFT'){
            this.value = value1 >> value2;
        }
        
    }
    if (this.value < 0){
        this.value = 65536 + this.value;
    }
    return this.value;
};

// var circuit = ['123 -> x',
// '456 -> y',
// 'x AND y -> d',
// 'x OR y -> e',
// 'x LSHIFT 2 -> f',
// 'y RSHIFT 2 -> g',
// 'NOT x -> h',
// 'NOT y -> i'];

var circuit = document.body.innerText.split('\n');

for (var i = 0; i + 1 < circuit.length; i++){
    var wire = new Wire (circuit[i]);
}


