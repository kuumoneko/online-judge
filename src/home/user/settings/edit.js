import React, { useEffect, useRef, useState } from "react";
// import { createRoot } from "react-dom/client";
import Markdown from "react-markdown";
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import { all_language, getdata, allowed_html_tags } from "ultility/ulti.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import { color } from "ultility/color.js";
function sanitizeHtml(html) {
    const domParser = new DOMParser();
    const doc = domParser.parseFromString(html, 'text/html');
    const scripts = doc.querySelectorAll('script');
    scripts.forEach(script => script.parentNode.removeChild(script));
    return doc.body.innerHTML;
}
function Return_UI({ user }) {
    const [fullname, setfullname] = useState(user.fullname);
    const [mode, setmode] = useState("editor");
    const [profile, setprofile] = useState((user.profile == undefined || user.profile == "") ? `Hello, I'm ${user.fullname}` : user.profile);
    const [default_language, setdefault_language] = useState(user.language.default_language);
    const [all_language_code, set_all] = useState(user.language.languages);
    const contentRef = useRef(null);
    useEffect(() => {
        const lmao = document.getElementById("editorr");
        if (lmao != null && lmao.innerHTML == "") {
            const temp = profile.split("\n").map((item) => {
                let dataa = "";
                allowed_html_tags.forEach((tag) => {
                    if (item.includes(`<${tag}`)) {
                        let finding_first_tag = item.indexOf(">", item.indexOf(`<${tag}`));
                        let finding_second_tag = item.indexOf(">", item.indexOf(`</${tag}`));
                        let tempp_first_tag = item.substring(item.indexOf(`<${tag}`), finding_first_tag + 1);
                        let tempp_second_tag = item.substring(item.indexOf(`</${tag}`), finding_second_tag + 1);
                        dataa = item.replace(tempp_first_tag, tempp_first_tag.replace("<", "&lt;").replace(">", "&gt;")).replace(tempp_second_tag, tempp_second_tag.replace("<", "&lt;").replace(">", "&gt;"));
                    }
                });
                return dataa == "" ? ((item == "") ? "<br>" : item) : dataa;
            }).map((item) => {
                return `<div> <span> ${item}</span> </div>`;
            }).join("\n");
            lmao.innerHTML = temp;
        }
    });
    const onClick = (e) => {
        e.preventDefault();
        setmode(e.target.id);
    };
    const saveClick = async (e) => {
        e.preventDefault();
        const res = await getdata("get", "users", user.username);
        res.profile = profile;
        res.language.languages = all_language_code;
        res.language.default_language = default_language;
        await getdata("post", "users", res);
        window.location.reload();
    };
    const theme = Cookies.get("theme");
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
                                    }, value: fullname, style: {
                                        background: color[theme].background,
                                        color: color[theme].font
                                    } }))),
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
                                    React.createElement("select", { style: {
                                            background: color[theme].background,
                                            color: color[theme].font,
                                            marginLeft: "5px"
                                        }, value: default_language, onChange: (e) => {
                                            console.log(e.target.value);
                                            setdefault_language(e.target.value);
                                        } }, all_language.map((item) => {
                                        return (React.createElement("option", { style: {
                                                background: color[theme].background,
                                                color: color[theme].font
                                            }, value: item }, item));
                                    }))))))),
                React.createElement("div", null,
                    React.createElement("span", null, "Self-description:"),
                    React.createElement("div", null,
                        React.createElement("div", { style: {
                                float: "left"
                            } },
                            React.createElement("button", { onClick: onClick, id: "editor", style: { padding: "3px 3px 3px 3px" } },
                                React.createElement(FontAwesomeIcon, { icon: faPenToSquare }),
                                React.createElement("a", { onClick: onClick, id: "editor", style: { paddingLeft: "5px" } }, "Editor")),
                            React.createElement("button", { onClick: onClick, id: "preview", style: { padding: "3px 3px 3px 10px" } },
                                React.createElement(FontAwesomeIcon, { icon: faEye }),
                                React.createElement("a", { onClick: onClick, id: "preview", style: { paddingLeft: "5px" } }, "Preview"))),
                        React.createElement("div", { style: {
                                float: "right"
                            } })),
                    React.createElement("div", { style: {
                            height: "350px",
                            width: "1500px",
                            display: "flex",
                            // flexDirection: "row",
                            borderTop: "1px solid",
                            borderBottom: "1px solid",
                            borderRight: "1px solid",
                            borderLeft: "1px solid",
                            borderRadius: "25px",
                        } },
                        React.createElement("div", { style: {
                                height: "100%",
                                width: "100%"
                            }, className: "editprofile-flipcard" },
                            React.createElement("div", { style: {
                                    height: "100%",
                                    width: "100%",
                                    // display: mode == "editor" ? "block" : "flex"
                                }, className: `editprofile-flip${mode == "editor" ? "" : " flipped"}` },
                                React.createElement("div", { style: {
                                        height: "100%",
                                        width: "100%"
                                    }, className: "profile-editor" },
                                    React.createElement("div", { id: "editorr", contentEditable: "true", ref: contentRef, style: {
                                            outline: "none",
                                            marginTop: "10px",
                                            marginLeft: "10px",
                                            height: "100%",
                                            width: "100%",
                                            overflowY: "hidden",
                                            overflowX: "hidden"
                                        }, onInput: (e) => {
                                            e.preventDefault();
                                            setprofile(e.target.innerText.replace(/\n\n/g, '\n'));
                                        }, onScroll: (e) => {
                                            document.getElementById("row").scrollTop = e.target.scrollTop;
                                        } })),
                                React.createElement("div", { style: {
                                        height: "100%",
                                        width: "100%"
                                    }, className: "profile-preview" },
                                    React.createElement("div", { style: {
                                            height: "100%",
                                            width: "100%",
                                            padding: "15px 15px 15px 15px",
                                        } },
                                        React.createElement(Markdown, { children: sanitizeHtml(profile), rehypePlugins: [rehypeRaw, rehypeSanitize] }))))))),
                React.createElement("div", null, "lmao"),
                React.createElement("div", { style: { paddingTop: "10px" } },
                    React.createElement("a", { style: {
                            float: "left",
                            marginTop: "3px",
                            cursor: "pointer",
                            color: "rgba(121, 235, 255, 0.45)"
                        }, href: `/user/${user.username}/change_password` }, "Change password?"),
                    React.createElement("button", { id: "save", className: "submit", style: {
                            float: "right",
                            // backgroundColor: Theme_mode,
                            marginTop: "3px",
                            padding: "3px 3px 3px 3px",
                            borderRadius: "5px"
                        }, onClick: saveClick },
                        React.createElement("a", { id: "save", onClick: saveClick }, "Update Profile")))))));
}
export function Editprofile() {
    const [user, setuser] = useState();
    useEffect(() => {
        async function lmao() {
            const res = await getdata("get", "users", localStorage.getItem("username"));
            // console.log(res.data.data[0])
            setuser(res.data.data[0]);
        }
        lmao();
    }, []);
    const [UI, setUI] = useState(React.createElement(React.Fragment, null));
    useEffect(() => {
        if (user == undefined) {
            return;
        }
        setUI(React.createElement(Return_UI, { user: user }));
    }, [user]);
    return UI;
}
//# sourceMappingURL=edit.js.map