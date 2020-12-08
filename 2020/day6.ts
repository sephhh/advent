const testInput = `
abc

a
b
c

ab
ac

a
a
a
a

b
`;

const input = document.body.innerText.trim();

const getUniqueAnswersForGroup = (groupAnswers:string[]):Set<string> => {
    const uniqueAnswers:Set<string> = new Set();
    for (let i = 0; i < groupAnswers.length; i++) {
        const individualAnswers = groupAnswers[i];
        for (let j = 0; j < individualAnswers.length; j++) {
            uniqueAnswers.add(individualAnswers[j]);
        }
    }
    return uniqueAnswers;
}



const addUniqueAnswersForAllGroups = (rawInput: string) => {
    const groupAnswers: string[] = rawInput.trim().split("\n\n");
    return groupAnswers.reduce((count, groupString) => {
        return count + getUniqueAnswersForGroup(groupString.split("\n")).size
    }, 0);
}



console.log(addUniqueAnswersForAllGroups(testInput));

console.log(addUniqueAnswersForAllGroups(input));

const getUniformAnswersForGroup = (groupAnswers:string[]):Set<string> => {
    let uniformAnswers:string[] = [...groupAnswers[0]];
    for (let i = 1; i < groupAnswers.length; i++) {
        const nextIndividualAnswers:string[] = [...groupAnswers[i]];
        uniformAnswers = uniformAnswers.filter((char) => nextIndividualAnswers.indexOf(char) > -1);
    }
    return new Set(uniformAnswers);
}

const addUniformAnswersForAllGroups = (rawInput: string) => {
    const groupAnswers: string[] = rawInput.trim().split("\n\n");
    return groupAnswers.reduce((count, groupString) => {
        return count + getUniformAnswersForGroup(groupString.split("\n")).size
    }, 0);
}


console.log(addUniformAnswersForAllGroups(testInput));

console.log(addUniformAnswersForAllGroups(input));

