import { faBook, faCircleQuestion, faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getdata, geturl } from "ultility/ulti.js"
import React, { useEffect, useState } from "react"
import Cookies from "js-cookie";
import { color } from "ultility/color.js";
import { Problems, User, User_Submission } from "ultility/types.js";
import { Coding_status } from "ultility/enum.js"

function Render_Problems({ problems }: { problems: Problems[] }) {

    const [user, setuser] = useState();

    useEffect(() => {
        async function lmao() {
            const res = await getdata("get", "users", localStorage.getItem("username"));
            // console.log(res.data.data[0])

            setuser(res.data.data[0])
        }

        lmao()
    }, [])

    const [res, setres] = useState(<></>)

    useEffect(() => {
        console.log(user)
        if (user != undefined) {
            setres(
                <table
                    style={{
                        width: "100%",
                        border: "1px",
                        textAlign: "center",

                    }}>
                    <tbody>
                        <tr>
                            <th style={{
                                width: "10%"
                            }}
                            >ID</th>
                            <th style={{
                                width: "20%"
                            }}
                            >Problem</th>
                            <th style={{
                                width: "10%"
                            }}
                            >Group</th>
                            <th style={{
                                width: "10%"
                            }}
                            >Type</th>
                            <th style={{
                                width: "10%"
                            }}
                            >Point</th>
                            <th style={{
                                width: "5%"
                            }}
                            ># AC</th>
                            <th style={{
                                width: "3%"
                            }
                            }>
                                <FontAwesomeIcon icon={faBook} />
                            </th>
                        </tr>
                        {
                            problems.map((problem: Problems) => {
                                const temp = (user as User).problems.filter((sub: User_Submission) => {
                                    return sub.id == problem.id
                                });

                                // console.log(temp)

                                // console.log(temp.filter((sub) => sub.status == Coding_status.AC))

                                let coloring: string;
                                if (temp.length == 0) {
                                    coloring = "white"
                                }
                                else {
                                    coloring = temp.filter((sub) => sub.status == Coding_status.AC).length > 0 ? "green" : "yellow"
                                }
                                return (
                                    <tr>
                                        <th>
                                            {problem.id}
                                        </th>

                                        <th>
                                            <a
                                                style={{
                                                    color: coloring
                                                }}>
                                                {problem.name}
                                            </a>
                                        </th>
                                        <th>
                                            {problem.groups.join(" | ")}
                                        </th>
                                        <th>
                                            {problem.types.join(" | ")}
                                        </th>
                                        <th>
                                            {problem.points}
                                        </th>
                                        <th>
                                            {problem.SubmissionStatus.AC}
                                        </th>
                                        <th>
                                            {
                                                problem.body.support.nani ? (<FontAwesomeIcon icon={faCheck} />) : (<FontAwesomeIcon icon={faXmark} />)
                                            }
                                        </th>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table >
            )
        }

    }, [user])
    return res;
}


export function Problem() {
    const url = geturl();
    const theme: "dark" | "light" = Cookies.get("theme") as "dark" | "light";

    // console.log(url)

    // UI
    const [Problems_Element, setproblems] = useState(<></>);
    const [submit, setsubmit] = useState(false)

    // info
    const [problems_groups, set_problems_groups] = useState([]);
    const [problems_types, set_problems_types] = useState([]);

    useEffect(() => {
        async function dataa() {
            const types = await getdata("get", "problem_types", "all");
            const groups = await getdata("get", "problem_groups", "all")

            set_problems_types(types.data.data.map((value: { name: string }) => {
                return value.name;
            }))

            set_problems_groups(groups.data.data.map((value: { name: string }) => {
                return value.name;
            }))
        }

        dataa();
    }, [])

    // input
    const [search, setsearch] = useState("");
    const [group, setgroup] = useState("");
    const [type, settype] = useState("");
    const [min_point, setmin_point] = useState(0);
    const [max_point, setmax_point] = useState(2000);

    async function get_problem() {
        const res = await getdata("sort", "problems", {
            name: search == "" ? "all" : search,
            group: group == "" ? "all" : group,
            type: type == "" ? "all" : SVGUnitTypes,
            point: {
                min: min_point,
                max: max_point
            },
            lineperpage: 100,
            page: 1
        })

        console.log(res.data)

        setproblems(
            <Render_Problems problems={res.data.data} />
        )

        setsubmit(false)

    }

    useEffect(() => {
        get_problem();
    }, [])

    useEffect(() => {

        if (submit == true) {
            get_problem();
        }

    }, [submit])

    const [touch, settouch] = useState("");
    const [minX, setminX] = useState(0);
    const [maxX, setmaxX] = useState(0);

    return (
        <div
            style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between"
            }}
        >
            <div style={{
                width: "85%"
            }}>
                {Problems_Element}
            </div>
            <div className="problem_search">
                <h3>
                    Search:
                    <FontAwesomeIcon icon={faCircleQuestion} style={{ "marginLeft": "10px" }} />
                </h3>
                <form>
                    <div>
                        <input type="text" value={search} onChange={(e) => { setsearch(e.target.value) }}
                            style={{
                                backgroundColor: color[theme].background,
                                color: color[theme].font,
                                marginBottom: "5px"
                            }} />
                    </div>
                    <div>
                        <label style={{
                            width: "100%",
                            display: "block"
                        }}>
                            Types:
                        </label>
                        <select name="type" value={type} onChange={(e) => { settype(e.target.value) }} style={{
                            backgroundColor: color[theme].background,
                            color: color[theme].font,
                            marginBottom: "5px"
                        }} >
                            {
                                problems_types.map((value: string) => {
                                    return (
                                        <option value={value}>
                                            {value}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>

                    <div>
                        <label style={{
                            width: "100%",
                            display: "block"
                        }}>
                            Groups:
                        </label>
                        <select name="group" value={group} onChange={(e) => { setgroup(e.target.value) }} style={{
                            backgroundColor: color[theme].background,
                            color: color[theme].font,
                            marginBottom: "5px"
                        }} >
                            {
                                problems_groups.map((value: string) => {
                                    return (
                                        <option value={value}>
                                            {value}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div
                        style={{
                            marginBottom: "25px"
                        }}
                        onMouseMove={(e) => {
                            // console.log(e.clientX, ' ', touch)

                            var minElement = document.getElementById("min_point_search");
                            var maxELement = document.getElementById("max_point_search");


                            if (touch == "min") {
                                const delta = Number(((e.clientX - minX) / 150).toFixed(3)) * 100;
                                // var minElement = document.getElementById("min_point_search");

                                if (minElement) {
                                    if (delta > 0) {
                                        // console.log(`Min: ${delta}`)
                                        minElement.style.left = `${delta >= (Number(maxELement?.style.left.split("%")[0])) ? (Number(maxELement?.style.left.split("%")[0]) - 1) : delta}%`;
                                    }
                                    else if (delta <= 0) {
                                        // console.log(`Min: ${0}`);
                                        minElement.style.left = `0%`;
                                    }

                                    setmin_point(Math.floor(Number(minElement.style.left.split("%")[0]) / 100 * 2000))
                                }
                            }
                            else if (touch == "max") {
                                const delta = Number(((maxX - e.clientX) / 150).toFixed(3)) * 100;

                                if (maxELement) {
                                    if (delta > 0) {
                                        // console.log(`Max: ${delta}`)
                                        const temp = 100 - delta;
                                        maxELement.style.left = `${temp <= (Number(minElement?.style.left.split("%")[0])) ? (Number(minElement?.style.left.split("%")[0]) + 1) : temp}%`;
                                    }
                                    else if (delta <= 0) {
                                        // console.log(`Max: ${0}`);
                                        maxELement.style.left = `100%`;
                                    }
                                    setmax_point(Math.floor(Number(maxELement.style.left.split("%")[0]) / 100 * 2000))

                                }


                            }
                        }}
                        onMouseUp={(e) => {
                            settouch("")
                        }}

                        onMouseLeave={(e) => {
                            settouch("")
                        }}
                    >
                        <label style={{
                            width: "100%",
                            display: "block"
                        }}>
                            Points:
                        </label>

                        <div
                            style={{
                                display: "flex",
                                position: "relative",
                                width: "145px"
                            }}
                        >
                            <div
                                className="point_search_range"
                                style={{
                                }}

                            >

                            </div>
                            <div className="min point_search" id="min_point_search"
                                onMouseDown={(e) => {
                                    // console.log(e.clientX)
                                    if (minX == 0) {
                                        setminX(e.clientX);
                                    }
                                    const mindiv = document.getElementById("min_point_search")
                                    const maxdiv = document.getElementById("max_point_search");
                                    // console.log(mindiv?.style.left, ' ', maxdiv?.style.left)
                                    if (mindiv?.style.left == maxdiv?.style.left) {
                                        settouch("max")
                                    }
                                    else {
                                        settouch("min")
                                    }
                                    // setMinTouch(true)
                                }}
                            >

                            </div>


                            <div className="max point_search" id="max_point_search"
                                onMouseDown={(e) => {
                                    // console.log(e.clientX)
                                    if (maxX == 0) {
                                        setmaxX(e.clientX);
                                    }

                                    const mindiv = document.getElementById("min_point_search")
                                    const maxdiv = document.getElementById("max_point_search");
                                    // console.log(mindiv?.style.left, ' ', maxdiv?.style.left)
                                    if (mindiv?.style.left == maxdiv?.style.left) {
                                        settouch("min")
                                    }
                                    else {
                                        settouch("max")
                                    }

                                }}
                            >

                            </div>
                        </div>

                    </div>

                    <div>
                        <label style={{
                            width: "100%",
                            display: "block"
                        }}>
                            Min:
                            <a>
                                {min_point}
                            </a>
                        </label>
                        <label style={{
                            width: "100%",
                            display: "block"
                        }}>
                            Max:
                            <a>
                                {max_point}
                            </a>
                        </label>
                    </div>

                    <div>
                        <div onClick={() => {
                            setsubmit(true)
                        }}>
                            <a>
                                GO
                            </a>
                        </div>
                    </div>
                </form>
            </div >
        </div >
    )
}