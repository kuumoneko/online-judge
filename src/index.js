// @ts-nocheck
import React, { StrictMode, useEffect } from 'react';
import { createRoot } from "react-dom/client";
import "./index.css";

import { Navigator } from "./navigator.js";
import { Already, Singupform } from "./signup.js";
import { Loginform } from "./login.js";
import Cookies from 'js-cookie';
import { color, cookie, get_rank_color, getdata, geturl, replaceAll } from './ulti.js';
import { Users } from './users.js';
import { About } from './about.js';
import { Admin } from './admin.js';
import { User } from './user.js';

const root = createRoot(document.getElementById("root"));


if (!document.referrer && Cookies.get("remember") == "false") {
    Cookies.remove("user")
    Cookies.remove("remember")
}
const url = document.URL;

// console.log(url.split("//")[1].split("/").slice(1))

const urll = geturl();
let cookies = cookie(document);

async function lmao() {
    const res = await getdata("get", "users", cookies.user)
    // console.log(res)
    if (res == undefined) {
        // localStorage.setItem("user", undefined);
        const temp = {
            "themes": {
                "color": "#ff9797",
                "mode": "light"
            },
        }
        localStorage.setItem("user", JSON.stringify(temp))
        return temp;

    }
    // console.log(res)
    res.password = undefined;

    localStorage.setItem("user", JSON.stringify(res))
    localStorage.setItem("date", new Date().getTime())
    // console.log(res)
    return res;

}

lmao().then(async (res) => {


    const themes = (res) ? color[res.themes.mode] : color.light;



    const ress = await getdata("get", "users", "all")
    // console.log(ress);
    // console.log(res)
    function Checking({ url }) {
        // console.log(ress)
        // console.log(url.split("/"))
        const direct = url[0];

        // console.log(url)
        if (cookies.user && (direct == "login" || direct == "signup")) {
            return (
                <Already />
            )
        }
        if (direct == "login") {
            return (
                <Loginform />
            )
        }
        else if (direct == "signup") {
            return (
                <Singupform />
            )
        }
        else if (direct == "users" || direct == "contributors" || direct == "groups") {
            return (
                <Users mode={direct} />
            )
        }
        else if (direct == "user") {
            if (url[1] == undefined) {
                window.location.href = "/login"
            }
            return (
                <User url={url} users={ress} />
            )
        }
        else if (direct == "about") {
            return (
                <About />
            )
        }
        else if (direct == "admin") {
            return (
                <Admin>

                </Admin>
            )
        }
    }

    function Userss({ mode }) {

        function resss(modee) {

            return {
                borderRadius: "4px 4px 0 0",
                borderTop: (modee == mode) ? "3px solid #ff99cc" : `1px solid ${themes.content}`,
                borderBottom: (modee == mode) ? `1px solid ${themes.content}` : "1px solid #dddddd",
                borderLeft: (modee == mode) ? "1px solid #dddddd" : `1px solid ${themes.content}`,
                borderRight: (modee == mode) ? "1px solid #dddddd" : `1px solid ${themes.content}`,
            }
        }

        return (
            <ul style={{ paddingLeft: "0px", backgroundColor: `${themes.content}`, color: `${themes.font}`, borderBottom: "0px", display: "flex", margin: "0", height: "45px", float: "right", marginBottom: "-1px", flexWrap: "nowrap", alignItems: "flex-end" }}>
                <li>
                    <a id="users" href='/users' style={resss("users")}>
                        User
                    </a>
                </li>
                <li>
                    <a id="users" href='/groups' style={resss("groups")}>
                        Groups
                    </a>
                </li>
            </ul>
        )
    }

    function Userr({ mode }) {

        function resss(modee) {
            // console.log(modee, ' ', mode)
            return {
                borderRadius: "4px 4px 0 0",
                borderTop: (modee == mode[2]) ? "3px solid #ff99cc" : `1px solid ${themes.content}`,
                borderBottom: (modee == mode[2]) ? `1px solid ${themes.content}` : "1px solid #dddddd",
                borderLeft: (modee == mode[2]) ? "1px solid #dddddd" : `1px solid ${themes.content}`,
                borderRight: (modee == mode[2]) ? "1px solid #dddddd" : `1px solid ${themes.content}`,
            }
        }

        return (
            <ul style={{ paddingLeft: "0px", backgroundColor: `${themes.content}`, color: `${themes.font}`, borderBottom: "0px", display: "flex", margin: "0", height: "45px", float: "right", marginBottom: "-1px", flexWrap: "nowrap", alignItems: "flex-end" }}>
                <li>
                    <a id="users" href={`/user/${mode[1]}`} style={resss(undefined)}>
                        About
                    </a>
                </li>
                <li>
                    <a id="users" href={`/user/${mode[1]}/statistics`} style={resss("statistics")}>
                        Statistics
                    </a>
                </li>
                <li>
                    <a id="users" href={`/user/${mode[1]}/blogs`} style={resss("blogs")}>
                        Blogs
                    </a>
                </li>

                {
                    (cookies.user == mode[1]) ?
                        (
                            <li>
                                <a id="users" href={`/user/${mode[1]}/edit_profile`} style={resss("edit_profile")}>
                                    Edit profile
                                </a>
                            </li>
                        ) : (
                            <>
                            </>
                        )
                }

            </ul >
        )
    }



    function Create_title({ url }) {
        // let temp = url.split("/")[url.split("/").length - 1].split("#")[0].toLowerCase()

        let temp = url[0]


        temp = replaceAll(temp, "_", " ");
        // console.log(temp)


        if (temp == "user") {
            useEffect(() => {
                async function lmao() {

                    const res = await getdata("get", "users", url[1])
                    // console.log(tempp)
                    if (temp == "user") {
                        const temp = createRoot(document.getElementById("title"));
                        temp.render(
                            <a className='font-bold' style={{ color: get_rank_color(res.rank, res.role, themes.font) }}>
                                {
                                    (res.username) ? res.username : ""
                                }
                            </a>
                        )
                    }
                }

                lmao();
            }, [])
        }



        return (
            <>
                <br style={{ paddingBottom: "10px" }}>
                </br>
                <div
                    className='tabs'
                    style={{
                        borderBottom: `1px  solid ${themes.font}`,
                        display: "flex",
                        margin: "0 0 8px",
                        width: "100%",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        height: "45px"
                    }}>
                    {/* <br /> */}
                    <h2 id="title" style={{ maxWidth: "10em", fontSize: "2em" }}>
                        {
                            (temp == "admin")
                                ?
                                "Site administration"
                                :
                                (temp == "user")
                                    ?
                                    "" :
                                    (
                                        <a className='font-bold' >
                                            {(temp) ? temp.toUpperCase() : ""}
                                        </a>
                                    )
                        }
                    </h2>
                    {
                        (temp == "users" || temp == "groups") ? (
                            <Userss mode={temp} />
                        ) : (temp == "user") ? (<Userr mode={url} />) : (<></>)
                    }
                </div >
            </>
        )
    }

    root.render(
        <>
            {/* <MyComponent /> */}
            <Navigator mode={(urll[0] == "admin") ? "admin" : "normal"} />
            <div id='page-container' style={{ backgroundColor: themes.content, color: themes.font }}>
                <noscript>
                    <div id="noscript">This site works best with JavaScript enabled.</div>
                </noscript>
                <br></br>
                <main id='content'>
                    <Create_title url={urll} />

                    <div className="content-body" style={{ paddingBottom: "4em", display: "flex", justifyContent: "space-around" }}>
                        <Checking url={urll} />
                    </div>

                </main>

                <footer style={{
                    display: "flex", justifyContent: "space-around", flexDirection: "column",
                    backgroundColor: "white", color: "black"
                }}>
                    <span style={{ color: "black" }}>
                        {"proudly powered by "}
                        <a href="https://dmoj.ca">
                            DMOJ
                        </a>

                        {" & "}

                        <a href="https://oj.vnoi.info/">
                            VNOJ
                        </a>
                        {" using React.js | "}
                        <a href="/user/kuumoneko">
                            kuumoneko
                        </a>
                    </span>
                </footer>
            </div >
        </>
    );
})


