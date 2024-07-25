import { geturl, getdata } from "ultility/ulti.js";
import React, { useState, useEffect } from "react";
export function Problem() {
    const url = geturl();
    // const [problem, setproblem] = useState({});
    const [infobar, setinfo] = useState(React.createElement(React.Fragment, null));
    const [body, setbody] = useState(React.createElement(React.Fragment, null));
    useEffect(() => {
        async function lmao() {
            const res = await getdata("get", "problems", url[1]);
            const problem = res.data.data[0];
            const title = document.getElementById("titlee");
            if (title) {
                title.innerHTML = problem.name;
            }
            setbody(React.createElement("div", null,
                React.createElement("div", null, problem.body.topic),
                React.createElement("div", null,
                    "Input limit:",
                    React.createElement("div", null, problem.body.inputLimit.map((item) => {
                        return (React.createElement("div", null,
                            React.createElement("a", null, `${item.key} <= ${item.value}`)));
                    }))),
                React.createElement("div", null,
                    "Sample:",
                    React.createElement("div", null, problem.body.sample.map((item) => {
                        return (React.createElement("div", null,
                            React.createElement("div", null, "Sample 1:"),
                            React.createElement("div", null, "Input:"),
                            React.createElement("div", null, item.input),
                            React.createElement("div", null, "Output:"),
                            React.createElement("div", null, item.output)));
                    }))),
                React.createElement("div", null,
                    "Sub tasks:",
                    React.createElement("div", null, problem.body.subTasks.map((item) => {
                        return (React.createElement("div", null,
                            "Subtask 1:",
                            React.createElement("div", null, item.points),
                            React.createElement("div", null, "and"),
                            React.createElement("div", null, item.limit.map((itemm) => {
                                return (React.createElement("a", null, `${itemm.key} <= ${itemm.value}`));
                            }))));
                    })))));
            setinfo(React.createElement("div", null,
                React.createElement("div", null,
                    React.createElement("div", null, "Submit"),
                    React.createElement("div", null, "Read support")),
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