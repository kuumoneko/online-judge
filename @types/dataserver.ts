import express from "express";
import {  readFileSync, writeFileSync } from "fs";
import cookieparse from "cookie-parser";
import cors from "cors"
import { User } from "./classes/type.js";
// import { error } from "console";
const app = express();
const port = 3001

const corsOptions = {
    origin: ['http://192.168.1.8:3000', 'http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enable cookies and authentication headers
};

app.use(cors(corsOptions));


app.use(express.json());
app.use(cookieparse());

app.post("/get/users", (req, res) => {
    // console.log()
    const receivedData = req.body;

    let status = 200,
        data = {};

    try {
        const json = readFileSync(`./data/users.json`, { encoding: "utf-8" })

        const dataa = JSON.parse(json);
        if (receivedData.data == "all") {
            // mess = "ok"
            status = 200
            data = Object.keys(dataa).map((item) => dataa[item])
        }
        else {
            // mess = "ok";
            status = dataa[receivedData.data] ? 404 : 200;
            data = [dataa[receivedData.data]]
        }
    }
    catch (e: any) {
        // mess = e;
        status = 400;
        data = { error: e.message };
    }

    // console.log(data)

    res.json({ status: status, data: data })
})

app.post("/post/users", (req, res) => {
    const receivedData = req.body;

    let status = 200,
        data = {};

    try {
        const json = readFileSync(`./data/users.json`, { encoding: "utf-8" })

        let data = JSON.parse(json);


        data[receivedData.data.username] = receivedData.data;

        writeFileSync(`./data/users.json`, JSON.stringify(data))

        // mess = "ok";
        status = 200;
        data = undefined
    }
    catch (e: any) {
        // console.log(e : any)
        // mess = e;
        status = 400;
        data = { error: e.message };
    }

    res.json({ status: status, data: data })
})





app.post("/get/groups", (req, res) => {
    // console.log()
    const receivedData = req.body;

    let status = 200,
        data = {};

    try {
        const json = readFileSync(`./data/groups.json`, { encoding: "utf-8" })

        const dataa = JSON.parse(json);
        if (receivedData.data == "all") {
            // mess = "ok"
            status = 200
            data = data = Object.keys(dataa).map((item) => dataa[item])
        }
        else {
            // mess = "ok";
            status = dataa[receivedData.data] ? 404 : 200;
            data = [dataa[receivedData.data]]
        }
    }
    catch (e: any) {
        // mess = e;
        status = 400;
        data = { error: e.message };
    }

    res.json({ status: status, data: data })
})

app.post("/post/groups", (req, res) => {
    const receivedData = req.body;

    let status = 200,
        data = {};

    try {
        const json = readFileSync(`./data/groups.json`, { encoding: "utf-8" })

        let data = JSON.parse(json);


        data[receivedData.data.group] = receivedData.data;

        writeFileSync(`./data/groups.json`, JSON.stringify(data))

        // mess = "ok";
        status = 200;
        data = undefined
    }
    catch (e: any) {
        // console.log(e : any)
        // mess = e;
        status = 400;
        data = { error: e.message };
    }

    res.json({ status: status, data: data })
})


app.post("/get/blogs", (req, res) => {
    // console.log()
    const receivedData = req.body;

    let status = 200,
        data = {};

    try {
        const json = readFileSync(`./data/blogs.json`, { encoding: "utf-8" })

        const dataa = JSON.parse(json);
        if (receivedData.data == "all") {
            // mess = "ok"
            status = 200
            data = data = Object.keys(dataa).map((item) => dataa[item])
        }
        else {
            // mess = "ok";
            status = dataa[receivedData.data] ? 404 : 200;
            data = [dataa[receivedData.data]]
        }
    }
    catch (e: any) {
        // mess = e;
        status = 400;
        data = { error: e.message };
    }

    res.json({ status: status, data: data })
})

app.post("/post/blogs", (req, res) => {
    const receivedData = req.body;

    let status = 200,
        data = {};

    try {
        const json = readFileSync(`./data/blogs.json`, { encoding: "utf-8" })

        let data = JSON.parse(json);

        // const temp = data[receivedData.data.host].length;

        console.log(data[receivedData.data.host][data[receivedData.data.host].length - 1].id, ' ', receivedData.data.id)

        if (data[receivedData.data.host][data[receivedData.data.host].length - 1].id != receivedData.data.id) {
            data[receivedData.data.host].push(receivedData.data)
        }

        // data[receivedData.data.host].push(receivedData.data)

        // data[receivedData.data.host].push(receivedData.data);

        // console.log(data[receivedData.data.host].length, ' ', temp)


        // if (data[receivedData.data.host].length - temp > 1) {
        //     data = data.slice(1, data.length - 2);
        // }

        // console.log(data[receivedData.data.host])



        writeFileSync(`./data/blogs.json`, JSON.stringify(data))

        // mess = "ok";
        status = 200;
        data = undefined
    }
    catch (e: any) {
        // console.log(e : any)
        // mess = e;
        status = 400;
        data = { error: e.message };
    }

    res.json({ status: status, data: data })
})

















app.post("/data",
    /**
     * 
     * @param {{body:{method:string , mode:string , data:string}}} req 
     * @param {*} res 
     */
    function (req, res) {
        const receivedData = req.body;
        let status = 200,
            data = {};
        try {

            const res = readFileSync(`./data/${receivedData.mode}.json`, { encoding: "utf-8" }) || "{}";
            const dataa = JSON.parse(res);


            if (receivedData.method == "get") {
                if (receivedData.data == "all") {
                    data = dataa
                }
                else {
                    data = dataa.filter((item: User) => item.username == receivedData.data)

                }
            }
            else {

            }
        }
        catch (e: any) {
            status = 400;
            data = { error: e.message };
        }



        res.json({ status: status, data: data })

    })



app.post('/api/data', (req, res) => {
    // method , mode , data
    const receivedData = req.body;
    let mess = "";
    let status = 200;
    let data = {}
    if (receivedData.data == undefined) {
        mess = "";
        status = 404
        data = {}
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
                status = 200;
                mess = "oke";
                data = (receivedData.data != "all") ? JSON.parse(temp)[receivedData.data] : JSON.parse(temp)
                // res.json({ status: 200, mess: "ok", data: (receivedData.data != "all") ? JSON.parse(temp)[receivedData.data] : JSON.parse(temp) })
            }
            mess = "done"
        }
        catch (e: any) {
            data = {};
            status = 400;
            mess = e
        }
    }

    res.json({ status: status, mess: mess, data: data })
})











app.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`);
});

