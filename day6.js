var lightGrid = [];

for (var i = 0; i < 1000; i++) {
    lightGrid[i] = [];
    for (var j = 0; j < 1000; j++) {
        lightGrid[i][j] = false;
    }
}

function countLights(lightGrid){
    var count = 0;
    for (var i = 0; i < 1000; i++) {
        for (var j = 0; j < 1000; j++) {
            if (lightGrid[i][j]){
                count += 1;
            }
        }
    }
    return count;
}

function updateGrid(instruction, array1, array2){
    xStart = parseInt(array1[0]);
    xEnd = parseInt(array2[0]);
    yStart = parseInt(array1[1]);
    yEnd = parseInt(array2[1]);

    for (var i = xStart; i <= xEnd; i++){
        for (var j = yStart; j <= yEnd; j++){
            if (instruction === 'turn off' ){
                lightGrid[i][j] = false;
            }
            else if (instruction === 'turn on'){
                lightGrid[i][j] = true;
            }
            else if (instruction === 'toggle'){
                lightGrid[i][j] = !lightGrid[i][j];
            }
            else{
                console.log('instruction not found');
            }
        }
    }
}

var instructions = document.body.textContent.split(/\n/);
for (var i = 0; i < instructions.length; i++) {
    var match = instructions[i].match(/(\w+ ?[\D]*) ([\d,]+) through ([\d,]+)/);
    if (match){
        var instruction = match[1];
        var array1 = match[2].split(',');
        var array2 = match[3].split(',');
        updateGrid(instruction, array1, array2);
    }
    else{
        console.log(instructions[i]);
    }
}

var count = countLights(lightGrid);
console.log('count is ' + count);


