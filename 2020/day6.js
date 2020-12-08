var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var testInput = "\nabc\n\na\nb\nc\n\nab\nac\n\na\na\na\na\n\nb\n";
var input = document.body.innerText.trim();
var getUniqueAnswersForGroup = function (groupAnswers) {
    var uniqueAnswers = new Set();
    for (var i = 0; i < groupAnswers.length; i++) {
        var individualAnswers = groupAnswers[i];
        for (var j = 0; j < individualAnswers.length; j++) {
            uniqueAnswers.add(individualAnswers[j]);
        }
    }
    return uniqueAnswers;
};
var addUniqueAnswersForAllGroups = function (rawInput) {
    var groupAnswers = rawInput.trim().split("\n\n");
    return groupAnswers.reduce(function (count, groupString) {
        return count + getUniqueAnswersForGroup(groupString.split("\n")).size;
    }, 0);
};
console.log(addUniqueAnswersForAllGroups(testInput));
console.log(addUniqueAnswersForAllGroups(input));
var getUniformAnswersForGroup = function (groupAnswers) {
    var uniformAnswers = __spreadArrays(groupAnswers[0]);
    var _loop_1 = function (i) {
        var nextIndividualAnswers = __spreadArrays(groupAnswers[i]);
        uniformAnswers = uniformAnswers.filter(function (char) { return nextIndividualAnswers.indexOf(char) > -1; });
    };
    for (var i = 1; i < groupAnswers.length; i++) {
        _loop_1(i);
    }
    return new Set(uniformAnswers);
};
var addUniformAnswersForAllGroups = function (rawInput) {
    var groupAnswers = rawInput.trim().split("\n\n");
    return groupAnswers.reduce(function (count, groupString) {
        return count + getUniformAnswersForGroup(groupString.split("\n")).size;
    }, 0);
};
console.log(addUniformAnswersForAllGroups(testInput));
console.log(addUniformAnswersForAllGroups(input));
