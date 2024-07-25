import React, { useEffect, useRef, useState } from "react"
// import { createRoot } from "react-dom/client";
import Markdown from "react-markdown";
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import { all_language, getdata, allowed_html_tags } from "ultility/ulti.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import { Languages } from "ultility/enum.js";
import { User } from "ultility/types.js";
import { color } from "ultility/color.js"



function sanitizeHtml(html: string) {
    const domParser = new DOMParser();
    const doc = domParser.parseFromString(html, 'text/html');

    const scripts = doc.querySelectorAll('script');
    scripts.forEach(script => (script.parentNode as HTMLElement).removeChild(script));

    return doc.body.innerHTML;
}


function Return_UI({ user }: { user: User }) {

    const [fullname, setfullname] = useState((user as User).fullname)
    const [mode, setmode] = useState("editor");

    const [profile, setprofile] = useState(((user as User).profile == undefined || (user as User).profile == "") ? `Hello, I'm ${(user as User).fullname}` : (user as User).profile);



    const [default_language, setdefault_language] = useState((user as User).language.default_language)

    const [all_language_code, set_all] = useState((user as User).language.languages);

    const contentRef = useRef(null);

    useEffect(() => {
        const lmao = document.getElementById("editorr");

        if (lmao != null && lmao.innerHTML == "") {


            const temp = profile.split("\n").map((item) => {
                let dataa = ""
                allowed_html_tags.forEach((tag) => {
                    if (item.includes(`<${tag}`)) {
                        let finding_first_tag = item.indexOf(">", item.indexOf(`<${tag}`));
                        let finding_second_tag = item.indexOf(">", item.indexOf(`</${tag}`));

                        let tempp_first_tag = item.substring(item.indexOf(`<${tag}`), finding_first_tag + 1);
                        let tempp_second_tag = item.substring(item.indexOf(`</${tag}`), finding_second_tag + 1);

                        dataa = item.replace(tempp_first_tag, tempp_first_tag.replace("<", "&lt;").replace(">", "&gt;")).replace(tempp_second_tag, tempp_second_tag.replace("<", "&lt;").replace(">", "&gt;"))
                    }
                })

                return dataa == "" ? ((item == "") ? "<br>" : item) : dataa;
            }).map((item) => {
                return `<div> <span> ${item}</span> </div>`;
            }).join("\n")

            lmao.innerHTML = temp
        }
    })

    const onClick = (e: any) => {
        e.preventDefault();
        setmode(e.target.id)
    }

    const saveClick = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        const res = await getdata("get", "users", (user as User).username)

        res.profile = profile;

        res.language.languages = all_language_code;
        res.language.default_language = default_language;

        await getdata("post", "users", res)
        window.location.reload();
    }

    const theme: "dark" | "light" = Cookies.get("theme") as "dark" | "light";
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
                                            background: color[theme].background,
                                            color: color[theme].font
                                        }}
                                    />
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
                                        <select
                                            style={{
                                                background: color[theme].background,
                                                color: color[theme].font,
                                                marginLeft: "5px"
                                            }}
                                            value={default_language as string}
                                            onChange={(e) => {
                                                console.log(e.target.value)
                                                setdefault_language(e.target.value as Languages)
                                            }}
                                        >
                                            {
                                                all_language.map((item) => {
                                                    return (
                                                        <option
                                                            style={{
                                                                background: color[theme].background,
                                                                color: color[theme].font
                                                            }}
                                                            value={item}

                                                        >
                                                            {item}
                                                        </option>
                                                    )
                                                })
                                            }

                                        </select>
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

                            <div style={{
                                float: "left"
                            }}>
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
                            <div
                                style={{
                                    float: "right"
                                }}
                            >

                            </div>
                        </div>

                        <div style={{
                            height: "350px",
                            width: "1500px",
                            display: "flex",
                            // flexDirection: "row",
                            borderTop: "1px solid",
                            borderBottom: "1px solid",
                            borderRight: "1px solid",
                            borderLeft: "1px solid",
                            borderRadius: "25px",
                        }}>

                            <div
                                style={{
                                    height: "100%",
                                    width: "100%"
                                }} className="editprofile-flipcard">
                                <div
                                    style={{
                                        height: "100%",
                                        width: "100%",
                                        // display: mode == "editor" ? "block" : "flex"
                                    }} className={`editprofile-flip${mode == "editor" ? "" : " flipped"}`}>
                                    <div
                                        style={{
                                            height: "100%",
                                            width: "100%"
                                        }}
                                        className="profile-editor"
                                    >
                                        <div
                                            id="editorr"

                                            contentEditable="true"
                                            ref={contentRef}
                                            style={{
                                                outline: "none",
                                                marginTop: "10px",
                                                marginLeft: "10px",
                                                height: "100%",
                                                width: "100%",
                                                overflowY: "hidden",
                                                overflowX: "hidden"
                                            }}
                                            onInput={(e) => {
                                                e.preventDefault()

                                                setprofile((e.target as HTMLInputElement).innerText.replace(/\n\n/g, '\n'))

                                            }}
                                            onScroll={(e) => {
                                                (document.getElementById("row") as HTMLElement).scrollTop = (e.target as HTMLElement).scrollTop
                                            }}
                                        >
                                        </div>
                                    </div>

                                    <div
                                        style={{
                                            height: "100%",
                                            width: "100%"
                                        }} className="profile-preview">
                                        <div
                                            style={{
                                                height: "100%",
                                                width: "100%",
                                                padding: "15px 15px 15px 15px",
                                            }}>
                                            <Markdown
                                                children={sanitizeHtml(profile)}
                                                rehypePlugins={[rehypeRaw, rehypeSanitize]}
                                            />
                                        </div>
                                    </div>


                                </div>
                            </div>

                        </div>
                    </div>

                    <div>
                        lmao
                    </div>

                    <div style={{ paddingTop: "10px" }}>
                        <a style={{
                            float: "left",
                            marginTop: "3px",
                            cursor: "pointer",
                            color: "rgba(121, 235, 255, 0.45)"
                        }}
                            href={`/user/${user.username}/change_password`}
                        >
                            Change password?
                        </a>


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


export function Editprofile() {

    const [user, setuser]: [User | undefined, Function] = useState()

    useEffect(() => {
        async function lmao() {
            const res = await getdata("get", "users", localStorage.getItem("username") as string);

            // console.log(res.data.data[0])
            setuser(res.data.data[0])
        }
        lmao();
    }, [])

    const [UI, setUI] = useState(<></>)
    useEffect(() => {
        if (user == undefined) {
            return;
        }
        setUI(
            <Return_UI user={user as User} />
        )
    }, [user])

    return UI
}