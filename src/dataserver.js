import express from "express";
import { read, readFileSync, writeFileSync } from "fs";
import cookieparse from "cookie-parser";
import cors from "cors"
const app = express();
const port = 3001

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use(express.json());
app.use(cookieparse());

const temp = {
    fullname: "",
    username: "",
    password: "",
    email: "",
    group: [],
    contribute: 0,
    points: 0,
    problems_count: 0,
    rank: 0,
    role: "User",

    profie: {
        data: "",
        html: "",
    },
    problems: {
        name: "",
        submissions: [
            {
                time: "",
                status: "",
                tests: [
                    {
                        language: "",
                        user_code: "",
                        user_output: "",
                        input: "",
                        output: ""
                    }
                ]
            }
        ]
    },
    blogs: [
        {
            title: "",
            time: "",
            content: ""
        }
    ]
}

app.post('/api/data', (req, res) => {
    // method , mode , data
    const receivedData = req.body;
    let mess = "";
    let status = 200;
    if (receivedData.data == undefined) {
        mess = "";
        status = 404
    }
    else {
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
                res.json({ status: 200, mess: "ok", data: (receivedData.data != "all") ? JSON.parse(temp)[receivedData.data] : JSON.parse(temp) })
            }
            mess = "done"
        }
        catch (e) {
            mess = e

        }
    }

    res.json({ status: status, mess: mess })
})

app.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`);
});

