import React, { ReactElement, StrictMode, useEffect, useState } from "react";
import { color, get_rank_color, getdata } from "../../@classes/ultility.js";
import { Group, User } from "../../@classes/type.js";
import { Languages, Theme_mode, User_role } from "../../@classes/enum.js";

export function Home_Groups() {
    const [search, Setsearch] = useState("")
    const [curr_page, setCurr_page] = useState(1);
    const [mode, setmode] = useState("points")
    const [reverse, setreverse] = useState(true);
    const [page, setpage] = useState(<></>);
    const [table, settable] = useState(<></>);


    useEffect(() => {

        async function lmao() {
            const res = await getdata("sort", "groups", { mode: mode, search: search, reverse: reverse, page: curr_page, lineperpage: 100 });

            let users: any[];
            let totalPage: number;
            if (res == undefined) {
                users = [{
                    stt: 1,
                    groupname: "Unable to find this group, try to search another word",
                    unt: 0

                }]
                totalPage = 1;
            }
            else if (res.groupname != undefined) {
                users = [res]
                totalPage = 1;
            }
            else {
                users = res.data.data;
                totalPage = res.data.totalPage
            }

            // console.log(users.length)

            const themes = color[JSON.parse(localStorage.getItem("user") as string).themes.mode];
            // console.log(themes)
            const element: ReactElement[] = users.map((user: { stt: number, unt: number, groupname: string }, index) => {
                // console.log(user.stt)
                return (
                    <tr>
                        <td style={{ border: `1px solid ${themes.font}` }}>
                            {user.stt}
                        </td>

                        {/* <td style={{ border: `1px solid ${themes.font}` }}>
                            {user.rank}
                        </td> */}
                        <td style={{ border: `1px solid ${themes.font}` }}>

                            {user.groupname}

                        </td>
                        {/* <td style={{ border: `1px solid ${themes.font}` }}>
                            {user.problems_count}
                        </td> */}
                        <td style={{ border: `1px solid ${themes.font}` }}>
                            {user.unt}
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
                        {/* <th id="users_rank" style={{ width: "10%", border: `1px solid ${themes.font}` }}>
                            <button name={"users_rank"}>
                                Rank
                            </button>
                        </th> */}
                        <th id="users" style={{ width: "55%", border: `1px solid ${themes.font}` }}>
                            Group name
                        </th>
                        {/* <th id="users_prlcnt" style={{ width: "10%", border: `1px solid ${themes.font}` }}>
                            <button name={"users_prlcnt"}>
                                Problems count
                            </button>
                        </th> */}
                        <th id="users_unt" style={{ width: "10%", border: `1px solid ${themes.font}` }}>
                            <button name={"users_unt"}>
                                Users
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
                        console.log(target)
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