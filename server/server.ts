// server
import express from "express";
import cookieparse from "cookie-parser";
import cors from "cors";

// users
import { add_users, delete_users, get_users, sort_users } from "./users/users.js";
import { add_groups, delete_groups, get_groups, sort_groups } from "./users/groups.js";

// blogs
import { add_blogs, delete_blogs, get_blogs, sort_blogs } from "./blogs/blogs.js";

// problems
import { add_problems, delete_problems, get_problems, sort_problems } from "./problems/problems.js";
import { add_problem_types, delete_problem_types, get_problem_types, sort_problem_types } from "./problems/types.js";
import { add_problem_groups, delete_problem_groups, get_problem_groups, sort_problem_groups } from "./problems/groups.js";

// auth
import { add_sessions, delete_sessions } from "./auth/auth.js";
import { send_code_verify_user, verify_user } from "./auth/verify.js";
import { me } from "./auth/me.js";

// package
import { User, User_role, Theme_mode } from "types";
import { getDataFromDatabase } from "data";
import { login } from "./auth/login.js";
import { signup } from "./auth/signup.js";
import { searching } from "./search/index.js";
import { change_password } from "./auth/change_pass.js";
import { send_code_forgot_password, verify_user_password } from "./auth/forgot_password.js";



const origin = getDataFromDatabase("system", "system")["server_link"]

const app = express();
const port = 3001;
const corsOptions = {
    origin: origin,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieparse());

// login -> post
// signup -> post
// update -> patch
// sort -> get


// app.get("/mode", (req, res) => {
//     res.json({
//         data: getDataFromDatabase("system", "system")
//     })
// })

app.post("/auth/login", (req, res) => {
    // console.log(req.body.data)
    const { username, password } = req.body.data;

    const result: any = login(username, password);

    // console.log(result)
    if (result.message != "OK") {
        return res.status(400).json({
            data: result
        })
    }

    res.status(200)
        .setHeader('Set-Cookie', `sessionId=${result.session.id}; httpOnly; Max-Age=${3600 * 24 * 30}`)
        .json({
            data: "OK"
        })
});

app.post("/auth/change_password", (req, res) => {
    const { username, old_pass, new_pass } = req.body.data;

    const data: string = change_password(username, old_pass, new_pass);

    let statusCode: number = 200;
    if (data == "OK") {
        statusCode = 200;
    }
    else if (data == "Wrong password") {
        statusCode = 400;
    }
    else {
        statusCode = 404;
    }
    res.status(statusCode).json({
        data: data
    })
})

app.post("/auth/forgot_password", (req, res) => {
    const { username } = req.body.data;

    const data: string = "";

    let statusCode: number = 200;
    if (data == "OK") {
        statusCode = 200;
    }
    else if (data == "Wrong password") {
        statusCode = 400;
    }
    else {
        statusCode = 404;
    }
    res.status(statusCode).json({
        data: data
    })
})


app.post("/auth/signup", (req, res) => {
    const { fullname, username, email, password } = req.body.data;

    try {
        const data = signup(username, fullname, email, password);

        res.status(200)
            .setHeader('Set-Cookie', `sessionId=${data.session?.id}; httpOnly; Max-Age=${3600 * 24 * 30}`)
            .json({
                data: "OK"
            })

    }
    catch (e: any) {
        res.status(400).json({
            data: e.message
        })
    }
})

app.post("/auth/logout", (req, res) => {
    const sessionId = req.cookies.sessionId;
    // console.log(req.cookies)
    delete_sessions(sessionId);
    res.clearCookie("sessionId", { httpOnly: true, maxAge: 0, path: "/auth" }).status(200).json({ data: "OK" })
})

app.post("/auth/me", (req, res) => {
    const sessionId = req.cookies.sessionId;


    const result = me(sessionId);
    if (result.data.username == undefined) {
        return res.clearCookie("sessionId", { httpOnly: true, maxAge: 0, path: "/auth" }).status(401).json(result);
    }
    res.status(200).json(result);

})

app.post("/verify/:username/:code", async (req, res) => {
    const username = req.params.username,
        code = req.params.code;

    // console.log(username, ' ', code)

    if (code == "undefined") {
        const user: User = get_users(username)[0]

        try {
            await send_code_verify_user(username, user.email);
            res.status(200).json({ data: "" })
        }
        catch (e: any) {
            res.status(400).json({
                data: e.message
            })
        }
    }
    else {
        // console.log(code)
        const ress = verify_user(username, code);
        res.status(ress.status).json({
            data: ress.data
        })
    }
})

app.post("/forgot_password/:username/:mode/:data", async (req, res) => {
    const username = req.params.username,
        mode = req.params.mode;

    if (mode == "code") {
        const code = req.params.data;;
        if (code == "undefined") {
            const user: User = get_users(username)[0]

            try {
                await send_code_forgot_password(username, user.email);
                res.status(200).json({ data: "" })
            }
            catch (e: any) {
                res.status(400).json({
                    data: e.message
                })
            }
        }
        else {
            const ress = verify_user_password(username, code);
            res.status(ress.status).json({
                data: ress.data
            })
        }
    }
    else if (mode == "password") {
        const password = req.params.data;

    }

})


