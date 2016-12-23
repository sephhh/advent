var locations = {};

var lines = document.body.innerText.split('\n');

for (var i = 0; i < lines.length - 1; i++) {
    var lineArray = lines[i].split(' '),
        fromLoc = lineArray[0],
        toLoc = lineArray[2],
        distance = parseInt(lineArray[4]);
    locations[fromLoc] = locations[fromLoc] || {};
    locations[fromLoc][toLoc] = distance;
    locations[toLoc] = locations[toLoc] || {};
    locations[toLoc][fromLoc] = distance;
}

var shortestDistance = false;
var paths = [];

function findPathLength(fromLoc, pathLength, currentPath, locationsLeft){

    if (locationsLeft.length === 1){
        var newFromLoc = locationsLeft[0];
        console.log(currentPath.concat(newFromLoc));
        var totalPath = pathLength + (locations[fromLoc][newFromLoc]);
        // return totalPath <= shortestPath ? totalPath : shortestPath;
        if (shortestDistance === false || shortestDistance <= totalPath){
            shortestDistance = totalPath;
            console.log(shortestDistance);
        }
        return totalPath;
    }
    else{
        for (var i = 0; i < locationsLeft.length; i++) {
            var newFromLoc = locationsLeft[i];
            var newPathLength;
            if(fromLoc){
                newPathLength = pathLength + locations[fromLoc][newFromLoc];
            }
            else{
                newPathLength = 0;
            }
            var newCurrentPath = currentPath.concat(newFromLoc);
            var newLocationsLeft = locationsLeft.slice(0, i).concat(locationsLeft.slice(i + 1));
            // console.log(newLocationsLeft);
            findPathLength(newFromLoc, newPathLength, newCurrentPath, newLocationsLeft);
        }
    }
}

findPathLength(null, 0, [], Object.keys(locations));
