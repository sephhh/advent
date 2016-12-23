// var keypad = [
//     ['1', '2', '3'],
//     ['4', '5', '6'],
//     ['7', '8', '9']
// ];
var O = false;
var keypad = [
    [ O ,  O , '1',  O ,  O ],
    [ O , '2', '3', '4',  O ],
    ['5', '6', '7', '8', '9'],
    [ O , 'A', 'B', 'C',  O ],
    [ O ,  O , 'D',  O ,  O ]
];
//     1
//   2 3 4
// 5 6 7 8 9
//   A B C
//     D
var steps = document.body.textContent.trim().split('\n');
// var steps = ['ULL',
// 'RRDDD',
// 'LURDL',
// 'UUUUD',
// ];
var code = '';
var x = 2;
var y = 0;

var operationLookup = {
    U : function(){
        if (keypad[x-1] && keypad[x-1][y]){
            x-=1;
        }
    },
    D : function (){
        if (keypad[x+1] && keypad[x+1][y]){
            x+=1;
        }
    },
    R : function(){
        if (keypad[x][y+1]){
            y+=1;
        }
    },
    L : function(){
        if (keypad[x][y-1]){
            y-=1;
        }
    },
};

for (var i = 0; i < steps.length; i++) {
    var line = steps[i].trim();
    for (var j = 0; j < line.length; j++) {
        var direction = line[j];
        operationLookup[direction]();
        // console.log(keypad[x][y]);
    }
    code +=keypad[x][y];
    console.log(x, y);
    // console.log(keypad[x][y]);
}

console.log(code);


