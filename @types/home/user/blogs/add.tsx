import { faPenToSquare, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { sanitize } from "dompurify";
import { color } from "ultility/color.js";
import React, { useState, useRef, useEffect } from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { getdata } from "ultility/ulti.js";
import Cookies from "js-cookie";


export function Add_blog() {

    const username = localStorage.getItem("username") as string;

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
            lmao.innerHTML = html
        }
    })

    const onClick = (e: any) => {
        e.preventDefault();
        setmode(e.target.id)
    }

    const saveClick = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        // console.log("lmao")


        if (Title.length == 0 || data.length == 0 || publish.length == 0) {
            checktit(Title.length == 0)
            checkdata(data.length == 0)
            checktime(publish.length == 0)
            return;
        }
        const res = await getdata("get", "blogs", username);

        await getdata("post", "blogs", {
            host: username,
            title: Title,
            publish_time: publish,
            content: data,
            html: html,
            id: `${username}_${res.data.length + 1}`
        })
        window.location.reload();
    }

    return (
        <>
            <div>
                <form>
                    <div style={{ paddingBottom: "10px", width: "100%", borderBottom: "1px solid #ccc" }}>
                        <table>

                            <tr>
                                <td>
                                    Title:
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        placeholder="Title"
                                        onChange={(e) => {
                                            e.preventDefault();
                                            settitle(e.target.value)
                                        }}
                                        value={Title}
                                        style={{ background: color[Cookies.get("theme") as "dark" | "light"].background }}
                                    />
                                    {
                                        Titlecheck && (
                                            <>
                                                <br />
                                                <a style={{ WebkitTextFillColor: "red" }}>
                                                    lmao :)))
                                                </a>
                                            </>
                                        )
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td style={{
                                    paddingRight: "5px"
                                }}>
                                    Publish time:
                                </td>
                                <td>
                                    <input
                                        type="datetime-local"
                                        style={{ background: color[Cookies.get("theme") as "dark" | "light"].background }}
                                        onChange={(e) => {
                                            e.preventDefault();
                                            setpublish(e.target.value)

                                        }}
                                    />
                                    {
                                        timecheck && (
                                            <>
                                                <br />
                                                <a style={{ WebkitTextFillColor: "red" }}>
                                                    lmao :)))
                                                </a>
                                            </>
                                        )
                                    }
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
                                                color: color[Cookies.get("theme") as "dark" | "light"].background
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
                </form >
            </div >
        </>
    )
}