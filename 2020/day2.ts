const input: Array<string> = document.body.innerText.trim().split("\n");

const testInput: Array<string> = [
    "1-3 a: abcde",
    "1-3 b: cdefg",
    "2-9 c: ccccccccc",
];

const getCountValidPasswords = (input: Array<string>) :number => {
    let count = 0;
    for (let i = 0; i < input.length; i++) {
        const elements = input[i].split(" ");
        const range: Array<number> = elements[0].split("-").map((string) => Number(string));
        const target = elements[1].replace(":", "");
        const string = elements[2];
        const targetCount: number = [...string].reduce((prev, current) => current === target ? prev + 1 : prev, 0);
        if (targetCount >= range[0] && targetCount <=range[1] ){
            count++;
        }
    }
    return count;
}

console.log(getCountValidPasswords(testInput));
console.log(getCountValidPasswords(input));


const getCountValidPasswordsPart2 = (input: Array<string>) :number => {
    let count = 0;
    for (let i = 0; i < input.length; i++) {
        const elements = input[i].split(" ");
        const positions: Array<number> = elements[0].split("-").map((string) => Number(string));
        const target = elements[1].replace(":", "");
        const string = elements[2];
        const positionsWithTarget = positions.reduce(
            (prev, current) => string[current - 1] === target ? prev + 1 : prev,
            0
        );
        if (positionsWithTarget === 1){
            count++;
        }
    }
    return count;
}

console.log(getCountValidPasswordsPart2(testInput));
console.log(getCountValidPasswordsPart2(input));
