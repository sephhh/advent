const buildRanges = (ruleInput) => {
    let ranges = ruleInput.reduce((ranges, ruleLine) => {
        const { min1, max1, min2, max2 } = parseRule(ruleLine);
        ranges.push([min1, max1]);
        ranges.push([min2, max2]);
        return ranges;
    }, []);
    ranges.sort((rangeA, rangeB) => rangeA[0] - rangeB[0]);
    return ranges;
};
const buildRangesMap = (ruleInput) => {
    return ruleInput.reduce((rangeRuleMap, ruleLine) => {
        const { min1, max1, min2, max2, fieldName } = parseRule(ruleLine);
        rangeRuleMap[fieldName] = [[min1, max1], [min2, max2]];
        return rangeRuleMap;
    }, {});
};
const isInRange = (number, range) => (number >= range[0] && number <= range[1]);
const parseRule = (line) => {
    const [_, fieldName, min1String, max1String, min2String, max2String] = line.match(/([\w\s]+): (\d+)-(\d+) or (\d+)-(\d+)/);
    const min1 = Number(min1String);
    const min2 = Number(min2String);
    const max1 = Number(max1String);
    const max2 = Number(max2String);
    return {
        min1, min2, max1, max2, fieldName
    };
};
const testInput = `
class: 1-3 or 5-7
row: 6-11 or 33-44
seat: 13-40 or 45-50

your ticket:
7,1,14

nearby tickets:
7,3,47
40,4,50
55,2,20
38,6,12
`;
const solvePart1 = (input) => {
    const [rules, yourTicket, nearbyTickets] = input.trim().split("\n\n");
    const validRanges = buildRanges(rules.split("\n"));
    let sum = 0;
    const ticketLines = nearbyTickets.split("\n");
    for (let i = 1; i < ticketLines.length; i++) {
        const ticketValues = ticketLines[i].split(",").map((numString) => Number(numString));
        for (let j = 0; j < ticketValues.length; j++) {
            const ticketValue = ticketValues[j];
            if (!validRanges.find((range) => isInRange(ticketValue, range))) {
                sum += ticketValue;
            }
        }
    }
    return sum;
};
const solvePart2 = (input) => {
    const [rules, yourTicket, nearbyTickets] = input.trim().split("\n\n");
    const rangeRuleMap = buildRangesMap(rules.split("\n"));
    const nearbyTicketLines = nearbyTickets.split("\n");
    nearbyTicketLines.shift();
    const parsedNearbyTickets = nearbyTicketLines.map((ticketLine) => ticketLine.split(",").map((numString) => Number(numString)));
    let indexRuleMap = {};
    const fieldNames = Object.keys(rangeRuleMap);
    const validNearbyTickets = parsedNearbyTickets.filter((ticket) => {
        return ticket.every((value) => fieldNames.find((fieldName) => {
            const rangesForRule = rangeRuleMap[fieldName];
            return rangesForRule.find((range) => isInRange(value, range));
        }));
    });
    const valuesPerTicket = validNearbyTickets[0].length;
    for (let i = 0; i < valuesPerTicket; i++) {
        const ticketValuesInCurrentSlot = validNearbyTickets.map((ticket) => ticket[i]);
        const possibleRangeNamesForFieldIndex = fieldNames.filter((fieldName) => {
            const rangesForRule = rangeRuleMap[fieldName];
            return ticketValuesInCurrentSlot.every((value) => {
                return rangesForRule.find((range) => isInRange(value, range)) !== undefined;
            });
        });
        indexRuleMap[i] = possibleRangeNamesForFieldIndex;
    }
    indexRuleMap = deduce(indexRuleMap);
    const myTicket = {};
    const myTicketValues = yourTicket.split("\n")[1].split(",").map((n) => Number(n));
    myTicketValues.forEach((value, i) => {
        const fieldName = indexRuleMap[i];
        myTicket[fieldName] = value;
    });
    let solution = 1;
    Object.keys(myTicket).forEach((fieldName) => {
        let line = '--------------------------------------------';
        line = fieldName + " " + line.slice(fieldName.length) + " " + myTicket[fieldName];
        console.log(line);
        if (fieldName.indexOf("departure") === 0) {
            solution = solution * myTicket[fieldName];
        }
    });
    return solution;
};
const deduce = (indexRuleMap) => {
    const keys = Object.keys(indexRuleMap);
    const singleRuleKeys = keys.filter((key) => indexRuleMap[key].length === 1);
    if (singleRuleKeys.length === 0) {
        console.log("UH OH stuck", indexRuleMap);
        return;
    }
    console.log("singleRuleKeys", singleRuleKeys.length, "out of", keys.length);
    if (singleRuleKeys.length === keys.length) {
        return keys.reduce((ruleMap, key) => ({
            ...ruleMap,
            [key]: indexRuleMap[key][0]
        }), {});
    }
    const simplifiedMap = indexRuleMap;
    singleRuleKeys.forEach((deducedKey) => {
        const fieldNameForDeducedKey = indexRuleMap[deducedKey][0];
        keys.forEach((key) => {
            if (key !== deducedKey) {
                simplifiedMap[key] = simplifiedMap[key].filter((fieldName) => fieldName !== fieldNameForDeducedKey);
            }
        });
    });
    return deduce(simplifiedMap);
};
const testInput2 = `
class: 0-1 or 4-19
row: 0-5 or 8-19
seat: 0-13 or 16-19

your ticket:
11,12,13

nearby tickets:
3,9,18
15,1,5
5,14,9
`;
// console.log(solvePart2(testInput2));
console.log(solvePart2(document.body.innerText));
