var testInputDay82021 = "\nbe cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe\nedbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc\nfgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg\nfbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb\naecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea\nfgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb\ndbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe\nbdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef\negadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb\ngcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce\n";
var documentTextDay82021 = typeof document === "undefined"
    ? testInputDay82021
    : document.body.innerText;
var parseLineDay82021 = function (line) {
    var _a = line.split(" | "), rawPatterns = _a[0], rawCode = _a[1];
    var patterns = rawPatterns.split(" ");
    var code = rawCode.split(" ");
    return [patterns, code];
};
var strToArray = function (str) {
    if (typeof str !== "string") {
        throw new Error("cant do it");
    }
    return str.split("");
};
function arraySubtraction(array1, array2) {
    var newArray = [];
    array1.forEach(function (el) {
        if (!array2.includes(el)) {
            newArray.push(el);
        }
    });
    array2.forEach(function (el) {
        if (!array1.includes(el)) {
            newArray.push(el);
        }
    });
    return newArray;
}
var deduceLookupFromPatterns = function (patterns) {
    var signalCodex = {};
    var sevenSignals = strToArray(patterns.find(function (str) { return str.length === 3; }));
    var oneSignals = strToArray(patterns.find(function (str) { return str.length === 2; }));
    var aSignal = sevenSignals.find(function (str) { return !oneSignals.includes(str); });
    if (!aSignal) {
        throw new Error("unable to deduce A signal");
    }
    signalCodex[aSignal] = "a";
    var zeroSixAndNineSignals = patterns.filter(function (str) { return str.length === 6; });
    var cSignal = oneSignals.find(function (char) {
        return zeroSixAndNineSignals.some(function (string) { return string.indexOf(char) === -1; });
    });
    if (!cSignal) {
        throw new Error("unable to deduce C signal");
    }
    signalCodex[cSignal] = "c";
    var fSignal = oneSignals.find(function (char) { return char != cSignal; });
    if (!fSignal) {
        throw new Error("unable to deduce F signal");
    }
    signalCodex[fSignal] = "f";
    var threeSignals = strToArray(patterns
        .filter(function (str) { return str.length === 5; })
        .find(function (str) {
        return str.includes(aSignal) &&
            str.includes(cSignal) &&
            str.includes(fSignal);
    }));
    var fourSignals = strToArray(patterns.find(function (str) { return str.length === 4; }));
    var threeSignalsMinusSevenSignals = arraySubtraction(threeSignals, sevenSignals);
    var dSignal = threeSignalsMinusSevenSignals.find(function (char) {
        return fourSignals.includes(char);
    });
    if (!dSignal) {
        throw new Error("unable to deduce D signal");
    }
    signalCodex[dSignal] = "d";
    var bSignal = arraySubtraction(fourSignals, [
        cSignal,
        dSignal,
        fSignal,
    ])[0];
    if (!bSignal) {
        throw new Error("unable to deduce B signal");
    }
    signalCodex[bSignal] = "b";
    var gSignal = arraySubtraction(threeSignals, [
        aSignal,
        cSignal,
        dSignal,
        fSignal,
    ])[0];
    if (!gSignal) {
        throw new Error("unable to deduce G signal");
    }
    signalCodex[gSignal] = "g";
    var eightSignal = strToArray(patterns.find(function (str) { return str.length === 7; }));
    var eSignal = arraySubtraction(eightSignal, [
        aSignal,
        bSignal,
        cSignal,
        dSignal,
        fSignal,
        gSignal,
    ])[0];
    if (!eSignal) {
        throw new Error("unable to deduce E signal");
    }
    signalCodex[eSignal] = "e";
    return signalCodex;
};
var DECODED_NUMBER_LOOKUP = {
    abcefg: 0,
    cf: 1,
    acdeg: 2,
    acdfg: 3,
    bcdf: 4,
    abdfg: 5,
    abdefg: 6,
    acf: 7,
    abcdefg: 8,
    abcdfg: 9
};
function isNumberKey(key) {
    return key in DECODED_NUMBER_LOOKUP;
}
// 1 => --c--f- => 2
// 7 => a-c--f- => 3
// 4 => -bcd-f- => 4
// 2 => a-cde-g => 5
// 3 => a-cd-fg => 5
// 5 => ab-d-fg => 5
// 6 => ab-defg => 6
// 0 => abc-efg => 6
// 9 => abcd-fg => 6
// 8 => abcdefg => 7
var decode = function (code, signalLookup) {
    var codeLetters = strToArray(code);
    var decodedLetters = codeLetters.map(function (char) { return signalLookup[char]; });
    var decodedNumberKey = decodedLetters.sort().join("");
    if (isNumberKey(decodedNumberKey)) {
        return DECODED_NUMBER_LOOKUP[decodedNumberKey];
    }
    throw new Error("failed to decode, number not found");
};
var solveDay82021P1 = function (input) {
    var uniqueNumbers = new Set([1, 4, 7, 8]);
    var uniqueNumberCount = 0;
    var lines = input.trim().split("\n");
    lines.forEach(function (line) {
        var _a = parseLineDay82021(line), patterns = _a[0], codes = _a[1];
        if (!patterns || !codes) {
            throw new Error("invalid input");
        }
        var signalLookup = deduceLookupFromPatterns(patterns);
        codes.forEach(function (code) {
            var number = decode(code, signalLookup);
            if (uniqueNumbers.has(number)) {
                uniqueNumberCount++;
            }
        });
    });
    console.log("PART 1 answer", uniqueNumberCount);
};
solveDay82021P1(documentTextDay82021);
var solveDay82021P2 = function (input) {
    var codeSum = 0;
    var lines = input.trim().split("\n");
    lines.forEach(function (line) {
        var _a = parseLineDay82021(line), patterns = _a[0], codes = _a[1];
        if (!patterns || !codes) {
            throw new Error("invalid input");
        }
        var signalLookup = deduceLookupFromPatterns(patterns);
        var codeNumbers = codes.map(function (code) { return decode(code, signalLookup); });
        var jointCodeNumber = Number(codeNumbers.join(""));
        console.log("decoded line", jointCodeNumber);
        codeSum += jointCodeNumber;
    });
    console.log("PART 2 answer", codeSum);
};
solveDay82021P2(documentTextDay82021);
