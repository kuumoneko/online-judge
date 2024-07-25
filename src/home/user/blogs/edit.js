import React, { useEffect, useRef, useState } from "react";
import { color } from "ultility/color.js";
import { getdata } from "ultility/ulti.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Markdown from "react-markdown";
import { sanitize } from "dompurify";
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
// import { createRoot } from "react-dom/client";
import Cookies from "js-cookie";
export function Edit_blog({ user, blog }) {
    const [lmao, setlmao] = useState(false);
    // const [mode, setmode] = useState("editor");
    const [lines, setlines] = useState([{ line: 1, more: 0 }]);
    const [data, setdata] = useState("");
    const [html, sethtml] = useState("");
    const [Title, setTitle] = useState("");
    const [publish, setpublish] = useState("");
    const [mode, setmode] = useState("editor");
    const contentRef = useRef(null);
    useEffect(() => {
        async function ondata() {
            if (lmao == false) {
                const res = await getdata("get", "blogs", { id: blog });
                setTitle(res.title);
                setpublish(res.publish_time);
                setdata(res.content);
                sethtml(res.html);
                setlmao(true);
            }
            // else {
            //     setTitle(Title);
            //     setpublish(publish);
            //     setdata(data);
            //     sethtml(html);
            // }
            const dataa = document.getElementById("editorr");
            // console.log(dataa)
            if (dataa != null && dataa.innerHTML == "") {
                dataa.innerHTML = html;
            }
        }
        ondata();
    }, []);
    const onClick = (e) => {
        e.preventDefault();
        setmode(e.target.id);
    };
    const saveClick = async (e) => {
        e.preventDefault();
        // console.log("lmao")
        // const res = await getdata("get", "blogs", user.username);
        // console.log({
        //     host: user.username,
        //     title: Title,
        //     publish_time: publish,
        //     content: data,
        //     html: html,
        //     id: blog
        // })
        await getdata("post", "blogs", {
            host: user.username,
            title: Title,
            publish_time: publish,
            content: data,
            html: html,
            id: blog
        });
        window.location.reload();
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("div", null,
            React.createElement("form", null,
                React.createElement("div", { style: { paddingBottom: "10px", width: "100%", borderBottom: "1px solid #ccc" } },
                    React.createElement("table", null,
                        React.createElement("tr", null,
                            React.createElement("td", null, "Title:"),
                            React.createElement("td", null,
                                React.createElement("input", { type: "text", placeholder: "Title", style: {
                                        background: color[Cookies.get("theme")].background
                                    }, value: Title, disabled: true }))),
                        React.createElement("tr", null,
                            React.createElement("td", { style: {
                                    paddingRight: "5px"
                                } }, "Publish time:"),
                            React.createElement("td", null,
                                React.createElement("input", { type: "datetime-local", style: { background: color[Cookies.get("theme")].background }, value: publish, disabled: true }))))),
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
                                // top: "0",
                                // position: "sticky",
                                width: "3%",
                                height: "100%",
                                borderRight: "2px solid",
                                backgroundColor: "#e8e8e8",
                                marginTop: "5px",
                                color: color[Cookies.get("theme")].background
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
                            } }))) : (React.createElement("div", { style: {
                            height: "350px",
                            width: "100%",
                            marginTop: "5px",
                            padding: "15px 15px 15px 15px",
                            borderWidth: "1px",
                            borderStyle: "solid",
                            borderColor: "#ccc",
                        } },
                        React.createElement(Markdown, { children: sanitize(data), rehypePlugins: [rehypeRaw, rehypeSanitize] }))))),
                React.createElement("div", { style: { paddingTop: "10px" } },
                    React.createElement("button", { id: "save", className: "submit", style: {
                            float: "right",
                            // backgroundColor: Theme_mode,
                            marginTop: "3px",
                            padding: "3px 3px 3px 3px",
                            borderRadius: "5px"
                        }, onClick: saveClick },
                        React.createElement("a", { id: "save", onClick: saveClick }, "Save")))))));
}
//# sourceMappingURL=edit.js.map