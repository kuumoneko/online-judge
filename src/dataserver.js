import express from "express";
import { read, readFileSync, writeFileSync } from "fs";
import cors from "cors"
const app = express();
const port = 3001

app.use(cors({
    origin: 'http://localhost:3000' // Replace with your React app's origin
}));

app.use(express.json());

app.post('/api/data', (req, res) => {
    // method , mode , data
    const receivedData = req.body;

    try {
        if (receivedData.method != "get") {
            const temp = readFileSync(`./data/${receivedData.mode}.json`, { encoding: "utf-8" }) || "{}";

            const lmao = JSON.parse(temp);
            // lmao.push(receivedData.data)
            console.log(receivedData.data)

            if (receivedData.mode == "users") {
                lmao[receivedData.data.username] = receivedData.data;
            }
            else if (receivedData.mode == "groups") {
                lmao[receivedData.data.group] = receivedData.data;
            }
            writeFileSync(`./data/${receivedData.mode}.json`, JSON.stringify(lmao))
        }
        else {
            const temp = readFileSync(`./data/${receivedData.mode}.json`, { encoding: "utf-8" })
            res.json({ mess: "ok", data: (receivedData.data != "all") ? JSON.parse(temp)[receivedData.data] : JSON.parse(temp) })
        }
    }
    catch (e) {
        res.json({ mess: e });
        return;
    }
    res.json({ mess: "done" })
})

app.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`);
});

