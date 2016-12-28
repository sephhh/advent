var strings = document.body.textContent.trim().split('\n');
var array1 = [];
var sum1 = 0;
var sum2 = 0;
var sum3 = 0;

for (var i = 0; i < strings.length; i++) {
    if (testString1(strings[i])){
        sum1++;
    }
    if (testString2(strings[i])){
        sum2++;
    }
    if (testString3(strings[i])){

        sum3++;
    }
    // sum += (testString(strings[i]) ? 1 : 0);
}
console.log(sum1, sum2, sum3);
// function testString(string){
//     var badTestRegex = /\[\w*(\w)((?!\1).)\2\1\w*\]/;
//     var goodTestRegex = /(\w)((?!\1).)\2\1/;
//     return !string.match(badTestRegex) && string.match(goodTestRegex);
// }

function testString1(string){
    // var test1 = /(\w)((?!\1)\w)\1(?:\w*|\w*\[\w*\]\w*)\[\w*\2\1\2\w*\]/;
    // var test2 = /\[\w*(\w)((?!\1)\w)\1\w*\](?:\w*|\w*\[\w*\]\w*)\2\1\2/;
    var test1 = /(?![^\[]+])(.)((?!\1).)(\1).*\[[^\]]*?\2\1\2[^\]]*?\]/;
    var test2 = /\[[^\]]*?(.)((?!\1).)(\1)[^\]]*?\].*(?![^\[]+])\2\1\2/;
    // var match1 = string.match(test1);
    // var match2 = string.match(test2);
    // if (match1){
    //     console.log(match1[0], match1[1], match1[2]);
    //     // sum1++;
    // }
    // if (match2){
    //     console.log(match2[0], match2[1], match2[2]);
    //     // sum2++;
    // }
    return string.match(test1) || string.match(test2);
}
function testString2(string){
    var test1 = /(\w)((?!\1)\w)\1(?:\w*|\w*\[\w*\]\w*)\[\w*\2\1\2\w*\]/;
    var test2 = /\[\w*(\w)((?!\1)\w)\1\w*\](?:\w*|\w*\[\w*\]\w*)\2\1\2/;
    // var test1 = /(?![^\[]*])(.)((?!\1).)(\1).*\[[^\]]*?\2\1\2[^\]]*?\]/;
    // var test2 = /\[[^\]]*?(.)((?!\1).)(\1)[^\]]*?\].*(?![^\[]*])\2\1\2/;
    // var match1 = string.match(test1);
    // var match2 = string.match(test2);
    // if (match1){
    //     console.log(match1[0], match1[1], match1[2]);
    //     sum1++;
    // }
    // if (match2){
    //     console.log(match2[0], match2[1], match2[2]);
    //     sum2++;
    // }
    return string.match(test1) || string.match(test2);
}

// no further matches of 0 or more non-open bracket characters followed by close bracket

function testString3(string){
    var test1 = /(?![^\[]+])(.)((?!\1).)(\1).*\[[^\]]*?\2\1\2[^\]]*?\]/;
    var test2 = /\[[^\]]*?(.)((?!\1).)(\1)[^\]]*?\].*\2\1\2/;
    var match = string.match(test1) || string.match(test2);
    if (match && !testString1(string)){
        console.log(match);
    }
    return match;
}
// /(?![^\[]*])(.)((?!\1).)(\1).*\[[^\]]*?\2\1\2[^\]]*?\]/', $IP) || preg_match('/\[[^\]]*?(.)((?!\1).)(\1)[^\]]*?\].*(?![^\[]*])\2\1\2/
// 
// (:?\w*|\w*\[\w*\]\w*)

    // var test1 = /(?:(\w)((?!\1)\w)\1(?:\w*|\w*\[\w*\]\w*)\[\w*\2\1\2\w*\]|\[\w*(\w)((?!\1)\w)\1\w*\](?:\w*|\w*\[\w*\]\w*)\2\1\2/;
    // var test2 = /\[\w*(\w)((?!\1)\w)\1\w*\](?:\w*|\w*\[\w*\]\w*)\2\1\2/;


