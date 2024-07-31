import React, { useState, useEffect } from "react";
import { geturl, getdata } from "ulti";

import Cookies from "js-cookie";
import { User, User_Submission } from "type";
import { Coding_status } from "enum";

function Userss({ mode, themes }: { mode: string, themes: { content: string, background: string, font: string } }) {

    function resss(modee: string) {

        return {
            borderRadius: "4px 4px 0 0",
            borderTop: (modee == mode) ? "3px solid #ff99cc" : `1px solid ${themes.content}`,
            borderBottom: (modee == mode) ? `1px solid ${themes.content}` : `1px solid ${themes.font}`,
            borderLeft: (modee == mode) ? `1px solid ${themes.font}` : `1px solid ${themes.content}`,
            borderRight: (modee == mode) ? `1px solid ${themes.font}` : `1px solid ${themes.content}`,
        }
    }

    return (
        <ul style={{ paddingLeft: "0px", backgroundColor: `${themes.content}`, color: `${themes.font}`, borderBottom: "0px", display: "flex", margin: "0", height: "45px", float: "right", marginBottom: "-1px", flexWrap: "nowrap", alignItems: "flex-end" }
        }>
            <li>
                <a id="users" href='/users' style={resss("users")} >
                    User
                </a>
            </li>
            <li >
                <a id="users" href='/groups' style={resss("groups")} >
                    Groups
                </a>
            </li>
        </ul>
    )
}

function Userr({ mode, themes, user }: { mode: string[], themes: { content: string, background: string, font: string }, user: string }) {

    function resss(modee: string | undefined) {
        // console.log(modee, ' ', mode)
        return {
            borderRadius: "4px 4px 0 0",
            borderTop: (modee == mode[2]) ? "3px solid #ff99cc" : `1px solid ${themes.content}`,
            borderBottom: (modee == mode[2]) ? `1px solid ${themes.content}` : `1px solid ${themes.font}`,
            borderLeft: (modee == mode[2]) ? `1px solid ${themes.font}` : `1px solid ${themes.content}`,
            borderRight: (modee == mode[2]) ? `1px solid ${themes.font}` : `1px solid ${themes.content}`,
        }
    }

    return (
        <ul style={{ paddingLeft: "0px", backgroundColor: `${themes.content}`, color: `${themes.font}`, borderBottom: "0px", display: "flex", margin: "0", height: "45px", float: "right", marginBottom: "-1px", flexWrap: "nowrap", alignItems: "flex-end" }
        }>
            <li>
                <a id="users" href={`/user/${mode[1]}`} style={resss(undefined)} >
                    About
                </a>
            </li>
            <li >
                <a id="users" href={`/user/${mode[1]}/statistics`} style={resss("statistics")} >
                    Statistics
                </a>
            </li>
            <li >
                <a id="users" href={`/user/${mode[1]}/blogs`} style={resss("blogs")} >
                    Blogs
                </a>
            </li>

            {
                (user == mode[1]) &&
                (
                    <li>
                        <a id="users" href={`/user/${mode[1]}/edit_profile`
                        } style={resss("edit_profile")} >
                            Edit profile
                        </a>
                    </li>
                )
            }

        </ul >
    )
}

function Problem() {
    const url = geturl();

    const [title, settitle] = useState("");
    const [colorr, setcolor] = useState("")

    useEffect(() => {
        async function getproblem() {
            let res = await getdata("get", "problems", url[1]);
            // console.log(res.data.data[0])

            const problem = res.data.data[0];

            res = await getdata("get", "users", localStorage.getItem("username") as string);

            const user = res.data.data[0] as User;

            let coloring: string;

            if (user.problems.length == 0) {
                coloring = "white"
            }
            else {
                coloring = user.problems.filter((prblm: User_Submission) => {
                    return prblm.id == problem.id
                }).filter((sub: any) => sub.status == Coding_status.AC).length > 0 ? "green" : "yellow"
            }
            setcolor(coloring)

            settitle(problem.name)

        }

        getproblem();
    }, [])

    return (
        <div>
            <a
                style={{
                    color: colorr
                }}
            >
                {
                    title.toUpperCase()
                }
            </a>
        </div>
    )
}


export function Title({ url, themes }: { url: string[], themes: { content: string, background: string, font: string } }) {
    let temp = url[0]
    // console.log(url)

    // const [username, setusername] = useState("")
    temp = temp.replaceAll("_", " ");

    // useEffect(() => {
    //     async function lmao() {
    //         await getdata("get", "users", username).then((user) => {
    //             const titllee = document.getElementById("titlee")

    //             if (titllee) {
    //                 titllee.style.color = get_rank_color(user.rank, User_role.user, themes.content)
    //                 console.log(titllee)
    //             }
    //         })
    //     }
    // }, [username])

    // useEffect(() => {
    //     async function lmaoo() {
    //         const session = await getdata("auth", "users", Cookies.get("sessionId"))
    //         setusername(session ? session.data.username : "")
    //     }
    //     if (temp == "user") {
    //         lmaoo();
    //     }

    // }, [])

    return (
        <>
            <br style={{ paddingBottom: "10px" }} />
            <div
                className='tabs'
                style={{
                    borderBottom: `1px  solid ${themes.font}`,
                    display: "flex",
                    margin: "0 0 8px",
                    width: "100%",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    height: "45px"
                }}>
                {/* <br /> */}
                <h2 id="title" style={{ fontSize: "2em" }}>
                    {
                        (temp == "admin")
                            ?
                            `Adminisrator ${url[2] ? `for ${url[2]}` : "Dashboard"}`
                            :
                            (temp == "user") ?
                                (
                                    <a id="titlee" className='font-bold'>
                                        {
                                            url[1]
                                        }
                                    </a>
                                ) : (temp == "problem") ? (<Problem />) : temp.toUpperCase()
                    }
                </h2>
                {
                    (temp == "users" || temp == "groups") ? (
                        <Userss mode={temp} themes={themes} />
                    ) : (temp == "user") ? (<Userr mode={url} themes={themes} user={localStorage.getItem("username") as string} />) : (<></>)
                }
            </div >
        </>
    )

}