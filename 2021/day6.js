var testInputDay62021 = "\n3,4,3,1,2\n";
var documentTextDay62021 = typeof document === "undefined"
    ? testInputDay62021
    : document.body.innerText;
var parseInputDay62021 = function (input) {
    return input
        .trim()
        .split(",")
        .map(function (str) { return +str; });
};
var birthAndTick = function (fishState) {
    var newFishState = [];
    fishState.forEach(function (num) {
        if (num <= 0) {
            newFishState.push(6); // reset
            newFishState.push(8); // new born
        }
        else {
            newFishState.push(num - 1);
        }
    });
    return newFishState;
};
var solveDay62021P1 = function (input, numDays) {
    var fishState = parseInputDay62021(input);
    for (var i = 0; i < numDays; i++) {
        fishState = birthAndTick(fishState);
    }
    console.log("ANSWER", fishState.length);
};
solveDay62021P1(documentTextDay62021, 80);
var CACHE = {};
var USAGE = {};
var getEventualCount = function (fishState, numDays, count) {
    var _a;
    if (count === void 0) { count = 1; }
    var hash = "fishState-" + fishState + "-numDays-" + numDays;
    var cachedCount = CACHE[hash];
    if (typeof cachedCount !== "undefined") {
        var usageCount = (_a = USAGE[hash]) !== null && _a !== void 0 ? _a : 0;
        usageCount++;
        USAGE[hash] = usageCount;
        return cachedCount;
    }
    var eventualCount;
    if (numDays === 0) {
        eventualCount = count;
    }
    else if (fishState === 0) {
        eventualCount =
            getEventualCount(6, numDays - 1, count) +
                getEventualCount(8, numDays - 1, count);
    }
    else {
        eventualCount = getEventualCount(fishState - 1, numDays - 1, count);
    }
    CACHE[hash] = eventualCount;
    return eventualCount;
};
var solveDay62021P2 = function (input, numDays) {
    var fishState = parseInputDay62021(input);
    var totalFish = 0;
    fishState.forEach(function (fishState) { return (totalFish += getEventualCount(fishState, numDays)); });
    console.log("ANSWER", totalFish);
};
solveDay62021P2(documentTextDay62021, 256);
