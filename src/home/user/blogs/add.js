var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { faPenToSquare, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { sanitize } from "dompurify";
import { color } from "types";
import React, { useState, useRef, useEffect } from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { getdata } from "types";
import Cookies from "js-cookie";
export function Add_blog() {
    const username = localStorage.getItem("username");
    const [Title, settitle] = useState("");
    const [mode, setmode] = useState("editor");
    const [lines, setlines] = useState([{ line: 1, more: 0 }]);
    const [data, setdata] = useState("");
    const [html, sethtml] = useState("");
    const [Titlecheck, checktit] = useState(false);
    const [datacheck, checkdata] = useState(false);
    const [timecheck, checktime] = useState(false);
    const [publish, setpublish] = useState("");
    const contentRef = useRef(null);
    useEffect(() => {
        const lmao = document.getElementById("editorr");
        if (lmao != null && lmao.innerHTML == "") {
            lmao.innerHTML = html;
        }
    });
    const onClick = (e) => {
        e.preventDefault();
        setmode(e.target.id);
    };
    const saveClick = (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        // console.log("lmao")
        if (Title.length == 0 || data.length == 0 || publish.length == 0) {
            checktit(Title.length == 0);
            checkdata(data.length == 0);
            checktime(publish.length == 0);
            return;
        }
        const res = yield getdata("get", "blogs", username);
        yield getdata("post", "blogs", {
            host: username,
            title: Title,
            publish_time: publish,
            content: data,
            html: html,
            id: `${username}_${res.data.length + 1}`
        });
        window.location.reload();
    });
    return (React.createElement(React.Fragment, null,
        React.createElement("div", null,
            React.createElement("form", null,
                React.createElement("div", { style: { paddingBottom: "10px", width: "100%", borderBottom: "1px solid #ccc" } },
                    React.createElement("table", null,
                        React.createElement("tr", null,
                            React.createElement("td", null, "Title:"),
                            React.createElement("td", null,
                                React.createElement("input", {
                                    type: "text", placeholder: "Title", onChange: (e) => {
                                        e.preventDefault();
                                        settitle(e.target.value);
                                    }, value: Title, style: { background: color[Cookies.get("theme")].background }
                                }),
                                Titlecheck && (React.createElement(React.Fragment, null,
                                    React.createElement("br", null),
                                    React.createElement("a", { style: { WebkitTextFillColor: "red" } }, "lmao :)))"))))),
                        React.createElement("tr", null,
                            React.createElement("td", {
                                style: {
                                    paddingRight: "5px"
                                }
                            }, "Publish time:"),
                            React.createElement("td", null,
                                React.createElement("input", {
                                    type: "datetime-local", style: { background: color[Cookies.get("theme")].background }, onChange: (e) => {
                                        e.preventDefault();
                                        setpublish(e.target.value);
                                    }
                                }),
                                timecheck && (React.createElement(React.Fragment, null,
                                    React.createElement("br", null),
                                    React.createElement("a", { style: { WebkitTextFillColor: "red" } }, "lmao :)))"))))))),
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
                        React.createElement("div", {
                            id: "row", style: {
                                color: color[Cookies.get("theme")].background
                            }
                        }, lines.map((item, index) => (React.createElement("div", { style: { display: "flex", justifyContent: "space-around", paddingTop: "0px", paddingBottom: `${item.more * 20}px` } }, index + 1)))),
                        React.createElement("div", {
                            id: "editorr", contentEditable: "true", ref: contentRef, style: {
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
                                    // console.log(item.split("\n"))
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
                            }
                        }))) : (React.createElement("div", {
                            style: {
                                height: "350px",
                                width: "100%",
                                marginTop: "5px",
                                padding: "15px 15px 15px 15px",
                                borderWidth: "1px",
                                borderStyle: "solid",
                                borderColor: "#ccc",
                            }
                        },
                            React.createElement(Markdown, { children: sanitize(data), rehypePlugins: [rehypeRaw, rehypeSanitize] })))),
                    datacheck && (React.createElement(React.Fragment, null,
                        React.createElement("br", null),
                        React.createElement("a", { style: { WebkitTextFillColor: "red" } }, "lmao :)))")))),
                React.createElement("div", { style: { paddingTop: "10px" } },
                    React.createElement("button", {
                        id: "save", className: "submit", style: {
                            float: "right",
                            // backgroundColor: Theme_mode,
                            marginTop: "3px",
                            padding: "3px 3px 3px 3px",
                            borderRadius: "5px"
                        }, onClick: saveClick
                    },
                        React.createElement("a", { id: "save", onClick: saveClick }, "Save")))))));
}
//# sourceMappingURL=add.js.map