import React, { ReactElement, StrictMode, useEffect, useState } from "react";
import { User_role } from "enum";
import { color, get_rank_color } from "color";
import { getdata } from "ulti";
import Cookies from "js-cookie";


export function Home_Users() {
    const [search, Setsearch] = useState("")
    const [curr_page, setCurr_page] = useState(1);
    const [mode, setmode] = useState("points")
    const [reverse, setreverse] = useState(true);
    const [page, setpage] = useState(<></>);
    const [table, settable] = useState(<></>);


    useEffect(() => {

        async function lmao() {
            const res = await getdata("sort", "users", { mode: mode, search: search, reverse: reverse, page: curr_page, lineperpage: 100 });

            let users: any[];
            let totalPage: number;

            users = res.data.data as [];
            totalPage = res.data.totalPage

            const themes = color[Cookies.get("theme") as "dark" | "light"];
            // console.log(themes)
            const element: ReactElement[] = users.map((user: { stt: number, fullname: string, username: string, points: number, problems_count: number, rank: number, role: User_role, group: any[] }, index) => {
                // console.log(user.stt)
                return (
                    <tr>
                        <td style={{ border: `1px solid ${themes.font}` }}>
                            {user.stt}
                        </td>

                        <td style={{ border: `1px solid ${themes.font}` }}>
                            {user.rank}
                        </td>
                        <td style={{ border: `1px solid ${themes.font}` }}>

                            <div style={{ float: "left", paddingLeft: "10px" }}>
                                <div>
                                    <a className="font-bold" style={{ float: "left", color: get_rank_color(user.rank, user.role, themes.font) }} href={`/user/${user.username}`}>
                                        {user.username}
                                    </a>
                                </div>
                                <span>
                                    <a className="font-light" style={{ float: "left", color: "#808080", fontWeight: "600" }}>
                                        {user.fullname}
                                    </a>
                                </span>
                            </div>
                            <div style={{ float: "right", paddingRight: "10px", fontWeight: "bold", color: "#808080" }}>
                                {
                                    user.group.map((group: string, index: number) => {
                                        if (index != user.group.length - 1) {
                                            return (
                                                <>
                                                    <em >
                                                        <a href={`/group/${group}`}>
                                                            {group}
                                                        </a>
                                                    </em>
                                                    <em style={{ color: themes.font }}>
                                                        {" | "}
                                                    </em>
                                                </>
                                            )
                                        } else {
                                            return (
                                                <em >
                                                    <a href={`/group/${group}`}>
                                                        {group}
                                                    </a>
                                                </em>
                                            )
                                        }
                                    })
                                }
                            </div>

                        </td>
                        <td style={{ border: `1px solid ${themes.font}` }}>
                            {user.problems_count}
                        </td>
                        <td style={{ border: `1px solid ${themes.font}` }}>
                            {user.points}
                        </td>
                    </tr >
                )
            })

            const table = (
                <tbody>
                    <tr style={{ borderTop: `1px solid ${themes.font}` }}>
                        <th id="users" style={{ width: "5%" }}>
                            STT
                        </th>
                        <th id="users_rank" style={{ width: "10%", border: `1px solid ${themes.font}` }}>
                            <button name={"users_rank"}>
                                Rank
                            </button>
                        </th>
                        <th id="users" style={{ width: "55%", border: `1px solid ${themes.font}` }}>
                            Username
                        </th>
                        <th id="users_prlcnt" style={{ width: "10%", border: `1px solid ${themes.font}` }}>
                            <button name={"users_prlcnt"}>
                                Problems count
                            </button>
                        </th>
                        <th id="users_pnt" style={{ width: "10%", border: `1px solid ${themes.font}` }}>
                            <button name={"users_pnt"}>
                                Points
                            </button>
                        </th>
                    </tr>
                    {
                        element.map((item: any) => {
                            return item
                        })

                    }
                </tbody>
            )




            // Create Page line


            const handleClick = (e: any) => {
                // console.log(search)
                if (e.target.attributes.id.value == "pre") {
                    setCurr_page(curr_page - 1)
                }
                else if (e.target.attributes.id.value == "next") {
                    setCurr_page(curr_page + 1)
                }
                else if (e.target.attributes.id.value == "begin") {
                    setCurr_page(1)
                }
                else if (e.target.attributes.id.value == "end") {
                    setCurr_page(totalPage)
                }
                else {
                    setCurr_page(Number(e.target.attributes.id.value));
                }

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                })

            }
            let temp = false;

            // console.log(users.length)
            const pages = Array(totalPage).fill(0)

            const paging = (
                <StrictMode>
                    <button key="begin" id="begin" onClick={handleClick} style={{ paddingLeft: "2px", paddingRight: "2px", marginRight: "5px", border: `1px solid ${themes.font}`, width: "25px", height: "25px" }} disabled={(curr_page == 1)}>
                        <a id="begin" onClick={handleClick}>
                            {"<<"}
                        </a>
                    </button>
                    <button id="pre" onClick={handleClick} style={{ paddingLeft: "2px", paddingRight: "2px", marginRight: "5px", border: `1px solid ${themes.font}`, width: "25px", height: "25px" }} disabled={(curr_page == 1)}>
                        <a id="pre" onClick={handleClick}>
                            {"<"}
                        </a>
                    </button>
                    {

                        pages.map((item, index) => {
                            const color = (index + 1 == curr_page) ? "#999900" : ""

                            if (curr_page <= 5) {
                                // console.log( curr_page + 2)
                                if (index < curr_page + 2) {
                                    // console.log(index + 1)
                                    return (
                                        <button id={String(index + 1)} onClick={handleClick} style={{ paddingLeft: "2px", paddingRight: "2px", marginRight: "5px", border: `1px solid ${themes.font}`, width: "25px", height: "25px", backgroundColor: color }} disabled={false}>
                                            <a id={String(index + 1)} onClick={handleClick}>
                                                {` ${index + 1} `}
                                            </a>
                                        </button>
                                    )
                                }
                            }
                            else if (index < 2 || (index >= curr_page - 3 && index <= curr_page + 1)) {
                                // console.log(index + 1)
                                return (
                                    <button id={String(index + 1)} onClick={handleClick} style={{ paddingLeft: "2px", paddingRight: "2px", marginRight: "5px", border: `1px solid ${themes.font}`, width: "25px", height: "25px", backgroundColor: color }} disabled={false}>
                                        <a id={String(index + 1)} onClick={handleClick}>
                                            {` ${index + 1} `}
                                        </a>
                                    </button >
                                )
                            }
                            else if (!temp) {
                                // console.log("...")
                                temp = true

                                return (
                                    <button id={"..."} style={{ paddingLeft: "2px", paddingRight: "2px", marginRight: "5px", border: `1px solid ${themes.font}`, width: "25px", height: "25px" }} disabled={true}>
                                        <a id={"..."}>
                                            {`...`}
                                        </a>
                                    </button>
                                )
                            }


                        })
                    }
                    {
                        (curr_page != pages.length) && (
                            <button id={"..."} style={{ paddingLeft: "2px", paddingRight: "2px", marginRight: "5px", border: `1px solid ${themes.font}`, width: "25px", height: "25px" }} disabled={true}>
                                <a id={"..."}>
                                    {`...`}
                                </a>
                            </button>
                        )
                    }

                    <button id="next" onClick={handleClick} style={{ paddingLeft: "2px", paddingRight: "2px", marginRight: "5px", border: `1px solid ${themes.font}`, width: "25px", height: "25px" }} disabled={(curr_page == pages.length)}>
                        <a id="next" onClick={handleClick}>
                            {">"}
                        </a>
                    </button>
                    <button id="end" onClick={handleClick} style={{ paddingLeft: "2px", paddingRight: "2px", marginRight: "5px", border: `1px solid ${themes.font}`, width: "25px", height: "25px" }} disabled={(curr_page == pages.length)}>
                        <a id="end" onClick={handleClick}>
                            {">>"}
                        </a>
                    </button>
                </StrictMode >
            )

            setpage(paging)
            settable(table)


        }

        lmao()
    }, [mode, reverse, curr_page, search])

    return (
        <div style={{ width: "4095px" }}>
            <div id="page" style={{ float: "left", paddingBottom: "10px" }}>
                {
                    page
                }
            </div>
            <div style={{ float: "right", paddingBottom: "10px" }}>
                <span>
                    <input
                        className="search"
                        style={{
                            backgroundColor: color[Cookies.get("theme") as "dark" | "light"].background,
                            color: color[Cookies.get("theme") as "dark" | "light"].font
                        }}
                        type="text"
                        placeholder="Enter search here"
                        onChange={(e) => {
                            Setsearch(e.target.value)
                        }}
                        value={search || ""}
                    >
                    </input>
                </span>
            </div>
            <div style={{ float: "left", width: "100%" }}>
                <table
                    style={{ borderCollapse: "collapse", width: "100%", textAlign: "center" }}
                    id="userss"
                    onClick={(e) => {
                        const target = (e.target as HTMLInputElement).attributes[0].value.split("_")[1];
                        // console.log(target)
                        if (target == undefined) {
                            return;
                        }
                        else if (target != mode) {
                            setmode(target)
                            setreverse(true)
                            setCurr_page(1)
                        }
                        else {
                            setreverse(!reverse)
                            setCurr_page(1)
                        }
                    }}>
                    {
                        table
                    }
                </table>
            </div>
            <div id="page2" style={{ float: "left", paddingTop: "10px" }}>
                {page}
            </div>
        </div>
    )
}