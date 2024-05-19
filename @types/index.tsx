// @ts-nocheck
import React from 'react';
import { createRoot } from "react-dom/client";
import "./index.css";
import { Navigator } from "./navigator.js";
import Cookies from 'js-cookie';
import { color, color_themes, cookie, getdata, geturl } from './@classes/ultility.js';
import { Theme_mode, User_role } from './@classes/enum.js';
import { Home } from './home/index.js';
import { Admin } from './admin/index.js';
import { Title } from './title.js';

const root = createRoot(document.getElementById("root"));


if (!document.referrer && Cookies.get("remember") == "false") {
    Cookies.remove("user")
    Cookies.remove("remember")
}
// const url = document.URL;

const urll = geturl();
let cookies = cookie(document);

async function lmao() {
    const res = await getdata("get", "users", cookies.user);
    // console.log("lmao")


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

    let temp: string = "";
    if (urll[0] == "admin") {
        temp = `Adminisrator ${urll[1] ? `for ${urll[1]}` : "Dashboard"}`
    }
    else {
        temp = (urll[0]) ? urll[0].replace(urll[0][0], urll[0][0].toUpperCase()) : "Home page"
    }

    document.title = temp;

    // console.log(Cookies.get("themes"))
    if (Cookies.get("themes") == undefined) {
        Cookies.set("themes", "light", { expires: 400000 })
    }
    else {
        Cookies.set("themes", res.themes.mode, { expires: 400000 })
    }
    const themes = (res) ? color[res.themes.mode] : color[Cookies.get("themes")];

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
                    <Title url={urll} themes={themes} />

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
        </>
    );

    // root.unmount();
})