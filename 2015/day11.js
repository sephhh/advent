var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

function isValid(password){
    var hasTriplet = false;
    var hasRepeats = false;
    var len = password.length;
    for (var i = 0; i < len; i++) {
        letter = password[i];
        if (letter === 'i' || letter === 'l' || letter === 'o' ){
            return false;
        }
        if (!hasTriplet && i < len - 2){
            var aIndex = alphabet.indexOf(letter);
            if ( alphabet[aIndex + 1] === password[i + 1] && alphabet[aIndex + 2] === password[i + 2] ){
                hasTriplet = true;
            }
        } 
    }
    var match = password.match(/.*(.)\1.*(.)\2.*/);
    hasRepeats = (match && match[1] !== match[2]);
    return hasTriplet && hasRepeats;

}


function incrementPassword(password){
    var lastLetter = password[password.length -1];
    if (lastLetter == 'z'){
        return incrementPassword(password.slice(0, password.length - 1)) + 'a';
    }
    else{
        var aIndex = alphabet.indexOf(lastLetter);
        return password.slice(0, password.length -1) + alphabet[aIndex + 1];
    }
}

function incrementUntilValid(input){
    while (true){
        if (isValid(input)){
            return input;
        }
        input = incrementPassword(input);
    }

}

incrementUntilValid('cqjxjnds');