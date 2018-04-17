var steps = document.body.innerText.trim().split('\n');
// var steps = [
// 0,
// 3,
// 0,
// 1,
// -3,
// ];
var answer = false;
var pointer = 0;
var numSteps = 0;
var currentStep;
function nextStep(){
  numSteps += 1;
  if (typeof steps[pointer] == 'undefined'){
    console.log(numSteps - 1);
    answer = numSteps - 1
    return;
  }
  currentStep = parseInt(steps[pointer]);
  // console.log('step index', pointer);
  // console.log('step value', currentStep);
  if (currentStep >= 3){
    steps[pointer] = currentStep - 1;
  }else{
    steps[pointer] = currentStep + 1;
  }
  // steps[pointer] = currentStep + 1;
  pointer += currentStep;
}

for (var i = 0; i < 50000000; i++) {
  if (!answer){
    nextStep();
  }else{
    break;
  }
}
console.log(currentStep, i);