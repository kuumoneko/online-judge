
import React, { useEffect, useRef, useState } from "react";
import { Group } from "type";
import { getdata, all_language } from "ulti";
import { color } from "color";
import { faPlus, faUserMinus, faUserPlus, faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import { Editor } from "editor";
import { input } from '../../../test/index';
export function Add_Problems() {

    const theme = Cookies.get("theme") as "dark" | "light";
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

    // data
    const [inputlimt, setinputlimt] = useState(0)
    const [sample, setsample] = useState(0);
    const [subtask, setsubtask] = useState(0);

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
    const [allowed_language, setallowed_language] = useState(all_language.map((item: string) => {
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
                body: document.getElementById("editorr")?.innerText,
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
                        res.data.data.map((group: Group) => {
                            return (
                                <option value={group.groupname as string} style={{
                                    background: color[theme].background,
                                    color: color[theme].font
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
                            background: color[theme].background,
                            color: color[theme].font
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
                                background: color[theme].background,
                                color: color[theme].font
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
                                background: color[theme].background,
                                color: color[theme].font
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
                                background: color[theme].background,
                                color: color[theme].font
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
                            background: color[theme].background,
                            color: color[theme].font
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
                                background: color[theme].background,
                                color: color[theme].font
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
                                background: color[theme].background,
                                color: color[theme].font
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
                                background: color[theme].background,
                                color: color[theme].font
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
                                background: color[theme].background,
                                color: color[theme].font
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
                            background: color[theme].background,
                            color: color[theme].font
                        }}
                            placeholder="Add/Delete Allowed Language"
                            onChange={(e) => {
                                e.preventDefault();
                                const temp = allowed_language.findIndex((bruh: any) => bruh.id == e.target.value)
                                let temping: any[];
                                if (temp != -1) {
                                    temping = allowed_language.map((item: any) => {
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
                                all_language.map((item: string) => {


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
                                        return allowed_language.find((lmao: any) => lmao.id == bruh)
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
                                    allowed_language.map((item: any) => {
                                        return (
                                            <tr>
                                                <th>
                                                    {item.id}
                                                </th>
                                                <th>
                                                    <input
                                                        type="text"
                                                        style={{
                                                            background: color[theme].background,
                                                            color: color[theme].font
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
                                                            background: color[theme].background,
                                                            color: color[theme].font
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
                                background: color[theme].background,
                                color: color[theme].font
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

                <Editor str={data} anything="editor" />

            </div>

            <div
                style={{
                    marginTop: "25px"
                }}
            >
                <table>
                    <tr>
                        <th
                            style={{
                                userSelect: "none",
                                cursor: "context-menu"
                            }}>
                            Input limit:
                        </th>
                        <th
                            style={{
                                display: "flex",
                                flexDirection: "row"
                            }}
                        >
                            <a
                                style={{
                                    padding: "0 0 0 0",
                                    marginLeft: "5px",
                                    userSelect: "none"
                                }}

                            >
                                {inputlimt}
                            </a>
                            <FontAwesomeIcon icon={faCaretUp} style={{ marginLeft: "10px", verticalAlign: "center" }}
                                onClick={(e) => {
                                    setinputlimt(inputlimt + 1)
                                }}
                            />
                            <FontAwesomeIcon icon={faCaretDown} style={{ marginLeft: "10px", verticalAlign: "center" }}
                                onClick={(e) => {
                                    if (inputlimt <= 0) {
                                        setinputlimt(0)
                                    }
                                    else {
                                        setinputlimt(inputlimt - 1)
                                    }
                                }}
                            />
                        </th>
                    </tr>
                    <tr>
                        <th
                            style={{
                                userSelect: "none",
                                cursor: "context-menu"
                            }}>

                        </th>
                        <th>
                            {
                                Array(inputlimt).fill(0).map((e: any, index: number) => {
                                    return (
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                justifyContent: "space-around",
                                                width: "500px",
                                                marginBottom: "15px"
                                            }}
                                        >
                                            <textarea
                                                id={`min value ${index + 1}`}
                                                onInput={(e) => {
                                                    console.log(e.currentTarget.value)
                                                    e.currentTarget.title = e.currentTarget.value
                                                }}
                                                style={{
                                                    backgroundColor: color[theme].background,
                                                    color: color[theme].font,
                                                    width: "150px"
                                                }}
                                            />
                                            <a
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center"
                                                }}
                                            >
                                                {"<="}
                                            </a>
                                            <textarea
                                                id={`key ${index + 1}`}
                                                onInput={(e) => {
                                                    console.log(e.currentTarget.value)
                                                    e.currentTarget.title = e.currentTarget.value
                                                }}
                                                style={{
                                                    backgroundColor: color[theme].background,
                                                    color: color[theme].font,
                                                    width: "150px"
                                                }}
                                            />
                                            <a style={{
                                                display: "flex",
                                                alignItems: "center"
                                            }}>
                                                {"<="}
                                            </a>
                                            <textarea
                                                id={`max value ${index + 1}`}
                                                onInput={(e) => {
                                                    console.log(e.currentTarget.value)
                                                    e.currentTarget.title = e.currentTarget.value
                                                }}
                                                style={{
                                                    backgroundColor: color[theme].background,
                                                    color: color[theme].font,
                                                    width: "150px"
                                                }}
                                            />
                                        </div>
                                    )
                                })
                            }
                        </th>

                    </tr>
                    <tr>
                        <th
                            style={{
                                userSelect: "none",
                                cursor: "context-menu"
                            }}>
                            Sample:
                        </th>
                        <th
                            style={{
                                display: "flex",
                                flexDirection: "row"
                            }}
                        >
                            <a
                                style={{
                                    padding: "0 0 0 0",
                                    marginLeft: "5px",
                                    userSelect: "none"
                                }}

                            >
                                {sample}
                            </a>
                            <FontAwesomeIcon icon={faCaretUp} style={{ marginLeft: "10px", verticalAlign: "center" }}
                                onClick={(e) => {
                                    if (sample >= 3) {
                                        setsample(3)
                                    }
                                    else {
                                        setsample(sample + 1)
                                    }
                                }}
                            />
                            <FontAwesomeIcon icon={faCaretDown} style={{ marginLeft: "10px", verticalAlign: "center" }}
                                onClick={(e) => {
                                    if (sample <= 0) {
                                        setsample(0)
                                    }
                                    else {
                                        setsample(sample - 1)
                                    }
                                }}
                            />
                        </th>
                    </tr>
                    <tr>
                        <th
                            style={{
                                userSelect: "none",
                                cursor: "context-menu"
                            }}>

                        </th>
                        <th>
                            {
                                Array(sample).fill(0).map((e: any, index: number) => {
                                    return (
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                justifyContent: "space-around",
                                                width: "500px",
                                                marginBottom: "15px"
                                            }}
                                        >
                                            <textarea
                                                id={`sample input ${index + 1}`}
                                                onInput={(e) => {
                                                    console.log(e.currentTarget.value)
                                                    e.currentTarget.title = e.currentTarget.value
                                                }}
                                                style={{
                                                    backgroundColor: color[theme].background,
                                                    color: color[theme].font
                                                }}
                                            />
                                            <textarea
                                                id={`sample output ${index + 1}`}
                                                onInput={(e) => {
                                                    console.log(e.currentTarget.value)
                                                    e.currentTarget.title = e.currentTarget.value
                                                }}
                                                style={{
                                                    backgroundColor: color[theme].background,
                                                    color: color[theme].font
                                                }}
                                            />
                                        </div>
                                    )
                                })
                            }
                        </th>

                    </tr>
                    <tr>
                        <th
                            style={{
                                userSelect: "none",
                                cursor: "context-menu"
                            }}>
                            Subtask:
                        </th>
                        <th
                            style={{
                                display: "flex",
                                flexDirection: "row"
                            }}
                        >
                            <a
                                style={{
                                    padding: "0 0 0 0",
                                    marginLeft: "5px",
                                    userSelect: "none"
                                }}

                            >
                                {subtask}
                            </a>
                            <FontAwesomeIcon icon={faCaretUp} style={{ marginLeft: "10px", verticalAlign: "center" }}
                                onClick={(e) => {
                                    if (subtask >= 4) {
                                        setsubtask(4)
                                    }
                                    else {
                                        setsubtask(subtask + 1)
                                    }
                                }}
                            />
                            <FontAwesomeIcon icon={faCaretDown} style={{ marginLeft: "10px", verticalAlign: "center" }}
                                onClick={(e) => {
                                    if (subtask <= 0) {
                                        setsubtask(0)
                                    }
                                    else {
                                        setsubtask(subtask - 1)
                                    }
                                }}
                            />
                        </th>
                    </tr>

                    <tr>
                        <th>

                        </th>
                        <th>
                            {
                                Array(subtask).fill(0).map((e: any, index: number) => {
                                    return (
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                justifyContent: "space-around",
                                                width: "500px",
                                                marginBottom: "15px"
                                            }}
                                        >
                                            <textarea
                                                id={`subtask ${index + 1}`}
                                                onInput={(e) => {
                                                    console.log(e.currentTarget.value)
                                                    e.currentTarget.title = e.currentTarget.value
                                                }}
                                                style={{
                                                    backgroundColor: color[theme].background,
                                                    color: color[theme].font
                                                }}
                                            />
                                            <textarea
                                                id={`subtask ${index + 1}`}
                                                onInput={(e) => {
                                                    console.log(e.currentTarget.value)
                                                    e.currentTarget.title = e.currentTarget.value
                                                }}
                                                style={{
                                                    backgroundColor: color[theme].background,
                                                    color: color[theme].font
                                                }}
                                            />
                                        </div>
                                    )
                                })
                            }
                        </th>

                    </tr>
                </table>

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