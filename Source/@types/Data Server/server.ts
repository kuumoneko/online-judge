import express from "express";
import cookieparse from "cookie-parser";
import cors from "cors";
import { add_users, all_users, delete_users, get_users, sort_users } from "./users/users.js";
import { add_groups, delete_groups, get_groups, sort_groups } from "./users/groups.js";
import { add_blogs, delete_blogs, get_blogs, sort_blogs } from "./blogs/blogs.js";
import { add_problems, delete_problems, get_problems, sort_problems } from "./problems/problems.js";
import { add_sessions, all_sessions, delete_sessions } from "./auth/auth.js";
import { all_language, Languages, User } from "online-judge-types";
// import { Languages } from "../@classes/enum.js";
// import { User } from "../@classes/type.js";
import { send_code, verify_user } from "./auth/verify.js";
const app = express();
const port = 3001;
const corsOptions = {
    origin: ["http://localhost:3000", "http://localhost:3006"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieparse());

function generateRandomString(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

app.post("/auth/login", (req, res) => {
    // console.log(req.body.data)
    const { username, password } = req.body.data;
    // console.log(username, ' ', password)

    const temp: any[] = all_users();
    const user = temp.find((item: any) => item.username == username)
    // console.log(user)

    // if ()
    if (user == undefined) {
        return res.status(404).json({
            message: `Can't find ${username}`
        });
    }
    else if (user.password != password) {
        return res.status(401).json({
            message: `Wrong password`
        })
    }




    const sessionId = generateRandomString(30);
    const session = {
        "id": sessionId,
        "username": username
    }


    add_sessions(session)


    res.status(200)
        .setHeader('Set-Cookie', `sessionId=${sessionId}; httpOnly; Max-Age=${3600 * 24 * 30}`)
        .json({
            data: {
                session: session
            }
        })
});

app.post("/auth/signup", (req, res) => {
    const { fullname, username, email, password } = req.body.data;

    const temp: any[] = all_users();
    const user = temp.find((item: any) => item.username == username);

    if (user != undefined) {

        res.status(400).json({
            message: "Username existed"
        })
        return;
    }
    else {
        const temp = {
            fullname: fullname,
            username: username,
            password: password,
            email: email,
            group: [],
            contribute: 0,
            points: 0,
            problems_count: 0,
            rank: 0,
            role: "User",
            language: {
                languages: all_language,
                default_language: Languages.C20,
            },
            themes: {
                color: "#ff9797",
                mode: "light"
            },
            profile: {
                data: "",
                html: "",
            },
            problems: [],
            blogs: [],
            verified: false
        }

        add_users(temp);

        const sessionId = generateRandomString(30);
        const session = {
            "id": sessionId,
            "username": username
        }


        add_sessions(session)


        res.status(200)
            .setHeader('Set-Cookie', `sessionId=${sessionId}; httpOnly; Max-Age=${3600 * 24 * 30}`)
            .json({
                data: {
                    session: session
                }
            })

        // res.status(200).json({})
    }

    // res.status(200).json({})
})

app.post("/auth/logout", (req, res) => {
    const sessionId = req.cookies.sessionId;
    // console.log(req.cookies)
    delete_sessions(sessionId);
    res.clearCookie("sessionId").status(200).json({})
})

app.post("/auth/me", (req, res) => {
    const sessionId = req.cookies.sessionId;


    const temp: any[] = all_sessions();
    const user = temp.find((item: any) => item.id == sessionId);

    if (user != undefined) {
        res.status(200).json({
            data: {
                username: user.username
            }
        })
    }
    else {
        res.status(404).json({
            data: {
                username: undefined
            }
        })
    }
})

app.post("/verify/:username/:code", async (req, res) => {
    const username = req.params.username,
        code = req.params.code;

    // console.log(username, ' ', code)

    if (code == "undefined") {
        const user: User = get_users(username)[0]
        // console.log(user)


        try {
            await send_code(username, user.email);
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



app.get("/data/:mode/:data", (req, res) => {

    const mode = req.params.mode;
    const data = req.params.data;
    let sendData: any, statusCode: any;
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

    res.status(statusCode).json({
        data: sendData,
    })
});

app.delete("/data/:mode/:data", (req, res) => {
    const mode = req.params.mode;
    const data = req.params.data;

    let sendData: any, statusCode: any;
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

    let temp: any;
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