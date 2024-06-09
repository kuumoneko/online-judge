import { readFileSync, writeFileSync } from "fs";

export function getDataFromDatabase(folder: string, file: string) {
    const dataFromFile = readFileSync(`./data/${folder}/${file}.json`, { encoding: "utf-8" });
    return JSON.parse(dataFromFile);
}

export function writeDataToFile(folder: string, file: string, data: any) {
    writeFileSync(`./data/${folder}/${file}.json`, JSON.stringify(data), { encoding: "utf-8" });
}