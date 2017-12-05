var end = 100;
var coords = [];


var x = 0;
var y = 0;
var step = 0;
var increment = 2;
var multiplier = 1;

for (var i = 1; i <= end; i++) {
  // console.log(i, x, y);
  // console.log(step);
  coords[i] = [x, y];

  if (step < increment/2){
    x+=1 * multiplier;
  }
  if (step >= increment/2){
    y+= 1 * multiplier;
  }

  step += 1;
  if (step >= increment){
    step = 0;
    increment += 2;
    multiplier *= -1;
  }
}
console.log(coords[i-1]);


var graph = {
  0:{
    0: 1
  }
};
var alerted = false;
for (var l = 2; l < coords.length; l++) {
  var currentSum = 0;
  var currentX = coords[l][0];
  var currentY = coords[l][1];
  for (var j = -1; j < 2; j++) {
    for (var k = -1; k < 2; k++) {
      var compareX = currentX + j;
      var compareY = currentY + k;
      if (graph[compareX] && graph[compareX][compareY]){
        currentSum += graph[compareX][compareY];
      }
    }
  }
  graph[currentX] = graph[currentX] || {};
  graph[currentX][currentY] = currentSum;
  if (currentSum > 368078){
    console.log(l, currentX, currentY)
  }
}

// x += 1
// y += 1

// x -= 1
// x -= 1
// y -= 1
// y -= 1

// x += 1
// x += 1
// x += 1
// y -= 1
// y -= 1
// y -= 1