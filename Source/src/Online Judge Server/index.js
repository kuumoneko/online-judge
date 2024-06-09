var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { useEffect, useState } from 'react';
import { createRoot } from "react-dom/client";
import "./index.css";
import { Navigator } from "./navigator.js";
import Cookies from 'js-cookie';
import { color, color_themes, cookie, getdata, geturl, Theme_mode, User_role } from "online-judge-types";
import { Home } from './home/index.js';
import { Admin } from './admin/index.js';
import { Title } from './title.js';
const root = createRoot(document.getElementById("root"));
function Checking({ url, users, cookies }) {
    const direct = url[0];
    if (cookies.user && (direct == "login" || direct == "signup")) {
        return (React.createElement("div", null, "\"loged in bruh :V\""));
    }
    if (direct != "admin") {
        return (React.createElement(Home, { users: users }));
    }
    else {
        return (React.createElement(Admin, null));
    }
}
function KuumoOj() {
    const [log, setlog] = useState("");
    const [url, seturl] = useState([]);
    const [cookies, setcookies] = useState({});
    const [user, setuser] = useState();
    const [users, setusers] = useState();
    const [themes, setthemes] = useState();
    useEffect(() => {
        if (user != undefined) {
        }
    }, [log, url, cookies, user, users, themes]);
    useEffect(() => {
        function logout() {
            return __awaiter(this, void 0, void 0, function* () {
                yield getdata("logout", "", "");
            });
        }
        function login() {
            return __awaiter(this, void 0, void 0, function* () {
                const temp = yield getdata("auth", "users", "");
                const data = yield getdata("get", "users", "all");
                setusers(data);
                const res = data.find((item) => {
                    if (temp == undefined) {
                        return false;
                    }
                    else {
                        return item.username == temp.data.username;
                    }
                });
                if (res == undefined || res == null) {
                    const temp = {
                        themes: {
                            color: color_themes,
                            mode: Theme_mode.light
                        },
                        role: User_role.user
                    };
                    localStorage.setItem("user", JSON.stringify(temp));
                    setuser(temp);
                }
                else {
                    res.password = undefined;
                    localStorage.setItem("user", JSON.stringify(res));
                    setuser(res);
                }
            });
        }
        if (log == "logout") {
            const temp = logout();
        }
        else if (log == "login") {
            login();
        }
    }, [log]);
    useEffect(() => {
        if (user != undefined) {
            if (user.verified == false && url[1] != 'verify') {
                window.location.href = `/verify/${user.username}`;
            }
            let temp = "";
            if (url[1] == "admin") {
                temp = `Adminisrator ${url[2] ? `for ${url[2]}` : "Dashboard"}`;
            }
            else {
                temp = (url[1]) ? url[1].replace(url[1][0], url[1][0].toUpperCase()) : "Home page";
            }
            document.title = temp;
            if (Cookies.get("themes") == undefined) {
                Cookies.set("themes", "light", { expires: 400000 });
            }
            else {
                Cookies.set("themes", user.themes.mode, { expires: 400000 });
            }
            setthemes((user) ? color[user.themes.mode] : color[Cookies.get("themes")]);
        }
    }, [user]);
    useEffect(() => {
        if (!document.referrer && Cookies.get("remember") == "false") {
            setlog("logout");
            Cookies.remove("remember");
        }
        else {
            setlog("login");
        }
        seturl(geturl());
        setcookies(cookie(document));
    }, []);
    const [html, sethtml] = useState(React.createElement(React.Fragment, null));
    useEffect(() => {
        if (user != undefined) {
            sethtml(React.createElement(React.Fragment, null,
                React.createElement(Navigator, { mode: (url[1] == "admin") ? "admin" : "normal" }),
                React.createElement("div", { id: 'page-container', style: { backgroundColor: themes.content, color: themes.font } },
                    React.createElement("noscript", null,
                        React.createElement("div", { id: "noscript" }, " This site works best with JavaScript enabled.")),
                    React.createElement("br", null),
                    React.createElement("main", { id: 'content' },
                        React.createElement(Title, { url: url, themes: themes }),
                        React.createElement("div", { className: "content-body", style: { paddingBottom: "4em", display: "flex", justifyContent: "space-around" } },
                            React.createElement(Checking, { url: url, users: users, cookies: cookies }))),
                    React.createElement("footer", { style: {
                            display: "flex", justifyContent: "space-around", flexDirection: "column",
                            backgroundColor: "white", color: "black"
                        } },
                        React.createElement("span", { style: { color: "black" } },
                            "proudly powered by ",
                            React.createElement("a", { href: "https://dmoj.ca", target: "_blank", rel: "noopener noreferrer" }, "DMOJ"),
                            " & ",
                            React.createElement("a", { href: "https://oj.vnoi.info/", target: "_blank", rel: "noopener noreferrer" }, "VNOJ"),
                            " using ",
                            React.createElement("a", { target: "_blank", rel: "noopener noreferrer", href: "https://react.dev/?uwu=true" }, " React.js "),
                            " | ",
                            React.createElement("a", { href: "/user/kuumoneko", target: "_blank", rel: "noopener noreferrer" }, "kuumoneko"))))));
        }
    }, [themes]);
    return (html);
}
root.render(React.createElement(KuumoOj, null));
//# sourceMappingURL=index.js.map