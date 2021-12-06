var findEarliestBus = function (targetTime, busIds) {
    var earliestBus;
    var lowestDiff;
    for (var i = 0; i < busIds.length; i++) {
        var busId = busIds[i];
        var multiplier = Math.ceil(targetTime / busId);
        var diff = (multiplier * busId) - targetTime;
        if (typeof (lowestDiff) === "undefined" || diff < lowestDiff) {
            lowestDiff = diff;
            earliestBus = busId;
        }
    }
    return earliestBus;
};
var testInput = "\n939\n7,13,x,x,59,x,31,19\n";
var realInput = "\n1008832\n23,x,x,x,x,x,x,x,x,x,x,x,x,41,x,x,x,x,x,x,x,x,x,449,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,13,19,x,x,x,x,x,x,x,x,x,29,x,991,x,x,x,x,x,37,x,x,x,x,x,x,x,x,x,x,17\n";
var solvePart1 = function (input) {
    var _a = input.trim().split("\n"), targetTimeString = _a[0], busIdString = _a[1];
    var targetTime = Number(targetTimeString);
    var busIds = busIdString.split(",").filter(function (busId) { return busId != "x"; }).map(function (str) { return Number(str); });
    var earliestBus = findEarliestBus(targetTime, busIds);
    var waitTime = (Math.ceil(targetTime / earliestBus) * earliestBus) - targetTime;
    return waitTime * earliestBus;
};
var buildOffsetRequirements = function (busIds) {
    var requirements = [];
    for (var i = 0; i < busIds.length; i++) {
        var id = busIds[i];
        if (id !== "x") {
            requirements.push({
                offset: i,
                multiplier: Number(id)
            });
        }
    }
    requirements.sort(function (a, b) { return a.multiplier > b.multiplier ? -1 : 1; });
    return requirements;
};
var getBusIdsFromInput = function (input) { return input.trim().split("\n")[1].split(","); };
var solvePart2BruteForceWithManualSlightOptimization = function (input) {
    var requirements = buildOffsetRequirements(getBusIdsFromInput(input));
    var iterations = 0;
    var step = (23 * 449); // manual optimization for my particular input, since solution % 23 = 0, and solution % 449 = 23
    // let solutionTime = step - 23; // if you start here it only takes 62490415883 iterations to get to the answer!!!
    var solutionTime = 516350000010304;
    console.log("solution time", solutionTime);
    while (iterations < 15000000000) {
        if (doesTimeMeetAllRequirements(solutionTime, requirements)) {
            console.log("GOT IT", solutionTime);
            break;
        }
        solutionTime += step;
        iterations++;
    }
    console.log("solution time", solutionTime);
    console.log("iterations", iterations);
    return solutionTime;
};
var doesTimeMeetAllRequirements = function (time, reqs) {
    return reqs.every(function (req) {
        return (time + req.offset) % req.multiplier === 0;
    });
};
var mod = function (value, modulo) {
    return ((value % modulo) + modulo) % modulo;
};
var solvePart2InOptimalWayThatIStillDontReallyUnderstandTheMathOf = function (input) {
    var requirements = buildOffsetRequirements(getBusIdsFromInput(input));
    var index = 0;
    var result = mod(-1 * requirements[0].offset, requirements[0].multiplier);
    var complete = requirements[0].multiplier;
    while (index < requirements.length - 1) {
        var next = requirements[index + 1];
        if (mod(result, next.multiplier) === mod(next.multiplier - next.offset, next.multiplier)) {
            complete *= next.multiplier;
            index += 1;
        }
        else {
            result += complete;
        }
    }
    return result;
};
var testInput2 = "\nasdf\n17,x,13,19\n";
var testInput3 = "\nasdf\n67,7,59,61\n";
var testInput4 = "\nasdf\nx,3,x,x,5,x,7\n";
console.log(solvePart2InOptimalWayThatIStillDontReallyUnderstandTheMathOf(realInput));
