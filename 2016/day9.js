// // PART 1:

// var text = document.body.textContent.trim();

// var finalCount = 0;
// var totalDecompressionCalls = 0;

// function decompressText(text){
//     totalDecompressionCalls++;
//     if (totalDecompressionCalls % 10000){
//         console.log(totalDecompressionCalls);
//     }
//     var marked = {};
//     for (var i = 0; i < text.length; i++) {
//         if (!marked[i] && text[i] == '('){
//             var nextCloseParenIndex = i + text.slice(i).indexOf(')');
//             var repeatstringStart = nextCloseParenIndex + 1;
//             var instructions = text.slice(i+1, nextCloseParenIndex);
//             var repeatLength = parseInt(instructions.split('x')[0]);
//             var repeatTimes = parseInt(instructions.split('x')[1]);
//             // for (var j = i; j < repeatstringStart; j++) {
//             for (var j = i; j < repeatstringStart + repeatLength; j++) {
//                 marked[j] = true;
//             }
//             // var repeatText = decompressText(text.slice(repeatstringStart, repeatstringStart + repeatLength));
//             var repeatText = text.slice(repeatstringStart, repeatstringStart + repeatLength);
//             var multipliedRepeatText = '';
//             for (var k = 0; k < repeatTimes; k++) {
//                 multipliedRepeatText += repeatText;
//             }
//             finalCount+=multipliedRepeatText.length;
//         }
//         else if (!marked[i]){
//             finalCount++;
//         }
//     }
// }

// decompressText(text);
// finalCount;





// PART 2:


var text = document.body.textContent.trim();
// var text = '(27x12)(20x12)(13x14)(7x10)(1x12)A';
// var text = 'X(8x2)(3x3)ABCY';
var totalDecompressionCalls = 0;
var timesToRun = 1;
var startTime = new Date();
for (var i = 0; i < timesToRun; i++) {
    var cache = {};
    console.log(decompressText(text));
}
var totalTime = new Date() - startTime;
console.log('total time:', totalTime);
console.log('average time:', totalTime / timesToRun);
console.log('time per iteration', totalTime/totalDecompressionCalls);


function decompressText(text){
    if (cache[text]){
        return cache[text];
    }
    // console.log(text);
    totalDecompressionCalls++;
    if (totalDecompressionCalls % 100000 == 0){
        console.log(totalDecompressionCalls);
    }
    var count = 0;
    var nextCloseParenIndex = -1;
    for (var i = 0; i < text.length; i++) {
        if (i > nextCloseParenIndex && text[i] == '('){
            nextCloseParenIndex = text.indexOf(')', i);
            var repeatstringStart = nextCloseParenIndex + 1;
            var instructions = text.slice(i+1, nextCloseParenIndex).split('x');
            var repeatLength = parseInt(instructions[0]);
            var repeatTimes = parseInt(instructions[1]);
            var repeatText = text.slice(repeatstringStart, repeatstringStart + repeatLength);
            for (var k = 0; k < repeatTimes -1; k++) {
                count += decompressText(repeatText);
            }
        }else if (i > nextCloseParenIndex){
            count++;
        }
    }
    cache[text] = count;
    // finalCount += count;
    return count;
}
