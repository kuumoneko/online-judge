// import { width } from "@fortawesome/free-solid-svg-icons/fa0";
import axios from "axios";
import DOMPurify from "dompurify";
import { useEffect, useRef, useState } from "react"
import { createRoot } from "react-dom/client";
import Markdown from "react-markdown";
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import { color, get_rank_color, getdata, getGravatarURL, getrank } from "./ulti.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
// import { CreateMarkdown } from "./ulti.js";

function sanitizeHtml(html) {
    const domParser = new DOMParser();
    const doc = domParser.parseFromString(html, 'text/html');

    const scripts = doc.querySelectorAll('script');
    scripts.forEach(script => script.parentNode.removeChild(script));

    return doc.body.innerHTML;
}

function Editprofile({ user }) {
    // console.log(user.profile.data.split("\n").length)
    const [fullname, setfullname] = useState(user.fullname)
    const [mode, setmode] = useState("editor");
    const [lines, setlines] = useState((user.profile == undefined || user.profile.data == "") ? 1 : user.profile.data.split("\n").length);
    const [data, setdata] = useState((user.profile == undefined || user.profile.data == "") ? `Hello, I'm ${user.fullname}` : user.profile.data);
    const [html, sethtml] = useState((user.profile == undefined || user.profile.data == "") ? `Hello, I'm ${user.fullname}` : user.profile.html);
    const [themes, setthemes] = useState(user.themes.mode)

    const [default_language, setdefault_language] = useState(user.language.default_language)

    const languages = [
        "C++03",
        "C++11",
        "C++14",
        "C++17",
        "C++20",
        "C++ (Themis)",
        "Python 3",
        "java",
        "javascript"
    ];

    const all_language_code = {
        "C++03": false,
        "C++11": false,
        "C++14": false,
        "C++17": false,
        "C++20": false,
        "C++ (Themis)": false,
        "Python 3": false,
        "java": false,
        "javascript": false,
    }
    user.language.languages.forEach((item) => {
        all_language_code[item] = true
    })

    // console.log(all_language_code)
    const contentRef = useRef(null);

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

        // console.log(mode)
    }

    const saveClick = async (e) => {
        e.preventDefault();

        const res = await getdata("get", "users", user.username)
        res.profile = {
            data: data,
            html: html
        };
        res.themes.mode = themes;

        await getdata("post", "users", res)
        window.location.reload();
    }

    const onChange = (e) => {
        setfullname(e.target.value)
    }

    const onThemesClick = (e) => {
        console.log(e.target.id)
        setthemes(e.target.id)
    }



    // console.log(color[JSON.parse(localStorage.getItem("user")).themes.mode].font)
    return (
        <>
            <div>
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
                                        onChange={onChange}
                                        value={fullname}
                                        style={{ background: color[JSON.parse(localStorage.getItem("user")).themes.mode].background }}
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
                                            <tr onClick={onThemesClick}>
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
                            <tr >
                                <td>
                                    languages:
                                </td>
                                <td style={{ width: "1000px" }}>
                                    <span>
                                        <ul>
                                            {
                                                languages.map((item) => {
                                                    return (
                                                        <>
                                                            <input type="checkbox" checked={all_language_code[item]}>
                                                            </input>
                                                            <label id={item} style={{ paddingRight: "10px" }}  >
                                                                {item}
                                                            </label>
                                                        </>
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
                                                overflowY: "auto",
                                                overflow: "hidden",
                                                // top: "0",
                                                // position: "sticky",
                                                width: "3%",
                                                height: "100%",
                                                borderRight: "2px solid",
                                                backgroundColor: "#e8e8e8",
                                                marginTop: "5px",
                                                color: color[JSON.parse(localStorage.getItem("user")).themes.mode].background
                                            }}>
                                            {Array.from({ length: lines }).map((item, index) => (
                                                <div style={{ display: "flex", justifyContent: "space-around", paddingTop: "0px" }}>
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
                                                flex: "1"
                                            }}
                                            onInput={oninput}
                                            onScroll={(e) => {
                                                document.getElementById("row").scrollTop = e.target.scrollTop
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

function Profile({ users, user }) {

    const temp = [];
    Object.keys(users).forEach((item) => {
        temp.push(users[item])
    })

    const rank_by_points = getrank(temp, "points", user)
    const rank_by_rank = getrank(temp, "rank", user)


    const color = get_rank_color(2900, "Users")
    return (
        <>
            <div >
                <div style={{ float: "left", height: "400px", width: "250px", border: "1px 1px 1px 1px" }}>
                    <div >
                        <img src={getGravatarURL(user.email, 200)} style={{ borderRadius: "100px" }} />

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
                                {"Rank by points: "}
                            </a>
                            <a style={{ fontSize: "20px" }}>
                                {`#${rank_by_points}`}
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

                        <a style={{ display: "block", borderBottom: "1px solid #d2d2d2", width: "250px" }} />

                        <h4 style={{ borderBottom: "0px" }}>
                            <a className="font-bold">
                                {"Rank by rating: "}
                            </a>
                            <a style={{ fontSize: "20px" }}>
                                {`#${rank_by_rank}`}
                            </a>
                        </h4>

                        <h4 style={{ borderBottom: "0px" }}>
                            <a className="font-bold">
                                {"Rating: "}
                            </a>
                            <a className="font-bold" style={{ fontSize: "20px", color: color }}>
                                {user.rank}
                            </a>
                        </h4>

                    </div>
                </div>
                <div style={{ float: "right", height: "400px", width: "1600px" }}>
                    {
                        (user.group.length != 0) ? (
                            <>
                                <div>
                                    <h1 className="font-bold">
                                        FROM:
                                    </h1>
                                </div>
                                <br />
                                <div >
                                    <a>
                                        {/* {"From: "} */}
                                        {user.group.map((i, index) => {
                                            // console.log(i);
                                            if (index == user.group.length - 1) {
                                                return (
                                                    <a href={`/group/${i}`}>
                                                        {` ${i}`}
                                                    </a>
                                                )
                                            }
                                            return (
                                                <a href={`/group/${i}`}>
                                                    {` ${i},`}
                                                </a>
                                            );
                                        }
                                        )}
                                    </a>
                                </div>
                                <br />
                            </>
                        ) : (<></>)
                    }
                    {
                        (
                            user.profile.html
                        ) ?
                            (
                                <>
                                    <div>
                                        <h1 className="font-bold">
                                            ABOUT ME:
                                        </h1>
                                    </div>
                                    <div>
                                        <Markdown
                                            children={sanitizeHtml(user.profile.data)}
                                            rehypePlugins={[rehypeRaw, rehypeSanitize]} />
                                    </div>
                                </>
                            )
                            :
                            (
                                <>
                                </>
                            )
                    }

                </div>
            </div>

        </>
    )
}

export function User({ url, users }) {
    // const lmaoo = []
    // // lmaoo.reduce()
    // console.log(typeof users)
    // const userss = users.reduce((acc, username) => {
    //     console.log(acc, username)

    //     return { ...acc, [username]: username }
    // }, {});

    useEffect(() => {
        async function lmao() {

            const res = await getdata("get", "users", url[1]);
            const root = createRoot(document.getElementById("profile"))
            if (url[2]) {

                root.render(
                    (url[2] == "edit_profile") ? (
                        <Editprofile user={users[url[1]]} />
                    ) : (<></>)
                )
            }
            else {
                root.render(
                    <Profile users={users} user={users[url[1]]} />
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