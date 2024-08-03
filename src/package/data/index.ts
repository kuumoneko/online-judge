import { readFileSync, writeFileSync } from "fs";

export function getDataFromDatabase(folder: string, file: string): any {
    const dataFromFile = readFileSync(`G:\\kuumooj\\data\\${folder}\\${file}.json`, { encoding: "utf-8" });
    return JSON.parse(dataFromFile);
}

export function writeDataToDatabase(folder: string, file: string, data: any): any {
    writeFileSync(`G:\\kuumooj\\data\\${folder}\\${file}.json`, JSON.stringify(data), { encoding: "utf-8" });
}
