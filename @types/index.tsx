// @ts-nocheck
import React from 'react';
import { createRoot } from "react-dom/client";
import "./index.css";
import { Navigator } from "./navigator.js";
import Cookies from 'js-cookie';
import { color, color_themes, cookie, get_rank_color, getdata, geturl, replaceAll } from './@classes/ultility.js';
import { Theme_mode, User_role } from './@classes/enum.js';
import { Home } from './home/index.js';
import { Admin } from './admin/index.js';

const root = createRoot(document.getElementById("root"));


if (!document.referrer && Cookies.get("remember") == "false") {
    Cookies.remove("user")
    Cookies.remove("remember")
}
const url = document.URL;

const urll = geturl();
let cookies = cookie(document);

async function lmao() {
    const res = await getdata("get", "users", cookies.user);
    // console.log(res)


    if (res == undefined || res == null) {
        const temp = {
            themes: {
                color: color_themes,
                mode: Theme_mode.light
            },
            role: User_role.user
        }

        localStorage.setItem("user", JSON.stringify(temp))
        return temp;

    }
    res.password = undefined;


    localStorage.setItem("user", JSON.stringify(res))
    localStorage.setItem("date", new Date().getTime())
    return res;

}

lmao().then(async (res) => {
    const themes = (res) ? color[res.themes.mode] : color.light;

    const ress = await getdata("get", "users", "all")
    function Checking({ url }) {
        const direct = url[0];

        if (cookies.user && (direct == "login" || direct == "signup")) {
            return (
                <Already url={url} />
            )
        }

        if (direct != "admin") {
            return (
                <Home users={ress} />
            )
        }
        else {
            return (
                <Admin />
            )
        }


        // if (direct == "") {
        //     return (
        //         <HomePage />
        //     )
        // }

        // if (direct == "users") {
        //     return (
        //         <Home_Users />
        //     )
        // }
        // else if (direct == "groups") {
        //     return (
        //         <Home_Groups />
        //     )
        // }
        // // else if (direct == "user") {
        // //     if (url[1] == undefined) {
        // //         window.location.href = "/account"
        // //     }
        // //     return (
        // //         <User url={url} users={ress} />
        // //     )
        // // }
        // else if (direct == "about") {
        //     return (
        //         <About user={res} />
        //     )
        // }
        // else if (direct == "admin") {
        //     return (
        //         <Admin />
        //     )
        // }
        // // else if (direct == "account") {
        //     return (
        //         <Userring />

        //     )
        // }
    }

    function Userss({ mode }) {

        function resss(modee: string) {

            return {
                borderRadius: "4px 4px 0 0",
                borderTop: (modee == mode) ? "3px solid #ff99cc" : `1px solid ${themes.content}`,
                borderBottom: (modee == mode) ? `1px solid ${themes.content}` : "1px solid #dddddd",
                borderLeft: (modee == mode) ? "1px solid #dddddd" : `1px solid ${themes.content}`,
                borderRight: (modee == mode) ? "1px solid #dddddd" : `1px solid ${themes.content}`,
            }
        }

        return (
            <ul style={{ paddingLeft: "0px", backgroundColor: `${themes.content}`, color: `${themes.font}`, borderBottom: "0px", display: "flex", margin: "0", height: "45px", float: "right", marginBottom: "-1px", flexWrap: "nowrap", alignItems: "flex-end" }
            }>
                <li>
                    <a id="users" href='/users' style={resss("users")} >
                        User
                    </a>
                </li>
                <li >
                    <a id="users" href='/groups' style={resss("groups")} >
                        Groups
                    </a>
                </li>
            </ul>
        )
    }

    function Userr({ mode }) {

        function resss(modee: string | undefined) {
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
            <ul style={{ paddingLeft: "0px", backgroundColor: `${themes.content}`, color: `${themes.font}`, borderBottom: "0px", display: "flex", margin: "0", height: "45px", float: "right", marginBottom: "-1px", flexWrap: "nowrap", alignItems: "flex-end" }
            }>
                <li>
                    <a id="users" href={`/user/${mode[1]}`} style={resss(undefined)} >
                        About
                    </a>
                </li>
                <li >
                    <a id="users" href={`/user/${mode[1]}/statistics`} style={resss("statistics")} >
                        Statistics
                    </a>
                </li>
                <li >
                    <a id="users" href={`/user/${mode[1]}/blogs`} style={resss("blogs")} >
                        Blogs
                    </a>
                </li>

                {
                    (cookies.user == mode[1]) &&
                    (
                        <li>
                            <a id="users" href={`/user/${mode[1]}/edit_profile`
                            } style={resss("edit_profile")} >
                                Edit profile
                            </a>
                        </li>
                    )
                }

            </ul >
        )
    }



    function Create_title({ url }) {
        // let temp = url.split("/")[url.split("/").length - 1].split("#")[0].toLowerCase()
        // console.log(url)
        let temp = url[0]


        temp = replaceAll(temp, "_", " ");


        console.log(temp)

        return (
            <>
                <br style={{ paddingBottom: "10px" }} />
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
                                (temp == "user") &&
                                (
                                    <a className='font-bold' style={{ color: get_rank_color(JSON.parse(localStorage.getItem("user")).rank, User_role.user, themes.content) }}>
                                        {
                                            url[1] && url[1]
                                        }
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
                    <div id="noscript" > This site works best with JavaScript enabled.</div>
                </noscript>
                <br />
                <main id='content' >
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
                        <a href="https://dmoj.ca" >
                            DMOJ
                        </a>

                        {" & "}

                        <a href="https://oj.vnoi.info/" >
                            VNOJ
                        </a>
                        {" using React.js | "}
                        <a href="/user/kuumoneko" >
                            kuumoneko
                        </a>
                    </span>
                </footer>
            </div >
        </>
    );
})