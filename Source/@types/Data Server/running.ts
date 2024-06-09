import { readFileSync, writeFileSync } from "fs"



setInterval(() => {
    const data = readFileSync("G:\\Project\\Data\\verifying.json", { encoding: "utf8" })
    const verifying_code: {} = JSON.parse(data);
    const temp = verifying_code;
    Object.keys(temp).forEach((item: any, index) => {
        // console.log(verifying_code[item].time)


        const now = new Date().getTime();

        if (now > temp[item].time) {
            verifying_code[item] = undefined
        }
    })


    writeFileSync("G:\\Project\\Data\\verifying.json", JSON.stringify(verifying_code), { encoding: "utf8" })
}, 1000)