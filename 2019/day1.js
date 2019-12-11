const getFuelFromMass = (mass) => {
    return Math.floor(mass / 3) - 2;
}


const input = document.body.innerText.trim().split("\n");
let sumPart1 = 0;
for (let i = 0; i < input.length; i++) {
    sumPart1 += getFuelFromMass(+input[i]);
}
console.log("sumPart1", sumPart1);


const getFuelFromMassAndFuel = (mass) => {
    const fuelForMass = getFuelFromMass(mass);
    if (fuelForMass <= 0){
        return 0;
    }
    const fuelForFuel = getFuelFromMassAndFuel(fuelForMass);
    if (fuelForFuel <= 0){
        return fuelForMass;
    }
    return fuelForMass + fuelForFuel;
}

console.log(getFuelFromMassAndFuel(14));
console.log(getFuelFromMassAndFuel(1969));
console.log(getFuelFromMassAndFuel(100756));

let sumPart2 = 0;

for (let i = 0; i < input.length; i++) {
    sumPart2 += getFuelFromMassAndFuel(+input[i]);
}
console.log("sumPart2", sumPart2);


