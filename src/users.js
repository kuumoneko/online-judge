var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { color, ConvertToPage, get_rank_color, getdata, getGroup, SortGroup, SortUser } from "./ulti.js";
import { Languages, Theme_mode, User_role } from "./classes/enum.js";
function Pages(users, page, modee, search = "") {
    return __awaiter(this, void 0, void 0, function* () {
        const handleClick = (e) => {
            if (e.target.attributes.id.value == "pre") {
                render_users(modee, page - 1, search);
            }
            else if (e.target.attributes.id.value == "next") {
                render_users(modee, page + 1, search);
            }
            else if (e.target.attributes.id.value == "begin") {
                render_users(modee, 1, search);
            }
            else if (e.target.attributes.id.value == "end") {
                render_users(modee, users.length, search);
            }
            else {
                page = e.target.attributes.id.value;
                render_users(modee, Number(page), search);
            }
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        };
        const root = createRoot(document.getElementById("page"));
        const root2 = createRoot(document.getElementById("page2"));
        const themes = color[JSON.parse(localStorage.getItem("user")).themes.mode];
        let temp = false;
        const res = (React.createElement(StrictMode, null,
            React.createElement("button", { id: "begin", onClick: handleClick, style: { paddingLeft: "2px", paddingRight: "2px", marginRight: "5px", border: `1px solid ${themes.font}`, width: "25px", height: "25px" }, disabled: (page == 1) },
                React.createElement("a", { id: "begin", onClick: handleClick }, "<<")),
            React.createElement("button", { id: "pre", onClick: handleClick, style: { paddingLeft: "2px", paddingRight: "2px", marginRight: "5px", border: `1px solid ${themes.font}`, width: "25px", height: "25px" }, disabled: (page == 1) },
                React.createElement("a", { id: "pre", onClick: handleClick }, "<")),
            users.map((item, index) => {
                const color = (index + 1 == page) ? "#999900" : "";
                if (page <= 5) {
                    if (index < page + 2) {
                        return (React.createElement("button", { id: String(index + 1), onClick: handleClick, style: { paddingLeft: "2px", paddingRight: "2px", marginRight: "5px", border: `1px solid ${themes.font}`, width: "25px", height: "25px", backgroundColor: color }, disabled: false },
                            React.createElement("a", { id: String(index + 1), onClick: handleClick }, ` ${index + 1} `)));
                    }
                }
                else if (index < 2 || (index >= page - 3 && index <= page + 1)) {
                    return (React.createElement("button", { id: String(index + 1), onClick: handleClick, style: { paddingLeft: "2px", paddingRight: "2px", marginRight: "5px", border: `1px solid ${themes.font}`, width: "25px", height: "25px", backgroundColor: color }, disabled: false },
                        React.createElement("a", { id: String(index + 1), onClick: handleClick }, ` ${index + 1} `)));
                }
                else if (!temp) {
                    temp = true;
                    return (React.createElement("button", { id: "...", style: { paddingLeft: "2px", paddingRight: "2px", marginRight: "5px", border: `1px solid ${themes.font}`, width: "25px", height: "25px" }, disabled: true },
                        React.createElement("a", { id: "..." }, `...`)));
                }
            }),
            (page != users.length) && (React.createElement("button", { id: "...", style: { paddingLeft: "2px", paddingRight: "2px", marginRight: "5px", border: `1px solid ${themes.font}`, width: "25px", height: "25px" }, disabled: true },
                React.createElement("a", { id: "..." }, `...`))),
            React.createElement("button", { id: "next", onClick: handleClick, style: { paddingLeft: "2px", paddingRight: "2px", marginRight: "5px", border: `1px solid ${themes.font}`, width: "25px", height: "25px" }, disabled: (page == users.length) },
                React.createElement("a", { id: "next", onClick: handleClick }, ">")),
            React.createElement("button", { id: "end", onClick: handleClick, style: { paddingLeft: "2px", paddingRight: "2px", marginRight: "5px", border: `1px solid ${themes.font}`, width: "25px", height: "25px" }, disabled: (page == users.length) },
                React.createElement("a", { id: "end", onClick: handleClick }, ">>"))));
        root.render(res);
        root2.render(res);
    });
}
function test(users, page, modee, search = "") {
    return __awaiter(this, void 0, void 0, function* () {
        const pages = ConvertToPage(users, 100);
        Pages(pages, page, modee, search);
        const lists = pages[page - 1];
        const headers = (modee.mode == "users") ? ["rank", { username: "username", group: "group" }, "problems_count", "points"] : ["group", "unt"];
        const lmao = createRoot(document.getElementById("userss"));
        const temp = (modee.mode == "users") ? (React.createElement(React.Fragment, null,
            React.createElement("th", { id: "users", style: { width: "5%" } }, "STT"),
            React.createElement("th", { id: "users", style: { width: "10%" } },
                React.createElement("button", { name: "rank" }, "Rank")),
            React.createElement("th", { id: "users", style: { width: "55%" } }, "Username"),
            React.createElement("th", { id: "users", style: { width: "10%" } },
                React.createElement("button", { name: "prlcnt" }, "Problems count")),
            React.createElement("th", { id: "users", style: { width: "10%" } },
                React.createElement("button", { name: "pnt" }, "Points")))) : (React.createElement(React.Fragment, null,
            React.createElement("th", { id: "users", style: { width: "5%" } }, "STT"),
            React.createElement("th", { id: "users", style: { width: "55%" } }, "Group name"),
            React.createElement("th", { id: "users", style: { width: "10%" } },
                React.createElement("button", { name: "unt" }, "Users count"))));
        const themes = color[JSON.parse(localStorage.getItem("user")).themes.mode];
        lmao.render(React.createElement(StrictMode, null,
            React.createElement("tbody", { style: { display: "table-row-group", verticalAlign: "middle", borderColor: "inherit" } },
                React.createElement("tr", { style: { borderTop: "1px solid #dddddd" } }, temp),
                lists.map((user, index) => {
                    if (modee.mode == "users") {
                        const item = user.user;
                        const color = get_rank_color(item.rank, item.role, themes.font);
                        return (React.createElement("tr", null,
                            React.createElement("td", { style: { border: "1px solid #dddddd" } }, user.stt),
                            headers.map((header) => {
                                if (item[header] != undefined) {
                                    if (header == "rank") {
                                        return (React.createElement("td", { style: { border: "1px solid #dddddd", color: color, fontWeight: "bold" } }, item[header]));
                                    }
                                    else {
                                        return (React.createElement("td", { style: { border: "1px solid #dddddd" } }, item[header]));
                                    }
                                }
                                else {
                                    const groups = item.group;
                                    const fn_color = "#808080";
                                    let group = "";
                                    groups.forEach((item) => {
                                        group += `${item} | `;
                                    });
                                    return (React.createElement("td", { style: { border: "1px solid #dddddd" } },
                                        React.createElement("div", { style: { float: "left", paddingLeft: "10px" } },
                                            React.createElement("div", null,
                                                React.createElement("a", { className: "font-bold", style: { float: "left", color: color }, href: `/user/${user.username}` }, item.username)),
                                            React.createElement("span", null,
                                                React.createElement("a", { className: "font-light", style: { float: "left", color: fn_color, fontWeight: "600" } }, item.fullname))),
                                        React.createElement("div", { style: { float: "right", paddingRight: "10px", fontWeight: "bold", color: "#808080" } }, groups.map((group, index) => {
                                            if (index != groups.length - 1) {
                                                return (React.createElement(React.Fragment, null,
                                                    React.createElement("em", null,
                                                        React.createElement("a", { href: `/group/${group}` }, group)),
                                                    React.createElement("em", { style: { color: themes.font } }, " | ")));
                                            }
                                            else {
                                                return (React.createElement("em", null,
                                                    React.createElement("a", { href: `/group/${group}` }, group)));
                                            }
                                        }))));
                                }
                            })));
                    }
                    else {
                        const item = user.group;
                        return (React.createElement("tr", null,
                            React.createElement("td", { style: { border: "1px solid #dddddd" } }, user.stt),
                            headers.map((header, index) => {
                                return (React.createElement("td", { style: { border: "1px solid #dddddd" } }, (header == "group") ? (React.createElement("a", { href: `/group/${item[header]}` }, item[header])) : (React.createElement("a", null, item[header]))));
                            })));
                    }
                }))));
    });
}
function render_users(modee, curr_page, search = "") {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield getdata("get", "users", "all");
        const headers = ["stt", "username", "points", "problems_count", "contribute", "unt"];
        let mode = { mode: "", reverse: true };
        if (modee.rank != "auto") {
            mode = {
                mode: "rank",
                reverse: (modee.rank == "down") ? false : true
            };
        }
        else if (modee.prlcnt != "auto") {
            mode = {
                mode: "problems_count",
                reverse: (modee.prlcnt == "down") ? false : true
            };
        }
        else if (modee.pnt != "auto") {
            mode = {
                mode: "points",
                reverse: (modee.pnt == "down") ? false : true
            };
        }
        else if (modee.ctb != "auto") {
            mode = {
                mode: "contribute",
                reverse: (modee.ctb == "down") ? false : true
            };
        }
        else if (modee.unt != "auto") {
            mode = {
                mode: "unt",
                reverse: (modee.unt == "down") ? false : true
            };
        }
        if (modee.mode == "users") {
            const users = SortUser(res, mode.mode, mode.reverse, search || "");
            if (users.length == 0) {
                users.push({
                    stt: 1,
                    user: {
                        username: "Unable to find this user, try to search another word",
                        points: 0,
                        problems_count: 0,
                        group: [],
                        rank: 0,
                        role: User_role.user,
                        fullname: "",
                        password: "",
                        email: "",
                        profile: {
                            data: "",
                            html: ""
                        },
                        themes: {
                            mode: Theme_mode.dark
                        },
                        language: {
                            languages: [],
                            default_language: Languages.C03
                        },
                        problems: []
                    },
                    username: ""
                });
            }
            test(users, curr_page, modee, search);
        }
        else {
            const groups = SortGroup(getGroup(res), mode.mode, mode.reverse, search || "");
            if (groups.length == 0) {
                groups.push({
                    stt: 1,
                    group: {
                        group: "Unable to find this user, try to search another word",
                        unt: 0
                    },
                    name: ""
                });
            }
            test(groups, curr_page, modee, search);
        }
    });
}
function Render({ mode }) {
    let rank = "auto", prlcnt = "auto", pnt = "up", ctb = "auto", unt = "up";
    let curr_page = 1;
    const [searching, Setsearching] = useState(false);
    const [search, Setsearch] = useState("");
    useEffect(() => {
        render_users({ rank: rank, prlcnt: prlcnt, pnt: pnt, ctb: ctb, unt: unt, mode: mode }, curr_page);
    }, []);
    return (React.createElement("div", { style: { width: "4095px" } },
        React.createElement("div", { id: "page", style: { float: "left", paddingBottom: "10px" } },
            React.createElement("a", null, "loading....")),
        React.createElement("div", { style: { float: "right", paddingBottom: "10px" } },
            React.createElement("span", null,
                React.createElement("input", { className: "search", type: "text", placeholder: "Enter search here", onChange: (e) => {
                        Setsearch(e.target.value);
                        let temp;
                        if (searching == false) {
                            Setsearching(true);
                            temp = setTimeout(() => {
                                if (e != undefined) {
                                    render_users({ rank: rank, prlcnt: prlcnt, pnt: pnt, ctb: ctb, unt: unt, mode: mode }, curr_page, e.target.value);
                                }
                                Setsearching(false);
                            }, 2000);
                        }
                        else if (searching == true) {
                            clearTimeout(temp);
                        }
                    }, value: search || "" }))),
        React.createElement("div", { style: { float: "left", width: "100%" } },
            React.createElement("table", { style: { borderCollapse: "collapse", width: "100%", textAlign: "center" }, id: "userss", onClick: (e) => {
                    const target = e.target.attributes[0];
                    if (target.name == undefined) {
                        return;
                    }
                    else if (mode == "users" && target.name == "rank") {
                        rank = (rank == "up") ? "down" : "up";
                        prlcnt = "auto";
                        pnt = "auto";
                        ctb = "auto";
                        curr_page = 1;
                    }
                    else if (mode == "users" && target.name == "prlcnt") {
                        prlcnt = (prlcnt == "up") ? "down" : "up";
                        rank = "auto";
                        pnt = "auto";
                        ctb = "auto";
                        curr_page = 1;
                    }
                    else if (mode == "users" && target.name == "pnt") {
                        pnt = (pnt == "up") ? "down" : "up";
                        rank = "auto";
                        prlcnt = "auto";
                        ctb = "auto";
                        curr_page = 1;
                    }
                    else if (mode == "users" && target.name == "ctb") {
                        ctb = (ctb == "up") ? "down" : "up";
                        rank = "auto";
                        prlcnt = "auto";
                        pnt = "auto";
                        curr_page = 1;
                    }
                    else if (mode == "groups" && target.name == "unt") {
                        unt = (unt == "up") ? "down" : "up";
                    }
                    console.log(unt);
                    render_users({ rank: rank, prlcnt: prlcnt, pnt: pnt, ctb: ctb, unt: unt, mode: mode }, curr_page);
                } },
                React.createElement("a", { style: { fontSize: "30px" } }, "Loading..."))),
        React.createElement("div", { id: "page2", style: { float: "left", paddingTop: "10px" } },
            React.createElement("a", null, "loading...."))));
}
export function Users({ mode }) {
    if (mode == "users") {
        return (React.createElement(Render, { mode: "users" }));
    }
    else {
        return (React.createElement(Render, { mode: "groups" }));
    }
}
//# sourceMappingURL=users.js.map