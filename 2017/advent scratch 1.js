var passphrases = document.body.innerText.trim().split('\n');
var sum = 0;
for (var i = 0; i < passphrases.length; i++) {
  if (isValid2(passphrases[i])){
    sum+=1;
  }else{
    console.log(i, passphrases[i]);
  }
}

function isValid(passphrase){
  var words = passphrase.split(/\s/);
  var wordMap = {};
  for (var i = 0; i < words.length; i++) {
    if (wordMap[words[i]]){
      // console.log(words);
      return false;
    }
    wordMap[words[i]] = true;
  }
  return true;
}

function isValid2(passphrase){
  var words = passphrase.split(/\s/);
  var wordMap = {};
  for (var i = 0; i < words.length; i++) {
    var word = words[i];
    var sortedWord = Array.prototype.sort.apply(word.split("")).join('');
    if (wordMap[sortedWord]){
      console.log(word, sortedWord);
      return false;
    }
    wordMap[sortedWord] = true;
  }
  return true;
}