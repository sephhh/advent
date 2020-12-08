var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var testInput = "\necl:gry pid:860033327 eyr:2020 hcl:#fffffd\nbyr:1937 iyr:2017 cid:147 hgt:183cm\n\niyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884\nhcl:#cfa07d byr:1929\n\nhcl:#ae17e1 iyr:2013\neyr:2024\necl:brn pid:760753108 byr:1931\nhgt:179cm\n\nhcl:#cfa07d eyr:2025 pid:166559648\niyr:2011 ecl:brn hgt:59in\n";
var testValidInput = "\npid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980\nhcl:#623a2f\n\neyr:2029 ecl:blu cid:129 byr:1989\niyr:2014 pid:896056539 hcl:#a97842 hgt:165cm\n\nhcl:#888785\nhgt:164cm byr:2001 iyr:2015 cid:88\npid:545766238 ecl:hzl\neyr:2022\n\niyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719\n";
var testInvalidInput = "\neyr:1972 cid:100\nhcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926\n\niyr:2019\nhcl:#602927 eyr:1967 hgt:170cm\necl:grn pid:012533040 byr:1946\n\nhcl:dab227 iyr:2012\necl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277\n\nhgt:59cm ecl:zzz\neyr:2038 hcl:74454a iyr:2023\npid:3556412378 byr:2007\n";
var input = document.body.innerText.trim();
var REQUIRED_FIELD_KEYS = [
    "byr",
    "iyr",
    "eyr",
    "hgt",
    "hcl",
    "ecl",
    "pid",
];
var REQUIRED_FIELD_RULES = {
    "byr": function (value) { return /^\d{4}$/.test(value) && Number(value) >= 1920 && Number(value) <= 2002; },
    "iyr": function (value) { return /^\d{4}$/.test(value) && Number(value) >= 2010 && Number(value) <= 2020; },
    "eyr": function (value) { return /^\d{4}$/.test(value) && Number(value) >= 2020 && Number(value) <= 2030; },
    "hgt": function (value) {
        var height = Number(value.slice(0, -2));
        var unit = value.slice(-2);
        if (unit === "cm") {
            return height >= 150 && height <= 193;
        }
        if (unit === "in") {
            return height >= 59 && height <= 76;
        }
        return false;
    },
    "hcl": function (value) { return /^#[0-9a-f]{6}$/.test(value); },
    "ecl": function (value) { return /^(amb|blu|brn|gry|grn|hzl|oth)$/.test(value); },
    "pid": function (value) { return /^\d{9}$/.test(value); }
};
var isDocumentValid = function (document) {
    var fields = document.trim().split(/\s/);
    var presentFieldKeyLookup = fields.reduce(function (lookup, field) {
        var _a;
        var fieldKey = field.split(":")[0];
        return __assign(__assign({}, lookup), (_a = {}, _a[fieldKey] = true, _a));
    }, {});
    return REQUIRED_FIELD_KEYS.every(function (fieldKey) { return presentFieldKeyLookup[fieldKey]; });
};
var countValidDocuments = function (input) {
    return input.trim().split("\n\n").filter(isDocumentValid).length;
};
console.log(countValidDocuments(testInput));
console.log(countValidDocuments(input));
var isDocumentValid2 = function (document) {
    var fields = document.trim().split(/\s/);
    var presentFieldKeyLookup = fields.reduce(function (lookup, field) {
        var _a;
        var _b = field.split(":"), fieldKey = _b[0], fieldValue = _b[1];
        return __assign(__assign({}, lookup), (_a = {}, _a[fieldKey] = fieldValue, _a));
    }, {});
    return Object.keys(REQUIRED_FIELD_RULES).every(function (fieldKey) {
        var fieldRule = REQUIRED_FIELD_RULES[fieldKey];
        var fieldValue = presentFieldKeyLookup[fieldKey];
        return fieldValue && fieldRule(fieldValue);
    });
};
var countValidDocuments2 = function (input) {
    return input.trim().split("\n\n").filter(isDocumentValid2).length;
};
console.log(countValidDocuments2(testValidInput));
console.log(countValidDocuments2(testInvalidInput));
console.log(countValidDocuments2(input));
