var input = '1113122113';
// var input = '1';
var numTimes = 50;


function buildInstructions(string){
    var numInRow = 1;
    var instructionsArray = [];
    for (var i = 0; i < string.length; i++) {
        var currentChar = string[i];
        var nextChar = string[i + 1];
        if (currentChar === nextChar){
            numInRow++;
        }
        else{
            instructionsArray.push(numInRow, currentChar);
            numInRow = 1;
        }
    }
    return instructionsArray;
}


for (var i = 0; i < numTimes; i++) {
    input = buildInstructions(input).join('');
    // console.log(input).length;
}

console.log(input.length);