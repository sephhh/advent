export function assertInputDefined<T>(
    input: T | undefined
): asserts input is T {
    if (typeof input === "undefined") {
        throw new Error("Invalid or unexpected input");
    }
}
