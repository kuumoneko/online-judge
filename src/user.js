// import { width } from "@fortawesome/free-solid-svg-icons/fa0";
import axios from "axios";
import DOMPurify from "dompurify";
import { useEffect, useRef, useState } from "react"
import { createRoot } from "react-dom/client";
import Markdown from "react-markdown";
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import { color, getdata, getGravatarURL } from "./ulti.js";
// import { CreateMarkdown } from "./ulti.js";



function Editprofile({ user }) {

    const [fullname, setfullname] = useState(user.fullname)
    const [mode, setmode] = useState("editor");
    const [lines, setlines] = useState((user.profile == undefined || user.profile.data == "") ? 1 : user.profile.data.split("/n").length);
    const [data, setdata] = useState((user.profile == undefined || user.profile.data == "") ? `Hello, I'm ${user.fullname}` : user.profile.data);
    const [html, sethtml] = useState((user.profile == undefined || user.profile.data == "") ? `Hello, I'm ${user.fullname}` : user.profile.html);

    const contentRef = useRef(null);

    const temp = []
    for (let i = 1; i <= lines; i++) {
        temp.push(i)
    }

    const oninput = (e) => {
        e.preventDefault()

        setdata(e.target.innerText.replace(/\n\n/g, '\n'))
        sethtml(e.target.innerHTML)
        setlines((e.target.innerText != "" && e.target.innerText != "\n") ? e.target.innerText.replace(/\n\n/g, '\n').split("\n").length : 1)
    }

    useEffect(() => {
        const lmao = document.getElementById("editorr");

        if (lmao != null && lmao.innerHTML == "") {
            lmao.innerHTML = html
        }
    })

    const onClick = (e) => {
        e.preventDefault();
        setmode(e.target.id)

        console.log(mode)
    }

    const saveClick = async (e) => {
        e.preventDefault();

        const res = await getdata("get", "users", user.username)
        res.profile = {
            data: data,
            html: html
        };

        await getdata("post", "users", res)
    }

    const onChange = (e) => {
        setfullname(e.target.value)
    }

    function sanitizeHtml(html) {
        const domParser = new DOMParser();
        const doc = domParser.parseFromString(html, 'text/html');

        const scripts = doc.querySelectorAll('script');
        scripts.forEach(script => script.parentNode.removeChild(script));

        return doc.body.innerHTML;
    }

    return (
        <>
            <div>
                <form>
                    <div style={{ paddingBottom: "10px", width: "100%", borderBottom: "1px solid #ccc" }}>
                        <span>
                            {"Full name:   "}
                        </span>
                        <input
                            type="text"
                            placeholder="Full name"
                            onChange={onChange}
                            value={fullname}
                        >
                        </input>
                    </div>
                    <div>
                        <span>
                            Self-description:
                        </span>

                        <div>

                            <button onClick={onClick} id="editor" style={{ padding: "3px 3px 3px 3px" }}>
                                <a onClick={onClick} id="editor">
                                    Editor
                                </a>
                            </button>

                            <button onClick={onClick} id="preview" style={{ padding: "3px 3px 3px 3px" }}>
                                <a onClick={onClick} id="preview">
                                    Preview
                                </a>
                            </button>
                        </div>

                        <div style={{ height: "350px", width: "1500px", display: "flex", flexDirection: "row" }}>
                            {
                                (mode == "editor") ? (
                                    <>
                                        <div id="row" style={{ width: "3%", height: "100%", borderRight: "2px solid", backgroundColor: "#e8e8e8", marginTop: "5px" }}>
                                            {temp.map((item, index) => (
                                                <a style={{ display: "flex", justifyContent: "space-around", paddingTop: "0px" }}>
                                                    {item}
                                                </a>
                                            ))}
                                        </div>
                                        <div id="input" style={{ marginTop: "5px", marginLeft: "1px" }}>
                                            <div
                                                id="editorr"
                                                contentEditable="true"
                                                ref={contentRef}
                                                style={{ height: "350px", width: "1400px" }}
                                                onInput={oninput}
                                            >
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div style={{
                                        height: "350px",
                                        width: "1400px",
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
                            // backgroundColor: color.theme,
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

function Profile({ user }) {
    console.log(user.group.length)
    return (
        <>
            <div >
                <div style={{ float: "left", height: "400px", width: "250px", border: "1px 1px 1px 1px" }}>
                    <div >
                        <img src={getGravatarURL(user.email, 200)} />
                        <br />
                        <h4 style={{ borderBottom: "0px" }}>
                            <a className="font-bold"> Email: </a>
                            <a style={{ fontSize: "20px" }}>
                                {user.email}
                            </a>
                        </h4>

                        <h4 style={{ borderBottom: "0px" }}>
                            <a className="font-bold">
                                {"Points: "}
                            </a>
                            <a style={{ fontSize: "20px" }}>
                                {user.points}
                            </a>
                        </h4>

                        <h4 style={{ borderBottom: "0px" }}>
                            <a className="font-bold">
                                {"Problems solved: "}
                            </a>
                            <a style={{ fontSize: "20px" }}>
                                {user.problems_count}
                            </a>
                        </h4>

                        <h4 style={{ borderBottom: "0px" }}>
                            <a className="font-bold">
                                {"Contibute points: "}
                            </a>
                            <a style={{ fontSize: "20px" }}>
                                {user.contribute}
                            </a>
                        </h4>
                    </div>
                </div>
                <div style={{ float: "right", height: "400px", width: "1600px" }}>
                    {
                        (user.group.length != 0) ? (
                            <div style={{ borderBottom: "1px solid #ccc" }}>
                                <a>
                                    {"From: "}
                                    {
                                        user.group.map(i => (
                                            <a>
                                                {item}
                                            </a>
                                        ))
                                    }
                                </a>
                            </div>
                        ) : (<></>)
                    }
                    

                </div>
            </div>

        </>
    )
}

export function User({ url, user }) {
    // console.log(user)
    useEffect(() => {
        async function lmao() {

            const res = await getdata("get", "users", url[1]);
            const root = createRoot(document.getElementById("profile"))
            if (url[2]) {

                root.render(
                    (url[2] == "edit_profile") ? (
                        <Editprofile user={res} />
                    ) : (<></>)
                )
            }
            else {
                root.render(
                    <Profile user={user} />
                )
            }


        }

        lmao();
    }, [])


    return (

        <div id="profile" >

        </div>
    )
}