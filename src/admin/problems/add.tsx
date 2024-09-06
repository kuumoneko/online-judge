
import React, { useEffect, useState } from "react";
import { Group, ProblemsGroup, ProblemsType } from "type";
import { getdata, all_language } from "ulti";
import { color } from "color";
import { faPlus, faUserMinus, faUserPlus, faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import { Editor } from "editor";
export function Add_Problems() {

    const theme = Cookies.get("theme") as "dark" | "light";
    // general
    const [name, setname] = useState("");
    const [Title, settitle] = useState("");
    const [isPrivate, setPrivate] = useState(false);
    const [isPublished, setPublished] = useState(false)
    const [groups, setgroups] = useState([""]);
    const [problem_types, setproblem_types] = useState([""]);
    const [problem_groups, setproblem_groups] = useState([""]);
    const [support, setsupport] = useState(false)

    // host
    const [search, setsearch] = useState("")
    const [users, setusers] = useState([])
    const [host, sethost] = useState([""])

    // data
    const [inputlimt, setinputlimt] = useState(0)
    const [sample, setsample] = useState(0);
    const [subtask, setsubtask] = useState(0);
    const [explanation, setexplanation] = useState(0);

    useEffect(() => {
        async function lmao() {
            if (search == "") {
                return setusers([])
            }
            const res = await getdata("sort", "users", { mode: "username", search: search, reverse: true, page: 1, lineperpage: 5 })

            if (res == undefined) {
                return setusers([])
            }

            setusers((res.data == undefined) ? [res] : res.data.data.map((item: any) => { return item }))

            // setsearch("")
        }
        lmao();
    }, [search])

    // source
    const [soucre, setsoucre] = useState("")

    //body
    const [data, setdata] = useState("");

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

    const [publish, setpublish] = useState("")

    const [save, setsave] = useState(false)
    useEffect(() => {
        async function lmao() {
            const input_limits = Array.from((document.getElementById("input limit") as HTMLElement).childNodes)
            const sample_limits = Array.from((document.getElementById("sample input") as HTMLElement).childNodes)
            const subtasks_limits = Array.from((document.getElementById("subtask") as HTMLElement).childNodes)
            const explanations = Array.from((document.getElementById("explanation") as HTMLElement).childNodes)

            const input_limit =
                (input_limits.length > 0)
                    ?
                    input_limits
                        .map((input_limit_div) => {
                            return Array.from(input_limit_div.childNodes)
                        })
                        // return a list of {minvalue, key, max value}
                        .map((input_limit_div) => {
                            return {
                                min: Number((input_limit_div.filter((e) => {
                                    return (e as HTMLElement).id.includes("min value")
                                })[0] as HTMLInputElement)?.title) || undefined,
                                key: Number((input_limit_div.filter((e) => {
                                    return (e as HTMLElement).id.includes("key")
                                })[0] as HTMLInputElement).title),
                                max: Number((input_limit_div.filter((e) => {
                                    return (e as HTMLElement).id.includes("max value")
                                })[0] as HTMLInputElement).title),
                            }
                        })
                    : undefined;

            const sample_limit =
                (input_limits.length > 0)
                    ?
                    sample_limits
                        .map((sample_limit_div) => {
                            return Array.from(sample_limit_div.childNodes)
                        })
                        // return a list of {input, output}
                        .map((sample_limit_div) => {
                            return {
                                input: (sample_limit_div.filter((e) => {
                                    return (e as HTMLElement).id.includes("sample input ")
                                })[0] as HTMLInputElement).title,
                                output: (sample_limit_div.filter((e) => {
                                    return (e as HTMLElement).id.includes("sample output ")
                                })[0] as HTMLInputElement).title,
                            }
                        })
                    : undefined;

            const subtask =
                (subtasks_limits.length > 0)
                    ?
                    subtasks_limits
                        .map((subtask_div) => {
                            return Array.from(subtask_div.childNodes)
                        })
                        .map((subtask_div) => {
                            return {
                                percent: Number((subtask_div.filter((e) => {
                                    return (e as HTMLElement).id.includes("input") == false
                                })[0] as HTMLInputElement).title),
                                // get all div that has input limit per subtask
                                limit: Array
                                    .from(
                                        subtask_div
                                            .filter((e) => {
                                                return (e as HTMLElement).id.includes("input")
                                            })
                                        [0]
                                            .childNodes
                                    )
                                    .map((input_limit_div) => {
                                        return Array.from(input_limit_div.childNodes)
                                    })
                                    // return a list of {min value , key , max value}
                                    .map((input_limit_div) => {
                                        return {
                                            min: Number((input_limit_div.filter((e) => {
                                                return (e as HTMLElement).id.includes("min value")
                                            })[0] as HTMLInputElement)?.title) || undefined,
                                            key: Number((input_limit_div.filter((e) => {
                                                return (e as HTMLElement).id.includes("key")
                                            })[0] as HTMLInputElement).value),
                                            max: Number((input_limit_div.filter((e) => {
                                                return (e as HTMLElement).id.includes("max value")
                                            })[0] as HTMLInputElement).title),
                                        }
                                    })
                                ,
                            }
                        })
                    : undefined


            const explanationn =
                (explanations.length > 0)
                    ?
                    explanations
                        .map((explanation_div) => {
                            return Array.from(explanation_div.childNodes)
                        })
                        .map((explanation_div) => {
                            return (explanation_div[0] as HTMLElement).title
                        })
                    : undefined

            setsave(false)

            console.log(input_limit)
            console.log(sample_limit)
            console.log(subtask)
            console.log(explanationn);



            const temping = {
                id: name,
                name: Title,
                host: host.slice(1),
                publishTime: new Date(publish).getTime(),

                SubmissionStatus: {
                    AC: 0,
                    WA: 0,
                    RTE: 0,
                    IR: 0,
                    OLE: 0,
                    MLE: 0,
                    TLE: 0,
                    IE: 0
                },
                isPublished: {
                    nani: isPublished,
                    error: ""
                },
                folder: "",
                private: {
                    nani: isPrivate,
                    groups: groups.slice(1)
                },
                groups: problem_groups.slice(1),
                types: problem_types.slice(1),
                points: points,
                def_limit: {
                    time: timeLimit,
                    memory: memoryLimit
                },
                specificLanguage: allowed_language.reduce((acc: any, value: any) => {
                    acc[value.id] = {
                        time: value.time.data,
                        memory: value.memory.data
                    }

                    return acc
                }, {}),
                languages: allowed_language.map((item) => item.id),
                body: {
                    topic: document.getElementById("editorr")?.title || "",
                    sample: sample_limit,
                    inputLimit: input_limit,
                    subTasks: subtask,
                    explanation: explanationn,
                    support: {
                        nani: support,
                        body: support ? document.getElementById("support_editor")?.title : ""
                    }
                }
            }
            // console.log(host.slice(1, host.length))
            console.log(temping)

            const res = await getdata("post", "problems", temping)
            console.log(res)

            if (res.status == 200) {
                window.location.href = "/admin/problems"
            }
            return;
        }
        if (save == true)
            lmao();
    }, [save])

    const [subtask_UI, setsubtask_UI] = useState(<></>)
    function checking() {
        setsubtask_UI(
            <>
                {
                    Array(subtask).fill(0).map((e: any, index: number) => {
                        return (
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    // justifyContent: "space-around",
                                    width: "500px",
                                    marginBottom: "15px"
                                }}
                            >
                                <input
                                    id={`subtask ${index + 1}`}
                                    onInput={(e) => {
                                        // console.log(e.currentTarget.value)
                                        e.currentTarget.title = e.currentTarget.value
                                    }}
                                    style={{
                                        backgroundColor: color[theme].background,
                                        color: color[theme].font,
                                        maxHeight: "20px",
                                        maxWidth: "35px",
                                        paddingLeft: "5px"
                                    }}
                                />
                                <a>
                                    %:
                                </a>
                                <div
                                    id={`subtask input ${index + 1}`}
                                >

                                    {
                                        Array.from((document.getElementById("input limit") as HTMLElement).childNodes).map((input_limit) => {
                                            return (
                                                <div
                                                    style={{
                                                        marginLeft: "5px",
                                                        marginBottom: "10px",
                                                        display: "flex"
                                                    }}
                                                >
                                                    {
                                                        Array.from(input_limit.childNodes).filter((child) => (child as HTMLHtmlElement).localName == "input").map((childd) => {
                                                            const id = (childd as HTMLElement).id;
                                                            if (id.includes("min value") && (childd as HTMLInputElement).title != "") {
                                                                return (
                                                                    <>
                                                                        <input
                                                                            type="text"
                                                                            id={`subtask ${index + 1} min value ${id.split("min value ")[1]}`}
                                                                            style={{
                                                                                backgroundColor: color[theme].background,
                                                                                color: color[theme].font,
                                                                                maxHeight: "20px",
                                                                            }}
                                                                            onChange={(e) => {
                                                                                e.currentTarget.title = e.currentTarget.value;
                                                                                if (Number(e.currentTarget.value) < Number((childd as HTMLInputElement).title)) {
                                                                                    // alert(`The max value of subtask ${index + 1}`)
                                                                                    e.currentTarget.value = (childd as HTMLInputElement).title
                                                                                }
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

                                                                    </>
                                                                )
                                                            }

                                                            if (id.includes("max value")) {
                                                                return (
                                                                    <>

                                                                        <a
                                                                            style={{
                                                                                display: "flex",
                                                                                alignItems: "center"
                                                                            }}
                                                                        >
                                                                            {"<="}
                                                                        </a>

                                                                        <input
                                                                            type="text"
                                                                            id={`subtask ${index + 1} max value ${id.split("max value ")[1]}`}
                                                                            style={{
                                                                                backgroundColor: color[theme].background,
                                                                                color: color[theme].font,
                                                                                maxHeight: "20px",
                                                                            }}
                                                                            onInput={(e) => {
                                                                                e.currentTarget.title = e.currentTarget.value;
                                                                                if (Number(e.currentTarget.value) > Number((childd as HTMLInputElement).title)) {
                                                                                    // alert(`The max value of subtask ${index + 1}`)
                                                                                    e.currentTarget.value = (childd as HTMLInputElement).title
                                                                                }
                                                                            }}
                                                                        />
                                                                    </>
                                                                )
                                                            }

                                                            if (id.includes("key")) {
                                                                return (
                                                                    <input
                                                                        type="text"
                                                                        id={`subtask ${index + 1} key ${id.split("key ")[1]}`}
                                                                        disabled={true}
                                                                        value={(childd as HTMLInputElement).title}
                                                                        style={{
                                                                            backgroundColor: color[theme].background,
                                                                            color: color[theme].font,
                                                                            maxHeight: "20px",
                                                                            maxWidth: `${(childd as HTMLInputElement).title.length * 5 + 35}px`
                                                                        }}
                                                                        onChange={(e) => {
                                                                            e.currentTarget.title = e.currentTarget.value;
                                                                        }}
                                                                    />
                                                                )
                                                            }

                                                        })
                                                    }
                                                </div>
                                            )
                                        })

                                    }

                                </div>
                            </div>
                        )
                    })
                }
            </>
        )
    }

    useEffect(() => {
        checking();
    })

    const [allGroups, setAllGroups] = useState([])
    const [GroupOptions, setGroupsOptions] = useState(<></>)

    const [allProblem_Types, setallProblem_Types] = useState([])
    const [Problem_TypeOptions, setProblem_TypesOptions] = useState(<></>)

    const [allProblem_Groups, setallProblem_Groups] = useState([])
    const [Problem_GroupOptions, setProblem_GroupsOptions] = useState(<></>)

    useEffect(() => {

        async function getgroup() {
            const res = await getdata("get", "groups", "all");
            // console.log(res.data)
            setAllGroups(res.data.data)
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

        async function gettype() {
            const res = await getdata("get", "problem_types", "all");
            // console.log(res.data)
            setallProblem_Types(res.data.data)
            const temping = (
                <>
                    {
                        res.data.data.map((group: ProblemsType) => {
                            return (
                                <option value={group.name as string} style={{
                                    background: color[theme].background,
                                    color: color[theme].font
                                }}>
                                    {group.name}
                                </option>
                            )
                        })
                    }
                </>
            )

            setProblem_TypesOptions(temping)
        }

        async function get_problem_group() {
            const res = await getdata("get", "problem_groups", "all");
            // console.log(res.data)
            setallProblem_Groups(res.data.data)
            const temping = (
                <>
                    {
                        res.data.data.map((group: ProblemsGroup) => {
                            return (
                                <option value={group.name as string} style={{
                                    background: color[theme].background,
                                    color: color[theme].font
                                }}>
                                    {group.name}
                                </option>
                            )
                        })
                    }
                </>
            )

            setProblem_GroupsOptions(temping)
        }

        async function lmao() {
            await getgroup();
            await get_problem_group();
            await gettype();
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
                        ID:
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
                            value={search}
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
                                                    setsearch("")
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
                                const temp = ((e.target as HTMLElement).id == "yes") ? true : false
                                setPrivate(temp);
                                if (temp == false) {
                                    setgroups([])
                                }

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
                            if (!isPrivate) {
                                return;
                            }
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
                        Problem types:
                    </th>
                    <th style={{ display: "flex" }}>
                        <input list="problem types list" style={{
                            background: color[theme].background,
                            color: color[theme].font
                        }}
                            placeholder="Add/Delete Problem types"
                            onChange={(e) => {
                                e.preventDefault();
                                const value = (e.target as HTMLInputElement).value
                                // console.log()

                                const temp: string[] = [...groups];

                                if (temp.find((item) => item == value) == undefined && allProblem_Types.find((item: ProblemsType) => item.name == value)) {
                                    temp.push(value)
                                }
                                else if (temp.find((item) => item == value)) {
                                    temp.splice(temp.findIndex((item) => item == value), 1)
                                }

                                setproblem_types(temp)
                            }
                            }
                            value={""}
                        />
                        <datalist
                            id="problem types list"
                        >
                            {Problem_TypeOptions}
                        </datalist>
                        <FontAwesomeIcon icon={faPlus} style={{ paddingLeft: "5px" }} onClick={(e) => {
                            e.preventDefault();
                            window.open("/admin/problems/types/add", "test", 'width=1337, height=614, left=24, top=24, scrollbars, resizable')
                        }} />
                    </th>
                    <th>
                        {
                            problem_types.map((item: string) => {
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
                        Problem groups:
                    </th>
                    <th style={{ display: "flex" }}>
                        <input list="problem group list" style={{
                            background: color[theme].background,
                            color: color[theme].font
                        }}
                            placeholder="Add/Delete Problem groups"
                            onChange={(e) => {
                                e.preventDefault();
                                const value = (e.target as HTMLInputElement).value
                                // console.log()

                                const temp: string[] = [...groups];

                                if (temp.find((item) => item == value) == undefined && allProblem_Groups.find((item: ProblemsGroup) => item.name == value)) {
                                    temp.push(value)
                                }
                                else if (temp.find((item) => item == value)) {
                                    temp.splice(temp.findIndex((item) => item == value), 1)
                                }

                                setproblem_groups(temp)
                            }
                            }
                            value={""}
                        />
                        <datalist
                            id="problem group list"
                        >
                            {Problem_GroupOptions}
                        </datalist>
                        <FontAwesomeIcon icon={faPlus} style={{ paddingLeft: "5px" }} onClick={(e) => {
                            e.preventDefault();
                            window.open("/admin/problems/groups/add", "test", 'width=1337, height=614, left=24, top=24, scrollbars, resizable')
                        }} />
                    </th>
                    <th>
                        {
                            problem_groups.map((item: string) => {
                                return (
                                    <a>
                                        {` ${item} `}
                                    </a>
                                )
                            })
                        }
                    </th>
                </tr>

                {/* <tr>
                    <th>
                        Problem Types:
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

                <tr>
                    <th>
                        Problem Groups:
                    </th>
                    <th>
                        <input
                            type="text"
                            placeholder="Problem Group"
                            style={{
                                background: color[theme].background,
                                color: color[theme].font
                            }}
                        />
                    </th>
                </tr> */}

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
                <a className="add-page-title">
                    Body:
                </a>
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
                        <th
                            id="input limit"
                        >
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
                                            <input
                                                id={`min value ${index + 1}`}
                                                onChange={(e) => {
                                                    e.preventDefault();
                                                    // console.log(e.currentTarget.value)
                                                    e.currentTarget.title = e.currentTarget.value
                                                    checking();
                                                }}
                                                style={{
                                                    backgroundColor: color[theme].background,
                                                    color: color[theme].font,
                                                    width: "150px",
                                                    paddingLeft: "5px"
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
                                            <input
                                                id={`key ${index + 1}`}
                                                onChange={(e) => {
                                                    e.preventDefault();
                                                    // console.log(e.currentTarget.value)
                                                    e.currentTarget.title = e.currentTarget.value
                                                    checking();
                                                }}
                                                style={{
                                                    backgroundColor: color[theme].background,
                                                    color: color[theme].font,
                                                    width: "150px",
                                                    paddingLeft: "5px"
                                                }}
                                            />
                                            <a style={{
                                                display: "flex",
                                                alignItems: "center"
                                            }}>
                                                {"<="}
                                            </a>
                                            <input
                                                id={`max value ${index + 1}`}
                                                onChange={(e) => {
                                                    e.preventDefault();
                                                    // console.log(e.currentTarget.value)
                                                    e.currentTarget.title = e.currentTarget.value
                                                    checking();
                                                }}
                                                style={{
                                                    backgroundColor: color[theme].background,
                                                    color: color[theme].font,
                                                    width: "150px",
                                                    paddingLeft: "5px"
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
                        <th
                            id="sample input"
                        >
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
                                                    // console.log(e.currentTarget.value)
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
                                                    // console.log(e.currentTarget.value)
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
                        <th
                            id="subtask"
                        >
                            {
                                subtask_UI
                            }
                        </th>

                    </tr>

                    <tr>
                        <th
                            style={{
                                userSelect: "none",
                                cursor: "context-menu"
                            }}>
                            Explanation:
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
                                {explanation}
                            </a>
                            <FontAwesomeIcon icon={faCaretUp} style={{ marginLeft: "10px", verticalAlign: "center" }}
                                onClick={(e) => {
                                    setexplanation(explanation + 1)
                                }}
                            />
                            <FontAwesomeIcon icon={faCaretDown} style={{ marginLeft: "10px", verticalAlign: "center" }}
                                onClick={(e) => {
                                    if (explanation <= 0) {
                                        setexplanation(0)
                                    }
                                    else {
                                        setexplanation(explanation - 1)
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
                        <th
                            id="explanation"
                        >
                            {
                                Array(explanation).fill(0).map((e: any, index: number) => {
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
                                                id={`explanation ${index + 1}`}
                                                onChange={(e) => {
                                                    e.preventDefault();
                                                    // console.log(e.currentTarget.value)
                                                    e.currentTarget.title = e.currentTarget.value
                                                    checking();
                                                }}
                                                style={{
                                                    backgroundColor: color[theme].background,
                                                    color: color[theme].font,
                                                    width: "150px",
                                                    paddingLeft: "5px"
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


            <div>
                <a>
                    Support:
                </a>
                <input type="checkbox" style={{ marginLeft: "5px" }} checked={support} onChange={(e) => {
                    setsupport(!support)
                }} />


                {
                    support && (
                        <div>
                            <Editor str="" anything="editor" editor_id="support_editor" />
                        </div>
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