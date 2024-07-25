import { geturl, getdata } from "ultility/ulti.js"
import { Problems } from "ultility/types.js"
import React, { useState, useEffect } from "react"
export function Problem() {
    const url = geturl()

    // const [problem, setproblem] = useState({});

    const [infobar, setinfo] = useState(<></>)
    const [body, setbody] = useState(<></>)
    useEffect(() => {
        async function lmao() {
            const res = await getdata("get", "problems", url[1])
            const problem: Problems = res.data.data[0]

            const title = document.getElementById("titlee");
            if (title) {
                title.innerHTML = problem.name
            }

            setbody(
                <div>
                    <div>
                        {problem.body.topic}
                    </div>
                    <div>
                        Input limit:

                        <div>

                            {
                                problem.body.inputLimit.map((item) => {
                                    return (
                                        <div>
                                            <a>
                                                {
                                                    `${item.key} <= ${item.value}`
                                                }
                                            </a>
                                        </div>
                                    )
                                })
                            }
                        </div>

                    </div>
                    <div>
                        Sample:
                        <div>
                            {
                                problem.body.sample.map((item) => {
                                    return (
                                        <div>
                                            <div>
                                                Sample 1:
                                            </div>
                                            <div>
                                                Input:
                                            </div>
                                            <div>
                                                {
                                                    item.input
                                                }
                                            </div>
                                            <div>
                                                Output:
                                            </div>
                                            <div>
                                                {
                                                    item.output
                                                }
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div>
                        Sub tasks:
                        <div>
                            {
                                problem.body.subTasks.map((item) => {
                                    return (
                                        <div>
                                            Subtask 1:
                                            <div>
                                                {item.points}
                                            </div>
                                            <div>
                                                and
                                            </div>
                                            <div>
                                                {
                                                    item.limit.map((itemm) => {
                                                        return (
                                                            <a>
                                                                {`${itemm.key} <= ${itemm.value}`}
                                                            </a>
                                                        )
                                                    })
                                                }
                                            </div>

                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            )

            setinfo(
                <div>
                    <div>
                        {/* 
                            Submit and support
                        */}
                        <div>
                            Submit
                        </div>
                        <div>
                            Read support
                        </div>
                    </div >
                    <br />

                    < div >
                        <label>
                            Points:
                            <a>
                                {(problem as Problems).points || 0}
                            </a>
                        </label>
                        <label>
                            Time limit:
                            <a>
                                {(problem as Problems).def_limit.time || 0}

                            </a>
                        </label>
                        <label>
                            Memory limit:
                            <a>
                                {(problem as Problems).def_limit.memory || 0}

                            </a>
                        </label>
                    </ div>

                    {/* 
                    about host, type and group
                */}
                    < div >
                        <label>
                            Author:
                            <a>
                                {
                                    (problem as Problems).host.join(" , ")
                                }
                            </a>
                        </label>
                    </ div>
                </div >

            )
        }
        lmao()
    }, [])


    return (
        <div
            style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between"
            }}
        >
            {/* 
                For problem body and example
            */}
            {
                body
            }
            {/* 
                Status bar
            */}
            {
                infobar
            }
        </div>
    )
}