import React, { useEffect, useRef, useState } from "react"
// import { createRoot } from "react-dom/client";
import Markdown from "react-markdown";
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import { all_language, color, get_rank_color, getdata, getGravatarURL, Theme_mode, User_role, User, Languages } from "online-judge-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
// import { Blog } from "./blog.js";
// import { Theme_mode, Languages, User_role } from "../../../@classes/enum.js";
// import { User } from "../../../@classes/type.js";

function sanitizeHtml(html: string) {
    const domParser = new DOMParser();
    const doc = domParser.parseFromString(html, 'text/html');

    const scripts = doc.querySelectorAll('script');
    scripts.forEach(script => (script.parentNode as HTMLElement).removeChild(script));

    return doc.body.innerHTML;
}


export function Editprofile({ user }: { user: User }) {

    // console.log(user)
    // console.log(user.profile.data.split("\n").length)

    type temping = {
        line: number,
        more: number
    }

    var temp: temping[] = []
    if (user.profile != undefined && user.profile.data != "") {
        user.profile.data.split("\n").forEach((item, index) => {
            if (item.length <= 303) {
                temp.push({ line: index + 1, more: Math.floor(item.length / 215) })
                return;
            }

            const length = item.length - 95;
            temp.push({ line: index + 1, more: Math.floor(length / 208) + 1 })
        })
    }
    const [fullname, setfullname] = useState(user.fullname)
    const [mode, setmode] = useState("editor");
    const [lines, setlines] = useState((user.profile == undefined || user.profile.data == "") ? [{ line: 1, more: 0 }] : temp);
    const [data, setdata] = useState((user.profile == undefined || user.profile.data == "") ? `Hello, I'm ${user.fullname}` : user.profile.data);
    const [html, sethtml] = useState((user.profile == undefined || user.profile.data == "") ? `Hello, I'm ${user.fullname}` : user.profile.html);
    const [themes, setthemes] = useState(user.themes.mode)

    const [default_language, setdefault_language] = useState(user.language.default_language)

    const [all_language_code, set_all] = useState(user.language.languages);

    // console.log(all_language_code)
    const contentRef = useRef(null);

    useEffect(() => {
        const lmao = document.getElementById("editorr");

        if (lmao != null && lmao.innerHTML == "") {
            lmao.innerHTML = html
        }
    })

    const onClick = (e: any) => {
        e.preventDefault();
        setmode(e.target.id)
    }

    const saveClick = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        // console.log(user.username)
        const res = await getdata("get", "users", user.username)
        // console.log(res)
        res.profile = {
            data: data,
            html: html
        };
        res.themes.mode = themes;
        res.language.languages = all_language_code;
        res.language.default_language = default_language;

        await getdata("post", "users", res)
        window.location.reload();
    }

    return (
        <>
            <div style={{ width: "max-content" }}>
                <form>
                    <div style={{ paddingBottom: "10px", width: "100%", borderBottom: "1px solid #ccc" }}>
                        <table>

                            <tr>
                                <td>
                                    Full name:
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        placeholder="Full name"
                                        onChange={(e) => {
                                            setfullname(e.target.value)
                                        }}
                                        value={fullname as string}
                                        style={{
                                            background: color[JSON.parse(localStorage.getItem("user") as string).themes.mode].background,
                                            color: color[JSON.parse(localStorage.getItem("user") as string).themes.mode].font
                                        }}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Themes:
                                </td>
                                <td>
                                    <span style={{ boxSizing: "border-box" }}>
                                        <ul>
                                            <tr onClick={(e) => {
                                                setthemes((e.target as HTMLInputElement).id == "dark" ? Theme_mode.dark : Theme_mode.light)

                                            }}>
                                                <input type="radio" name="themes" checked={themes == "dark"} id="dark" />
                                                <label style={{ paddingRight: "10px" }}>
                                                    <a id="dark">
                                                        Dark
                                                    </a>
                                                </label>

                                                <input type="radio" name="themes" checked={themes == "light"} id="light" />
                                                <label >
                                                    <a id="light">
                                                        Light
                                                    </a>
                                                </label>
                                            </tr>
                                        </ul>
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    My languages:
                                </td>
                                <td style={{ width: "1000px" }}>
                                    <span>
                                        <ul style={{ display: "flex" }}>
                                            {
                                                all_language.map((item) => {

                                                    return (
                                                        <li>
                                                            <input type="checkbox" id={item} value={item} checked={all_language_code.includes(item)} onChange={(e) => {
                                                                const newValues = [...all_language_code];
                                                                if (e.target.checked) {
                                                                    newValues.push(e.target.value);
                                                                } else {
                                                                    const index = newValues.indexOf(e.target.value);
                                                                    newValues.splice(index, 1);
                                                                }
                                                                set_all(newValues);
                                                            }}>
                                                            </input>
                                                            <label htmlFor={item} style={{ paddingRight: "5px" }}  >
                                                                {item}
                                                            </label>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Default language:
                                </td>
                                <td>
                                    <span>
                                        <ul style={{ display: "flex" }} onClick={(e) => {
                                            let temp: any = (e.target as HTMLInputElement).id.split("_")[0];

                                            if ((e.target as HTMLInputElement).id == "C++03") {
                                                temp = Languages.C03
                                            }
                                            else if ((e.target as HTMLInputElement).id == "C++11") {
                                                temp = Languages.C11
                                            }
                                            else if ((e.target as HTMLInputElement).id == "C++14") {
                                                temp = Languages.C14
                                            }
                                            else if ((e.target as HTMLInputElement).id == "C++17") {
                                                temp = Languages.C17
                                            }
                                            else if ((e.target as HTMLInputElement).id == "C++20") {
                                                temp = Languages.C20
                                            }
                                            else if ((e.target as HTMLInputElement).id == "Python 3") {
                                                temp = Languages.PY3
                                            }
                                            else if ((e.target as HTMLInputElement).id == "Java") {
                                                temp = Languages.JAVA
                                            }
                                            else if ((e.target as HTMLInputElement).id == "Javascript") {
                                                temp = Languages.JS
                                            }
                                            setdefault_language(temp)

                                        }}>
                                            {
                                                all_language.map((item) => {

                                                    return (
                                                        <li>
                                                            <input type="radio" id={`${item}_1`} checked={default_language == item} >
                                                            </input>
                                                            <label id={`${item}_1`} style={{ paddingRight: "5px" }}  >
                                                                {item}
                                                            </label>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </span>
                                </td>
                            </tr>
                        </table>
                    </div>

                    <div>
                        <span>
                            Self-description:
                        </span>

                        <div>

                            <button onClick={onClick} id="editor" style={{ padding: "3px 3px 3px 3px" }}>

                                <FontAwesomeIcon icon={faPenToSquare} />

                                <a onClick={onClick} id="editor" style={{ paddingLeft: "5px" }}>
                                    Editor
                                </a>
                            </button>

                            <button onClick={onClick} id="preview" style={{ padding: "3px 3px 3px 10px" }}>
                                <FontAwesomeIcon icon={faEye} />
                                <a onClick={onClick} id="preview" style={{ paddingLeft: "5px" }}>
                                    Preview
                                </a>
                            </button>
                        </div>

                        <div style={{ height: "350px", width: "1500px", display: "flex", flexDirection: "row" }}>
                            {
                                (mode == "editor") ? (
                                    <>
                                        <div id="row" style={
                                            {
                                                color: color[JSON.parse(localStorage.getItem("user") as string).themes.mode].background
                                            }}>
                                            {lines.map((item, index) => (
                                                <div style={{ display: "flex", justifyContent: "space-around", paddingTop: "0px", paddingBottom: `${item.more * 20}px` }}>
                                                    {index + 1}
                                                </div>
                                            ))}
                                        </div>
                                        <div
                                            id="editorr"
                                            contentEditable="true"
                                            ref={contentRef}
                                            style={{
                                                marginTop: "5px",
                                                marginLeft: "1px",
                                                height: "350px",
                                                width: "1400px",
                                                overflowY: "auto",
                                                overflowX: "auto",
                                                flex: "1"
                                            }}
                                            onInput={(e) => {
                                                e.preventDefault()

                                                setdata((e.target as HTMLInputElement).innerText.replace(/\n\n/g, '\n'))
                                                sethtml((e.target as HTMLInputElement).innerHTML)

                                                type temping = {
                                                    line: number,
                                                    more: number
                                                }
                                                const temp: temping[] = [];

                                                (e.target as HTMLInputElement).innerText.replace(/\n\n/g, '\n').split("\n").forEach((item, index) => {
                                                    // console.log(item.split("\n"))
                                                    if (item.length <= 303) {
                                                        temp.push({ line: index + 1, more: Math.floor(item.length / 215) })
                                                        return;
                                                    }
                                                    const length = item.length - 95;
                                                    temp.push({ line: index + 1, more: Math.floor(length / 208) + 1 })
                                                })



                                                setlines(((e.target as HTMLInputElement).innerText != "" && (e.target as HTMLInputElement).innerText != "\n") ? temp : [{ line: 1, more: 0 }])
                                            }}
                                            onScroll={(e) => {
                                                (document.getElementById("row") as HTMLElement).scrollTop = (e.target as HTMLElement).scrollTop
                                            }}
                                        >
                                        </div>
                                    </>
                                ) : (
                                    <div style={{
                                        height: "350px",
                                        width: "100%",
                                        marginTop: "5px",

                                        padding: "15px 15px 15px 15px",
                                        borderWidth: "1px",
                                        borderStyle: "solid",
                                        borderColor: "#ccc",

                                    }}>
                                        <Markdown
                                            children={sanitizeHtml(data)}
                                            rehypePlugins={[rehypeRaw, rehypeSanitize]}
                                        />

                                    </div>
                                )
                            }
                        </div>
                    </div>

                    <div style={{ paddingTop: "10px" }}>
                        <button id="save" className="submit" style={{
                            float: "right",
                            // backgroundColor: Theme_mode,
                            marginTop: "3px",
                            padding: "3px 3px 3px 3px",
                            borderRadius: "5px"
                        }} onClick={saveClick}>
                            <a id="save" onClick={saveClick}>
                                Update Profile
                            </a>
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}