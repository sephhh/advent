// const realInput: number[] = document.body.innerText
//   .trim()
//   .split("\n")
//   .map((string) => +string);

const testInput: number[] = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];

const getTotalCountIncreases = (input: number[]) =>
  input.reduce(
    (countIncreases: number, currentValue: number, index: number) => {
      const previousValue: number | undefined = input[index - 1];
      if (typeof previousValue === "undefined") {
        return countIncreases;
      }
      if (currentValue > previousValue) {
        return countIncreases + 1;
      }
      return countIncreases;
    },
    0
  );

console.log("Total Increases for input", getTotalCountIncreases(testInput));

const isNumberArray = (array: unknown[]): array is number[] =>
  array.every((el) => typeof el === "number");

const getTotalWindowCountIncreases = (input: number[]) =>
  input.reduce((countIncreases, _, index) => {
    const currentWindow = [input[index], input[index + 1], input[index + 2]];
    const nextWindow = [input[index + 1], input[index + 2], input[index + 3]];
    if (!isNumberArray(currentWindow) || !isNumberArray(nextWindow)) {
      // stop if either window has undefined elements
      return countIncreases;
    }
    const currentWindowTotal = currentWindow.reduce((acc, val) => acc + val, 0);
    const nextWindowTotal = nextWindow.reduce((acc, val) => acc + val, 0);

    if (nextWindowTotal > currentWindowTotal) {
      return countIncreases + 1;
    }

    return countIncreases;
  }, 0);

console.log(
  "Total window increases for input",
  getTotalWindowCountIncreases(testInput)
);
