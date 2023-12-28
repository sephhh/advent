import { getDocumentRows, getInputRows } from "./util/getDocumentRows";
import { assertInputDefined } from "./util/assertInputDefined";
const rawInput = `
Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
`;

type ColorCount = { red: number; blue: number; green: number };

const gameConstraint = {
    red: 12,
    green: 13,
    blue: 14,
};

const printValidGameSum = (inputRows: string[], gameConstraint: ColorCount) => {
    let sum = 0;
    inputRows.forEach((row) => {
        const gameNumber = row.match(/Game (\d+)/)?.[1];
        assertInputDefined(gameNumber);
        const sets = row.split(":")[1];
        assertInputDefined(sets);
        let isValidGame = true;
        sets.split(";").forEach((set) => {
            const colorCount: ColorCount = {
                red: 0,
                green: 0,
                blue: 0,
            };
            set.trim()
                .split(",")
                .forEach((pull) => {
                    const [number, color] = pull.trim().split(" ");
                    assertInputDefined(number);
                    assertInputDefined(color);
                    if (
                        color !== "red" &&
                        color !== "blue" &&
                        color !== "green"
                    ) {
                        console.log("unexpected color", color);
                    } else {
                        colorCount[color] += Number(number);
                    }
                });
            if (
                colorCount.red > gameConstraint.red ||
                colorCount.green > gameConstraint.green ||
                colorCount.blue > gameConstraint.blue
            ) {
                isValidGame = false;
            }
        });
        if (isValidGame) {
            sum += Number(gameNumber);
        }
    });
    console.log("VAILD GAME SUM", sum);
};

printValidGameSum(getInputRows(rawInput), gameConstraint);
const realInput = getDocumentRows("2023/day2.txt");
printValidGameSum(realInput, gameConstraint);

const printMinGamePower = (inputRows: string[]) => {
    let sum = 0;
    inputRows.forEach((row) => {
        const gameNumber = row.match(/Game (\d+)/)?.[1];
        assertInputDefined(gameNumber);
        const sets = row.split(":")[1];
        assertInputDefined(sets);
        const minColorCount = {
            red: 0,
            green: 0,
            blue: 0,
        };

        sets.split(";").forEach((set) => {
            const colorCountPerSet: ColorCount = {
                red: 0,
                green: 0,
                blue: 0,
            };
            set.trim()
                .split(",")
                .forEach((pull) => {
                    const [number, color] = pull.trim().split(" ");
                    assertInputDefined(number);
                    assertInputDefined(color);
                    if (
                        color !== "red" &&
                        color !== "blue" &&
                        color !== "green"
                    ) {
                        console.log("unexpected color", color);
                    } else {
                        colorCountPerSet[color] += Number(number);
                    }
                });
            minColorCount.green = Math.max(
                colorCountPerSet.green,
                minColorCount.green
            );
            minColorCount.red = Math.max(
                colorCountPerSet.red,
                minColorCount.red
            );
            minColorCount.blue = Math.max(
                colorCountPerSet.blue,
                minColorCount.blue
            );
        });
        sum += minColorCount.green * minColorCount.blue * minColorCount.red;
    });
    console.log("GAME POWER SUM", sum);
};

printMinGamePower(getInputRows(rawInput));
printMinGamePower(realInput);
