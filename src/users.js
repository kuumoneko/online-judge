import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { ConvertToPage, get_rank_color, SortGroup, SortUser } from "./ulti.js";
// import { number } from "yup";
// import { render } from "react-dom";

/**
 * 
 * @param { * } users 
 * @param {number} page 
 * @param { {rank:string , prlcnt:string , pnt:string, ctb:string, unt:string, mode:string} } modee 
 * @param {string} search 
 */
async function Pages(users, page, modee, search) {

    const handleClick = (e) => {
        // console.log(search)
        if (e.target.attributes.id.value == "pre") {
            render_users(modee, page - 1, search)
        }
        else if (e.target.attributes.id.value == "next") {
            render_users(modee, page + 1, search)
        }
        else if (e.target.attributes.id.value == "begin") {
            render_users(modee, 1, search)
        }
        else if (e.target.attributes.id.value == "end") {
            render_users(modee, users.length, search)
        }
        else {
            page = e.target.attributes.id.value;
            render_users(modee, Number(page), search)
        }

        window.scrollTo({
            top: 0,
            behavior: 'instant'
        })

    }
    const root = createRoot(document.getElementById("page"))

    const root2 = createRoot(document.getElementById("page2"))

    while (root.firstChild) {
        root.removeChild(root.firstChild);
    }

    while (root2.firstChild) {
        root2.removeChild(root2.firstChild);
    }

    // console.log(users.length > 5 , '\n' , page >= 5)

    var temp = false;
    const res = (
        <StrictMode>
            <button id="begin" onClick={handleClick} style={{ paddingLeft: "2px", paddingRight: "2px", border: "1px solid #000000", width: "25px", height: "25px" }} disabled={(page == 1)}>
                <a id="begin" onClick={handleClick}>
                    {"<<"}
                </a>
            </button>
            <button id="pre" onClick={handleClick} style={{ paddingLeft: "2px", paddingRight: "2px", border: "1px solid #000000", width: "25px", height: "25px" }} disabled={(page == 1)}>
                <a id="pre" onClick={handleClick}>
                    {"<"}
                </a>
            </button>
            {

                users.map((item, index) => {
                    const color = (index + 1 == page) ? "yellow" : ""

                    if (page <= 5) {
                        // console.log( page + 2)
                        if (index < page + 2) {
                            // console.log(index + 1)
                            return (
                                <button id={index + 1} onClick={handleClick} style={{ paddingLeft: "2px", paddingRight: "2px", border: "1px solid #000000", width: "25px", height: "25px", backgroundColor: color }} disabled={false}>
                                    <a id={index + 1} onClick={handleClick}>
                                        {` ${index + 1} `}
                                    </a>
                                </button>
                            )
                        }
                    }
                    else {
                        if (index < 2 || (index >= page - 3 && index <= page + 1)) {
                            // console.log(index + 1)
                            return (
                                <button id={index + 1} onClick={handleClick} style={{ paddingLeft: "2px", paddingRight: "2px", border: "1px solid #000000", width: "25px", height: "25px", backgroundColor: color }} disabled={false}>
                                    <a id={index + 1} onClick={handleClick}>
                                        {` ${index + 1} `}
                                    </a>
                                </button >
                            )
                        }
                        else if (!temp) {
                            // console.log("...")
                            temp = true

                            return (
                                <button id={"..."} style={{ paddingLeft: "2px", paddingRight: "2px", border: "1px solid #000000", width: "25px", height: "25px" }} disabled={true}>
                                    <a id={"..."}>
                                        {`...`}
                                    </a>
                                </button>
                            )
                        }
                    }


                })
            }
            {
                (page != users.length) && (
                    <button id={"..."} style={{ paddingLeft: "2px", paddingRight: "2px", border: "1px solid #000000", width: "25px", height: "25px" }} disabled={true}>
                        <a id={"..."}>
                            {`...`}
                        </a>
                    </button>
                )
            }

            <button id="next" onClick={handleClick} style={{ paddingLeft: "2px", paddingRight: "2px", border: "1px solid #000000", width: "25px", height: "25px" }} disabled={(page == users.length)}>
                <a id="next" onClick={handleClick}>
                    {">"}
                </a>
            </button>
            <button id="end" onClick={handleClick} style={{ paddingLeft: "2px", paddingRight: "2px", border: "1px solid #000000", width: "25px", height: "25px" }} disabled={(page == users.length)}>
                <a id="end" onClick={handleClick}>
                    {">>"}
                </a>
            </button>
        </StrictMode >
    )

    root.render(res)

    root2.render(res)
}

