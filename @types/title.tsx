import React, { useEffect } from "react";
import { get_rank_color, getdata, replaceAll } from "./@classes/ultility.js";
import { User_role } from "./@classes/enum.js";

import Cookies from "js-cookie";

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

function Userr({ mode, themes }: { mode: string, themes: { content: string, background: string, font: string } }) {

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
                (Cookies.get("user") == mode[1]) &&
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


export function Title({ url, themes }: { url: string, themes: { content: string, background: string, font: string } }) {
    let temp = url[0]


    temp = replaceAll(temp, "_", " ");
    useEffect(() => {
        async function lmaoo() {
            const temp = await getdata("get", "users", url[1])

            const titllee = document.getElementById("titlee")

            if (titllee) {
                titllee.style.color = get_rank_color(temp.rank, User_role.user, themes.content)
            }


        }
        if (temp == "user") {
            lmaoo();
        }

    })

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
                            `Adminisrator ${url[1] ? `for ${url[1]}` : "Dashboard"}`
                            :
                            (temp == "user") ?
                                (
                                    <a id="titlee" className='font-bold'>
                                        {
                                            url[1]
                                        }
                                    </a>
                                ) : temp.toUpperCase()
                    }
                </h2>
                {
                    (temp == "users" || temp == "groups") ? (
                        <Userss mode={temp} themes={themes} />
                    ) : (temp == "user") ? (<Userr mode={url} themes={themes} />) : (<></>)
                }
            </div >
        </>
    )

}