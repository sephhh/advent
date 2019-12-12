




const processOpcode = function(program, input, output, pointer = 0){
    const instruction = program[pointer];
    const instructionString = String(instruction).padStart(5, 0);
    const opcode = instructionString.slice(3);
    const param1Mode = instructionString[2];
    const param2Mode = instructionString[1];

    let param1 = program[pointer + 1];
    let param2  = program[pointer + 2];
    let param3 = program[pointer + 3];

    const translateParam1 = () => param1Mode === '0' ? program[param1] : param1;
    const translateParam2 = () => param2Mode === '0' ? program[param2] : param2;

    // console.log(pointer, instruction, "parsed:", opcode, opcode === '03' ? param1 : translateParam1(), translateParam2(), param3);

    switch (opcode) {
        case '01':
            program[param3] = translateParam1() + translateParam2();
            pointer += 4;
            break;
        case '02':
            program[param3] = translateParam1() * translateParam2();
            pointer += 4;
            break;
        case '03':
            program[param1] = input;
            pointer += 2;
            break;
        case '04':
            // console.log("OUTPUTTING: ", translateParam1());
            output = translateParam1();
            pointer += 2;
            break;
        case '05':
            if (translateParam1() !== 0){
                pointer = translateParam2();
            } else {
                pointer += 3;
            }
            break;
        case '06':
            if (translateParam1() === 0){
                pointer = translateParam2();
            } else {
                pointer += 3;
            }
            break;
        case '07':
            if (translateParam1() < translateParam2()){
                program[param3] = 1;
            } else {
                program[param3] = 0;
            }
            pointer += 4;
            break;
        case '08':
            if (translateParam1() === translateParam2()){
                program[param3] = 1;
            } else {
                program[param3] = 0;
            }
            pointer += 4;
            break;
        case '99':
            return output;    
        default:
            console.log("ERROR: no valid instruction", opcode, pointer, program);
            return;
    }
    return processOpcode(program, input, output, pointer);
}


// const equalToEightProgram = [3,3,1108,-1,8,3,4,3,99];

// console.log(processOpcode(equalToEightProgram, 8));
// console.log(processOpcode(equalToEightProgram, 9));
// console.log(processOpcode(equalToEightProgram, 7));


// const lessThan8 = [3,9,7,9,10,9,4,9,99,-1,8];

// console.log(processOpcode(lessThan8, 8));
// console.log(processOpcode(lessThan8, 9));
// console.log(processOpcode(lessThan8, 7));

// const equal8too = [3,3,1108,-1,8,3,4,3,99];

// console.log(processOpcode(equal8too, 8));
// console.log(processOpcode(equal8too, 9));
// console.log(processOpcode(equal8too, 7));


// const less8too = [3,3,1107,-1,8,3,4,3,99];

// console.log(processOpcode(less8too, 8));
// console.log(processOpcode(less8too, 9));
// console.log(processOpcode(less8too, 7));

let program1 = [3,225,1,225,6,6,1100,1,238,225,104,0,1102,78,40,225,1102,52,43,224,1001,224,-2236,224,4,224,102,8,223,223,101,4,224,224,1,224,223,223,1,191,61,224,1001,224,-131,224,4,224,102,8,223,223,101,4,224,224,1,223,224,223,1101,86,74,225,1102,14,76,225,1101,73,83,224,101,-156,224,224,4,224,102,8,223,223,101,6,224,224,1,224,223,223,1102,43,82,225,2,196,13,224,101,-6162,224,224,4,224,102,8,223,223,101,5,224,224,1,223,224,223,1001,161,51,224,101,-70,224,224,4,224,102,8,223,223,1001,224,1,224,1,224,223,223,102,52,187,224,1001,224,-832,224,4,224,102,8,223,223,101,1,224,224,1,224,223,223,1102,19,79,225,101,65,92,224,1001,224,-147,224,4,224,1002,223,8,223,101,4,224,224,1,223,224,223,1102,16,90,225,1102,45,44,225,1102,92,79,225,1002,65,34,224,101,-476,224,224,4,224,102,8,223,223,1001,224,5,224,1,224,223,223,4,223,99,0,0,0,677,0,0,0,0,0,0,0,0,0,0,0,1105,0,99999,1105,227,247,1105,1,99999,1005,227,99999,1005,0,256,1105,1,99999,1106,227,99999,1106,0,265,1105,1,99999,1006,0,99999,1006,227,274,1105,1,99999,1105,1,280,1105,1,99999,1,225,225,225,1101,294,0,0,105,1,0,1105,1,99999,1106,0,300,1105,1,99999,1,225,225,225,1101,314,0,0,106,0,0,1105,1,99999,107,226,226,224,1002,223,2,223,1005,224,329,1001,223,1,223,1007,226,226,224,102,2,223,223,1005,224,344,101,1,223,223,1008,226,226,224,102,2,223,223,1005,224,359,1001,223,1,223,8,226,677,224,102,2,223,223,1006,224,374,101,1,223,223,1107,226,677,224,1002,223,2,223,1006,224,389,101,1,223,223,1108,226,677,224,102,2,223,223,1005,224,404,101,1,223,223,107,677,677,224,102,2,223,223,1006,224,419,1001,223,1,223,7,677,226,224,102,2,223,223,1005,224,434,101,1,223,223,1007,677,677,224,102,2,223,223,1005,224,449,1001,223,1,223,108,226,677,224,102,2,223,223,1005,224,464,1001,223,1,223,108,226,226,224,102,2,223,223,1006,224,479,101,1,223,223,107,226,677,224,102,2,223,223,1006,224,494,1001,223,1,223,7,226,226,224,1002,223,2,223,1006,224,509,101,1,223,223,1108,677,226,224,102,2,223,223,1005,224,524,101,1,223,223,1107,677,226,224,102,2,223,223,1005,224,539,101,1,223,223,1008,677,226,224,102,2,223,223,1005,224,554,101,1,223,223,1008,677,677,224,1002,223,2,223,1006,224,569,101,1,223,223,1107,677,677,224,102,2,223,223,1006,224,584,1001,223,1,223,1108,226,226,224,1002,223,2,223,1006,224,599,101,1,223,223,7,226,677,224,102,2,223,223,1006,224,614,101,1,223,223,108,677,677,224,1002,223,2,223,1006,224,629,101,1,223,223,1007,677,226,224,102,2,223,223,1006,224,644,101,1,223,223,8,677,677,224,1002,223,2,223,1006,224,659,101,1,223,223,8,677,226,224,102,2,223,223,1005,224,674,101,1,223,223,4,223,99,226];
console.log(processOpcode([...program1], 1));
console.log(processOpcode([...program1], 5));
