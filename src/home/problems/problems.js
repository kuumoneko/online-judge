import { faBook, faCircleQuestion, faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getdata, geturl } from "ultility/ulti.js";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { color } from "ultility/color.js";
import { Coding_status } from "ultility/enum.js";
function Render_Problems({ problems }) {
    const [user, setuser] = useState();
    useEffect(() => {
        async function lmao() {
            const res = await getdata("get", "users", localStorage.getItem("username"));
            // console.log(res.data.data[0])
            setuser(res.data.data[0]);
        }
        lmao();
    }, []);
    const [res, setres] = useState(React.createElement(React.Fragment, null));
    useEffect(() => {
        console.log(user);
        if (user != undefined) {
            setres(React.createElement("table", { style: {
                    width: "100%",
                    border: "1px",
                    textAlign: "center",
                } },
                React.createElement("tbody", null,
                    React.createElement("tr", null,
                        React.createElement("th", { style: {
                                width: "10%"
                            } }, "ID"),
                        React.createElement("th", { style: {
                                width: "20%"
                            } }, "Problem"),
                        React.createElement("th", { style: {
                                width: "10%"
                            } }, "Group"),
                        React.createElement("th", { style: {
                                width: "10%"
                            } }, "Type"),
                        React.createElement("th", { style: {
                                width: "10%"
                            } }, "Point"),
                        React.createElement("th", { style: {
                                width: "5%"
                            } }, "# AC"),
                        React.createElement("th", { style: {
                                width: "3%"
                            } },
                            React.createElement(FontAwesomeIcon, { icon: faBook }))),
                    problems.map((problem) => {
                        const temp = user.problems.filter((sub) => {
                            return sub.id == problem.id;
                        });
                        // console.log(temp)
                        // console.log(temp.filter((sub) => sub.status == Coding_status.AC))
                        let coloring;
                        if (temp.length == 0) {
                            coloring = "white";
                        }
                        else {
                            coloring = temp.filter((sub) => sub.status == Coding_status.AC).length > 0 ? "green" : "yellow";
                        }
                        return (React.createElement("tr", null,
                            React.createElement("th", null, problem.id),
                            React.createElement("th", null,
                                React.createElement("a", { style: {
                                        color: coloring
                                    } }, problem.name)),
                            React.createElement("th", null, problem.groups.join(" | ")),
                            React.createElement("th", null, problem.types.join(" | ")),
                            React.createElement("th", null, problem.points),
                            React.createElement("th", null, problem.SubmissionStatus.AC),
                            React.createElement("th", null, problem.body.support.nani ? (React.createElement(FontAwesomeIcon, { icon: faCheck })) : (React.createElement(FontAwesomeIcon, { icon: faXmark })))));
                    }))));
        }
    }, [user]);
    return res;
}
export function Problem() {
    const url = geturl();
    const theme = Cookies.get("theme");
    // console.log(url)
    // UI
    const [Problems_Element, setproblems] = useState(React.createElement(React.Fragment, null));
    const [submit, setsubmit] = useState(false);
    // info
    const [problems_groups, set_problems_groups] = useState([]);
    const [problems_types, set_problems_types] = useState([]);
    useEffect(() => {
        async function dataa() {
            const types = await getdata("get", "problem_types", "all");
            const groups = await getdata("get", "problem_groups", "all");
            set_problems_types(types.data.data.map((value) => {
                return value.name;
            }));
            set_problems_groups(groups.data.data.map((value) => {
                return value.name;
            }));
        }
        dataa();
    }, []);
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
        });
        console.log(res.data);
        setproblems(React.createElement(Render_Problems, { problems: res.data.data }));
        setsubmit(false);
    }
    useEffect(() => {
        get_problem();
    }, []);
    useEffect(() => {
        if (submit == true) {
            get_problem();
        }
    }, [submit]);
    const [touch, settouch] = useState("");
    const [minX, setminX] = useState(0);
    const [maxX, setmaxX] = useState(0);
    return (React.createElement("div", { style: {
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
        } },
        React.createElement("div", { style: {
                width: "85%"
            } }, Problems_Element),
        React.createElement("div", { className: "problem_search" },
            React.createElement("h3", null,
                "Search:",
                React.createElement(FontAwesomeIcon, { icon: faCircleQuestion, style: { "marginLeft": "10px" } })),
            React.createElement("form", null,
                React.createElement("div", null,
                    React.createElement("input", { type: "text", value: search, onChange: (e) => { setsearch(e.target.value); }, style: {
                            backgroundColor: color[theme].background,
                            color: color[theme].font,
                            marginBottom: "5px"
                        } })),
                React.createElement("div", null,
                    React.createElement("label", { style: {
                            width: "100%",
                            display: "block"
                        } }, "Types:"),
                    React.createElement("select", { name: "type", value: type, onChange: (e) => { settype(e.target.value); }, style: {
                            backgroundColor: color[theme].background,
                            color: color[theme].font,
                            marginBottom: "5px"
                        } }, problems_types.map((value) => {
                        return (React.createElement("option", { value: value }, value));
                    }))),
                React.createElement("div", null,
                    React.createElement("label", { style: {
                            width: "100%",
                            display: "block"
                        } }, "Groups:"),
                    React.createElement("select", { name: "group", value: group, onChange: (e) => { setgroup(e.target.value); }, style: {
                            backgroundColor: color[theme].background,
                            color: color[theme].font,
                            marginBottom: "5px"
                        } }, problems_groups.map((value) => {
                        return (React.createElement("option", { value: value }, value));
                    }))),
                React.createElement("div", { style: {
                        marginBottom: "25px"
                    }, onMouseMove: (e) => {
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
                                setmin_point(Math.floor(Number(minElement.style.left.split("%")[0]) / 100 * 2000));
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
                                setmax_point(Math.floor(Number(maxELement.style.left.split("%")[0]) / 100 * 2000));
                            }
                        }
                    }, onMouseUp: (e) => {
                        settouch("");
                    }, onMouseLeave: (e) => {
                        settouch("");
                    } },
                    React.createElement("label", { style: {
                            width: "100%",
                            display: "block"
                        } }, "Points:"),
                    React.createElement("div", { style: {
                            display: "flex",
                            position: "relative",
                            width: "145px"
                        } },
                        React.createElement("div", { className: "point_search_range", style: {} }),
                        React.createElement("div", { className: "min point_search", id: "min_point_search", onMouseDown: (e) => {
                                // console.log(e.clientX)
                                if (minX == 0) {
                                    setminX(e.clientX);
                                }
                                const mindiv = document.getElementById("min_point_search");
                                const maxdiv = document.getElementById("max_point_search");
                                // console.log(mindiv?.style.left, ' ', maxdiv?.style.left)
                                if (mindiv?.style.left == maxdiv?.style.left) {
                                    settouch("max");
                                }
                                else {
                                    settouch("min");
                                }
                                // setMinTouch(true)
                            } }),
                        React.createElement("div", { className: "max point_search", id: "max_point_search", onMouseDown: (e) => {
                                // console.log(e.clientX)
                                if (maxX == 0) {
                                    setmaxX(e.clientX);
                                }
                                const mindiv = document.getElementById("min_point_search");
                                const maxdiv = document.getElementById("max_point_search");
                                // console.log(mindiv?.style.left, ' ', maxdiv?.style.left)
                                if (mindiv?.style.left == maxdiv?.style.left) {
                                    settouch("min");
                                }
                                else {
                                    settouch("max");
                                }
                            } }))),
                React.createElement("div", null,
                    React.createElement("label", { style: {
                            width: "100%",
                            display: "block"
                        } },
                        "Min:",
                        React.createElement("a", null, min_point)),
                    React.createElement("label", { style: {
                            width: "100%",
                            display: "block"
                        } },
                        "Max:",
                        React.createElement("a", null, max_point))),
                React.createElement("div", null,
                    React.createElement("div", { onClick: () => {
                            setsubmit(true);
                        } },
                        React.createElement("a", null, "GO")))))));
}
//# sourceMappingURL=problems.js.map