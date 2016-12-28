var messages = document.body.textContent.trim().split('\n');
// var messages = ['eedadn',
// 'drvtee',
// 'eandsr',
// 'raavrd',
// 'atevrs',
// 'tsrnev',
// 'sdttsa',
// 'rasrtv',
// 'nssdts',
// 'ntnada',
// 'svetve',
// 'tesnvt',
// 'vntsnd',
// 'vrdear',
// 'dvrsen',
// 'enarar'];
var columns = [];
for (var i = 0; i < messages.length; i++) {
    var message = messages[i];
    for (var j = 0; j < message.length; j++) {
        var letter = message[j];
        columns[j] = columns[j] || {};
        columns[j][letter] = columns[j][letter] || 0;
        columns[j][letter]++;
    }
}
var finalString = '';
for (var k = 0; k < columns.length; k++) {
    var object = columns[k];
    var topLetter;
    var topCount = 100000000;
    for (var letter in object) {
        if (object[letter] < topCount){
            topLetter = letter;
            topCount = object[letter];
        }
    }
    finalString += topLetter;
    console.log(topLetter);
}