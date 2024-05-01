var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { useEffect } from 'react';
import { createRoot } from "react-dom/client";
import "./index.css";
import { Navigator } from "./navigator.js";
import Cookies from 'js-cookie';
import { color, color_themes, cookie, get_rank_color, getdata, geturl, replaceAll } from './ulti.js';
import { Users } from './users.js';
import { About } from './about.js';
import { Admin } from './admin.js';
import { User } from './user.js';
import { Userring } from './account.js';
import { HomePage } from './home.js';
import { Theme_mode, User_role } from './classes/enum.js';
const root = createRoot(document.getElementById("root"));
if (!document.referrer && Cookies.get("remember") == "false") {
    Cookies.remove("user");
    Cookies.remove("remember");
}
const url = document.URL;
const urll = geturl();
let cookies = cookie(document);
function lmao() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield getdata("get", "users", cookies.user);
        if (res == undefined || res == null) {
            const temp = {
                themes: {
                    color: color_themes,
                    mode: Theme_mode.light
                },
                role: User_role.user
            };
            localStorage.setItem("user", JSON.stringify(temp));
            return temp;
        }
        res.password = undefined;
        localStorage.setItem("user", JSON.stringify(res));
        localStorage.setItem("date", new Date().getTime());
        return res;
    });
}
lmao().then((res) => __awaiter(void 0, void 0, void 0, function* () {
    const themes = (res) ? color[res.themes.mode] : color.light;
    const ress = yield getdata("get", "users", "all");
    function Checking({ url }) {
        const direct = url[0];
        if (cookies.user && (direct == "login" || direct == "signup")) {
            return (React.createElement(Already, null));
        }
        if (direct == "") {
            return (React.createElement(HomePage, { users: ress }));
        }
        if (direct == "users" || direct == "contributors" || direct == "groups") {
            return (React.createElement(Users, { mode: direct, users: ress }));
        }
        else if (direct == "user") {
            if (url[1] == undefined) {
                window.location.href = "/account";
            }
            return (React.createElement(User, { url: url, users: ress }));
        }
        else if (direct == "about") {
            return (React.createElement(About, { user: res }));
        }
        else if (direct == "admin") {
            return (React.createElement(Admin, null));
        }
        else if (direct == "account") {
            return (React.createElement(Userring, null));
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
            };
        }
        return (React.createElement("ul", { style: { paddingLeft: "0px", backgroundColor: `${themes.content}`, color: `${themes.font}`, borderBottom: "0px", display: "flex", margin: "0", height: "45px", float: "right", marginBottom: "-1px", flexWrap: "nowrap", alignItems: "flex-end" } },
            React.createElement("li", null,
                React.createElement("a", { id: "users", href: '/users', style: resss("users") }, "User")),
            React.createElement("li", null,
                React.createElement("a", { id: "users", href: '/groups', style: resss("groups") }, "Groups"))));
    }
    function Userr({ mode }) {
        function resss(modee) {
            return {
                borderRadius: "4px 4px 0 0",
                borderTop: (modee == mode[2]) ? "3px solid #ff99cc" : `1px solid ${themes.content}`,
                borderBottom: (modee == mode[2]) ? `1px solid ${themes.content}` : "1px solid #dddddd",
                borderLeft: (modee == mode[2]) ? "1px solid #dddddd" : `1px solid ${themes.content}`,
                borderRight: (modee == mode[2]) ? "1px solid #dddddd" : `1px solid ${themes.content}`,
            };
        }
        return (React.createElement("ul", { style: { paddingLeft: "0px", backgroundColor: `${themes.content}`, color: `${themes.font}`, borderBottom: "0px", display: "flex", margin: "0", height: "45px", float: "right", marginBottom: "-1px", flexWrap: "nowrap", alignItems: "flex-end" } },
            React.createElement("li", null,
                React.createElement("a", { id: "users", href: `/user/${mode[1]}`, style: resss(undefined) }, "About")),
            React.createElement("li", null,
                React.createElement("a", { id: "users", href: `/user/${mode[1]}/statistics`, style: resss("statistics") }, "Statistics")),
            React.createElement("li", null,
                React.createElement("a", { id: "users", href: `/user/${mode[1]}/blogs`, style: resss("blogs") }, "Blogs")),
            (cookies.user == mode[1]) ?
                (React.createElement("li", null,
                    React.createElement("a", { id: "users", href: `/user/${mode[1]}/edit_profile`, style: resss("edit_profile") }, "Edit profile"))) : (React.createElement(React.Fragment, null))));
    }
    function Create_title({ url }) {
        let temp = url[0];
        temp = replaceAll(temp, "_", " ");
        if (temp == "user") {
            useEffect(() => {
                function lmao() {
                    return __awaiter(this, void 0, void 0, function* () {
                        const res = yield getdata("get", "users", url[1]);
                        if (temp == "user") {
                            const temp = createRoot(document.getElementById("title"));
                            temp.render(React.createElement("a", { className: 'font-bold', style: { color: get_rank_color(res.rank, res.role, themes.font) } }, (res.username) ? res.username : ""));
                        }
                    });
                }
                lmao();
            }, []);
        }
        return (React.createElement(React.Fragment, null,
            React.createElement("br", { style: { paddingBottom: "10px" } }),
            React.createElement("div", { className: 'tabs', style: {
                    borderBottom: `1px  solid ${themes.font}`,
                    display: "flex",
                    margin: "0 0 8px",
                    width: "100%",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    height: "45px"
                } },
                React.createElement("h2", { id: "title", style: { maxWidth: "10em", fontSize: "2em" } }, (temp == "admin")
                    ?
                        "Site administration"
                    :
                        (temp == "user")
                            ?
                                "" :
                            (React.createElement("a", { className: 'font-bold' }, (temp) ? temp.toUpperCase() : ""))),
                (temp == "users" || temp == "groups") ? (React.createElement(Userss, { mode: temp })) : (temp == "user") ? (React.createElement(Userr, { mode: url })) : (React.createElement(React.Fragment, null)))));
    }
    root.render(React.createElement(React.Fragment, null,
        React.createElement(Navigator, { mode: (urll[0] == "admin") ? "admin" : "normal" }),
        React.createElement("div", { id: 'page-container', style: { backgroundColor: themes.content, color: themes.font } },
            React.createElement("noscript", null,
                React.createElement("div", { id: "noscript" }, " This site works best with JavaScript enabled.")),
            React.createElement("br", null),
            React.createElement("main", { id: 'content' },
                React.createElement(Create_title, { url: urll }),
                React.createElement("div", { className: "content-body", style: { paddingBottom: "4em", display: "flex", justifyContent: "space-around" } },
                    React.createElement(Checking, { url: urll }))),
            React.createElement("footer", { style: {
                    display: "flex", justifyContent: "space-around", flexDirection: "column",
                    backgroundColor: "white", color: "black"
                } },
                React.createElement("span", { style: { color: "black" } },
                    "proudly powered by ",
                    React.createElement("a", { href: "https://dmoj.ca" }, "DMOJ"),
                    " & ",
                    React.createElement("a", { href: "https://oj.vnoi.info/" }, "VNOJ"),
                    " using React.js | ",
                    React.createElement("a", { href: "/user/kuumoneko" }, "kuumoneko"))))));
}));
//# sourceMappingURL=index.js.map