/**
 * 
 * @param {*} users 
 * @param {number} page 
 * @param { {rank:string , prlcnt:string , pnt:string, ctb:string, unt:string, mode:string} } modee 
 * @param {string} search 
 */
async function test(users, page, modee, search) {
    // console.log(users)
    const pages = ConvertToPage(users, 100);
    // console.log(page)
    Pages(pages, page, modee, search)
    // var i = 1

    const lists = pages[page - 1]
    // console.log(page)
    // console.log(lists)

    const headers = (modee.mode == "users") ? ["rank", { username: "username", group: "group" }, "problems_count", "points", "contribute"] : ["group", "unt"]
    const lmao = createRoot(document.getElementById("userss"))

    while (lmao.firstChild) {
        lmao.removeChild(lmao.firstChild);
    }

    const temp = (modee.mode == "users") ? (
        <>
            <th id="users" style={{ width: "5%" }}>
                STT
            </th>
            <th id="users" style={{ width: "10%" }}>
                <button name={"rank"}>
                    Rank
                </button>
            </th>
            <th id="users" style={{ width: "55%" }}>
                Username
            </th>
            <th id="users" style={{ width: "10%" }}>
                <button name={"prlcnt"}>
                    Problems count
                </button>
            </th>
            <th id="users" style={{ width: "10%" }}>
                <button name={"pnt"}>
                    Points
                </button>
            </th>
            <th id="users" style={{ width: "10%" }}>
                <button name={"ctb"}>
                    Contribution points
                </button>
            </th>
        </>
    ) : (
        <>
            <th id="users" style={{ width: "5%" }}>
                STT
            </th>
            <th id="users" style={{ width: "55%" }}>
                Group name
            </th>
            <th id="users" style={{ width: "10%" }}>
                <button name={"unt"}>
                    Users count
                </button>
            </th>
        </>
    )

    lmao.render(
        <StrictMode>
            <tbody style={{ display: "table-row-group", verticalAlign: "middle", borderColor: "inherit" }}>
                <tr style={{ borderTop: "1px solid #dddddd" }}>
                    {temp}
                </tr>
                {
                    lists.map((user, index) => {
                        if (modee.mode == "users") {
                            const item = user.user
                            const color = get_rank_color(item.rank, item.role)
                            return (
                                <tr>
                                    <td style={{ border: "1px solid #dddddd" }}>
                                        {user.stt}
                                    </td>
                                    {
                                        headers.map((header) => {
                                            if (item[header] != undefined)
                                                if (header == "rank") {
                                                    return (
                                                        <td style={{ border: "1px solid #dddddd", color: color, fontWeight: "bold" }}>
                                                            {item[header]}
                                                        </td>
                                                    )
                                                }
                                                else
                                                    return (
                                                        <td style={{ border: "1px solid #dddddd" }}>
                                                            {item[header]}
                                                        </td>
                                                    )
                                            else {
                                                const groups = item.group;
                                                const fn_color = "#808080"
                                                var group = ""
                                                groups.forEach((item) => {
                                                    group += `${item} | `
                                                })
                                                return (
                                                    <td style={{ border: "1px solid #dddddd" }}>
                                                        <div style={{ float: "left", paddingLeft: "10px" }}>
                                                            <div>
                                                                <a className="font-bold" style={{ float: "left", color: color }} href={`/user/${user.username}`}>
                                                                    {item.username}
                                                                </a>
                                                            </div>
                                                            <span>
                                                                <a className="font-light" style={{ float: "left", color: fn_color, fontWeight: "600" }}>
                                                                    {item.fullname}
                                                                </a>
                                                            </span>
                                                        </div>
                                                        <div style={{ float: "right", paddingRight: "10px", fontWeight: "bold", color: "#808080" }}>
                                                            {
                                                                groups.map((group, index) => {
                                                                    if (index != groups.length - 1)
                                                                        return (
                                                                            <>
                                                                                <em >
                                                                                    <a href={`/group/${group}`}>
                                                                                        {group}
                                                                                    </a>
                                                                                </em>
                                                                                <em style={{ color: "black" }}>
                                                                                    {" | "}
                                                                                </em>
                                                                            </>
                                                                        )
                                                                    else
                                                                        return (
                                                                            <em >
                                                                                <a href={`/group/${group}`}>
                                                                                    {group}
                                                                                </a>
                                                                            </em>
                                                                        )
                                                                })
                                                            }
                                                        </div>
                                                    </td>
                                                )
                                            }
                                        })
                                    }
                                </tr>
                            )
                        }
                        else {
                            const item = user.group
                            // console.log(item);
                            const color = "#dddddd";

                            return (
                                <tr>
                                    <td style={{ border: "1px solid #dddddd" }}>
                                        {user.stt}
                                    </td>
                                    {
                                        headers.map((header, index) => {
                                            // if (header == "u")
                                            return (
                                                <td style={{ border: "1px solid #dddddd" }}>

                                                    <a href={`/group/${item[header]}`}>
                                                        {
                                                            item[header]
                                                        }s
                                                    </a>
                                                </td>
                                            )
                                            // console.log(`${header}: ${item[header]}`)
                                        })
                                    }
                                </tr>
                            )
                        }
                    })
                }
            </tbody>
        </StrictMode>
    )

}