app.get("/data/:mode/:data", (req, res) => {

    const mode = req.params.mode;
    const data = req.params.data;
    let sendData: any, statusCode: any;
    // console.log(mode)
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
    else if (mode == "problem_types") {
        const temp = get_problem_types(data);
        sendData = temp || [];
        statusCode = (temp.length > 0) ? 200 : 404;
    }
    else if (mode == "problem_groups") {
        const temp = get_problem_groups(data);
        sendData = temp || [];
        statusCode = (temp.length > 0) ? 200 : 404;
    }
    else if (mode == "search") {
        const temp = searching(data);
    }

    res.status(statusCode).json({
        data: sendData,
    })

});

app.post("/data", (req, res) => {
    const receivedData = req.body;
    const mode = receivedData.mode;
    const data = receivedData.data;
    let sendData: any, statusCode: any;
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
    else if (mode == "problem_types") {
        const temp = add_problem_types(data);
        sendData = temp;
        statusCode = (temp == "Success") ? 200 : 400;
    } else if (mode == "problem_groups") {
        const temp = add_problem_groups(data);
        sendData = temp;
        statusCode = (temp == "Success") ? 200 : 400;
    }

    res.status(statusCode).json({
        data: sendData,
    })
});

app.delete("/data/:mode/:data", (req, res) => {
    const mode = req.params.mode;
    const data = req.params.data;

    let sendData: any, statusCode: any;

    let temp: any;

    switch (mode) {
        case "users":
            temp = delete_users(data);
            break;
        case "groups":
            temp = delete_groups(data);
            break;
        case "blogs":
            temp = delete_blogs(data);
            break;
        case "problems":
            temp = delete_problems(data);
            break;
        case "problem_types":
            temp = delete_problem_types(data);
            break;
        case "problem_groups":
            temp = delete_problem_groups(data);
            break;
        default:
            break
    }

    sendData = temp;
    statusCode = (temp == "Success") ? 200 : 400;

    res.status(statusCode).json({
        data: sendData,
    })
});


app.patch("/data", (req, res) => {
    const receivedData = req.body;
    const mode = receivedData.mode;
    const data = receivedData.data;
    const pages = {
        lineperpage: receivedData.data.lineperpage,
        page: receivedData.data.page
    }

    let sendData: any, statusCode: any;

    let temp: any[] | string;

    switch (mode) {
        case "users":
            temp = sort_users(data.mode, data.search, data.reverse);
            break;
        case "groups":
            temp = sort_groups(data.mode, data.search, data.reverse);
            break;
        case "blogs":
            temp = sort_blogs(data.mode, data.search, data.reverse);
            break;
        case "problems":
            temp = sort_problems(data.mode, data.search, data.reverse);
            break;
        case "problem_types":
            temp = sort_problem_types(data.mode, data.search, data.reverse);
            break;
        case "problem_groups":
            temp = sort_problem_groups(data.mode, data.search, data.reverse);
            break;
        default:
            temp = []

    }

    // console.log(temp)

    if (typeof temp != "string" && temp.length == 0) {
        switch (mode) {
            case "users":
                temp = [
                    {
                        stt: 1,
                        username: "Unable to find this user, try to search another word",
                        points: 0,
                        problems_count: 0,
                        group: [],
                        rank: 0,
                        role: User_role.user,
                        fullname: "",
                        themes: {
                            mode: Theme_mode.dark
                        }
                    }
                ]
                break;
            case "groups":
                temp = [
                    {
                        stt: 1,
                        groupname: "Unable to find this group, try to search another word"
                    }
                ]
                break;
            case "blogs":
                temp = [
                    {
                        stt: 1,
                        title: "Unable to find this blog, try to search another word"
                    }
                ]
                break;
            case "problems":
                temp = [
                    {
                        stt: 1,
                        title: "Unable to find this problem, try to search another word"
                    }
                ]
                break;
            case "problem_types":
                temp = [
                    {
                        stt: 1,
                        title: "Unable to find this problem type, try to search another word"
                    }
                ]
                break;
            case "problem_groups":
                temp = [
                    {
                        stt: 1,
                        title: "Unable to find this problem group, try to search another word"
                    }
                ]
                break;
            default:
                temp = ["nothing"]
        }
    }

    statusCode = (typeof temp == "string") ? 400 : 200;
    // console.log(statusCode)

    if (typeof temp != "string") {
        if (temp.length > pages.lineperpage) {

            // const line_per_page = 100;
            // const page = 1;

            const Number_of_pages = Math.ceil(temp.length / pages.lineperpage);

            const result: any[] = []

            for (let i = 0; i < Number_of_pages; i++) {
                const st = i * pages.lineperpage;
                const ed = (i + 1) * pages.lineperpage;

                if (ed > temp.length) {
                    result.push(temp.slice(st, temp.length))
                }
                else {
                    result.push(temp.slice(st, ed))
                }
            }

            // console.log(pages)
            // console.log(temp.length)
            sendData = result[pages.page - 1]

        } else {
            sendData = temp
        }
    }

    // console.log(sendData)


    res.status(statusCode).json({
        data: sendData,
        totalPage: Math.ceil(temp.length / pages.lineperpage),
    })
});
app.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map