// const all_language_code = ["C++03", "C++11", "C++14 (C++ Themis)", "C++17", "C++20", "Python 3", "java", "javascript"];


// setTimeout(async () => {
//     var res = await getdata("get", "users", "all")
//     // console.log(res)


//     const users = [];
//     Object.keys(res).forEach((data) => {
//         const item = res[data]
//         users.push(
//             {
//                 fullname: item.fullname,
//                 username: item.username,
//                 password: item.password,
//                 email: item.email,
//                 group: item.group,
//                 contribute: item.contribute,
//                 points: item.points,
//                 problems_count: item.problems_count,
//                 rank: item.rank,
//                 role: item.role,
//                 profile: {
//                     data: item.profile.data,
//                     html: item.profile.html,
//                 },
//                 themes: {
//                     color: item.themes.color,
//                     mode: item.themes.mode,
//                 },
//                 language: {
//                     languages: all_language_code,
//                     default_language: "C++20",
//                 },
//                 problems: item.problems,
//                 // [
//                 //     {
//                 //     name: "",
//                 //     submissions: [
//                 //         {
//                 //             time: "",
//                 //             status: "",
//                 //             tests: [
//                 //                 {
//                 //                     language: "",
//                 //                     user_code: "",
//                 //                     user_output: "",
//                 //                     input: "",
//                 //                     output: ""
//                 //                 }
//                 //             ]
//                 //         }
//                 //     ]
//                 // }
//                 // ],
//                 blogs: item.blogs,
//                 //[
//                 // {
//                 //     title: "",
//                 //     time: "",
//                 //     content: ""
//                 // }
//                 //]
//             }
//         )
//     })
//     for (const item of users) {
//         res[item.username] = item;
//         await getdata("post", "users", res[item.username])
//     }
//     console.log("lmao")
// }, 100);