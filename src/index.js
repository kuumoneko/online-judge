// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { createRoot } from "react-dom/client";
import "./index.css";
import { Navigator } from "./navigator/index.js";
import Cookies from 'js-cookie';
import { getdata, geturl, } from "ultility/ulti.js";
import { color } from 'ultility/color.js';
import { Home } from './home/index.js';
import { Admin } from './admin/index.js';
import { Title } from './title.js';
import { auth_user } from './pre_run/auth.js';
const root_element = document.getElementById("root");
const root = createRoot(root_element);
function Server() {
    const [url, seturl] = useState(geturl());
    const [themes, setthemes] = useState();
    useEffect(() => {
        async function pre_run() {
            const res = await auth_user();
            // console.log(res.data.username)
            if (res.data.username == undefined) {
                // console.log(Cookies.get("theme") == "undefined")
                Cookies.set("theme", (Cookies.get("theme") == undefined) ? "light" : Cookies.get("theme"), {
                    expires: 365
                });
                setthemes(color[Cookies.get("theme")]);
                localStorage.removeItem("username");
                localStorage.removeItem("email");
                localStorage.removeItem("role");
                localStorage.removeItem("rank");
            }
            else {
                const user = await getdata("get", "users", res.data.username);
                // console.log(user.data.data[0].verified)
                if (user.data.data[0].verified == false && url[0] != "verify") {
                    window.location.href = `/verify/${user.data.data[0].username}`;
                }
                Cookies.set("theme", user.data.data[0].themes.mode, {
                    expires: 365
                });
                // setuser(undefined)
                setthemes(color[Cookies.get("theme")]);
                localStorage.setItem("username", res.data.username);
                localStorage.setItem("email", user.data.data[0].email);
                localStorage.setItem("role", user.data.data[0].role);
                localStorage.setItem("rank", user.data.data[0].rank);
            }
        }
        pre_run();
    }, []);
    const [html, sethtml] = useState(React.createElement(React.Fragment, null));
    useEffect(() => {
        // console.log(themes)
        if (themes == undefined) {
            return;
        }
        const body = document.getElementById("root");
        if (body) {
            // body.style.height = "200vh"
            body.style.backgroundColor = themes.content;
            body.style.color = themes.font;
        }
        sethtml(React.createElement(React.Fragment, null,
            React.createElement(Navigator, null),
            React.createElement("div", { style: {
                    paddingLeft: "25px",
                    paddingRight: "25px"
                } },
                React.createElement(Title, { url: url, themes: themes }),
                React.createElement("div", { className: "content-body", style: { paddingBottom: "4em", display: "flex", justifyContent: "space-around" } }, (url[0] == "admin") ? (React.createElement(Admin, null)) : (React.createElement(Home, null)))),
            React.createElement("footer", { style: {
                    display: "flex", justifyContent: "space-around", flexDirection: "column",
                    backgroundColor: "white", color: "black"
                } },
                React.createElement("span", { style: { color: "black" } },
                    "proudly powered by ",
                    React.createElement("a", { target: "_blank", rel: "noopener noreferrer", href: "https://react.dev" }, " React.js "),
                    " | ",
                    React.createElement("a", { href: "/user/kuumoneko", target: "_blank", rel: "noopener noreferrer" }, "kuumoneko")))));
    }, [themes]);
    return (html);
}
root.render(React.createElement(Server, null));
//# sourceMappingURL=index.js.map