function redistribute(array){
  var maxIndex;
  var max = 0;
  for (var i = 0; i < array.length; i++) {
    if (array[i] > max){
      max = array[i];
      maxIndex = i;
    }
  }
  // console.log(max, maxIndex);
  var currentIndex = maxIndex;
  array[maxIndex] = 0;
  for (var j = 0; j < max; j++) {
    
    currentIndex = ((currentIndex + 1) % array.length);
    array[currentIndex] += 1;
    // console.log(currentIndex, array[currentIndex]);
  }
  return array;
}

// fullyRedistribute([0, 2, 7, 0])

fullyRedistribute([4,1,15,12,0,9,9,5,5,8,7,3,14,5,12,3]);

function fullyRedistribute(array){
  var states = {};
  var stringifiedArray = '';
  for (var i = 0; i < 100000; i++) {
    stringifiedArray = array.join(',');
    if (typeof(states[stringifiedArray]) != 'undefined') {
      console.log('orig cycle', states[stringifiedArray]);
      console.log('dupe cycle', i);
      console.log('took', i - states[stringifiedArray]);
      return i;
    }
    states[stringifiedArray] = i;
    array = redistribute(array);
  }
  console.log(array, 'not enough times');
}