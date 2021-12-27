var testInputDay72021 = "\n16,1,2,0,4,2,7,1,2,14\n";
var documentTextDay72021 = typeof document === "undefined"
    ? testInputDay72021
    : document.body.innerText;
var parseInputDay72021 = function (input) {
    return input
        .trim()
        .split(",")
        .map(function (str) { return +str; });
};
var calculateFuelToMove = function (target, positions) {
    return positions.reduce(function (sum, position) { return sum + Math.abs(position - target); }, 0);
};
var bruteForce = function (positions) {
    var min = Math.min.apply(Math, positions);
    var max = Math.max.apply(Math, positions);
    var mostEfficientFuel;
    var mostEfficientFuelPosition;
    for (var i = min; i < max; i++) {
        var fuelCost = calculateFuelToMove(i, positions);
        if (typeof mostEfficientFuel === "undefined") {
            mostEfficientFuel = fuelCost;
            mostEfficientFuelPosition = i;
        }
        else if (fuelCost < mostEfficientFuel) {
            mostEfficientFuel = fuelCost;
            mostEfficientFuelPosition = i;
        }
    }
    return [mostEfficientFuel, mostEfficientFuelPosition];
};
var solveDay72021P1 = function (input) {
    var solution = bruteForce(parseInputDay72021(input));
    console.log("solution", solution);
};
solveDay72021P1(documentTextDay72021);
var sumSeries = function (num) {
    var sum = 0;
    for (var i = 1; i <= num; i++) {
        sum += i;
    }
    return sum;
};
var calculateFuelToMove2 = function (target, positions) {
    return positions.reduce(function (sum, position) { return sum + sumSeries(Math.abs(position - target)); }, 0);
};
var bruteForce2 = function (positions) {
    var min = Math.min.apply(Math, positions);
    var max = Math.max.apply(Math, positions);
    var mostEfficientFuel;
    var mostEfficientFuelPosition;
    for (var i = min; i < max; i++) {
        var fuelCost = calculateFuelToMove2(i, positions);
        if (typeof mostEfficientFuel === "undefined") {
            mostEfficientFuel = fuelCost;
            mostEfficientFuelPosition = i;
        }
        else if (fuelCost < mostEfficientFuel) {
            mostEfficientFuel = fuelCost;
            mostEfficientFuelPosition = i;
        }
    }
    return [mostEfficientFuel, mostEfficientFuelPosition];
};
var solveDay72021P2 = function (input) {
    var solution = bruteForce2(parseInputDay72021(input));
    console.log("solution", solution);
};
solveDay72021P2(documentTextDay72021);
