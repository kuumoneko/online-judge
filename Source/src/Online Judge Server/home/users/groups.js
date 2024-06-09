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
import { color, getdata } from "online-judge-types";
export function Home_Groups() {
    const [search, Setsearch] = useState("");
    const [curr_page, setCurr_page] = useState(1);
    const [mode, setmode] = useState("points");
    const [reverse, setreverse] = useState(true);
    const [page, setpage] = useState(React.createElement(React.Fragment, null));
    const [table, settable] = useState(React.createElement(React.Fragment, null));
    useEffect(() => {
        function lmao() {
            return __awaiter(this, void 0, void 0, function* () {
                const res = yield getdata("sort", "groups", { mode: mode, search: search, reverse: reverse, page: curr_page, lineperpage: 100 });
                let users;
                let totalPage;
                if (res == undefined) {
                    users = [{
                            stt: 1,
                            groupname: "Unable to find this group, try to search another word",
                            unt: 0
                        }];
                    totalPage = 1;
                }
                else if (res.groupname != undefined) {
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
                        React.createElement("td", { style: { border: `1px solid ${themes.font}` } }, user.groupname),
                        React.createElement("td", { style: { border: `1px solid ${themes.font}` } }, user.unt)));
                });
                const table = (React.createElement("tbody", null,
                    React.createElement("tr", { style: { borderTop: `1px solid ${themes.font}` } },
                        React.createElement("th", { id: "users", style: { width: "5%" } }, "STT"),
                        React.createElement("th", { id: "users", style: { width: "55%", border: `1px solid ${themes.font}` } }, "Group name"),
                        React.createElement("th", { id: "users_unt", style: { width: "10%", border: `1px solid ${themes.font}` } },
                            React.createElement("button", { name: "users_unt" }, "Users"))),
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
                    console.log(target);
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
//# sourceMappingURL=groups.js.map