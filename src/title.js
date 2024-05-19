var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { useEffect } from "react";
import { get_rank_color, getdata, replaceAll } from "./@classes/ultility.js";
import { User_role } from "./@classes/enum.js";
import Cookies from "js-cookie";
function Userss({ mode, themes }) {
    function resss(modee) {
        return {
            borderRadius: "4px 4px 0 0",
            borderTop: (modee == mode) ? "3px solid #ff99cc" : `1px solid ${themes.content}`,
            borderBottom: (modee == mode) ? `1px solid ${themes.content}` : `1px solid ${themes.font}`,
            borderLeft: (modee == mode) ? `1px solid ${themes.font}` : `1px solid ${themes.content}`,
            borderRight: (modee == mode) ? `1px solid ${themes.font}` : `1px solid ${themes.content}`,
        };
    }
    return (React.createElement("ul", { style: { paddingLeft: "0px", backgroundColor: `${themes.content}`, color: `${themes.font}`, borderBottom: "0px", display: "flex", margin: "0", height: "45px", float: "right", marginBottom: "-1px", flexWrap: "nowrap", alignItems: "flex-end" } },
        React.createElement("li", null,
            React.createElement("a", { id: "users", href: '/users', style: resss("users") }, "User")),
        React.createElement("li", null,
            React.createElement("a", { id: "users", href: '/groups', style: resss("groups") }, "Groups"))));
}
function Userr({ mode, themes }) {
    function resss(modee) {
        return {
            borderRadius: "4px 4px 0 0",
            borderTop: (modee == mode[2]) ? "3px solid #ff99cc" : `1px solid ${themes.content}`,
            borderBottom: (modee == mode[2]) ? `1px solid ${themes.content}` : `1px solid ${themes.font}`,
            borderLeft: (modee == mode[2]) ? `1px solid ${themes.font}` : `1px solid ${themes.content}`,
            borderRight: (modee == mode[2]) ? `1px solid ${themes.font}` : `1px solid ${themes.content}`,
        };
    }
    return (React.createElement("ul", { style: { paddingLeft: "0px", backgroundColor: `${themes.content}`, color: `${themes.font}`, borderBottom: "0px", display: "flex", margin: "0", height: "45px", float: "right", marginBottom: "-1px", flexWrap: "nowrap", alignItems: "flex-end" } },
        React.createElement("li", null,
            React.createElement("a", { id: "users", href: `/user/${mode[1]}`, style: resss(undefined) }, "About")),
        React.createElement("li", null,
            React.createElement("a", { id: "users", href: `/user/${mode[1]}/statistics`, style: resss("statistics") }, "Statistics")),
        React.createElement("li", null,
            React.createElement("a", { id: "users", href: `/user/${mode[1]}/blogs`, style: resss("blogs") }, "Blogs")),
        (Cookies.get("user") == mode[1]) &&
            (React.createElement("li", null,
                React.createElement("a", { id: "users", href: `/user/${mode[1]}/edit_profile`, style: resss("edit_profile") }, "Edit profile")))));
}
export function Title({ url, themes }) {
    let temp = url[0];
    temp = replaceAll(temp, "_", " ");
    useEffect(() => {
        function lmaoo() {
            return __awaiter(this, void 0, void 0, function* () {
                const temp = yield getdata("get", "users", url[1]);
                const titllee = document.getElementById("titlee");
                if (titllee) {
                    titllee.style.color = get_rank_color(temp.rank, User_role.user, themes.content);
                }
            });
        }
        if (temp == "user") {
            lmaoo();
        }
    });
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
            React.createElement("h2", { id: "title", style: { fontSize: "2em" } }, (temp == "admin")
                ?
                    `Adminisrator ${url[1] ? `for ${url[1]}` : "Dashboard"}`
                :
                    (temp == "user") ?
                        (React.createElement("a", { id: "titlee", className: 'font-bold' }, url[1])) : temp.toUpperCase()),
            (temp == "users" || temp == "groups") ? (React.createElement(Userss, { mode: temp, themes: themes })) : (temp == "user") ? (React.createElement(Userr, { mode: url, themes: themes })) : (React.createElement(React.Fragment, null)))));
}
//# sourceMappingURL=title.js.map