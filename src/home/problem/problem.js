import { geturl, getdata } from "ultility/ulti.js";
import { Luythua } from "../../math/luythua.js";
import React, { useState, useEffect } from "react";
import { Coding_status } from "ultility/enum.js";
export function Problem() {
    const url = geturl();
    // const [problem, setproblem] = useState({});
    const [infobar, setinfo] = useState(React.createElement(React.Fragment, null));
    const [body, setbody] = useState(React.createElement(React.Fragment, null));
    useEffect(() => {
        async function lmao() {
            let res = await getdata("get", "problems", url[1]);
            const problem = res.data.data[0];
            res = await getdata("get", "users", localStorage.getItem("username"));
            const user = res.data.data[0];
            // console.log(user.problems.filter((prblm) => {
            //     return prblm.id == problem.id
            // }).filter((prblm) => {
            //     return prblm.status == Coding_status.AC
            // }).length > 0)
            setbody(React.createElement("div", { className: "problem-body" },
                React.createElement("div", null, problem.body.topic),
                React.createElement("br", null),
                React.createElement("h2", null, "Input Limit:"),
                React.createElement("div", null,
                    React.createElement("ul", null, problem.body.inputLimit.map((item) => {
                        return (React.createElement("li", { style: {
                                position: "relative"
                            } },
                            React.createElement("a", { style: {
                                    padding: "0 0 0 0"
                                } }, `- ${item.key} <=`),
                            React.createElement(Luythua, { a: item.value })));
                    }))),
                React.createElement("br", null),
                React.createElement("h2", null, "Sample:"),
                React.createElement("div", null, problem.body.sample.map((item, index) => {
                    return (React.createElement("div", null,
                        React.createElement("h3", null, `Sample ${index + 1}:`),
                        React.createElement("h4", null, "Input:"),
                        React.createElement("br", null),
                        React.createElement("pre", null,
                            React.createElement("code", null, item.input)),
                        React.createElement("h4", null, "Output:"),
                        React.createElement("br", null),
                        React.createElement("pre", null,
                            React.createElement("code", null, item.output))));
                })),
                React.createElement("br", null),
                React.createElement("h2", null, "Sub tasks:"),
                React.createElement("div", null,
                    React.createElement("ul", null, problem.body.subTasks.map((item, index) => {
                        return (React.createElement("li", null,
                            React.createElement("a", { style: {
                                    padding: "0 5px 0 0"
                                } }, `- Subtask ${index + 1}: ${item.points}%, and `),
                            item.limit.map((item) => {
                                return (React.createElement(React.Fragment, null,
                                    React.createElement("a", { style: {
                                            padding: "0 0 0 0"
                                        } }, ` ${item.key} <=`),
                                    React.createElement(Luythua, { a: item.value }),
                                    React.createElement("a", { style: {
                                            padding: "0 0 0 0"
                                        } }, "; ")));
                            })));
                    })))));
            // console.log("lmao")
            setinfo(React.createElement("div", null,
                React.createElement("div", null,
                    React.createElement("div", { className: "problem-submit" }, "Submit"),
                    React.createElement("br", null),
                    (user.problems.filter((prblm) => {
                        return prblm.id == problem.id;
                    }).filter((prblm) => {
                        return prblm.status == Coding_status.AC;
                    }).length > 0) && (React.createElement("div", null,
                        React.createElement("a", { href: `/problem/${url[1]}/submissions/${user.username}` }, "My submissions"))),
                    React.createElement("div", null,
                        React.createElement("a", { href: `/problem/${url[1]}/submissions` }, "All submissions")),
                    React.createElement("div", null,
                        React.createElement("a", { href: `/problem/${url[1]}/support` }, "Read support"))),
                React.createElement("br", null),
                React.createElement("div", null,
                    React.createElement("label", null,
                        "Points:",
                        React.createElement("a", null, problem.points || 0)),
                    React.createElement("label", null,
                        "Time limit:",
                        React.createElement("a", null, problem.def_limit.time || 0)),
                    React.createElement("label", null,
                        "Memory limit:",
                        React.createElement("a", null, problem.def_limit.memory || 0))),
                React.createElement("div", null,
                    React.createElement("label", null,
                        "Author:",
                        React.createElement("a", null, problem.host.join(" , "))))));
        }
        lmao();
    }, []);
    return (React.createElement("div", { style: {
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
        } },
        body,
        infobar));
}
//# sourceMappingURL=problem.js.map