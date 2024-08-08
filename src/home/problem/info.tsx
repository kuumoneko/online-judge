import React, { useState, useEffect } from "react"
import { ProblemsSample, ProblemsTask } from "type/subtypes.ts";
import { Problems, User } from "type";
import { geturl, getdata } from "ulti";
import { Luythua } from "../../math/luythua.tsx";

export function Problem_info() {
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
                                            <Luythua a={item.maxvalue} />
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
                                        <pre>
                                            <code>
                                                {
                                                    item.input
                                                }
                                            </code>
                                        </pre>
                                        <br />
                                        <h4>
                                            Output:
                                        </h4>
                                        <pre>
                                            <code>
                                                {
                                                    item.output
                                                }
                                            </code>
                                        </pre>
                                        <br />
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
                                                            <Luythua a={item.maxvalue} />
                                                            <a
                                                                style={{
                                                                    padding: "0 5px 0 0"
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
                <div
                    style={{
                        width: "15%"
                    }}
                >
                    <div>
                        {/* 
                            Submit and support
                        */}
                        <div
                            className="problem-submit"
                            onClick={() => {
                                window.location.href = `/problem/${url[1]}/submit`
                            }}
                        >
                            Submit
                        </div>

                        <br />

                        {
                            (user.problems.filter((prblm) => {
                                return prblm.id == problem.id
                            }).length > 0) && (
                                <div>
                                    <a href={`/submissions/${url[1]}/${user.username}`}>
                                        My submissions
                                    </a>

                                </div>
                            )
                        }
                        <div>
                            <a href={`/submissions/${url[1]}`}>
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

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column"
                        }}
                    >
                        <a>
                            {
                                `Points: ${(problem as Problems).points || 0}`
                            }
                        </a>
                        <a>
                            {
                                `Time limit: ${(problem as Problems).def_limit.time || 0}`
                            }
                        </a>
                        <a>
                            {
                                `Memory limit: ${(problem as Problems).def_limit.memory || 0}`
                            }
                        </a>
                    </div>

                    <br />
                    {/* 
                    about host, type and group
                */}
                    < div >
                        <a
                            style={{
                                width: "100%",
                                display: "block"
                            }}
                        >
                            Author:

                        </a>

                        {
                            problem.host.map((host) => {
                                return (
                                    <a href={`/user/${host}`} style={{
                                        padding: "0 5px 0 0"
                                    }}>
                                        {host}
                                    </a>
                                )
                            })
                        }

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