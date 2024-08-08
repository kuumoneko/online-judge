// server
import express from "express";
import cookieparse from "cookie-parser";
import cors from "cors";

// users
import { add_users, delete_users, get_users, sort_users } from "./users/users.ts";
import { add_groups, delete_groups, get_groups, sort_groups } from "./users/groups.ts";

// blogs
import { add_blogs, delete_blogs, get_blogs, sort_blogs } from "./blogs/blogs.ts";

// problems
import { add_problems, delete_problems, get_problems, sort_problems } from "./problems/problems.ts";
import { add_problem_types, delete_problem_types, get_problem_types, sort_problem_types } from "./problems/types.ts";
import { add_problem_groups, delete_problem_groups, get_problem_groups, sort_problem_groups } from "./problems/groups.ts";

// auth
import { add_sessions, delete_sessions, getime } from "./auth/auth.ts";
import { send_code_verify_user, verify_user } from "./auth/verify.ts";
import { me } from "./auth/me.ts";

// package
import { User } from "type";
import { User_role, Theme_mode, Coding_status } from "enum";
import { getDataFromDatabase, writeDataToDatabase } from "data";
import { login } from "./auth/login.ts";
import { signup } from "./auth/signup.ts";
import { searching } from "./search/index.ts";
import { change_password } from "./auth/change_pass.ts";
import { send_code_forgot_password, verify_user_password } from "./auth/forgot_password.ts";
import { get_submission } from "./problems/submission.ts";


let system = getDataFromDatabase("system", "system")
const origin = system["server_link"]
// console.log(origin)
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
        .setHeader('Set-Cookie', `sessionId=${result.session.id}; httpOnly; Max-Age=${getime().duration / 1000}; SameSite=None; Secure`)
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
            .setHeader('Set-Cookie', `sessionId=${data.session?.id}; httpOnly; Max-Age=${getime().duration / 1000}; SameSite=None; Secure`)
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
    res.clearCookie("sessionId", { httpOnly: true, maxAge: 0, path: "/auth", sameSite: "none", secure: true }).status(200).json({ data: "OK" })
})

app.post("/auth/me", (req, res) => {
    const sessionId = req.cookies.sessionId;


    const result = me(sessionId);
    if (result.data.username == undefined) {
        res.clearCookie("sessionId", { httpOnly: true, maxAge: 0, path: "/auth", sameSite: "none", secure: true });
        return res.status(401).json(result);
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
    else if (mode == "submissions") {
        const temp = get_submission(data);
        sendData = temp || [];
        statusCode = (temp.length > 0) ? 200 : 404;
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
            temp = sort_problems(data.mode, data, data.reverse);
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
                        name: "Unable to find this problem, try to search another word",
                        id: "",
                        points: 0,
                        types: [],
                        groups: [],
                        SubmissionStatus: {
                            AC: 0
                        },
                        body: {
                            support: {
                                nani: false
                            }
                        }
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
        page: pages.page,
    })
});


app.post("/submit", (req, res) => {
    const user = req.body.data.user;
    const problem = req.body.data.problem;
    const code = req.body.data.code;
    const language = req.body.data.language;
    // cpp - 03, 11, 14, 17, 20
    // Node.js || javascript - 20.16.0 || esm - cjs
    // typescript - 5.5.3 || esm - cjs
    // python - 3.12.2
    // java - 21.0.3
    const version = req.body.data.version;

    const data = {
        user: user,
        problem: problem,
        code: code,
        language: language,
        version: version
    }
    system = getDataFromDatabase("system", "system")
    const number_submissions = system["submissions"];
    const queue = getDataFromDatabase("problems", "queue");
    queue.push(data);

    let submissions: any[] = getDataFromDatabase("problems", "submissions");

    submissions.push({
        user: user,
        problem: problem,
        code: code,
        language: language,
        version: version,
        id: number_submissions + 1,
        status: Coding_status.PD,
        time: new Date().getTime()
    })
    writeDataToDatabase("problems", "submissions", submissions);


    writeDataToDatabase("problems", "queue", queue);
    system["submissions"] += 1;
    writeDataToDatabase("system", "system", system);



    res.status(200).json({
        id: number_submissions + 1
    })
})

app.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map

setInterval(() => {
    interface login_data {
        id: string,
        username: string,
        end_login: number
    }


    const res: login_data[] = getDataFromDatabase('auth', "login")

    const temp: login_data[] = []

    res.forEach((data: login_data) => {
        const now = new Date().getTime();

        if (data.end_login - now <= 0) {

        }
        else {
            temp.push(data)
        }
    })

    writeDataToDatabase("auth", "login", temp)
}, 1000)