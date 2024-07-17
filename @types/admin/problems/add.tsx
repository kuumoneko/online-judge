
import React, { useEffect, useRef, useState } from "react";
import { color, getdata, Group, all_language } from "types";
import { faEye, faPenToSquare, faPlus, faUserMinus, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Markdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import rehypeRaw from "rehype-raw";
import { sanitize } from "dompurify";
import Cookies from "js-cookie";
export function Add_Problems() {

    // for editor
    const [mode, setmode] = useState("editor");
    const [lines, setlines] = useState([{ line: 1, more: 0 }]);


    // general
    const [name, setname] = useState("");
    const [Title, settitle] = useState("");
    const [isPrivate, setPrivate] = useState(false);
    const [isPublished, setPublished] = useState(false)
    const [groups, setgroups] = useState([""]);

    // host
    const [search, setsearch] = useState("")
    const [users, setusers] = useState([])
    const [host, sethost] = useState([""])

    useEffect(() => {
        async function lmao() {
            if (search == "") {
                return setusers([])
            }

            const searchmode: any = {
                mode: "username",
            }
            if (search.includes("\"")) {
                searchmode.search = search.split("\"")[1]
            }
            else {
                searchmode.find = search

            }
            const res = await getdata("sort", "users", { mode: "username", search: searchmode, reverse: true, page: 1, lineperpage: 5 })

            if (res == undefined) {
                return setusers([])
            }

            setusers((res.data == undefined) ? [res] : res.data.data.map((item: any) => { return item }))


        }
        lmao();
    }, [search])

    // source
    const [soucre, setsoucre] = useState("")

    //body
    const [data, setdata] = useState("");
    const [html, sethtml] = useState("");

    // points
    const [points, setpoints] = useState(0);

    // limit
    const [timeLimit, setTimeLimit] = useState(1);
    const [memoryLimit, setMemoryLimit] = useState(512);
    const [allowed_language, setallowed_language] = useState(all_language.map((item) => {
        return {
            id: item,
            time: {
                data: 0,
                isDef: true
            },
            memory: {
                data: 0,
                isDef: true
            },

        }
    }))

    useEffect(() => {
        const temping = allowed_language.map((bruh: { id: string, time: { data: number, isDef: boolean }, memory: { data: number, isDef: boolean } }) => {

            if (bruh.time.isDef == true) {
                bruh.time.data = timeLimit
            }
            if (bruh.memory.isDef == true) {
                bruh.memory.data = memoryLimit
            }

            return bruh;
        })
        setallowed_language(temping)
    }, [timeLimit, memoryLimit])



    // problem data
    const [Titlecheck, checktit] = useState(false);
    const [datacheck, checkdata] = useState(false);
    const [timecheck, checktime] = useState(false);




    const [publish, setpublish] = useState("")


    const contentRef = useRef(null);

    const onClick = (e: any) => {
        e.preventDefault();
        console.log(data)
        setmode(e.target.id)
    }

    useEffect(() => {
        const lmao = document.getElementById("editorr");

        if (lmao != null && lmao.innerHTML == "") {
            lmao.innerHTML = html
        }
    })

    const [save, setsave] = useState(false)
    useEffect(() => {
        async function lmao() {

            // console.log("lmao")
            // console.log(`Name: ${name}`);
            // console.log(`title: ${Title}`)
            // console.log(`Publish time: ${publish}`)
            // console.log(`Published: ${isPublished}`)
            // console.log(`Private: ${isPrivate}`)
            // console.log(`Groups: ${groups}`)
            // console.log(`Points: ${points}`)
            // console.log(`Time limit: ${timeLimit}`)
            // console.log(`Memory limit: ${memoryLimit}`)

            // Object.keys(allowed_language).forEach((item, index) => {
            //     console.log(`${index + 1}. ${item}: ${allowed_language[item].time.data} , ${allowed_language[item].memory.data}`)
            // })

            // console.log(`Source: ${soucre}`)

            // console.log(`Body: ${data}`)
            // console.log(host.slice(1, host.length))

            const temp: any = {}

            Object.keys(allowed_language).forEach((item: any) => {
                temp[allowed_language[item].id] = {
                    time: allowed_language[item].time.data,
                    memory: allowed_language[item].memory.data
                }
            })



            const res = await getdata("post", "problems", {
                name: name,
                title: Title,
                host: host.slice(1, host.length),
                publish_time: (isPublished == false) ? publish : "",
                isPublished: isPublished,
                def_limit: {
                    time: timeLimit,
                    memory: memoryLimit
                },
                isPrivate: isPrivate,
                groups: (isPrivate == true) ? groups : undefined,
                points: points,
                limit: temp,
                source: soucre ? soucre : "None",
                avaiable: false,
                body: data,
                hint: {
                    nani: false,
                    data: ""
                }

            })
            console.log(res)
            if (res.status == 200) {
                window.location.href = "/admin/problems"
            }
        }
        if (save == true)
            lmao();
    }, [save])

    const [allGroups, setAllGroups] = useState([])
    const [GroupOptions, setGroupsOptions] = useState(<></>)
    useEffect(() => {
        async function lmao() {
            const res = await getdata("get", "groups", "all");
            setAllGroups(res.data)
            const temping = (
                <>
                    {
                        res.data.map((group: Group) => {
                            return (
                                <option value={group.groupname as string} style={{
                                    background: color[Cookies.get("theme") as string].background,
                                    color: color[Cookies.get("theme") as string].font
                                }}>
                                    {group.groupname}
                                </option>
                            )
                        })
                    }
                </>
            )

            setGroupsOptions(temping)
        }
        lmao()

    }, [])



    return (
        <div className="add-problems-content">
            <table style={{ textAlign: "left" }}>
                <tr>
                    <th >
                        <a className="add-page-title">
                            general :
                        </a>
                    </th>
                    <th>

                    </th>
                </tr>
                <tr>
                    <th>
                        Name :
                    </th>
                    <th>
                        <input style={{
                            background: color[Cookies.get("theme") as string].background,
                            color: color[Cookies.get("theme") as string].font
                        }}
                            type="text"
                            placeholder="Problem name"
                            onChange={(e) => {
                                setname(e.target.value)
                            }}
                        />
                    </th>
                </tr>
                <tr>
                    <th>
                        Title:
                    </th>
                    <th>
                        <input
                            style={{
                                background: color[Cookies.get("theme") as string].background,
                                color: color[Cookies.get("theme") as string].font
                            }}

                            type="text"
                            placeholder="Title"
                            onChange={(e) => {
                                settitle(e.target.value)
                            }}
                        >
                        </input>
                    </th>
                </tr>
                <tr>
                    <th>Host</th>
                    <th style={{ display: "flex" }}>
                        <input
                            style={{
                                background: color[Cookies.get("theme") as string].background,
                                color: color[Cookies.get("theme") as string].font
                            }}
                            type="text"
                            placeholder="Add host"
                            onChange={(e) => {
                                e.preventDefault();
                                setsearch(e.target.value)
                            }}
                        />

                        <ul style={{ zIndex: "1", display: "flex", flexDirection: "row" }}>
                            {
                                users.map((item: any) => {
                                    return (
                                        <li
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (host.findIndex((itemm) => itemm == item.username) == -1) {
                                                    sethost([...host, item.username])
                                                }
                                            }}
                                            style={{
                                                display: "flex",
                                                paddingRight: "10px",
                                                paddingLeft: "10px"
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faUserPlus} />
                                            <a style={{ padding: "0", paddingLeft: "5px", cursor: "pointer" }}>
                                                {item.username}
                                            </a>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </th>
                </tr>
                <tr>
                    <th></th>
                    <th>
                        {
                            (host.length > 1) && (
                                <ul>
                                    {
                                        host.map((item) => {
                                            if (item != "") {
                                                return (
                                                    <li
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            const temping: any[] = host.map((user) => {
                                                                if (user != item) {
                                                                    return user
                                                                }
                                                            })
                                                            temping.splice(temping.findIndex((item) => item == undefined || item == null), 1)
                                                            sethost(temping)
                                                        }}
                                                        style={{
                                                            display: "flex",
                                                            paddingRight: "10px",
                                                            paddingLeft: "10px",
                                                        }}
                                                    >
                                                        <FontAwesomeIcon icon={faUserMinus} style={{ cursor: "pointer" }} />
                                                        <a style={{ padding: "0", paddingLeft: "5px", cursor: "pointer" }}>
                                                            {item}
                                                        </a>
                                                    </li>
                                                )
                                            }

                                        })
                                    }
                                </ul>
                            )
                        }
                    </th>
                </tr>
                <tr>
                    <th>
                        Publish time:
                    </th>
                    <th>
                        <input
                            style={{
                                background: color[Cookies.get("theme") as string].background,
                                color: color[Cookies.get("theme") as string].font
                            }}

                            type="datetime-local"
                            onChange={(e) => {
                                setpublish(e.target.value)

                            }
                            }>
                        </input>
                    </th>
                </tr>
                <tr>
                    <th>
                        Published:
                    </th>
                    <th>
                        <li style={{ display: "flex", flexDirection: "row" }}
                            onClick={(e) => {
                                setPublished(((e.target as HTMLElement).id == "yes") ? true : false)
                            }}>
                            <ul>
                                <input name="isPublished" type="radio" id="yes" checked={isPublished == true} />
                                <label style={{ paddingRight: "5px" }} id="yes">
                                    Yes
                                </label>
                            </ul>
                            <ul>
                                <input name="isPublished" type="radio" id="no" checked={isPublished == false} />
                                <label style={{ paddingRight: "5px" }} id="no">
                                    No
                                </label>
                            </ul>
                        </li>
                    </th>
                </tr>
                <tr>
                    <th>
                        Private:
                    </th>
                    <th>
                        <li style={{ display: "flex", flexDirection: "row" }}
                            onClick={(e) => {
                                setPrivate(((e.target as HTMLElement).id == "yes") ? true : false)
                            }}>
                            <ul>
                                <input name="isPrivate" type="radio" id="yes" checked={isPrivate == true} />
                                <label style={{ paddingRight: "5px" }} id="yes">
                                    Yes
                                </label>
                            </ul>
                            <ul>
                                <input name="isPrivate" type="radio" id="no" checked={isPrivate == false} />
                                <label style={{ paddingRight: "5px" }} id="no">
                                    No
                                </label>
                            </ul>
                        </li>
                    </th>

                </tr>


                <tr>
                    <th>
                        Groups:
                    </th>
                    <th style={{ display: "flex" }}>
                        <input list="list" style={{
                            background: color[Cookies.get("theme") as string].background,
                            color: color[Cookies.get("theme") as string].font
                        }}
                            disabled={isPrivate == false}
                            placeholder="Add/Delete Groups"
                            onChange={(e) => {
                                e.preventDefault();
                                const value = (e.target as HTMLInputElement).value
                                // console.log()

                                const temp: string[] = [...groups];

                                if (temp.find((item) => item == value) == undefined && allGroups.find((item: Group) => item.groupname == value)) {
                                    temp.push(value)
                                }
                                else if (temp.find((item) => item == value)) {
                                    temp.splice(temp.findIndex((item) => item == value), 1)
                                }

                                setgroups(temp)
                            }
                            }
                            value={""}
                        />
                        <datalist
                            id="list"
                        >
                            {GroupOptions}
                        </datalist>
                        <FontAwesomeIcon icon={faPlus} style={{ paddingLeft: "5px" }} onClick={(e) => {
                            e.preventDefault();
                            window.open("/admin/groups/add", "test", 'width=1337, height=614, left=24, top=24, scrollbars, resizable')
                        }} />
                    </th>
                    <th>
                        {
                            groups.map((item: string) => {
                                return (
                                    <a>
                                        {` ${item} `}
                                    </a>
                                )
                            })
                        }
                    </th>
                </tr>

                <tr>
                    <th>
                        Types:
                    </th>
                    <th>
                        <input
                            type="text"
                            placeholder="Problem Type"
                            style={{
                                background: color[Cookies.get("theme") as string].background,
                                color: color[Cookies.get("theme") as string].font
                            }}
                        />
                    </th>
                </tr>
                {/* Create Input to enter point, default time and memory limit */}
                <tr>
                    <th>
                        <a className="add-page-title">
                            Points and Limit :
                        </a>
                    </th>
                    <th></th>
                </tr>
                <tr>
                    <th>
                        Points:
                    </th>
                    <th>
                        <input type="text"
                            placeholder="Points"
                            style={{
                                background: color[Cookies.get("theme") as string].background,
                                color: color[Cookies.get("theme") as string].font
                            }}
                            onChange={(e) => {
                                e.preventDefault();
                                // console.log()
                                if (Number.isNaN(Number(e.target.value)))
                                    return;
                                // console.log(Number(e.target.value))
                                setpoints(Number((e.target as HTMLInputElement).value))
                            }}
                            value={points == 0 ? "" : points}
                        />
                    </th>
                </tr>
                <tr>
                    <th>
                        Time limit:
                    </th>
                    <th>
                        <input type="text"
                            placeholder="Time limit"
                            style={{
                                background: color[Cookies.get("theme") as string].background,
                                color: color[Cookies.get("theme") as string].font
                            }}
                            onChange={(e) => {
                                e.preventDefault();
                                if (Number.isNaN(Number(e.target.value)))
                                    return;
                                setTimeLimit(Number((e.target as HTMLInputElement).value))
                            }}
                            value={timeLimit == 0 ? "" : timeLimit}
                        />
                    </th>
                </tr>
                <tr>
                    <th>
                        Memory Limit:
                    </th>
                    <th>
                        <input type="text"
                            placeholder="Memory Limit"
                            style={{
                                background: color[Cookies.get("theme") as string].background,
                                color: color[Cookies.get("theme") as string].font
                            }}
                            onChange={(e) => {
                                e.preventDefault();
                                if (Number.isNaN(Number(e.target.value)))
                                    return;
                                setMemoryLimit(Number((e.target as HTMLInputElement).value))

                            }}
                            value={memoryLimit == 0 ? "" : memoryLimit}
                        />
                    </th>
                </tr>

                <tr>
                    <th style={{ display: "flex", flexDirection: "column" }}>
                        <a>
                            Allowed Languages &
                        </a>
                        <a>
                            Spceific time and memory limit:
                        </a>
                    </th>
                    <th>
                        <input list="language_list" style={{
                            background: color[Cookies.get("theme") as string].background,
                            color: color[Cookies.get("theme") as string].font
                        }}
                            placeholder="Add/Delete Allowed Language"
                            onChange={(e) => {
                                e.preventDefault();
                                const temp = allowed_language.findIndex((bruh) => bruh.id == e.target.value)
                                let temping: any[];
                                if (temp != -1) {
                                    temping = allowed_language.map((item) => {
                                        // console.log(item)
                                        if (item.id != e.target.value) {
                                            return item
                                        }
                                    })
                                    temping.splice(temping.findIndex((item) => item == undefined || item == null), 1)
                                }
                                else {
                                    temping = [
                                        ...allowed_language,
                                        {
                                            id: e.target.value,
                                            time: {
                                                data: timeLimit,
                                                isDef: true
                                            },
                                            memory: {
                                                data: memoryLimit,
                                                isDef: true
                                            },

                                        }
                                    ]
                                }

                                setallowed_language(temping)
                            }}
                            value={""}
                        />
                        <datalist id="language_list">
                            {
                                all_language.map((item, index) => {


                                    return (
                                        <option value={item}>
                                            {item}
                                        </option>
                                    )
                                })
                            }
                        </datalist>

                        <a
                            style={{
                                paddingLeft: "5px",
                                cursor: "pointer"
                            }}
                            onClick={(e) => {
                                e.preventDefault();

                                const tempingg = all_language.map((bruh: any) => {
                                    if (allowed_language.findIndex((lmao: any) => lmao.id == bruh) == -1) {
                                        return {
                                            id: bruh,
                                            time: {
                                                data: timeLimit,
                                                isDef: true
                                            },
                                            memory: {
                                                data: memoryLimit,
                                                isDef: true
                                            },

                                        }
                                    }
                                    else {
                                        return allowed_language.find((lmao) => lmao.id == bruh)
                                    }
                                })
                                setallowed_language(tempingg as [])

                            }}>
                            All language
                        </a>
                    </th>
                </tr>
                <tr>
                    <th></th>
                    <th>
                        <div>
                            {/* {allowed_language_html} */}
                            <table style={{ textAlign: "left" }}>
                                <tr style={{ minWidth: "mac-content" }}>
                                    <th>
                                        Allowed Languages
                                    </th>
                                    <th>
                                        Time Limit
                                    </th>
                                    <th>
                                        Memory Limit
                                    </th>
                                </tr>
                                {
                                    allowed_language.map((item, index) => {
                                        return (
                                            <tr>
                                                <th>
                                                    {item.id}
                                                </th>
                                                <th>
                                                    <input
                                                        type="text"
                                                        style={{
                                                            background: color[Cookies.get("theme") as string].background,
                                                            color: color[Cookies.get("theme") as string].font
                                                        }}
                                                        value={item.time.data == 0 ? "" : item.time.data}

                                                        onChange={(e) => {
                                                            e.preventDefault();

                                                            if (Number.isNaN(Number(e.target.value))) {
                                                                return;
                                                            }

                                                            const temping = allowed_language.map((bruh: { id: string, time: { data: number, isDef: boolean }, memory: { data: number, isDef: boolean } }) => {
                                                                if (bruh.id == item.id) {
                                                                    return {
                                                                        id: bruh.id,
                                                                        time: {
                                                                            data: Number(e.target.value),
                                                                            isDef: false
                                                                        },
                                                                        memory: bruh.memory
                                                                    }
                                                                }
                                                                else {
                                                                    return bruh
                                                                }
                                                            })
                                                            setallowed_language(temping)

                                                        }}
                                                    />
                                                </th>
                                                <th>
                                                    <input
                                                        type="text"
                                                        style={{
                                                            background: color[Cookies.get("theme") as string].background,
                                                            color: color[Cookies.get("theme") as string].font
                                                        }}
                                                        value={item.memory.data == 0 ? "" : item.memory.data}
                                                        onChange={(e) => {
                                                            e.preventDefault();

                                                            if (Number.isNaN(Number(e.target.value))) {
                                                                return;
                                                            }

                                                            const temping = allowed_language.map((bruh: { id: string, time: { data: number, isDef: boolean }, memory: { data: number, isDef: boolean } }) => {
                                                                if (bruh.id == item.id) {
                                                                    return {
                                                                        id: bruh.id,
                                                                        memory: {
                                                                            data: Number(e.target.value),
                                                                            isDef: false
                                                                        },
                                                                        time: bruh.time
                                                                    }
                                                                }
                                                                else {
                                                                    return bruh
                                                                }
                                                            })
                                                            setallowed_language(temping)
                                                        }}
                                                    />
                                                </th>
                                            </tr>
                                        )
                                    })
                                }
                            </table>
                        </div>
                    </th>
                </tr>

                <tr>
                    <th>
                        Source:
                    </th>
                    <th>
                        <input
                            style={{
                                background: color[Cookies.get("theme") as string].background,
                                color: color[Cookies.get("theme") as string].font
                            }}

                            type="text"
                            placeholder="Soucre"
                            onChange={(e) => {
                                // console.log(e.target.value)
                                setsoucre(e.target.value)
                            }}
                        />
                    </th>
                </tr>


            </table>

            <div>
                <span>
                    Body:
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

                <div className="editor">

                    {
                        (mode == "editor") ? (
                            <>
                                <div id="row" style={
                                    {
                                        color: color[Cookies.get("theme") as string].background
                                    }}>
                                    {lines.map((item, index) => (
                                        <div style={{ display: "flex", justifyContent: "space-around", paddingTop: "0px", paddingBottom: `${item.more * 20}px` }}>
                                            {index + 1}
                                        </div>
                                    ))}
                                </div>
                                <div
                                    className="editorr"
                                    id="editorr"
                                    contentEditable="true"
                                    ref={contentRef}
                                    // style={{
                                    //     marginTop: "5px",
                                    //     marginLeft: "1px",
                                    //     height: "350px",
                                    //     width: "1400px",
                                    //     overflowY: "auto",
                                    //     overflowX: "auto",
                                    //     flex: "1"
                                    // }}
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
                            <div
                                className="preview"
                                id="preview"
                                style={{
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
                }} onClick={(e) => {
                    setsave(true)
                }}>
                    <a id="save" onClick={(e) => {
                        setsave(true)
                    }}>
                        Save
                    </a>
                </button>
            </div>
        </div>
    )
}