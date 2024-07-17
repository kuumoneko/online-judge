import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getdata, geturl } from "types"
import React, { useEffect, useState } from "react"


export function Problem() {
    const url = geturl();

    // console.log(url)

    // UI
    const [problems, setproblems] = useState();

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
    const [point, setpoint] = useState(0);

    useEffect(() => {

    }, [])
    return (
        <div>
            <div>

            </div>
            <div className="problem_search">
                <h3>
                    Search:
                    <FontAwesomeIcon icon={faCircleQuestion} style={{ "marginLeft": "10px" }} />
                </h3>
                <form>
                    <div>
                        <input type="text" value={search} onChange={(e) => { setsearch(e.target.value) }} />
                    </div>
                    <div>
                        <label>
                            Types:
                        </label>
                        <select name="type" value={type} onChange={(e) => { settype(e.target.value) }} >
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
                        <label>
                            Groups:
                        </label>
                        <select name="group" value={group} onChange={(e) => { setgroup(e.target.value) }} >
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
                    <div>
                        <input type="range" name="" id="" min={0} max={1000} value={point} onChange={(e) => { setpoint(Number(e.target.value)) }} />
                    </div>
                </form>
            </div>
        </div>
    )
}