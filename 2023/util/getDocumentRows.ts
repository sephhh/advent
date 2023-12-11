import { readFileSync } from "node:fs";

export const getInputRows = (rawText: string): string[] => rawText.trim().split("\n");

export const getDocumentRows = (filename: string): string[] => {
    const rawText = readFileSync(filename, "utf8");
    return getInputRows(rawText);
};
