var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import { all_language, color, get_rank_color, getdata, getGravatarURL, Theme_mode, Languages, User_role } from "online-judge-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
function sanitizeHtml(html) {
    const domParser = new DOMParser();
    const doc = domParser.parseFromString(html, 'text/html');
    const scripts = doc.querySelectorAll('script');
    scripts.forEach(script => script.parentNode.removeChild(script));
    return doc.body.innerHTML;
}
export function Editprofile({ user }) {
    var temp = [];
    if (user.profile != undefined && user.profile.data != "") {
        user.profile.data.split("\n").forEach((item, index) => {
            if (item.length <= 303) {
                temp.push({ line: index + 1, more: Math.floor(item.length / 215) });
                return;
            }
            const length = item.length - 95;
            temp.push({ line: index + 1, more: Math.floor(length / 208) + 1 });
        });
    }
    const [fullname, setfullname] = useState(user.fullname);
    const [mode, setmode] = useState("editor");
    const [lines, setlines] = useState((user.profile == undefined || user.profile.data == "") ? [{ line: 1, more: 0 }] : temp);
    const [data, setdata] = useState((user.profile == undefined || user.profile.data == "") ? `Hello, I'm ${user.fullname}` : user.profile.data);
    const [html, sethtml] = useState((user.profile == undefined || user.profile.data == "") ? `Hello, I'm ${user.fullname}` : user.profile.html);
    const [themes, setthemes] = useState(user.themes.mode);
    const [default_language, setdefault_language] = useState(user.language.default_language);
    const [all_language_code, set_all] = useState(user.language.languages);
    const contentRef = useRef(null);
    useEffect(() => {
        const lmao = document.getElementById("editorr");
        if (lmao != null && lmao.innerHTML == "") {
            lmao.innerHTML = html;
        }
    }, []);
    const onClick = (e) => {
        e.preventDefault();
        setmode(e.target.id);
    };
    const saveClick = (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        const res = yield getdata("get", "users", user.username);
        res.profile = {
            data: data,
            html: html
        };
        res.themes.mode = themes;
        res.language.languages = all_language_code;
        res.language.default_language = default_language;
        yield getdata("post", "users", res);
        window.location.reload();
    });
    const onChange = (e) => {
        setfullname(e.target.value);
    };
    const onThemesClick = (e) => {
        setthemes(e.target.id);
    };
    const onDefLangClick = (e) => {
        setdefault_language(e.target.id.split("_")[0]);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { style: { width: "max-content" } },
            React.createElement("form", null,
                React.createElement("div", { style: { paddingBottom: "10px", width: "100%", borderBottom: "1px solid #ccc" } },
                    React.createElement("table", null,
                        React.createElement("tr", null,
                            React.createElement("td", null, "Full name:"),
                            React.createElement("td", null,
                                React.createElement("input", { type: "text", placeholder: "Full name", onChange: (e) => {
                                        setfullname(e.target.value);
                                    }, value: fullname, style: { background: color[JSON.parse(localStorage.getItem("user")).themes.mode].background } }))),
                        React.createElement("tr", null,
                            React.createElement("td", null, "Themes:"),
                            React.createElement("td", null,
                                React.createElement("span", { style: { boxSizing: "border-box" } },
                                    React.createElement("ul", null,
                                        React.createElement("tr", { onClick: (e) => {
                                                setthemes(e.target.id == "dark" ? Theme_mode.dark : Theme_mode.light);
                                            } },
                                            React.createElement("input", { type: "radio", name: "themes", checked: themes == "dark", id: "dark" }),
                                            React.createElement("label", { style: { paddingRight: "10px" } },
                                                React.createElement("a", { id: "dark" }, "Dark")),
                                            React.createElement("input", { type: "radio", name: "themes", checked: themes == "light", id: "light" }),
                                            React.createElement("label", null,
                                                React.createElement("a", { id: "light" }, "Light"))))))),
                        React.createElement("tr", null,
                            React.createElement("td", null, "My languages:"),
                            React.createElement("td", { style: { width: "1000px" } },
                                React.createElement("span", null,
                                    React.createElement("ul", { style: { display: "flex" } }, all_language.map((item) => {
                                        return (React.createElement("li", null,
                                            React.createElement("input", { type: "checkbox", id: item, value: item, checked: all_language_code.includes(item), onChange: (e) => {
                                                    const newValues = [...all_language_code];
                                                    if (e.target.checked) {
                                                        newValues.push(e.target.value);
                                                    }
                                                    else {
                                                        const index = newValues.indexOf(e.target.value);
                                                        newValues.splice(index, 1);
                                                    }
                                                    set_all(newValues);
                                                } }),
                                            React.createElement("label", { htmlFor: item, style: { paddingRight: "5px" } }, item)));
                                    }))))),
                        React.createElement("tr", null,
                            React.createElement("td", null, "Default language:"),
                            React.createElement("td", null,
                                React.createElement("span", null,
                                    React.createElement("ul", { style: { display: "flex" }, onClick: (e) => {
                                            let temp = e.target.id.split("_")[0];
                                            if (e.target.id == "C++03") {
                                                temp = Languages.C03;
                                            }
                                            else if (e.target.id == "C++11") {
                                                temp = Languages.C11;
                                            }
                                            else if (e.target.id == "C++14") {
                                                temp = Languages.C14;
                                            }
                                            else if (e.target.id == "C++17") {
                                                temp = Languages.C17;
                                            }
                                            else if (e.target.id == "C++20") {
                                                temp = Languages.C20;
                                            }
                                            else if (e.target.id == "Python 3") {
                                                temp = Languages.PY3;
                                            }
                                            else if (e.target.id == "Java") {
                                                temp = Languages.JAVA;
                                            }
                                            else if (e.target.id == "Javascript") {
                                                temp = Languages.JS;
                                            }
                                            setdefault_language(temp);
                                        } }, all_language.map((item) => {
                                        return (React.createElement("li", null,
                                            React.createElement("input", { type: "radio", id: `${item}_1`, checked: default_language == item }),
                                            React.createElement("label", { id: `${item}_1`, style: { paddingRight: "5px" } }, item)));
                                    }))))))),
                React.createElement("div", null,
                    React.createElement("span", null, "Self-description:"),
                    React.createElement("div", null,
                        React.createElement("button", { onClick: onClick, id: "editor", style: { padding: "3px 3px 3px 3px" } },
                            React.createElement(FontAwesomeIcon, { icon: faPenToSquare }),
                            React.createElement("a", { onClick: onClick, id: "editor", style: { paddingLeft: "5px" } }, "Editor")),
                        React.createElement("button", { onClick: onClick, id: "preview", style: { padding: "3px 3px 3px 10px" } },
                            React.createElement(FontAwesomeIcon, { icon: faEye }),
                            React.createElement("a", { onClick: onClick, id: "preview", style: { paddingLeft: "5px" } }, "Preview"))),
                    React.createElement("div", { style: { height: "350px", width: "1500px", display: "flex", flexDirection: "row" } }, (mode == "editor") ? (React.createElement(React.Fragment, null,
                        React.createElement("div", { id: "row", style: {
                                overflowY: "auto",
                                overflow: "hidden",
                                width: "3%",
                                height: "100%",
                                borderRight: "2px solid",
                                backgroundColor: "#e8e8e8",
                                marginTop: "5px",
                                color: color[JSON.parse(localStorage.getItem("user")).themes.mode].background
                            } }, lines.map((item, index) => (React.createElement("div", { style: { display: "flex", justifyContent: "space-around", paddingTop: "0px", paddingBottom: `${item.more * 20}px` } }, index + 1)))),
                        React.createElement("div", { id: "editorr", contentEditable: "true", ref: contentRef, style: {
                                marginTop: "5px",
                                marginLeft: "1px",
                                height: "350px",
                                width: "1400px",
                                overflowY: "auto",
                                overflowX: "auto",
                                flex: "1"
                            }, onInput: (e) => {
                                e.preventDefault();
                                setdata(e.target.innerText.replace(/\n\n/g, '\n'));
                                sethtml(e.target.innerHTML);
                                const temp = [];
                                e.target.innerText.replace(/\n\n/g, '\n').split("\n").forEach((item, index) => {
                                    if (item.length <= 303) {
                                        temp.push({ line: index + 1, more: Math.floor(item.length / 215) });
                                        return;
                                    }
                                    const length = item.length - 95;
                                    temp.push({ line: index + 1, more: Math.floor(length / 208) + 1 });
                                });
                                setlines((e.target.innerText != "" && e.target.innerText != "\n") ? temp : [{ line: 1, more: 0 }]);
                            }, onScroll: (e) => {
                                document.getElementById("row").scrollTop = e.target.scrollTop;
                            } }))) : (React.createElement("div", { style: {
                            height: "350px",
                            width: "100%",
                            marginTop: "5px",
                            padding: "15px 15px 15px 15px",
                            borderWidth: "1px",
                            borderStyle: "solid",
                            borderColor: "#ccc",
                        } },
                        React.createElement(Markdown, { children: sanitizeHtml(data), rehypePlugins: [rehypeRaw, rehypeSanitize] }))))),
                React.createElement("div", { style: { paddingTop: "10px" } },
                    React.createElement("button", { id: "save", className: "submit", style: {
                            float: "right",
                            marginTop: "3px",
                            padding: "3px 3px 3px 3px",
                            borderRadius: "5px"
                        }, onClick: saveClick },
                        React.createElement("a", { id: "save", onClick: saveClick }, "Update Profile")))))));
}
export function Profile({ user }) {
    const [pointsRank, setPR] = useState(0);
    const [rankRank, setRR] = useState(0);
    useEffect(() => {
        function lmao() {
            return __awaiter(this, void 0, void 0, function* () {
                const rank_by_points = yield getdata("sort", "users", { mode: "points", search: { search: user.username }, reverse: true, page: 1, lineperpage: 100 });
                const rank_by_rank = yield getdata("sort", "users", { mode: "rank", search: { search: user.username }, reverse: true, page: 1, lineperpage: 100 });
                setRR(rank_by_rank.stt);
                setPR(rank_by_points.stt);
            });
        }
        lmao();
    });
    const color = get_rank_color(user.rank, User_role.user, "#ff9797");
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { style: { width: "100%" } },
            React.createElement("div", { style: { float: "left", height: "400px", minWidth: "15%", border: "1px 1px 1px 1px" } },
                React.createElement("div", null,
                    React.createElement("img", { src: getGravatarURL(user.email, 200), style: { borderRadius: "100px" } }),
                    React.createElement("br", null),
                    React.createElement("h4", { style: { borderBottom: "0px" } },
                        React.createElement("a", { className: "font-bold" }, " Email: "),
                        React.createElement("a", { style: { fontSize: "20px" } }, user.email)),
                    React.createElement("h4", { style: { borderBottom: "0px" } },
                        React.createElement("a", { className: "font-bold" }, "Points: "),
                        React.createElement("a", { style: { fontSize: "20px" } }, user.points)),
                    React.createElement("h4", { style: { borderBottom: "0px" } },
                        React.createElement("a", { className: "font-bold" }, "Rank by points: "),
                        React.createElement("a", { style: { fontSize: "20px" } }, `#${pointsRank}`)),
                    React.createElement("h4", { style: { borderBottom: "0px" } },
                        React.createElement("a", { className: "font-bold" }, "Problems solved: "),
                        React.createElement("a", { style: { fontSize: "20px" } }, user.problems_count)),
                    React.createElement("a", { style: { display: "block", borderBottom: "1px solid #d2d2d2", minWidth: "30%" } }),
                    React.createElement("h4", { style: { borderBottom: "0px" } },
                        React.createElement("a", { className: "font-bold" }, "Rank by rating: "),
                        React.createElement("a", { style: { fontSize: "20px" } }, `#${rankRank}`)),
                    React.createElement("h4", { style: { borderBottom: "0px" } },
                        React.createElement("a", { className: "font-bold" }, "Rating: "),
                        React.createElement("a", { className: "font-bold", style: { fontSize: "20px", color: color } }, user.rank)))),
            React.createElement("div", { style: { height: "400px", minWidth: "60%" } },
                (user.group.length != 0) ? (React.createElement(React.Fragment, null,
                    React.createElement("div", null,
                        React.createElement("h1", { className: "font-bold" }, "FROM:")),
                    React.createElement("br", null),
                    React.createElement("div", null,
                        React.createElement("a", null, user.group.map((i, index) => {
                            if (index == user.group.length - 1) {
                                return (React.createElement("a", { href: `/group/${i}` }, ` ${i}`));
                            }
                            return (React.createElement("a", { href: `/group/${i}` }, ` ${i},`));
                        }))),
                    React.createElement("br", null))) : (React.createElement(React.Fragment, null)),
                (user.profile.html) ?
                    (React.createElement(React.Fragment, null,
                        React.createElement("div", null,
                            React.createElement("h1", { className: "font-bold" }, "ABOUT ME:")),
                        React.createElement("div", null,
                            React.createElement(Markdown, { children: sanitizeHtml(user.profile.data), rehypePlugins: [rehypeRaw, rehypeSanitize] }))))
                    :
                        (React.createElement(React.Fragment, null))))));
}
//# sourceMappingURL=profile.js.map