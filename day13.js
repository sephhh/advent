var happinessKey = {};

var lines = document.body.innerText.split('\n');

for (var i = 0; i < lines.length; i++) {
    readLine(lines[i]);
}

function readLine(inputLine){
    var match = inputLine.match(/(\w+) would (\w+) (\d+) happiness units by sitting next to (\w+)./);
    if (match){
        var name = match[1];
        var plusOrMinus = match[2];
        var amt = parseInt(match[3]);
        var neighbor = match[4];
        if (!happinessKey[name]){
            happinessKey[name] = {};
        }
        if (plusOrMinus === "lose"){
            amt = amt * -1;
        }
        happinessKey[name][neighbor] = amt;
    }
}

var guestNames = Object.keys(happinessKey);

happinessKey.Seph = {};

for (var k = 0; k < guestNames.length; k++) {
    happinessKey.Seph[guestNames[k]] = 0;
    happinessKey[guestNames[k]].Seph = 0;
}
 

function Guest(name, right, left){
    this.name = name;
    this.left = left;
    this.right = right;
    this.value = happinessKey[name][left] + happinessKey[name][right];
}

function calculateTotalHappiness(seatingArray){
    var totalHappiness = 0;
    for (var i = 0; i < seatingArray.length; i++) {
        var guest = new Guest (seatingArray[i], seatingArray[(i+1)%9], seatingArray[(i+8)%9]);
        totalHappiness += guest.value;
    }
    return totalHappiness;
}

var seatingArray = [];

var maxHappiness = 0;
var bestConfig = null;
function findAllCombos(head, tail){
    if (head.length === 9){
        var hapinessForCurrentConfig = calculateTotalHappiness(head);
        if (hapinessForCurrentConfig > maxHappiness){
            maxHappiness = hapinessForCurrentConfig;
            bestConfig = head;
        }
        return hapinessForCurrentConfig;
    }
    else{
        for (var i = 0; i < tail.length; i++) {
            // debugger;
            var newHead = head.concat(tail[i]);
            var newTail = tail.slice(0, i).concat(tail.slice(i + 1, tail.length));
            findAllCombos(newHead, newTail);
        } 
    }
}
findAllCombos([], Object.keys(happinessKey));
