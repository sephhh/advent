const checkPassword = (string) => {
    var hasDouble = false;
    for (let i = 0; i < string.length; i++) {
        const digit = string[i];
        const nextDigit = string[i + 1];
        if (!hasDouble && digit === nextDigit && digit !== string[i + 2] && digit !== string[i - 1]){
            hasDouble = true;
        }
        if (nextDigit && Number(digit) > Number(nextDigit)){
            return false;
        }
    }
    return hasDouble;
}

console.log(checkPassword('111111'));
console.log(checkPassword('223450'));
console.log(checkPassword('123789'));
console.log(checkPassword('112233'));
console.log(checkPassword('123444'));
console.log(checkPassword('111122'));
console.log(checkPassword('124444'));




const start = 147981;
const end = 691423;
let sum = 0;
for (let i = start; i <= end; i++) {
    if (checkPassword(String(i))){
        sum++;
    }
}

console.log(sum);