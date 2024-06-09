// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { createRoot } from "react-dom/client";
import "./index.css"
import { Navigator } from "./navigator.js";
import Cookies from 'js-cookie';
import { color, color_themes, cookie, getdata, geturl, Theme_mode, User_role } from "online-judge-types";
import { Home } from './home/index.js';
import { Admin } from './admin/index.js';
import { Title } from './title.js';

const root = createRoot(document.getElementById("root"));

function Checking({ url, users, cookies }) {
    const direct = url[0];
    // console.log(direct)

    if (cookies.user && (direct == "login" || direct == "signup")) {
        return (
            <div>
                "loged in bruh :V"
            </div>
        )
    }

    if (direct != "admin") {
        return (
            <Home users={users} />
        )
    }
    else {
        return (
            <Admin />
        )
    }
}


function KuumoOj() {

    // pre login
    const [log, setlog] = useState("");
    const [url, seturl] = useState([])
    const [cookies, setcookies] = useState({})

    const [user, setuser] = useState()
    const [users, setusers] = useState()
    // login

    const [themes, setthemes] = useState()

    useEffect(() => {
        if (user != undefined) {
            // console.log("have user")
        }
    }, [log, url, cookies, user, users, themes])


    useEffect(() => {
        async function logout() {
            await getdata("logout", "", "");
        }

        async function login() {
            // console.log("login")
            const temp = await getdata("auth", "users", "");
            // console.log((await getdata("get", "users", "all")).find((item: any) => item.username == "kuumoneko"))
            const data = (await getdata("get", "users", "all") as any[])


            setusers(data)

            const res = data.find((item: any) => {
                if (temp == undefined) {
                    return false;
                }
                else {
                    return item.username == temp.data.username
                }
            })

            if (res == undefined || res == null) {
                const temp = {
                    themes: {
                        color: color_themes,
                        mode: Theme_mode.light
                    },
                    role: User_role.user
                }

                localStorage.setItem("user", JSON.stringify(temp))
                // console.log("bruh")
                setuser(temp)
            }
            else {
                res.password = undefined;
                localStorage.setItem("user", JSON.stringify(res))
                // console.log("lmao")
                setuser(res)
            }
        }

        if (log == "logout") {
            const temp = logout();
        }
        else if (log == "login") {
            // console.log("login")
            login();
        }
    }, [log])


    useEffect(() => {
        // console.log(user)
        if (user != undefined) {
            if (user.verified == false && url[1] != 'verify') {
                window.location.href = `/verify/${user.username}`
            }

            // console.log(res)
            let temp: string = "";
            if (url[1] == "admin") {
                temp = `Adminisrator ${url[2] ? `for ${url[2]}` : "Dashboard"}`
            }
            else {
                temp = (url[1]) ? url[1].replace(url[1][0], url[1][0].toUpperCase()) : "Home page"
            }

            document.title = temp;

            // console.log(Cookies.get("themes"))
            if (Cookies.get("themes") == undefined) {
                Cookies.set("themes", "light", { expires: 400000 })
            }
            else {
                Cookies.set("themes", user.themes.mode, { expires: 400000 })
            }
            // console.log(user)
            setthemes((user) ? color[user.themes.mode] : color[Cookies.get("themes")])
        }

    }, [user])


    useEffect(() => {
        if (!document.referrer && Cookies.get("remember") == "false") {
            setlog("logout")
            Cookies.remove("remember")
        }
        else {
            setlog("login")
        }

        seturl(geturl())
        setcookies(cookie(document))
    }, [])

    const [html, sethtml] = useState(<></>);

    useEffect(() => {
        if (user != undefined) {
            // console.log(themes)


            sethtml(<>
                {/* <MyComponent /> */}
                <Navigator mode={(url[1] == "admin") ? "admin" : "normal"} />

                <div id='page-container' style={{ backgroundColor: themes.content, color: themes.font }}>
                    <noscript>
                        <div id="noscript" > This site works best with JavaScript enabled.</div>
                    </noscript>
                    <br />
                    <main id='content' >
                        <Title url={url} themes={themes} />

                        <div className="content-body" style={{ paddingBottom: "4em", display: "flex", justifyContent: "space-around" }}>
                            <Checking url={url} users={users} cookies={cookies} />
                        </div>
                    </main>

                    <footer style={{
                        display: "flex", justifyContent: "space-around", flexDirection: "column",
                        backgroundColor: "white", color: "black"
                    }}>
                        <span style={{ color: "black" }}>
                            {"proudly powered by "}
                            <a href="https://dmoj.ca" target="_blank" rel="noopener noreferrer">
                                DMOJ
                            </a>

                            {" & "}

                            <a href="https://oj.vnoi.info/" target="_blank" rel="noopener noreferrer">
                                VNOJ
                            </a>
                            {" using "}
                            <a target="_blank" rel="noopener noreferrer" href="https://react.dev/?uwu=true">
                                {" React.js "}
                            </a>
                            {" | "}
                            <a href="/user/kuumoneko" target="_blank" rel="noopener noreferrer">
                                kuumoneko
                            </a>
                        </span>
                    </footer>
                </div >
            </>)
        }
    }, [themes])


    return (
        html
    )


}

root.render(<KuumoOj />)