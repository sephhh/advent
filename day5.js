function stringIsNice(string){
  var vowelCount = 0;
  var doubleLetter = false;
  var vowels = {
    a: true,
    e: true,
    i: true,
    o: true,
    u: true
  };
  var badStrings = ['ab', 'cd', 'pq', 'xy'];
  var strLeng = string.length;
  for (var i = 0; i < strLeng; i++) {
    var currentLetter = string[i];
    //if before last letter, check next letter for repeats or bad strings
    if (i + 1 < strLeng){
      var nextLetter = string[i+1]
      if (!doubleLetter && currentLetter === nextLetter){
        doubleLetter = true;
      }
      if (badStrings.indexOf(currentLetter + nextLetter) > -1){
        return false;
      }
    }
    if (vowels[currentLetter]){
      vowelCount += 1;
    }
  }

    console.log(doubleLetter);
    console.log(vowelCount);

  return doubleLetter && vowelCount >= 3;

}


var niceStringCount = 0;
var strings = document.body.textContent.split(/\n/);

for (var i = 0; i < strings.length; i++) {
  if (stringIsNice(strings[i])){
    niceStringCount += 1;
  }
};
console.log('total nice string count: ' +  niceStringCount);