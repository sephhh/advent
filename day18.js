var realgrid = document.body.textContent.split('\n').slice(0, 100);


function nextStep(grid){
  var onCount = 0;
  var newgrid = [];
  for (var i = 0; i < 100; i++) {
    for (var j = 0; j < 100; j++) {
      var neighborsOn = calculateNeighborsOn(grid, i, j);
      var currentVal = grid[i][j];
      var newVal = getNewVal(currentVal, neighborsOn);
      newgrid[i] = newgrid[i] || '';
      if ((i == 0 && j == 0) || (i == 99 && j == 0) || (i == 0 && j == 99) || (i == 99 && j == 99)){
        newVal = '#';
      }
      newgrid[i] += newVal;
      if (newVal == '#'){
        onCount += 1;
      }
    };
  };
  document.body.textContent = newgrid.join('\n');
  console.log(onCount);
  return newgrid;
}

function calculateNeighborsOn(grid, x, y){
  var count = 0;
  for (var i = -1; i < 2; i++) {
    for (var j = -1; j < 2; j++) {
      if (grid[x + i] && (i != 0 || j != 0) && grid[x+i][y+j] == '#'){
        count += 1;
      }
    };
  };
  return count;
}

function getNewVal(oldVal, neighborsOn){
  if (oldVal == '#'){
    return neighborsOn == 2 || neighborsOn == 3 ? '#' : '.';
  }
  if (oldVal == '.'){
    return neighborsOn == 3 ? '#' : '.';
  }
  else{
    debugger;
  }
}
var times = 0;
var interval = setInterval(function(){

  realgrid = nextStep(realgrid);
  times += 1;
  if (times == 100){
    clearInterval(interval);
  }
}, 50);
