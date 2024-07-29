import { geturl, getdata } from "ultility/ulti.js"
import { Problems, User } from "ultility/types.js"
import { Luythua } from "../../math/luythua.js"
import React, { useState, useEffect } from "react"
import { ProblemsSample, ProblemsTask } from "ultility/type/subtypes.js"
import { Coding_status } from "ultility/enum.js"
export function Problem() {
    const url = geturl()

    // const [problem, setproblem] = useState({});

    const [infobar, setinfo] = useState(<></>)
    const [body, setbody] = useState(<></>)
    useEffect(() => {
        async function lmao() {
            let res = await getdata("get", "problems", url[1])


            const problem: Problems = res.data.data[0]

            res = await getdata("get", "users", localStorage.getItem("username") as string);
            const user: User = res.data.data[0];

            // console.log(user.problems.filter((prblm) => {
            //     return prblm.id == problem.id
            // }).filter((prblm) => {
            //     return prblm.status == Coding_status.AC
            // }).length > 0)

            setbody(
                <div
                    className="problem-body"
                >
                    <div>
                        {problem.body.topic}
                    </div>
                    <br />
                    <h2>
                        Input Limit:
                    </h2>
                    <div>
                        <ul>
                            {
                                problem.body.inputLimit.map((item) => {
                                    return (
                                        <li
                                            style={{
                                                position: "relative"
                                            }}
                                        >
                                            <a
                                                style={{
                                                    padding: "0 0 0 0"
                                                }}
                                            >
                                                {
                                                    `- ${item.key} <=`
                                                }
                                            </a>
                                            <Luythua a={item.value} />
                                        </li>
                                    )
                                })
                            }

                        </ul>


                    </div>

                    <br />
                    <h2>
                        Sample:
                    </h2>
                    <div>
                        {
                            problem.body.sample.map((item: ProblemsSample, index: number) => {
                                return (
                                    <div>
                                        <h3>
                                            {
                                                `Sample ${index + 1}:`
                                            }
                                        </h3>
                                        <h4>
                                            Input:
                                        </h4>
                                        <br />
                                        <pre>
                                            <code>
                                                {
                                                    item.input
                                                }
                                            </code>
                                        </pre>
                                        <h4>
                                            Output:
                                        </h4>
                                        <br />
                                        <pre>
                                            <code>
                                                {
                                                    item.output
                                                }
                                            </code>
                                        </pre>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <br />

                    <h2>
                        Sub tasks:

                    </h2>
                    <div>
                        <ul>
                            {
                                problem.body.subTasks.map((item: ProblemsTask, index: number) => {
                                    return (
                                        <li>
                                            <a
                                                style={{
                                                    padding: "0 5px 0 0"
                                                }}
                                            >
                                                {
                                                    `- Subtask ${index + 1}: ${item.points}%, and `
                                                }
                                            </a>

                                            {
                                                item.limit.map((item) => {
                                                    return (
                                                        <>
                                                            <a
                                                                style={{
                                                                    padding: "0 0 0 0"
                                                                }}
                                                            >
                                                                {
                                                                    ` ${item.key} <=`
                                                                }
                                                            </a>
                                                            <Luythua a={item.value} />
                                                            <a
                                                                style={{
                                                                    padding: "0 0 0 0"
                                                                }}
                                                            >
                                                                {"; "}
                                                            </a>

                                                        </>
                                                    )
                                                })
                                            }

                                        </li>
                                    )
                                })
                            }
                        </ul>


                    </div>

                </div>
            )
            // console.log("lmao")

            setinfo(
                <div>
                    <div>
                        {/* 
                            Submit and support
                        */}
                        <div
                            className="problem-submit"
                        >
                            Submit
                        </div>

                        <br />

                        {
                            (user.problems.filter((prblm) => {
                                return prblm.id == problem.id
                            }).filter((prblm) => {
                                return prblm.status == Coding_status.AC
                            }).length > 0) && (
                                <div>
                                    <a href={`/problem/${url[1]}/submissions/${user.username}`}>
                                        My submissions
                                    </a>

                                </div>
                            )
                        }
                        <div>
                            <a href={`/problem/${url[1]}/submissions`}>
                                All submissions
                            </a>
                        </div>
                        <div>
                            <a href={`/problem/${url[1]}/support`}>
                                Read support
                            </a>
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