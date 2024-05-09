import React, { useEffect, useRef, useState } from "react";
import { color, getdata } from "../../@classes/ultility.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Markdown from "react-markdown";
import { sanitize } from "dompurify";
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import { createRoot } from "react-dom/client";
import { Blogs, User } from "../../@classes/type.js";



export function Edit_blog({ user, blog }: { user: User, blog: string }) {

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
                dataa.innerHTML = html
            }
        }

        ondata();

    })

    const onClick = (e: any) => {
        e.preventDefault();
        setmode(e.target.id)
    }

    const saveClick = async (e: { preventDefault: () => void; }) => {
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
                                        style={{
                                            background: color[JSON.parse(localStorage.getItem("user") as string).themes.mode].background
                                        }}
                                        value={Title}

                                        disabled
                                    />
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
                                        style={{ background: color[JSON.parse(localStorage.getItem("user") as string).themes.mode].background }}
                                        value={publish}

                                        disabled
                                    />
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
                                                overflowY: "auto",

                                                overflow: "hidden",
                                                // top: "0",
                                                // position: "sticky",
                                                width: "3%",
                                                height: "100%",
                                                borderRight: "2px solid",
                                                backgroundColor: "#e8e8e8",
                                                marginTop: "5px",
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

                                                // console.log(data)
                                                // console.log(html)

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



// function Edit_blog({ user, blog }: { user: User, blog: Blogs }) {
//     // const [fullname, setfullname] = useState(user.fullname)
//     const now = new Date();
//     const [Title, settitle] = useState("");
//     const [mode, setmode] = useState("editor");
//     const [lines, setlines] = useState([{ line: 1, more: 0 }]);
//     const [data, setdata] = useState("");
//     const [html, sethtml] = useState("");

//     const [Titlecheck, checktit] = useState(false);
//     const [datacheck, checkdata] = useState(false);
//     const [timecheck, checktime] = useState(false);
//     // const [day, setdate] = useState({ day: now.getDate(), month: now.getMonth(), year: now.getFullYear() });

//     // const [time, settime] = useState({ hour: now.getHours(), minute: now.getMinutes(), second: now.getSeconds() })

//     // var d = new Date(),
//     //     localDateTime = [(d.getMonth() + 1).AddZero(),
//     //     d.getDate().AddZero(),
//     //     d.getFullYear()].join('/') + ', ' +
//     //         [d.getHours().AddZero(),
//     //         d.getMinutes().AddZero()].join(':');
//     const [publish, setpublish] = useState("")
//     // const [date, setdate] = useState({ day: now.getDate(), month: 0, year: 0 })
//     // const [themes, setthemes] = useState(user.themes.mode)
//     //
//     // const [default_language, setdefault_language] = useState(user.language.default_language)

//     // const [all_language_code, set_all] = useState(user.language.languages);

//     // console.log(all_language_code)
//     const contentRef = useRef(null);

//     const oninput = (e: { preventDefault: () => void; target: { innerText: string; innerHTML: React.SetStateAction<string>; }; }) => {
//         e.preventDefault()

//         setdata(e.target.innerText.replace(/\n\n/g, '\n'))
//         sethtml(e.target.innerHTML)

//         type temping = {
//             line: number,
//             more: number
//         }
//         const temp: temping[] = []

//         e.target.innerText.replace(/\n\n/g, '\n').split("\n").forEach((item: string | any[], index: number) => {
//             // console.log(item.split("\n"))
//             if (item.length <= 303) {
//                 temp.push({ line: index + 1, more: Math.floor(item.length / 215) })
//                 return;
//             }
//             const length = item.length - 95;
//             temp.push({ line: index + 1, more: Math.floor(length / 208) + 1 })
//         })



//         setlines((e.target.innerText != "" && e.target.innerText != "\n") ? temp : [{ line: 1, more: 0 }])
//     }

//     useEffect(() => {
//         const lmao = document.getElementById("editorr");

//         if (lmao != null && lmao.innerHTML == "") {
//             lmao.innerHTML = html
//         }
//     })

//     const onClick = (e: any) => {
//         e.preventDefault();
//         setmode(e.target.id)
//     }

//     const saveClick = async (e: { preventDefault: () => void; }) => {
//         e.preventDefault();

//         console.log("lmao")


//         if (Title.length == 0 || data.length == 0 || publish.length == 0) {
//             checktit(Title.length == 0)
//             checkdata(data.length == 0)
//             checktime(publish.length == 0)
//             return;
//         }
//         const res = await getdata("get", "blogs", user.username);

//         await getdata("post", "blogs", {
//             host: user.username,
//             title: Title,
//             publish_time: publish,
//             content: data,
//             html: html,
//             id: `${user.username}_${res.length + 1}`
//         })
//         window.location.reload();
//     }

//     return (
//         <>
//             <div>
//                 <form>
//                     <div style={{ paddingBottom: "10px", width: "100%", borderBottom: "1px solid #ccc" }}>
//                         <table>

//                             <tr>
//                                 <td>
//                                     Title:
//                                 </td>
//                                 <td>
//                                     <input
//                                         type="text"
//                                         placeholder="Title"
//                                         onChange={(e) => {
//                                             e.preventDefault();
//                                             settitle(e.target.value)
//                                         }}
//                                         value={Title}
//                                         style={{ background: color[JSON.parse(localStorage.getItem("user") as string).themes.mode].background }}
//                                     />
//                                     {
//                                         Titlecheck && (
//                                             <>
//                                                 <br />
//                                                 <a style={{ WebkitTextFillColor: "red" }}>
//                                                     lmao :)))
//                                                 </a>
//                                             </>
//                                         )
//                                     }
//                                 </td>
//                             </tr>
//                             <tr>
//                                 <td style={{
//                                     paddingRight: "5px"
//                                 }}>
//                                     Publish time:
//                                 </td>
//                                 <td>
//                                     <input
//                                         type="datetime-local"
//                                         style={{ background: color[JSON.parse(localStorage.getItem("user") as string).themes.mode].background }}
//                                         onChange={(e) => {
//                                             e.preventDefault();
//                                             setpublish(e.target.value)

//                                         }}
//                                     />
//                                     {
//                                         timecheck && (
//                                             <>
//                                                 <br />
//                                                 <a style={{ WebkitTextFillColor: "red" }}>
//                                                     lmao :)))
//                                                 </a>
//                                             </>
//                                         )
//                                     }
//                                 </td>
//                             </tr>
//                         </table>
//                     </div>

//                     <div>
//                         <span>
//                             Self-description:
//                         </span>

//                         <div>

//                             <button onClick={onClick} id="editor" style={{ padding: "3px 3px 3px 3px" }}>

//                                 <FontAwesomeIcon icon={faPenToSquare} />

//                                 <a onClick={onClick} id="editor" style={{ paddingLeft: "5px" }}>
//                                     Editor
//                                 </a>
//                             </button>

//                             <button onClick={onClick} id="preview" style={{ padding: "3px 3px 3px 10px" }}>
//                                 <FontAwesomeIcon icon={faEye} />
//                                 <a onClick={onClick} id="preview" style={{ paddingLeft: "5px" }}>
//                                     Preview
//                                 </a>
//                             </button>
//                         </div>

//                         <div style={{ height: "350px", width: "1500px", display: "flex", flexDirection: "row" }}>
//                             {
//                                 (mode == "editor") ? (
//                                     <>
//                                         <div id="row" style={
//                                             {
//                                                 overflowY: "auto",

//                                                 overflow: "hidden",
//                                                 // top: "0",
//                                                 // position: "sticky",
//                                                 width: "3%",
//                                                 height: "100%",
//                                                 borderRight: "2px solid",
//                                                 backgroundColor: "#e8e8e8",
//                                                 marginTop: "5px",
//                                                 color: color[JSON.parse(localStorage.getItem("user") as string).themes.mode].background
//                                             }}>
//                                             {lines.map((item, index) => (
//                                                 <div style={{ display: "flex", justifyContent: "space-around", paddingTop: "0px", paddingBottom: `${item.more * 20}px` }}>
//                                                     {index + 1}
//                                                 </div>
//                                             ))}
//                                         </div>
//                                         <div
//                                             id="editorr"
//                                             contentEditable="true"
//                                             ref={contentRef}
//                                             style={{
//                                                 marginTop: "5px",
//                                                 marginLeft: "1px",
//                                                 height: "350px",
//                                                 width: "1400px",
//                                                 overflowY: "auto",
//                                                 overflowX: "auto",
//                                                 flex: "1"
//                                             }}
//                                             onInput={(e) => {
//                                                 e.preventDefault()

//                                                 setdata((e.target as HTMLInputElement).innerText.replace(/\n\n/g, '\n'))
//                                                 sethtml((e.target as HTMLInputElement).innerHTML)

//                                                 type temping = {
//                                                     line: number,
//                                                     more: number
//                                                 }
//                                                 const temp: temping[] = [];

//                                                 (e.target as HTMLInputElement).innerText.replace(/\n\n/g, '\n').split("\n").forEach((item: string | any[], index: number) => {
//                                                     // console.log(item.split("\n"))
//                                                     if (item.length <= 303) {
//                                                         temp.push({ line: index + 1, more: Math.floor(item.length / 215) })
//                                                         return;
//                                                     }
//                                                     const length = item.length - 95;
//                                                     temp.push({ line: index + 1, more: Math.floor(length / 208) + 1 })
//                                                 })



//                                                 setlines(((e.target as HTMLInputElement).innerText != "" && (e.target as HTMLInputElement).innerText != "\n") ? temp : [{ line: 1, more: 0 }])
//                                             }}
//                                             onScroll={(e) => {
//                                                 (document.getElementById("row") as HTMLElement).scrollTop = (e.target as HTMLElement).scrollTop
//                                             }}
//                                         >
//                                         </div>
//                                     </>
//                                 ) : (
//                                     <div style={{
//                                         height: "350px",
//                                         width: "100%",
//                                         marginTop: "5px",

//                                         padding: "15px 15px 15px 15px",
//                                         borderWidth: "1px",
//                                         borderStyle: "solid",
//                                         borderColor: "#ccc",

//                                     }}>
//                                         <Markdown
//                                             children={sanitize(data)}
//                                             rehypePlugins={[rehypeRaw, rehypeSanitize]}
//                                         />

//                                     </div>
//                                 )
//                             }
//                         </div>
//                         {
//                             datacheck && (
//                                 <>
//                                     <br />
//                                     <a style={{ WebkitTextFillColor: "red" }}>
//                                         lmao :)))
//                                     </a>

//                                 </>
//                             )
//                         }
//                     </div>

//                     <div style={{ paddingTop: "10px" }}>
//                         <button id="save" className="submit" style={{
//                             float: "right",
//                             // backgroundColor: Theme_mode,
//                             marginTop: "3px",
//                             padding: "3px 3px 3px 3px",
//                             borderRadius: "5px"
//                         }} onClick={saveClick}>
//                             <a id="save" onClick={saveClick}>
//                                 Save
//                             </a>
//                         </button>
//                     </div>
//                 </form >
//             </div >
//         </>
//     )
// }