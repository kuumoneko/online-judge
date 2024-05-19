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
import { color, getdata } from "../../@classes/ultility.js";
import { faEye, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Markdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import rehypeRaw from "rehype-raw";
import { sanitize } from "dompurify";
export function Add_Problems() {
    const now = new Date();
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
    const onClick = (e) => {
        e.preventDefault();
        setmode(e.target.id);
    };
    useEffect(() => {
        const lmao = document.getElementById("editorr");
        if (lmao != null && lmao.innerHTML == "") {
            lmao.innerHTML = html;
        }
    });
    const saveClick = (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        console.log("lmao");
        if (Title.length == 0 || data.length == 0 || publish.length == 0) {
            checktit(Title.length == 0);
            checkdata(data.length == 0);
            checktime(publish.length == 0);
            return;
        }
        yield getdata("post", "problems", {});
        window.location.reload();
    });
    return (React.createElement("div", { className: "add-problems-content" },
        React.createElement("table", { style: { display: "flex", flexDirection: "column" } },
            React.createElement("tr", null,
                React.createElement("th", null),
                React.createElement("th", null)),
            React.createElement("td", null,
                React.createElement("th", null, "Title:"),
                React.createElement("th", null,
                    React.createElement("input", { style: {
                            background: color[JSON.parse(localStorage.getItem("user")).themes.mode].background,
                            color: color[JSON.parse(localStorage.getItem("user")).themes.mode].font
                        }, type: "text", placeholder: "Title", onChange: (e) => {
                            settitle(e.target.value);
                        } }))),
            React.createElement("td", null,
                React.createElement("th", null, "Publish time:"),
                React.createElement("th", null,
                    React.createElement("input", { style: { background: color[JSON.parse(localStorage.getItem("user")).themes.mode].background }, type: "datetime-local", onChange: (e) => {
                            setpublish(e.target.value);
                        } })))),
        React.createElement("div", null,
            React.createElement("span", null, "Description:"),
            React.createElement("div", null,
                React.createElement("button", { onClick: onClick, id: "editor", style: { padding: "3px 3px 3px 3px" } },
                    React.createElement(FontAwesomeIcon, { icon: faPenToSquare }),
                    React.createElement("a", { onClick: onClick, id: "editor", style: { paddingLeft: "5px" } }, "Editor")),
                React.createElement("button", { onClick: onClick, id: "preview", style: { padding: "3px 3px 3px 10px" } },
                    React.createElement(FontAwesomeIcon, { icon: faEye }),
                    React.createElement("a", { onClick: onClick, id: "preview", style: { paddingLeft: "5px" } }, "Preview"))),
            React.createElement("div", { className: "editor" }, (mode == "editor") ? (React.createElement(React.Fragment, null,
                React.createElement("div", { id: "row", style: {
                        color: color[JSON.parse(localStorage.getItem("user")).themes.mode].background
                    } }, lines.map((item, index) => (React.createElement("div", { style: { display: "flex", justifyContent: "space-around", paddingTop: "0px", paddingBottom: `${item.more * 20}px` } }, index + 1)))),
                React.createElement("div", { className: "editorr", id: "editorr", contentEditable: "true", ref: contentRef, onInput: (e) => {
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
                    } }))) : (React.createElement("div", { className: "preview", id: "preview", dangerouslySetInnerHTML: { __html: html }, style: {
                    borderColor: "#ccc",
                } },
                React.createElement(Markdown, { children: sanitize(data), rehypePlugins: [rehypeRaw, rehypeSanitize] })))),
            datacheck && (React.createElement(React.Fragment, null,
                React.createElement("br", null),
                React.createElement("a", { style: { WebkitTextFillColor: "red" } }, "lmao :)))")))),
        React.createElement("div", { style: { paddingTop: "10px" } },
            React.createElement("button", { id: "save", className: "submit", style: {
                    float: "right",
                    marginTop: "3px",
                    padding: "3px 3px 3px 3px",
                    borderRadius: "5px"
                }, onClick: saveClick },
                React.createElement("a", { id: "save", onClick: saveClick }, "Save")))));
}
export function All_Problems() {
    return (React.createElement("div", { className: "all-problems" },
        React.createElement("div", { className: "add-problems" },
            React.createElement("button", { className: "add-problems-button" },
                React.createElement("a", { href: "/admin/problems/add" }, "Add problems")))));
}
//# sourceMappingURL=problems.js.map