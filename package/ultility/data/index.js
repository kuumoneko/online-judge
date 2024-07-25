import { readFileSync, writeFileSync } from "fs";
export function getDataFromDatabase(folder, file) {
    const dataFromFile = readFileSync(`G:\\Online_Judge\\data\\${folder}\\${file}.json`, { encoding: "utf-8" });
    return JSON.parse(dataFromFile);
}
export function writeDataToDatabase(folder, file, data) {
    writeFileSync(`G:\\Online_Judge\\data\\${folder}\\${file}.json`, JSON.stringify(data), { encoding: "utf-8" });
}
//# sourceMappingURL=index.js.map