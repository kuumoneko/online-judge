var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    Cookies.remove("user");
    Cookies.remove("remember");
}
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
    let temp = "";
    if (urll[0] == "admin") {
        temp = `Adminisrator ${urll[1] ? `for ${urll[1]}` : "Dashboard"}`;
    }
    else {
        temp = (urll[0]) ? urll[0].replace(urll[0][0], urll[0][0].toUpperCase()) : "Home page";
    }
    document.title = temp;
    if (Cookies.get("themes") == undefined) {
        Cookies.set("themes", "light", { expires: 400000 });
    }
    else {
        Cookies.set("themes", res.themes.mode, { expires: 400000 });
    }
    const themes = (res) ? color[res.themes.mode] : color[Cookies.get("themes")];
    const ress = yield getdata("get", "users", "all");
    function Checking({ url }) {
        const direct = url[0];
        if (cookies.user && (direct == "login" || direct == "signup")) {
            return (React.createElement(Already, { url: url }));
        }
        if (direct != "admin") {
            return (React.createElement(Home, { users: ress }));
        }
        else {
            return (React.createElement(Admin, null));
        }
    }
    root.render(React.createElement(React.Fragment, null,
        React.createElement(Navigator, { mode: (urll[0] == "admin") ? "admin" : "normal" }),
        React.createElement("div", { id: 'page-container', style: { backgroundColor: themes.content, color: themes.font } },
            React.createElement("noscript", null,
                React.createElement("div", { id: "noscript" }, " This site works best with JavaScript enabled.")),
            React.createElement("br", null),
            React.createElement("main", { id: 'content' },
                React.createElement(Title, { url: urll, themes: themes }),
                React.createElement("div", { className: "content-body", style: { paddingBottom: "4em", display: "flex", justifyContent: "space-around" } },
                    React.createElement(Checking, { url: urll }))),
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
}));
//# sourceMappingURL=index.js.map