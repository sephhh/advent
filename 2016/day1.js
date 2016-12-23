var steps = document.body.textContent.split(', ');
var x = 0;
var y = 0;
var currentDirection = 'up';
//if left, subtract from x
//if right, add to x
//if up, add to x
//if down, subtract from x


var directionsLookup = {
    up : {
        L : 'left',
        R : 'right',
    },
    down : {
        L : 'right',
        R : 'left'
    },
    right : {
        L : 'up',
        R : 'down',
    },
    left : {
        L : 'down',
        R : 'up',
    }
};
var operationLookup = {
    left : function(distance){
        for (var i = 0; i < distance; i++) {
            x -= 1;
            logPosition();
        }
    },
    right : function (distance){
        for (var i = 0; i < distance; i++) {
            x += 1;
            logPosition();
        }
    },
    up : function(distance){
        for (var i = 0; i < distance; i++) {
            y += 1;
            logPosition();
        }
    },
    down : function(distance){
        for (var i = 0; i < distance; i++) {
            y -= 1;
            logPosition();
        }
    },
};
var xyCheck = [
    ['X']
];
for (var i = 0; i < steps.length; i++) {
    var instructions = steps[i].trim();
    var turn = instructions[0];
    var distance = parseInt(instructions.substr(1));
    currentDirection = directionsLookup[currentDirection][turn];
    operationLookup[currentDirection](distance);
}
function logPosition (){
    if (xyCheck[x] && xyCheck[x][y]){
        console.log('FOUND IT: ', x , y);
    }else{
        xyCheck[x] = xyCheck[x] || [];
        xyCheck[x][y] = '#';
    }
}
var stringArray = [];
for (var i = -50; i < 200; i++) {
   var string = '';
   for (var j = -50; j < 200; j++) {
        string += (xyCheck[i] && xyCheck[i][j]) || ' ';
       // if (xyCheck[i] && xyCheck[i][j]){
       //  string+='0';
       // }else{
       //  string+=' ';
       // }
   }
   stringArray.push(string);
}
stringArray.join('\n')

