import express from "express";
import cookieparse from "cookie-parser";
import cors from "cors";
import { add_users, delete_users, get_users, sort_users } from "./users.js";
import { add_groups, delete_groups, get_groups, sort_groups } from "./groups.js";
import { add_blogs, delete_blogs, get_blogs, sort_blogs } from "./blogs.js";
import { add_problems, delete_problems, get_problems, sort_problems } from "./problems.js";
const app = express();
const port = 3001;
const corsOptions = {
    origin: ["http://localhost:3000"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieparse());
app.get("/data/:mode/:data", (req, res) => {
    const mode = req.params.mode;
    const data = req.params.data;
    let sendData, statusCode;
    if (mode == "users") {
        const temp = get_users(data);
        sendData = temp || [];
        statusCode = (temp.length > 0) ? 200 : 404;
    }
    else if (mode == "groups") {
        const temp = get_groups(data);
        sendData = temp || [];
        statusCode = (temp.length > 0) ? 200 : 404;
    }
    else if (mode == "blogs") {
        const temp = get_blogs(data);
        sendData = temp || [];
        statusCode = (temp.length > 0) ? 200 : 404;
    }
    else if (mode == "problems") {
        const temp = get_problems(data);
        sendData = temp || [];
        statusCode = (temp.length > 0) ? 200 : 404;
    }
    res.json({
        data: sendData,
        status: statusCode,
    });
});
app.post("/data", (req, res) => {
    const receivedData = req.body;
    const mode = receivedData.mode;
    const data = receivedData.data;
    let sendData, statusCode;
    if (mode == "users") {
        const temp = add_users(data);
        sendData = temp;
        statusCode = (temp == "Success") ? 200 : 400;
    }
    else if (mode == "groups") {
        const temp = add_groups(data);
        sendData = temp;
        statusCode = (temp == "Success") ? 200 : 400;
    }
    else if (mode == "blogs") {
        const temp = add_blogs(data);
        sendData = temp;
        statusCode = (temp == "Success") ? 200 : 400;
    }
    else if (mode == "problems") {
        const temp = add_problems(data);
        sendData = temp;
        statusCode = (temp == "Success") ? 200 : 400;
    }
    res.json({
        data: sendData,
        status: statusCode,
    });
});
app.delete("/data/:mode/:data", (req, res) => {
    const mode = req.params.mode;
    const data = req.params.data;
    let sendData, statusCode;
    if (mode == "users") {
        const temp = delete_users(data);
        sendData = temp;
        statusCode = (temp == "Success") ? 200 : 400;
    }
    else if (mode == "groups") {
        const temp = delete_groups(data);
        sendData = temp;
        statusCode = (temp == "Success") ? 200 : 400;
    }
    else if (mode == "blogs") {
        const temp = delete_blogs(data);
        sendData = temp;
        statusCode = (temp == "Success") ? 200 : 400;
    }
    else if (mode == "problems") {
        const temp = delete_problems(data);
        sendData = temp;
        statusCode = (temp == "Success") ? 200 : 400;
    }
    res.json({
        data: sendData,
        status: statusCode,
    });
});
app.patch("/data", (req, res) => {
    const receivedData = req.body;
    const mode = receivedData.mode;
    const data = receivedData.data;
    const pages = {
        lineperpage: receivedData.data.lineperpage,
        page: receivedData.data.page
    };
    let sendData, statusCode;
    let temp;
    if (mode == "users") {
        temp = sort_users(data.mode, data.search, data.reverse);
        statusCode = (typeof temp == "string") ? 400 : 200;
    }
    else if (mode == "groups") {
        temp = sort_groups(data.mode, data.search, data.reverse);
        statusCode = (typeof temp == "string") ? 400 : 200;
    }
    else if (mode == "blogs") {
        temp = sort_blogs(data.mode, data.search, data.reverse);
        statusCode = (typeof temp == "string") ? 400 : 200;
    }
    else if (mode == "problems") {
        temp = sort_problems(data.mode, data.search, data.reverse);
        statusCode = (typeof temp == "string") ? 400 : 200;
    }
    if (typeof temp != "string") {
        if (temp.length > 100) {
            function splitIntoChunks(array, chunkSize) {
                return Array.from({ length: Math.ceil(array.length / chunkSize) }, (_, index) => array.slice(index * chunkSize, (index + 1) * chunkSize));
            }
            sendData = splitIntoChunks(temp, pages.lineperpage)[pages.page - 1];
        }
        else {
            sendData = temp;
        }
    }
    res.json({
        data: sendData,
        totalPage: Math.ceil(temp.length / pages.lineperpage),
        status: statusCode,
    });
});
app.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map