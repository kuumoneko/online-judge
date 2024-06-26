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
import { color, get_rank_color, getdata, Languages, Theme_mode, User_role } from "online-judge-types";
export function Home_Users() {
    const [search, Setsearch] = useState("");
    const [curr_page, setCurr_page] = useState(1);
    const [mode, setmode] = useState("points");
    const [reverse, setreverse] = useState(true);
    const [page, setpage] = useState(React.createElement(React.Fragment, null));
    const [table, settable] = useState(React.createElement(React.Fragment, null));
    useEffect(() => {
        function lmao() {
            return __awaiter(this, void 0, void 0, function* () {
                const res = yield getdata("sort", "users", { mode: mode, search: { mode: "all", find: search }, reverse: reverse, page: curr_page, lineperpage: 100 });
                let users;
                let totalPage;
                if (res == undefined) {
                    users = [{
                            stt: 1,
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
                        }];
                    totalPage = 1;
                }
                else if (res.username != undefined) {
                    users = [res];
                    totalPage = 1;
                }
                else {
                    users = res.data.data;
                    totalPage = res.data.totalPage;
                }
                const themes = color[JSON.parse(localStorage.getItem("user")).themes.mode];
                const element = users.map((user, index) => {
                    return (React.createElement("tr", null,
                        React.createElement("td", { style: { border: `1px solid ${themes.font}` } }, user.stt),
                        React.createElement("td", { style: { border: `1px solid ${themes.font}` } }, user.rank),
                        React.createElement("td", { style: { border: `1px solid ${themes.font}` } },
                            React.createElement("div", { style: { float: "left", paddingLeft: "10px" } },
                                React.createElement("div", null,
                                    React.createElement("a", { className: "font-bold", style: { float: "left", color: get_rank_color(user.rank, user.role, themes.font) }, href: `/user/${user.username}` }, user.username)),
                                React.createElement("span", null,
                                    React.createElement("a", { className: "font-light", style: { float: "left", color: "#808080", fontWeight: "600" } }, user.fullname))),
                            React.createElement("div", { style: { float: "right", paddingRight: "10px", fontWeight: "bold", color: "#808080" } }, user.group.map((group, index) => {
                                if (index != user.group.length - 1) {
                                    return (React.createElement(React.Fragment, null,
                                        React.createElement("em", null,
                                            React.createElement("a", { href: `/group/${group}` }, group)),
                                        React.createElement("em", { style: { color: themes.font } }, " | ")));
                                }
                                else {
                                    return (React.createElement("em", null,
                                        React.createElement("a", { href: `/group/${group}` }, group)));
                                }
                            }))),
                        React.createElement("td", { style: { border: `1px solid ${themes.font}` } }, user.problems_count),
                        React.createElement("td", { style: { border: `1px solid ${themes.font}` } }, user.points)));
                });
                const table = (React.createElement("tbody", null,
                    React.createElement("tr", { style: { borderTop: `1px solid ${themes.font}` } },
                        React.createElement("th", { id: "users", style: { width: "5%" } }, "STT"),
                        React.createElement("th", { id: "users_rank", style: { width: "10%", border: `1px solid ${themes.font}` } },
                            React.createElement("button", { name: "users_rank" }, "Rank")),
                        React.createElement("th", { id: "users", style: { width: "55%", border: `1px solid ${themes.font}` } }, "Username"),
                        React.createElement("th", { id: "users_prlcnt", style: { width: "10%", border: `1px solid ${themes.font}` } },
                            React.createElement("button", { name: "users_prlcnt" }, "Problems count")),
                        React.createElement("th", { id: "users_pnt", style: { width: "10%", border: `1px solid ${themes.font}` } },
                            React.createElement("button", { name: "users_pnt" }, "Points"))),
                    element.map((item) => {
                        return item;
                    })));
                const handleClick = (e) => {
                    if (e.target.attributes.id.value == "pre") {
                        setCurr_page(curr_page - 1);
                    }
                    else if (e.target.attributes.id.value == "next") {
                        setCurr_page(curr_page + 1);
                    }
                    else if (e.target.attributes.id.value == "begin") {
                        setCurr_page(1);
                    }
                    else if (e.target.attributes.id.value == "end") {
                        setCurr_page(totalPage);
                    }
                    else {
                        setCurr_page(Number(e.target.attributes.id.value));
                    }
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });
                };
                let temp = false;
                const pages = Array(totalPage).fill(0);
                const paging = (React.createElement(StrictMode, null,
                    React.createElement("button", { key: "begin", id: "begin", onClick: handleClick, style: { paddingLeft: "2px", paddingRight: "2px", marginRight: "5px", border: `1px solid ${themes.font}`, width: "25px", height: "25px" }, disabled: (curr_page == 1) },
                        React.createElement("a", { id: "begin", onClick: handleClick }, "<<")),
                    React.createElement("button", { id: "pre", onClick: handleClick, style: { paddingLeft: "2px", paddingRight: "2px", marginRight: "5px", border: `1px solid ${themes.font}`, width: "25px", height: "25px" }, disabled: (curr_page == 1) },
                        React.createElement("a", { id: "pre", onClick: handleClick }, "<")),
                    pages.map((item, index) => {
                        const color = (index + 1 == curr_page) ? "#999900" : "";
                        if (curr_page <= 5) {
                            if (index < curr_page + 2) {
                                return (React.createElement("button", { id: String(index + 1), onClick: handleClick, style: { paddingLeft: "2px", paddingRight: "2px", marginRight: "5px", border: `1px solid ${themes.font}`, width: "25px", height: "25px", backgroundColor: color }, disabled: false },
                                    React.createElement("a", { id: String(index + 1), onClick: handleClick }, ` ${index + 1} `)));
                            }
                        }
                        else if (index < 2 || (index >= curr_page - 3 && index <= curr_page + 1)) {
                            return (React.createElement("button", { id: String(index + 1), onClick: handleClick, style: { paddingLeft: "2px", paddingRight: "2px", marginRight: "5px", border: `1px solid ${themes.font}`, width: "25px", height: "25px", backgroundColor: color }, disabled: false },
                                React.createElement("a", { id: String(index + 1), onClick: handleClick }, ` ${index + 1} `)));
                        }
                        else if (!temp) {
                            temp = true;
                            return (React.createElement("button", { id: "...", style: { paddingLeft: "2px", paddingRight: "2px", marginRight: "5px", border: `1px solid ${themes.font}`, width: "25px", height: "25px" }, disabled: true },
                                React.createElement("a", { id: "..." }, `...`)));
                        }
                    }),
                    (curr_page != pages.length) && (React.createElement("button", { id: "...", style: { paddingLeft: "2px", paddingRight: "2px", marginRight: "5px", border: `1px solid ${themes.font}`, width: "25px", height: "25px" }, disabled: true },
                        React.createElement("a", { id: "..." }, `...`))),
                    React.createElement("button", { id: "next", onClick: handleClick, style: { paddingLeft: "2px", paddingRight: "2px", marginRight: "5px", border: `1px solid ${themes.font}`, width: "25px", height: "25px" }, disabled: (curr_page == pages.length) },
                        React.createElement("a", { id: "next", onClick: handleClick }, ">")),
                    React.createElement("button", { id: "end", onClick: handleClick, style: { paddingLeft: "2px", paddingRight: "2px", marginRight: "5px", border: `1px solid ${themes.font}`, width: "25px", height: "25px" }, disabled: (curr_page == pages.length) },
                        React.createElement("a", { id: "end", onClick: handleClick }, ">>"))));
                setpage(paging);
                settable(table);
            });
        }
        lmao();
    }, [mode, reverse, curr_page, search]);
    return (React.createElement("div", { style: { width: "4095px" } },
        React.createElement("div", { id: "page", style: { float: "left", paddingBottom: "10px" } }, page),
        React.createElement("div", { style: { float: "right", paddingBottom: "10px" } },
            React.createElement("span", null,
                React.createElement("input", { className: "search", type: "text", placeholder: "Enter search here", onChange: (e) => {
                        Setsearch(e.target.value);
                    }, value: search || "" }))),
        React.createElement("div", { style: { float: "left", width: "100%" } },
            React.createElement("table", { style: { borderCollapse: "collapse", width: "100%", textAlign: "center" }, id: "userss", onClick: (e) => {
                    const target = e.target.attributes[0].value.split("_")[1];
                    if (target == undefined) {
                        return;
                    }
                    else if (target != mode) {
                        setmode(target);
                        setreverse(true);
                        setCurr_page(1);
                    }
                    else {
                        setreverse(!reverse);
                        setCurr_page(1);
                    }
                } }, table)),
        React.createElement("div", { id: "page2", style: { float: "left", paddingTop: "10px" } }, page)));
}
//# sourceMappingURL=users.js.map