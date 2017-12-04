var rows = document.body.innerText.trim().split("\n");

var rows = [
[5, 1, 9, 5],
[7, 5, 3],
[2, 4, 6, 8],
]
var sum = 0;
for (var i = 0; i < rows.length; i++) {
  var row = rows[i].split(/\s/);
  // var row = rows[i];
  var lowest = 0;
  var highest = 0;
  for (var k = 0; k < row.length; k++) {
    var current = parseInt(row[k]);
    console.log(current);
    if (!lowest || current < lowest){
      lowest = current;
    }
    if (!highest || current > highest){
      highest = current;
    }
  }
  console.log(highest, lowest);
  sum += (highest - lowest);
}

var rows = [
[5, 9, 2, 8],
[9, 4, 7, 3],
[3, 8, 6, 5],
]

var rows = document.body.innerText.trim().split("\n");

var sum = 0;
for (var i = 0; i < rows.length; i++) {
  var row = rows[i].split(/\s/);
  // var row = rows[i];
  sum += getFirstModulo(row);
}


function getFirstModulo(row){
  for (var k = 0; k < row.length; k++) {
    var current = parseInt(row[k]);
    var evenDivider = getModuloIfAny(current, row, k);
    if (evenDivider){
      return evenDivider;
    }
  }
}

function getModuloIfAny(current, row, index){
  for (var i = index + 1; i < row.length; i++) {
    var other = parseInt(row[i]);
    if (current % other === 0){
      console.log(current, other);
      return current / other;
    }
    if (other % current === 0){
      console.log(current, other);
      return other / current;
    }
  }
}