/**
 * 
 * @param { {rank:string , prlcnt:string , pnt:string, ctb:string, unt:string, mode:string} } modee
 * @param {number} curr_page 
 * @param {string} search 
 */
async function render_users(modee, curr_page, search) {
    if (modee.mode == "users") {
        const db = window.indexedDB.open("users", 1);

        var mode;

        db.onsuccess = (event) => {
            const res = event
                .target
                .result
                .transaction('user', 'readonly')
                .objectStore('user')
                .getAll();
            res.onsuccess = (e) => {
                const res = e.target.result;

                if (modee.rank != "auto") {
                    mode = {
                        mode: "rank",
                        reverse: (modee.rank == "down") ? false : true
                    }
                }
                else if (modee.prlcnt != "auto") {
                    mode = {
                        mode: "problems_count",
                        reverse: (modee.prlcnt == "down") ? false : true
                    }
                }
                else if (modee.pnt != "auto") {
                    mode = {
                        mode: "points",
                        reverse: (modee.pnt == "down") ? false : true
                    }
                }
                else if (modee.ctb != "auto") {
                    mode = {
                        mode: "contribute",
                        reverse: (modee.ctb == "down") ? false : true
                    }
                }
                // console.log(search)
                const users = SortUser(res, mode.mode, mode.reverse, search || "")
                // console.log(users)
                if (users.length == 0) {
                    users.push({
                        stt: 1,
                        user: {
                            username: "Unable to find this user, try to search another word",
                            points: 0,
                            problems_count: 0,
                            group: [],
                            rank: 0,
                            role: undefined,
                            contribute: 0
                        }
                    })
                }
                test(users, curr_page, modee, search)
            }
        }
    }
    else {
        const db = window.indexedDB.open("groups", 1);

        var mode;

        db.onsuccess = (event) => {
            const res = event
                .target
                .result
                .transaction('group', 'readonly')
                .objectStore('group')
                .getAll();
            res.onsuccess = (e) => {
                const res = e.target.result;

                if (modee.unt != "auto") {
                    mode = {
                        mode: "unt",
                        reverse: (modee.unt == "down") ? false : true
                    }
                }

                // console.log(res)
                const groups = SortGroup(res, mode.mode, mode.reverse, search || "")
                // const users = SortUser(res, mode.mode, mode.reverse, search || "")
                console.log(groups)
                if (groups.length == 0) {
                    groups.push({
                        stt: 1,
                        group: {
                            group: "Unable to find this user, try to search another word",
                            unt: 0
                        }
                    })
                }
                test(groups, curr_page, modee, search)
            }
        }
    }
}


