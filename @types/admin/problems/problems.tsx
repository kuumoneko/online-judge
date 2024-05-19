import React, { useEffect, useRef, useState } from "react";
import { color, getdata } from "../../@classes/ultility.js";
import { faEye, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Markdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import rehypeRaw from "rehype-raw";
import { sanitize } from "dompurify";
import { set } from "react-hook-form";

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
    // const [day, setdate] = useState({ day: now.getDate(), month: now.getMonth(), year: now.getFullYear() });

    // const [time, settime] = useState({ hour: now.getHours(), minute: now.getMinutes(), second: now.getSeconds() })

    // var d = new Date(),
    //     localDateTime = [(d.getMonth() + 1).AddZero(),
    //     d.getDate().AddZero(),
    //     d.getFullYear()].join('/') + ', ' +
    //         [d.getHours().AddZero(),
    //         d.getMinutes().AddZero()].join(':');
    const [publish, setpublish] = useState("")
    // const [date, setdate] = useState({ day: now.getDate(), month: 0, year: 0 })
    // const [themes, setthemes] = useState(user.themes.mode)
    // 
    // const [default_language, setdefault_language] = useState(user.language.default_language)

    // const [all_language_code, set_all] = useState(user.language.languages);

    // console.log(all_language_code)
    const contentRef = useRef(null);

    const onClick = (e: any) => {
        e.preventDefault();
        setmode(e.target.id)
    }

    useEffect(() => {
        const lmao = document.getElementById("editorr");

        if (lmao != null && lmao.innerHTML == "") {
            lmao.innerHTML = html
        }
    })

    const saveClick = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        console.log("lmao")


        if (Title.length == 0 || data.length == 0 || publish.length == 0) {
            checktit(Title.length == 0)
            checkdata(data.length == 0)
            checktime(publish.length == 0)
            return;
        }
        // const res = await getdata("get", "blogs", user.username);

        await getdata("post", "problems", {
        })
        window.location.reload();
    }

    return (
        <div className="add-problems-content">
            <table style={{ display: "flex", flexDirection: "column" }}>
                <tr>
                    <th>

                    </th>
                    <th>

                    </th>
                </tr>
                <td>
                    <th>
                        Title:
                    </th>
                    <th>
                        <input
                            style={{
                                background: color[JSON.parse(localStorage.getItem("user") as string).themes.mode].background,
                                color: color[JSON.parse(localStorage.getItem("user") as string).themes.mode].font
                            }}

                            type="text"
                            placeholder="Title"
                            onChange={(e) => {
                                // console.log(e.target.value)
                                settitle(e.target.value)
                            }}
                        >
                        </input>
                    </th>
                </td>
                <td>
                    <th>
                        Publish time:
                    </th>
                    <th>
                        <input
                            style={{ background: color[JSON.parse(localStorage.getItem("user") as string).themes.mode].background }}

                            type="datetime-local"
                            onChange={(e) => {
                                // console.log(e.target.value)
                                setpublish(e.target.value)

                            }
                            }>
                        </input>
                    </th>
                </td>
            </table>

            <div>
                <span>
                    Description:
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

                <div className="editor">

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
                                    className="editorr"
                                    id="editorr"
                                    contentEditable="true"
                                    ref={contentRef}
                                    // style={{
                                    //     marginTop: "5px",
                                    //     marginLeft: "1px",
                                    //     height: "350px",
                                    //     width: "1400px",
                                    //     overflowY: "auto",
                                    //     overflowX: "auto",
                                    //     flex: "1"
                                    // }}
                                    onInput={(e) => {
                                        e.preventDefault()

                                        setdata((e.target as HTMLInputElement).innerText.replace(/\n\n/g, '\n'))
                                        sethtml((e.target as HTMLInputElement).innerHTML)

                                        type temping = {
                                            line: number,
                                            more: number
                                        }
                                        const temp: temping[] = [];

                                        (e.target as HTMLInputElement).innerText.replace(/\n\n/g, '\n').split("\n").forEach((item: string | any[], index: number) => {
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
                            <div
                                className="preview"
                                id="preview"
                                dangerouslySetInnerHTML={{ __html: html }}
                                style={{
                                    borderColor: "#ccc",

                                }}>
                                <Markdown
                                    children={sanitize(data)}
                                    rehypePlugins={[rehypeRaw, rehypeSanitize]}
                                />

                            </div>
                        )
                    }
                </div>
                {
                    datacheck && (
                        <>
                            <br />
                            <a style={{ WebkitTextFillColor: "red" }}>
                                lmao :)))
                            </a>

                        </>
                    )
                }
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
                        Save
                    </a>
                </button>
            </div>
        </div>
    )
}

export function All_Problems() {


    return (
        <div className="all-problems">
            <div className="add-problems">
                <button className="add-problems-button">
                    <a href="/admin/problems/add">
                        Add problems
                    </a>
                </button>
            </div>
        </div>
    )
}