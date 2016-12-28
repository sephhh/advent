var alphabet = 'abcdefghijklmnopqrstuvwxyz';
var rooms = document.body.textContent.trim().split('\n');
var goodRooms = [];
var sum = 0;
// for (var i = 0; i < 2; i++) {
for (var i = 0; i < rooms.length; i++) {

    var room = rooms[i];
    
    sum+=roomSum(room);


}


function roomSum(room){
    var matches = room.match(/([\D]+)(\d+)\[(\w+)\]/);
    var letters = matches[1];
    var roomNumber = parseInt(matches[2]);
    var checksum = matches[3];
    var letterCounter = {};
    for (var j = 0; j < letters.length; j++) {
        var letter = letters[j];
        if (letter != '-'){
            letterCounter[letter] = letterCounter[letter] || 0;
            letterCounter[letter]++;
        }
    }
    var sortedLetters = [];
    for (var char in letterCounter) {
        sortedLetters[letterCounter[char]] = sortedLetters[letterCounter[char]] || [];
        sortedLetters[letterCounter[char]].push(char);
    }
    var finalString = '';
    for (var i = sortedLetters.length - 1; i >= 0; i--) {
        if (sortedLetters[i]){
            finalString += sortedLetters[i].sort().join('');
        }
    }
    // console.log(finalString);
    if (finalString.substr(0, 5) == checksum){
        goodRooms.push(decrypt(letters, roomNumber));
        return roomNumber;
    }else{
        return 0;
    }
}
function decrypt(letters, roomNumber){
    var finalString = '';
    for (var i = 0; i < letters.length; i++) {
        var index = alphabet.indexOf(letters[i]);
        if (index > -1){
            finalString += alphabet[(index + roomNumber)%26];
        }else{
            finalString += ' ';
        }
    }
    console.log(finalString, roomNumber);
}