function Render({ mode }) {
    var rank = "auto",
        prlcnt = "auto",
        pnt = "up",
        ctb = "auto",
        unt = "up";

    var curr_page = 1;

    const handleClick = (event) => {
        const target = event.target;

        if (target.attributes.name == undefined) {
            return;
        }
        else if (mode == "users" && target.attributes.name.nodeValue == "rank") {
            rank = (rank == "up") ? "down" : "up";
            prlcnt = "auto";
            pnt = "auto";
            ctb = "auto";
            curr_page = 1;
        }
        else if (mode == "users" && target.attributes.name.nodeValue == "prlcnt") {
            prlcnt = (prlcnt == "up") ? "down" : "up";
            rank = "auto";
            pnt = "auto";
            ctb = "auto";
            curr_page = 1;
        }
        else if (mode == "users" && target.attributes.name.nodeValue == "pnt") {
            pnt = (pnt == "up") ? "down" : "up";
            rank = "auto";
            prlcnt = "auto";
            ctb = "auto";
            curr_page = 1;
        }
        else if (mode == "users" && target.attributes.name.nodeValue == "ctb") {
            ctb = (ctb == "up") ? "down" : "up";
            rank = "auto";
            prlcnt = "auto";
            pnt = "auto";
            curr_page = 1;
        }
        else if (mode == "groups" && target.attributes.name.nodeValue == "unt") {
            unt = (unt == "up") ? "down" : "up";
        }

        console.log(unt)

        render_users({ rank: rank, prlcnt: prlcnt, pnt: pnt, ctb: ctb, unt: unt, mode: mode }, curr_page)
    }

    function useDebounce(callback, delay) {
        const [debounced, setDebounced] = useState(callback);

        useEffect(() => {
            const timeout = setTimeout(() => {
                setDebounced(callback);
            }, delay);

            return () => clearTimeout(timeout);
        }, [callback, delay]);

        return debounced;
    }

    const [searching, Setsearching] = useState(false)
    const [search, Setsearch] = useState(null)
    var temp = null

    const handleSearch = (event) => {
        // console.log(searching)
        Setsearch(event.target.value)
        if (searching == false) {
            Setsearching(true)
            temp = setTimeout(() => {
                if (event != undefined) {

                    // console.log(event.target.value)
                    // console.log(search)
                    render_users({ rank: rank, prlcnt: prlcnt, pnt: pnt, ctb: ctb, unt: unt, mode: mode }, curr_page, event.target.value)
                }


                Setsearching(false)
            }, 2000)
        }
        else if (searching == true) {
            clearTimeout(temp)
        }
    }

    useEffect(() => {
        render_users({ rank: rank, prlcnt: prlcnt, pnt: pnt, ctb: ctb, unt: unt, mode: mode }, curr_page)
    }, [])

    return (
        <div style={{ width: "4095px" }}>
            <div id="page" style={{ float: "left", paddingBottom: "10px" }}>
                <a>
                    loading....
                </a>
            </div>
            <div style={{ float: "right", paddingBottom: "10px" }}>
                <span>
                    <input
                        className="search"
                        type="text"
                        placeholder="Enter search here"
                        onChange={handleSearch}
                        value={search}
                    >
                    </input>
                </span>
            </div>

            <div style={{ float: "left", width: "100%" }}>
                <table style={{ borderCollapse: "collapse", width: "100%", textAlign: "center" }} id="userss" onClick={handleClick}>
                    <a style={{ fontSize: "30px" }}>
                        Loading...
                    </a>
                </table>
            </div>

            <div id="page2" style={{ float: "left", paddingTop: "10px" }}>
                <a>
                    loading....
                </a>
            </div>

        </div>
    )
}

/**
 * 
 * @param {string} param0    
 */
export function Users({ mode }) {

    if (mode == "users") {
        return (
            <Render mode={"users"} />
        )
    }
    else {
        return (
            <Render mode={"groups"} />
        )
    }

}